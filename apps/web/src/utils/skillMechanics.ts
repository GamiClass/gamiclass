import type { 
  Student, 
  SkillPurchaseResult, 
  PvPActionResult,
  MysteryBoxSkill,
  SummonPetSkill,
} from '@/types/skills';
import { getSkillById } from '@/data/skills';

/**
 * Purchase a skill for a student
 */
export function purchaseSkill(
  student: Student,
  skillId: string
): SkillPurchaseResult {
  const skill = getSkillById(skillId);
  
  if (!skill) {
    return {
      success: false,
      message: 'Kỹ năng không tồn tại.',
    };
  }

  // Check if already purchased
  if (student.purchasedSkills.includes(skillId)) {
    return {
      success: false,
      message: 'Bạn đã mua kỹ năng này rồi.',
    };
  }

  // Check if can afford
  if (student.points < skill.cost) {
    return {
      success: false,
      message: `Không đủ điểm. Bạn cần ${skill.cost} điểm nhưng chỉ có ${student.points} điểm.`,
    };
  }

  // Handle different skill types
  switch (skill.type) {
    case 'change_avatar':
      return handleChangeAvatar(student, skill);
    
    case 'mystery_box':
      return handleMysteryBox(student, skill as MysteryBoxSkill);
    
    case 'summon_pet':
      return handleSummonPet(student, skill as SummonPetSkill);
    
    case 'steal_points':
      return {
        success: true,
        message: 'Kỹ năng Đạo Chích đã được kích hoạt. Hãy chọn mục tiêu!',
        newPoints: student.points - skill.cost,
      };
    
    default:
      return {
        success: false,
        message: 'Loại kỹ năng không hợp lệ.',
      };
  }
}

/**
 * Handle Change Avatar skill
 */
function handleChangeAvatar(
  student: Student,
  skill: { cost: number }
): SkillPurchaseResult {
  return {
    success: true,
    message: 'Bạn có thể thay đổi avatar của mình! Chọn một hình đại diện mới.',
    newPoints: student.points - skill.cost,
  };
}

/**
 * Handle Mystery Box skill (Gacha mechanic)
 */
function handleMysteryBox(
  student: Student,
  skill: MysteryBoxSkill
): SkillPurchaseResult {
  // Random reward between minReward and maxReward
  const reward = Math.floor(
    Math.random() * (skill.maxReward - skill.minReward + 1) + skill.minReward
  );
  
  const netGain = reward - skill.cost;
  const newPoints = student.points - skill.cost + reward;
  
  let message = `Mở hộp bí ẩn! Bạn nhận được ${reward} điểm. `;
  
  if (netGain > 0) {
    message += `Bạn lời ${netGain} điểm! 🎉`;
  } else if (netGain < 0) {
    message += `Bạn lỗ ${Math.abs(netGain)} điểm. 😢`;
  } else {
    message += `Hòa vốn!`;
  }
  
  return {
    success: true,
    message,
    newPoints,
    reward,
  };
}

/**
 * Handle Summon Pet skill
 */
function handleSummonPet(
  student: Student,
  skill: SummonPetSkill
): SkillPurchaseResult {
  return {
    success: true,
    message: `Bạn đã triệu hồi thú cưng! Tất cả điểm nhận được trong tương lai sẽ được tăng ${skill.buffPercentage}%.`,
    newPoints: student.points - skill.cost,
  };
}

/**
 * Execute steal points PvP action
 */
export function stealPoints(
  attacker: Student,
  target: Student,
  stealAmount: number = 10
): PvPActionResult {
  // Check if target has enough points
  if (target.points < stealAmount) {
    stealAmount = target.points;
  }

  if (stealAmount === 0) {
    return {
      success: false,
      message: 'Mục tiêu không có điểm để cướp!',
      attackerId: attacker.id,
      targetId: target.id,
    };
  }

  return {
    success: true,
    message: `${attacker.name} đã cướp ${stealAmount} điểm từ ${target.name}!`,
    stolenPoints: stealAmount,
    attackerId: attacker.id,
    targetId: target.id,
  };
}

/**
 * Apply points buff from pet
 */
export function applyPointsBuff(points: number, buffPercentage: number): number {
  return Math.floor(points * (1 + buffPercentage / 100));
}

/**
 * Calculate points after applying all active buffs
 */
export function calculateBuffedPoints(student: Student, basePoints: number): number {
  return applyPointsBuff(basePoints, student.pointsBuffPercentage);
}
