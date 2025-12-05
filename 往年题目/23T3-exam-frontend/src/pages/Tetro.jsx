import { useState, useEffect, useRef, useCallback } from 'react';
import { incrementGamesWon } from '../utils/storage';
import './Tetro.css';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 12;

const BLOCK_TYPES = [
  [[1, 1], [1, 1]], // 2x2
  [[1], [1]], // 2x1 vertical
  [[1]], // 1x1
];

const Tetro = ({ onGameWin }) => {
  const [board, setBoard] = useState(
    Array(GRID_HEIGHT)
      .fill(null)
      .map(() => Array(GRID_WIDTH).fill(null))
  );
  const [currentBlock, setCurrentBlock] = useState(null);
  const [blockPosition, setBlockPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [greenRows, setGreenRows] = useState(0);
  const intervalRef = useRef(null);

  const canMove = useCallback(
    (newX, newY, block) => {
      if (!block) return false;
      for (let row = 0; row < block.length; row++) {
        for (let col = 0; col < block[row].length; col++) {
          if (block[row][col]) {
            const boardY = newY + row;
            const boardX = newX + col;
            if (
              boardY >= GRID_HEIGHT ||
              boardX >= GRID_WIDTH ||
              boardX < 0 ||
              (boardY >= 0 && board[boardY][boardX])
            ) {
              return false;
            }
          }
        }
      }
      return true;
    },
    [board]
  );

  const spawnNewBlock = useCallback(() => {
    const randomBlock = BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)];
    setCurrentBlock(randomBlock);
    setBlockPosition({ x: 0, y: 0 });
  }, []);

  const lockBlock = useCallback(() => {
    if (!currentBlock) return;
    const newBoard = board.map((row) => [...row]);
    for (let row = 0; row < currentBlock.length; row++) {
      for (let col = 0; col < currentBlock[row].length; col++) {
        if (currentBlock[row][col]) {
          const boardY = blockPosition.y + row;
          const boardX = blockPosition.x + col;
          if (boardY >= 0 && boardY < GRID_HEIGHT && boardX >= 0 && boardX < GRID_WIDTH) {
            newBoard[boardY][boardX] = 1;
          }
        }
      }
    }
    setBoard(newBoard);
    checkRows(newBoard);
    checkGameOver(newBoard);
    spawnNewBlock();
  }, [board, currentBlock, blockPosition, spawnNewBlock, checkRows, checkGameOver]);

  const checkRows = useCallback(
    (currentBoard) => {
      let newGreenRows = greenRows;
      const updatedBoard = currentBoard.filter((row) => {
        if (row.every((cell) => cell !== null)) {
          newGreenRows++;
          return false; // 移除满行
        }
        return true;
      });

      // 在顶部添加空行
      while (updatedBoard.length < GRID_HEIGHT) {
        updatedBoard.unshift(Array(GRID_WIDTH).fill(null));
      }
      setBoard(updatedBoard);
      setGreenRows(newGreenRows);

      if (newGreenRows >= 5) {
        alert('Congrats!');
        incrementGamesWon();
      if (onGameWin) {
        onGameWin();
      }
      setIsActive(false);
      setBoard(
        Array(GRID_HEIGHT)
          .fill(null)
          .map(() => Array(GRID_WIDTH).fill(null))
      );
      setCurrentBlock(null);
      setBlockPosition({ x: 0, y: 0 });
      setGreenRows(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  },
    [greenRows, onGameWin]
  );

  const resetGame = useCallback(() => {
    setIsActive(false);
    setBoard(
      Array(GRID_HEIGHT)
        .fill(null)
        .map(() => Array(GRID_WIDTH).fill(null))
    );
    setCurrentBlock(null);
    setBlockPosition({ x: 0, y: 0 });
    setGreenRows(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const checkGameOver = useCallback(
    (currentBoard) => {
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
          if (currentBoard[row][col]) {
            alert('Failed');
            resetGame();
            return;
          }
        }
      }
    },
    [resetGame]
  );

  const moveDown = useCallback(() => {
    if (!isActive || !currentBlock) return;
    if (canMove(blockPosition.x, blockPosition.y + 1, currentBlock)) {
      setBlockPosition((prev) => ({ ...prev, y: prev.y + 1 }));
    } else {
      lockBlock();
    }
  }, [isActive, currentBlock, blockPosition, canMove, lockBlock]);

  const handleKeyPress = useCallback(
    (e) => {
      if (!isActive || !currentBlock) return;
      switch (e.key) {
        case 'ArrowLeft':
          if (canMove(blockPosition.x - 1, blockPosition.y, currentBlock)) {
            setBlockPosition((prev) => ({ ...prev, x: prev.x - 1 }));
          }
          break;
        case 'ArrowRight':
          if (canMove(blockPosition.x + 1, blockPosition.y, currentBlock)) {
            setBlockPosition((prev) => ({ ...prev, x: prev.x + 1 }));
          }
          break;
        default:
          break;
      }
    },
    [isActive, currentBlock, blockPosition, canMove]
  );

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(moveDown, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [isActive, moveDown]);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isActive, handleKeyPress]);

  const handleBoardClick = () => {
    if (!isActive) {
      setIsActive(true);
      spawnNewBlock();
    }
  };

  return (
    <div className="tetro-container">
      <div
        className="tetro-grid"
        onClick={handleBoardClick}
        style={{
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
          cursor: isActive ? 'default' : 'pointer',
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isBlockCell =
              currentBlock &&
              rowIndex >= blockPosition.y &&
              rowIndex < blockPosition.y + currentBlock.length &&
              colIndex >= blockPosition.x &&
              colIndex < blockPosition.x + currentBlock[0].length &&
              currentBlock[rowIndex - blockPosition.y] &&
              currentBlock[rowIndex - blockPosition.y][colIndex - blockPosition.x];

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="tetro-cell"
                style={{
                  backgroundColor: isBlockCell
                    ? '#007bff'
                    : cell === 'green'
                    ? 'rgb(0,255,0)'
                    : cell
                    ? '#666'
                    : 'transparent',
                }}
              />
            );
          })
        )}
      </div>
      <button onClick={resetGame} className="tetro-reset-button">
        Reset
      </button>
    </div>
  );
};

export default Tetro;

