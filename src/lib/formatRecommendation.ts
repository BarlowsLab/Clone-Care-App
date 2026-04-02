import { CareInput, DomeOutput, WateringOutput } from '../types';

export function formatRecommendationWhy(
  input: CareInput,
  baseWatering: WateringOutput,
  finalWatering: WateringOutput,
  baseDome: DomeOutput[],
  finalDome: DomeOutput[],
  changes: string[],
): string {
  const overrideSentence =
    changes.length > 0
      ? `Overrides applied: ${changes.join(' ')}`
      : 'No overrides changed the base matrix recommendations.';

  return [
    `Cube moisture is "${input.cubeMoisture}" with rooting stage "${input.rootingStage}" and dryback pace "${input.drybackPace}".`,
    `Base watering resolved to "${baseWatering}" and final watering is "${finalWatering}".`,
    `Dome condition is "${input.domeCondensation}" with leaf turgor "${input.leafTurgor}" on day ${input.daySinceSticking}.`,
    `Base dome recommendation was "${baseDome.join(' + ')}" and final dome recommendation is "${finalDome.join(' + ')}".`,
    overrideSentence,
  ].join(' ');
}
