'use client';

import { useState, useEffect } from 'react';
import { SkillTree } from '@/components/SkillTree';
import { City } from '@/components/City';
import type { Student } from '@/types/skills';
import { loadStudent, saveStudent } from '@/utils/storage';

type View = 'skills' | 'city';

// Default student data
const DEFAULT_STUDENT: Student = {
  id: '1',
  name: 'Học Sinh Demo',
  avatar: '👨‍🎓',
  points: 150,
  purchasedSkills: [],
  pointsBuffPercentage: 0,
};

export default function Home() {
  // Initialize student state with lazy initialization from localStorage
  const [student, setStudent] = useState<Student>(() => {
    const savedStudent = loadStudent();
    return savedStudent || DEFAULT_STUDENT;
  });
  const [currentView, setCurrentView] = useState<View>('skills');

  // Save student data to localStorage whenever it changes
  useEffect(() => {
    saveStudent(student);
  }, [student]);

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
