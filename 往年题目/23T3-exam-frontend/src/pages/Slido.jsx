import { useState, useEffect, useRef, useCallback } from 'react';
import { incrementGamesWon } from '../utils/storage';
import './Slido.css';

// 导入Shrek图片（需要8张图片）
const SHREK_IMAGES = Array.from({ length: 8 }, (_, i) => `/shrek/${i + 1}.png`);

const Slido = ({ onGameWin }) => {
  const [grid, setGrid] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [isActive, setIsActive] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const gridRef = useRef(null);

  const initializeGame = useCallback(() => {
    // 创建8个Shrek图片的随机排列
    const images = [...Array(8).keys()].map((i) => i + 1);
    let shuffled = [...images].sort(() => Math.random() - 0.5);
    
    shuffled.push(null); // 空白块
    setGrid(shuffled);
    setEmptyIndex(shuffled.indexOf(null));
    setIsActive(true);
    setIsSolved(false);
    setHasMoved(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const isAdjacent = (idx1, idx2) => {
    const row1 = Math.floor(idx1 / 3);
    const col1 = idx1 % 3;
    const row2 = Math.floor(idx2 / 3);
    const col2 = idx2 % 3;

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

  const checkWin = (currentGrid, newEmptyIndex) => {
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
      // 游戏胜利后自动重置
      setTimeout(initializeGame, 1000);
    }
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (!isActive || isSolved) return;

      const { x: emptyCol, y: emptyRow } = {
        x: emptyIndex % 3,
        y: Math.floor(emptyIndex / 3),
      };
      let targetIndex = -1;

      switch (e.key) {
        case 'ArrowUp': // Move cell from below into empty space
          if (emptyRow < 2) {
            targetIndex = emptyIndex + 3;
          }
          break;
        case 'ArrowDown': // Move cell from above into empty space
          if (emptyRow > 0) {
            targetIndex = emptyIndex - 3;
          }
          break;
        case 'ArrowLeft': // Move cell from right into empty space
          if (emptyCol < 2) {
            targetIndex = emptyIndex + 1;
          }
          break;
        case 'ArrowRight': // Move cell from left into empty space
          if (emptyCol > 0) {
            targetIndex = emptyIndex - 1;
          }
          break;
        default:
          return;
      }

      if (targetIndex >= 0 && targetIndex < 9 && grid[targetIndex] !== null) {
        e.preventDefault();
        moveCell(targetIndex);
      }
    },
    [isActive, isSolved, emptyIndex, grid]
  );

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isActive, handleKeyPress]);

  const handleGridClick = () => {
    setIsActive(true);
  };

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
  };

  const handleReset = () => {
    initializeGame();
  };

  return (
    <div className="slido-container">
      <div className="slido-content">
        <div
          className="slido-grid"
          ref={gridRef}
          onClick={handleGridClick}
          tabIndex={0}
        >
          {grid.map((cell, index) => (
            <div
              key={index}
              className={`slido-cell ${cell === null ? 'empty' : ''}`}
              onClick={() => moveCell(index)}
            >
              {cell !== null && (
                <img
                  src={SHREK_IMAGES[cell - 1]}
                  alt={`Shrek ${cell}`}
                  className="slido-image"
                />
              )}
            </div>
          ))}
        </div>
        <div className="slido-actions">
          <button
            onClick={handleSolve}
            disabled={isSolved}
            className="slido-button solve-button"
          >
            Solve
          </button>
          <button
            onClick={handleReset}
            disabled={!hasMoved}
            className="slido-button reset-button"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slido;

