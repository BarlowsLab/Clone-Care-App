import { seedScenarios } from '../data/testScenarios';

interface Props {
  onPick: (scenarioId: string) => void;
}

export function TestScenarioPicker({ onPick }: Props) {
  return (
    <section className="card">
      <h2>Seed Test Scenarios</h2>
      <div className="scenario-list">
        {seedScenarios.map((scenario) => (
          <button key={scenario.id} type="button" onClick={() => onPick(scenario.id)}>
            {scenario.label}
          </button>
        ))}
      </div>
    </section>
  );
}
