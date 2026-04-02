import { DomeOutput } from '../types';

export function getRecheckTiming(domeRecommendation: DomeOutput[]): string[] {
  const checks = ['AM & PM'];

  if (domeRecommendation.includes('Remove dome until flagging occurs')) {
    checks.push('Monitor closely for first 60 minutes, until flagging occurs, or until dome is replaced.');
  }

  return checks;
}
