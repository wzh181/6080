import { useState, useEffect } from 'react';
import { decrementGamesLeft } from '../utils/gameScore';
import './GuessTheNumber.css';

const DIFFICULTY_CONFIG = {
  Easy: { min: 1, max: 10, time: 20 },
  Medium: { min: 1, max: 50, time: 30 },
  Hard: { min: 1, max: 100, time: 60 }
};

function GuessTheNumber() {
  const [difficulty, setDifficulty] = useState(null);
  const [targetNumber, setTargetNumber] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (difficulty && timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [difficulty, timeLeft, gameOver]);

  const startGame = (level) => {
    const config = DIFFICULTY_CONFIG[level];
    const randomNumber = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
    setDifficulty(level);
    setTargetNumber(randomNumber);
    setTimeLeft(config.time);
    setUserGuess('');
    setMessage('');
    setErrorMessage('');
    setGameOver(false);
    setGuessCount(0);
    setStartTime(Date.now());
  };

  const handleTimeUp = () => {
    setGameOver(true);
    setMessage(`Time's up! The correct number was ${targetNumber}.`);
    
    const timePlayed = Date.now() - startTime;
    saveGameStats(difficulty, false, timePlayed);
    
    setTimeout(() => {
      resetGame();
    }, 5000);
  };

  const handleGuess = () => {
    if (gameOver) return;

    const config = DIFFICULTY_CONFIG[difficulty];
    const guess = parseInt(userGuess);

    if (isNaN(guess) || guess < config.min || guess > config.max) {
      setErrorMessage(`Please enter a valid number between ${config.min} and ${config.max}`);
      setMessage('');
      return;
    }

    setErrorMessage('');
    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);

    if (guess === targetNumber) {
      const timeUsed = DIFFICULTY_CONFIG[difficulty].time - timeLeft;
      const timePlayed = Date.now() - startTime;
      setGameOver(true);
      setMessage(`Congratulations! You've guessed the number! The time left is ${timeLeft} seconds`);
      
      saveBestScore(difficulty, timeUsed, newGuessCount);
      saveGameStats(difficulty, true, timePlayed);
      decrementGamesLeft();
      
      setTimeout(() => {
        resetGame();
      }, 5000);
    } else if (guess < targetNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }

    setUserGuess('');
  };

  const saveBestScore = (level, timeUsed, guesses) => {
    const key = `guessTheNumber_${level}`;
    const stored = localStorage.getItem(key);
    let bestScore = stored ? JSON.parse(stored) : null;

    if (!bestScore || timeUsed < bestScore.timeUsed || 
        (timeUsed === bestScore.timeUsed && guesses < bestScore.guesses)) {
      bestScore = { timeUsed, guesses };
      localStorage.setItem(key, JSON.stringify(bestScore));
    }
  };

  const saveGameStats = (level, won, timePlayed) => {
    const stats = {
      difficulty: level,
      won: won,
      timestamp: Date.now()
    };
    
    const existingStats = localStorage.getItem('guessTheNumberStats');
    const allStats = existingStats ? JSON.parse(existingStats) : [];
    allStats.push(stats);
    localStorage.setItem('guessTheNumberStats', JSON.stringify(allStats));

    const timePlayedStats = localStorage.getItem('timePlayedStats');
    const timeStats = timePlayedStats ? JSON.parse(timePlayedStats) : {
      guessTheNumber: 0,
      ticTacToe: 0,
      sealTheBox: 0
    };
    timeStats.guessTheNumber += timePlayed;
    localStorage.setItem('timePlayedStats', JSON.stringify(timeStats));
  };

  const resetGame = () => {
    setDifficulty(null);
    setTargetNumber(null);
    setTimeLeft(0);
    setUserGuess('');
    setMessage('');
    setErrorMessage('');
    setGameOver(false);
    setGuessCount(0);
    setStartTime(null);
  };

  if (!difficulty) {
    return (
      <div className="guess-the-number">
        <div className="difficulty-selection">
          <button onClick={() => startGame('Easy')}>Easy</button>
          <button onClick={() => startGame('Medium')}>Medium</button>
          <button onClick={() => startGame('Hard')}>Hard</button>
        </div>
      </div>
    );
  }

  const config = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="guess-the-number">
      <div className="game-container">
        <p className="instruction">
          I have selected a number between {config.min} and {config.max}. Can you guess it?
        </p>
        <input
          type="number"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          disabled={gameOver}
          onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
        />
        <button onClick={handleGuess} disabled={gameOver}>Submit Guess</button>
        <p className="time-display">Time remaining: {timeLeft} seconds</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {message && <p className="game-message">{message}</p>}
      </div>
    </div>
  );
}

export default GuessTheNumber;
