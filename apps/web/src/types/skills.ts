/**
 * Skill tier types for the Power Ladder system
 */
export type SkillTier = 'basic' | 'pvp';

/**
 * Skill type definitions
 */
export type SkillType = 
  | 'change_avatar'
  | 'mystery_box'
  | 'summon_pet'
  | 'steal_points';

/**
 * Base skill interface
 */
export interface Skill {
  id: string;
  type: SkillType;
  name: string;
  description: string;
  cost: number;
  tier: SkillTier;
  icon: string;
}

/**
 * Change Avatar skill - allows students to change their avatar
 */
export interface ChangeAvatarSkill extends Skill {
  type: 'change_avatar';
}

/**
 * Mystery Box skill - gacha mechanic that returns random points
 */
export interface MysteryBoxSkill extends Skill {
  type: 'mystery_box';
  minReward: number;
  maxReward: number;
}

/**
 * Summon Pet skill - passive buff that increases future points
 */
export interface SummonPetSkill extends Skill {
  type: 'summon_pet';
  buffPercentage: number;
}

/**
 * Steal Points skill - PvP mechanic to steal points from another student
 */
export interface StealPointsSkill extends Skill {
  type: 'steal_points';
}

/**
 * Union type for all skill variants
 */
export type SkillVariant = 
  | ChangeAvatarSkill 
  | MysteryBoxSkill 
  | SummonPetSkill 
  | StealPointsSkill;

/**
 * Student interface with points and purchased skills
 */
export interface Student {
  id: string;
  name: string;
  avatar: string;
  points: number;
  purchasedSkills: string[];
  activePet?: string;
  pointsBuffPercentage: number;
}

/**
 * Skill purchase result
 */
export interface SkillPurchaseResult {
  success: boolean;
  message: string;
  newPoints?: number;
  reward?: number;
}

/**
 * PvP action result
 */
export interface PvPActionResult {
  success: boolean;
  message: string;
  stolenPoints?: number;
  attackerId: string;
  targetId: string;
}
