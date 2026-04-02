import { resolveBaseWatering } from '../data/wateringMatrix';
import { resolveBaseDome } from '../data/domeMatrix';
import { applyDomeOverrides, applyWateringOverrides } from '../data/overrideRules';
import { getRecheckTiming } from '../data/recheckRules';
import {
  CareInput,
  DOME_OUTPUTS,
  DomeOutput,
  RecommendationResult,
  WATERING_OUTPUTS,
  WateringOutput,
} from '../types';
import { formatRecommendationWhy } from './formatRecommendation';

function validateWateringOutput(output: WateringOutput): WateringOutput {
  if (!WATERING_OUTPUTS.includes(output)) {
    throw new Error(`Invalid watering output: ${output}`);
  }
  return output;
}

function validateDomeOutputs(outputs: DomeOutput[]): DomeOutput[] {
  outputs.forEach((output) => {
    if (!DOME_OUTPUTS.includes(output)) {
      throw new Error(`Invalid dome output: ${output}`);
    }
  });
  return outputs;
}

export function generateRecommendation(input: CareInput): RecommendationResult {
  const baseWatering = resolveBaseWatering(input.cubeMoisture, input.rootingStage, input.drybackPace);
  const wateringResult = applyWateringOverrides(input, baseWatering);

  const baseDome = resolveBaseDome(input);
  const domeResult = applyDomeOverrides(input, baseDome);

  const wateringRecommendation = validateWateringOutput(wateringResult.recommendation);
  const domeRecommendation = validateDomeOutputs(domeResult.recommendation);

  const changes = [...wateringResult.changes, ...domeResult.changes];

  const riskFlags = new Set<string>();
  if (input.cubeMoisture === 'Wet to Touch' || input.cubeMoisture === 'Dark & Damp Exterior / Wet Center') {
    riskFlags.add('Over-saturated / low oxygen');
    riskFlags.add('Hidden internal moisture');
  }
  if (input.domeCondensation === 'Heavy') riskFlags.add('Stagnant dome');
  if (input.cubeMoisture === 'Dry Exterior / Dry Center') riskFlags.add('Over-dry / over-shot dryback');
  if (input.trayUniformity === 'Very Uneven') riskFlags.add('Uneven tray');
  if (domeRecommendation.includes('Remove dome until flagging occurs') && (input.leafTurgor === 'Soft' || input.leafTurgor === 'Collapsing')) {
    riskFlags.add('Hardening-off instability');
  }

  return {
    wateringRecommendation,
    domeRecommendation,
    why: formatRecommendationWhy(input, baseWatering, wateringRecommendation, baseDome, domeRecommendation, changes),
    riskFlags: [...riskFlags],
    recheckTiming: getRecheckTiming(domeRecommendation),
    changes,
  };
}
