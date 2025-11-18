import type { SkillVariant } from '@/types/skills';

/**
 * Available skills in the Power Ladder system
 * Based on the skill tree specification
 */
export const SKILLS: SkillVariant[] = [
  // Basic Tier Skills
  {
    id: 'change_avatar',
    type: 'change_avatar',
    name: 'Biến Hình',
    description: 'Cho phép học sinh đổi hình đại diện mới ngầu hơn trong kho thư viện.',
    cost: 20,
    tier: 'basic',
    icon: '🎭',
  },
  {
    id: 'mystery_box',
    type: 'mystery_box',
    name: 'Hộp Bí Ẩn',
    description: 'Cơ chế Gacha (May rủi): Mở hộp nhận ngẫu nhiên từ 1 - 20 điểm.',
    cost: 50,
    tier: 'basic',
    icon: '🎁',
    minReward: 1,
    maxReward: 20,
  },
  {
    id: 'summon_pet',
    type: 'summon_pet',
    name: 'Triệu Hồi Pet',
    description: 'Mở khóa thú cưng đi theo avatar. Tăng 1.5% tổng số điểm nhận được trong tương lai.',
    cost: 100,
    tier: 'basic',
    icon: '🐾',
    buffPercentage: 1.5,
  },
  
  // PvP Tier Skills
  {
    id: 'steal_points',
    type: 'steal_points',
    name: 'Đạo Chích',
    description: 'PvP: Chọn 1 bạn trong lớp để cướp điểm.',
    cost: 200,
    tier: 'pvp',
    icon: '🕵️',
  },
];

/**
 * Get skill by ID
 */
export function getSkillById(id: string): SkillVariant | undefined {
  return SKILLS.find(skill => skill.id === id);
}

/**
 * Get skills by tier
 */
export function getSkillsByTier(tier: 'basic' | 'pvp'): SkillVariant[] {
  return SKILLS.filter(skill => skill.tier === tier);
}

/**
 * Check if student can afford skill
 */
export function canAffordSkill(studentPoints: number, skillCost: number): boolean {
  return studentPoints >= skillCost;
}

/**
 * Check if skill is already purchased
 */
export function hasSkill(purchasedSkills: string[], skillId: string): boolean {
  return purchasedSkills.includes(skillId);
}
