import { render, screen } from '@testing-library/react';
import EVMPanel from '../components/EVMPanel';

describe('EVMPanel', () => {
  it('renders EVM panel', () => {
    render(<EVMPanel />);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('displays panel title', () => {
    render(<EVMPanel />);
    expect(screen.getByText(/EVM Technology/)).toBeInTheDocument();
  });
});