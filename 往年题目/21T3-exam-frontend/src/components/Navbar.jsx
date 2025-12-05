import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', short: 'Da', icon: true },
    { path: '/game/math', label: 'Math', short: 'Ma', icon: true },
    { path: '/game/connect', label: 'Connect 4', short: 'Co', icon: true },
    { path: '/game/memory', label: 'Memorisation', short: 'Me', icon: true },
  ];

  return (
    <nav className="navbar">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
        >
          {link.icon && (
          <img
            src="https://via.placeholder.com/20x20"
            alt="logo"
            className="nav-logo"
          />
        ))}
          <span className="nav-text">{link.label}</span>
          <span className="nav-short">{link.short}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;

