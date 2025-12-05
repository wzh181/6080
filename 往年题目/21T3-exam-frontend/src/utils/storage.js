// localStorage工具函数

const GAMES_WON_KEY = 'gamesWon';
const REMAINING_GAMES_KEY = 'remainingGames';

export const getGamesWon = () => {
  const saved = localStorage.getItem(GAMES_WON_KEY);
  return saved ? parseInt(saved, 10) : 0;
};

export const setGamesWon = (score) => {
  localStorage.setItem(GAMES_WON_KEY, score.toString());
};

export const incrementGamesWon = () => {
  const current = getGamesWon();
  const newScore = current + 1;
  setGamesWon(newScore);
  return newScore;
};

export const resetGamesWon = () => {
  localStorage.setItem(GAMES_WON_KEY, '0');
};

export const getRemainingGames = () => {
  const saved = localStorage.getItem(REMAINING_GAMES_KEY);
  return saved ? parseInt(saved, 10) : null;
};

export const setRemainingGames = (remaining) => {
  localStorage.setItem(REMAINING_GAMES_KEY, remaining.toString());
};

export const resetRemainingGames = (initialValue) => {
  localStorage.setItem(REMAINING_GAMES_KEY, initialValue.toString());
};

