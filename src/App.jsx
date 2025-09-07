import Scoreboard from './components/Scoreboard.jsx';
import Screen from './components/Screen.jsx';
import triggerAnimation from './js/triggerAnimation.js';
import { useState } from 'react';

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

      const scoreboard = document.querySelector('.scoreboard');
      scoreboard.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

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

  return (
    <>
      <h1 className="h1">Disney Memory Game</h1>
      <p className="game-description">
        Get points by clicking on characters, but don't click on any more than
        once!
      </p>
      <Scoreboard score={score} bestScore={bestScore} />
      <Screen playRound={playRound} />
    </>
  );
}

export default App;
