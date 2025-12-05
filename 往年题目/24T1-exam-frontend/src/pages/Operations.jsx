import { useState, useEffect } from 'react';
import { decrementGamesLeft } from '../utils/storage';
import './Operations.css';

const numbers = [
  [1, 2, 2],
  [3, 6, -3],
  [8, 3, 11],
  [9, 8, 17],
  [5, 4, 9],
];

const Operations = ({ onGameWin }) => {
  const [currentSet, setCurrentSet] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [output, setOutput] = useState(0);
  const [setsShown, setSetsShown] = useState(0);

  const loadNewSet = () => {
    const setIndex = setsShown % numbers.length;
    const [n1, n2, out] = numbers[setIndex];
    setNum1(n1);
    setNum2(n2);
    setOutput(out);
    setCurrentSet(setIndex);
    setSetsShown(setsShown + 1);
  };

  useEffect(() => {
    loadNewSet();
  }, []);

  const checkAnswer = (operator) => {
    let result;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case 'x':
        result = num1 * num2;
        break;
      case '÷':
        result = num1 / num2;
        break;
      default:
        return;
    }

    if (result === output) {
      alert('You have won the game');
      decrementGamesLeft();
      if (onGameWin) {
        onGameWin();
      }
      loadNewSet();
    } else {
      alert('Your answer was incorrect');
    }
  };

  return (
    <div className="operations-container">
      <div className="operations-box">
        <div className="operations-section">
          <div className="operations-number">{num1}</div>
        </div>
        <div className="operations-section">
          <div className="operations-buttons">
            <button onClick={() => checkAnswer('+')} className="op-button">
              +
            </button>
            <button onClick={() => checkAnswer('-')} className="op-button">
              -
            </button>
            <button onClick={() => checkAnswer('x')} className="op-button">
              x
            </button>
            <button onClick={() => checkAnswer('÷')} className="op-button">
              ÷
            </button>
          </div>
        </div>
        <div className="operations-section">
          <div className="operations-number">{num2}</div>
        </div>
        <div className="operations-section">
          <div className="operations-equals">=</div>
        </div>
        <div className="operations-section">
          <div className="operations-number">{output}</div>
        </div>
      </div>
    </div>
  );
};

export default Operations;

