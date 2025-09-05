export default function Scoreboard({ score, bestScore }) {
  return (
    <div>
      <span>Score: {score}</span>
      <span>Best Score: {bestScore}</span>
    </div>
  );
}
