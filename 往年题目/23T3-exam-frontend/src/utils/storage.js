// localStorage工具函数

const GAMES_WON_KEY = 'gamesWon';
const INITIAL_SCORE_KEY = 'initialScore';

export const getGamesWon = () => {
  const saved = localStorage.getItem(GAMES_WON_KEY);
  return saved ? parseInt(saved, 10) : null;
};

export const setGamesWon = (score) => {
  localStorage.setItem(GAMES_WON_KEY, score.toString());
};

export const incrementGamesWon = () => {
  const current = getGamesWon();
  const newScore = (current || 0) + 1;
  setGamesWon(newScore);
  return newScore;
};

export const resetGamesWon = (initialValue) => {
  setGamesWon(initialValue);
};

export const getInitialScore = () => {
  const saved = localStorage.getItem(INITIAL_SCORE_KEY);
  return saved ? parseInt(saved, 10) : null;
};

export const setInitialScore = (value) => {
  localStorage.setItem(INITIAL_SCORE_KEY, value.toString());
};

