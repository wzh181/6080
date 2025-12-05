import { useState, useEffect, useRef } from 'react';
import { decrementGamesLeft } from '../utils/storage';
import { addTreasureHuntStats } from '../utils/storage';
import './TreasureHunt.css';

const TreasureHunt = ({ onGameWin }) => {
  const [screen, setScreen] = useState('onboarding'); // onboarding, gameplay, endGame
  const [timeLimit, setTimeLimit] = useState(10);
  const [goalCoins, setGoalCoins] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [yellowCoinsRemaining, setYellowCoinsRemaining] = useState(5);
  const [coins, setCoins] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const timerRef = useRef(null);

  const generateCoins = (count) => {
    const newCoins = [];
    const containerWidth = window.innerWidth - 200;
    const containerHeight = window.innerHeight - 200;
    const coinSize = 30;
    const minDistance = coinSize * 1.5; // 最小距离
    
    for (let i = 0; i < count; i++) {
      const isYellow = i < count / 2;
      let attempts = 0;
      let x, y;
      let validPosition = false;
      
      while (!validPosition && attempts < 50) {
        x = Math.random() * containerWidth;
        y = Math.random() * containerHeight + 100;
        
        // 检查是否与已有金币重叠
        validPosition = newCoins.every((coin) => {
          const distance = Math.sqrt(
            Math.pow(x - coin.x, 2) + Math.pow(y - coin.y, 2)
          );
          return distance >= minDistance;
        });
        
        attempts++;
      }
      
      newCoins.push({
        id: i,
        x,
        y,
        color: isYellow ? 'yellow' : 'brown',
        revealed: false,
      });
    }
    return newCoins;
  };

  const startGame = () => {
    const limit = timeLimit || 10;
    const goal = goalCoins || 5;
    const newCoins = generateCoins(goal * 2);
    setScreen('gameplay');
    setTimeRemaining(limit);
    setYellowCoinsRemaining(goal);
    setCoins(newCoins);
    setClicks(0);
    setGameStartTime(Date.now());

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleGameEnd(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCoinClick = (coinId) => {
    if (screen !== 'gameplay') return;
    
    setCoins((prevCoins) => {
      const updated = prevCoins.map((coin) => {
        if (coin.id === coinId && !coin.revealed) {
          const revealed = { ...coin, revealed: true };
          if (revealed.color === 'yellow') {
            setYellowCoinsRemaining((prev) => {
              const newRemaining = prev - 1;
              if (newRemaining === 0) {
                handleGameEnd(true);
              }
              return newRemaining;
            });
          }
          setClicks((prev) => prev + 1);
          return revealed;
        }
        return coin;
      });
      return updated;
    });
  };

  const handleGameEnd = (won) => {
    clearInterval(timerRef.current);
    const gameLength = (Date.now() - gameStartTime) / 1000;
    addTreasureHuntStats(clicks, gameLength, won);
    
    if (won) {
      decrementGamesLeft();
      if (onGameWin) {
        onGameWin();
      }
    }
    
    setScreen('endGame');
  };

  const handleEndGameClick = () => {
    setScreen('onboarding');
    setTimeRemaining(10);
    setYellowCoinsRemaining(5);
    setCoins([]);
    setClicks(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (screen === 'onboarding') {
    return (
      <div className="treasure-hunt-container">
        <h1 className="welcome-text">Welcome to Treasure Hunt!</h1>
        <div className="input-container">
          <div className="input-group">
            <label>Time Limit (seconds):</label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value) || 10)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Goal Coins:</label>
            <input
              type="number"
              value={goalCoins}
              onChange={(e) => setGoalCoins(parseInt(e.target.value) || 5)}
              className="input-field"
            />
          </div>
          <button onClick={startGame} className="start-button">
            START
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'gameplay') {
    return (
      <div className="treasure-hunt-container">
        <div className="game-info">
          <div className="info-item">
            <label>Countdown:</label>
            <span>{timeRemaining}</span>
          </div>
          <div className="info-item">
            <label>Remaining Coins:</label>
            <span>{yellowCoinsRemaining}</span>
          </div>
        </div>
        <div className="game-area">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className={`coin ${coin.revealed ? coin.color : 'black'}`}
              style={{
                left: `${coin.x}px`,
                top: `${coin.y}px`,
              }}
              onClick={() => handleCoinClick(coin.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (screen === 'endGame') {
    const won = yellowCoinsRemaining === 0;
    return (
      <div className="treasure-hunt-container end-game" onClick={handleEndGameClick}>
        <p className="end-game-title">{won ? 'You Won!' : 'You Lost'}</p>
        <p className="click-to-return">Click anywhere to return</p>
      </div>
    );
  }

  return null;
};

export default TreasureHunt;

