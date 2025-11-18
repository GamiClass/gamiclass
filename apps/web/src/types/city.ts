/**
 * Position in the city grid
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Direction for character movement
 */
export type Direction = 'up' | 'down' | 'left' | 'right';

/**
 * City tile types
 */
export type TileType = 
  | 'grass'
  | 'path'
  | 'building'
  | 'tree'
  | 'fountain'
  | 'flower';

/**
 * City tile definition
 */
export interface CityTile {
  type: TileType;
  walkable: boolean;
  emoji: string;
}

/**
 * City map structure
 */
export interface CityMap {
  width: number;
  height: number;
  tiles: TileType[][];
}

/**
 * Character state in the city
 */
export interface CharacterState {
  position: Position;
  studentId: string;
}
