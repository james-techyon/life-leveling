// User data models for the life leveling app

import { fulfillmentAreas } from './fulfillment';

// User profile information
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  enneagramType: number;
  avatar?: string;
  joinDate: string; // ISO date string
  streak: number;
  lastActive: string; // ISO date string
}

// User progress in a specific area
export interface AreaProgress {
  areaId: string;
  currentLevel: number; 
  experience: number;
  experienceToNextLevel: number;
  streakDays: number;
  lastCheckin: string; // ISO date string
  highlights: Achievement[];
}

// User activity completion record
export interface ActivityCompletion {
  id: string;
  activityId: string;
  date: string; // ISO date string
  areaId: string;
  experienceGained: number;
  proof?: string; // URL or description
  reflection?: string;
  tags: string[];
}

// User achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  dateEarned: string; // ISO date string
  areaId: string;
  icon: string;
  experienceGained: number;
}

// User todo/planned activities
export interface PlannedActivity {
  id: string;
  activityId: string;
  targetDate: string; // ISO date string
  recurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
  reminder: boolean;
  reminderTime?: string; // Time in HH:MM format
}

// User settings
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  reminderTime: string; // Time in HH:MM format
  weeklyGoals: {
    [key: string]: number; // areaId -> number of activities
  };
  priorityAreas: string[]; // areaIds in priority order
  displayPreferences: {
    showCompletedActivities: boolean;
    dashboardLayout: 'grid' | 'list';
    activitySorting: 'level' | 'xp' | 'duration' | 'alphabetical';
  };
}

// Full user state
export interface UserState {
  profile: UserProfile;
  progress: AreaProgress[];
  activityHistory: ActivityCompletion[];
  achievements: Achievement[];
  plannedActivities: PlannedActivity[];
  settings: UserSettings;
}

// Create mock user data for development
export const createMockUser = (): UserState => {
  const today = new Date().toISOString();
  const yesterday = new Date(Date.now() - 86400000).toISOString();
  
  // Create initial progress for each area
  const progress: AreaProgress[] = fulfillmentAreas.map(area => ({
    areaId: area.id,
    currentLevel: Math.floor(Math.random() * 3) + 1, // Random level 1-3
    experience: Math.floor(Math.random() * 800) + 200, // Random XP between 200-1000
    experienceToNextLevel: 1000,
    streakDays: Math.floor(Math.random() * 10) + 1, // Random streak 1-10 days
    lastCheckin: yesterday,
    highlights: []
  }));
  
  // Create some random achievements
  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Completed your first activity',
      dateEarned: new Date(Date.now() - 7 * 86400000).toISOString(),
      areaId: 'fitness',
      icon: '🏁',
      experienceGained: 100
    },
    {
      id: '2',
      name: 'Fitness Enthusiast',
      description: 'Completed 5 fitness activities',
      dateEarned: new Date(Date.now() - 3 * 86400000).toISOString(),
      areaId: 'fitness',
      icon: '💪',
      experienceGained: 200
    },
    {
      id: '3',
      name: 'Finance Starter',
      description: 'Reached Level 2 in Finance',
      dateEarned: new Date(Date.now() - 5 * 86400000).toISOString(),
      areaId: 'finance',
      icon: '💰',
      experienceGained: 300
    }
  ];
  
  // Create some activity history
  const activityHistory: ActivityCompletion[] = [
    {
      id: '1',
      activityId: '1',
      date: new Date(Date.now() - 7 * 86400000).toISOString(),
      areaId: 'fitness',
      experienceGained: 50,
      tags: ['exercise', 'morning']
    },
    {
      id: '2',
      activityId: '10',
      date: new Date(Date.now() - 6 * 86400000).toISOString(),
      areaId: 'finance',
      experienceGained: 80,
      reflection: 'Created my first proper budget. Feel more in control now.',
      tags: ['budget', 'planning']
    },
    {
      id: '3',
      activityId: '15',
      date: new Date(Date.now() - 5 * 86400000).toISOString(),
      areaId: 'family',
      experienceGained: 70,
      tags: ['quality time', 'dinner']
    },
    {
      id: '4',
      activityId: '20',
      date: new Date(Date.now() - 4 * 86400000).toISOString(),
      areaId: 'friends',
      experienceGained: 90,
      tags: ['social', 'coffee']
    },
    {
      id: '5',
      activityId: '25',
      date: new Date(Date.now() - 3 * 86400000).toISOString(),
      areaId: 'faith',
      experienceGained: 60,
      reflection: 'Felt more centered after meditation today.',
      tags: ['meditation', 'morning']
    },
    {
      id: '6',
      activityId: '30',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      areaId: 'fun',
      experienceGained: 100,
      tags: ['hobby', 'creative']
    },
    {
      id: '7',
      activityId: '35',
      date: new Date(Date.now() - 1 * 86400000).toISOString(),
      areaId: 'focus',
      experienceGained: 120,
      reflection: 'Made significant progress on my project.',
      tags: ['project', 'productivity']
    }
  ];
  
  // Create some planned activities
  const plannedActivities: PlannedActivity[] = [
    {
      id: '1',
      activityId: '1',
      targetDate: today,
      recurring: true,
      frequency: 'daily',
      reminder: true,
      reminderTime: '07:00'
    },
    {
      id: '2',
      activityId: '10',
      targetDate: new Date(Date.now() + 1 * 86400000).toISOString(),
      recurring: true,
      frequency: 'weekly',
      reminder: true,
      reminderTime: '18:00'
    },
    {
      id: '3',
      activityId: '20',
      targetDate: new Date(Date.now() + 2 * 86400000).toISOString(),
      recurring: false,
      reminder: false
    }
  ];
  
  // Create user settings
  const settings: UserSettings = {
    theme: 'system',
    notifications: true,
    reminderTime: '20:00',
    weeklyGoals: {
      fitness: 5,
      finance: 3,
      family: 4,
      friends: 3,
      faith: 4,
      fun: 4,
      focus: 5
    },
    priorityAreas: ['fitness', 'focus', 'family', 'finance', 'faith', 'friends', 'fun'],
    displayPreferences: {
      showCompletedActivities: true,
      dashboardLayout: 'grid',
      activitySorting: 'level'
    }
  };
  
  return {
    profile: {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      enneagramType: 3, // Type 3 - The Achiever
      joinDate: new Date(Date.now() - 30 * 86400000).toISOString(),
      streak: 7,
      lastActive: yesterday
    },
    progress,
    activityHistory,
    achievements,
    plannedActivities,
    settings
  };
};