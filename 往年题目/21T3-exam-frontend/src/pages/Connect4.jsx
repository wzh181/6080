import { useState, useEffect, useRef } from 'react';
import { incrementGamesWon } from '../utils/storage';
import './Connect4.css';

const GRID_SIZE = 10;
const WIN_LENGTH = 4;

const Connect4 = ({ onGameWin }) => {
  const [board, setBoard] = useState(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 = blue, 2 = red
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationIntervalRef = useRef(null);

  const checkWin = (newBoard, row, col, player) => {
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal \
      [1, -1],  // diagonal /
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      
      // Check positive direction
      for (let i = 1; i < WIN_LENGTH; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (
          newRow >= 0 && newRow < GRID_SIZE &&
          newCol >= 0 && newCol < GRID_SIZE &&
          newBoard[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }
      
      // Check negative direction
      for (let i = 1; i < WIN_LENGTH; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (
          newRow >= 0 && newRow < GRID_SIZE &&
          newCol >= 0 && newCol < GRID_SIZE &&
          newBoard[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }
      
      if (count >= WIN_LENGTH) {
        return true;
      }
    }
    
    return false;
  };

  const handleColumnClick = (col) => {
    if (gameOver || isAnimating) return;
    
    // Find the bottommost empty cell in the column
    let row = GRID_SIZE - 1;
    while (row >= 0 && board[row][col] !== null) {
      row--;
    }
    
    if (row < 0) return; // Column is full
    
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    
    const newMoveCount = moveCount + 1;
    setMoveCount(newMoveCount);
    
    // Check for win
    if (checkWin(newBoard, row, col, currentPlayer)) {
      setGameOver(true);
      setWinner(currentPlayer);
      startAnimation();
    } else {
      // Switch player
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const startAnimation = () => {
    setIsAnimating(true);
    let isWhite = false;
    let count = 0;
    const maxIterations = 6; // 3 seconds / 0.5 seconds = 6
    
    animationIntervalRef.current = setInterval(() => {
      setBoard(prev => 
        prev.map(row => 
          row.map(cell => isWhite ? '#fff' : '#000')
        )
      );
      isWhite = !isWhite;
      count++;
      
      if (count >= maxIterations) {
        clearInterval(animationIntervalRef.current);
        setIsAnimating(false);
      }
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner(null);
    setMoveCount(0);
    setIsAnimating(false);
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameOver && winner === 1 && !isAnimating) {
      incrementGamesWon();
      if (onGameWin) {
        onGameWin();
      }
    }
  }, [gameOver, winner, isAnimating, onGameWin]);

  return (
    <div className="connect4-container">
      <div className="connect4-board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="connect4-cell"
              onClick={() => handleColumnClick(colIndex)}
              style={{
                backgroundColor: typeof cell === 'string' 
                  ? cell 
                  : cell === 1 
                  ? '#007bff' 
                  : cell === 2 
                  ? '#dc3545' 
                  : 'transparent',
              }}
            >
              {cell && typeof cell !== 'string' && (
                <div
                  className="connect4-coin"
                  style={{
                    backgroundColor: cell === 1 ? '#007bff' : '#dc3545',
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
      
      {gameOver && !isAnimating && (
        <div className="connect4-result">
          <div className="result-text">
            {winner ? `Player${winner} wins` : 'No one wins'}
          </div>
          <div className="result-moves">
            A total of {moveCount} moves were complete
          </div>
        </div>
      )}
      
      <button onClick={resetGame} className="connect4-reset-button">
        Reset
      </button>
    </div>
  );
};

export default Connect4;

