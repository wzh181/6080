import { useState, useEffect, useRef } from 'react';
import { decrementGamesLeft } from '../utils/storage';
import './Memory.css';

const BUTTONS = ['A', 'B', 'C', 'D'];
const MAX_ITERATION = 5;

const Memory = ({ onGameWin }) => {
  const [iteration, setIteration] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [currentChar, setCurrentChar] = useState('');
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const timeoutRef = useRef(null);

  const generateSequence = (length) => {
    const seq = [];
    for (let i = 0; i < length; i++) {
      seq.push(BUTTONS[Math.floor(Math.random() * BUTTONS.length)]);
    }
    return seq;
  };

  const showSequence = async (seq) => {
    setIsShowing(true);
    setButtonsDisabled(true);

    for (let i = 0; i < seq.length; i++) {
      setCurrentChar(seq[i]);
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(() => {
          setCurrentChar('');
          resolve();
        }, 1000);
      });
      if (i < seq.length - 1) {
        await new Promise((resolve) => {
          timeoutRef.current = setTimeout(resolve, 100);
        });
      }
    }

    setIsShowing(false);
    setButtonsDisabled(false);
  };

  const startRound = () => {
    const newSequence = generateSequence(iteration);
    setSequence(newSequence);
    setUserSequence([]);
    showSequence(newSequence);
  };

  useEffect(() => {
    if (!gameStarted) {
      setGameStarted(true);
      startRound();
    }
  }, []);

  useEffect(() => {
    if (gameStarted && iteration > 1 && iteration <= MAX_ITERATION) {
      const newSequence = generateSequence(iteration);
      setSequence(newSequence);
      setUserSequence([]);
      showSequence(newSequence);
    }
  }, [iteration]);

  const handleButtonClick = (button) => {
    if (buttonsDisabled || isShowing) return;

    const newUserSequence = [...userSequence, button];
    setUserSequence(newUserSequence);

    // Check if correct
    if (newUserSequence.length <= sequence.length) {
      const expectedChar = sequence[newUserSequence.length - 1];
      if (button !== expectedChar) {
        // Wrong answer
        alert('You lost the game');
        // Reset game
        setIteration(1);
        setSequence([]);
        setUserSequence([]);
        setGameStarted(false);
        // Restart after a delay
        setTimeout(() => {
          setGameStarted(true);
          const newSequence = generateSequence(1);
          setSequence(newSequence);
          setUserSequence([]);
          showSequence(newSequence);
        }, 100);
        return;
      }

      // Check if round is complete
      if (newUserSequence.length === sequence.length) {
        if (iteration === MAX_ITERATION) {
          // Game won!
          alert('You have won the game');
          decrementGamesLeft();
          if (onGameWin) {
            onGameWin();
          }
          // Reset game
          setIteration(1);
          setSequence([]);
          setUserSequence([]);
          setGameStarted(false);
          // Restart after a delay
          setTimeout(() => {
            setGameStarted(true);
            const newSequence = generateSequence(1);
            setSequence(newSequence);
            setUserSequence([]);
            showSequence(newSequence);
          }, 100);
        } else {
          // Move to next iteration
          setIteration(iteration + 1);
          setUserSequence([]);
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="memory-container">
      <div className="memory-top">
        {BUTTONS.map((button) => (
          <button
            key={button}
            onClick={() => handleButtonClick(button)}
            disabled={buttonsDisabled}
            className="memory-button"
          >
            {button}
          </button>
        ))}
      </div>
      <div className="memory-bottom">
        <div className="instruction-box">{currentChar}</div>
      </div>
    </div>
  );
};

export default Memory;

