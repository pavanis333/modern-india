import React, { useState, useEffect } from 'react';

function QuizMode({ quizzes, onBack }) {
  const [quizType, setQuizType] = useState('mcq'); // mcq or comprehensive
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [masteredQuestions, setMasteredQuestions] = useState({});
  const [filterMode, setFilterMode] = useState('all'); // all, unmastered, mastered

  // Load mastered questions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('masteredQuestions');
    if (saved) {
      setMasteredQuestions(JSON.parse(saved));
    }
  }, []);

  // Save mastered questions to localStorage
  useEffect(() => {
    localStorage.setItem('masteredQuestions', JSON.stringify(masteredQuestions));
  }, [masteredQuestions]);

  const currentQuestions = quizType === 'mcq' ? quizzes.mcq : quizzes.comprehensive;
  
  // Filter by mastery status
  let filteredQuestions = currentQuestions;
  if (filterMode === 'unmastered') {
    filteredQuestions = currentQuestions.filter(q => !masteredQuestions[q.id]);
  } else if (filterMode === 'mastered') {
    filteredQuestions = currentQuestions.filter(q => masteredQuestions[q.id]);
  }

  const currentQuestion = filteredQuestions[currentIndex];
  const masteredCount = filteredQuestions.filter(q => masteredQuestions[q.id]).length;

  const handleAnswerSelect = (index) => {
    if (showExplanation) return; // Already answered
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (quizType === 'mcq' && index === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    // Circular: wrap to beginning if at end
    const nextIdx = (currentIndex + 1) % filteredQuestions.length;
    setCurrentIndex(nextIdx);
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    // If we've wrapped around, mark as completed
    if (nextIdx === 0 && currentIndex === filteredQuestions.length - 1) {
      setCompleted(true);
    }
  };

  const prevQuestion = () => {
    // Circular: wrap to end if at beginning
    setCurrentIndex((currentIndex - 1 + filteredQuestions.length) % filteredQuestions.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const toggleMastered = () => {
    setMasteredQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  const changeQuizType = (type) => {
    setQuizType(type);
    resetQuiz();
  };

  const handleFilterChange = (mode) => {
    setFilterMode(mode);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const resetMastery = () => {
    if (window.confirm('Reset all quiz mastery progress for this subtopic?')) {
      setMasteredQuestions({});
      localStorage.removeItem('masteredQuestions');
    }
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="quiz-container">
        <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
          <h2>🎉 No questions to show!</h2>
          <p>All questions are mastered or no questions match the filter.</p>
          <button className="nav-btn" onClick={() => handleFilterChange('all')} style={{ marginTop: '20px' }}>
            Show All Questions
          </button>
          <button className="back-btn" onClick={onBack} style={{ marginTop: '20px' }}>
            🏠 Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    const percentage = quizType === 'mcq' ? Math.round((score / filteredQuestions.length) * 100) : null;
    
    return (
      <div className="quiz-container">
        <div className="quiz-results">
          <h2>🎉 Quiz Complete!</h2>
          {quizType === 'mcq' && (
            <>
              <div className="results-score">{score}/{filteredQuestions.length}</div>
              <div className="results-message">
                {percentage >= 80 ? '🌟 Excellent! You\'re well prepared!' :
                 percentage >= 60 ? '👍 Good job! Keep practicing!' :
                 '📚 Keep studying, you\'ll get there!'}
              </div>
            </>
          )}
          {quizType === 'comprehensive' && (
            <div className="results-message">
              You've reviewed all comprehensive questions!
            </div>
          )}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="nav-btn" onClick={resetQuiz}>
              🔄 Retry Quiz
            </button>
            <button className="back-btn" onClick={onBack}>
              🏠 Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-type-selector">
        <button 
          className={`quiz-type-btn ${quizType === 'mcq' ? 'active' : ''}`}
          onClick={() => changeQuizType('mcq')}
        >
          📝 MCQ ({quizzes.mcq.length})
        </button>
        <button 
          className={`quiz-type-btn ${quizType === 'comprehensive' ? 'active' : ''}`}
          onClick={() => changeQuizType('comprehensive')}
        >
          📖 Comprehensive ({quizzes.comprehensive.length})
        </button>
      </div>

      {/* Mastery Filter */}
      <div className="mastery-filter">
        <button
          className={`filter-btn ${filterMode === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Questions
        </button>
        <button
          className={`filter-btn ${filterMode === 'unmastered' ? 'active' : ''}`}
          onClick={() => handleFilterChange('unmastered')}
        >
          📖 To Practice ({filteredQuestions.length - masteredCount})
        </button>
        <button
          className={`filter-btn ${filterMode === 'mastered' ? 'active' : ''}`}
          onClick={() => handleFilterChange('mastered')}
        >
          ✅ Mastered ({masteredCount})
        </button>
      </div>

      <div className={`question-card ${masteredQuestions[currentQuestion.id] ? 'mastered-question' : ''}`}>
        {masteredQuestions[currentQuestion.id] && (
          <div className="mastered-badge">✓ Mastered</div>
        )}
        
        <div className="question-number">
          Question {currentIndex + 1} of {filteredQuestions.length}
          <span style={{ marginLeft: '15px', fontSize: '0.85rem', color: '#888' }}>
            {masteredCount}/{filteredQuestions.length} mastered
          </span>
        </div>
        
        <div className="question-text">
          {currentQuestion.question}
        </div>

        {quizType === 'mcq' ? (
          <>
            <div className="options-list">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn 
                    ${selectedAnswer === index ? 'selected' : ''}
                    ${showExplanation && index === currentQuestion.correct ? 'correct' : ''}
                    ${showExplanation && selectedAnswer === index && index !== currentQuestion.correct ? 'incorrect' : ''}
                  `}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="explanation">
                <div className="explanation-title">
                  {selectedAnswer === currentQuestion.correct ? '✅ Correct!' : '❌ Incorrect'}
                </div>
                <div>{currentQuestion.explanation}</div>
              </div>
            )}
          </>
        ) : (
          <div className="comprehensive-answer">
            <strong>Answer:</strong>
            <p style={{ marginTop: '10px' }}>{currentQuestion.answer}</p>
          </div>
        )}
      </div>

      <div className="quiz-nav">
        <button className="nav-btn" onClick={prevQuestion}>
          ⬅️ Previous
        </button>

        <button 
          className={`mastery-btn ${masteredQuestions[currentQuestion.id] ? 'mastered' : ''}`}
          onClick={toggleMastered}
        >
          {masteredQuestions[currentQuestion.id] ? '✓ Mastered' : '👍 Mark as Mastered'}
        </button>

        <button className="nav-btn" onClick={nextQuestion}>
          {currentIndex < filteredQuestions.length - 1 ? 'Next ➡️' : '🔄 Loop to Start'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
        <button className="back-btn" onClick={onBack}>
          🏠 Back to Menu
        </button>
        <button className="reset-btn" onClick={resetMastery}>
          🔄 Reset Progress
        </button>
      </div>
    </div>
  );
}

export default QuizMode;
