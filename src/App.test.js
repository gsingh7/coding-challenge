import { render, screen } from '@testing-library/react';
import App from './App';

test('renders element with latitude', () => {
  render(<App />);
  const linkElement = screen.getByText(/virtual tours coding challenge/i);
  expect(linkElement).toBeInTheDocument();
});
