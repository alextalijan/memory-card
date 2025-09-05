import { useState } from 'react';
import Scoreboard from './components/Scoreboard.jsx';
import Screen from './components/Screen.jsx';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chosenCharacterIds, setChosenCharacterIds] = useState([]);

  function playRound(cardId) {
    if (chosenCharacterIds.includes(cardId)) {
      if (score > bestScore) {
        setBestScore(score);
      }

      setScore(0);
      setChosenCharacterIds([]);
    } else {
      setScore((prev) => prev + 1);
      setChosenCharacterIds([...chosenCharacterIds, cardId]);
    }
  }

  return (
    <>
      <h1>Disney Memory Game</h1>
      <p>
        Get points by clicking on characters, but don't click on any more than
        once!
      </p>
      <Scoreboard score={score} bestScore={bestScore} />
      <Screen playRound={playRound} />
    </>
  );
}

export default App;
