import React, { useState } from 'react';

function FlashcardMode({ flashcards, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentIndex];

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container">
      <div className="flashcard-progress">
        <strong>Card {currentIndex + 1} of {flashcards.length}</strong>
        <div style={{ 
          background: '#ddd', 
          height: '8px', 
          borderRadius: '4px', 
          marginTop: '10px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            height: '100%', 
            width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={flipCard}
      >
        <div className="flashcard-content">
          {isFlipped ? currentCard.back : currentCard.front}
        </div>
        <div className="card-flip-hint">
          {isFlipped ? '(Click to see question)' : '(Click to reveal answer)'}
        </div>
      </div>

      <div className="flashcard-nav">
        <button 
          className="nav-btn"
          onClick={prevCard}
          disabled={currentIndex === 0}
        >
          ⬅️ Previous
        </button>
        <button 
          className="nav-btn"
          onClick={nextCard}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next ➡️
        </button>
      </div>

      <button className="back-btn" onClick={onBack}>
        🏠 Back to Menu
      </button>
    </div>
  );
}

export default FlashcardMode;
