import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Playground from './page';

// Mock the usePlayground hook
jest.mock('./hooks/usePlayground', () => ({
  usePlayground: jest.fn()
}));

const mockUsePlayground = require('./hooks/usePlayground').usePlayground;

describe('Playground', () => {
  const mockProps = {
    apiKey: '',
    isValidating: false,
    validationResult: null,
    handleSubmit: jest.fn(),
    handleApiKeyChange: jest.fn()
  };

  beforeEach(() => {
    mockUsePlayground.mockReturnValue(mockProps);
  });

  it('should render playground page with title and description', () => {
    render(<Playground />);
    
    expect(screen.getByText('API Playground')).toBeInTheDocument();
    expect(screen.getByText(/Test your API keys and explore the Research API functionality in real-time/)).toBeInTheDocument();
  });

  it('should render API key input form', () => {
    render(<Playground />);
    
    expect(screen.getByLabelText('API Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your API key here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Test API Key/ })).toBeInTheDocument();
  });

  it('should show validation result for valid API key', () => {
    const validKeyProps = {
      ...mockProps,
      validationResult: {
        isValid: true,
        key: { name: 'Test Key', id: 1 }
      }
    };
    mockUsePlayground.mockReturnValue(validKeyProps);

    render(<Playground />);
    
    expect(screen.getByText('API Key Valid')).toBeInTheDocument();
    expect(screen.getByText(/Your API key "Test Key" is valid and ready to use/)).toBeInTheDocument();
    expect(screen.getByText(/Your API key is valid! You can now proceed with API testing/)).toBeInTheDocument();
  });

  it('should show validation result for invalid API key', () => {
    const invalidKeyProps = {
      ...mockProps,
      validationResult: {
        isValid: false,
        error: 'Invalid API key provided'
      }
    };
    mockUsePlayground.mockReturnValue(invalidKeyProps);

    render(<Playground />);
    
    expect(screen.getByText('API Key Invalid')).toBeInTheDocument();
    expect(screen.getByText('Invalid API key provided')).toBeInTheDocument();
    expect(screen.getByText(/Test results will appear here once you submit a valid API key/)).toBeInTheDocument();
  });
}); 