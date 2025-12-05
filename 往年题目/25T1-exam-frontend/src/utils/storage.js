// localStorage工具函数

const GAMES_LEFT_KEY = 'gamesLeftToWin';
const INITIAL_SCORE_KEY = 'initialScore';
const STATS_KEY = 'gameStats';
const ROUNDS_WON_KEY = 'roundsWon';

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

// Stats相关函数
export const getStats = () => {
  const saved = localStorage.getItem(STATS_KEY);
  return saved ? JSON.parse(saved) : {
    numberMemory: { scores: [], wins: 0, plays: 0 },
    flappyBird: { scores: [], wins: 0, plays: 0 },
    treasureHunt: { clickSpeeds: [], wins: 0, plays: 0 },
  };
};

export const saveStats = (stats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const addNumberMemoryScore = (score, won) => {
  const stats = getStats();
  stats.numberMemory.scores.push(score);
  if (won) stats.numberMemory.wins++;
  stats.numberMemory.plays++;
  saveStats(stats);
};

export const addFlappyBirdScore = (score, won) => {
  const stats = getStats();
  stats.flappyBird.scores.push(score);
  if (won) stats.flappyBird.wins++;
  stats.flappyBird.plays++;
  saveStats(stats);
};

export const addTreasureHuntStats = (clicks, time, won) => {
  const stats = getStats();
  const clickSpeed = clicks / time;
  stats.treasureHunt.clickSpeeds.push(clickSpeed);
  if (won) stats.treasureHunt.wins++;
  stats.treasureHunt.plays++;
  saveStats(stats);
};

export const getRoundsWon = () => {
  const saved = localStorage.getItem(ROUNDS_WON_KEY);
  return saved ? parseInt(saved, 10) : 0;
};

export const incrementRoundsWon = () => {
  const current = getRoundsWon();
  const newValue = current + 1;
  localStorage.setItem(ROUNDS_WON_KEY, newValue.toString());
  return newValue;
};

