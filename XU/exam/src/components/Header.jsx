import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Box,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const history = useHistory();

  const handleNavigation = (path) => {
    history.push(path);
  };

  const navLinks = [
    { path: '/', label: 'Home', short: 'H' },
    { path: '/blanko', label: 'Blanko', short: 'B' },
    { path: '/slido', label: 'Slido', short: 'S' },
    { path: '/tetro', label: 'Tetro', short: 'T' },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      style={{
        height: '80px',
        backgroundColor: '#eeeeee',
      }}
    >
      <Toolbar style={{ flexWrap: 'wrap' }}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          style={{ flexGrow: 1 }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: '50px', height: '50px', margin: '15px' }}
          />
        </Typography>
        <nav>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              variant="button"
              color="textPrimary"
              onClick={() => handleNavigation(link.path)}
              style={{
                margin: '8px 12px',
                cursor: 'pointer',
              }}
            >
              <span className="nav-long">{link.label}</span>
              <span className="nav-short">{link.short}</span>
            </Link>
          ))}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

