export default function Card({ name, imageUrl, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <img src={imageUrl} alt="" />
      <span>{name}</span>
    </button>
  );
}
