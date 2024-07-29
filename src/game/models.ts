// Base interfaces
interface WorldEntity {
  type: string;
}

interface InventoryItem extends WorldEntity {
  isConsumable: boolean;
  onUse?: () => void;
}

// Equipment slots
type EquipmentSlot = 'leftHand' | 'rightHand' | 'head' | 'chest' | 'legs' | 'feet';

// Character class
class Character implements WorldEntity {
  type: string = 'character';
  name: string;
  aliases: string[];
  hp: number;
  mana: number;
  manaCapacity: number;
  fatigue: number;
  inventory: InventoryItem[];
  equippedGear: Map<EquipmentSlot, InventoryItem>;

  gold: number;

  constructor(name: string, aliases: string[] = []) {
    this.name = name;
    this.aliases = aliases;
    this.hp = 100;
    this.mana = 50;
    this.manaCapacity = 50;
    this.fatigue = 0;
    this.inventory = [];
    this.equippedGear = new Map();
    this.gold = 0;
  }

  equip(item: InventoryItem, slot: EquipmentSlot): boolean {
    if (this.inventory.includes(item)) {
      this.equippedGear.set(slot, item);
      return true;
    }
    return false;
  }
}

// Player class
class Player extends Character {
  // Additional player-specific properties and methods can be added here
}

// NPC class
class NPC extends Character {
  tradableInventory: Map<InventoryItem, number>;

  constructor(name: string, aliases: string[] = []) {
    super(name, aliases);
    this.tradableInventory = new Map();
  }

  addTradableItem(item: InventoryItem, price: number): void {
    this.tradableInventory.set(item, price);
  }
}

// Enemy class
class Enemy extends Character {
  // Additional enemy-specific properties and methods can be added here
}

// PlayerMemory class
class PlayerMemory {
  entityHistory: Map<WorldEntity, string[]>;

  constructor() {
    this.entityHistory = new Map();
  }

  addFact(entity: WorldEntity, fact: string): void {
    if (!this.entityHistory.has(entity)) {
      this.entityHistory.set(entity, []);
    }
    this.entityHistory.get(entity)!.push(fact);
  }

  getFactsAbout(entity: WorldEntity): string[] {
    return this.entityHistory.get(entity) || [];
  }
}

// LocationNode class
class LocationNode {
  name: string;
  links: Map<LocationNode, string>;
  entities: WorldEntity[];

  constructor(name: string) {
    this.name = name;
    this.links = new Map();
    this.entities = [];
  }

  addLink(node: LocationNode, description: string): void {
    this.links.set(node, description);
  }

  addEntity(entity: WorldEntity): void {
    this.entities.push(entity);
  }

  removeEntity(entity: WorldEntity): boolean {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
      return true;
    }
    return false;
  }
}
