import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';

describe('Hero', () => {
  it('renders hero section', () => {
    render(<Hero currentStage={0} totalStages={10} onStageClick={() => {}} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays progress bar', () => {
    render(<Hero currentStage={3} totalStages={10} onStageClick={() => {}} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows correct stage number', () => {
    render(<Hero currentStage={4} totalStages={10} onStageClick={() => {}} />);
    expect(screen.getByText(/Stage 5 of 10/)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<Hero currentStage={0} totalStages={10} onStageClick={() => {}} />);
    expect(screen.getByText(/Begin Journey/)).toBeInTheDocument();
    expect(screen.getByText(/Test Yourself/)).toBeInTheDocument();
  });

  it('renders stats section', () => {
    render(<Hero currentStage={0} totalStages={10} onStageClick={() => {}} />);
    expect(screen.getByText(/Registered Voters/)).toBeInTheDocument();
    expect(screen.getByText(/Lok Sabha Seats/)).toBeInTheDocument();
    expect(screen.getByText(/Voter Turnout 2024/)).toBeInTheDocument();
  });
});