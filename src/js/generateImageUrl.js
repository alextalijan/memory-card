const apiKey = 'AIzaSyDsfxESi94ngysKTBfQVF-3Wq4uFWU06Iw';
const cx = '7786bd33211134c8b';

async function generateImageUrl(query) {
  const queryWords = query.split(' ');

  return fetch(
    `https://www.googleapis.com/customsearch/v1?q=${queryWords.join(
      '+'
    )}&searchType=image&cx=${cx}&key=${apiKey}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Google API Error: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((data) => {
      return data.items[0].link;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export default generateImageUrl;
