import React, {useRef, useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar'; 
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import logo from './assets/logo.png'
import { useHistory } from 'react-router-dom';
import { STRS } from "./data/blankoData";


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    cursor: 'pointer',
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


// 1. FIX: Correct component name from Slido to Blanko
export default function Blanko() {
  const classes = useStyles();
  const history = useHistory();
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();

  // 2. FIX: Store the current question string and its solution in state
  // This prevents it from being re-generated on every render.
  const [currentString, setCurrentString] = useState('');
  const [solution, setSolution] = useState({ first: '', second: '', third: '' });

  // Function to generate a new question
  const generateNewQuestion = () => {
    const randomNumber = parseInt(Math.random() * STRS.length, 10);
    setCurrentString(STRS[randomNumber]);
  };

  function redirectBlanko(){
    history.push('../blanko')
  }
  function redirectSlido() {
    history.push('../slido')
  }
  function redirectTetro() {
    history.push('../tetro')
  }
  function redirectHome(){
    history.push('../dashboard')
  }

      }
    })
    return (
      <div>
        {boxContent}
      </div>
    )
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar} style={{height:'80px', backgroundColor: '#eeeeee'}}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <img src={logo} alt='logo' style={{width:'50px',height:'50px'}}/>
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" className={classes.link} onClick={redirectHome}>
              Home
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link} onClick={redirectBlanko}>
              Blanko
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link} onClick={redirectSlido}>
              Slido
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link} onClick={redirectTetro}>
              Tetro
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Blanko Game
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="div">
          <BlankoBox/>
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          <Button onClick={checkAnswer} color="primary" variant="contained" style={{marginRight: '10px'}}>Check Answer</Button>
          <Button onClick={generateNewQuestion} color="secondary" variant="contained">New Question</Button>
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {/* Main content can go here if needed */}
        </Grid>
      </Container>
      {/* Footer */}
      <Container component="footer" className={classes.footer} style={{backgroundColor:'#999999', height:'50px',width:'100%', position:'absolute', bottom:'0'}}>
        <Grid container spacing={4} justify="space-evenly">
        </Grid>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

