import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Dashboard from './pages/Dashboard';
import Math from './pages/Math';
import Connect4 from './pages/Connect4';
import Memory from './pages/Memory';

// Utils
import { getRemainingGames, setRemainingGames, getGamesWon, incrementGamesWon } from './utils/storage';
import { INITIAL_REMAINING } from './utils/api';

// Styles
import './App.css';

function App() {
  const [gamesWon, setGamesWon] = useState(0);
  const [remaining, setRemaining] = useState(INITIAL_REMAINING);

  useEffect(() => {
    const savedWon = getGamesWon();
    const savedRemaining = getRemainingGames();
    setGamesWon(savedWon);
    if (savedRemaining !== null) {
      setRemaining(savedRemaining);
    }
  }, []);

  const handleGameWin = () => {
    const newWon = incrementGamesWon();
    setGamesWon(newWon);
    
    // Update remaining games
    const currentRemaining = getRemainingGames();
    if (currentRemaining !== null && currentRemaining > 0) {
      const newRemaining = currentRemaining - 1;
      setRemaining(newRemaining);
      setRemainingGames(newRemaining);
    }
  };

  return (
    <Router>
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard onGameWin={handleGameWin} />}
            />
            <Route
              path="/game/math"
              element={<Math onGameWin={handleGameWin} />}
            />
            <Route
              path="/game/connect"
              element={<Connect4 onGameWin={handleGameWin} />}
            />
            <Route
              path="/game/memory"
              element={<Memory onGameWin={handleGameWin} />}
            />
            <Route path="/" element={<Dashboard onGameWin={handleGameWin} />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;

