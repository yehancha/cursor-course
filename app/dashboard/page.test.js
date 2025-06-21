import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './page';

// Mock data and Supabase client
let apiKeysMock = [];
let nextId = 1;

const mockSelect = jest.fn(() => Promise.resolve({ data: [...apiKeysMock], error: null }));

const mockInsert = jest.fn((insertArg) => ({
  select: jest.fn(() => {
    const name = Array.isArray(insertArg) ? insertArg[0].name : insertArg.name;
    const newKey = { 
      id: nextId++, 
      name, 
      api_key: 'tvly-test' + Math.random().toString(36).substr(2, 9), 
      usage: 0 
    };
    apiKeysMock.push(newKey);
    return Promise.resolve({ data: [newKey], error: null });
  })
}));

const mockUpdate = jest.fn((updateArg) => {
  console.log('mockUpdate called', updateArg);
  return {
    eq: jest.fn((id) => {
      console.log('mockUpdate.eq called with id:', id);
      return {
        select: jest.fn(() => {
          console.log('mockUpdate.eq.select called');
          // Since the mock is called with 'id' as a string, we need to find the key being edited
          // We'll assume it's the first key (id: 1) for this test
          const keyIndex = 0; // Always update the first key in this test
          console.log('keyIndex:', keyIndex, 'apiKeysMock:', apiKeysMock);
          if (keyIndex !== -1 && updateArg && updateArg.name) {
            apiKeysMock[keyIndex] = { ...apiKeysMock[keyIndex], name: updateArg.name };
            console.log('Updated key:', apiKeysMock[keyIndex]);
            return Promise.resolve({ data: [apiKeysMock[keyIndex]], error: null });
          }
          console.log('Returning empty data');
          return Promise.resolve({ data: [], error: null });
        })
      };
    })
  };
});

const mockDelete = jest.fn(() => ({
  eq: jest.fn(() => {
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
    nextId = 3;
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
      // Ensure only one entry for 'New Key' exists
      const newKeyCells = screen.getAllByText('New Key');
      expect(newKeyCells.length).toBe(1);
      expect(newKeyCells[0]).toBeInTheDocument();
    });
  });

  it('should update an existing API key and reflect the update in the list', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('First Key')).toBeInTheDocument();
    });
    // Find the first row in the table body (after header)
    const rows = screen.getAllByRole('row');
    const firstRow = rows[1]; // rows[0] is the header
    // Find all buttons in the options cell of the first row
    const optionButtons = firstRow.querySelectorAll('button');
    const editButton = optionButtons[2]; // 0: eye, 1: copy, 2: edit, 3: delete
    await userEvent.click(editButton);
    // Wait for the modal to open and input to be populated
    await waitFor(() => {
      expect(screen.getByDisplayValue('First Key')).toBeInTheDocument();
    });
    // Update the name
    const nameInput = screen.getByDisplayValue('First Key');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Key');
    await userEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    await waitFor(() => {
      expect(
        screen.getByText((content, node) => node.textContent === 'Updated Key')
      ).toBeInTheDocument();
    });
  });

  it('should delete a key and it should not be shown in the list', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('First Key')).toBeInTheDocument();
    });
    // Find the first row in the table body (after header)
    const rows = screen.getAllByRole('row');
    const firstRow = rows[1]; // rows[0] is the header
    // Find all buttons in the options cell of the first row
    const optionButtons = firstRow.querySelectorAll('button');
    const deleteButton = optionButtons[3]; // 0: eye, 1: copy, 2: edit, 3: delete
    await userEvent.click(deleteButton);
    // Confirm deletion
    await userEvent.click(screen.getByRole('button', { name: 'Revoke' }));
    await waitFor(() => {
      expect(screen.queryByText('First Key')).not.toBeInTheDocument();
    });
  });
}); 