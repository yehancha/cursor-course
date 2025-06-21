import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './page';

// Mock data and Supabase client
let apiKeysMock = [];

const mockSelect = jest.fn(() => Promise.resolve({ data: apiKeysMock, error: null }));
const mockInsert = jest.fn((insertArg) => ({
  select: jest.fn(() => {
    const name = Array.isArray(insertArg) ? insertArg[0].name : undefined;
    const newKey = { id: Date.now(), name, api_key: 'tvly-test' + Math.random(), usage: 0 };
    apiKeysMock.push(newKey);
    return Promise.resolve({ data: [newKey], error: null });
  })
}));
const mockUpdate = jest.fn(() => ({
  eq: jest.fn(() => ({
    select: jest.fn(() => {
      // Simulate update by changing the name of the first key
      if (apiKeysMock.length > 0) {
        apiKeysMock[0].name = 'Updated Key';
      }
      return Promise.resolve({ data: apiKeysMock, error: null });
    })
  }))
}));
const mockDelete = jest.fn(() => ({
  eq: jest.fn(() => {
    // Simulate delete by removing the first key
    apiKeysMock.shift();
    return Promise.resolve({ error: null });
  })
}));

jest.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      select: mockSelect,
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
      eq: jest.fn(() => ({ select: jest.fn() })),
    }),
  }),
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('Dashboard - API Key Management (Basic CRUD)', () => {
  beforeEach(() => {
    apiKeysMock = [
      { id: 1, name: 'First Key', api_key: 'tvly-key1', usage: 0 },
      { id: 2, name: 'Second Key', api_key: 'tvly-key2', usage: 0 },
    ];
    mockSelect.mockClear();
    mockInsert.mockClear();
    mockUpdate.mockClear();
    mockDelete.mockClear();
    jest.clearAllMocks();
  });

  it('should load and display the list of API keys initially', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('First Key')).toBeInTheDocument();
      expect(screen.getByText('Second Key')).toBeInTheDocument();
    });
  });

  it('should add a new API key and display it in the list', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('First Key')).toBeInTheDocument();
    });
    // The create button is the second button rendered
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[1]);
    await userEvent.type(screen.getByPlaceholderText('Key Name'), 'New Key');
    await userEvent.click(screen.getByRole('button', { name: /^create$/i }));
    await waitFor(() => {
      expect(screen.getByText('New Key')).toBeInTheDocument();
    });
  });

  it('should update an existing API key and reflect the update in the list', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('First Key')).toBeInTheDocument();
    });
    // Find the edit button for the first key (third button in the row)
    const buttons = screen.getAllByRole('button');
    const tableButtons = buttons.filter(button => button.closest('table') !== null);
    const editButton = tableButtons[2];
    await userEvent.click(editButton);
    const nameInput = screen.getByDisplayValue('First Key');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Key');
    await userEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    await waitFor(() => {
      expect(screen.getByText('Updated Key')).toBeInTheDocument();
    });
  });

  it('should delete a key and it should not be shown in the list', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('First Key')).toBeInTheDocument();
    });
    // Find the delete button for the first key (fourth button in the row)
    const buttons = screen.getAllByRole('button');
    const tableButtons = buttons.filter(button => button.closest('table') !== null);
    const deleteButton = tableButtons[3];
    await userEvent.click(deleteButton);
    await userEvent.click(screen.getByRole('button', { name: 'Revoke' }));
    await waitFor(() => {
      expect(screen.queryByText('First Key')).not.toBeInTheDocument();
    });
  });
}); 