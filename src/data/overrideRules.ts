import { hasRoots, isStableLeaf } from './domeMatrix';
import { CareInput, DomeOutput, WateringOutput } from '../types';

export function applyWateringOverrides(input: CareInput, base: WateringOutput) {
  let next = base;
  const changes: string[] = [];

  const isScenario1 = input.cubeMoisture === 'Wet to Touch';
  const isScenario2 = input.cubeMoisture === 'Dark & Damp Exterior / Wet Center';
  const isScenario3 = input.cubeMoisture === 'Dry Exterior / Damp Center';
  const isScenario4 = input.cubeMoisture === 'Dry Exterior / Dry Center';

  if ((isScenario3 || isScenario4) && (input.leafTurgor === 'Soft' || input.leafTurgor === 'Collapsing')) {
    if (next === 'No Irrigation') {
      next = hasRoots(input.rootingStage) ? '50% Tray Fill @ 3 Minutes' : '25% Tray Fill @ 1 Minute';
      changes.push('Leaf turgor override increased watering urgency due to unstable canopy on dry cube scenario.');
    }
  }

  if (input.domeCondensation === 'Heavy' && !isScenario4 && !(input.rootingStage === 'Rooted' && (isScenario3 || isScenario4))) {
    if (next !== 'No Irrigation') {
      next = 'No Irrigation';
      changes.push('Heavy condensation override reduced irrigation likelihood because hydration risk was not mandatory.');
    }
  }

  const stressSignals = input.leafTurgor === 'Soft' || input.leafTurgor === 'Collapsing' || input.drybackPace === 'Fast';
  if (input.trayUniformity === 'Very Uneven' && hasRoots(input.rootingStage) && stressSignals && next === '25% Tray Fill @ 1 Minute') {
    next = '50% Tray Fill @ 3 Minutes';
    changes.push('Tray uniformity override escalated from 25% to 50% due to rooted uneven tray under stress signals.');
  }

  if (isScenario1) next = 'No Irrigation';
  if (isScenario4 && next === 'No Irrigation') next = hasRoots(input.rootingStage) ? '50% Tray Fill @ 3 Minutes' : '25% Tray Fill @ 1 Minute';
  if ((isScenario3 || isScenario4) && input.rootingStage === 'Rooted') next = '50% Tray Fill @ 3 Minutes';
  if (isScenario1 || isScenario2) {
    if (input.cubeMoisture !== 'Dry Exterior / Damp Center' && input.cubeMoisture !== 'Dry Exterior / Dry Center') {
      if (input.leafTurgor === 'Soft' || input.leafTurgor === 'Collapsing') {
        if (next !== base) next = base;
      }
    }
  }

  return { recommendation: next, changes };
}

function unique(outputs: DomeOutput[]): DomeOutput[] {
  return [...new Set(outputs)];
}

export function applyDomeOverrides(input: CareInput, base: DomeOutput[]) {
  let next = [...base];
  const changes: string[] = [];

  if ((input.rootingStage === 'None' || input.rootingStage === 'Callus') && next.includes('Remove dome until flagging occurs')) {
    next = [input.leafTurgor === 'Collapsing' ? 'Burp 15 Minutes' : 'Burp 30 Minutes'];
    changes.push('Rooting stage override resisted aggressive dome removal for unrooted material.');
  }

  const wetScenario = input.cubeMoisture === 'Wet to Touch' || input.cubeMoisture === 'Dark & Damp Exterior / Wet Center';
  const dryScenario = input.cubeMoisture === 'Dry Exterior / Damp Center' || input.cubeMoisture === 'Dry Exterior / Dry Center';

  if (wetScenario && input.domeCondensation === 'Heavy' && input.drybackPace === 'Slow') {
    if (!next.includes('Vents 50%') && !next.includes('Vents 100%')) {
      next.push(input.daySinceSticking >= 6 ? 'Vents 100%' : 'Vents 50%');
    }
    if (input.daySinceSticking >= 6 && !next.includes('Burp 30 Minutes')) {
      next = next.filter((v) => v !== 'Burp 15 Minutes');
      next.push('Burp 30 Minutes');
    }
    changes.push('Cube moisture override reinforced ventilation and stagnation correction for wet/slow conditions.');
  }

  if (dryScenario && (input.domeCondensation === 'Light' || input.domeCondensation === 'None') && isStableLeaf(input.leafTurgor)) {
    if (input.daySinceSticking >= 10) {
      next = ['Remove dome until flagging occurs'];
      changes.push('Dry cube + light condensation override supported dome removal progression.');
    }
  }

  if (input.drybackPace === 'Fast' && !isStableLeaf(input.leafTurgor) && next.includes('Remove dome until flagging occurs')) {
    next = ['Burp 30 Minutes'];
    changes.push('Dryback override reduced dome-removal aggression due to fast dryback with unstable turgor.');
  }

  return { recommendation: unique(next), changes };
}
