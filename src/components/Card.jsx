export default function Card({ name, imageUrl }) {
  return (
    <div className="card">
      <img src={imageUrl} alt="" />
      <span>{name}</span>
    </div>
  );
}
