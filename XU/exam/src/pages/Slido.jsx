import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { incrementGamesWon } from '../utils/storage';

const Slido = () => {
  const [grid, setGrid] = useState([]);
  const [emptyPosition, setEmptyPosition] = useState(8);
  const [isSolved, setIsSolved] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // Initialize grid with shuffled images
  const initializeGrid = () => {
    const images = [1, 2, 3, 4, 5, 6, 7, 8];
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    const newGrid = [...shuffled, null];
    setGrid(newGrid);
    setEmptyPosition(newGrid.indexOf(null));
    setIsSolved(false);
    setHasMoved(false);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  const isAdjacent = (pos1, pos2) => {
    const row1 = Math.floor(pos1 / 3);
    const col1 = pos1 % 3;
    const row2 = Math.floor(pos2 / 3);
    const col2 = pos2 % 3;
    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
  };

  const handleCellClick = (index) => {
    if (isSolved) return;
    if (isAdjacent(index, emptyPosition)) {
      const newGrid = [...grid];
      [newGrid[index], newGrid[emptyPosition]] = [newGrid[emptyPosition], newGrid[index]];
      setGrid(newGrid);
      setEmptyPosition(index);
      setHasMoved(true);
      checkWin();
    }
  };

  const checkWin = () => {
    const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, null];
    const isCorrect = grid.every((val, idx) => val === correctOrder[idx]);
    if (isCorrect) {
      setIsSolved(true);
      alert('Correct!');
      incrementGamesWon();
      setTimeout(() => {
        initializeGrid();
      }, 1000);
    }
  };

  const handleSolve = () => {
    const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, null];
    setGrid(correctOrder);
    setEmptyPosition(8);
    setIsSolved(true);
  };

  const handleKeyPress = (e) => {
    if (isSolved) return;
    let newEmptyPos = emptyPosition;
    const row = Math.floor(emptyPosition / 3);
    const col = emptyPosition % 3;

    switch (e.key) {
      case 'ArrowUp':
        if (row < 2) newEmptyPos = emptyPosition + 3;
        break;
      case 'ArrowDown':
        if (row > 0) newEmptyPos = emptyPosition - 3;
        break;
      case 'ArrowLeft':
        if (col < 2) newEmptyPos = emptyPosition + 1;
        break;
      case 'ArrowRight':
        if (col > 0) newEmptyPos = emptyPosition - 1;
        break;
      default:
        return;
    }

    if (newEmptyPos !== emptyPosition) {
      const newGrid = [...grid];
      [newGrid[newEmptyPos], newGrid[emptyPosition]] = [newGrid[emptyPosition], newGrid[newEmptyPos]];
      setGrid(newGrid);
      setEmptyPosition(newEmptyPos);
      setHasMoved(true);
      checkWin();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [emptyPosition, grid, isSolved]);

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 130px)',
        paddingTop: '40px',
      }}
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        gutterBottom
        style={{ marginBottom: '30px' }}
      >
        Slido Game
      </Typography>

      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 150px)',
          gridTemplateRows: 'repeat(3, 150px)',
          gap: '0',
          border: '1px solid #333',
          marginBottom: '30px',
        }}
      >
        {grid.map((imageNum, index) => (
          <Box
            key={index}
            onClick={() => handleCellClick(index)}
            style={{
              width: '150px',
              height: '150px',
              border: '1px solid #333',
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isAdjacent(index, emptyPosition) && !isSolved ? 'pointer' : 'default',
              backgroundColor: imageNum ? 'white' : 'transparent',
            }}
          >
            {imageNum && (
              <img
                src={require(`../data/shrek/${imageNum}.png`)}
                alt={`shrek ${imageNum}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Box style={{ display: 'flex', gap: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSolve}
          disabled={isSolved}
          style={{ width: '100px' }}
        >
          Solve
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={initializeGrid}
          disabled={!hasMoved}
          style={{ width: '100px' }}
        >
          Reset
        </Button>
      </Box>
    </Container>
  );
};

export default Slido;

