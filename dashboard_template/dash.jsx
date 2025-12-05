import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import React,{useEffect,useState} from 'react';
import './App.css';

// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';

const Dash=(props)=>{

  return (
    <div className="dashboard-2">
      <div className="inner-container">
        <div className="box">{props.numWon || 0}</div>
        <div className="box">keep going</div>
      </div>
      <div className="inner-container">
        <div className="box">3</div>
        <div className="box">4</div>
      </div>
    </div>
  );
}

export default Dash