# City System - Character Movement and Exploration

## Overview

The City System (Hệ Thống Thành Phố) is a peaceful city environment where students can move their characters around and explore. This feature complements the existing Skill Tree system by providing an interactive space for character interaction.

## Features

### 🏙️ Peaceful City Map

A 12x10 grid-based city featuring:
- **Trees (🌳)**: Border trees creating a natural boundary
- **Buildings (🏠)**: Houses scattered throughout the city
- **Fountain (⛲)**: Central landmark at the heart of the city
- **Paths (⬜)**: White walkable paths connecting different areas
- **Grass (🌱)**: Green spaces where characters can walk
- **Flowers (🌸)**: Decorative elements that are walkable

### 🎮 Movement Controls

Players can move their character using:
- **Keyboard Controls**: Arrow keys (↑↓←→) or WASD keys
- **Button Controls**: On-screen directional buttons for mobile/accessibility
- **Position Tracking**: Real-time display of character coordinates (x, y)

### 🚧 Collision Detection

The system prevents movement into non-walkable tiles:
- **Walkable**: Grass, Paths, Flowers
- **Non-walkable**: Buildings, Trees, Fountain

### 🔄 Navigation

Seamless transition between:
- **Skill Tree View**: Purchase skills and manage abilities
- **City View**: Explore the peaceful city environment

## Technical Architecture

### Type System

Location: `src/types/city.ts`

```typescript
interface Position {
  x: number;
  y: number;
}

type Direction = 'up' | 'down' | 'left' | 'right';

type TileType = 'grass' | 'path' | 'building' | 'tree' | 'fountain' | 'flower';

interface CityTile {
  type: TileType;
  walkable: boolean;
  emoji: string;
}

interface CityMap {
  width: number;
  height: number;
  tiles: TileType[][];
}

interface CharacterState {
  position: Position;
  studentId: string;
}
```

### Data Layer

Location: `src/data/city.ts`

- **CITY_TILES**: Dictionary mapping tile types to their properties
- **DEFAULT_CITY_MAP**: 12x10 city layout with tile positions
- **getTileAt()**: Get tile information at specific coordinates
- **isWalkable()**: Check if a position is walkable
- **getDefaultStartPosition()**: Return starting position (center of city)

### Business Logic

Location: `src/utils/cityMechanics.ts`

- **getNextPosition()**: Calculate new position based on direction
- **moveCharacter()**: Move character if target position is valid
- **isSamePosition()**: Compare two positions

### UI Components

Location: `src/components/City.tsx`

- **City Component**: Main container for city view
  - City map grid visualization
  - Character position overlay
  - Movement controls (buttons + keyboard)
  - Navigation to Skill Tree
  - Instructions and legend

## Usage

### Basic Movement

1. Navigate to the City view by clicking "🏙️ Thành Phố" button
2. Use keyboard or buttons to move your character
3. Character starts at position (5, 5) near the fountain
4. Position updates in real-time in the header

### Integration with Student System

The city character uses the existing `Student` interface:
- Student's avatar emoji is displayed as the character
- Student's name shown in the header
- Points balance visible while exploring
- Character state persists during view switches

## City Map Layout

```
🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳  (Border trees)
🌳 🌱 ⬜ ⬜ 🏠 🌳 🌳 🏠 ⬜ ⬜ 🌱 🌳
🌳 🌱 ⬜ 🌱 🌱 🌱 🌱 🌱 🌱 ⬜ 🌸 🌳
🌳 ⬜ ⬜ 🌱 🌳 🌱 🌱 🌳 🌱 ⬜ ⬜ 🌳
🌳 🏠 🌱 🌱 🌱 ⬜ ⬜ 🌱 🌱 🌱 🏠 🌳
🌳 🌱 🌱 ⬜ ⬜ ⛲ ⛲ ⬜ ⬜ 🌱 🌱 🌳  (Central fountain)
🌳 🏠 🌱 🌱 🌱 ⬜ ⬜ 🌱 🌱 🌱 🏠 🌳
🌳 ⬜ ⬜ 🌱 🌳 🌱 🌱 🌳 🌱 ⬜ ⬜ 🌳
🌳 🌸 ⬜ 🌱 🌱 🌱 🌱 🌱 🌱 ⬜ 🌱 🌳
🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳  (Border trees)
```

## Future Enhancements

Potential additions to the city system:
- **Multiplayer**: See other students' characters in real-time
- **Interactions**: Talk to NPCs, enter buildings, collect items
- **Quests**: City-based missions and challenges
- **Events**: Special events that occur at specific locations
- **Customization**: Unlock new city areas as rewards
- **Mini-games**: Interactive elements in different locations
- **Day/Night Cycle**: Visual changes based on time
- **Achievements**: Exploration-based achievements

## Accessibility

The city system includes multiple input methods:
- Keyboard navigation for desktop users
- Button controls for touch/mobile devices
- Visual feedback for character position
- Clear legend explaining map symbols
- High contrast emoji for tile visibility

## Performance

- Lightweight grid rendering
- Efficient position updates
- No external API calls
- Local state management
- Fast collision detection

## Notes

- City state (character position) is local to the browser session
- Position resets to default (5, 5) when reloading the page
- No backend integration required for basic functionality
- Compatible with existing skill system without modifications
