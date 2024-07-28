'use client';

import React, { useState, useEffect } from 'react';
import { GameLogic } from './gameLogic';
import { data } from './data';
import { HistoryEntry } from './types';

const Game: React.FC = () => {
  const [gameLogic, setGameLogic] = useState<GameLogic | null>(null);

  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (!gameLogic) return;

    const historyEntry = {
      nodeUid: gameLogic.getCurrentLocation().uid,
      stepsTaken: gameLogic.getGameState().stepsTaken,
      distanceTravelled: gameLogic.getGameState().distanceTravelled,
    };

    // Initialize game logic with locations from your data
    const locations = data.world.locations;
    const initialNodeUid = data.ini.spawn_node;
    setGameLogic(new GameLogic(locations, initialNodeUid));

    // Add history entry
    setHistory([...history, historyEntry]);
  }, []);

  if (!gameLogic) return <div>Loading...</div>;

  const currentLocation = gameLogic.getCurrentLocation();
  const availableExits = gameLogic.getAvailableExits();
  const gameState = gameLogic.getGameState();

  return (
    <div>
      <div>
        {history.map(entry => (
          <div key={entry.nodeUid} className='border-2 border-black m-2 p-2'>
            <p>Node: {entry.nodeUid}</p>
            <p>Steps Taken: {entry.stepsTaken}</p>
            <p>Distance Travelled: {entry.distanceTravelled.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className='border-2 border-black m-2 p-2'>
        <h1>Current Location: {currentLocation.slug}</h1>
        <p>Steps Taken: {gameState.stepsTaken}</p>
        <p>Distance Travelled: {gameState.distanceTravelled.toFixed(2)}</p>
        <h2>Available Exits:</h2>
        <ul>
          {availableExits.map(exit => (
            <li key={exit.uid}>
              <button onClick={() => gameLogic.move(exit.uid)}>{exit.slug}</button>
            </li>
          ))}
        </ul>
        <button onClick={() => gameLogic.goBack()} disabled={!gameState.previousNode}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Game;
