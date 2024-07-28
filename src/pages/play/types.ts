export type Location = {
  slug: string;
  uid: string;
  x: number;
  y: number;
  exits: string[];
};

export type GameState = {
  currentNode: string;
  previousNode: string | null;
  stepsTaken: number;
  distanceTravelled: number;
};

export type HistoryEntry = {
  nodeUid: string;
  stepsTaken: number;
  distanceTravelled: number;
};
