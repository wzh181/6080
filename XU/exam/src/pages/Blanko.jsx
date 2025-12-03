import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
} from '@material-ui/core';
import { STRS } from '../data/blankoData';
import { incrementGamesWon } from '../utils/storage';

const Blanko = () => {
  const [currentString, setCurrentString] = useState('');
  const [solution, setSolution] = useState({ first: '', second: '', third: '' });
  const [inputs, setInputs] = useState({ first: '', second: '', third: '' });
  const [positions, setPositions] = useState([]);
  
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();

  // Generate new question
  const generateNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * STRS.length);
    const str = STRS[randomIndex];
    setCurrentString(str);

    // Find non-space characters
    const nonSpaceIndices = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== ' ') {
        nonSpaceIndices.push(i);
      }
    }

    // Randomly select 3 positions
    const selectedPositions = [];
    while (selectedPositions.length < 3 && nonSpaceIndices.length > 0) {
      const randomPos = Math.floor(Math.random() * nonSpaceIndices.length);
      selectedPositions.push(nonSpaceIndices[randomPos]);
      nonSpaceIndices.splice(randomPos, 1);
    }
    selectedPositions.sort((a, b) => a - b);

    setPositions(selectedPositions);
    setSolution({
      first: str[selectedPositions[0]],
      second: str[selectedPositions[1]],
      third: str[selectedPositions[2]],
    });
    setInputs({ first: '', second: '', third: '' });
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleInputChange = (position, value) => {
    if (value.length <= 1) {
      setInputs((prev) => ({
        ...prev,
        [position]: value,
      }));
    }
  };

  const checkAnswer = () => {
    const isCorrect =
      inputs.first === solution.first &&
      inputs.second === solution.second &&
      inputs.third === solution.third;

    if (isCorrect) {
      alert('Correct!');
      incrementGamesWon();
      generateNewQuestion();
    }
  };

  const renderBoxes = () => {
    if (!currentString) return null;

    const boxes = [];
    for (let i = 0; i < 12; i++) {
      if (i < currentString.length) {
        const char = currentString[i];
        const isInput = positions.includes(i);
        const positionIndex = positions.indexOf(i);
        const positionName = positionIndex === 0 ? 'first' : positionIndex === 1 ? 'second' : 'third';

        if (isInput) {
          boxes.push(
            <TextField
              key={i}
              inputRef={positionIndex === 0 ? firstRef : positionIndex === 1 ? secondRef : thirdRef}
              value={inputs[positionName]}
              onChange={(e) => handleInputChange(positionName, e.target.value)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center', fontSize: '1.5rem' },
              }}
              style={{
                width: '60px',
                height: '60px',
                margin: '5px',
              }}
            />
          );
        } else if (char === ' ') {
          boxes.push(
            <Box
              key={i}
              style={{
                width: '60px',
                height: '60px',
                margin: '5px',
                display: 'inline-block',
              }}
            />
          );
        } else {
          boxes.push(
            <Box
              key={i}
              style={{
                width: '60px',
                height: '60px',
                margin: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ccc',
                fontSize: '1.5rem',
              }}
            >
              {char}
            </Box>
          );
        }
      } else {
        boxes.push(
          <Box
            key={i}
            style={{
              width: '60px',
              height: '60px',
              margin: '5px',
              display: 'inline-block',
            }}
          />
        );
      }
    }
    return boxes;
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 130px)',
        paddingTop: '40px',
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        gutterBottom
        style={{ marginBottom: '30px' }}
      >
        Blanko Game
      </Typography>

      <Box
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px',
          minHeight: '100px',
        }}
      >
        {renderBoxes()}
      </Box>

      <Box style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={checkAnswer}
          disabled={!inputs.first || !inputs.second || !inputs.third}
        >
          Check Answer
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={generateNewQuestion}
        >
          Reset
        </Button>
      </Box>
    </Container>
  );
};

export default Blanko;

