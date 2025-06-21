import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';

// Mock window.location.assign for navigation
const originalLocation = window.location;
beforeAll(() => {
  delete window.location;
  window.location = { assign: jest.fn() };
});
afterAll(() => {
  window.location = originalLocation;
});

describe('Sidebar', () => {
  it('should toggle between collapsed and expanded states', async () => {
    render(<Sidebar />);

    // Initially, the sidebar should be expanded
    expect(screen.getByText('Cursor Course')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();

    // Find the toggle button (ChevronLeftIcon) and click it to collapse
    const toggleButton = screen.getByRole('button');
    await userEvent.click(toggleButton);

    // Now, the sidebar should be collapsed
    expect(screen.queryByText('Cursor Course')).not.toBeInTheDocument();
    expect(screen.queryByText('Overview')).not.toBeInTheDocument();

    // Click the toggle button again to expand
    await userEvent.click(toggleButton);

    // The sidebar should be expanded again
    expect(screen.getByText('Cursor Course')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('navigates to /dashboard when Overview is clicked', () => {
    render(<Sidebar />);
    const overviewLink = screen.getByText('Overview').closest('a');
    expect(overviewLink).toHaveAttribute('href', '/dashboard');
  });

  it('navigates to /playground when API Playground is clicked', () => {
    render(<Sidebar />);
    const playgroundLink = screen.getByText('API Playground').closest('a');
    expect(playgroundLink).toHaveAttribute('href', '/playground');
  });
}); 