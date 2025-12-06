import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [gamesLeft, setGamesLeft] = useState(null);
  const [initialScore, setInitialScore] = useState(null);

  useEffect(() => {
    const fetchInitialScore = async () => {
      try {
        const response = await fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/score.json');
        const data = await response.json();
        setInitialScore(data.score);
        
        const storedScore = localStorage.getItem('gamesLeft');
        if (storedScore !== null) {
          setGamesLeft(parseInt(storedScore));
        } else {
          setGamesLeft(data.score);
          localStorage.setItem('gamesLeft', data.score.toString());
        }
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    fetchInitialScore();
  }, []);

  useEffect(() => {
    const checkWin = () => {
      const storedScore = localStorage.getItem('gamesLeft');
      if (storedScore !== null) {
        setGamesLeft(parseInt(storedScore));
      }
    };

    window.addEventListener('storage', checkWin);
    window.addEventListener('gameWon', checkWin);
    
    return () => {
      window.removeEventListener('storage', checkWin);
      window.removeEventListener('gameWon', checkWin);
    };
  }, []);

  useEffect(() => {
    if (gamesLeft === 0 && initialScore !== null) {
      alert('Congratulations!');
      setGamesLeft(initialScore);
      localStorage.setItem('gamesLeft', initialScore.toString());
    }
  }, [gamesLeft, initialScore]);

  const handleReset = () => {
    if (initialScore !== null) {
      setGamesLeft(initialScore);
      localStorage.setItem('gamesLeft', initialScore.toString());
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-text">Choose your option from the navbar.</div>
        <div className="dashboard-text">Games you need to win: {gamesLeft}</div>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Dashboard;
