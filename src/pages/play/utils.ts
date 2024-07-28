import { Location } from './types';

export function calculateDistance(from: Location, to: Location): number {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return Math.sqrt(dx * dx + dy * dy);
}
