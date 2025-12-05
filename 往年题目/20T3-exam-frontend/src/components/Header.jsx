import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', short: 'H' },
    { path: '/blanko', label: 'Blanko', short: 'B' },
    { path: '/slido', label: 'Slido', short: 'S' },
    { path: '/tetro', label: 'Tetro', short: 'T' },
  ];

  return (
    <header className="header">
      <img src="/logo.png" alt="logo" className="header-logo" />
      <nav className="header-nav">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
          >
            <span className="nav-long">{link.label}</span>
            <span className="nav-short">{link.short}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;

