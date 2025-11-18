# The Power Ladder - Skill Tree System

## Overview

The Power Ladder (Thang Sức Mạnh) is a gamification system that allows students to purchase skills and abilities using points. Points serve dual purposes: as currency for purchasing skills and as "HP" (health points) for survival in the game.

## Skill Tiers

### Basic Tier (Cấp Độ Khởi Động)

These are introductory skills designed to help students become familiar with spending points:

1. **Biến Hình (Change Avatar)** - 20 points
   - Allows students to change their avatar from the library
   - Purely cosmetic enhancement

2. **Hộp Bí Ẩn (Mystery Box)** - 50 points
   - Gacha mechanic: randomly rewards 1-20 points
   - Can result in profit or loss
   - Adds element of risk and reward

3. **Triệu Hồi Pet (Summon Pet)** - 100 points
   - Unlocks a pet companion that follows the avatar
   - Provides passive buff: +1.5% to all future points earned
   - Permanent upgrade

### PvP Tier (Cấp Độ Chiến Đấu)

Advanced skills that enable player-vs-player interactions:

1. **Đạo Chích (Steal Points)** - 200 points
   - Allows stealing points from another student
   - Introduces competitive gameplay
   - Creates strategic decision-making

## Technical Architecture

### Type System
- Full TypeScript type definitions in `src/types/skills.ts`
- Type-safe skill variants and student data structures
- Result types for operations (purchase, PvP actions)

### Data Layer
- Skill definitions in `src/data/skills.ts`
- Helper functions for skill queries and affordability checks

### Business Logic
- Skill mechanics in `src/utils/skillMechanics.ts`
- Purchase validation and execution
- Gacha random reward calculation
- Point buff application
- PvP steal mechanics

### UI Components
- `SkillCard`: Displays individual skill with purchase option
- `SkillTree`: Main container showing all tiers and student info
- Responsive design with Tailwind CSS
- Visual feedback for purchased skills and affordability

## Game Mechanics

### Points as Currency and HP
Points have dual significance:
- **Currency**: Used to purchase skills
- **HP (Health Points)**: Represents student survival in the game

This creates strategic decisions: spend points on skills or conserve them for survival.

### Gacha System
The Mystery Box uses a random number generator to award between 1-20 points. This can result in:
- **Profit**: If reward > 50 points cost
- **Loss**: If reward < 50 points cost  
- **Break even**: If reward = 50 points

### Progressive Difficulty
Skills are tiered by cost:
- Basic Tier: 20-100 points (accessible early)
- PvP Tier: 200+ points (requires significant accumulation)

### Buff Stacking
The Pet buff increases future point gains, creating a compounding effect that rewards early investment.

## Usage Example

```typescript
// Initialize a student
const student: Student = {
  id: '1',
  name: 'Student Name',
  avatar: '👨‍🎓',
  points: 150,
  purchasedSkills: [],
  pointsBuffPercentage: 0,
};

// Purchase a skill
const result = purchaseSkill(student, 'change_avatar');

// Apply point buff
const buffedPoints = calculateBuffedPoints(student, 100); // Returns 101.5 if pet is active
```

## Future Enhancements

Potential additions to the skill system:
- More PvP skills (defense, counter-attack)
- Team-based skills
- Time-limited special skills
- Skill combinations and synergies
- Achievement system
- Leaderboards
