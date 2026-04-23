import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabNav from '../components/TabNav';

describe('TabNav', () => {
  it('renders all tab buttons', () => {
    render(<TabNav active="journey" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: /journey/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /timeline/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /evm/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /test yourself/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /glossary/i })).toBeInTheDocument();
  });

  it('calls onChange when tab is clicked', async () => {
    const onChange = jest.fn();
    render(<TabNav active="journey" onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: /timeline/i }));
    expect(onChange).toHaveBeenCalledWith('timeline');
  });
});