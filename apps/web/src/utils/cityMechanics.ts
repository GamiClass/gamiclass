import type { Position, Direction, CityMap } from '@/types/city';
import { isWalkable } from '@/data/city';

/**
 * Calculate new position based on direction
 */
export function getNextPosition(
  currentPosition: Position,
  direction: Direction
): Position {
  const { x, y } = currentPosition;

  switch (direction) {
    case 'up':
      return { x, y: y - 1 };
    case 'down':
      return { x, y: y + 1 };
    case 'left':
      return { x: x - 1, y };
    case 'right':
      return { x: x + 1, y };
    default:
      return currentPosition;
  }
}

/**
 * Move character if the target position is valid and walkable
 */
export function moveCharacter(
  currentPosition: Position,
  direction: Direction,
  map: CityMap
): Position {
  const nextPosition = getNextPosition(currentPosition, direction);

  // Check if the next position is walkable
  if (isWalkable(map, nextPosition.x, nextPosition.y)) {
    return nextPosition;
  }

  // If not walkable, stay in current position
  return currentPosition;
}

/**
 * Check if two positions are the same
 */
export function isSamePosition(pos1: Position, pos2: Position): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}
