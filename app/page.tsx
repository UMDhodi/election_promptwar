'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import TabNav from '@/components/TabNav';
import AIAssistant from '@/components/AIAssistant';
import JourneyPanel from '@/components/JourneyPanel';
import TimelinePanel from '@/components/TimelinePanel';
import EVMPanel from '@/components/EVMPanel';
import QuizPanel from '@/components/QuizPanel';
import GlossaryPanel from '@/components/GlossaryPanel';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import dynamic from 'next/dynamic';

const FluxCanvas = dynamic(() => import('@/components/FluxCanvas'), { ssr: false });

type TabId = 'journey' | 'timeline' | 'evm' | 'quiz' | 'glossary';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('journey');
  const [currentStage, setCurrentStage] = useState(0);

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    document.getElementById('main-panels')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      {/* Accessibility skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Particle background */}
      <FluxCanvas />

      <div className="app-shell">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <Hero
          currentStage={currentStage}
          totalStages={10}
          onStageClick={(i) => {
            setCurrentStage(i);
            setActiveTab('journey');
            setTimeout(() => {
              document.getElementById(`stage-btn-${i}`)?.click();
            }, 300);
          }}
        />

        {/* ── TAB NAV ───────────────────────────────────────────── */}
        <TabNav active={activeTab} onChange={handleTabChange} />

        {/* ── PANELS ────────────────────────────────────────────── */}
        <main id="main-panels" className="panels-wrapper" role="main">
          <div className="container">
            <ErrorBoundary>
              {activeTab === 'journey' && (
                <JourneyPanel
                  key="journey"
                  currentStage={currentStage}
                  onStageChange={setCurrentStage}
                />
              )}
              {activeTab === 'timeline' && <TimelinePanel key="timeline" />}
              {activeTab === 'evm' && <EVMPanel key="evm" />}
              {activeTab === 'quiz' && <QuizPanel key="quiz" />}
              {activeTab === 'glossary' && <GlossaryPanel key="glossary" />}
            </ErrorBoundary>
          </div>
        </main>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer className="site-footer" role="contentinfo">
          <div className="flag-stripe" aria-hidden="true">
            <div className="s-saffron" />
            <div className="s-white" />
            <div className="s-green" />
          </div>
          <div className="footer-inner container">
            <div className="footer-brand">
              <span className="footer-emblem" aria-hidden="true">
                <img
                  src="/images/emblem-of-india.svg"
                  alt="National Emblem of India"
                  style={{ filter: 'brightness(0) invert(1)', width: '50px', height: '50px' }}
                  className="emblem-svg"
                />
              </span>
              <span className="footer-title">How India Votes</span>
              <span className="footer-desc">
                A civic-education platform. Not affiliated with the Election Commission of India.
              </span>
            </div>

            <nav className="footer-links" aria-label="Footer links">
              <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">
                ECI Official Site ↗
              </a>
              <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">
                Voter Registration ↗
              </a>
              <a href="https://results.eci.gov.in" target="_blank" rel="noopener noreferrer">
                Election Results ↗
              </a>
            </nav>

            <p className="footer-copy">
              © 2024 How India Votes · Built for civic awareness ·{' '}
              <span aria-hidden="true">🧡🤍💚</span>
            </p>
          </div>
        </footer>

        {/* ── AI ASSISTANT ──────────────────────────────────────── */}
        <AIAssistant />
      </div>
    </>
  );
}
