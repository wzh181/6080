import { useState, useEffect } from 'react';
import { incrementGamesWon } from '../utils/storage';
import './Math.css';

const OPERATORS = ['+', '-', '*', '/', '%'];

const Math = ({ onGameWin }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const generateNewQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 50) + 1;
    const newNum2 = Math.floor(Math.random() * 50) + 1;
    const newOperator = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
    
    setNum1(newNum1);
    setNum2(newNum2);
    setOperator(newOperator);
    setAnswer('');
    
    // 计算正确答案
    let result;
    switch (newOperator) {
      case '+':
        result = newNum1 + newNum2;
        break;
      case '-':
        result = newNum1 - newNum2;
        break;
      case '*':
        result = newNum1 * newNum2;
        break;
      case '/':
        result = newNum1 / newNum2;
        break;
      case '%':
        result = newNum1 % newNum2;
        break;
      default:
        result = 0;
    }
    
    // 如果不是整数，保留1位小数
    const roundedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(1));
    setCorrectAnswer(roundedResult);
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setAnswer(value);
    
    // 检查答案
    const userAnswer = parseFloat(value);
    if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
      alert('Congratulations');
      incrementGamesWon();
      if (onGameWin) {
        onGameWin();
      }
      generateNewQuestion();
    }
  };

  return (
    <div className="math-container">
      <div className="math-wrapper">
        <div className="math-content">
          <div className="math-box">
            <div className="math-number">{num1}</div>
          </div>
          <div className="math-box">
            <div className="math-operator">{operator}</div>
          </div>
          <div className="math-box">
            <div className="math-number">{num2}</div>
          </div>
          <div className="math-box">
            <div className="math-equals">=</div>
          </div>
          <div className="math-box">
            <input
              type="number"
              step="0.1"
              value={answer}
              onChange={handleAnswerChange}
              onKeyUp={handleAnswerChange}
              className="math-input"
              placeholder="?"
            />
          </div>
        </div>
        <button onClick={generateNewQuestion} className="math-reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Math;

