import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from './Sidebar';

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
}); 