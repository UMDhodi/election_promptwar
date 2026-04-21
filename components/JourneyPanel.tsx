'use client';

import { useState } from 'react';
import { ELECTION_STAGES, ElectionStage } from '@/lib/data';

interface Props {
  currentStage: number;
  onStageChange: (i: number) => void;
}

function roleCls(role: ElectionStage['role']) {
  const map = { eci: 'role-eci', voter: 'role-voter', candidate: 'role-candidate', all: 'role-all' };
  return map[role];
}

export default function JourneyPanel({ currentStage, onStageChange }: Props) {
  const [expanded, setExpanded] = useState<number>(currentStage);

  function toggle(id: number) {
    const next = expanded === id ? -1 : id;
    setExpanded(next);
    if (next !== -1) onStageChange(next);
  }

  return (
    <section
      id="panel-journey"
      role="tabpanel"
      aria-labelledby="tab-journey"
      className="panel"
    >
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="panel-title-icon" aria-hidden="true">🗺️</span>
          The Election Journey
        </h2>
        <p className="panel-subtitle">
          10 sequential stages that transform a citizen&apos;s decision into a democratically elected government.
          Click any stage to explore.
        </p>
      </div>

      <div className="journey-stepper" role="list">
        {ELECTION_STAGES.map((stage) => {
          const isExpanded = expanded === stage.id;
          const isActive   = stage.id === currentStage;
          const isDone     = stage.id < currentStage;

          return (
            <div
              key={stage.id}
              className={`stage-item ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
              role="listitem"
            >
              {/* Number marker */}
              <div className="stage-number" aria-hidden="true">
                {isDone ? '✓' : String(stage.id + 1).padStart(2, '0')}
              </div>

              <div className={`stage-card ${isExpanded ? 'expanded' : ''}`}>
                <button
                  className="stage-header"
                  onClick={() => toggle(stage.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`stage-body-${stage.id}`}
                  id={`stage-btn-${stage.id}`}
                >
                  <div className="stage-header-left">
                    <span className="stage-icon" aria-hidden="true">{stage.icon}</span>
                    <div className="stage-title-wrap">
                      <div className="stage-title">{stage.title}</div>
                      <div className="stage-meta">
                        <span className={`role-badge ${roleCls(stage.role)}`}>
                          {stage.roleLabel}
                        </span>
                        <span className="stage-duration">⏱️ {stage.duration}</span>
                      </div>
                    </div>
                  </div>
                  <span className="stage-chevron" aria-hidden="true">▼</span>
                </button>

                <div
                  id={`stage-body-${stage.id}`}
                  className="stage-body"
                  role="region"
                  aria-labelledby={`stage-btn-${stage.id}`}
                >
                  <p className="stage-desc">{stage.description}</p>

                  <div className="stage-facts">
                    {stage.facts.map((fact, i) => {
                      const parts = fact.split(' ');
                      const icon  = parts[0];
                      const text  = parts.slice(1).join(' ');
                      return (
                        <div key={i} className="fact-bullet">
                          <span className="fact-icon" aria-hidden="true">{icon}</span>
                          <span className="fact-text">{text}</span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    className="ask-more-btn"
                    onClick={() => {
                      const input = document.getElementById('ai-input') as HTMLInputElement;
                      if (input) {
                        input.value = `Tell me more about: ${stage.title}`;
                        input.focus();
                        // Trigger AI open
                        const panel = document.getElementById('ai-chat-panel');
                        if (panel) panel.removeAttribute('hidden');
                      }
                    }}
                  >
                    <span aria-hidden="true">✨</span> Ask the AI Guide
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
