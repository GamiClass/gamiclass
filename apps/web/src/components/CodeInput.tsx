'use client';

import { useState } from 'react';

interface CodeInputProps {
  onCodeSubmit: (code: string) => void;
}

export function CodeInput({ onCodeSubmit }: CodeInputProps) {
  const [code, setCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onCodeSubmit(code.trim());
      setCode('');
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-lg transition-colors flex items-center justify-center text-xl z-40"
        title="Nhập mã"
      >
        🔑
      </button>

      {/* Code input modal */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                🔑 Nhập Mã
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Nhập mã..."
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                autoFocus
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Xác Nhận
                </button>
                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
