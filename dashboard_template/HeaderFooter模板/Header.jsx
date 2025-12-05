import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', short: 'H' },
    { path: '/game1', label: 'Game 1', short: 'G1' },
    { path: '/game2', label: 'Game 2', short: 'G2' },
    { path: '/game3', label: 'Game 3', short: 'G3' },
  ];

  return (
    <header className="header">
      <img src="https://via.placeholder.com/50x50" alt="logo" className="header-logo" />
      <nav className="header-nav">
        {navLinks.map((link, index) => (
          <span key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              <span className="nav-long">{link.label}</span>
              <span className="nav-short">{link.short}</span>
            </Link>
            {index < navLinks.length - 1 && (
              <span className="nav-separator">
                <span className="nav-separator-long"> | </span>
                <span className="nav-separator-short"> | </span>
              </span>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
};

export default Header;

