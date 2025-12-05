import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Operations from './pages/Operations';
import Memory from './pages/Memory';
import Space from './pages/Space';

// Utils
import { getGamesLeft } from './utils/storage';

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
    }
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/operations"
              element={<Operations onGameWin={handleGameWin} />}
            />
            <Route
              path="/memory"
              element={<Memory onGameWin={handleGameWin} />}
            />
            <Route
              path="/space"
              element={<Space onGameWin={handleGameWin} />}
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

