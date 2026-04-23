import { render, screen } from '@testing-library/react';
import JourneyPanel from '../components/JourneyPanel';

describe('JourneyPanel', () => {
  it('renders journey panel', () => {
    render(<JourneyPanel currentStage={0} onStageChange={() => {}} />);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('displays panel title', () => {
    render(<JourneyPanel currentStage={0} onStageChange={() => {}} />);
    expect(screen.getByText(/Election Journey/)).toBeInTheDocument();
  });

  it('renders stage navigation', () => {
    render(<JourneyPanel currentStage={0} onStageChange={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});