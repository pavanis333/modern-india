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
import sikhsData from './data/sikhs.json';
import marathasData from './data/marathas.json';
import rohilkhandData from './data/rohilkhand-farrukhabad.json';
import rajputsData from './data/rajputs.json';
import jatsData from './data/jats.json';
import artArchData from './data/art-architecture-literature.json';
import eduTradeData from './data/education-trade-shipbuilding.json';
import britishBengalData from './data/british-conquest-bengal.json';
import politicalAssocData from './data/political-associations-before-inc.json';
import revolutionaryActData from './data/revolutionary-activities-1907-17.json';
import nonCoopSevenData from './data/non-cooperation-seven-points.json';
import revActPhase2Data from './data/revolutionary-activities-phase2-1920s.json';
import elevenDemandsData from './data/gandhis-eleven-demands.json';
import parallelGovtsData from './data/parallel-governments-quit-india.json';
import twoNationData from './data/two-nation-theory-evolution.json';
import womensIssuesData from './data/womens-issues-and-reforms.json';
import womenMovementsData from './data/women-movements-personalities.json';
import lowerCasteData from './data/lower-caste-movements.json';
import hinduReformData from './data/hindu-reform-movements.json';
import hinduOrgsData from './data/hindu-reform-organizations.json';
import socialReformLateData from './data/social-reform-late-19th-20th.json';
import muslimReformData from './data/muslim-reform-movements.json';
import sikhParsiReformData from './data/sikh-parsi-reform-movements.json';

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
        },
        {
          id: 'sikhs',
          title: 'The Sikhs (The New States)',
          description: 'Guru Tegh Bahadur, Khalsa (1699), Banda Bahadur, Ranjit Singh, Treaty of Amritsar (1809)',
          data: sikhsData
        },
        {
          id: 'marathas',
          title: 'The Marathas (The New States)',
          description: 'Deccan origins, Chauth/Sardeshmukhi, Shivaji, Peshwas, Baji Rao I, Third Panipat (1761)',
          data: marathasData
        },
        {
          id: 'rohilkhand',
          title: 'Rohilkhand and Farrukhabad (The New States)',
          description: 'Rohillas (Daud, Ali Mohammad Khan), Mohammad Khan Bangash, post-Nadir Shah opportunism',
          data: rohilkhandData
        },
        {
          id: 'rajputs',
          title: 'Rise of Rajputs (Independent Kingdoms)',
          description: 'Early 18th century resurgence, Ajit Singh (Ajmer, Gujarat), Jay Singh II (Agra, Surat)',
          data: rajputsData
        },
        {
          id: 'jats',
          title: 'Rise of Jats (The New States)',
          description: 'Agricultural settlers, rebellion against Aurangzeb policies, significant uprisings',
          data: jatsData
        },
        {
          id: 'art-arch-lit',
          title: 'Art, Architecture, and Literature (18th Century)',
          description: 'Bara Imambara, Jaipur observatories, regional literature (Urdu, Malayalam, Tamil, Punjabi, Sindhi)',
          data: artArchData
        },
        {
          id: 'edu-trade-ship',
          title: 'Education, Trade, and Shipbuilding (18th Century)',
          description: 'Traditional education system, textile hubs, imports/exports, shipbuilding centres',
          data: eduTradeData
        },
        {
          id: 'british-bengal',
          title: 'British Conquest of Bengal',
          description: 'Plassey (1757), Buxar (1764), Mir Jafar, Mir Qasim, Dual Government (1765-1772)',
          data: britishBengalData
        }
      ]
    },
    {
      id: 'rise-nationalism',
      title: 'Rise of Nationalism in India 1858-1905',
      description: 'Early political associations, formation of INC, and growth of nationalist movement',
      subtopics: [
        {
          id: 'political-assoc-before-inc',
          title: 'Political Associations Before INC (1836-1885)',
          description: 'Bangabhasha Prakasika Sabha to London Indian Society - evolution toward national movement',
          data: politicalAssocData
        }
      ]
    },
    {
      id: 'national-movement-1905-18',
      title: 'Indian National Movement: 1905-18',
      description: 'Revolutionary activities, extremism, and the nationalist upsurge',
      subtopics: [
        {
          id: 'revolutionary-activities',
          title: 'Revolutionary Activities (Phase: 1907-17)',
          description: 'Anushilan Samiti, Ghadar Party, Berlin Committee, and revolutionary movements',
          data: revolutionaryActData
        }
      ]
    },
    {
      id: 'gandhian-phase-1918-22',
      title: 'Indian National Movement: 1918-22 - Gandhian Phase',
      description: 'Non-Cooperation Movement, Khilafat, and Gandhian mass mobilization',
      subtopics: [
        {
          id: 'non-coop-seven-points',
          title: 'Non-Cooperation Movement - Seven-Point Program',
          description: 'INC seven-point program: titles, courts, education, elections, foreign goods boycott',
          data: nonCoopSevenData
        }
      ]
    },
    {
      id: 'national-movement-1922-29',
      title: 'Indian National Movement: 1922-1929',
      description: 'Revolutionary activities Phase-II, HSRA, and the socialist shift',
      subtopics: [
        {
          id: 'revolutionary-phase2-1920s',
          title: 'Revolutionary Activities (Phase-II in 1920s)',
          description: 'HRA/HSRA, Kakori, Saunders Murder, Assembly Bombing, socialist ideology',
          data: revActPhase2Data
        }
      ]
    },
    {
      id: 'national-movement-1929-42',
      title: 'Indian National Movement: 1929-1942',
      description: 'Civil Disobedience, Gandhi-Irwin Pact, and the Quit India Movement',
      subtopics: [
        {
          id: 'gandhis-eleven-demands',
          title: "Gandhi's Eleven Demands",
          description: 'Three categories: General Interest (6), Bourgeois Demands (3), Peasant Demands (2)',
          data: elevenDemandsData
        }
      ]
    },
    {
      id: 'national-movement-1942-47',
      title: 'Indian National Movement: 1942-1947',
      description: 'Quit India Movement, Parallel Governments, Two-Nation Theory, and Independence',
      subtopics: [
        {
          id: 'parallel-govts-quit-india',
          title: 'Parallel Governments during Quit India Movement',
          description: 'Ballia (Chittu Pandey), Tamluk (Jatiya Sarkar), Satara (Prati Sarkar)',
          data: parallelGovtsData
        },
        {
          id: 'two-nation-theory',
          title: 'Evolution of the Two-Nation Theory',
          description: 'From 1887 anti-Congress to Lahore Resolution 1940 and Partition 1947',
          data: twoNationData
        }
      ]
    },
    {
      id: 'socio-religious-reform',
      title: 'Socio Religious Reform Movement, Organisations and Personalities',
      description: "Women's issues, reforms, education, and social organisations",
      subtopics: [
        {
          id: 'womens-issues-reforms',
          title: "Women's Issues and Reforms",
          description: 'Sati, infanticide, widow remarriage, child marriage, education, organisations',
          data: womensIssuesData
        },
        {
          id: 'women-movements-personalities',
          title: 'Women Movements and Personalities',
          description: 'Chronological 1872-1947: Early Feminist, Kuka, Partition, Home Rule, AIWC, Salt, Quit India',
          data: womenMovementsData
        },
        {
          id: 'lower-caste-movements',
          title: 'Lower Caste Movements in Colonial India',
          description: 'Satyashodhak, SNDP, Justice/Self-Respect, Nair, Depressed Classes, Temple Entry movements',
          data: lowerCasteData
        },
        {
          id: 'hindu-reform-movements',
          title: 'Socio-Cultural Reform Movements Among Hindus',
          description: 'Swaminarayan Sampraday, Brahmo Samaj (Adi/Samaj of India/Sadharan), Paramahansa Mandali',
          data: hinduReformData
        },
        {
          id: 'hindu-reform-organizations',
          title: 'Hindu Reform Organizations and Societies',
          description: 'Young Bengal, Dharma Sabha, Tattvabodhini, Prarthana Samaj, Arya Samaj, Theosophical Society, more',
          data: hinduOrgsData
        },
        {
          id: 'social-reform-late-19th-20th',
          title: 'Social Reform Organizations (Late 19th - Early 20th Century)',
          description: 'INSC, Ramakrishna Mission, Servants of India, Seva Sadan, Social Service League, more',
          data: socialReformLateData
        },
        {
          id: 'muslim-reform-movements',
          title: 'Socio-Cultural Reform Movements Among Muslims',
          description: 'Wahabi, Titu Mir, Faraizi, Deoband, Aligarh, Ahmadiyya movements',
          data: muslimReformData
        },
        {
          id: 'sikh-parsi-reform-movements',
          title: 'Socio-Cultural Reform Movements Among Sikhs and Parsis',
          description: 'Namdhari/Kuka, Singh Sabha, Akali (Sikh); Nirankari, Rehnumai Mazdayasnan Sabha (Parsi)',
          data: sikhParsiReformData
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
