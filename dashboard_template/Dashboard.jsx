import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import React,{useEffect,useState} from 'react';
import './App.css';

const Dashboard=(props)=>{
  const reset=(setnumWon)=>{
    const url="https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json"
    fetch(url)
    .then(res=>res.json())
    .then((res)=>{
      console.log("reset!")
      setnumWon(res.score)
      localStorage.setItem("number",res.score)
    })
  }

  return (
    <div className="dashboard">
      <div className="dash-first">Please choose an option from the navbar</div>
      <div className="dashboard-score">
        Games won: <span className="score-number">{props.numWon}</span>
      </div>
      <button onClick={() => reset(props.setnumWon)} className="reset-button">
        (reset)
      </button>
    </div>
  );
}

export default Dashboard