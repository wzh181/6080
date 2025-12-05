import { useState, useEffect, useRef } from 'react';
import { STRS } from '../data/blanko';
import { incrementGamesWon } from '../utils/storage';
import './Blanko.css';

const Blanko = ({ onGameWin }) => {
  const [currentString, setCurrentString] = useState('');
  const [inputPositions, setInputPositions] = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const inputRefs = useRef([]);

  const generateNewQuestion = () => {
    const randomStr = STRS[Math.floor(Math.random() * STRS.length)];
    setCurrentString(randomStr);

    const nonSpaceIndices = [];
    for (let i = 0; i < randomStr.length; i++) {
      if (randomStr[i] !== ' ') {
        nonSpaceIndices.push(i);
      }
    }

    const chosenPositions = [];
    while (chosenPositions.length < 3 && nonSpaceIndices.length > 0) {
      const randomIndex = Math.floor(Math.random() * nonSpaceIndices.length);
      chosenPositions.push(nonSpaceIndices.splice(randomIndex, 1)[0]);
    }
    setInputPositions(chosenPositions.sort((a, b) => a - b));
    setUserInputs({});
    inputRefs.current = [];
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleInputChange = (e, position) => {
    const value = e.target.value.slice(0, 1).toLowerCase();
    const newInputs = {
      ...userInputs,
      [position]: value,
    };
    setUserInputs(newInputs);

    // 检查是否所有输入都已完成
    if (value && inputPositions.every((pos) => newInputs[pos])) {
      setTimeout(() => checkAnswer(newInputs), 0);
    }
  };

  const checkAnswer = (inputs = userInputs) => {
    let isCorrect = true;
    inputPositions.forEach((pos) => {
      if (!inputs[pos] || inputs[pos] !== currentString[pos].toLowerCase()) {
        isCorrect = false;
      }
    });

    if (isCorrect && inputPositions.every((pos) => inputs[pos])) {
      alert('Correct!');
      incrementGamesWon();
      if (onGameWin) {
        onGameWin();
      }
      generateNewQuestion();
    }
  };

  const handleKeyDown = (e, position) => {
    if (e.key === 'Enter') {
      checkAnswer();
    } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
      e.preventDefault();
      const currentIndex = inputPositions.indexOf(position);
      if (currentIndex < inputPositions.length - 1) {
        const nextPosition = inputPositions[currentIndex + 1];
        const nextInput = inputRefs.current.find(
          (ref) => ref && ref.dataset.position === nextPosition.toString()
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const currentIndex = inputPositions.indexOf(position);
      if (currentIndex > 0) {
        const prevPosition = inputPositions[currentIndex - 1];
        const prevInput = inputRefs.current.find(
          (ref) => ref && ref.dataset.position === prevPosition.toString()
        );
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  // 确保字符串长度不超过12
  const displayString = currentString.slice(0, 12);
  const boxes = Array(12).fill(null).map((_, i) => {
    if (i < displayString.length) {
      return displayString[i];
    }
    return null;
  });

  return (
    <div className="blanko-container">
      <div className="blanko-content">
        <div className="blanko-boxes">
          {boxes.map((char, index) => (
            <div key={index} className="blanko-box">
              {inputPositions.includes(index) ? (
                <input
                  ref={(el) => {
                    if (el) {
                      el.dataset.position = index.toString();
                      const existingIndex = inputRefs.current.findIndex(
                        (ref) => ref && ref.dataset.position === index.toString()
                      );
                      if (existingIndex === -1) {
                        inputRefs.current.push(el);
                      } else {
                        inputRefs.current[existingIndex] = el;
                      }
                    }
                  }}
                  type="text"
                  maxLength="1"
                  value={userInputs[index] || ''}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="blanko-input"
                />
              ) : char ? (
                char
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
        <button onClick={generateNewQuestion} className="blanko-reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Blanko;

