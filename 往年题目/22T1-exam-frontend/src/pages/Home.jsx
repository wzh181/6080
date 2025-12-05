import { useState, useEffect } from 'react';
import { fetchInitialScore } from '../utils/api';
import { getGamesLeft, setGamesLeft, resetGamesLeft, getInitialScore, setInitialScore } from '../utils/storage';
import './Home.css';

const Home = () => {
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
        // 检查是否需要显示Congratulations
        if (savedGamesLeft === 0) {
          alert('Congratulations!');
          const initial = savedInitial || 5;
          resetGamesLeft(initial);
          setGamesLeftState(initial);
        }
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
      <div className="home-container">
        <div className="home-content">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <p className="home-text">Please choose an option from the sidebar.</p>
        <p className="home-score">
          Games left to win: {gamesLeft}{' '}
          <button onClick={handleReset} className="reset-button">
            (reset)
          </button>
        </p>
      </div>
    </div>
  );
};

export default Home;

