import { useState, useEffect, useRef } from 'react';
import { decrementGamesLeft } from '../utils/storage';
import './Space.css';

const GAME_SIZE = 500;
const SHOOTER_SIZE = 10;
const INVADER_SIZE = 20;
const INVADER_MARGIN = 15;
const INVADER_ROWS = 2;
const INVADERS_PER_ROW = 10;

const Space = ({ onGameWin }) => {
  const [shooterX, setShooterX] = useState(0);
  const [invaders, setInvaders] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const gameRef = useRef(null);

  const initializeInvaders = () => {
    const newInvaders = [];
    for (let row = 0; row < INVADER_ROWS; row++) {
      for (let col = 0; col < INVADERS_PER_ROW; col++) {
        const x = col * (INVADER_SIZE + INVADER_MARGIN) + INVADER_MARGIN;
        const y = row * (INVADER_SIZE + INVADER_MARGIN) + INVADER_MARGIN;
        newInvaders.push({ id: `${row}-${col}`, x, y, alive: true });
      }
    }
    return newInvaders;
  };

  useEffect(() => {
    const initialInvaders = initializeInvaders();
    setInvaders(initialInvaders);
    setGameStarted(true);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return;

      if (e.key === 'ArrowLeft') {
        setShooterX((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setShooterX((prev) => Math.min(GAME_SIZE - SHOOTER_SIZE, prev + 1));
      } else if (e.key === ' ') {
        e.preventDefault();
        handleShoot();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, shooterX, invaders]);

  const handleShoot = () => {
    const shooterLeft = shooterX;
    const shooterRight = shooterX + SHOOTER_SIZE;

    const updatedInvaders = invaders.map((invader) => {
      if (!invader.alive) return invader;

      const invaderLeft = invader.x;
      const invaderRight = invader.x + INVADER_SIZE;

      // Check if shooter overlaps vertically (horizontally) with invader
      // This means their X ranges overlap
      if (
        (shooterLeft >= invaderLeft && shooterLeft <= invaderRight) ||
        (shooterRight >= invaderLeft && shooterRight <= invaderRight) ||
        (shooterLeft <= invaderLeft && shooterRight >= invaderRight)
      ) {
        return { ...invader, alive: false };
      }
      return invader;
    });

    setInvaders(updatedInvaders);

    // Check if all invaders are destroyed
    const aliveCount = updatedInvaders.filter((inv) => inv.alive).length;
    if (aliveCount === 0) {
      alert('You have won');
      decrementGamesLeft();
      if (onGameWin) {
        onGameWin();
      }
      // Restart game
      const newInvaders = initializeInvaders();
      setInvaders(newInvaders);
      setShooterX(0);
    }
  };

  return (
    <div className="space-container">
      <div className="space-game" ref={gameRef} style={{ width: GAME_SIZE, height: GAME_SIZE }}>
        {/* Invaders */}
        {invaders.map(
          (invader) =>
            invader.alive && (
              <div
                key={invader.id}
                className="space-invader"
                style={{
                  left: `${invader.x}px`,
                  top: `${invader.y}px`,
                  width: INVADER_SIZE,
                  height: INVADER_SIZE,
                }}
              />
            )
        )}
        {/* Shooter */}
        <div
          className="space-shooter"
          style={{
            left: `${shooterX}px`,
            bottom: 0,
            width: SHOOTER_SIZE,
            height: SHOOTER_SIZE,
          }}
        />
      </div>
    </div>
  );
};

export default Space;

