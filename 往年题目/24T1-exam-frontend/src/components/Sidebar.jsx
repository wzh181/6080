import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/home', label: 'Home', short: 'H' },
    { path: '/operations', label: 'Operations', short: 'Op' },
    { path: '/memory', label: 'Memory', short: 'Me' },
    { path: '/space', label: 'Space', short: 'S' },
  ];

  return (
    <aside className="sidebar">
      <img
        src="https://via.placeholder.com/50x50"
        alt="logo"
        className="sidebar-logo"
      />
      <nav className="sidebar-nav">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            <span className="sidebar-text">{link.label}</span>
            <span className="sidebar-short">{link.short}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

