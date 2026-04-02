import { CareInput, DomeCondensation, DomeOutput, LeafTurgor, RootingStage } from '../types';

export type DayRangeKey = 'day1to2' | 'day3to5' | 'day6to9' | 'day10to14';

export const domeSopBase: Record<DayRangeKey, DomeOutput[]> = {
  day1to2: ['Wipe Dome Dry & Replace'],
  day3to5: ['Wipe Dome Dry & Replace', 'Vents 50%'],
  day6to9: ['Vents 100%', 'Burp 15 Minutes'],
  day10to14: ['Remove dome until flagging occurs'],
};

export function getDayRangeKey(daySinceSticking: number): DayRangeKey {
  if (daySinceSticking <= 2) return 'day1to2';
  if (daySinceSticking <= 5) return 'day3to5';
  if (daySinceSticking <= 9) return 'day6to9';
  return 'day10to14';
}

const stableTurgor: LeafTurgor[] = ['Firm', 'Slightly Soft'];

const day6to9BurpMatrix: Record<DomeCondensation, Partial<Record<LeafTurgor, DomeOutput>>> = {
  Heavy: {
    Firm: 'Burp 30 Minutes',
    'Slightly Soft': 'Burp 30 Minutes',
    Soft: 'Burp 15 Minutes',
    Collapsing: 'Burp 15 Minutes',
  },
  Moderate: {
    Firm: 'Burp 15 Minutes',
    'Slightly Soft': 'Burp 15 Minutes',
    Soft: 'Burp 15 Minutes',
    Collapsing: 'Burp 15 Minutes',
  },
  Light: {
    Firm: 'Burp 15 Minutes',
    'Slightly Soft': 'Burp 15 Minutes',
    Soft: 'Burp 15 Minutes',
    Collapsing: 'Burp 15 Minutes',
  },
  None: {
    Firm: 'Burp 15 Minutes',
    'Slightly Soft': 'Burp 15 Minutes',
    Soft: 'Burp 15 Minutes',
    Collapsing: 'Burp 15 Minutes',
  },
};

export function resolveBaseDome(input: CareInput): DomeOutput[] {
  const range = getDayRangeKey(input.daySinceSticking);

  if (range === 'day1to2') return [...domeSopBase.day1to2];
  if (range === 'day3to5') return [...domeSopBase.day3to5];

  if (range === 'day6to9') {
    const burp = day6to9BurpMatrix[input.domeCondensation][input.leafTurgor] ?? 'Burp 15 Minutes';

    if ((input.domeCondensation === 'Light' || input.domeCondensation === 'None') &&
      input.leafTurgor === 'Firm' &&
      (input.rootingStage === 'Initial Roots' || input.rootingStage === 'Rooted')) {
      return ['Vents 100%', 'Burp 30 Minutes'];
    }

    return ['Vents 100%', burp];
  }

  const isStable = stableTurgor.includes(input.leafTurgor);
  if (isStable) return ['Remove dome until flagging occurs'];

  if (input.rootingStage === 'None' || input.rootingStage === 'Callus') {
    return ['Burp 15 Minutes'];
  }

  return ['Burp 30 Minutes'];
}

export function isStableLeaf(turgor: LeafTurgor): boolean {
  return stableTurgor.includes(turgor);
}

export function hasRoots(rootingStage: RootingStage): boolean {
  return rootingStage === 'Initial Roots' || rootingStage === 'Rooted';
}
