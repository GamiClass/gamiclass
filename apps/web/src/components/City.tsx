'use client';

import { useState, useEffect } from 'react';
import type { Student } from '@/types/skills';
import type { Position, Direction } from '@/types/city';
import { DEFAULT_CITY_MAP, CITY_TILES, getDefaultStartPosition } from '@/data/city';
import { moveCharacter } from '@/utils/cityMechanics';
import { Button } from './ui/button';

interface CityProps {
  student: Student;
  onNavigateToSkills: () => void;
}

export function City({ student, onNavigateToSkills }: CityProps) {
  const [characterPosition, setCharacterPosition] = useState<Position>(
    getDefaultStartPosition()
  );

  // Handle keyboard movement
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let direction: Direction | null = null;

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = 'right';
          break;
      }

      if (direction) {
        event.preventDefault();
        const newPosition = moveCharacter(
          characterPosition,
          direction,
          DEFAULT_CITY_MAP
        );
        setCharacterPosition(newPosition);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [characterPosition]);

  // Handle button click movement
  const handleMove = (direction: Direction) => {
    const newPosition = moveCharacter(
      characterPosition,
      direction,
      DEFAULT_CITY_MAP
    );
    setCharacterPosition(newPosition);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              🏙️ Thành Phố Yên Bình
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Khám phá thành phố và di chuyển xung quanh
            </p>
          </div>
          <Button onClick={onNavigateToSkills} variant="outline">
            ⚔️ Quay Lại Skill Tree
          </Button>
        </div>

        {/* Student Info Bar */}
        <div className="rounded-lg bg-gradient-to-r from-green-500 to-blue-600 p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{student.avatar}</div>
              <div>
                <h2 className="text-xl font-bold">{student.name}</h2>
                <p className="text-green-100 text-sm">
                  Vị trí: ({characterPosition.x}, {characterPosition.y})
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{student.points}</div>
              <div className="text-green-100 text-sm">Điểm</div>
            </div>
          </div>
        </div>
      </div>

      {/* City Map */}
      <div className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {DEFAULT_CITY_MAP.tiles.map((row, y) => (
              <div key={y} className="flex">
                {row.map((tileType, x) => {
                  const tile = CITY_TILES[tileType];
                  const isCharacterHere =
                    characterPosition.x === x && characterPosition.y === y;

                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`
                        w-12 h-12 flex items-center justify-center text-2xl
                        border border-gray-200 dark:border-gray-700
                        ${!tile.walkable ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}
                      `}
                      title={tile.type}
                    >
                      {isCharacterHere ? (
                        <span className="animate-bounce">{student.avatar}</span>
                      ) : (
                        tile.emoji
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Movement Controls */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Button Controls */}
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            🎮 Điều Khiển
          </h3>
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={() => handleMove('up')}
              className="w-20"
              variant="outline"
            >
              ⬆️
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => handleMove('left')}
                className="w-20"
                variant="outline"
              >
                ⬅️
              </Button>
              <Button
                onClick={() => handleMove('down')}
                className="w-20"
                variant="outline"
              >
                ⬇️
              </Button>
              <Button
                onClick={() => handleMove('right')}
                className="w-20"
                variant="outline"
              >
                ➡️
              </Button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            💡 Hướng Dẫn
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Sử dụng mũi tên hoặc WASD để di chuyển</li>
            <li>• Hoặc nhấn các nút điều khiển bên trái</li>
            <li>• 🌱 Cỏ và ⬜ Đường đi có thể di chuyển</li>
            <li>• 🏠 Nhà, 🌳 Cây và ⛲ Đài phun nước không thể đi qua</li>
            <li>• Khám phá thành phố yên bình này!</li>
          </ul>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
        <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
          🗺️ Chú Giải Bản Đồ
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {Object.entries(CITY_TILES).map(([type, tile]) => (
            <div
              key={type}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <span className="text-xl">{tile.emoji}</span>
              <span className="capitalize">{type}</span>
              <span className="text-xs text-gray-500">
                {tile.walkable ? '(đi được)' : '(chặn)'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
