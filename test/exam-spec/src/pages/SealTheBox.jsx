import { useState, useEffect, useRef, useCallback } from 'react';
import { decrementGamesLeft } from '../utils/gameScore';
import './SealTheBox.css';

const BELT_SPEED = 20;
const BOX_SIZE = 100;
const AVATAR_SIZE = 50;
const MIN_BOX_SPACING = 100;
const BELTS_COUNT = 3;

function SealTheBox() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentBelt, setCurrentBelt] = useState(1);
  const [boxes, setBoxes] = useState([]);
  const [beltOffset, setBeltOffset] = useState(0);
  const [missedBoxes, setMissedBoxes] = useState(0);
  const [sealedCount, setSealedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const animationRef = useRef();
  const lastSpawnTime = useRef([0, 0, 0]);
  const gameStartTime = useRef(null);
  const currentSealedCount = useRef(0);

  useEffect(() => {
    const stored = localStorage.getItem('sealTheBoxBest');
    if (stored) {
      setBestScore(parseInt(stored));
    }
    initializeBoxes();
  }, []);

  const initializeBoxes = () => {
    const initialBoxes = [];
    for (let belt = 0; belt < BELTS_COUNT; belt++) {
      const boxCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < boxCount; i++) {
        initialBoxes.push({
          id: Math.random(),
          belt: belt,
          x: Math.random() * (window.innerWidth - 300) + 200,
          sealed: false
        });
      }
    }
    setBoxes(initialBoxes);
  };

  const endGame = useCallback(() => {
    setGameOver(true);
    const timePlayed = Date.now() - gameStartTime.current;
    const finalSealedCount = currentSealedCount.current;
    
    if (finalSealedCount > bestScore) {
      setBestScore(finalSealedCount);
      localStorage.setItem('sealTheBoxBest', finalSealedCount.toString());
    }

    const stats = {
      sealed: finalSealedCount,
      timestamp: Date.now()
    };
    const existingStats = localStorage.getItem('sealTheBoxStats');
    const allStats = existingStats ? JSON.parse(existingStats) : [];
    allStats.push(stats);
    localStorage.setItem('sealTheBoxStats', JSON.stringify(allStats));

    const timePlayedStats = localStorage.getItem('timePlayedStats');
    const timeStats = timePlayedStats ? JSON.parse(timePlayedStats) : {
      guessTheNumber: 0,
      ticTacToe: 0,
      sealTheBox: 0
    };
    timeStats.sealTheBox += timePlayed;
    localStorage.setItem('timePlayedStats', JSON.stringify(timeStats));

    decrementGamesLeft();
  }, [bestScore]);

  const resetGame = () => {
    setGameStarted(false);
    setCurrentBelt(1);
    setMissedBoxes(0);
    setSealedCount(0);
    currentSealedCount.current = 0;
    setGameOver(false);
    setBeltOffset(0);
    lastSpawnTime.current = [0, 0, 0];
    gameStartTime.current = null;
    initializeBoxes();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
        gameStartTime.current = Date.now();
      } else if (gameStarted && !gameOver) {
        if (e.key === 'ArrowUp') {
          setCurrentBelt(prev => Math.max(0, prev - 1));
        } else if (e.key === 'ArrowDown') {
          setCurrentBelt(prev => Math.min(2, prev + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const animate = () => {
        setBeltOffset(prev => (prev + BELT_SPEED / 60) % 100);
        
        setBoxes(prevBoxes => {
          const newBoxes = prevBoxes.map(box => ({
            ...box,
            x: box.x - BELT_SPEED / 60
          }));

          const visibleBoxes = newBoxes.filter(box => box.x > -BOX_SIZE);
          const removedBoxes = newBoxes.filter(box => box.x <= -BOX_SIZE && !box.sealed);
          
          if (removedBoxes.length > 0) {
            setMissedBoxes(prev => prev + removedBoxes.length);
          }

          for (let belt = 0; belt < BELTS_COUNT; belt++) {
            const beltBoxes = visibleBoxes.filter(b => b.belt === belt);
            const rightmostBox = beltBoxes.reduce((max, box) => 
              box.x > max ? box.x : max, -Infinity);
            
            const now = Date.now();
            if (now - lastSpawnTime.current[belt] > 2000 && 
                (rightmostBox === -Infinity || rightmostBox < window.innerWidth - MIN_BOX_SPACING - BOX_SIZE)) {
              const shouldSpawn = Math.random() > 0.5;
              if (shouldSpawn) {
                visibleBoxes.push({
                  id: Date.now() + Math.random(),
                  belt: belt,
                  x: window.innerWidth,
                  sealed: false
                });
                lastSpawnTime.current[belt] = now;
              }
            }
          }

          return visibleBoxes;
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const avatarLeft = 100;
    const avatarRight = avatarLeft + AVATAR_SIZE;

    setBoxes(prevBoxes => prevBoxes.map(box => {
      if (box.belt === currentBelt && !box.sealed) {
        const boxRight = box.x + BOX_SIZE;
        if (boxRight >= avatarLeft && box.x <= avatarRight) {
          setSealedCount(prev => {
            const newCount = prev + 1;
            currentSealedCount.current = newCount;
            return newCount;
          });
          return { ...box, sealed: true };
        }
      }
      return box;
    }));
  }, [boxes, currentBelt, gameStarted, gameOver]);

  useEffect(() => {
    if (missedBoxes >= 3 && gameStarted && !gameOver) {
      endGame();
    }
  }, [missedBoxes, gameStarted, gameOver, endGame]);

  return (
    <div className="seal-the-box">
      {!gameOver ? (
        <div className="game-area">
          {!gameStarted && (
            <div className="start-message">Press any key to start</div>
          )}
          {[0, 1, 2].map(beltIndex => (
            <div key={beltIndex} className="belt-container">
              <div 
                className="belt" 
                style={{
                  backgroundPosition: `${-beltOffset}px 0`
                }}
              />
              <div className="belt-items">
                {boxes
                  .filter(box => box.belt === beltIndex)
                  .map(box => (
                    <img
                      key={box.id}
                      src={box.sealed ? '/assets/sealed.png' : '/assets/unsealed.png'}
                      alt={box.sealed ? 'sealed' : 'unsealed'}
                      className="box"
                      style={{ left: `${box.x}px` }}
                    />
                  ))}
                {currentBelt === beltIndex && (
                  <div className="avatar" style={{ left: '100px' }}>
                    <img 
                      src="/assets/avatar.png"
                      alt="avatar"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="stats-display">
            <p>Sealed: {sealedCount}</p>
            <p>Missed: {missedBoxes}/3</p>
          </div>
        </div>
      ) : (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Total boxes sealed: {sealedCount}</p>
          <p>Best score: {bestScore}</p>
          <button onClick={resetGame}>Play again</button>
        </div>
      )}
    </div>
  );
}

export default SealTheBox;
