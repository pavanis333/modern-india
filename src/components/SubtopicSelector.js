import React from 'react';
import { getCardSR, isDue } from '../utils/spacedRepetition';

function SubtopicSelector({ topic, onSelect, onBack }) {
  const getSubtopicStats = (subtopic) => {
    let reviewed = 0;
    let due = 0;
    const total = subtopic.data.flashcards.length;

    subtopic.data.flashcards.forEach(card => {
      const sr = getCardSR(card.id);
      if (sr.lastReview) reviewed++;
      if (isDue(card.id)) due++;
    });

    return { total, reviewed, due };
  };

  return (
    <div className="subtopic-container">
      <h2>📖 {topic.title}</h2>

      <div className="subtopic-grid">
        {topic.subtopics.map((subtopic, index) => {
          const stats = getSubtopicStats(subtopic);
          const pct = stats.total > 0 ? Math.round((stats.reviewed / stats.total) * 100) : 0;

          return (
            <div
              key={subtopic.id}
              className="subtopic-card"
              onClick={() => onSelect(subtopic)}
            >
              <div className="subtopic-number">{index + 1}</div>
              <h3>{subtopic.title}</h3>
              <p>{subtopic.description}</p>
              <div className="subtopic-stats">
                <span>🃏 {subtopic.data.flashcards.length} cards</span>
                <span>📝 {subtopic.data.quizzes.mcq.length + subtopic.data.quizzes.comprehensive.length} questions</span>
                {stats.due > 0 && (
                  <span className="due-badge overdue">🔥 {stats.due} due</span>
                )}
              </div>
              <div className="subtopic-progress" style={{ marginTop: '12px' }}>
                <div className="progress-bar">
                  <div
                    className={`progress-bar-fill ${pct === 100 ? 'complete' : ''}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="back-btn" onClick={onBack} style={{ marginTop: '20px' }}>
          ← Back to Topics
        </button>
      </div>
    </div>
  );
}

export default SubtopicSelector;
