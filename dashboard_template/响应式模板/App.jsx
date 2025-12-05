import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
// import logo from '../logo.svg';
const logo = 'https://via.placeholder.com/50x50'; // 或使用你的logo路径
import Dashboard from './Dashboard';
import Game1 from './Game1';
import Game2 from './Game2';
import Game3 from './Game3';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="header-logo" />
      <nav className="header-nav">
        <Link to="/">
          <span className="nav-long">Home</span>
          <span className="nav-short">H</span>
        </Link>
        <span className="nav-separator">
          <span className="nav-separator-long"> | </span>
          <span className="nav-separator-short"> | </span>
        </span>
        <Link to="/game1">
          <span className="nav-long">Game 1</span>
          <span className="nav-short">G1</span>
        </Link>
        <span className="nav-separator">
          <span className="nav-separator-long"> | </span>
          <span className="nav-separator-short"> | </span>
        </span>
        <Link to="/game2">
          <span className="nav-long">Game 2</span>
          <span className="nav-short">G2</span>
        </Link>
        <span className="nav-separator">
          <span className="nav-separator-long"> | </span>
          <span className="nav-separator-short"> | </span>
        </span>
        <Link to="/game3">
          <span className="nav-long">Game 3</span>
          <span className="nav-short">G3</span>
        </Link>
      </nav>
    </div>
  );
};

const Footer = () => {
  return <div className="footer"></div>;
};

function App() {
  const [numWon, setNumWon] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const num = localStorage.getItem('number');
    if (num) {
      setNumWon(parseInt(num, 10));
      setLoading(false);
    } else {
      const url = 'https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json';
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setNumWon(res.score);
          localStorage.setItem('number', res.score.toString());
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching score:', error);
          setNumWon(5); // 默认值
          setLoading(false);
        });
    }
  }, []);

  const handleGameWin = () => {
    const newNum = numWon + 1;
    setNumWon(newNum);
    localStorage.setItem('number', newNum.toString());
  };

  if (loading) {
    return (
      <div className="body">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="body">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard numWon={numWon} setNumWon={setNumWon} />}
            />
            <Route
              path="/game1"
              element={<Game1 onGameWin={handleGameWin} />}
            />
            <Route
              path="/game2"
              element={<Game2 onGameWin={handleGameWin} />}
            />
            <Route
              path="/game3"
              element={<Game3 onGameWin={handleGameWin} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

