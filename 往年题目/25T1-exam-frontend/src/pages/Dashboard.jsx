import { useState, useEffect } from 'react';
import { fetchInitialScore } from '../utils/api';
import { getGamesLeft, setGamesLeft, resetGamesLeft, getInitialScore, setInitialScore } from '../utils/storage';
import './Dashboard.css';

const Dashboard = () => {
  const [gamesLeft, setGamesLeftState] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const savedGamesLeft = getGamesLeft();
      const savedInitial = getInitialScore();
      
      if (savedGamesLeft === null) {
        // 首次加载，从API获取
        try {
          const apiScore = await fetchInitialScore();
          setGamesLeftState(apiScore);
          setGamesLeft(apiScore);
          setInitialScore(apiScore);
        } catch (error) {
          const defaultScore = 5;
          setGamesLeftState(defaultScore);
          setGamesLeft(defaultScore);
          setInitialScore(defaultScore);
        }
      } else {
        setGamesLeftState(savedGamesLeft);
      }
      
      setLoading(false);
    };

    initialize();
  }, []);

  const handleReset = async () => {
    const initial = getInitialScore();
    if (initial === null) {
      try {
        const apiScore = await fetchInitialScore();
        resetGamesLeft(apiScore);
        setGamesLeftState(apiScore);
        setInitialScore(apiScore);
      } catch (error) {
        const defaultScore = 5;
        resetGamesLeft(defaultScore);
        setGamesLeftState(defaultScore);
        setInitialScore(defaultScore);
      }
    } else {
      resetGamesLeft(initial);
      setGamesLeftState(initial);
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
        <p className="dashboard-text">Games you need to win:</p>
        <p className="dashboard-counter">{gamesLeft}</p>
        <button onClick={handleReset} className="dashboard-reset-button">
          reset
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

