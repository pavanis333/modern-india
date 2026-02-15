import React from 'react';

function TopicSelector({ topics, onSelect }) {
  return (
    <div className="topic-list">
      <h2 style={{ color: 'white', marginBottom: '20px' }}>📚 Select a Topic</h2>
      {topics.map(topic => (
        <div 
          key={topic.id}
          className="topic-item"
          onClick={() => onSelect(topic)}
        >
          <h3>{topic.title}</h3>
          <p>{topic.description}</p>
          <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#888' }}>
            📖 {topic.subtopics.length} subtopic{topic.subtopics.length !== 1 ? 's' : ''}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopicSelector;
