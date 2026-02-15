import React, { useState } from 'react';
import './App.css';
import TopicSelector from './components/TopicSelector';
import FlashcardMode from './components/FlashcardMode';
import QuizMode from './components/QuizMode';
import data from './data/europeans-in-india.json';

function App() {
  const [mode, setMode] = useState('home'); // home, flashcard, quiz
  const [currentTopic, setCurrentTopic] = useState(null);

  const topics = [
    {
      id: 'europeans',
      title: 'Advent of Europeans and Consolidation of British Power',
      subtitle: 'Europeans in India - Details at a Glance',
      data: data
    }
  ];

  const selectTopic = (topic) => {
    setCurrentTopic(topic);
    setMode('home');
  };

  const goHome = () => {
    setMode('home');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🇮🇳 Modern India - UPSC Prelims Prep</h1>
        {currentTopic && (
          <p className="topic-title">{currentTopic.title}</p>
        )}
      </header>

      {!currentTopic ? (
        <TopicSelector topics={topics} onSelect={selectTopic} />
      ) : (
        <>
          {mode === 'home' && (
            <div className="mode-selector">
              <div className="mode-card" onClick={() => setMode('flashcard')}>
                <div className="mode-icon">🃏</div>
                <h2>Flashcards</h2>
                <p>{currentTopic.data.flashcards.length} cards • 5 categories</p>
              </div>
              <div className="mode-card" onClick={() => setMode('quiz')}>
                <div className="mode-icon">📝</div>
                <h2>Quiz Mode</h2>
                <p>{currentTopic.data.quizzes.mcq.length} MCQs + {currentTopic.data.quizzes.comprehensive.length} Comprehensive</p>
              </div>
              <div className="mode-card back-card" onClick={() => setCurrentTopic(null)}>
                <div className="mode-icon">🏠</div>
                <h2>Back to Topics</h2>
              </div>
            </div>
          )}

          {mode === 'flashcard' && (
            <FlashcardMode 
              flashcards={currentTopic.data.flashcards} 
              onBack={goHome}
            />
          )}

          {mode === 'quiz' && (
            <QuizMode 
              quizzes={currentTopic.data.quizzes} 
              onBack={goHome}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
