'use client';

import { useState } from 'react';
import { TIMELINE_EVENTS } from '@/lib/data';

type Filter = 'all' | 'phases' | 'results' | 'announcement';

const FILTER_OPTIONS: { id: Filter; label: string }[] = [
  { id: 'all',          label: '🌐 All Events' },
  { id: 'phases',       label: '🗳️ Polling Phases' },
  { id: 'results',      label: '📊 Results' },
  { id: 'announcement', label: '📣 Announcement' },
];

function dotClass(type: string) {
  if (type === 'results')      return 'dot-results';
  if (type === 'announcement') return 'dot-announcement';
  return '';
}

function pillClass(type: string) {
  if (type === 'results')      return 'pill-results';
  if (type === 'announcement') return 'pill-announcement';
  return '';
}

function pillLabel(type: string) {
  if (type === 'results')      return '📊 Results';
  if (type === 'announcement') return '📣 Announcement';
  return `Phase ${type}`;
}

function matchFilter(filter: Filter, event: { type: string }): boolean {
  if (filter === 'all')          return true;
  if (filter === 'results')      return event.type === 'results';
  if (filter === 'announcement') return event.type === 'announcement';
  if (filter === 'phases')       return !['results','announcement'].includes(event.type);
  return true;
}

export default function TimelinePanel() {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = TIMELINE_EVENTS.filter((e) => matchFilter(filter, e));

  return (
    <section
      id="panel-timeline"
      role="tabpanel"
      aria-labelledby="tab-timeline"
      className="panel"
    >
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="panel-title-icon" aria-hidden="true">🗓️</span>
          2024 General Election Timeline
        </h2>
        <p className="panel-subtitle">
          Key dates of the 18th Lok Sabha election — the world&apos;s largest democratic exercise,
          spanning 44 days across 7 phases.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="timeline-filter" role="group" aria-label="Filter election events">
        {FILTER_OPTIONS.map((f) => (
          <button
            key={f.id}
            className={`filter-pill ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="timeline-container" role="list">
        {visible.map((event, i) => (
          <div key={i} className="timeline-event" role="listitem">
            <div className={`timeline-dot ${dotClass(event.type)}`} aria-hidden="true" />
            <article className="timeline-card">
              <div className="timeline-date">
                <time dateTime={event.date}>{event.date}</time>
              </div>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-desc">{event.desc}</p>
              <span className={`timeline-phase-pill ${pillClass(event.type)}`}>
                {pillLabel(event.type)}
              </span>
            </article>
          </div>
        ))}

        {visible.length === 0 && (
          <p style={{ color: 'var(--text-muted)', paddingLeft: '1rem' }}>
            No events match this filter.
          </p>
        )}
      </div>
    </section>
  );
}
