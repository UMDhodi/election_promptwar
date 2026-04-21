'use client';

type TabId = 'journey' | 'timeline' | 'evm' | 'quiz' | 'glossary';

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'journey',  label: 'Journey',       icon: '🗺️' },
  { id: 'timeline', label: '2024 Timeline', icon: '🗓️' },
  { id: 'evm',      label: 'EVM & Voting',  icon: '🗳️' },
  { id: 'quiz',     label: 'Test Yourself', icon: '📝' },
  { id: 'glossary', label: 'Glossary',      icon: '📖' },
];

export default function TabNav({ active, onChange }: Props) {
  return (
    <nav
      className="tab-nav"
      role="tablist"
      aria-label="Election Education Sections"
    >
      <div className="container tab-nav-inner">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            className={`tab-btn ${active === t.id ? 'active' : ''}`}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => onChange(t.id)}
          >
            <span className="tab-icon" aria-hidden="true">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
