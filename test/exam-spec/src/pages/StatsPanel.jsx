import { useState, useEffect } from 'react';
import './StatsPanel.css';

function StatsPanel() {
  const [stats, setStats] = useState({
    guessTheNumber: {
      easy: { bestTime: null, correct: 0, total: 0 },
      medium: { bestTime: null, correct: 0, total: 0 },
      hard: { bestTime: null, correct: 0, total: 0 }
    },
    ticTacToe: {
      player1Wins: 0,
      player2Wins: 0,
      totalGames: 0
    },
    sealTheBox: {
      bestScore: 0,
      gamesPlayed: 0
    },
    timePlayed: {
      guessTheNumber: 0,
      ticTacToe: 0,
      sealTheBox: 0
    }
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const gtnEasy = localStorage.getItem('guessTheNumber_Easy');
    const gtnMedium = localStorage.getItem('guessTheNumber_Medium');
    const gtnHard = localStorage.getItem('guessTheNumber_Hard');

    const gtnStatsRaw = localStorage.getItem('guessTheNumberStats');
    const gtnStats = gtnStatsRaw ? JSON.parse(gtnStatsRaw) : [];

    const easyStats = gtnStats.filter(s => s.difficulty === 'Easy');
    const mediumStats = gtnStats.filter(s => s.difficulty === 'Medium');
    const hardStats = gtnStats.filter(s => s.difficulty === 'Hard');

    const tttStatsRaw = localStorage.getItem('ticTacToeStats');
    const tttStats = tttStatsRaw ? JSON.parse(tttStatsRaw) : [];

    const stbStatsRaw = localStorage.getItem('sealTheBoxStats');
    const stbStats = stbStatsRaw ? JSON.parse(stbStatsRaw) : [];

    const stbBest = localStorage.getItem('sealTheBoxBest');

    const timePlayedRaw = localStorage.getItem('timePlayedStats');
    const timePlayed = timePlayedRaw ? JSON.parse(timePlayedRaw) : {
      guessTheNumber: 0,
      ticTacToe: 0,
      sealTheBox: 0
    };

    setStats({
      guessTheNumber: {
        easy: {
          bestTime: gtnEasy ? JSON.parse(gtnEasy).timeUsed : null,
          correct: easyStats.filter(s => s.won).length,
          total: easyStats.length
        },
        medium: {
          bestTime: gtnMedium ? JSON.parse(gtnMedium).timeUsed : null,
          correct: mediumStats.filter(s => s.won).length,
          total: mediumStats.length
        },
        hard: {
          bestTime: gtnHard ? JSON.parse(gtnHard).timeUsed : null,
          correct: hardStats.filter(s => s.won).length,
          total: hardStats.length
        }
      },
      ticTacToe: {
        player1Wins: tttStats.filter(s => s.winner === 'O').length,
        player2Wins: tttStats.filter(s => s.winner === 'X').length,
        totalGames: tttStats.length
      },
      sealTheBox: {
        bestScore: stbBest ? parseInt(stbBest) : 0,
        gamesPlayed: stbStats.length
      },
      timePlayed
    });
  };

  const getAverageTime = (totalTime, gamesPlayed) => {
    if (gamesPlayed === 0) return 0;
    return (totalTime / gamesPlayed / 1000).toFixed(2);
  };

  return (
    <div className="stats-panel">
      <h1>Statistics Panel</h1>
      
      <div className="stats-section">
        <h2>Guess The Number</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>Easy Level</h3>
            <p>Best Time: {stats.guessTheNumber.easy.bestTime !== null 
              ? `${stats.guessTheNumber.easy.bestTime}s` 
              : 'N/A'}</p>
            <p>Correct Ratio: {stats.guessTheNumber.easy.correct}/{stats.guessTheNumber.easy.total}</p>
          </div>
          <div className="stat-item">
            <h3>Medium Level</h3>
            <p>Best Time: {stats.guessTheNumber.medium.bestTime !== null 
              ? `${stats.guessTheNumber.medium.bestTime}s` 
              : 'N/A'}</p>
            <p>Correct Ratio: {stats.guessTheNumber.medium.correct}/{stats.guessTheNumber.medium.total}</p>
          </div>
          <div className="stat-item">
            <h3>Hard Level</h3>
            <p>Best Time: {stats.guessTheNumber.hard.bestTime !== null 
              ? `${stats.guessTheNumber.hard.bestTime}s` 
              : 'N/A'}</p>
            <p>Correct Ratio: {stats.guessTheNumber.hard.correct}/{stats.guessTheNumber.hard.total}</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2>Tic Tac Toe</h2>
        <div className="stat-item">
          <p>Player 1 (O) has won: {stats.ticTacToe.player1Wins}</p>
          <p>Player 2 (X) has won: {stats.ticTacToe.player2Wins}</p>
          <p>Player 1 win ratio: {stats.ticTacToe.player1Wins}/{stats.ticTacToe.totalGames}</p>
          <p>Player 2 win ratio: {stats.ticTacToe.player2Wins}/{stats.ticTacToe.totalGames}</p>
        </div>
      </div>

      <div className="stats-section">
        <h2>Seal The Box</h2>
        <div className="stat-item">
          <p>Best Score: {stats.sealTheBox.bestScore} boxes sealed</p>
        </div>
      </div>

      <div className="stats-section">
        <h2>General Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>Games Played</h3>
            <p>Guess The Number: {stats.guessTheNumber.easy.total + 
              stats.guessTheNumber.medium.total + 
              stats.guessTheNumber.hard.total}</p>
            <p>Tic Tac Toe: {stats.ticTacToe.totalGames}</p>
            <p>Seal The Box: {stats.sealTheBox.gamesPlayed}</p>
          </div>
          <div className="stat-item">
            <h3>Average Time Spent</h3>
            <p>Guess The Number: {getAverageTime(
              stats.timePlayed.guessTheNumber,
              stats.guessTheNumber.easy.total + 
              stats.guessTheNumber.medium.total + 
              stats.guessTheNumber.hard.total
            )}s</p>
            <p>Tic Tac Toe: {getAverageTime(
              stats.timePlayed.ticTacToe,
              stats.ticTacToe.totalGames
            )}s</p>
            <p>Seal The Box: {getAverageTime(
              stats.timePlayed.sealTheBox,
              stats.sealTheBox.gamesPlayed
            )}s</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;

