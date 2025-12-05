import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Stats from './components/Stats';

// Pages
import Dashboard from './pages/Dashboard';
import NumberMemory from './pages/NumberMemory';
import TreasureHunt from './pages/TreasureHunt';
import FlappyBird from './pages/FlappyBird';

// Utils
import { getGamesLeft, resetGamesLeft, getInitialScore, incrementRoundsWon } from './utils/storage';
import { fetchInitialScore } from './utils/api';

// Styles
import './App.css';

function App() {
  const [gamesLeft, setGamesLeft] = useState(5);

  useEffect(() => {
    const saved = getGamesLeft();
    if (saved !== null) {
      setGamesLeft(saved);
    }
  }, []);

  const handleGameWin = () => {
    const current = getGamesLeft();
    if (current !== null) {
      setGamesLeft(current);
      
      // Check if games left reached 0
      if (current === 0) {
        alert('Congratulations! You\'ve won!');
        const initial = getInitialScore();
        if (initial !== null) {
          resetGamesLeft(initial);
          setGamesLeft(initial);
          incrementRoundsWon();
        } else {
          // Fetch from API
          fetchInitialScore().then((score) => {
            resetGamesLeft(score);
            setGamesLeft(score);
            incrementRoundsWon();
          });
        }
      }
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/game/numbermemory"
              element={<NumberMemory onGameWin={handleGameWin} />}
            />
            <Route
              path="/game/treasurehunt"
              element={<TreasureHunt onGameWin={handleGameWin} />}
            />
            <Route
              path="/game/flappybird"
              element={<FlappyBird onGameWin={handleGameWin} />}
            />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
        <Stats />
      </div>
    </Router>
  );
}

export default App;

