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
          <p>{topic.subtitle}</p>
        </div>
      ))}
    </div>
  );
}

export default TopicSelector;
