import { useState, useEffect, useRef } from 'react';
import { incrementGamesWon } from '../utils/storage';
import './Memory.css';

const GRID_SIZE = 4;
const MAX_STAGE = 5;

const Memory = ({ onGameWin }) => {
  const [stage, setStage] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [flashedCells, setFlashedCells] = useState([]);
  const [errorFlash, setErrorFlash] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const flashTimeoutRef = useRef(null);

  const generateSequence = (length) => {
    const seq = [];
    for (let i = 0; i < length; i++) {
      seq.push(Math.floor(Math.random() * GRID_SIZE * GRID_SIZE));
    }
    return seq;
  };

  const flashCell = (cellIndex, duration = 500) => {
    return new Promise((resolve) => {
      setFlashedCells([cellIndex]);
      setTimeout(() => {
        setFlashedCells([]);
        resolve();
      }, duration);
    });
  };

  const flashError = () => {
    setErrorFlash(true);
    setTimeout(() => {
      setErrorFlash(false);
    }, 500);
  };

  const startStage = async () => {
    setIsWaiting(true);
    const newSequence = generateSequence(stage);
    setSequence(newSequence);
    setUserSequence([]);
    
    // Flash each cell in sequence
    for (let i = 0; i < newSequence.length; i++) {
      await flashCell(newSequence[i], 500);
      if (i < newSequence.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    setIsWaiting(false);
  };

  const handleCellClick = async (cellIndex) => {
    if (isWaiting || isFlashing) return;
    
    const newUserSequence = [...userSequence, cellIndex];
    setUserSequence(newUserSequence);
    
    // Check if the click is correct
    if (newUserSequence.length <= sequence.length) {
      const expectedCell = sequence[newUserSequence.length - 1];
      if (cellIndex !== expectedCell) {
        // Wrong answer
        flashError();
        setUserSequence([]);
        // Restart current stage
        setTimeout(() => {
          startStage();
        }, 500);
        return;
      }
      
      // Check if stage is complete
      if (newUserSequence.length === sequence.length) {
        if (stage === MAX_STAGE) {
          // Game won!
          alert('Congratulations');
          incrementGamesWon();
          if (onGameWin) {
            onGameWin();
          }
          // Reset game
          setStage(1);
          setSequence([]);
          setUserSequence([]);
          setGameStarted(false);
        } else {
          // Move to next stage
          setStage(stage + 1);
          setUserSequence([]);
          setTimeout(() => {
            startStage();
          }, 500);
        }
      }
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setStage(1);
    startStage();
  };

  const handleReset = () => {
    const confirmed = window.confirm('Would you like to play?');
    if (confirmed) {
      setGameStarted(true);
      setStage(1);
      setSequence([]);
      setUserSequence([]);
      setErrorFlash(false);
      startStage();
    }
  };

  useEffect(() => {
    // 组件挂载时显示确认对话框
    const confirmed = window.confirm('Would you like to play?');
    if (confirmed) {
      setGameStarted(true);
    }
  }, []);

  useEffect(() => {
    if (gameStarted && sequence.length === 0 && !isWaiting) {
      startStage();
    }
  }, [gameStarted, stage]);

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="memory-container">
      <div className="memory-grid">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            className={`memory-cell ${
              flashedCells.includes(index) ? 'flashed' : ''
            } ${errorFlash ? 'error' : ''}`}
            onClick={() => handleCellClick(index)}
            style={{
              backgroundColor: flashedCells.includes(index)
                ? '#999'
                : errorFlash
                ? 'red'
                : 'white',
            }}
          />
        ))}
      </div>
      <button onClick={handleReset} className="memory-reset-button">
        Reset
      </button>
    </div>
  );
};

export default Memory;

