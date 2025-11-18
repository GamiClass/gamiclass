'use client';

import { useState } from 'react';
import type { Student } from '@/types/skills';

interface AdminPanelProps {
  students: Student[];
  onStudentsUpdate: (students: Student[]) => void;
  onClose: () => void;
}

export function AdminPanel({ students, onStudentsUpdate, onClose }: AdminPanelProps) {
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [newPoints, setNewPoints] = useState<string>('');

  const handlePointsUpdate = (studentId: string) => {
    const pointsToSet = parseInt(newPoints);
    if (isNaN(pointsToSet) || pointsToSet < 0) {
      alert('Vui lòng nhập số điểm hợp lệ (>= 0)');
      return;
    }

    const updatedStudents = students.map(student => 
      student.id === studentId 
        ? { ...student, points: pointsToSet }
        : student
    );

    onStudentsUpdate(updatedStudents);
    setEditingStudent(null);
    setNewPoints('');
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student.id);
    setNewPoints(student.points.toString());
  };

  const handleCancel = () => {
    setEditingStudent(null);
    setNewPoints('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">🔐 Admin Panel</h2>
              <p className="text-purple-100 mt-1">Quản lý điểm số học sinh</p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
            >
              ✕ Đóng
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-4xl">{student.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {student.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>ID: {student.id}</span>
                        <span>Kỹ năng: {student.purchasedSkills.length}</span>
                        {student.activePet && (
                          <span>Pet: {student.activePet}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {editingStudent === student.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={newPoints}
                        onChange={(e) => setNewPoints(e.target.value)}
                        className="w-24 px-3 py-2 border-2 border-purple-500 rounded-lg text-center font-bold text-gray-900 dark:text-white dark:bg-gray-600"
                        placeholder="Điểm"
                        autoFocus
                      />
                      <button
                        onClick={() => handlePointsUpdate(student.id)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                      >
                        ✓ Lưu
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                          {student.points}
                        </div>
                        <div className="text-sm text-gray-500">điểm</div>
                      </div>
                      <button
                        onClick={() => handleEdit(student)}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors ml-2"
                      >
                        ✏️ Sửa
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            💡 Bấm vào nút &quot;Sửa&quot; để thay đổi điểm số của học sinh
          </p>
        </div>
      </div>
    </div>
  );
}
