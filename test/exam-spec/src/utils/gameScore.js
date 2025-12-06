export const decrementGamesLeft = () => {
  const currentScore = localStorage.getItem('gamesLeft');
  if (currentScore !== null) {
    const newScore = Math.max(0, parseInt(currentScore) - 1);
    localStorage.setItem('gamesLeft', newScore.toString());
    window.dispatchEvent(new Event('gameWon'));
    return newScore;
  }
  return null;
};

export const getGamesLeft = () => {
  const score = localStorage.getItem('gamesLeft');
  return score !== null ? parseInt(score) : null;
};

export const resetGamesLeft = async () => {
  try {
    const response = await fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/score.json');
    const data = await response.json();
    localStorage.setItem('gamesLeft', data.score.toString());
    window.dispatchEvent(new Event('gameWon'));
    return data.score;
  } catch (error) {
    console.error('Error fetching score:', error);
    return null;
  }
};

