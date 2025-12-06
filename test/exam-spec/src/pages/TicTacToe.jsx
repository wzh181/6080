import { useState, useEffect } from 'react';
import { decrementGamesLeft } from '../utils/gameScore';
import './TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationBg, setAnimationBg] = useState('#fff');
  const [startTime, setStartTime] = useState(Date.now());

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isPlayer1Turn ? 'O' : 'X';
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    const isBoardFull = newBoard.every(cell => cell !== null);

    if (gameWinner || isBoardFull) {
      setWinner(gameWinner);
      setGameOver(true);
      setShowAnimation(true);

      if (gameWinner === 'O') {
        decrementGamesLeft();
      }

      const moves = newBoard.filter(cell => cell !== null).length;
      saveGameStats(gameWinner, moves);

      let count = 0;
      const animationInterval = setInterval(() => {
        setAnimationBg(prev => prev === '#fff' ? '#000' : '#fff');
        count++;
        if (count >= 6) {
          clearInterval(animationInterval);
          setShowAnimation(false);
        }
      }, 500);
    } else {
      setIsPlayer1Turn(!isPlayer1Turn);
    }
  };

  const saveGameStats = (winner, moves) => {
    const timePlayed = Date.now() - startTime;
    
    const stats = {
      winner: winner || 'none',
      moves: moves,
      timestamp: Date.now()
    };

    const existingStats = localStorage.getItem('ticTacToeStats');
    const allStats = existingStats ? JSON.parse(existingStats) : [];
    allStats.push(stats);
    localStorage.setItem('ticTacToeStats', JSON.stringify(allStats));

    const timePlayedStats = localStorage.getItem('timePlayedStats');
    const timeStats = timePlayedStats ? JSON.parse(timePlayedStats) : {
      guessTheNumber: 0,
      ticTacToe: 0,
      sealTheBox: 0
    };
    timeStats.ticTacToe += timePlayed;
    localStorage.setItem('timePlayedStats', JSON.stringify(timeStats));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayer1Turn(true);
    setGameOver(false);
    setWinner(null);
    setShowAnimation(false);
    setAnimationBg('#fff');
    setStartTime(Date.now());
  };

  const getSquareBackground = (index) => {
    if (showAnimation) {
      return animationBg;
    }
    if (board[index]) {
      return 'transparent';
    }
    return isPlayer1Turn ? 'rgb(255,220,220)' : 'rgb(220,220,255)';
  };

  const getFilledMoves = () => {
    if (!winner) {
      return board.filter(cell => cell !== null).length;
    }
    return board.filter(cell => cell === winner).length;
  };

  return (
    <div className="tic-tac-toe">
      <div className="game-board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            style={{ backgroundColor: getSquareBackground(index) }}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
        {gameOver && !showAnimation && (
          <div className="overlay">
            <div className="result-box">
              <p>{winner ? `${winner} wins` : 'No one wins'}</p>
              <p>A total of {getFilledMoves()} moves were complete</p>
              <button onClick={resetGame}>Play again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;
