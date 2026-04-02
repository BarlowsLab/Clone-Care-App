import { RecommendationResult } from '../types';

export function RecommendationCard({ result }: { result: RecommendationResult }) {
  return (
    <section className="card">
      <h2>Recommendation</h2>
      <div className="result-block">
        <h3>Watering Recommendation</h3>
        <p>{result.wateringRecommendation}</p>
      </div>

      <div className="result-block">
        <h3>Dome Recommendation</h3>
        <p>{result.domeRecommendation.join(' + ')}</p>
      </div>

      <div className="result-block">
        <h3>Why</h3>
        <p>{result.why}</p>
      </div>

      <div className="result-block">
        <h3>Risk Flags</h3>
        <ul>
          {result.riskFlags.length === 0 ? <li>None</li> : result.riskFlags.map((flag) => <li key={flag}>{flag}</li>)}
        </ul>
      </div>

      <div className="result-block">
        <h3>Recheck Timing</h3>
        <ul>
          {result.recheckTiming.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
