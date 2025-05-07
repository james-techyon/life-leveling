// Activity models for life leveling system

import { fulfillmentAreas } from './fulfillment';

export interface Activity {
  id: string;
  areaId: string;
  name: string;
  description: string;
  xpReward: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  duration: number; // in minutes
  requiresProof: boolean;
  requiresReflection: boolean;
  level: number; // minimum level required
  tags: string[];
}

// Create activities for each area, with multiple levels
const generateActivities = () => {
  let allActivities: Activity[] = [];
  let id = 1;

  fulfillmentAreas.forEach(area => {
    // Level 1 activities
    const level1Activities = getActivitiesByAreaAndLevel(area.id, 1, id);
    id += level1Activities.length;
    
    // Level 2 activities
    const level2Activities = getActivitiesByAreaAndLevel(area.id, 2, id);
    id += level2Activities.length;
    
    // Level 3 activities
    const level3Activities = getActivitiesByAreaAndLevel(area.id, 3, id);
    id += level3Activities.length;
    
    // Level 4 activities
    const level4Activities = getActivitiesByAreaAndLevel(area.id, 4, id);
    id += level4Activities.length;
    
    // Level 5 activities
    const level5Activities = getActivitiesByAreaAndLevel(area.id, 5, id);
    id += level5Activities.length;
    
    allActivities = [
      ...allActivities,
      ...level1Activities,
      ...level2Activities,
      ...level3Activities,
      ...level4Activities,
      ...level5Activities
    ];
  });

  return allActivities;
};

