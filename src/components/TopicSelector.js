import React from 'react';
import { getCardSR, isDue } from '../utils/spacedRepetition';

function TopicSelector({ topics, onSelect }) {
  // Calculate progress per topic
  const getTopicStats = (topic) => {
    let totalCards = 0;
    let reviewedCards = 0;
    let dueCards = 0;

    topic.subtopics.forEach(sub => {
      sub.data.flashcards.forEach(card => {
        totalCards++;
        const sr = getCardSR(card.id);
        if (sr.lastReview) reviewedCards++;
        if (isDue(card.id)) dueCards++;
      });
    });

    return { totalCards, reviewedCards, dueCards };
  };

  return (
    <div className="topic-list">
      <h2>📚 Select a Topic</h2>
      {topics.map(topic => {
        const stats = getTopicStats(topic);
        const pct = stats.totalCards > 0 ? Math.round((stats.reviewedCards / stats.totalCards) * 100) : 0;

        return (
          <div
            key={topic.id}
            className="topic-item"
            onClick={() => onSelect(topic)}
          >
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <div className="topic-meta">
              <span className="subtopic-count">
                📖 {topic.subtopics.length} subtopic{topic.subtopics.length !== 1 ? 's' : ''}
                {stats.dueCards > 0 && (
                  <span className="due-badge overdue" style={{ marginLeft: '8px' }}>
                    🔥 {stats.dueCards} due
                  </span>
                )}
              </span>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div
                    className={`progress-bar-fill ${pct === 100 ? 'complete' : ''}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="progress-text">{pct}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TopicSelector;
