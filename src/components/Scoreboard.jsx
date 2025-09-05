export default function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <span>SCORE: {score}</span>
      <span>BEST SCORE: {bestScore}</span>
    </div>
  );
}
