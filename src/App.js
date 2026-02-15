import React, { useState } from 'react';
import './App.css';
import TopicSelector from './components/TopicSelector';
import SubtopicSelector from './components/SubtopicSelector';
import FlashcardMode from './components/FlashcardMode';
import QuizMode from './components/QuizMode';
import europeansData from './data/europeans-in-india.json';
import portugueseData from './data/portuguese-in-india.json';

function App() {
  const [mode, setMode] = useState('topics'); // topics, subtopics, home, flashcard, quiz
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentSubtopic, setCurrentSubtopic] = useState(null);

  // Topics structure
  const topics = [
    {
      id: 'advent-europeans',
      title: 'Advent of Europeans and Consolidation of British Power',
      description: 'European powers in India and British colonial expansion',
      subtopics: [
        {
          id: 'europeans-overview',
          title: 'Europeans in India - Details at a Glance',
          description: 'Comparative overview of European trading companies',
          data: europeansData
        },
        {
          id: 'portuguese',
          title: 'Portuguese in India',
          description: 'Vasco da Gama, Albuquerque, Goa, Blue Water Policy, and Portuguese colonial rule',
          data: portugueseData
        }
      ]
    }
  ];

  const selectTopic = (topic) => {
    setCurrentTopic(topic);
    setMode('subtopics');
  };

  const selectSubtopic = (subtopic) => {
    setCurrentSubtopic(subtopic);
    setMode('home');
  };

  const goToTopics = () => {
    setCurrentTopic(null);
    setCurrentSubtopic(null);
    setMode('topics');
  };

  const goToSubtopics = () => {
    setCurrentSubtopic(null);
    setMode('subtopics');
  };

  const goToSubtopicHome = () => {
    setMode('home');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🇮🇳 Modern India - UPSC Prelims Prep</h1>
        {currentTopic && (
          <p className="topic-title">
            {currentTopic.title}
            {currentSubtopic && ` • ${currentSubtopic.title}`}
          </p>
        )}
      </header>

      {mode === 'topics' && (
        <TopicSelector topics={topics} onSelect={selectTopic} />
      )}

      {mode === 'subtopics' && currentTopic && (
        <SubtopicSelector 
          topic={currentTopic} 
          onSelect={selectSubtopic}
          onBack={goToTopics}
        />
      )}

      {mode === 'home' && currentSubtopic && (
        <div className="mode-selector">
          <div className="mode-card" onClick={() => setMode('flashcard')}>
            <div className="mode-icon">🃏</div>
            <h2>Flashcards</h2>
            <p>{currentSubtopic.data.flashcards.length} cards • 5 categories</p>
          </div>
          <div className="mode-card" onClick={() => setMode('quiz')}>
            <div className="mode-icon">📝</div>
            <h2>Quiz Mode</h2>
            <p>
              {currentSubtopic.data.quizzes.mcq.length} MCQs + {' '}
              {currentSubtopic.data.quizzes.comprehensive.length} Comprehensive
            </p>
          </div>
          <div className="mode-card back-card" onClick={goToSubtopics}>
            <div className="mode-icon">⬅️</div>
            <h2>Back to Subtopics</h2>
          </div>
        </div>
      )}

      {mode === 'flashcard' && currentSubtopic && (
        <FlashcardMode 
          flashcards={currentSubtopic.data.flashcards} 
          onBack={goToSubtopicHome}
        />
      )}

      {mode === 'quiz' && currentSubtopic && (
        <QuizMode 
          quizzes={currentSubtopic.data.quizzes} 
          onBack={goToSubtopicHome}
        />
      )}
    </div>
  );
}

export default App;
