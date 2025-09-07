import blankImages from '../js/blankImages.js';
import getCachedImage from '../js/getCachedImage.js';
import { useEffect, useState } from 'react';

export default function Card({ name, imageUrl, onClick }) {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  useEffect(() => {
    if (blankImages.includes(name)) {
      getCachedImage(name)
        .then((url) => {
          setImgSrc(url || '/public/disney-logo.jpeg');
        })
        .catch(() => setImgSrc('/public/disney-logo.jpeg'));
    }
  }, []);

  return (
    <button className="card" onClick={onClick}>
      <div className="img-container">
        <img
          src={imgSrc}
          alt=""
          onError={() => setImgSrc('/public/disney-logo.jpeg')}
        />
      </div>
      <span className="character-name">{name}</span>
    </button>
  );
}
