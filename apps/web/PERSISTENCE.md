# Data Persistence (Lưu trữ dữ liệu)

## Overview

GamiClass now uses `localStorage` to persist user data across page reloads. This ensures that students don't lose their progress when they refresh the page or return to the application later.

## What is Persisted

### 1. Student Data
The following student information is saved to `localStorage`:
- **Points (Điểm)**: Current point balance
- **Purchased Skills (Kỹ năng đã mua)**: List of skill IDs that have been purchased
- **Avatar**: Current avatar emoji
- **Active Pet**: Pet emoji if summoned
- **Points Buff Percentage**: Buff percentage from active pet

### 2. Character Position
The character's position in the city is saved:
- **X coordinate**: Horizontal position in the city grid
- **Y coordinate**: Vertical position in the city grid

## Implementation

### Storage Keys
Data is stored under the following keys:
- `gamiclass_student`: Stores the complete student object
- `gamiclass_character_position`: Stores the character position object

### How It Works

#### Loading Data
When the application loads:
1. `useState` uses lazy initialization to check `localStorage` for saved data
2. If saved data exists, it is loaded and used
3. If no saved data exists, default values are used

```typescript
const [student, setStudent] = useState<Student>(() => {
  const savedStudent = loadStudent();
  return savedStudent || DEFAULT_STUDENT;
});
```

#### Saving Data
When data changes:
1. A `useEffect` hook monitors the state
2. When the state changes, it automatically saves to `localStorage`
3. This happens after each action (buying a skill, moving character, etc.)

```typescript
useEffect(() => {
  saveStudent(student);
}, [student]);
```

## Error Handling

The storage utility includes robust error handling:
- **Browser Compatibility Check**: Verifies `localStorage` is available
- **Try-Catch Blocks**: Catches and logs any storage errors
- **Graceful Degradation**: If `localStorage` is unavailable, the app continues to work with in-memory state

## Privacy & Security

- **Local Only**: All data is stored locally in the user's browser
- **No Server**: No data is sent to any server
- **No Personal Information**: Only game progress is stored
- **User Control**: Users can clear their data through browser settings

## Testing

To verify persistence is working:

1. **Buy a skill** in the Power Ladder
2. **Refresh the page** (F5 or Ctrl+R)
3. **Verify**: Your points and purchased skills should remain

4. **Move your character** in the city
5. **Refresh the page**
6. **Verify**: Your character should be in the same position

## Clearing Data

Users can clear their game progress by:
1. Opening browser Developer Tools (F12)
2. Going to the "Application" or "Storage" tab
3. Finding "Local Storage" → your domain
4. Deleting the keys:
   - `gamiclass_student`
   - `gamiclass_character_position`

Or by clearing browser data for the site.

## Future Enhancements

Possible improvements for the future:
- Add a "Reset Progress" button in the UI
- Implement data export/import functionality
- Add cloud sync with backend integration
- Implement data versioning for migrations
