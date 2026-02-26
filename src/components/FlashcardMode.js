import React, { useState, useCallback } from 'react';
import { getCardSR, reviewCard, isDue, daysUntilReview, sortByDue, clearCardsSR } from '../utils/spacedRepetition';

function FlashcardMode({ flashcards, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterMode, setFilterMode] = useState('due'); // due, all, reviewed
  const [, setTick] = useState(0); // force re-render after SR update
  const forceUpdate = useCallback(() => setTick(t => t + 1), []);

  // Get unique categories
  const categories = ['all', ...new Set(flashcards.map(card => card.category || 'Uncategorized'))];

  // Filter by category
  let filteredCards = selectedCategory === 'all'
    ? flashcards
    : flashcards.filter(card => (card.category || 'Uncategorized') === selectedCategory);

  // Filter by review status
  if (filterMode === 'due') {
    filteredCards = sortByDue(filteredCards.filter(card => isDue(card.id)));
  } else if (filterMode === 'reviewed') {
    filteredCards = filteredCards.filter(card => !isDue(card.id));
  } else {
    filteredCards = sortByDue(filteredCards);
  }

  const currentCard = filteredCards[currentIndex];

  // Stats
  const allInCategory = selectedCategory === 'all'
    ? flashcards : flashcards.filter(c => (c.category || 'Uncategorized') === selectedCategory);
  const dueCount = allInCategory.filter(c => isDue(c.id)).length;
  const reviewedCount = allInCategory.filter(c => {
    const sr = getCardSR(c.id);
    return sr.lastReview !== null;
  }).length;

  const nextCard = () => {
    if (filteredCards.length <= 1) return;
    setCurrentIndex((currentIndex + 1) % filteredCards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    if (filteredCards.length <= 1) return;
    setCurrentIndex((currentIndex - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
  };

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleRating = (quality) => {
    if (!currentCard) return;
    reviewCard(currentCard.id, quality);
    forceUpdate();
    // Auto-advance after rating
    if (filteredCards.length > 1) {
      setTimeout(() => {
        // Recalculate after update
        setCurrentIndex(prev => {
          const newFiltered = filterMode === 'due'
            ? sortByDue(allInCategory.filter(c => isDue(c.id)))
            : filteredCards;
          if (prev >= newFiltered.length) return 0;
          return prev;
        });
        setIsFlipped(false);
      }, 300);
    } else {
      setIsFlipped(false);
    }
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

  const resetProgress = () => {
    if (window.confirm('Reset all spaced repetition progress for these flashcards?')) {
      clearCardsSR(flashcards.map(c => c.id));
      setCurrentIndex(0);
      setIsFlipped(false);
      forceUpdate();
    }
  };

  // Get SR info for current card
  const currentSR = currentCard ? getCardSR(currentCard.id) : null;
  const currentDays = currentCard ? daysUntilReview(currentCard.id) : 0;

  if (filteredCards.length === 0) {
    return (
      <div className="flashcard-container">
        <div className="empty-state">
          <h2>🎉 {filterMode === 'due' ? 'All caught up!' : 'No cards here'}</h2>
          <p style={{ fontSize: '1.05rem' }}>
            {filterMode === 'due'
              ? 'No cards are due for review right now. Great job!'
              : 'No cards match this filter.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
            <button className="nav-btn" onClick={() => handleFilterChange('all')}>
              Show All Cards
            </button>
            <button className="back-btn" onClick={onBack}>
              ← Back to Menu
            </button>
          </div>
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
          </button>
        ))}
      </div>

      {/* Filter by review status */}
      <div className="mastery-filter">
        <button
          className={`filter-btn ${filterMode === 'due' ? 'active' : ''}`}
          onClick={() => handleFilterChange('due')}
        >
          🔥 Due ({dueCount})
        </button>
        <button
          className={`filter-btn ${filterMode === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Cards ({allInCategory.length})
        </button>
        <button
          className={`filter-btn ${filterMode === 'reviewed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('reviewed')}
        >
          ✅ Learned ({reviewedCount})
        </button>
      </div>

      {/* Progress */}
      <div className="flashcard-progress">
        <div className="flashcard-progress-row">
          <strong>Card {currentIndex + 1} of {filteredCards.length}</strong>
          <div className="flashcard-progress-mastered">
            <strong>{reviewedCount}</strong>/{allInCategory.length} reviewed · <strong>{dueCount}</strong> due
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <div className="progress-bar" style={{ height: '6px' }}>
            <div
              className={`progress-bar-fill ${reviewedCount === allInCategory.length ? 'complete' : ''}`}
              style={{ width: `${(reviewedCount / allInCategory.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div
        className={`flashcard ${isFlipped ? 'flipped' : ''} ${currentSR && currentSR.interval >= 21 ? 'mastered-card' : ''}`}
        onClick={flipCard}
      >
        {currentSR && currentSR.interval >= 21 && (
          <div className="mastered-badge">✓ Mastered</div>
        )}
        <div className={`flashcard-content ${(isFlipped ? currentCard.back : currentCard.front).length > 200 ? 'compact' : ''}`}>
          {isFlipped ? currentCard.back : currentCard.front}
        </div>
        <div className="card-flip-hint">
          {isFlipped ? '(Click to see question)' : '(Click to reveal answer)'}
        </div>
      </div>

      {/* SR Info */}
      {currentSR && (
        <div className="sr-info">
          {currentSR.lastReview && (
            <>
              <span>📅 Interval: {currentSR.interval}d</span>
              <span>
                {currentDays <= 0
                  ? <span style={{ color: 'var(--danger)' }}>⏰ Due now</span>
                  : `Next: ${currentDays}d`
                }
              </span>
            </>
          )}
          {!currentSR.lastReview && <span>🆕 New card</span>}
        </div>
      )}

      {/* SR Rating Buttons (show when flipped) */}
      {isFlipped && (
        <div className="sr-buttons">
          <button className="sr-btn again" onClick={() => handleRating(0)}>
            Again
          </button>
          <button className="sr-btn hard" onClick={() => handleRating(2)}>
            Hard
          </button>
          <button className="sr-btn good" onClick={() => handleRating(3)}>
            Good
          </button>
          <button className="sr-btn easy" onClick={() => handleRating(5)}>
            Easy
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flashcard-nav">
        <button className="nav-btn" onClick={prevCard}>
          ← Previous
        </button>
        <button className="nav-btn" onClick={nextCard}>
          Next →
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
        <button className="back-btn" onClick={onBack}>
          ← Back to Menu
        </button>
        <button className="reset-btn" onClick={resetProgress}>
          🔄 Reset Progress
        </button>
      </div>
    </div>
  );
}

export default FlashcardMode;
