import { useMemo, useState } from 'react';
import { InputForm } from './components/InputForm';
import { RecommendationCard } from './components/RecommendationCard';
import { TestScenarioPicker } from './components/TestScenarioPicker';
import { seedScenarios } from './data/testScenarios';
import { generateRecommendation } from './lib/engine';
import { CareInput } from './types';

const defaultInput: CareInput = {
  daySinceSticking: 4,
  cubeMoisture: 'Dark & Damp Exterior / Wet Center',
  rootingStage: 'Callus',
  drybackPace: 'Average',
  leafTurgor: 'Slightly Soft',
  domeCondensation: 'Moderate',
  trayUniformity: 'Even',
};

function runScenarioSelfCheck() {
  return seedScenarios.map((scenario) => {
    const result = generateRecommendation(scenario.input);
    const wateringPass = scenario.expectedWatering ? result.wateringRecommendation === scenario.expectedWatering : true;
    const domePass = scenario.expectedDomeIncludes
      ? scenario.expectedDomeIncludes.every((output) => result.domeRecommendation.includes(output as never))
      : true;
    return { id: scenario.id, label: scenario.label, pass: wateringPass && domePass };
  });
}

export default function App() {
  const [input, setInput] = useState<CareInput>(defaultInput);
  const result = useMemo(() => generateRecommendation(input), [input]);
  const scenarioChecks = useMemo(() => runScenarioSelfCheck(), []);

  const handlePickScenario = (scenarioId: string) => {
    const picked = seedScenarios.find((scenario) => scenario.id === scenarioId);
    if (picked) setInput(picked.input);
  };

  return (
    <main className="container">
      <header>
        <h1>Clone Care Assistant</h1>
        <p>Deterministic, table-driven clone watering and dome-care recommendations for daily operations.</p>
      </header>

      <InputForm value={input} onChange={setInput} />
      <RecommendationCard result={result} />
      <TestScenarioPicker onPick={handlePickScenario} />

      <section className="card">
        <h2>Scenario Self-check</h2>
        <ul>
          {scenarioChecks.map((check) => (
            <li key={check.id}>{check.pass ? '✅' : '❌'} {check.label}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
