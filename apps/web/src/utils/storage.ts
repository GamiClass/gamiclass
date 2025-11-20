import type { Student } from '@/types/skills';
import type { Position } from '@/types/city';

/**
 * Storage keys for localStorage
 */
const STORAGE_KEYS = {
  STUDENT: 'gamiclass_student',
  CHARACTER_POSITION: 'gamiclass_character_position',
} as const;

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Save student data to localStorage
 */
export function saveStudent(student: Student): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
  } catch (error) {
    console.error('Failed to save student data:', error);
  }
}

/**
 * Load student data from localStorage
 */
export function loadStudent(): Student | null {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENT);
    if (!data) return null;
    
    const student = JSON.parse(data) as Student;
    return student;
  } catch (error) {
    console.error('Failed to load student data:', error);
    return null;
  }
}

/**
 * Clear student data from localStorage
 */
export function clearStudent(): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.removeItem(STORAGE_KEYS.STUDENT);
  } catch (error) {
    console.error('Failed to clear student data:', error);
  }
}

/**
 * Save character position to localStorage
 */
export function saveCharacterPosition(position: Position): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.CHARACTER_POSITION, JSON.stringify(position));
  } catch (error) {
    console.error('Failed to save character position:', error);
  }
}

/**
 * Load character position from localStorage
 */
export function loadCharacterPosition(): Position | null {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHARACTER_POSITION);
    if (!data) return null;
    
    const position = JSON.parse(data) as Position;
    return position;
  } catch (error) {
    console.error('Failed to load character position:', error);
    return null;
  }
}

/**
 * Clear character position from localStorage
 */
export function clearCharacterPosition(): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.removeItem(STORAGE_KEYS.CHARACTER_POSITION);
  } catch (error) {
    console.error('Failed to clear character position:', error);
  }
}

/**
 * Clear all game data from localStorage
 */
export function clearAllGameData(): void {
  clearStudent();
  clearCharacterPosition();
}
