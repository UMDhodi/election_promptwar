'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  currentStage: number;
  totalStages: number;
  onStageClick: (i: number) => void;
}

export default function Hero({ currentStage, totalStages, onStageClick }: Props) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  // Counter animation
  useEffect(() => {
    if (animated) return;
    const targets = [
      { el: document.getElementById('stat-voters'), target: 968, suffix: 'M+' },
      { el: document.getElementById('stat-seats'),  target: 543, suffix: '' },
      { el: document.getElementById('stat-phases'), target: 7, suffix: '' },
      { el: document.getElementById('stat-turnout'),target: 65, suffix: '%' },
    ];
    const duration = 1800;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      targets.forEach(({ el, target, suffix }) => {
        if (el) el.textContent = Math.round(target * ease) + suffix;
      });
      if (t < 1) requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimated(true);
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const progressPct = (currentStage / (totalStages - 1)) * 100;

  return (
    <header id="hero" className="hero" role="banner" aria-label="How India Votes - Hero">
      {/* Flag Stripe */}
      <div className="flag-stripe" aria-hidden="true">
        <div className="s-saffron" />
        <div className="s-white" />
        <div className="s-green" />
      </div>

      <div className="hero-inner container">
        {/* National Emblem */}
        <div className="emblem-wrap" aria-hidden="true">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="National Emblem of India"
            className="emblem-svg"
          />
        </div>

        {/* Civic Badge */}
        <div className="civic-badge" role="img" aria-label="Election Commission of India civic badge">
          <span aria-hidden="true">🗳️</span>
          <span>Election Commission of India</span>
          <span className="badge-dot" aria-hidden="true" />
          <span className="badge-year">Since 1950</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title" id="main-content">
          <span className="title-line">How</span>
          <span className="title-main">India Votes</span>
        </h1>

        <p className="hero-tagline">
          From voter rolls to result halls — discover the world&apos;s{' '}
          <strong>largest democratic exercise</strong>, one transparent step at a time.
        </p>

        {/* Progress Bar */}
        <div
          className="progress-wrap"
          role="progressbar"
          aria-valuenow={currentStage}
          aria-valuemin={0}
          aria-valuemax={totalStages - 1}
          aria-label="Election Journey Progress"
        >
          <div className="progress-labels">
            <span>Start</span>
            <span>Stage {currentStage + 1} of {totalStages}</span>
            <span>Complete</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            <div className="progress-nodes">
              {Array.from({ length: totalStages }).map((_, i) => (
                <button
                  key={i}
                  className={`progress-node ${i === currentStage ? 'active' : ''} ${i < currentStage ? 'completed' : ''}`}
                  onClick={() => onStageClick(i)}
                  aria-label={`Go to stage ${i + 1}`}
                  title={`Stage ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById('tab-journey')?.click()}>
            <span aria-hidden="true">🗺️</span> Begin Journey
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('tab-quiz')?.click()}>
            <span aria-hidden="true">📝</span> Test Yourself
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats" ref={statsRef} role="region" aria-label="2024 Election Statistics">
          <div className="stat-item">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0' }}>
              <span className="stat-number" id="stat-voters">0M+</span>
            </div>
            <span className="stat-label">Registered Voters</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-number" id="stat-seats">0</span>
            <span className="stat-label">Lok Sabha Seats</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-number" id="stat-phases">0</span>
            <span className="stat-label">Phases in 2024</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-number" id="stat-turnout">0%</span>
            <span className="stat-label">Voter Turnout 2024</span>
          </div>
        </div>
      </div>
    </header>
  );
}
