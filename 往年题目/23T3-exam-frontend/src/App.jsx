import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import Blanko from './pages/Blanko';
import Slido from './pages/Slido';
import Tetro from './pages/Tetro';

// Utils
import { getGamesWon } from './utils/storage';

// Styles
import './App.css';

function App() {
  const [gamesWon, setGamesWon] = useState(0);

  useEffect(() => {
    const saved = getGamesWon();
    if (saved !== null) {
      setGamesWon(saved);
    }
  }, []);

  const handleGameWin = () => {
    const current = getGamesWon();
    if (current !== null) {
      setGamesWon(current);
    }
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard onGamesWonChange={setGamesWon} />}
            />
            <Route
              path="/blanko"
              element={<Blanko onGameWin={handleGameWin} />}
            />
            <Route
              path="/slido"
              element={<Slido onGameWin={handleGameWin} />}
            />
            <Route
              path="/tetro"
              element={<Tetro onGameWin={handleGameWin} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

