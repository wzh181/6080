// localStorage工具函数

const GAMES_LEFT_KEY = 'gamesLeftToWin';
const INITIAL_SCORE_KEY = 'initialScore';

export const getGamesLeft = () => {
  const saved = localStorage.getItem(GAMES_LEFT_KEY);
  return saved ? parseInt(saved, 10) : null;
};

export const setGamesLeft = (value) => {
  localStorage.setItem(GAMES_LEFT_KEY, value.toString());
};

export const decrementGamesLeft = () => {
  const current = getGamesLeft();
  if (current !== null && current > 0) {
    const newValue = current - 1;
    setGamesLeft(newValue);
    return newValue;
  }
  return current;
};

export const resetGamesLeft = (initialValue) => {
  setGamesLeft(initialValue);
};

export const getInitialScore = () => {
  const saved = localStorage.getItem(INITIAL_SCORE_KEY);
  return saved ? parseInt(saved, 10) : null;
};

export const setInitialScore = (value) => {
  localStorage.setItem(INITIAL_SCORE_KEY, value.toString());
};

