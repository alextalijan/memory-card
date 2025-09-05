export default function Card({ name, imageUrl, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <div className="img-container">
        <img src={imageUrl} alt="" />
      </div>
      <span className="character-name">{name}</span>
    </button>
  );
}
