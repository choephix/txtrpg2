// Factory function to create a test game world
function createTestGameWorld(): {
  startLocation: LocationNode;
  allLocations: LocationNode[];
  allNPCs: NPC[];
  allEnemies: Enemy[];
} {
  // Create locations
  const spawnBath = new LocationNode('The Spawn Bath');
  const readyRoom = new LocationNode('Ready Room');
  const corridor1 = new LocationNode('Corridor - Section 1');
  const corridor2 = new LocationNode('Corridor - Section 2');
  const corridor3 = new LocationNode('Corridor - Section 3');
  const battleArena = new LocationNode('Battle Arena');

  // Create NPCs (merchants)
  const weaponsmith = new NPC('Gruff the Weaponsmith', ['Gruff', 'Smith']);
  weaponsmith.gold = 1000;
  const armorsmith = new NPC('Shiny Lori', ['Lori', 'Armor Lady']);
  armorsmith.gold = 800;
  const potionSeller = new NPC('Fizz the Alchemist', ['Fizz', 'Potion Guy']);
  potionSeller.gold = 500;

  // Create enemies
  const goblin1 = new Enemy('Sneaky Goblin');
  const goblin2 = new Enemy('Fierce Goblin');
  const orc = new Enemy('Burly Orc');
  const dragon = new Enemy('Inferno the Dragon');

  // Add NPCs to the ready room
  readyRoom.addEntity(weaponsmith);
  readyRoom.addEntity(armorsmith);
  readyRoom.addEntity(potionSeller);

  // Add enemies to corridor sections and battle arena
  corridor2.addEntity(goblin1);
  corridor3.addEntity(goblin2);
  corridor3.addEntity(orc);
  battleArena.addEntity(dragon);

  // Link locations
  spawnBath.addLink(readyRoom, 'A sturdy wooden door');
  readyRoom.addLink(corridor1, 'A large iron door');
  corridor1.addLink(corridor2, 'Continue down the corridor');
  corridor2.addLink(corridor3, 'The corridor stretches on');
  corridor3.addLink(battleArena, 'A massive gate with dragon motifs');

  // Add backward links for convenience
  readyRoom.addLink(spawnBath, 'Return to the Spawn Bath');
  corridor1.addLink(readyRoom, 'Go back to the Ready Room');
  corridor2.addLink(corridor1, 'Turn back');
  corridor3.addLink(corridor2, 'Retreat');
  battleArena.addLink(corridor3, 'Flee from the dragon');

  return {
    startLocation: spawnBath,
    allLocations: [spawnBath, readyRoom, corridor1, corridor2, corridor3, battleArena],
    allNPCs: [weaponsmith, armorsmith, potionSeller],
    allEnemies: [goblin1, goblin2, orc, dragon],
  };
}
