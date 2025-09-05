import shuffleArray from './shuffleArray.js';

function getRandomMembers(array, amount = 16) {
  const shuffledArray = shuffleArray(array);

  // Take the first "amount" of items
  return shuffledArray.slice(0, amount);
}

export default getRandomMembers;
