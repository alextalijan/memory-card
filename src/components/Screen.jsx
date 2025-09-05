import Card from './Card.jsx';
import { useEffect, useState } from 'react';

function Screen() {
  const [characters, setCharacters] = useState([]);

  function shuffleArray(array) {
    const copy = [...array];

    // Shuffle using Fisher-Yates algorithm
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  function getRandomMembers(array, amount = 16) {
    const shuffledArray = shuffleArray(array);

    // Take the first "amount" of items
    return shuffledArray.slice(0, amount);
  }

  function shuffleCards() {
    const shuffledCards = shuffleArray(characters);
    setCharacters(shuffledCards);
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
            onClick={shuffleCards}
          />
        );
      })}
    </div>
  );
}

export default Screen;
