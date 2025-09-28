import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders a button with the correct text', () => {
    render(<Button>Test Button</Button>);
    const buttonElement = screen.getByText(/Test Button/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
