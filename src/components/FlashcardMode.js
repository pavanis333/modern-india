import React, { useState, useEffect } from 'react';

function FlashcardMode({ flashcards, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [masteredCards, setMasteredCards] = useState({});
  const [filterMode, setFilterMode] = useState('all'); // all, unmastered, mastered

  // Load mastered cards from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('masteredCards');
    if (saved) {
      setMasteredCards(JSON.parse(saved));
    }
  }, []);

  // Save mastered cards to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('masteredCards', JSON.stringify(masteredCards));
  }, [masteredCards]);

  // Get unique categories
  const categories = ['all', ...new Set(flashcards.map(card => card.category || 'Uncategorized'))];
  
  // Filter cards by category
  let filteredCards = selectedCategory === 'all' 
    ? flashcards 
    : flashcards.filter(card => (card.category || 'Uncategorized') === selectedCategory);

  // Further filter by mastery status
  if (filterMode === 'unmastered') {
    filteredCards = filteredCards.filter(card => !masteredCards[card.id]);
  } else if (filterMode === 'mastered') {
    filteredCards = filteredCards.filter(card => masteredCards[card.id]);
  }

  const currentCard = filteredCards[currentIndex];

  // Count mastered cards in current category
  const masteredCount = filteredCards.filter(card => masteredCards[card.id]).length;

  const nextCard = () => {
    // Circular: wrap to 0 if at end
    setCurrentIndex((currentIndex + 1) % filteredCards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    // Circular: wrap to end if at beginning
    setCurrentIndex((currentIndex - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleMastered = () => {
    setMasteredCards(prev => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id]
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleFilterChange = (mode) => {
    setFilterMode(mode);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const resetMastery = () => {
    if (window.confirm('Reset all mastery progress for this subtopic?')) {
      setMasteredCards({});
      localStorage.removeItem('masteredCards');
    }
  };

  if (filteredCards.length === 0) {
    return (
      <div className="flashcard-container">
        <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
          <h2>🎉 No cards to show!</h2>
          <p>All cards in this category are mastered or no cards match the filter.</p>
          <button className="nav-btn" onClick={() => handleFilterChange('all')} style={{ marginTop: '20px' }}>
            Show All Cards
          </button>
          <button className="back-btn" onClick={onBack} style={{ marginTop: '20px' }}>
            🏠 Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcard-container">
      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat === 'all' ? '📚 All' : cat}
            {cat !== 'all' && ` (${flashcards.filter(c => c.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Mastery Filter */}
      <div className="mastery-filter">
        <button
          className={`filter-btn ${filterMode === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Cards
        </button>
        <button
          className={`filter-btn ${filterMode === 'unmastered' ? 'active' : ''}`}
          onClick={() => handleFilterChange('unmastered')}
        >
          📖 To Learn ({filteredCards.length - masteredCount})
        </button>
        <button
          className={`filter-btn ${filterMode === 'mastered' ? 'active' : ''}`}
          onClick={() => handleFilterChange('mastered')}
        >
          ✅ Mastered ({masteredCount})
        </button>
      </div>

      <div className="flashcard-progress">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>Card {currentIndex + 1} of {filteredCards.length}</strong>
            {currentCard.category && (
              <span style={{ marginLeft: '15px', color: '#667eea', fontSize: '0.9rem' }}>
                📂 {currentCard.category}
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#888' }}>
            <strong>{masteredCount}/{filteredCards.length}</strong> mastered
          </div>
        </div>
        <div style={{ 
          background: '#ddd', 
          height: '8px', 
          borderRadius: '4px', 
          marginTop: '10px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            background: 'linear-gradient(90deg, #4caf50 0%, #45a049 100%)',
            height: '100%', 
            width: `${(masteredCount / filteredCards.length) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''} ${masteredCards[currentCard.id] ? 'mastered-card' : ''}`}
        onClick={flipCard}
      >
        {masteredCards[currentCard.id] && (
          <div className="mastered-badge">✓ Mastered</div>
        )}
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
        >
          ⬅️ Previous
        </button>
        
        <button 
          className={`mastery-btn ${masteredCards[currentCard.id] ? 'mastered' : ''}`}
          onClick={toggleMastered}
        >
          {masteredCards[currentCard.id] ? '✓ Mastered' : '👍 Mark as Mastered'}
        </button>

        <button 
          className="nav-btn"
          onClick={nextCard}
        >
          Next ➡️
        </button>
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
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

export default FlashcardMode;
