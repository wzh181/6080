import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import Blanko from './pages/Blanko';
import Slido from './pages/Slido';
import Tetro from './pages/Tetro';

// Styles
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          margin: 0,
        }}
      >
        <Header />
        <Box
          component="main"
          style={{
            flex: 1,
            marginTop: '80px',
            marginBottom: '50px',
            width: '100%',
          }}
        >
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/blanko" component={Blanko} />
            <Route path="/slido" component={Slido} />
            <Route path="/tetro" component={Tetro} />
            <Redirect to="/" />
          </Switch>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
