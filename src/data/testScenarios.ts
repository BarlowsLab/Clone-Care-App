import { CareInput } from '../types';

export interface SeedScenario {
  id: string;
  label: string;
  input: CareInput;
  expectedWatering?: string;
  expectedDomeIncludes?: string[];
}

export const seedScenarios: SeedScenario[] = [
  {
    id: 's1',
    label: '1) Wet to Touch + any stage => No Irrigation',
    input: {
      daySinceSticking: 2,
      cubeMoisture: 'Wet to Touch',
      rootingStage: 'Callus',
      drybackPace: 'Fast',
      leafTurgor: 'Soft',
      domeCondensation: 'Heavy',
      trayUniformity: 'Even',
    },
    expectedWatering: 'No Irrigation',
  },
  {
    id: 's2',
    label: '2) Dry/Dry + Initial Roots + Fast => 50% Tray Fill @ 3 Minutes',
    input: {
      daySinceSticking: 7,
      cubeMoisture: 'Dry Exterior / Dry Center',
      rootingStage: 'Initial Roots',
      drybackPace: 'Fast',
      leafTurgor: 'Firm',
      domeCondensation: 'Light',
      trayUniformity: 'Slightly Uneven',
    },
    expectedWatering: '50% Tray Fill @ 3 Minutes',
  },
  {
    id: 's3',
    label: '3) Dry/Damp + Rooted => 50% Tray Fill @ 3 Minutes',
    input: {
      daySinceSticking: 8,
      cubeMoisture: 'Dry Exterior / Damp Center',
      rootingStage: 'Rooted',
      drybackPace: 'Slow',
      leafTurgor: 'Firm',
      domeCondensation: 'Moderate',
      trayUniformity: 'Even',
    },
    expectedWatering: '50% Tray Fill @ 3 Minutes',
  },
  {
    id: 's4',
    label: '4) Day 6-9 + Heavy condensation + Firm => Burp 30 + Vents 100',
    input: {
      daySinceSticking: 6,
      cubeMoisture: 'Dark & Damp Exterior / Wet Center',
      rootingStage: 'Initial Roots',
      drybackPace: 'Slow',
      leafTurgor: 'Firm',
      domeCondensation: 'Heavy',
      trayUniformity: 'Even',
    },
    expectedDomeIncludes: ['Burp 30 Minutes', 'Vents 100%'],
  },
  {
    id: 's5',
    label: '5) Day 6-9 + Heavy condensation + Soft => Burp 15 + Vents 100',
    input: {
      daySinceSticking: 7,
      cubeMoisture: 'Dark & Damp Exterior / Wet Center',
      rootingStage: 'Initial Roots',
      drybackPace: 'Average',
      leafTurgor: 'Soft',
      domeCondensation: 'Heavy',
      trayUniformity: 'Even',
    },
    expectedDomeIncludes: ['Burp 15 Minutes', 'Vents 100%'],
  },
  {
    id: 's6',
    label: '6) Day 10-14 + Rooted + Firm => Remove dome until flagging occurs',
    input: {
      daySinceSticking: 12,
      cubeMoisture: 'Dry Exterior / Damp Center',
      rootingStage: 'Rooted',
      drybackPace: 'Average',
      leafTurgor: 'Firm',
      domeCondensation: 'Light',
      trayUniformity: 'Even',
    },
    expectedDomeIncludes: ['Remove dome until flagging occurs'],
  },
  {
    id: 's7',
    label: '7) Day 3-5 + Heavy condensation + wet cube => Wipe + Vents 50',
    input: {
      daySinceSticking: 4,
      cubeMoisture: 'Wet to Touch',
      rootingStage: 'None',
      drybackPace: 'Slow',
      leafTurgor: 'Slightly Soft',
      domeCondensation: 'Heavy',
      trayUniformity: 'Even',
    },
    expectedDomeIncludes: ['Wipe Dome Dry & Replace', 'Vents 50%'],
  },
  {
    id: 's8',
    label: '8) Scenario 4 must never resolve to No Irrigation',
    input: {
      daySinceSticking: 5,
      cubeMoisture: 'Dry Exterior / Dry Center',
      rootingStage: 'Callus',
      drybackPace: 'Slow',
      leafTurgor: 'Firm',
      domeCondensation: 'Heavy',
      trayUniformity: 'Even',
    },
    expectedWatering: '25% Tray Fill @ 1 Minute',
  },
];
