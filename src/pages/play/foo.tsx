import React, { useEffect } from 'react';
import { useGameStore } from './gameStore';
import { initializeGame } from './initializeGame';
import { data } from './data';

const Game: React.FC = () => {
  const {
    currentNode,
    stepsTaken,
    distanceTravelled,
    history,
    getCurrentLocation,
    getAvailableExits,
    move,
    goBack,
  } = useGameStore();

  useEffect(() => {
    // Initialize game with locations from your data
    const locations = data.world.locations;
    const initialNodeUid = data.ini.spawn_node;
    initializeGame(locations, initialNodeUid);
  }, []);

  const currentLocation = getCurrentLocation();
  const availableExits = getAvailableExits();

  if (!currentLocation) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {history.map((entry, index) => (
          <div className='border-2 border-black m-2 p-2' key={index}>
            {entry.locationSlug} (Steps: {entry.stepsTaken}, Distance:{' '}
            {entry.distanceTravelled.toFixed(2)})
          </div>
        ))}
      </div>

      <div className='border-2 border-black m-2 p-2'>
        <h1>Current Location: {currentLocation.slug}</h1>
        <p>Steps Taken: {stepsTaken}</p>
        <p>Distance Travelled: {distanceTravelled.toFixed(2)}</p>
        <h2>Available Exits:</h2>
        <ul>
          {availableExits.map(exit => (
            <li key={exit.uid}>
              <button onClick={() => move(exit.uid)}>▷ {exit.slug}</button>
            </li>
          ))}
        </ul>
        <button onClick={goBack} disabled={history.length <= 1}>
          ◁ Go Back
        </button>
      </div>
    </div>
  );
};

export default Game;
