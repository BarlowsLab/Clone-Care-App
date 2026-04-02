import { CubeMoisture, DrybackPace, RootingStage, WateringOutput } from '../types';

type DrybackMap = Partial<Record<DrybackPace, WateringOutput>>;
type RootingMap = Partial<Record<RootingStage, WateringOutput | DrybackMap>>;

export const wateringMatrix: Record<CubeMoisture, RootingMap> = {
  'Wet to Touch': {
    None: 'No Irrigation',
    Callus: 'No Irrigation',
    'Initial Roots': 'No Irrigation',
    Rooted: 'No Irrigation',
  },
  'Dark & Damp Exterior / Wet Center': {
    None: 'No Irrigation',
    Callus: 'No Irrigation',
    'Initial Roots': 'No Irrigation',
    Rooted: {
      Slow: 'No Irrigation',
      Average: 'No Irrigation',
      Fast: 'No Irrigation',
      Any: 'No Irrigation',
    },
  },
  'Dry Exterior / Damp Center': {
    None: 'No Irrigation',
    Callus: {
      Slow: 'No Irrigation',
      Average: 'No Irrigation',
      Fast: '25% Tray Fill @ 1 Minute',
      Any: 'No Irrigation',
    },
    'Initial Roots': {
      Slow: 'No Irrigation',
      Average: 'No Irrigation',
      Fast: '25% Tray Fill @ 1 Minute',
      Any: 'No Irrigation',
    },
    Rooted: '50% Tray Fill @ 3 Minutes',
  },
  'Dry Exterior / Dry Center': {
    None: '25% Tray Fill @ 1 Minute',
    Callus: '25% Tray Fill @ 1 Minute',
    'Initial Roots': {
      Slow: '25% Tray Fill @ 1 Minute',
      Average: '25% Tray Fill @ 1 Minute',
      Fast: '50% Tray Fill @ 3 Minutes',
      Any: '25% Tray Fill @ 1 Minute',
    },
    Rooted: '50% Tray Fill @ 3 Minutes',
  },
};

export function resolveBaseWatering(
  cubeMoisture: CubeMoisture,
  rootingStage: RootingStage,
  drybackPace: DrybackPace,
): WateringOutput {
  const byCube = wateringMatrix[cubeMoisture];
  const byRooting = byCube[rootingStage];

  if (!byRooting) return 'No Irrigation';
  if (typeof byRooting === 'string') return byRooting;

  return byRooting[drybackPace] ?? byRooting.Any ?? 'No Irrigation';
}
