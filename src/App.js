import React, { useState } from 'react';
import './App.css';
import TopicSelector from './components/TopicSelector';
import SubtopicSelector from './components/SubtopicSelector';
import FlashcardMode from './components/FlashcardMode';
import QuizMode from './components/QuizMode';
import europeansData from './data/europeans-in-india.json';
import portugueseData from './data/portuguese-in-india.json';
import dutchData from './data/dutch-in-india.json';
import danishData from './data/danish-in-india.json';
import englishData from './data/english-in-india.json';
import frenchData from './data/french-in-india.json';
import indiaEveData from './data/india-eve-british-conquest.json';
import regionalStatesData from './data/rise-regional-states.json';
import hyderabadData from './data/hyderabad.json';
import awadhData from './data/awadh.json';
import bengalData from './data/bengal.json';
import mysoreKeralaData from './data/mysore-kerala.json';

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
        },
        {
          id: 'dutch',
          title: 'Dutch in India',
          description: 'VOC, Spice trade, Battle of Colachel, Amboyna Massacre, and Dutch withdrawal',
          data: dutchData
        },
        {
          id: 'danish',
          title: 'Danish (Danes) in India',
          description: 'Tranquebar, Serampore, missionary activities, and sale to British (1845)',
          data: danishData
        },
        {
          id: 'english',
          title: 'The English in India',
          description: 'EIC charter, early ventures, Bombay, Madras, Bengal expansion, and Company developments',
          data: englishData
        },
        {
          id: 'french',
          title: 'The French in India',
          description: 'Compagnie des Indes, Pondicherry, Chandernagore, and French expansion',
          data: frenchData
        },
        {
          id: 'india-eve',
          title: 'India on the Eve of British Conquest',
          description: 'Mughal decline, Nadir Shah, Ahmad Shah Abdali, Later Mughals (1707-1858)',
          data: indiaEveData
        },
        {
          id: 'regional-states',
          title: 'Rise of Regional States',
          description: 'Successor States, Independent Kingdoms, The New States - categorization and examples',
          data: regionalStatesData
        },
        {
          id: 'hyderabad',
          title: 'Hyderabad (Successor State)',
          description: 'Nizam-ul-Mulk, Battle of Shaker-Kheda (1724), administration, Maratha conflict, succession',
          data: hyderabadData
        },
        {
          id: 'awadh',
          title: 'Awadh (Successor State)',
          description: 'Saadat Khan (1722), Safdar Jung, Battle of Buxar (1764), decline',
          data: awadhData
        },
        {
          id: 'bengal',
          title: 'Bengal (Successor State)',
          description: 'Murshid Quli Khan (1717), Mal Jasmani, succession, Battle of Plassey (1757)',
          data: bengalData
        },
        {
          id: 'mysore-kerala',
          title: 'Rise of Mysore and Kerala',
          description: 'Wodeyars, Haider Ali, Tipu Sultan, Martanda Varma, Travancore (Independent Kingdoms)',
          data: mysoreKeralaData
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
