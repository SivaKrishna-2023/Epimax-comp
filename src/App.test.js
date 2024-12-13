// Mock ResizeObserver
class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(target) {
    // Mock the callback invocation with a dummy object
    this.callback([{ target, contentRect: target.getBoundingClientRect() }]);
  }

  unobserve() {}
  disconnect() {}
}

// Assign the mock to global.ResizeObserver
global.ResizeObserver = ResizeObserver;

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extended matchers like .toBeInTheDocument
import App from './App';

test('renders task master header', () => {
  render(<App />);
  
  // Query for the element with the text "Task Master"
  const headerElement = screen.getByText(/task master/i);
  
  // Assert that the element is in the document
  expect(headerElement).toBeInTheDocument();
});
