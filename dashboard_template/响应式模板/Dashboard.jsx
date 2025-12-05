import React from 'react';
import './Dashboard.css';

const Dashboard = ({ numWon, setNumWon }) => {
  const reset = () => {
    const url = 'https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json';
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log('reset!');
        setNumWon(res.score);
        localStorage.setItem('number', res.score.toString());
      })
      .catch((error) => {
        console.error('Error fetching score:', error);
        const defaultScore = 5;
        setNumWon(defaultScore);
        localStorage.setItem('number', defaultScore.toString());
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-text">
        Please choose an option from the navbar
      </div>
      <div className="dashboard-score">
        Games won: <span className="score-number">{numWon}</span>
      </div>
      <button onClick={reset} className="reset-button">
        (reset)
      </button>
    </div>
  );
};

export default Dashboard;

