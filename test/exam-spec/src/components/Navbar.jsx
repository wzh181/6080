import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNavText = () => {
    if (screenWidth >= 1400) {
      return {
        dashboard: 'Dashboard',
        guess: 'Guess The Number',
        tic: 'Tic Tac Toe',
        seal: 'Seal The Box'
      };
    } else {
      return {
        dashboard: 'Dash',
        guess: 'Guess',
        tic: 'Tic',
        seal: 'Seal'
      };
    }
  };

  const navText = getNavText();

  return (
    <nav className="navbar">
      <div className="nav-box">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2965/2965358.png" 
          alt="logo" 
          className="nav-logo"
        />
      </div>
      <div className="nav-box">
        <Link to="/dashboard">{navText.dashboard}</Link>
      </div>
      <div className="nav-box">
        <Link to="/game/guessthenumber">{navText.guess}</Link>
      </div>
      <div className="nav-box">
        <Link to="/game/tictactoe">{navText.tic}</Link>
      </div>
      <div className="nav-box">
        <Link to="/game/sealthebox">{navText.seal}</Link>
      </div>
    </nav>
  );
}

export default Navbar;

