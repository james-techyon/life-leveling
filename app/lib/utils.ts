import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate level based on total XP
export function calculateLevel(xp: number, levels: { xpRequired: number }[]): number {
  let level = 1;
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].xpRequired) {
      level = i + 1;
    } else {
      break;
    }
  }
  return level;
}

// Calculate XP needed for next level
export function xpForNextLevel(currentLevel: number, levels: { xpRequired: number }[]): number {
  if (currentLevel >= levels.length) {
    return 0; // Max level reached
  }
  return levels[currentLevel].xpRequired;
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

// Calculate streak
export function calculateStreak(dates: string[]): number {
  if (!dates.length) return 0;
  
  // Sort dates in descending order (newest first)
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  // Get today's date with time set to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Check if the most recent date is either today or yesterday
  const mostRecentDate = new Date(sortedDates[0]);
  mostRecentDate.setHours(0, 0, 0, 0);
  
  if (mostRecentDate.getTime() !== today.getTime() && 
      mostRecentDate.getTime() !== yesterday.getTime()) {
    return 0; // Streak broken
  }
  
  // Count consecutive days
  let streak = 1;
  let currentDate = mostRecentDate;
  
  for (let i = 1; i < sortedDates.length; i++) {
    const nextDate = new Date(sortedDates[i]);
    nextDate.setHours(0, 0, 0, 0);
    
    // Check if this date is one day before current date
    const expectedPrevDate = new Date(currentDate);
    expectedPrevDate.setDate(expectedPrevDate.getDate() - 1);
    
    if (nextDate.getTime() === expectedPrevDate.getTime()) {
      streak++;
      currentDate = nextDate;
    } else {
      break; // Streak broken
    }
  }
  
  return streak;
}