// This component exists solely to prevent CSS purging of dynamic score classes
// It's never rendered but ensures Vite/Tailwind sees all our score class names
export const ScoreSafelist = () => {
  return (
    <div className="hidden">
      <div className="score-excellent"></div>
      <div className="score-good"></div>
      <div className="score-fair"></div>
      <div className="score-poor"></div>
      <div className="score-critical"></div>
      <div className="clause-score-excellent"></div>
      <div className="clause-score-good"></div>
      <div className="clause-score-fair"></div>
      <div className="clause-score-poor"></div>
      <div className="clause-score-critical"></div>
    </div>
  );
};