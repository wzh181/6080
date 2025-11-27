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

  return(
    <div className='dashboard'>
      <div className='dash-first'>Please choose an option from the navbar</div>
      <div>games won:{props.numWon}</div>
      <button onClick={()=>reset(props.setnumWon)}>reset</button>
    </div>
  )
}

export default Dashboard