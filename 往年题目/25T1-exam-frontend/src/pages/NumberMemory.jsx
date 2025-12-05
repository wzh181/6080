import { useState, useEffect, useRef } from 'react';
import { decrementGamesLeft } from '../utils/storage';
import { addNumberMemoryScore, getStats } from '../utils/storage';
import './NumberMemory.css';

const NumberMemory = ({ onGameWin }) => {
  const [screen, setScreen] = useState('onboarding'); // onboarding, gameplay, endGame
  const [score, setScore] = useState(0);
  const [currentNumber, setCurrentNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showNumber, setShowNumber] = useState(false);
  const [endGameData, setEndGameData] = useState(null);
  const timeoutRef = useRef(null);
  const stats = getStats();

  const generateNumber = (digits) => {
    let num = '';
    for (let i = 0; i < digits; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  };

  const startGame = () => {
    setScreen('gameplay');
    setScore(0);
    setUserInput('');
    showNextNumber(1);
  };

  const showNextNumber = (digits) => {
    const num = generateNumber(digits);
    setCurrentNumber(num);
    setShowNumber(true);
    setUserInput('');

    timeoutRef.current = setTimeout(() => {
      setShowNumber(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter' && userInput !== '') {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    if (userInput === currentNumber) {
      // Correct
      const newScore = score + 1;
      setScore(newScore);
      setUserInput('');
      
      if (newScore >= 4) {
        // Won
        const won = true;
        addNumberMemoryScore(newScore, won);
        decrementGamesLeft();
        if (onGameWin) {
          onGameWin();
        }
        setEndGameData({
          score: newScore,
          number: currentNumber,
          userAnswer: userInput,
          won: true,
        });
        setScreen('endGame');
      } else {
        // Continue
        showNextNumber(newScore + 2);
      }
    } else {
      // Incorrect
      const won = false;
      addNumberMemoryScore(score, won);
      setEndGameData({
        score: score,
        number: currentNumber,
        userAnswer: userInput,
        won: false,
      });
      setScreen('endGame');
    }
  };

  const handleEndGameClick = () => {
    setScreen('onboarding');
    setScore(0);
    setCurrentNumber('');
    setUserInput('');
    setEndGameData(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (screen === 'onboarding') {
    const avgScore = stats.numberMemory.scores.length > 0
      ? (stats.numberMemory.scores.reduce((a, b) => a + b, 0) / stats.numberMemory.scores.length).toFixed(2)
      : 0;
    const bestScore = stats.numberMemory.scores.length > 0
      ? Math.max(...stats.numberMemory.scores)
      : 0;

    return (
      <div className="number-memory-container">
        <h1 className="welcome-text">Welcome to Number Memory!</h1>
        <p className="goal-text">Get a score of 4 to win!</p>
        <div className="stats-tracker">
          <p>Average: {avgScore}</p>
          <p>Best: {bestScore}</p>
        </div>
        <button onClick={startGame} className="start-button">
          START
        </button>
      </div>
    );
  }

  if (screen === 'gameplay') {
    return (
      <div className="number-memory-container">
        {showNumber ? (
          <div className="number-display">{currentNumber}</div>
        ) : (
          <div className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleInputSubmit}
              className="number-input"
              placeholder="Enter the number"
              autoFocus
            />
          </div>
        )}
      </div>
    );
  }

  if (screen === 'endGame') {
    return (
      <div className="number-memory-container end-game" onClick={handleEndGameClick}>
        <p>Score: {endGameData.score}</p>
        <p>Number: {endGameData.number}</p>
        <p>Your Answer: {endGameData.userAnswer}</p>
        <p>{endGameData.won ? "You've Won :)" : "You've Lost :("}</p>
        <p className="click-to-return">click anywhere to return</p>
      </div>
    );
  }

  return null;
};

export default NumberMemory;

