import { render, screen } from '@testing-library/react';
import App from './App';

test('says welcome to the candidate', () => {
  render(<App />);
  const linkElement = screen.getByText(/Michelle/i);
  expect(linkElement).toBeInTheDocument();
});
