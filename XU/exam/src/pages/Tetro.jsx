import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { incrementGamesWon } from '../utils/storage';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 12;

const Tetro = () => {
  const [board, setBoard] = useState(Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(null)));
  const [currentBlock, setCurrentBlock] = useState(null);
  const [blockPosition, setBlockPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [gameInterval, setGameInterval] = useState(null);
  const intervalRef = useRef(null);

  const blockTypes = [
    [[1, 1], [1, 1]], // 2x2
    [[1], [1]], // 2x1 vertical
    [[1]], // 1x1
  ];

  const startGame = () => {
    setIsActive(true);
    spawnNewBlock();
  };

  const spawnNewBlock = () => {
    const randomBlock = blockTypes[Math.floor(Math.random() * blockTypes.length)];
    setCurrentBlock(randomBlock);
    setBlockPosition({ x: 0, y: 0 });
  };

  const canMove = (newX, newY, block) => {
    if (!block) return false;
    for (let row = 0; row < block.length; row++) {
      for (let col = 0; col < block[row].length; col++) {
        if (block[row][col]) {
          const boardY = newY + row;
          const boardX = newX + col;
          if (boardY >= GRID_HEIGHT || boardX >= GRID_WIDTH || boardX < 0) {
            return false;
          }
          if (boardY >= 0 && board[boardY][boardX]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const lockBlock = () => {
    if (!currentBlock) return;
    const newBoard = board.map(row => [...row]);
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
  };

  const checkRows = (newBoard) => {
    let greenRows = 0;
    const updatedBoard = newBoard.map((row, rowIndex) => {
      if (row.every(cell => cell !== null)) {
        greenRows++;
        return row.map(() => 'green');
      }
      return row;
    });
    setBoard(updatedBoard);
    
    if (greenRows >= 5) {
      alert('Congrats!');
      resetGame();
    }
  };

  const checkGameOver = (newBoard) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < GRID_WIDTH; col++) {
        if (newBoard[row][col]) {
          alert('Failed');
          resetGame();
          return;
        }
      }
    }
  };

  const moveDown = () => {
    if (!isActive || !currentBlock) return;
    if (canMove(blockPosition.x, blockPosition.y + 1, currentBlock)) {
      setBlockPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      lockBlock();
    }
  };

  const handleKeyPress = (e) => {
    if (!isActive || !currentBlock) return;
    switch (e.key) {
      case 'ArrowLeft':
        if (canMove(blockPosition.x - 1, blockPosition.y, currentBlock)) {
          setBlockPosition(prev => ({ ...prev, x: prev.x - 1 }));
        }
        break;
      case 'ArrowRight':
        if (canMove(blockPosition.x + 1, blockPosition.y, currentBlock)) {
          setBlockPosition(prev => ({ ...prev, x: prev.x + 1 }));
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(moveDown, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [isActive, blockPosition, currentBlock, board]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, blockPosition, currentBlock]);

  const resetGame = () => {
    setIsActive(false);
    setBoard(Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(null)));
    setCurrentBlock(null);
    setBlockPosition({ x: 0, y: 0 });
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleBoardClick = () => {
    if (!isActive) {
      startGame();
    }
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 130px)',
        paddingTop: '20px',
        paddingBottom: '100px',
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        gutterBottom
        style={{ marginBottom: '20px' }}
      >
        Tetro Game
      </Typography>

      <Box
        onClick={handleBoardClick}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
          width: '100%',
          maxWidth: '600px',
          aspectRatio: `${GRID_WIDTH}/${GRID_HEIGHT}`,
          border: '2px solid #333',
          marginBottom: '20px',
          cursor: isActive ? 'default' : 'pointer',
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isBlockCell = currentBlock &&
              rowIndex >= blockPosition.y &&
              rowIndex < blockPosition.y + currentBlock.length &&
              colIndex >= blockPosition.x &&
              colIndex < blockPosition.x + currentBlock[0].length &&
              currentBlock[rowIndex - blockPosition.y] &&
              currentBlock[rowIndex - blockPosition.y][colIndex - blockPosition.x];

            return (
              <Box
                key={`${rowIndex}-${colIndex}`}
                style={{
                  border: '1px solid #333333',
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
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={resetGame}
        style={{ marginTop: '20px' }}
      >
        Reset
      </Button>
    </Container>
  );
};

export default Tetro;

