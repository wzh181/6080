import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';

const Header = () => {
  return (
    <div className="header">
      <img src="https://via.placeholder.com/50x50" alt="logo" className="logo" />
      <nav>
        <Link to="/"><span className="long">Home</span><span className="short">H</span></Link>
        <Link to="/game1"><span className="long">Game1</span><span className="short">G1</span></Link>
        <Link to="/game2"><span className="long">Game2</span><span className="short">G2</span></Link>
        <Link to="/game3"><span className="long">Game3</span><span className="short">G3</span></Link>
      </nav>
    </div>
  );
};

const Footer = () => {
  return <div className="footer"></div>;
};

function App() {
  const [numWon, setNumWon] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('numWon');
    if (saved) {
      setNumWon(parseInt(saved));
    } else {
      fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json')
        .then(res => res.json())
        .then(data => {
          setNumWon(data.score);
          localStorage.setItem('numWon', data.score);
        });
    }
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard numWon={numWon} setNumWon={setNumWon} />} />
            <Route path="/game1" element={<div>Game 1</div>} />
            <Route path="/game2" element={<div>Game 2</div>} />
            <Route path="/game3" element={<div>Game 3</div>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

const Dashboard = ({ numWon, setNumWon }) => {
  const reset = () => {
    fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json')
      .then(res => res.json())
      .then(data => {
        setNumWon(data.score);
        localStorage.setItem('numWon', data.score);
      });
  };

  return (
    <div className="dashboard">
      <p className="text">Please choose an option from the navbar</p>
      <p>Games won: {numWon}</p>
      <button onClick={reset}>(reset)</button>
    </div>
  );
};

export default App;


