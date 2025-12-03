import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { fetchInitialScore } from '../utils/api';
import { getGamesWon, setGamesWon, resetGamesWon } from '../utils/storage';

const Dashboard = () => {
  const [gamesWon, setGamesWonState] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeScore = async () => {
      const saved = getGamesWon();
      if (saved === 0) {
        // First time load or after reset, fetch from API
        try {
          const initialScore = await fetchInitialScore();
          setGamesWon(initialScore);
          setGamesWonState(initialScore);
        } catch (error) {
          console.error('Failed to fetch initial score:', error);
          setGamesWonState(0);
        }
      } else {
        setGamesWonState(saved);
      }
      setLoading(false);
    };

    initializeScore();
  }, []);

  const handleReset = async () => {
    resetGamesWon();
    try {
      const initialScore = await fetchInitialScore();
      setGamesWon(initialScore);
      setGamesWonState(initialScore);
    } catch (error) {
      console.error('Failed to fetch initial score:', error);
      setGamesWonState(0);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box style={{ textAlign: 'center', paddingTop: '64px', paddingBottom: '64px' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 130px)',
        textAlign: 'center',
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        style={{
          color: 'red',
          fontSize: '2em',
          marginBottom: '20px',
        }}
      >
        Please choose an option from the navbar.
      </Typography>
      <Typography variant="h5" color="textSecondary">
        Games won: {gamesWon}{' '}
        <Button
          color="primary"
          size="small"
          onClick={handleReset}
          style={{ marginLeft: '10px' }}
        >
          (reset)
        </Button>
      </Typography>
    </Container>
  );
};

export default Dashboard;

