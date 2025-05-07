// User profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enneagramType: number;
  createdAt: string;
}

// Progress tracking
export interface AreaProgress {
  areaId: string;
  currentLevel: number;
  experience: number;
  experienceToNextLevel: number;
  streakDays: number;
  lastCheckin: string;
  history: ProgressHistory[];
}

export interface ProgressHistory {
  date: string;
  activity: string;
  experienceGained: number;
  reflection?: string;
}

// Activity tracking
export interface Activity {
  id: string;
  areaId: string;
  name: string;
  description: string;
  experienceValue: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  requiresProof: boolean;
  level: number;  // Minimum level required
}

export interface UserActivity {
  id: string;
  userId: string;
  activityId: string;
  date: string;
  completed: boolean;
  proof?: string;
  reflection?: string;
  experienceGained: number;
}

// Achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: AchievementCriteria;
  reward: {
    experience: number;
    badge?: string;
  };
}

export interface AchievementCriteria {
  type: 'streak' | 'level' | 'activities' | 'balance';
  areaId?: string;
  threshold: number;
  duration?: number;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  dateEarned: string;
}

// Challenges
export interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number;  // in days
  activities: Activity[];
  reward: {
    experience: number;
    badge?: string;
  };
}

export interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  progress: number;  // Percentage
  activitiesCompleted: string[];  // Activity IDs
}

// Settings
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
    reminderTime: string;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    shareProgress: boolean;
    shareActivities: boolean;
  };
  focusAreas: string[];  // Prioritized area IDs
}

// Full user state
export interface UserState {
  profile: UserProfile;
  progress: AreaProgress[];
  activities: UserActivity[];
  achievements: UserAchievement[];
  challenges: UserChallenge[];
  settings: UserSettings;
}

// App state
export interface AppState {
  currentUser: UserState | null;
  isLoading: boolean;
  error: string | null;
}