const getActivitiesByAreaAndLevel = (areaId: string, level: number, startId: number): Activity[] => {
  let id = startId;
  const activitiesByArea: Record<string, Activity[]> = {
    faith: [
      // Level 1
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Daily Mindfulness',
        description: 'Practice 5 minutes of mindfulness or meditation',
        xpReward: 50,
        frequency: 'daily',
        duration: 5,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['beginner', 'mindfulness', 'quick']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Values Reflection',
        description: 'Journal about your core values and what matters most to you',
        xpReward: 75,
        frequency: 'weekly',
        duration: 15,
        requiresProof: false,
        requiresReflection: true,
        level: 1,
        tags: ['reflection', 'values', 'journaling']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Nature Connection',
        description: 'Spend time in nature with awareness, noticing beauty and details',
        xpReward: 60,
        frequency: 'weekly',
        duration: 30,
        requiresProof: true,
        requiresReflection: false,
        level: 1,
        tags: ['nature', 'mindfulness', 'outdoors']
      },
      // Level 2
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Spiritual Reading',
        description: 'Read spiritual or philosophical texts that resonate with your values',
        xpReward: 80,
        frequency: 'daily',
        duration: 15,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['reading', 'learning', 'spirituality']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Gratitude Practice',
        description: 'Write down three specific things you're grateful for with detail',
        xpReward: 70,
        frequency: 'daily',
        duration: 10,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['gratitude', 'positivity', 'journaling']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Community Connection',
        description: 'Attend a spiritual or philosophical group gathering',
        xpReward: 120,
        frequency: 'weekly',
        duration: 60,
        requiresProof: true,
        requiresReflection: true,
        level: 2,
        tags: ['community', 'connection', 'growth']
      },
      // Level 3
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Extended Meditation',
        description: 'Practice meditation or contemplative prayer for 20+ minutes',
        xpReward: 100,
        frequency: 'daily',
        duration: 20,
        requiresProof: false,
        requiresReflection: true,
        level: 3,
        tags: ['meditation', 'spiritual practice', 'advanced']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Values-Based Decision',
        description: 'Make an important decision fully aligned with your core values',
        xpReward: 150,
        frequency: 'monthly',
        duration: 30,
        requiresProof: false,
        requiresReflection: true,
        level: 3,
        tags: ['values', 'decisions', 'integrity']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Spiritual Deep Dive',
        description: 'Attend a retreat, workshop or extended spiritual practice session',
        xpReward: 250,
        frequency: 'monthly',
        duration: 240,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['retreat', 'deep work', 'transformation']
      },
      // Level 4
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Spiritual Teaching',
        description: 'Lead a discussion, class or group on spiritual or philosophical topics',
        xpReward: 200,
        frequency: 'monthly',
        duration: 60,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['teaching', 'leadership', 'sharing']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Wisdom Integration',
        description: 'Write a personal manifesto or credo that integrates your spiritual wisdom',
        xpReward: 180,
        frequency: 'once',
        duration: 120,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['integration', 'writing', 'wisdom']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Advanced Spiritual Practice',
        description: 'Engage in an advanced contemplative practice (e.g., extended silent retreat)',
        xpReward: 300,
        frequency: 'monthly',
        duration: 480,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['advanced', 'intensive', 'transformation']
      },
      // Level 5
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Spiritual Mentoring',
        description: 'Provide ongoing spiritual guidance or mentoring to others',
        xpReward: 250,
        frequency: 'weekly',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 5,
        tags: ['mentoring', 'leadership', 'service']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Contemplative Mastery',
        description: 'Maintain an extensive daily spiritual practice (30+ minutes)',
        xpReward: 200,
        frequency: 'daily',
        duration: 30,
        requiresProof: false,
        requiresReflection: true,
        level: 5,
        tags: ['mastery', 'daily practice', 'dedication']
      },
      {
        id: `${id++}`,
        areaId: 'faith',
        name: 'Spiritual Legacy Project',
        description: 'Create something that shares your spiritual wisdom with future generations',
        xpReward: 500,
        frequency: 'once',
        duration: 300,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['legacy', 'creative', 'impact']
      }
    ],
    family: [
      // Level 1
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Quality Conversation',
        description: 'Have a meaningful conversation with a family member',
        xpReward: 50,
        frequency: 'daily',
        duration: 15,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['connection', 'communication', 'beginner']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Family Meal',
        description: 'Share a meal with family members with no devices',
        xpReward: 75,
        frequency: 'daily',
        duration: 30,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['mealtime', 'togetherness', 'routine']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Family Appreciation',
        description: 'Express specific appreciation to a family member',
        xpReward: 40,
        frequency: 'daily',
        duration: 5,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['gratitude', 'quick', 'connection']
      },
      // Level 2
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'One-on-One Time',
        description: 'Spend dedicated one-on-one time with a family member',
        xpReward: 100,
        frequency: 'weekly',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['connection', 'quality time', 'relationship']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Family Activity',
        description: 'Participate in a recreational activity with family members',
        xpReward: 90,
        frequency: 'weekly',
        duration: 60,
        requiresProof: true,
        requiresReflection: false,
        level: 2,
        tags: ['fun', 'recreation', 'togetherness']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Family Service',
        description: 'Complete a task or chore that benefits family members',
        xpReward: 60,
        frequency: 'daily',
        duration: 20,
        requiresProof: false,
        requiresReflection: false,
        level: 2,
        tags: ['service', 'household', 'contribution']
      },
      // Level 3
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Family Meeting',
        description: 'Hold a structured family meeting to discuss important matters',
        xpReward: 120,
        frequency: 'weekly',
        duration: 45,
        requiresProof: false,
        requiresReflection: true,
        level: 3,
        tags: ['communication', 'planning', 'problem-solving']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Relationship Renewal',
        description: 'Create a special experience to strengthen a specific family relationship',
        xpReward: 150,
        frequency: 'monthly',
        duration: 120,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['relationship', 'quality time', 'connection']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Conflict Resolution',
        description: 'Address and resolve a family conflict in a healthy, constructive way',
        xpReward: 140,
        frequency: 'monthly',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 3,
        tags: ['conflict', 'communication', 'healing']
      },
      // Level 4
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Family Tradition',
        description: 'Create or maintain a meaningful family tradition or ritual',
        xpReward: 180,
        frequency: 'monthly',
        duration: 90,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['tradition', 'meaning', 'memory-making']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Extended Family Connection',
        description: 'Strengthen relationships with extended family members',
        xpReward: 150,
        frequency: 'monthly',
        duration: 120,
        requiresProof: false,
        requiresReflection: true,
        level: 4,
        tags: ['extended family', 'relationships', 'connection']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Family Project',
        description: 'Complete a significant project together as a family',
        xpReward: 250,
        frequency: 'monthly',
        duration: 180,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['collaboration', 'creativity', 'accomplishment']
      },
      // Level 5
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Family Legacy',
        description: 'Create or document something that preserves family history or values',
        xpReward: 300,
        frequency: 'monthly',
        duration: 240,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['legacy', 'history', 'values']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Family Counsel',
        description: 'Provide wise guidance or mentoring to family members',
        xpReward: 200,
        frequency: 'weekly',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 5,
        tags: ['wisdom', 'mentoring', 'guidance']
      },
      {
        id: `${id++}`,
        areaId: 'family',
        name: 'Multi-Generation Impact',
        description: 'Create systems or experiences that strengthen family across generations',
        xpReward: 400,
        frequency: 'monthly',
        duration: 300,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['legacy', 'generations', 'impact']
      }
    ],
    friends: [
      // Level 1 activities
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Friend Check-In',
        description: 'Reach out to a friend via text, call, or message',
        xpReward: 40,
        frequency: 'daily',
        duration: 10,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['connection', 'communication', 'quick']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Social Activity',
        description: 'Participate in a social gathering or activity with others',
        xpReward: 80,
        frequency: 'weekly',
        duration: 60,
        requiresProof: true,
        requiresReflection: false,
        level: 1,
        tags: ['social', 'activity', 'connection']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'New Connection',
        description: 'Introduce yourself to someone new or strengthen an acquaintance relationship',
        xpReward: 60,
        frequency: 'weekly',
        duration: 15,
        requiresProof: false,
        requiresReflection: true,
        level: 1,
        tags: ['new people', 'networking', 'growth']
      },
      // Level 2
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Quality Friend Time',
        description: 'Have a meaningful conversation or activity with a friend',
        xpReward: 90,
        frequency: 'weekly',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['connection', 'quality time', 'depth']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Friend Support',
        description: 'Show up for a friend during an important event or difficult time',
        xpReward: 100,
        frequency: 'monthly',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['support', 'presence', 'reliability']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Social Initiative',
        description: 'Organize a social gathering or activity for friends',
        xpReward: 120,
        frequency: 'monthly',
        duration: 120,
        requiresProof: true,
        requiresReflection: false,
        level: 2,
        tags: ['initiative', 'planning', 'hosting']
      },
      // Level 3
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Vulnerable Conversation',
        description: 'Have an open, honest conversation with a friend about something meaningful',
        xpReward: 120,
        frequency: 'weekly',
        duration: 45,
        requiresProof: false,
        requiresReflection: true,
        level: 3,
        tags: ['vulnerability', 'depth', 'connection']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Community Involvement',
        description: 'Participate actively in a community group or organization',
        xpReward: 150,
        frequency: 'weekly',
        duration: 120,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['community', 'participation', 'belonging']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Friendship Renewal',
        description: 'Reconnect with a distant friend or heal a strained relationship',
        xpReward: 180,
        frequency: 'monthly',
        duration: 90,
        requiresProof: false,
        requiresReflection: true,
        level: 3,
        tags: ['reconnection', 'healing', 'renewal']
      },
      // Level 4
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Social Connector',
        description: 'Introduce people who would benefit from knowing each other',
        xpReward: 100,
        frequency: 'monthly',
        duration: 30,
        requiresProof: false,
        requiresReflection: true,
        level: 4,
        tags: ['connecting', 'network building', 'facilitation']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Community Leadership',
        description: 'Take a leadership role in a community group or event',
        xpReward: 200,
        frequency: 'monthly',
        duration: 180,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['leadership', 'service', 'initiative']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Deep Support',
        description: 'Provide significant support to a friend through a major life transition',
        xpReward: 180,
        frequency: 'monthly',
        duration: 120,
        requiresProof: false,
        requiresReflection: true,
        level: 4,
        tags: ['support', 'presence', 'care']
      },
      // Level 5
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Friendship Mentor',
        description: 'Help others develop meaningful connection skills',
        xpReward: 200,
        frequency: 'monthly',
        duration: 90,
        requiresProof: false,
        requiresReflection: true,
        level: 5,
        tags: ['mentoring', 'teaching', 'wisdom']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Community Creation',
        description: 'Create a new group or initiative that brings people together',
        xpReward: 350,
        frequency: 'once',
        duration: 300,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['creation', 'leadership', 'vision']
      },
      {
        id: `${id++}`,
        areaId: 'friends',
        name: 'Lifelong Friendship',
        description: 'Maintain and deepen decades-long friendships through life stages',
        xpReward: 250,
        frequency: 'monthly',
        duration: 180,
        requiresProof: false,
        requiresReflection: true,
        level: 5,
        tags: ['longevity', 'depth', 'fidelity']
      }
    ],
    fitness: [
      // Level 1
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Daily Movement',
        description: 'Move your body intentionally for at least 20 minutes',
        xpReward: 50,
        frequency: 'daily',
        duration: 20,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['movement', 'beginner', 'daily']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Hydration Focus',
        description: 'Drink at least 8 glasses of water throughout the day',
        xpReward: 30,
        frequency: 'daily',
        duration: 5,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['hydration', 'habit', 'health']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Sleep Priority',
        description: 'Get 7-8 hours of quality sleep',
        xpReward: 50,
        frequency: 'daily',
        duration: 480,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['sleep', 'recovery', 'health']
      },
      // Level 2
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Structured Workout',
        description: 'Complete a planned, structured workout (strength, cardio, etc.)',
        xpReward: 80,
        frequency: 'daily',
        duration: 45,
        requiresProof: true,
        requiresReflection: false,
        level: 2,
        tags: ['workout', 'strength', 'cardio']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Nutrition Focus',
        description: 'Prepare and eat a nutritionally balanced meal',
        xpReward: 60,
        frequency: 'daily',
        duration: 30,
        requiresProof: true,
        requiresReflection: false,
        level: 2,
        tags: ['nutrition', 'meal prep', 'health']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Active Recovery',
        description: 'Perform stretching, foam rolling, or mobility exercises',
        xpReward: 50,
        frequency: 'daily',
        duration: 15,
        requiresProof: false,
        requiresReflection: false,
        level: 2,
        tags: ['recovery', 'mobility', 'flexibility']
      },
      // Level 3
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Fitness Plan',
        description: 'Follow a comprehensive weekly fitness plan with multiple workout types',
        xpReward: 150,
        frequency: 'weekly',
        duration: 240,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['planning', 'consistency', 'balanced fitness']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Nutrition Tracking',
        description: 'Track and optimize your macronutrient intake for your goals',
        xpReward: 100,
        frequency: 'daily',
        duration: 15,
        requiresProof: true,
        requiresReflection: false,
        level: 3,
        tags: ['nutrition', 'tracking', 'optimization']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Physical Challenge',
        description: 'Complete a challenging physical event or test (race, competition, etc.)',
        xpReward: 300,
        frequency: 'monthly',
        duration: 120,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['challenge', 'competition', 'achievement']
      },
      // Level 4
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Performance Training',
        description: 'Train specifically to improve measurable performance metrics',
        xpReward: 150,
        frequency: 'weekly',
        duration: 180,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['performance', 'metrics', 'optimization']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Advanced Recovery',
        description: 'Utilize advanced recovery techniques (cold therapy, sauna, etc.)',
        xpReward: 80,
        frequency: 'weekly',
        duration: 45,
        requiresProof: true,
        requiresReflection: false,
        level: 4,
        tags: ['recovery', 'advanced', 'optimization']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Fitness Leadership',
        description: 'Lead or coach others in fitness activities',
        xpReward: 200,
        frequency: 'weekly',
        duration: 60,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['leadership', 'coaching', 'teaching']
      },
      // Level 5
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Elite Performance',
        description: 'Achieve elite-level performance in your fitness discipline',
        xpReward: 300,
        frequency: 'monthly',
        duration: 240,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['elite', 'performance', 'mastery']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Longevity Practice',
        description: 'Implement comprehensive longevity protocols (nutrition, exercise, sleep, stress)',
        xpReward: 200,
        frequency: 'weekly',
        duration: 120,
        requiresProof: false,
        requiresReflection: true,
        level: 5,
        tags: ['longevity', 'optimization', 'holistic']
      },
      {
        id: `${id++}`,
        areaId: 'fitness',
        name: 'Wellness Transformation',
        description: 'Help someone else achieve significant fitness or health transformation',
        xpReward: 400,
        frequency: 'monthly',
        duration: 300,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['impact', 'transformation', 'mentoring']
      }
    ],
    finance: [
      // Level 1
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Expense Tracking',
        description: 'Track all expenses for the day',
        xpReward: 40,
        frequency: 'daily',
        duration: 10,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['tracking', 'awareness', 'beginner']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Budget Creation',
        description: 'Create or update your monthly budget',
        xpReward: 100,
        frequency: 'monthly',
        duration: 45,
        requiresProof: true,
        requiresReflection: false,
        level: 1,
        tags: ['budgeting', 'planning', 'basics']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Financial Learning',
        description: 'Read an article or watch a video about personal finance',
        xpReward: 50,
        frequency: 'weekly',
        duration: 20,
        requiresProof: false,
        requiresReflection: true,
        level: 1,
        tags: ['education', 'learning', 'growth']
      },
      // Level 2
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Emergency Fund',
        description: 'Contribute to your emergency fund',
        xpReward: 80,
        frequency: 'weekly',
        duration: 10,
        requiresProof: true,
        requiresReflection: false,
        level: 2,
        tags: ['saving', 'security', 'foundation']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Debt Reduction',
        description: 'Make an extra payment toward debt',
        xpReward: 90,
        frequency: 'weekly',
        duration: 10,
        requiresProof: true,
        requiresReflection: false,
        level: 2,
        tags: ['debt', 'freedom', 'progress']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Financial Review',
        description: 'Review your financial statements and budget compliance',
        xpReward: 70,
        frequency: 'weekly',
        duration: 30,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['review', 'awareness', 'adjustment']
      },
      // Level 3
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Investment Contribution',
        description: 'Contribute to retirement or investment accounts',
        xpReward: 100,
        frequency: 'weekly',
        duration: 15,
        requiresProof: true,
        requiresReflection: false,
        level: 3,
        tags: ['investing', 'growth', 'future']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Financial Goal Setting',
        description: 'Create specific, measurable financial goals with action plans',
        xpReward: 150,
        frequency: 'monthly',
        duration: 60,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['goals', 'planning', 'strategy']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Money Management',
        description: 'Optimize a major expense area (housing, transportation, food, etc.)',
        xpReward: 200,
        frequency: 'monthly',
        duration: 120,
        requiresProof: false,
        requiresReflection: true,
        level: 3,
        tags: ['optimization', 'efficiency', 'management']
      },
      // Level 4
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Income Diversification',
        description: 'Develop or maintain an additional income stream',
        xpReward: 200,
        frequency: 'weekly',
        duration: 120,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['income', 'diversification', 'growth']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Investment Strategy',
        description: 'Develop or update a comprehensive investment strategy',
        xpReward: 180,
        frequency: 'monthly',
        duration: 90,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['investing', 'strategy', 'growth']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Tax Optimization',
        description: 'Research and implement legal tax optimization strategies',
        xpReward: 150,
        frequency: 'monthly',
        duration: 120,
        requiresProof: false,
        requiresReflection: true,
        level: 4,
        tags: ['taxes', 'optimization', 'strategy']
      },
      // Level 5
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Passive Income',
        description: 'Build or maintain substantial passive income sources',
        xpReward: 300,
        frequency: 'monthly',
        duration: 300,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['passive income', 'freedom', 'mastery']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Wealth Planning',
        description: 'Develop or update comprehensive estate and legacy plans',
        xpReward: 250,
        frequency: 'monthly',
        duration: 180,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['legacy', 'planning', 'wealth']
      },
      {
        id: `${id++}`,
        areaId: 'finance',
        name: 'Financial Wisdom Sharing',
        description: 'Mentor others in financial principles or share financial wisdom',
        xpReward: 200,
        frequency: 'monthly',
        duration: 90,
        requiresProof: false,
        requiresReflection: true,
        level: 5,
        tags: ['mentoring', 'teaching', 'impact']
      }
    ],
    fun: [
      // Level 1
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Joy Break',
        description: 'Take a short break to do something purely enjoyable',
        xpReward: 30,
        frequency: 'daily',
        duration: 15,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['quick', 'enjoyment', 'break']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Hobby Time',
        description: 'Spend time engaging in a hobby you enjoy',
        xpReward: 60,
        frequency: 'daily',
        duration: 30,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['hobby', 'enjoyment', 'recreation']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'New Experience',
        description: 'Try a new activity or experience you haven't done before',
        xpReward: 100,
        frequency: 'weekly',
        duration: 60,
        requiresProof: true,
        requiresReflection: true,
        level: 1,
        tags: ['novelty', 'exploration', 'growth']
      },
      // Level 2
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Skill Play',
        description: 'Practice and improve a recreational skill or hobby',
        xpReward: 80,
        frequency: 'weekly',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['skill', 'mastery', 'hobby']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Social Fun',
        description: 'Share a purely fun activity with others',
        xpReward: 90,
        frequency: 'weekly',
        duration: 120,
        requiresProof: true,
        requiresReflection: false,
        level: 2,
        tags: ['social', 'connection', 'shared joy']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Playful Mindset',
        description: 'Bring a playful approach to an ordinary task or responsibility',
        xpReward: 50,
        frequency: 'daily',
        duration: 20,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['mindset', 'creativity', 'everyday joy']
      },
      // Level 3
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Creative Expression',
        description: 'Engage in a creative activity for pure enjoyment',
        xpReward: 100,
        frequency: 'weekly',
        duration: 90,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['creativity', 'expression', 'flow']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Adventure Planning',
        description: 'Plan and anticipate an exciting adventure or experience',
        xpReward: 120,
        frequency: 'monthly',
        duration: 60,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['planning', 'anticipation', 'adventure']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Flow Activity',
        description: 'Engage in an activity that creates a flow state experience',
        xpReward: 110,
        frequency: 'weekly',
        duration: 90,
        requiresProof: false,
        requiresReflection: true,
        level: 3,
        tags: ['flow', 'engagement', 'presence']
      },
      // Level 4
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Joy Creation',
        description: 'Create a special experience that brings joy to others',
        xpReward: 180,
        frequency: 'monthly',
        duration: 180,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['creation', 'giving', 'shared joy']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Peak Experience',
        description: 'Engage in an activity that provides extraordinary enjoyment or meaning',
        xpReward: 200,
        frequency: 'monthly',
        duration: 240,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['peak', 'extraordinary', 'memorable']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Recreation Mastery',
        description: 'Achieve advanced skill level in a recreational pursuit',
        xpReward: 150,
        frequency: 'weekly',
        duration: 120,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['mastery', 'skill', 'achievement']
      },
      // Level 5
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Joyful Influence',
        description: 'Inspire others to embrace more play and enjoyment in life',
        xpReward: 200,
        frequency: 'monthly',
        duration: 120,
        requiresProof: false,
        requiresReflection: true,
        level: 5,
        tags: ['influence', 'inspiration', 'leadership']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Life Celebration',
        description: 'Create a significant celebration or experience that marks an important occasion',
        xpReward: 300,
        frequency: 'monthly',
        duration: 300,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['celebration', 'milestone', 'memory-making']
      },
      {
        id: `${id++}`,
        areaId: 'fun',
        name: 'Joy Integration',
        description: 'Fully integrate play and joy as a way of being in daily life',
        xpReward: 180,
        frequency: 'weekly',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 5,
        tags: ['integration', 'way of being', 'mastery']
      }
    ],
    focus: [
      // Level 1
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Skill Development',
        description: 'Spend time developing a professional or practical skill',
        xpReward: 70,
        frequency: 'daily',
        duration: 45,
        requiresProof: false,
        requiresReflection: true,
        level: 1,
        tags: ['skill', 'learning', 'growth']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Project Progress',
        description: 'Make meaningful progress on a personal or professional project',
        xpReward: 80,
        frequency: 'daily',
        duration: 60,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['project', 'productivity', 'progress']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Learning Session',
        description: 'Dedicate time to learning something relevant to your field',
        xpReward: 60,
        frequency: 'daily',
        duration: 30,
        requiresProof: false,
        requiresReflection: true,
        level: 1,
        tags: ['learning', 'education', 'growth']
      },
      // Level 2
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Excellence Practice',
        description: 'Go beyond basic expectations in a work task or project',
        xpReward: 90,
        frequency: 'daily',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['excellence', 'quality', 'effort']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Professional Network',
        description: 'Connect with others in your field or area of focus',
        xpReward: 100,
        frequency: 'weekly',
        duration: 45,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['networking', 'connection', 'professional']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Feedback Integration',
        description: 'Actively seek and apply feedback to improve your work',
        xpReward: 80,
        frequency: 'weekly',
        duration: 30,
        requiresProof: false,
        requiresReflection: true,
        level: 2,
        tags: ['feedback', 'improvement', 'growth']
      },
      // Level 3
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Expertise Development',
        description: 'Develop specialized knowledge or skill in your domain',
        xpReward: 150,
        frequency: 'weekly',
        duration: 120,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['expertise', 'specialization', 'depth']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Knowledge Sharing',
        description: 'Share your expertise with others through teaching or mentoring',
        xpReward: 120,
        frequency: 'weekly',
        duration: 60,
        requiresProof: false,
        requiresReflection: true,
        level: 3,
        tags: ['teaching', 'mentoring', 'sharing']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Challenge Project',
        description: 'Take on a project that stretches your abilities',
        xpReward: 200,
        frequency: 'monthly',
        duration: 300,
        requiresProof: true,
        requiresReflection: true,
        level: 3,
        tags: ['challenge', 'growth', 'project']
      },
      // Level 4
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Leadership Initiative',
        description: 'Lead a significant project or initiative with responsibility for outcomes',
        xpReward: 250,
        frequency: 'monthly',
        duration: 240,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['leadership', 'initiative', 'responsibility']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Innovation Creation',
        description: 'Develop a new approach, method, or solution in your field',
        xpReward: 200,
        frequency: 'monthly',
        duration: 180,
        requiresProof: true,
        requiresReflection: true,
        level: 4,
        tags: ['innovation', 'creativity', 'problem-solving']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Team Development',
        description: 'Build and develop an effective team or collaboration',
        xpReward: 180,
        frequency: 'weekly',
        duration: 120,
        requiresProof: false,
        requiresReflection: true,
        level: 4,
        tags: ['team', 'development', 'leadership']
      },
      // Level 5
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Field Transformation',
        description: 'Create something that significantly impacts your field or domain',
        xpReward: 400,
        frequency: 'monthly',
        duration: 480,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['transformation', 'impact', 'legacy']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Opportunity Creation',
        description: 'Create opportunities for others to advance in your field',
        xpReward: 300,
        frequency: 'monthly',
        duration: 240,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['opportunity', 'leadership', 'impact']
      },
      {
        id: `${id++}`,
        areaId: 'focus',
        name: 'Legacy Work',
        description: 'Create work that will continue to have impact beyond your direct involvement',
        xpReward: 350,
        frequency: 'monthly',
        duration: 300,
        requiresProof: true,
        requiresReflection: true,
        level: 5,
        tags: ['legacy', 'impact', 'longevity']
      }
    ]
  };

  return activitiesByArea[areaId]?.filter(activity => activity.level === level) || [];
};

// Export the activities
export const activities = generateActivities();

// Helper function to get activities for a specific area
export const getActivitiesByArea = (areaId: string) => {
  return activities.filter(activity => activity.areaId === areaId);
};

// Helper function to get activities for a specific level
export const getActivitiesByLevel = (level: number) => {
  return activities.filter(activity => activity.level === level);
};

// Helper function to get activities for a specific area and level
export const getActivitiesByAreaAndLevel = (areaId: string, level: number) => {
  return activities.filter(activity => activity.areaId === areaId && activity.level === level);
};