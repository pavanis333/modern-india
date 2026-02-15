import React from 'react';

function SubtopicSelector({ topic, onSelect, onBack }) {
  return (
    <div className="subtopic-container">
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
        📖 Select a Subtopic
      </h2>
      
      <div className="subtopic-grid">
        {topic.subtopics.map((subtopic, index) => (
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
            </div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={onBack} style={{ marginTop: '30px' }}>
        🏠 Back to Topics
      </button>
    </div>
  );
}

export default SubtopicSelector;
