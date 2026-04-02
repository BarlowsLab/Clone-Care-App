export const CUBE_MOISTURE_OPTIONS = [
  'Wet to Touch',
  'Dark & Damp Exterior / Wet Center',
  'Dry Exterior / Damp Center',
  'Dry Exterior / Dry Center',
] as const;

export const ROOTING_STAGE_OPTIONS = ['None', 'Callus', 'Initial Roots', 'Rooted'] as const;
export const DRYBACK_OPTIONS = ['Any', 'Slow', 'Average', 'Fast'] as const;
export const LEAF_TURGOR_OPTIONS = ['Firm', 'Slightly Soft', 'Soft', 'Collapsing'] as const;
export const DOME_CONDENSATION_OPTIONS = ['Heavy', 'Moderate', 'Light', 'None'] as const;
export const TRAY_UNIFORMITY_OPTIONS = ['Even', 'Slightly Uneven', 'Very Uneven'] as const;

export const WATERING_OUTPUTS = [
  'No Irrigation',
  '25% Tray Fill @ 1 Minute',
  '50% Tray Fill @ 3 Minutes',
] as const;

export const DOME_OUTPUTS = [
  'Wipe Dome Dry & Replace',
  'Vents 50%',
  'Vents 100%',
  'Burp 15 Minutes',
  'Burp 30 Minutes',
  'Remove dome until flagging occurs',
] as const;

export type CubeMoisture = (typeof CUBE_MOISTURE_OPTIONS)[number];
export type RootingStage = (typeof ROOTING_STAGE_OPTIONS)[number];
export type DrybackPace = (typeof DRYBACK_OPTIONS)[number];
export type LeafTurgor = (typeof LEAF_TURGOR_OPTIONS)[number];
export type DomeCondensation = (typeof DOME_CONDENSATION_OPTIONS)[number];
export type TrayUniformity = (typeof TRAY_UNIFORMITY_OPTIONS)[number];

export type WateringOutput = (typeof WATERING_OUTPUTS)[number];
export type DomeOutput = (typeof DOME_OUTPUTS)[number];

export interface CareInput {
  daySinceSticking: number;
  cubeMoisture: CubeMoisture;
  rootingStage: RootingStage;
  drybackPace: DrybackPace;
  leafTurgor: LeafTurgor;
  domeCondensation: DomeCondensation;
  trayUniformity: TrayUniformity;
}

export interface RecommendationResult {
  wateringRecommendation: WateringOutput;
  domeRecommendation: DomeOutput[];
  why: string;
  riskFlags: string[];
  recheckTiming: string[];
  changes: string[];
}
