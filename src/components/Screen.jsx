import Card from './Card.jsx';
import { useState } from 'react';

function Screen() {
  const [characters, setCharacters] = useState([]);

  function getRandomCharacters(array, amount = 16) {
    // Shuffle using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    // Take the first "amount" of items
    return array.slice(0, amount);
  }

  fetch('https://api.disneyapi.dev/character')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    })
    .then((data) => {
      const randomCharacters = getRandomCharacters(data).map((character) => {
        return {
          id: character['_id'],
          name: character.name,
          imageUrl: character.imageUrl,
        };
      });

      setCharacters(randomCharacters);
    })
    .catch((error) => {
      console.log('API call failed:', error);
    });

  return (
    <div className="screen">
      {characters.map((character) => {
        return (
          <Card
            key={character.id}
            name={character.name}
            imageUrl={character.imageUrl}
          />
        );
      })}
    </div>
  );
}

export default Screen;
