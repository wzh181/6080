import { useState, useEffect, useRef, useCallback } from 'react';
import { incrementGamesWon } from '../utils/storage';
import './Slido.css';

// Shrek图片路径（需要8张图片放在public/shrek/目录）
const SHREK_IMAGES = Array.from({ length: 8 }, (_, i) => `/shrek/${i + 1}.png`);

const Slido = ({ onGameWin }) => {
  const [grid, setGrid] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [isActive, setIsActive] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const gridRef = useRef(null);

  const initializeGame = () => {
    // 创建8个Shrek图片的随机排列
    const images = [...Array(8).keys()].map((i) => i + 1);
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    
    // 随机选择空位置
    const emptyPos = Math.floor(Math.random() * 9);
    
    const newGrid = Array(9).fill(null);
    let imageIndex = 0;
    for (let i = 0; i < 9; i++) {
      if (i === emptyPos) {
        newGrid[i] = null;
        setEmptyIndex(i);
      } else {
        newGrid[i] = shuffled[imageIndex++];
      }
    }
    
    setGrid(newGrid);
    setIsActive(true);
    setIsSolved(false);
    setHasMoved(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;
    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
  };

  const moveCell = (clickedIndex) => {
    if (isSolved || !isActive) return;
    
    if (isAdjacent(clickedIndex, emptyIndex)) {
      const newGrid = [...grid];
      newGrid[emptyIndex] = newGrid[clickedIndex];
      newGrid[clickedIndex] = null;
      setGrid(newGrid);
      setEmptyIndex(clickedIndex);
      setHasMoved(true);
      checkWin(newGrid, clickedIndex);
    }
  };

  const checkWin = useCallback((currentGrid, newEmptyIndex) => {
    // 检查是否所有图片都在正确位置（1-8按顺序，空在最后）
    let isWin = true;
    for (let i = 0; i < 8; i++) {
      if (currentGrid[i] !== i + 1) {
        isWin = false;
        break;
      }
    }
    if (isWin && newEmptyIndex === 8) {
      setIsSolved(true);
      setIsActive(false);
      alert('Correct!');
      incrementGamesWon();
      if (onGameWin) {
        onGameWin();
      }
      setTimeout(() => {
        initializeGame();
      }, 100);
    }
  }, [onGameWin]);

  const handleKeyPress = (e) => {
    if (!isActive || isSolved) return;
    
    let targetIndex = -1;
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;

    switch (e.key) {
      case 'ArrowUp':
        if (row < 2) {
          targetIndex = emptyIndex + 3;
        }
        break;
      case 'ArrowDown':
        if (row > 0) {
          targetIndex = emptyIndex - 3;
        }
        break;
      case 'ArrowLeft':
        if (col < 2) {
          targetIndex = emptyIndex + 1;
        }
        break;
      case 'ArrowRight':
        if (col > 0) {
          targetIndex = emptyIndex - 1;
        }
        break;
      default:
        return;
    }

    if (targetIndex >= 0 && targetIndex < 9) {
      e.preventDefault();
      moveCell(targetIndex);
    }
  };

  useEffect(() => {
    if (isActive && !isSolved) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isActive, isSolved, handleKeyPress]);

  const handleSolve = () => {
    if (isSolved) return;
    const solvedGrid = Array(9).fill(null);
    for (let i = 0; i < 8; i++) {
      solvedGrid[i] = i + 1;
    }
    solvedGrid[8] = null;
    setGrid(solvedGrid);
    setEmptyIndex(8);
    setIsSolved(true);
    setIsActive(false);
    alert('Correct!');
    incrementGamesWon();
    if (onGameWin) {
      onGameWin();
    }
    setTimeout(() => {
      initializeGame();
    }, 100);
  };

  const handleGridClick = () => {
    setIsActive(true);
  };

  return (
    <div className="slido-container">
      <div className="slido-content">
        <div
          ref={gridRef}
          className="slido-grid"
          onClick={handleGridClick}
          tabIndex={0}
        >
          {grid.map((value, index) => (
            <div
              key={index}
              className="slido-cell"
              onClick={() => moveCell(index)}
            >
              {value !== null ? (
                <img
                  src={SHREK_IMAGES[value - 1]}
                  alt={`Shrek ${value}`}
                  className="slido-image"
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="slido-buttons">
          <button
            onClick={handleSolve}
            disabled={isSolved}
            className="slido-button slido-solve"
          >
            Solve
          </button>
          <button
            onClick={initializeGame}
            disabled={!hasMoved}
            className="slido-button slido-reset"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slido;

