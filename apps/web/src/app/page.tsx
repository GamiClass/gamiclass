'use client';

import { useState } from 'react';
import { SkillTree } from '@/components/SkillTree';
import type { Student } from '@/types/skills';

export default function Home() {
  // Mock student data - in a real app, this would come from a database
  const [student, setStudent] = useState<Student>({
    id: '1',
    name: 'Học Sinh Demo',
    avatar: '👨‍🎓',
    points: 150,
    purchasedSkills: [],
    pointsBuffPercentage: 0,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SkillTree student={student} onStudentUpdate={setStudent} />
    </div>
  );
}
