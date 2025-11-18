import type { CityMap, CityTile, TileType } from '@/types/city';

/**
 * City tile definitions with emojis and walkability
 */
export const CITY_TILES: Record<TileType, CityTile> = {
  grass: {
    type: 'grass',
    walkable: true,
    emoji: '🌱',
  },
  path: {
    type: 'path',
    walkable: true,
    emoji: '⬜',
  },
  building: {
    type: 'building',
    walkable: false,
    emoji: '🏠',
  },
  tree: {
    type: 'tree',
    walkable: false,
    emoji: '🌳',
  },
  fountain: {
    type: 'fountain',
    walkable: false,
    emoji: '⛲',
  },
  flower: {
    type: 'flower',
    walkable: true,
    emoji: '🌸',
  },
};

/**
 * Default peaceful city map
 * A small, peaceful town with buildings, trees, and a central fountain
 */
export const DEFAULT_CITY_MAP: CityMap = {
  width: 12,
  height: 10,
  tiles: [
    // Row 0
    ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
    // Row 1
    ['tree', 'grass', 'path', 'path', 'building', 'tree', 'tree', 'building', 'path', 'path', 'grass', 'tree'],
    // Row 2
    ['tree', 'grass', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'flower', 'tree'],
    // Row 3
    ['tree', 'path', 'path', 'grass', 'tree', 'grass', 'grass', 'tree', 'grass', 'path', 'path', 'tree'],
    // Row 4
    ['tree', 'building', 'grass', 'grass', 'grass', 'path', 'path', 'grass', 'grass', 'grass', 'building', 'tree'],
    // Row 5
    ['tree', 'grass', 'grass', 'path', 'path', 'fountain', 'fountain', 'path', 'path', 'grass', 'grass', 'tree'],
    // Row 6
    ['tree', 'building', 'grass', 'grass', 'grass', 'path', 'path', 'grass', 'grass', 'grass', 'building', 'tree'],
    // Row 7
    ['tree', 'path', 'path', 'grass', 'tree', 'grass', 'grass', 'tree', 'grass', 'path', 'path', 'tree'],
    // Row 8
    ['tree', 'flower', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'grass', 'tree'],
    // Row 9
    ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
  ],
};

/**
 * Get tile information for a specific position
 */
export function getTileAt(map: CityMap, x: number, y: number): CityTile | null {
  if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
    return null;
  }
  const tileType = map.tiles[y][x];
  return CITY_TILES[tileType];
}

/**
 * Check if a position is walkable
 */
export function isWalkable(map: CityMap, x: number, y: number): boolean {
  const tile = getTileAt(map, x, y);
  return tile !== null && tile.walkable;
}

/**
 * Get the default starting position for a character
 */
export function getDefaultStartPosition(): { x: number; y: number } {
  return { x: 5, y: 5 }; // Near the fountain in the center
}
