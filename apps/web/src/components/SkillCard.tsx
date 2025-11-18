'use client';

import { Button } from '@/components/ui/button';
import type { SkillVariant } from '@/types/skills';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  skill: SkillVariant;
  currentPoints: number;
  isPurchased: boolean;
  onPurchase: (skillId: string) => void;
}

export function SkillCard({
  skill,
  currentPoints,
  isPurchased,
  onPurchase,
}: SkillCardProps) {
  const canAfford = currentPoints >= skill.cost;
  const isDisabled = isPurchased || !canAfford;

  return (
    <div
      className={cn(
        'relative rounded-lg border p-6 transition-all',
        isPurchased && 'border-green-500 bg-green-50 dark:bg-green-950/20',
        !isPurchased && canAfford && 'border-blue-500 hover:shadow-lg',
        !isPurchased && !canAfford && 'border-gray-300 opacity-60'
      )}
    >
      {/* Icon */}
      <div className="mb-4 text-5xl">{skill.icon}</div>

      {/* Name and Tier */}
      <div className="mb-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {skill.name}
        </h3>
        <span
          className={cn(
            'inline-block mt-1 rounded-full px-2 py-1 text-xs font-semibold',
            skill.tier === 'basic' &&
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            skill.tier === 'pvp' &&
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          )}
        >
          {skill.tier === 'basic' ? 'Cơ Bản' : 'PvP'}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {skill.description}
      </p>

      {/* Special attributes */}
      {skill.type === 'mystery_box' && (
        <div className="mb-3 rounded bg-amber-50 p-2 text-xs dark:bg-amber-950/20">
          <span className="font-semibold">Phần thưởng:</span> {skill.minReward} -{' '}
          {skill.maxReward} điểm
        </div>
      )}

      {skill.type === 'summon_pet' && (
        <div className="mb-3 rounded bg-purple-50 p-2 text-xs dark:bg-purple-950/20">
          <span className="font-semibold">Buff:</span> +{skill.buffPercentage}%
          điểm
        </div>
      )}

      {/* Cost and Purchase Button */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-900 dark:text-white">
          <span className="text-amber-600 dark:text-amber-400">
            {skill.cost}
          </span>{' '}
          điểm
        </div>

        {isPurchased ? (
          <Button variant="outline" disabled size="sm">
            ✓ Đã Mua
          </Button>
        ) : (
          <Button
            variant={canAfford ? 'default' : 'outline'}
            disabled={isDisabled}
            onClick={() => onPurchase(skill.id)}
            size="sm"
          >
            {canAfford ? 'Mua' : 'Không đủ điểm'}
          </Button>
        )}
      </div>

      {/* Purchased Badge */}
      {isPurchased && (
        <div className="absolute top-2 right-2 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
          ✓
        </div>
      )}
    </div>
  );
}
