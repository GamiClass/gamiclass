'use client';

import { useState } from 'react';
import { SkillTree } from '@/components/SkillTree';
import { City } from '@/components/City';
import type { Student } from '@/types/skills';

type View = 'skills' | 'city';

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

  const [currentView, setCurrentView] = useState<View>('skills');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {currentView === 'skills' ? (
        <SkillTree 
          student={student} 
          onStudentUpdate={setStudent}
          onNavigateToCity={() => setCurrentView('city')}
        />
      ) : (
        <City 
          student={student}
          onNavigateToSkills={() => setCurrentView('skills')}
        />
      )}
    </div>
  );
}
