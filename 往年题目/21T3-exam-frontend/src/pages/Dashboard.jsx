import { useState, useEffect } from 'react';
import { fetchRemainingGames, INITIAL_REMAINING } from '../utils/api';
import { getGamesWon, resetGamesWon, getRemainingGames, setRemainingGames, resetRemainingGames } from '../utils/storage';
import './Dashboard.css';

const Dashboard = ({ onGameWin }) => {
  const [remaining, setRemaining] = useState(INITIAL_REMAINING);
  const [gamesWon, setGamesWon] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const savedRemaining = getRemainingGames();
      const savedWon = getGamesWon();
      
      if (savedRemaining === null) {
        // 首次加载，尝试从API获取
        try {
          const apiRemaining = await fetchRemainingGames();
          setRemaining(apiRemaining);
          setRemainingGames(apiRemaining);
        } catch (error) {
          setRemaining(INITIAL_REMAINING);
          setRemainingGames(INITIAL_REMAINING);
        }
      } else {
        setRemaining(savedRemaining);
      }
      
      setGamesWon(savedWon);
      setLoading(false);
    };

    initialize();
  }, []);

  const handleReset = async () => {
    try {
      const apiRemaining = await fetchRemainingGames();
      setRemaining(apiRemaining);
      resetRemainingGames(apiRemaining);
    } catch (error) {
      setRemaining(INITIAL_REMAINING);
      resetRemainingGames(INITIAL_REMAINING);
    }
    resetGamesWon();
    setGamesWon(0);
  };

  const statusText = remaining > 0 ? 'Keep going' : 'Great job';

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-grid">
          <div className="dashboard-box">Loading...</div>
          <div className="dashboard-box">Loading...</div>
          <div className="dashboard-box">Loading...</div>
          <div className="dashboard-box">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <div className="dashboard-box">
          <div className="dashboard-number">{remaining}</div>
        </div>
        <div className="dashboard-box">
          <div className="dashboard-number">{gamesWon}</div>
        </div>
        <div className="dashboard-box">
          <div className="dashboard-text">{statusText}</div>
        </div>
        <div className="dashboard-box">
          <button onClick={handleReset} className="reset-button">
            (reset)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

