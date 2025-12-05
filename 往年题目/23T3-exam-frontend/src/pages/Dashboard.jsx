import { useState, useEffect } from 'react';
import { fetchInitialScore } from '../utils/api';
import { getGamesWon, setGamesWon, resetGamesWon, getInitialScore, setInitialScore } from '../utils/storage';
import './Dashboard.css';

const Dashboard = ({ onGamesWonChange }) => {
  const [gamesWon, setGamesWonState] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const savedWon = getGamesWon();
      const savedInitial = getInitialScore();
      
      if (savedWon === null) {
        // 首次加载，从API获取
        try {
          const apiScore = await fetchInitialScore();
          setGamesWonState(apiScore);
          setGamesWon(apiScore);
          setInitialScore(apiScore);
          if (onGamesWonChange) {
            onGamesWonChange(apiScore);
          }
        } catch (error) {
          const defaultScore = 5;
          setGamesWonState(defaultScore);
          setGamesWon(defaultScore);
          setInitialScore(defaultScore);
          if (onGamesWonChange) {
            onGamesWonChange(defaultScore);
          }
        }
      } else {
        setGamesWonState(savedWon);
        if (onGamesWonChange) {
          onGamesWonChange(savedWon);
        }
      }
      
      setLoading(false);
    };

    initialize();
  }, [onGamesWonChange]);

  const handleReset = async () => {
    try {
      const apiScore = await fetchInitialScore();
      resetGamesWon(apiScore);
      setGamesWonState(apiScore);
      setInitialScore(apiScore);
      if (onGamesWonChange) {
        onGamesWonChange(apiScore);
      }
    } catch (error) {
      const defaultScore = 5;
      resetGamesWon(defaultScore);
      setGamesWonState(defaultScore);
      setInitialScore(defaultScore);
      if (onGamesWonChange) {
        onGamesWonChange(defaultScore);
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <p className="dashboard-text">Please choose an option from the navbar.</p>
        <p className="dashboard-score">
          Games won: {gamesWon}{' '}
          <button onClick={handleReset} className="reset-button">
            (reset)
          </button>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

