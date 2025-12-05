import { useState } from 'react';
import { getStats, getGamesLeft, getRoundsWon } from '../utils/storage';
import './Stats.css';

const Stats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const stats = getStats();
  const gamesLeft = getGamesLeft() || 0;
  const roundsWon = getRoundsWon();

  const numberMemoryAvg = stats.numberMemory.scores.length > 0
    ? (stats.numberMemory.scores.reduce((a, b) => a + b, 0) / stats.numberMemory.scores.length).toFixed(2)
    : 0;
  const numberMemoryBest = stats.numberMemory.scores.length > 0
    ? Math.max(...stats.numberMemory.scores)
    : 0;

  const flappyBirdAvg = stats.flappyBird.scores.length > 0
    ? (stats.flappyBird.scores.reduce((a, b) => a + b, 0) / stats.flappyBird.scores.length).toFixed(2)
    : 0;
  const flappyBirdBest = stats.flappyBird.scores.length > 0
    ? Math.max(...stats.flappyBird.scores)
    : 0;

  const treasureHuntAvgClickSpeed = stats.treasureHunt.clickSpeeds.length > 0
    ? (stats.treasureHunt.clickSpeeds.reduce((a, b) => a + b, 0) / stats.treasureHunt.clickSpeeds.length).toFixed(2)
    : 0;

  return (
    <>
      <button className="stats-button" onClick={() => setIsOpen(!isOpen)}>
        Stats
      </button>
      {isOpen && (
        <div className="stats-panel">
          <div className="stats-header">
            <h2>Statistics</h2>
            <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="stats-content">
            <div className="stats-section">
              <h3>Number Memory</h3>
              <p>Average Score: {numberMemoryAvg}</p>
              <p>Best Score: {numberMemoryBest}</p>
              <p>Wins: {stats.numberMemory.wins}</p>
              <p>Plays: {stats.numberMemory.plays}</p>
            </div>
            <div className="stats-section">
              <h3>Flappy Bird</h3>
              <p>Average Score: {flappyBirdAvg}</p>
              <p>Best Score: {flappyBirdBest}</p>
              <p>Wins: {stats.flappyBird.wins}</p>
              <p>Plays: {stats.flappyBird.plays}</p>
            </div>
            <div className="stats-section">
              <h3>Treasure Hunt</h3>
              <p>Average Click Speed: {treasureHuntAvgClickSpeed}</p>
              <p>Wins: {stats.treasureHunt.wins}</p>
              <p>Plays: {stats.treasureHunt.plays}</p>
            </div>
            <div className="stats-section">
              <h3>Dashboard</h3>
              <p>Games Remaining: {gamesLeft}</p>
              <p>Rounds Won: {roundsWon}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stats;

