import React, { useState } from 'react';
import './Game.css';

const Game3 = ({ onGameWin }) => {
  const [score, setScore] = useState(0);

  const handleWin = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (onGameWin) {
      onGameWin();
    }
    alert('You won!');
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Game 3</h1>
      <div className="game-content">
        <p>Score: {score}</p>
        <button onClick={handleWin} className="game-button">
          Win Game
        </button>
      </div>
    </div>
  );
};

export default Game3;

