import { useState, useEffect, useRef } from 'react';
import { decrementGamesLeft } from '../utils/storage';
import { addFlappyBirdScore } from '../utils/storage';
import './FlappyBird.css';

const FlappyBird = ({ onGameWin }) => {
  const [screen, setScreen] = useState('onboarding'); // onboarding, gameplay, endGame
  const [birdY, setBirdY] = useState(200);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [endGameData, setEndGameData] = useState(null);
  const gameLoopRef = useRef(null);
  const obstacleLoopRef = useRef(null);
  const birdRef = useRef({ y: 200 });
  const obstaclesRef = useRef([]);
  const scoreRef = useRef(0);

  const GAME_WIDTH = 600;
  const GAME_HEIGHT = 400;
  const BIRD_SIZE = 20;
  const OBSTACLE_WIDTH = 70;
  const HOLE_SIZE = 150;

  const startGame = () => {
    setScreen('gameplay');
    setGameStarted(true);
    setBirdY(200);
    const initialObstacles = [{ x: GAME_WIDTH - 50, holeY: 150 }];
    setObstacles(initialObstacles);
    obstaclesRef.current = initialObstacles;
    setScore(0);
    scoreRef.current = 0;
    birdRef.current.y = 200;

    // Bird falling
    gameLoopRef.current = setInterval(() => {
      setBirdY((prev) => {
        const newY = prev + 3;
        birdRef.current.y = newY;
        
        // Check collision with bottom
        if (newY + BIRD_SIZE >= GAME_HEIGHT) {
          handleGameEnd(false);
          return prev;
        }
        
        // Check collision with obstacles using ref
        const currentObstacles = obstaclesRef.current;
        const birdX = 50;
        for (const obs of currentObstacles) {
          if (
            birdX < obs.x + OBSTACLE_WIDTH &&
            birdX + BIRD_SIZE > obs.x &&
            (newY < obs.holeY || newY + BIRD_SIZE > obs.holeY + HOLE_SIZE)
          ) {
            handleGameEnd(false);
            return prev;
          }
        }
        
        return newY;
      });
    }, 20);

    // Obstacles moving
    obstacleLoopRef.current = setInterval(() => {
      setObstacles((prev) => {
        const updated = prev.map((obs) => ({ ...obs, x: obs.x - 5 }));
        const filtered = updated.filter((obs) => obs.x + OBSTACLE_WIDTH > 0);
        
        // Check if passed obstacle
        const birdX = 50;
        updated.forEach((obs) => {
          if (obs.x + OBSTACLE_WIDTH < birdX && obs.x + OBSTACLE_WIDTH > birdX - 10 && !obs.passed) {
            obs.passed = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
          }
        });
        
        // Add new obstacle
        const rightmost = filtered.length > 0 
          ? Math.max(...filtered.map((obs) => obs.x))
          : GAME_WIDTH - 50;
        
        if (rightmost <= GAME_WIDTH - 200) {
          const holeY = Math.random() * (GAME_HEIGHT - HOLE_SIZE);
          filtered.push({ x: GAME_WIDTH, holeY, passed: false });
        }
        
        obstaclesRef.current = filtered;
        return filtered;
      });
    }, 30);
  };

  const handleJump = () => {
    if (!gameStarted) {
      startGame();
      return;
    }
    
    setBirdY((prev) => {
      const newY = Math.max(0, prev - 30);
      birdRef.current.y = newY;
      return newY;
    });
  };

  const handleGameEnd = (won) => {
    clearInterval(gameLoopRef.current);
    clearInterval(obstacleLoopRef.current);
    setGameStarted(false);
    
    const finalScore = scoreRef.current;
    const finalWon = finalScore >= 3;
    addFlappyBirdScore(finalScore, finalWon);
    
    if (finalWon) {
      decrementGamesLeft();
      if (onGameWin) {
        onGameWin();
      }
    }
    
    setEndGameData({ score: finalScore, won: finalWon });
    setScreen('endGame');
  };

  const handleEndGameClick = () => {
    setScreen('onboarding');
    setBirdY(200);
    setObstacles([]);
    setScore(0);
    setEndGameData(null);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted]);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (obstacleLoopRef.current) clearInterval(obstacleLoopRef.current);
    };
  }, []);

  if (screen === 'onboarding') {
    return (
      <div className="flappy-bird-container">
        <h1 className="welcome-text">Welcome to Flappy Bird!</h1>
        <p className="goal-text">Get a score of 3 to win!</p>
        <div className="gameplay-preview" onClick={handleJump}>
          <div
            className="bird"
            style={{
              left: '50px',
              top: `${birdY}px`,
            }}
          />
          <div
            className="obstacle"
            style={{
              right: '50px',
              top: 0,
              height: '150px',
            }}
          />
          <div
            className="obstacle"
            style={{
              right: '50px',
              bottom: 0,
              height: '100px',
            }}
          />
          <p className="start-hint">Hit space or click to begin</p>
        </div>
      </div>
    );
  }

  if (screen === 'gameplay') {
    return (
      <div className="flappy-bird-container">
        <div className="gameplay-screen" onClick={handleJump}>
          <div
            className="bird"
            style={{
              left: '50px',
              top: `${birdY}px`,
            }}
          />
          {obstacles.map((obs, index) => (
            <div key={index}>
              <div
                className="obstacle"
                style={{
                  left: `${obs.x}px`,
                  top: 0,
                  height: `${obs.holeY}px`,
                }}
              />
              <div
                className="obstacle"
                style={{
                  left: `${obs.x}px`,
                  bottom: 0,
                  height: `${GAME_HEIGHT - obs.holeY - HOLE_SIZE}px`,
                }}
              />
            </div>
          ))}
          <div className="score-display">Score: {score}</div>
        </div>
      </div>
    );
  }

  if (screen === 'endGame') {
    return (
      <div className="flappy-bird-container end-game" onClick={handleEndGameClick}>
        <p>Score: {endGameData.score}</p>
        <p>Game Over</p>
        <p>{endGameData.won ? "You've Won :)" : "You've Lost :("}</p>
        <p className="click-to-return">click anywhere to return</p>
      </div>
    );
  }

  return null;
};

export default FlappyBird;

