'use client';

import { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '@/lib/data';

type Category = 'All' | 'ECI' | 'Technology' | 'Law' | 'Process';

const CATEGORIES: Category[] = ['All', 'ECI', 'Technology', 'Law', 'Process'];

export default function GlossaryPanel() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<Category>('All');

  const visible = useMemo(() => {
    const q = search.toLowerCase();
    return GLOSSARY_TERMS.filter((t) => {
      const matchCat  = cat === 'All' || t.category === cat;
      const matchTerm = !q || t.term.toLowerCase().includes(q) || t.abbr.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
      return matchCat && matchTerm;
    });
  }, [search, cat]);

  return (
    <section
      id="panel-glossary"
      role="tabpanel"
      aria-labelledby="tab-glossary"
      className="panel"
    >
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="panel-title-icon" aria-hidden="true">📖</span>
          Election Glossary
        </h2>
        <p className="panel-subtitle">
          {GLOSSARY_TERMS.length} key terms explained - from constitutional bodies to ground-level technologies.
        </p>
      </div>

      {/* Search */}
      <div className="glossary-search-wrap">
        <span className="search-icon-wrap" aria-hidden="true">🔍</span>
        <input
          id="glossary-search"
          type="search"
          className="glossary-search"
          placeholder="Search terms, abbreviations, definitions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search glossary terms"
          autoComplete="off"
        />
      </div>

      {/* Category Filters */}
      <div className="gloss-filter-tabs" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`gloss-filter ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="glossary-grid" role="list">
        {visible.map((term, i) => (
          <article key={i} className="glossary-card" role="listitem">
            <div className="glossary-card-header">
              <div>
                <h3 className="glossary-term-name">{term.term}</h3>
                <span className={`cat-tag cat-${term.category}`}>{term.category}</span>
              </div>
              <span className="glossary-abbr">{term.abbr}</span>
            </div>
            <p className="glossary-def">{term.definition}</p>
          </article>
        ))}

        {visible.length === 0 && (
          <p style={{ color: 'var(--text-muted)', padding: '2rem 0', gridColumn: '1/-1', textAlign: 'center' }}>
            No terms match your search. Try a different query!
          </p>
        )}
      </div>

      {/* Count */}
      <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Showing {visible.length} of {GLOSSARY_TERMS.length} terms
      </p>
    </section>
  );
}
