import React, { useState } from 'react';
import { getQuizProgress, setQuizProgress, clearQuizProgress } from '../utils/spacedRepetition';

function QuizMode({ quizzes, subtopicId, onBack }) {
  const [quizType, setQuizType] = useState('mcq');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  const currentQuestions = quizType === 'mcq' ? quizzes.mcq : quizzes.comprehensive;
  const currentQuestion = currentQuestions[currentIndex];

  // Load previous progress indicator
  const prevProgress = getQuizProgress(subtopicId + '_' + quizType);

  const handleAnswerSelect = (index) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    setAnsweredCount(prev => prev + 1);

    if (quizType === 'mcq' && index === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }
  };

  const showCompAnswer = () => {
    setShowExplanation(true);
    setAnsweredCount(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIndex >= currentQuestions.length - 1) {
      // Save progress
      const progressKey = subtopicId + '_' + quizType;
      const prev = getQuizProgress(progressKey);
      const newScore = quizType === 'mcq' ? score : answeredCount;
      setQuizProgress(progressKey, {
        bestScore: Math.max(prev.bestScore || 0, newScore),
        totalQuestions: currentQuestions.length,
        attempts: (prev.attempts || 0) + 1,
        lastAttempt: new Date().toISOString(),
      });
      setCompleted(true);
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const prevQuestion = () => {
    if (currentIndex <= 0) return;
    setCurrentIndex(currentIndex - 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
    setAnsweredCount(0);
  };

  const changeQuizType = (type) => {
    setQuizType(type);
    resetQuiz();
  };

  const resetProgress = () => {
    if (window.confirm('Reset quiz progress for this subtopic?')) {
      clearQuizProgress(subtopicId + '_mcq');
      clearQuizProgress(subtopicId + '_comprehensive');
      resetQuiz();
    }
  };

  if (completed) {
    const percentage = quizType === 'mcq' ? Math.round((score / currentQuestions.length) * 100) : null;

    return (
      <div className="quiz-container">
        <div className="quiz-results">
          <h2>🎉 Quiz Complete!</h2>
          {quizType === 'mcq' ? (
            <>
              <div className="results-score">{score}/{currentQuestions.length}</div>
              <div className="results-message">
                {percentage >= 80 ? '🌟 Excellent! You\'re well prepared!' :
                 percentage >= 60 ? '👍 Good effort! Keep at it!' :
                 '📚 Keep studying — you\'ll get there!'}
              </div>
            </>
          ) : (
            <div className="results-message">
              You've reviewed all {currentQuestions.length} comprehensive questions!
            </div>
          )}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="nav-btn" onClick={resetQuiz}>🔄 Retry</button>
            <button className="back-btn" onClick={onBack}>← Back to Menu</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Quiz type selector */}
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

      {/* Previous best */}
      {prevProgress.attempts > 0 && (
        <div style={{
          textAlign: 'center',
          marginBottom: '16px',
          fontSize: '0.9rem',
          color: 'var(--text-muted)'
        }}>
          Best: <strong style={{ color: 'var(--accent)' }}>{prevProgress.bestScore}/{prevProgress.totalQuestions}</strong>
          {' · '}{prevProgress.attempts} attempt{prevProgress.attempts !== 1 ? 's' : ''}
        </div>
      )}

      {/* Progress bar */}
      <div className="flashcard-progress" style={{ marginBottom: '16px' }}>
        <div className="flashcard-progress-row">
          <strong>Question {currentIndex + 1} of {currentQuestions.length}</strong>
          {quizType === 'mcq' && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Score: <strong style={{ color: 'var(--success)' }}>{score}</strong>/{answeredCount}
            </span>
          )}
        </div>
        <div style={{ marginTop: '8px' }}>
          <div className="progress-bar" style={{ height: '6px' }}>
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
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
          <>
            {!showExplanation ? (
              <button className="nav-btn" onClick={showCompAnswer} style={{ marginTop: '16px' }}>
                👁 Show Answer
              </button>
            ) : (
              <div className="comprehensive-answer">
                <strong>Answer:</strong>
                <p style={{ marginTop: '10px' }}>{currentQuestion.answer}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="quiz-nav">
        <button className="nav-btn" onClick={prevQuestion} disabled={currentIndex === 0}>
          ← Previous
        </button>
        <button className="nav-btn" onClick={nextQuestion}>
          {currentIndex < currentQuestions.length - 1 ? 'Next →' : '✅ Finish'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
        <button className="back-btn" onClick={onBack}>← Back to Menu</button>
        <button className="reset-btn" onClick={resetProgress}>🔄 Reset Progress</button>
      </div>
    </div>
  );
}

export default QuizMode;
