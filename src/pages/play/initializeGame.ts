import { useGameStore } from "./gameStore";
import { Location } from './types';

export function initializeGame(locations: Location[], initialNodeUid: string) {
  const initialLocation = locations.find(loc => loc.uid === initialNodeUid);
  if (!initialLocation) throw new Error('Initial location not found');
  
  useGameStore.setState({
    locations: locations.reduce((acc, location) => {
      acc[location.uid] = location;
      return acc;
    }, {} as Record<string, Location>),
    currentNode: initialNodeUid,
    history: [
      {
        locationSlug: initialLocation.slug,
        stepsTaken: 0,
        distanceTravelled: 0,
      },
    ],
  });
}
