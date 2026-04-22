import { ELECTION_STAGES, TIMELINE_EVENTS, QUIZ_QUESTIONS, GLOSSARY_TERMS } from './data';

describe('ELECTION_STAGES', () => {
  it('should have 10 election stages', () => {
    expect(ELECTION_STAGES).toHaveLength(10);
  });

  it('each stage should have required fields', () => {
    ELECTION_STAGES.forEach((stage) => {
      expect(stage).toHaveProperty('id');
      expect(stage).toHaveProperty('title');
      expect(stage).toHaveProperty('role');
      expect(stage).toHaveProperty('description');
      expect(stage).toHaveProperty('facts');
      expect(Array.isArray(stage.facts)).toBe(true);
    });
  });

  it('should start with Electoral Roll Preparation', () => {
    expect(ELECTION_STAGES[0].title).toBe('Electoral Roll Preparation');
  });

  it('should end with Government Formation', () => {
    expect(ELECTION_STAGES[9].title).toBe('Government Formation');
  });

  it('each stage id should be sequential', () => {
    ELECTION_STAGES.forEach((stage, index) => {
      expect(stage.id).toBe(index);
    });
  });
});

describe('TIMELINE_EVENTS', () => {
  it('should have timeline events', () => {
    expect(TIMELINE_EVENTS.length).toBeGreaterThan(0);
  });

  it('each event should have required fields', () => {
    TIMELINE_EVENTS.forEach((event) => {
      expect(event).toHaveProperty('date');
      expect(event).toHaveProperty('title');
      expect(event).toHaveProperty('desc');
      expect(event).toHaveProperty('phase');
      expect(event).toHaveProperty('type');
    });
  });

  it('should be sorted by date', () => {
    for (let i = 1; i < TIMELINE_EVENTS.length; i++) {
      expect(new Date(TIMELINE_EVENTS[i].date).getTime()).toBeGreaterThanOrEqual(
        new Date(TIMELINE_EVENTS[i - 1].date).getTime()
      );
    }
  });
});

describe('QUIZ_QUESTIONS', () => {
  it('should have quiz questions', () => {
    expect(QUIZ_QUESTIONS.length).toBeGreaterThan(0);
  });

  it('each question should have 4 options', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it('correct answer should be within valid range', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(4);
    });
  });

  it('each question should have an explanation', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.explanation).toBeDefined();
      expect(q.explanation.length).toBeGreaterThan(0);
    });
  });
});

describe('GLOSSARY_TERMS', () => {
  it('should have glossary terms', () => {
    expect(GLOSSARY_TERMS.length).toBeGreaterThan(0);
  });

  it('each term should have required fields', () => {
    GLOSSARY_TERMS.forEach((term) => {
      expect(term).toHaveProperty('term');
      expect(term).toHaveProperty('abbr');
      expect(term).toHaveProperty('category');
      expect(term).toHaveProperty('definition');
    });
  });

  it('categories should be valid', () => {
    const validCategories = ['ECI', 'Technology', 'Law', 'Process'];
    GLOSSARY_TERMS.forEach((term) => {
      expect(validCategories).toContain(term.category);
    });
  });
});