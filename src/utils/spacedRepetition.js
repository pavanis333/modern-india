// Spaced Repetition (SM-2) utility functions

const SR_PREFIX = 'sr_card_';

export function getCardSR(cardId) {
  const raw = localStorage.getItem(SR_PREFIX + cardId);
  if (raw) {
    return JSON.parse(raw);
  }
  return {
    interval: 0,
    repetitions: 0,
    ease: 2.5,
    nextReview: null, // ISO date string
    lastReview: null,
  };
}

export function setCardSR(cardId, data) {
  localStorage.setItem(SR_PREFIX + cardId, JSON.stringify(data));
}

export function clearAllSR() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(SR_PREFIX)) keys.push(key);
  }
  keys.forEach(k => localStorage.removeItem(k));
}

export function clearCardsSR(cardIds) {
  cardIds.forEach(id => localStorage.removeItem(SR_PREFIX + id));
}

/**
 * SM-2 algorithm
 * quality: 0=Again, 2=Hard, 3=Good, 5=Easy
 */
export function reviewCard(cardId, quality) {
  const sr = getCardSR(cardId);
  const today = new Date().toISOString().slice(0, 10);

  let { interval, repetitions, ease } = sr;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease);
    }
    repetitions += 1;
  } else {
    // Incorrect - reset
    interval = 1;
    repetitions = 0;
  }

  // Adjust ease factor
  ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease < 1.3) ease = 1.3;

  // Calculate next review date
  const next = new Date();
  next.setDate(next.getDate() + interval);
  const nextReview = next.toISOString().slice(0, 10);

  const updated = {
    interval,
    repetitions,
    ease: Math.round(ease * 100) / 100,
    nextReview,
    lastReview: today,
  };

  setCardSR(cardId, updated);
  return updated;
}

/**
 * Check if a card is due for review
 */
export function isDue(cardId) {
  const sr = getCardSR(cardId);
  if (!sr.nextReview) return true; // Never reviewed
  const today = new Date().toISOString().slice(0, 10);
  return sr.nextReview <= today;
}

/**
 * Get days until next review (negative = overdue)
 */
export function daysUntilReview(cardId) {
  const sr = getCardSR(cardId);
  if (!sr.nextReview) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next = new Date(sr.nextReview);
  next.setHours(0, 0, 0, 0);
  return Math.round((next - today) / (1000 * 60 * 60 * 24));
}

/**
 * Sort cards: due first (most overdue first), then by next review date
 */
export function sortByDue(cards) {
  return [...cards].sort((a, b) => {
    const aDays = daysUntilReview(a.id);
    const bDays = daysUntilReview(b.id);
    return aDays - bDays;
  });
}

// Progress utilities
const QUIZ_PREFIX = 'quiz_progress_';

export function getQuizProgress(subtopicId) {
  const raw = localStorage.getItem(QUIZ_PREFIX + subtopicId);
  if (raw) return JSON.parse(raw);
  return { bestScore: 0, totalQuestions: 0, attempts: 0, lastAttempt: null };
}

export function setQuizProgress(subtopicId, data) {
  localStorage.setItem(QUIZ_PREFIX + subtopicId, JSON.stringify(data));
}

export function clearQuizProgress(subtopicId) {
  localStorage.removeItem(QUIZ_PREFIX + subtopicId);
}

export function clearAllQuizProgress() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(QUIZ_PREFIX)) keys.push(key);
  }
  keys.forEach(k => localStorage.removeItem(k));
}

/**
 * Get overall stats across all cards
 */
export function getOverallStats(allCardIds) {
  let reviewed = 0;
  let due = 0;
  let mastered = 0; // interval >= 21 days

  allCardIds.forEach(id => {
    const sr = getCardSR(id);
    if (sr.lastReview) {
      reviewed++;
      if (sr.interval >= 21) mastered++;
    }
    if (isDue(id)) due++;
  });

  return { reviewed, due, mastered, total: allCardIds.length };
}
