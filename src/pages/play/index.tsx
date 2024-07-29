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
    <div className='flex justify-center items-start min-h-screen bg-[#d1d6df]'>
      <div className='max-w-2xl w-full p-4'>
        <div>
          {history.map((entry, index) => (
            <Card key={index}>
              {entry.locationSlug} (Steps: {entry.stepsTaken}, Distance:{' '}
              {entry.distanceTravelled.toFixed(2)})
            </Card>
          ))}
        </div>

        <Card>
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
        </Card>
      </div>
    </div>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className='m-2 p-2 rounded-lg bg-[#ffffff] shadow-lg shadow-black'>{children}</div>;
};

export default Game;
