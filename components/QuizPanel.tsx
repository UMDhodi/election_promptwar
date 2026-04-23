'use client';

import { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '@/lib/data';
import { saveQuizScore, getLeaderboard, isFirebaseConfigured, QuizScore } from '@/lib/firebase';

interface AnswerState {
  chosen: number | null;
  revealed: boolean;
}

function getResultInfo(score: number, total: number) {
  const pct = score / total;
  if (pct >= 0.875) return { emoji: '🏆', scoreClass: 'score-excellent', title: 'Civic Champion!', subtitle: "Outstanding! You're a true democracy expert." };
  if (pct >= 0.625) return { emoji: '🎖️', scoreClass: 'score-good', title: 'Democracy Defender', subtitle: "Great work! You know your elections well." };
  if (pct >= 0.375) return { emoji: '📚', scoreClass: 'score-okay', title: 'Learning Citizen', subtitle: "Good effort! Revisit the Journey panel to sharpen up." };
  return { emoji: '🌱', scoreClass: 'score-low', title: 'Keep Exploring!', subtitle: "Democracy rewards the curious. Try again!" };
}

export default function QuizPanel() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>(
    QUIZ_QUESTIONS.map(() => ({ chosen: null, revealed: false }))
  );
  const [finished, setFinished] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<QuizScore[]>([]);
  const [nameInput, setNameInput] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);

  const q  = QUIZ_QUESTIONS[current];
  const ans = answers[current];
  const score = answers.filter((a, i) => a.chosen === QUIZ_QUESTIONS[i].correct).length;
  const totalAnswered = answers.filter((a) => a.revealed).length;
  const hasFirebase = isFirebaseConfigured();

  useEffect(() => {
    if (showLeaderboard && hasFirebase) {
      getLeaderboard(10).then(setLeaderboard);
    }
  }, [showLeaderboard, hasFirebase]);

  async function handleSaveScore(playerName: string) {
    if (!playerName.trim() || scoreSaved) return;
    const result = await saveQuizScore({
      playerName: playerName.trim(),
      score,
      totalQuestions: QUIZ_QUESTIONS.length,
    });
    if (result) {
      setScoreSaved(true);
      setLeaderboard(await getLeaderboard(10));
    }
  }

  function choose(optIdx: number) {
    if (ans.revealed) return;
    setAnswers((prev) =>
      prev.map((a, i) => i === current ? { chosen: optIdx, revealed: true } : a)
    );
  }

  function next() {
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  }

  function retry() {
    setCurrent(0);
    setAnswers(QUIZ_QUESTIONS.map(() => ({ chosen: null, revealed: false })));
    setFinished(false);
  }

  if (finished) {
    const { emoji, scoreClass, title, subtitle } = getResultInfo(score, QUIZ_QUESTIONS.length);
    return (
      <section id="panel-quiz" role="tabpanel" aria-labelledby="tab-quiz" className="panel">
        <div className="panel-header">
          <h2 className="panel-title">
            <span className="panel-title-icon" aria-hidden="true">📝</span>
            Knowledge Check
          </h2>
        </div>
        <div className="quiz-container">
          <div className="quiz-results" role="region" aria-label="Quiz Results">
            <div className="results-emoji" aria-hidden="true">{emoji}</div>
            <div className={`results-score ${scoreClass}`} aria-label={`Score: ${score} out of ${QUIZ_QUESTIONS.length}`}>
              {score}/{QUIZ_QUESTIONS.length}
            </div>
            <h3 className="results-title">{title}</h3>
            <p className="results-subtitle">{subtitle}</p>
            
            {!showLeaderboard ? (
              <div className="results-actions">
                <button className="btn-retry" onClick={retry}>
                  <span aria-hidden="true">🔄</span> Try Again
                </button>
                {hasFirebase && !scoreSaved && (
                  <button className="btn-leaderboard" onClick={() => setShowLeaderboard(true)}>
                    <span aria-hidden="true">🏆</span> Save Score
                  </button>
                )}
              </div>
            ) : (
              <div className="leaderboard-section">
                {!scoreSaved ? (
                  <div className="save-score-form">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      maxLength={20}
                      aria-label="Your name for leaderboard"
                    />
                    <button 
                      className="btn-save-score"
                      onClick={() => handleSaveScore(nameInput)}
                      disabled={!nameInput.trim()}
                    >
                      Save Score
                    </button>
                  </div>
                ) : (
                  <p className="score-saved-msg">Score saved! 🎉</p>
                )}
                {leaderboard.length > 0 && (
                  <div className="leaderboard" role="region" aria-label="Leaderboard">
                    <h4>🏆 Top Scores</h4>
                    <ol className="leaderboard-list">
                      {leaderboard.map((entry, i) => (
                        <li key={i} className={entry.playerName === nameInput ? 'current-player' : ''}>
                          <span className="lb-rank">{i + 1}</span>
                          <span className="lb-name">{entry.playerName}</span>
                          <span className="lb-score">{entry.score}/{entry.totalQuestions}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                <button className="btn-back" onClick={() => setShowLeaderboard(false)}>
                  ← Back to Results
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="panel-quiz" role="tabpanel" aria-labelledby="tab-quiz" className="panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="panel-title-icon" aria-hidden="true">📝</span>
          Knowledge Check
        </h2>
        <p className="panel-subtitle">
          Test what you&apos;ve learned about Indian elections. {QUIZ_QUESTIONS.length} questions covering rules,
          technology, and history.
        </p>
      </div>

      <div className="quiz-container">
        {/* Score Bar */}
        <div className="quiz-score-bar" role="status" aria-live="polite">
          <span className="quiz-score-label">
            Question{' '}
            <span className="quiz-progress-text">{current + 1}</span>
            {' '}of {QUIZ_QUESTIONS.length}
          </span>
          <span className="quiz-score-val">{score} ✓</span>
        </div>

        {/* Question Card */}
        <div className="quiz-card" role="region" aria-label={`Question ${current + 1}`}>
          <div className="quiz-q-num">Question {String(current + 1).padStart(2, '0')}</div>
          <p className="quiz-question">{q.question}</p>

          <div className="quiz-options" role="group" aria-label="Answer options">
            {q.options.map((opt, i) => {
              const isChosen = ans.chosen === i;
              const isCorrect = i === q.correct;
              let cls = '';
              if (ans.revealed) {
                if (isCorrect) cls = 'opt-correct';
                else if (isChosen && !isCorrect) cls = 'opt-wrong';
              }
              const letters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={i}
                  className={`quiz-option ${cls}`}
                  onClick={() => choose(i)}
                  disabled={ans.revealed}
                  aria-label={`Option ${letters[i]}: ${opt}`}
                >
                  <span className="option-letter" aria-hidden="true">{letters[i]}</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {ans.revealed && (
            <div
              className={`quiz-explanation ${ans.chosen === q.correct ? 'exp-correct' : 'exp-wrong'}`}
              role="alert"
              aria-live="assertive"
            >
              <strong>{ans.chosen === q.correct ? '✅ Correct!' : '❌ Not quite.'}</strong>
              {' '}{q.explanation}
            </div>
          )}

          <div className="quiz-nav">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {totalAnswered} answered · {score} correct
            </span>
            <button
              className="btn-quiz-next"
              onClick={next}
              disabled={!ans.revealed}
              aria-label={current < QUIZ_QUESTIONS.length - 1 ? 'Next question' : 'See results'}
            >
              {current < QUIZ_QUESTIONS.length - 1 ? (
                <><span>Next →</span></>
              ) : (
                <><span>See Results 🏆</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
