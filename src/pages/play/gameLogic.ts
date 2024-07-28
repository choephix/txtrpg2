import { GameState } from './types';
import { calculateDistance } from './utils';

import { Location } from './types';

export class GameLogic {
  private locations: Record<string, Location>;
  private gameState: GameState;

  constructor(locations: Location[], initialNodeUid: string) {
    this.locations = locations.reduce((acc, location) => {
      acc[location.uid] = location;
      return acc;
    }, {} as Record<string, Location>);

    this.gameState = {
      currentNode: initialNodeUid,
      previousNode: null,
      stepsTaken: 0,
      distanceTravelled: 0,
    };
  }

  getCurrentLocation(): Location {
    return this.locations[this.gameState.currentNode];
  }

  getAvailableExits(): Location[] {
    const currentLocation = this.getCurrentLocation();
    return currentLocation.exits.map(exitUid => this.locations[exitUid]);
  }

  move(targetNodeUid: string): boolean {
    const currentLocation = this.getCurrentLocation();
    if (!currentLocation.exits.includes(targetNodeUid)) {
      return false; // Invalid move
    }

    const targetLocation = this.locations[targetNodeUid];
    const distance = calculateDistance(currentLocation, targetLocation);

    this.gameState = {
      currentNode: targetNodeUid,
      previousNode: this.gameState.currentNode,
      stepsTaken: this.gameState.stepsTaken + 1,
      distanceTravelled: this.gameState.distanceTravelled + distance,
    };

    return true;
  }

  goBack(): boolean {
    if (!this.gameState.previousNode) {
      return false; // Can't go back
    }

    return this.move(this.gameState.previousNode);
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }
}
