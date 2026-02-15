import React, { useState } from 'react';

function QuizMode({ quizzes, onBack }) {
  const [quizType, setQuizType] = useState('mcq'); // mcq or comprehensive
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestions = quizType === 'mcq' ? quizzes.mcq : quizzes.comprehensive;
  const currentQuestion = currentQuestions[currentIndex];

  const handleAnswerSelect = (index) => {
    if (showExplanation) return; // Already answered
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (quizType === 'mcq' && index === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
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

  if (completed) {
    const percentage = quizType === 'mcq' ? Math.round((score / currentQuestions.length) * 100) : null;
    
    return (
      <div className="quiz-container">
        <div className="quiz-results">
          <h2>🎉 Quiz Complete!</h2>
          {quizType === 'mcq' && (
            <>
              <div className="results-score">{score}/{currentQuestions.length}</div>
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
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
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

      <div className="question-card">
        <div className="question-number">
          Question {currentIndex + 1} of {currentQuestions.length}
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
        {(showExplanation || quizType === 'comprehensive') && (
          <button className="nav-btn" onClick={nextQuestion}>
            {currentIndex < currentQuestions.length - 1 ? 'Next Question ➡️' : 'Finish Quiz 🎉'}
          </button>
        )}
      </div>

      <button className="back-btn" onClick={onBack}>
        🏠 Back to Menu
      </button>
    </div>
  );
}

export default QuizMode;
