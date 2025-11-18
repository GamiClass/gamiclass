'use client';

import { useState } from 'react';
import { SkillCard } from './SkillCard';
import { getSkillsByTier } from '@/data/skills';
import type { Student } from '@/types/skills';
import { purchaseSkill } from '@/utils/skillMechanics';

interface SkillTreeProps {
  student: Student;
  onStudentUpdate: (student: Student) => void;
}

export function SkillTree({ student, onStudentUpdate }: SkillTreeProps) {
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const basicSkills = getSkillsByTier('basic');
  const pvpSkills = getSkillsByTier('pvp');

  const handlePurchase = (skillId: string) => {
    const result = purchaseSkill(student, skillId);

    if (result.success) {
      // Update student state
      const updatedStudent: Student = {
        ...student,
        points: result.newPoints ?? student.points,
        purchasedSkills: [...student.purchasedSkills, skillId],
      };

      // Apply special effects based on skill type
      if (skillId === 'summon_pet') {
        updatedStudent.pointsBuffPercentage = student.pointsBuffPercentage + 1.5;
        updatedStudent.activePet = '🐾';
      }

      onStudentUpdate(updatedStudent);
      setMessageType('success');
    } else {
      setMessageType('error');
    }

    setMessage(result.message);

    // Clear message after 5 seconds
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          ⚔️ The Power Ladder
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thang Sức Mạnh - Hệ Thống Kỹ Năng &amp; Phần Thưởng
        </p>
      </div>

      {/* Student Info */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{student.avatar}</div>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-blue-100">
                Kỹ năng đã mua: {student.purchasedSkills.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{student.points}</div>
            <div className="text-blue-100">Điểm</div>
            {student.activePet && (
              <div className="mt-2 rounded bg-white/20 px-3 py-1 text-sm">
                Pet: {student.activePet} (+{student.pointsBuffPercentage}%)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`mb-6 rounded-lg p-4 ${
            messageType === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {message}
        </div>
      )}

      {/* Basic Tier */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          🎓 Cấp Độ Khởi Động (Basic Tier)
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Giai đoạn tích lũy ban đầu, giúp học sinh làm quen với việc &quot;tiêu điểm&quot;.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {basicSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              currentPoints={student.points}
              isPurchased={student.purchasedSkills.includes(skill.id)}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </section>

      {/* PvP Tier */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          ⚔️ Cấp Độ Chiến Đấu (PvP Tier)
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Giai đoạn học sinh bắt đầu tương tác và cạnh tranh với nhau.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pvpSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              currentPoints={student.points}
              isPurchased={student.purchasedSkills.includes(skill.id)}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </section>

      {/* Info Footer */}
      <div className="mt-12 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          💡 Lưu Ý
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• Điểm số vừa là tiền tệ để mua kỹ năng, vừa là &quot;Máu&quot; (HP) để sinh tồn.</li>
          <li>• Hộp Bí Ẩn có thể cho bạn lời hoặc lỗ - hãy cẩn thận!</li>
          <li>• Pet sẽ tăng điểm bạn nhận được trong tương lai.</li>
          <li>• Kỹ năng PvP cho phép tương tác với các bạn học khác.</li>
        </ul>
      </div>
    </div>
  );
}
