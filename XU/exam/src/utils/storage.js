/**
 * localStorage utility functions
 */

const STORAGE_KEY = 'gamesWon';

/**
 * Get games won from localStorage
 * @returns {number} Number of games won
 */
export const getGamesWon = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? parseInt(saved, 10) : 0;
};

/**
 * Set games won to localStorage
 * @param {number} count - Number of games won
 */
export const setGamesWon = (count) => {
  localStorage.setItem(STORAGE_KEY, count.toString());
};

/**
 * Increment games won counter
 * @returns {number} New count
 */
export const incrementGamesWon = () => {
  const current = getGamesWon();
  const newCount = current + 1;
  setGamesWon(newCount);
  return newCount;
};

/**
 * Reset games won counter
 */
export const resetGamesWon = () => {
  localStorage.removeItem(STORAGE_KEY);
};

