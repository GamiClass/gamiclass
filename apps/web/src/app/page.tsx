'use client';

import { useState } from 'react';
import { SkillTree } from '@/components/SkillTree';
import { City } from '@/components/City';
import { CodeInput } from '@/components/CodeInput';
import { AdminPanel } from '@/components/AdminPanel';
import type { Student } from '@/types/skills';

type View = 'skills' | 'city';

const ADMIN_CODE = 'admintankhoi';

export default function Home() {
  // Mock student data - in a real app, this would come from a database
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Học Sinh Demo',
      avatar: '👨‍🎓',
      points: 150,
      purchasedSkills: [],
      pointsBuffPercentage: 0,
    },
    {
      id: '2',
      name: 'Nguyễn Văn A',
      avatar: '👨‍💻',
      points: 200,
      purchasedSkills: ['change_avatar'],
      pointsBuffPercentage: 0,
    },
    {
      id: '3',
      name: 'Trần Thị B',
      avatar: '👩‍🎓',
      points: 120,
      purchasedSkills: [],
      pointsBuffPercentage: 0,
    },
  ]);

  const [currentView, setCurrentView] = useState<View>('skills');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const currentStudent = students[0];

  const handleStudentUpdate = (updatedStudent: Student) => {
    const updatedStudents = students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
  };

  const handleCodeSubmit = (code: string) => {
    if (code === ADMIN_CODE) {
      setIsAdminMode(true);
    } else {
      alert('Mã không đúng!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {currentView === 'skills' ? (
        <SkillTree 
          student={currentStudent} 
          onStudentUpdate={handleStudentUpdate}
          onNavigateToCity={() => setCurrentView('city')}
        />
      ) : (
        <City 
          student={currentStudent}
          onNavigateToSkills={() => setCurrentView('skills')}
        />
      )}

      <CodeInput onCodeSubmit={handleCodeSubmit} />

      {isAdminMode && (
        <AdminPanel
          students={students}
          onStudentsUpdate={setStudents}
          onClose={() => setIsAdminMode(false)}
        />
      )}
    </div>
  );
}
