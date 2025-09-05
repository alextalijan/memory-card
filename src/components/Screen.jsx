import Card from './Card.jsx';
import getRandomMembers from '../js/getRandomMembers.js';
import shuffleArray from '../js/shuffleArray.js';
import { useEffect, useState } from 'react';

function Screen({ playRound }) {
  const [characters, setCharacters] = useState([]);

  function shuffleCards() {
    const shuffledCards = shuffleArray(characters);
    setCharacters(shuffledCards);
  }

  function handleCardClick(id) {
    playRound(id);
    shuffleCards();
  }

  useEffect(() => {
    const abortController = new AbortController(); // Initialize AbortController
    const signal = abortController.signal; // Get the signal

    fetch('https://api.disneyapi.dev/character', { signal }) // Pass the signal
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((json) => {
        const randomCharacters = getRandomMembers(json.data).map(
          (character) => {
            return {
              id: character['_id'],
              name: character.name,
              imageUrl: character.imageUrl,
            };
          }
        );

        setCharacters(randomCharacters);
      })
      .catch((error) => {
        console.log('API call failed:', error);
      });

    return () => abortController.abort(); // Abort the fetch request
  }, []);

  return (
    <div className="screen">
      {characters.map((character) => {
        return (
          <Card
            key={character.id}
            name={character.name}
            imageUrl={character.imageUrl}
            onClick={() => handleCardClick(character.id)}
          />
        );
      })}
    </div>
  );
}

export default Screen;
