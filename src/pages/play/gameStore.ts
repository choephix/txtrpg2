import create from 'zustand';
import { HistoryEntry, Location } from './types';
import { calculateDistance } from './utils';

interface GameState {
  currentNode: string;
  previousNode: string | null;
  stepsTaken: number;
  distanceTravelled: number;
  locations: Record<string, Location>;
  history: HistoryEntry[];
  getCurrentLocation: () => Location;
  getAvailableExits: () => Location[];
  move: (targetNodeUid: string) => boolean;
  goBack: () => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentNode: '',
  previousNode: null,
  stepsTaken: 0,
  distanceTravelled: 0,
  locations: {},
  history: [],

  getCurrentLocation: () => {
    const { currentNode, locations } = get();
    return locations[currentNode];
  },

  getAvailableExits: () => {
    const { getCurrentLocation, locations } = get();
    const currentLocation = getCurrentLocation();
    return currentLocation?.exits?.map(exitUid => locations[exitUid]) || [];
  },

  move: (targetNodeUid: string) => {
    const { currentNode, locations, stepsTaken, distanceTravelled, history } = get();
    const currentLocation = locations[currentNode];

    if (!currentLocation.exits.includes(targetNodeUid)) {
      return false; // Invalid move
    }

    const targetLocation = locations[targetNodeUid];
    const distance = calculateDistance(currentLocation, targetLocation);

    set(state => {
      const newStepsTaken = state.stepsTaken + 1;
      const newDistanceTravelled = state.distanceTravelled + distance;
      const newHistoryEntry: HistoryEntry = {
        locationSlug: targetLocation.slug,
        stepsTaken: newStepsTaken,
        distanceTravelled: newDistanceTravelled,
      };

      return {
        currentNode: targetNodeUid,
        previousNode: state.currentNode,
        stepsTaken: newStepsTaken,
        distanceTravelled: newDistanceTravelled,
        history: [...state.history, newHistoryEntry],
      };
    });

    return true;
  },

  goBack: () => {
    const { previousNode, move, history } = get();
    if (!previousNode || history.length <= 1) {
      return false; // Can't go back
    }

    const result = move(previousNode);
    return result;
  },
}));
