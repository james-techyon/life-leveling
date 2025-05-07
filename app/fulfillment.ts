// The 7Fs of Fulfillment with descriptions and leveling metrics

export type Level = {
  level: number;
  description: string;
  requirements: string[];
  benefits: string[];
};

export type FulfillmentArea = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  levels: Level[];
};

export const fulfillmentAreas: FulfillmentArea[] = [
  {
    id: "faith",
    name: "Faith",
    description: "Your spiritual connection, beliefs, values, and sense of purpose",
    icon: "🙏",
    color: "bg-purple-500",
    levels: [
      {
        level: 1,
        description: "Spiritual Awareness",
        requirements: ["Acknowledge interest in spiritual growth", "Set aside time for reflection"],
        benefits: ["Increased self-awareness", "Beginning sense of purpose"]
      },
      {
        level: 2,
        description: "Spiritual Explorer",
        requirements: ["Regular spiritual practice (5+ mins daily)", "Explore personal values and beliefs"],
        benefits: ["Reduced stress", "Growing sense of meaning"]
      },
      {
        level: 3,
        description: "Spiritual Practitioner",
        requirements: ["Consistent daily practice (10+ mins)", "Apply spiritual values in daily decisions"],
        benefits: ["Improved emotional regulation", "Clearer sense of purpose"]
      },
      {
        level: 4,
        description: "Spiritual Devotee",
        requirements: ["Dedicated daily practice (20+ mins)", "Active participation in spiritual community"],
        benefits: ["Strong inner guidance", "Resilience during challenges"]
      },
      {
        level: 5,
        description: "Spiritual Adept",
        requirements: ["Deep daily practice (30+ mins)", "Spiritual values fully integrated into life"],
        benefits: ["Profound sense of purpose", "Inner peace amidst external circumstances"]
      }
    ]
  },
  {
    id: "family",
    name: "Family",
    description: "Your relationships with family members and creating a supportive home environment",
    icon: "👨‍👩‍👧‍👦",
    color: "bg-red-500",
    levels: [
      {
        level: 1,
        description: "Family Basics",
        requirements: ["Regular communication with family members", "Participation in family activities"],
        benefits: ["Basic family connections", "Sense of belonging"]
      },
      {
        level: 2,
        description: "Family Connector",
        requirements: ["Weekly quality time with family", "Active listening during conversations"],
        benefits: ["Improved communication", "Stronger family bonds"]
      },
      {
        level: 3,
        description: "Family Nurturer",
        requirements: ["Daily meaningful interactions", "Support family members' goals and needs"],
        benefits: ["Deeper trust", "Emotional security within family"]
      },
      {
        level: 4,
        description: "Family Pillar",
        requirements: ["Create family traditions", "Facilitate conflict resolution"],
        benefits: ["Resilient family unit", "Strong mutual support system"]
      },
      {
        level: 5,
        description: "Family Visionary",
        requirements: ["Guide family values and culture", "Foster individual growth within family context"],
        benefits: ["Multi-generational impact", "Family legacy development"]
      }
    ]
  },
  {
    id: "friends",
    name: "Friends",
    description: "Your social connections, community involvement, and meaningful friendships",
    icon: "👥",
    color: "bg-blue-500",
    levels: [
      {
        level: 1,
        description: "Social Participant",
        requirements: ["Regular social interaction", "Open to new connections"],
        benefits: ["Basic social network", "Reduced isolation"]
      },
      {
        level: 2,
        description: "Active Friend",
        requirements: ["Regular contact with friends", "Show up for important events"],
        benefits: ["Reliable social support", "Enhanced social skills"]
      },
      {
        level: 3,
        description: "Connected Friend",
        requirements: ["Deep conversations with friends", "Reciprocal emotional support"],
        benefits: ["Meaningful connections", "Sense of belonging"]
      },
      {
        level: 4,
        description: "Community Builder",
        requirements: ["Initiate group gatherings", "Bridge connections between people"],
        benefits: ["Diverse social network", "Community influence"]
      },
      {
        level: 5,
        description: "Friendship Cultivator",
        requirements: ["Mentor others", "Create safe spaces for authentic connection"],
        benefits: ["Legacy of connection", "Deep mutual growth relationships"]
      }
    ]
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "Your physical health, energy levels, nutrition, and overall wellbeing",
    icon: "💪",
    color: "bg-green-500",
    levels: [
      {
        level: 1,
        description: "Health Conscious",
        requirements: ["Basic awareness of health", "Some physical activity weekly"],
        benefits: ["Baseline fitness", "Health awareness"]
      },
      {
        level: 2,
        description: "Health Participant",
        requirements: ["Regular exercise (2-3x weekly)", "Basic nutrition awareness"],
        benefits: ["Improved energy", "Better sleep quality"]
      },
      {
        level: 3,
        description: "Fitness Enthusiast",
        requirements: ["Consistent exercise routine (3-4x weekly)", "Balanced nutrition most days"],
        benefits: ["Good stamina", "Maintained healthy weight"]
      },
      {
        level: 4,
        description: "Fitness Devotee",
        requirements: ["Varied exercise program (4-5x weekly)", "Nutrition planning and tracking"],
        benefits: ["Strong physical capacity", "Disease prevention"]
      },
      {
        level: 5,
        description: "Wellness Master",
        requirements: ["Optimized exercise program (5-6x weekly)", "Advanced nutrition and recovery practices"],
        benefits: ["Peak physical performance", "Longevity and vitality"]
      }
    ]
  },
  {
    id: "finance",
    name: "Finance",
    description: "Your financial health, income, savings, investments, and relationship with money",
    icon: "💰",
    color: "bg-yellow-500",
    levels: [
      {
        level: 1,
        description: "Financial Awareness",
        requirements: ["Track expenses", "Basic budget in place"],
        benefits: ["Financial awareness", "Reduced money stress"]
      },
      {
        level: 2,
        description: "Financial Stability",
        requirements: ["Emergency fund started", "Debt reduction plan"],
        benefits: ["Basic financial security", "Improved credit"]
      },
      {
        level: 3,
        description: "Financial Management",
        requirements: ["3-6 months emergency fund", "Regular savings habit (10-15% income)"],
        benefits: ["Financial buffer", "Growing assets"]
      },
      {
        level: 4,
        description: "Financial Growth",
        requirements: ["Investment strategy in place", "Multiple income streams"],
        benefits: ["Wealth building", "Increased financial freedom"]
      },
      {
        level: 5,
        description: "Financial Mastery",
        requirements: ["Financial independence path", "Strategic wealth management"],
        benefits: ["Economic resilience", "Legacy planning capacity"]
      }
    ]
  },
  {
    id: "fun",
    name: "Fun",
    description: "Your enjoyment of life, hobbies, recreation, play, and capacity for joy",
    icon: "🎮",
    color: "bg-pink-500",
    levels: [
      {
        level: 1,
        description: "Pleasure Seeker",
        requirements: ["Identify enjoyable activities", "Occasional fun experiences"],
        benefits: ["Basic enjoyment", "Stress relief"]
      },
      {
        level: 2,
        description: "Recreation Regular",
        requirements: ["Weekly fun activities", "Explore new interests"],
        benefits: ["Work-life balance", "Regular enjoyment"]
      },
      {
        level: 3,
        description: "Joy Cultivator",
        requirements: ["Multiple hobbies", "Scheduled recreation time"],
        benefits: ["Enhanced creativity", "Regular mood elevation"]
      },
      {
        level: 4,
        description: "Play Expert",
        requirements: ["Advanced skill in recreational activities", "Share fun with others"],
        benefits: ["Flow state experiences", "Community through shared interests"]
      },
      {
        level: 5,
        description: "Life Enthusiast",
        requirements: ["Integration of play into daily life", "Create memorable experiences"],
        benefits: ["Sustained joy", "Life characterized by enthusiasm"]
      }
    ]
  },
  {
    id: "focus",
    name: "Focus",
    description: "Your professional growth, career development, learning, and contribution through work",
    icon: "🎯",
    color: "bg-orange-500",
    levels: [
      {
        level: 1,
        description: "Career Basics",
        requirements: ["Career goals identified", "Regular skill development"],
        benefits: ["Career direction", "Growing competence"]
      },
      {
        level: 2,
        description: "Professional",
        requirements: ["Exceeding basic job requirements", "Professional network development"],
        benefits: ["Recognized competence", "Career stability"]
      },
      {
        level: 3,
        description: "Subject Expert",
        requirements: ["Deep domain knowledge", "Mentoring others"],
        benefits: ["Professional respect", "Greater autonomy"]
      },
      {
        level: 4,
        description: "Industry Leader",
        requirements: ["Innovative contributions to field", "Wide professional influence"],
        benefits: ["Career opportunities", "Professional fulfillment"]
      },
      {
        level: 5,
        description: "Legacy Creator",
        requirements: ["Transformative impact in domain", "Creating opportunities for others"],
        benefits: ["Professional legacy", "Maximum contribution impact"]
      }
    ]
  }
];