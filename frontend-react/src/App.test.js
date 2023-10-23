import { render, screen } from '@testing-library/react';
import App from './App';
import {InputSearch} from "./components/InputSearch";

test('je récupère la valeur du filtre', () => {
  render(<InputSearch />);
  const form = screen.getByText(/form/)
  expect(form).toBeInTheDocument();
});
