import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', short: 'D' },
    { path: '/game/numbermemory', label: 'Number Memory', short: 'NM' },
    { path: '/game/treasurehunt', label: 'Treasure Hunt', short: 'TH' },
    { path: '/game/flappybird', label: 'Flappy Bird', short: 'FB' },
  ];

  return (
    <nav className="navbar">
      <img src="https://via.placeholder.com/30x30" alt="logo" className="navbar-logo" />
      <div className="navbar-links">
        {navLinks.map((link, index) => (
          <span key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              <span className="nav-long">{link.label}</span>
              <span className="nav-short">{link.short}</span>
            </Link>
            {index < navLinks.length - 1 && <span className="nav-gap"></span>}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

