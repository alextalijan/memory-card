import Scoreboard from './components/Scoreboard.jsx';
import Screen from './components/Screen.jsx';
import triggerAnimation from './js/triggerAnimation.js';
import { useEffect, useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chosenCharacterIds, setChosenCharacterIds] = useState([]);

  function playRound(cardId) {
    let soundEffect;

    if (chosenCharacterIds.includes(cardId)) {
      const body = document.querySelector('body');
      triggerAnimation(body, 'flash-red');

      soundEffect = new Audio('/public/sound-effects/fail-sound.wav');
      soundEffect.volume = 0.5;
      soundEffect.play();

      if (score > bestScore) {
        setBestScore(score);
      }

      setScore(0);
      setChosenCharacterIds([]);
    } else {
      setScore((prev) => prev + 1);
      setChosenCharacterIds([...chosenCharacterIds, cardId]);

      soundEffect = new Audio('/public/sound-effects/success-sound.wav');
      soundEffect.play();
    }
  }

  // When the DOM finishes updating, if the game was lost, scroll to the scoreboard
  useEffect(() => {
    if (score === 0) {
      const scoreboard = document.querySelector('.scoreboard');
      scoreboard.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    // else if all cards have been clicked, allow them to continue from scratch
    else if (chosenCharacterIds.length === 16) {
      const soundEffect = new Audio('/public/sound-effects/win-sound.wav');
      soundEffect.play();

      const body = document.querySelector('body');
      triggerAnimation(body, 'flash-green');
      setChosenCharacterIds([]);

      const victoryModal = document.querySelector('.victory-modal');
      triggerAnimation(victoryModal, 'show');
    }
  }, [score, chosenCharacterIds]);

  return (
    <>
      <h1 className="h1">Disney Memory Game</h1>
      <p className="game-description">
        Get points by clicking on characters, but don't click on any more than
        once!
      </p>
      <Scoreboard score={score} bestScore={bestScore} />
      <Screen playRound={playRound} />
      <div className="victory-modal">
        <span>
          <b>Congrats!</b>
        </span>
        <p>You've successfully clicked on all cards only once.</p>
        <p>Start again. Your score will continue growing from here.</p>
      </div>
    </>
  );
}

export default App;
