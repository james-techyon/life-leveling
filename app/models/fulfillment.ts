// The 7Fs of Fulfillment model
export interface Level {
  level: number;
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
  xpRequired: number;
}

export interface FulfillmentArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  hoverColor: string;
  textColor: string;
  levels: Level[];
}

export const fulfillmentAreas: FulfillmentArea[] = [
  {
    id: "faith",
    name: "Faith",
    description: "Your spiritual connection, beliefs, values, and sense of purpose",
    icon: "✨",
    color: "bg-purple-600",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100",
    textColor: "text-purple-700",
    levels: [
      {
        level: 1,
        title: "Spiritual Explorer",
        description: "Beginning to explore spiritual concepts and personal values",
        requirements: [
          "Reflect on your core values for 10 minutes once a week",
          "Read or listen to content about spirituality or philosophy once a week",
          "Practice 5 minutes of mindfulness or meditation twice a week"
        ],
        benefits: [
          "Increased self-awareness",
          "Beginning sense of purpose",
          "Reduced reactivity to stress"
        ],
        xpRequired: 0
      },
      {
        level: 2,
        title: "Spiritual Seeker",
        description: "Developing regular spiritual practices and clarifying personal values",
        requirements: [
          "Maintain a consistent spiritual practice for 10 minutes, 3 times per week",
          "Journal about your values and purpose twice a week",
          "Spend time in nature or quiet reflection once a week"
        ],
        benefits: [
          "Clearer sense of personal values",
          "Greater emotional stability",
          "Enhanced decision-making aligned with values"
        ],
        xpRequired: 1000
      },
      {
        level: 3,
        title: "Spiritual Practitioner",
        description: "Consistent spiritual practice integrated into daily life",
        requirements: [
          "Maintain a daily spiritual practice for 15+ minutes",
          "Actively apply spiritual values in daily decisions",
          "Connect with a spiritual community or like-minded individuals monthly"
        ],
        benefits: [
          "Strong sense of purpose",
          "Improved emotional regulation",
          "Enhanced resilience during challenges"
        ],
        xpRequired: 3000
      },
      {
        level: 4,
        title: "Spiritual Guide",
        description: "Deep spiritual wisdom and consistent alignment with values",
        requirements: [
          "Maintain a dedicated daily practice for 20+ minutes",
          "Mentor or support others in their spiritual journey",
          "Integrate spiritual principles across all life domains"
        ],
        benefits: [
          "Profound inner peace",
          "Alignment between beliefs and actions",
          "Ability to find meaning in all circumstances"
        ],
        xpRequired: 7000
      },
      {
        level: 5,
        title: "Spiritual Master",
        description: "Living fully aligned with deepest values and spiritual wisdom",
        requirements: [
          "Maintain an extensive daily spiritual practice (30+ minutes)",
          "Embody spiritual principles consistently in all situations",
          "Create positive impact through spiritual wisdom and service"
        ],
        benefits: [
          "Unshakable inner peace",
          "Profound sense of purpose and meaning",
          "Transformative influence on others"
        ],
        xpRequired: 15000
      }
    ]
  },
  {
    id: "family",
    name: "Family",
    description: "Your relationships with family members and home environment",
    icon: "👪",
    color: "bg-red-500",
    bgColor: "bg-red-50",
    hoverColor: "hover:bg-red-100",
    textColor: "text-red-700",
    levels: [
      {
        level: 1,
        title: "Family Connector",
        description: "Creating basic connections with family members",
        requirements: [
          "Have a meaningful conversation with a family member once a week",
          "Participate in a family meal or activity weekly",
          "Express appreciation to a family member twice a week"
        ],
        benefits: [
          "Improved communication with family",
          "Reduced family tension",
          "Sense of belonging"
        ],
        xpRequired: 0
      },
      {
        level: 2,
        title: "Family Nurturer",
        description: "Actively strengthening family bonds",
        requirements: [
          "Have meaningful one-on-one time with each immediate family member weekly",
          "Create or maintain a family tradition or ritual",
          "Practice active listening during family conversations"
        ],
        benefits: [
          "Deeper family connections",
          "Greater emotional safety at home",
          "Shared family identity"
        ],
        xpRequired: 1000
      },
      {
        level: 3,
        title: "Family Harmonizer",
        description: "Creating harmony and resolving conflicts effectively",
        requirements: [
          "Address conflicts constructively within 48 hours",
          "Create systems for household management that respect everyone's needs",
          "Hold regular family meetings or check-ins"
        ],
        benefits: [
          "Effective conflict resolution",
          "Balanced family responsibilities",
          "Strong family communication patterns"
        ],
        xpRequired: 3000
      },
      {
        level: 4,
        title: "Family Cultivator",
        description: "Fostering a thriving family culture and deep connections",
        requirements: [
          "Create meaningful family celebrations and traditions",
          "Support each family member's individual growth and goals",
          "Maintain healthy relationships with extended family"
        ],
        benefits: [
          "Thriving family culture",
          "Family resilience during challenges",
          "Cross-generational connections"
        ],
        xpRequired: 7000
      },
      {
        level: 5,
        title: "Family Visionary",
        description: "Creating a multi-generational family legacy",
        requirements: [
          "Foster family values that transcend generations",
          "Create systems for family support across life stages",
          "Mentor family members in life wisdom and skills"
        ],
        benefits: [
          "Multi-generational impact",
          "Enduring family legacy",
          "Deep family wisdom passed through generations"
        ],
        xpRequired: 15000
      }
    ]
  },
  {
    id: "friends",
    name: "Friends",
    description: "Your social connections and community involvement",
    icon: "👥",
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
    textColor: "text-blue-700",
    levels: [
      {
        level: 1,
        title: "Social Participant",
        description: "Building basic social connections",
        requirements: [
          "Engage in social interaction at least once a week",
          "Reach out to a friend or acquaintance weekly",
          "Try a new social activity or group monthly"
        ],
        benefits: [
          "Reduced isolation",
          "Basic social support network",
          "Enhanced social confidence"
        ],
        xpRequired: 0
      },
      {
        level: 2,
        title: "Friend Cultivator",
        description: "Developing quality friendships",
        requirements: [
          "Have a meaningful conversation with a friend weekly",
          "Show up consistently for important events in friends' lives",
          "Initiate social gatherings or activities monthly"
        ],
        benefits: [
          "Reliable friendship circle",
          "Emotional support system",
          "Improved social skills"
        ],
        xpRequired: 1000
      },
      {
        level: 3,
        title: "Community Connector",
        description: "Creating a diverse community and meaningful friendships",
        requirements: [
          "Maintain regular contact with different social circles",
          "Engage in vulnerable conversations with close friends",
          "Participate actively in a community group or cause"
        ],
        benefits: [
          "Rich social network",
          "Deep, meaningful friendships",
          "Sense of community belonging"
        ],
        xpRequired: 3000
      },
      {
        level: 4,
        title: "Social Catalyst",
        description: "Building community and fostering connections between people",
        requirements: [
          "Introduce people who would benefit from knowing each other",
          "Take leadership roles in community groups or events",
          "Support friends through major life transitions"
        ],
        benefits: [
          "Ability to create community anywhere",
          "Significant positive social impact",
          "Deep, long-lasting friendships"
        ],
        xpRequired: 7000
      },
      {
        level: 5,
        title: "Community Leader",
        description: "Creating lasting social impact and cultivating deep relationships",
        requirements: [
          "Mentor others in building meaningful connections",
          "Create or lead initiatives that bring people together",
          "Maintain lifelong friendships across different life stages"
        ],
        benefits: [
          "Legacy of connection and community",
          "Meaningful impact on others' social wellbeing",
          "Rich network of deep relationships"
        ],
        xpRequired: 15000
      }
    ]
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "Your physical health, energy, and wellbeing",
    icon: "💪",
    color: "bg-green-500",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    levels: [
      {
        level: 1,
        title: "Health Beginner",
        description: "Building basic healthy habits",
        requirements: [
          "Move your body for 20+ minutes, 2-3 times per week",
          "Drink adequate water daily (8+ cups)",
          "Get 7+ hours of sleep most nights"
        ],
        benefits: [
          "Increased energy",
          "Better sleep quality",
          "Improved mood"
        ],
        xpRequired: 0
      },
      {
        level: 2,
        title: "Health Enthusiast",
        description: "Consistent healthy habits and fitness routine",
        requirements: [
          "Exercise 3-4 times per week for 30+ minutes",
          "Eat nutritious meals with vegetables daily",
          "Practice stress management technique weekly"
        ],
        benefits: [
          "Enhanced stamina",
          "Healthy weight management",
          "Reduced stress levels"
        ],
        xpRequired: 1000
      },
      {
        level: 3,
        title: "Fitness Achiever",
        description: "Well-rounded fitness and nutrition practices",
        requirements: [
          "Follow a structured exercise program 4-5 times weekly",
          "Balance nutrition with appropriate macronutrients",
          "Prioritize both activity and recovery"
        ],
        benefits: [
          "Strong physical capacity",
          "Notable fitness improvements",
          "Healthy relationship with food"
        ],
        xpRequired: 3000
      },
      {
        level: 4,
        title: "Wellness Optimizer",
        description: "Advanced fitness and comprehensive wellness practices",
        requirements: [
          "Train with specific performance goals in mind",
          "Optimize nutrition for your specific needs",
          "Integrate mobility, strength, cardio and recovery practices"
        ],
        benefits: [
          "Athletic performance",
          "Resistance to illness and injury",
          "Quick recovery from setbacks"
        ],
        xpRequired: 7000
      },
      {
        level: 5,
        title: "Vitality Master",
        description: "Mastery of physical wellness and longevity practices",
        requirements: [
          "Maintain elite-level fitness appropriate for your age",
          "Practice advanced recovery and longevity techniques",
          "Inspire or guide others in their fitness journey"
        ],
        benefits: [
          "Exceptional physical capacity for your age",
          "Optimal health markers",
          "Vibrant energy and vitality"
        ],
        xpRequired: 15000
      }
    ]
  },
  {
    id: "finance",
    name: "Finance",
    description: "Your financial health, security, and relationship with money",
    icon: "💰",
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    hoverColor: "hover:bg-yellow-100",
    textColor: "text-yellow-700",
    levels: [
      {
        level: 1,
        title: "Financial Tracker",
        description: "Building financial awareness and basic habits",
        requirements: [
          "Track all expenses for a month",
          "Create a basic budget for essential categories",
          "Save a small percentage of income regularly"
        ],
        benefits: [
          "Financial awareness",
          "Reduced money stress",
          "Beginning saving habit"
        ],
        xpRequired: 0
      },
      {
        level: 2,
        title: "Financial Stabilizer",
        description: "Creating financial stability and reducing debt",
        requirements: [
          "Build an emergency fund covering 1-3 months of expenses",
          "Create a debt reduction plan (if applicable)",
          "Save 10-15% of income consistently"
        ],
        benefits: [
          "Financial buffer for emergencies",
          "Decreasing debt burden",
          "Growing financial confidence"
        ],
        xpRequired: 1000
      },
      {
        level: 3,
        title: "Financial Builder",
        description: "Building wealth and strategic money management",
        requirements: [
          "Maintain 3-6 months of expenses in emergency savings",
          "Invest regularly in retirement accounts",
          "Make strategic decisions on major expenses (housing, transportation)"
        ],
        benefits: [
          "Growing net worth",
          "Long-term financial security",
          "Confidence in financial decisions"
        ],
        xpRequired: 3000
      },
      {
        level: 4,
        title: "Financial Strategist",
        description: "Optimizing wealth and creating multiple income streams",
        requirements: [
          "Create and maintain multiple income streams",
          "Optimize tax strategy and investment allocation",
          "Develop a comprehensive financial plan for major life goals"
        ],
        benefits: [
          "Financial resilience through diverse income",
          "Optimized returns on investments",
          "Clear path to major financial goals"
        ],
        xpRequired: 7000
      },
      {
        level: 5,
        title: "Financial Freedom Master",
        description: "Achieving financial independence and legacy planning",
        requirements: [
          "Create passive income exceeding essential expenses",
          "Develop estate and legacy planning",
          "Strategically share wealth and financial wisdom"
        ],
        benefits: [
          "Financial independence",
          "Freedom of time and choice",
          "Ability to create multi-generational impact"
        ],
        xpRequired: 15000
      }
    ]
  },
  {
    id: "fun",
    name: "Fun",
    description: "Your enjoyment of life, play, and capacity for joy",
    icon: "🎮",
    color: "bg-pink-500",
    bgColor: "bg-pink-50",
    hoverColor: "hover:bg-pink-100",
    textColor: "text-pink-700",
    levels: [
      {
        level: 1,
        title: "Joy Seeker",
        description: "Rediscovering play and enjoyment in life",
        requirements: [
          "Schedule enjoyable activities at least once a week",
          "Try a new hobby or fun experience monthly",
          "Take breaks during work for small moments of enjoyment"
        ],
        benefits: [
          "Reduced stress levels",
          "Increased moments of joy",
          "Better work-life balance"
        ],
        xpRequired: 0
      },
      {
        level: 2,
        title: "Fun Enthusiast",
        description: "Creating regular joy and developing hobbies",
        requirements: [
          "Engage in activities purely for enjoyment multiple times weekly",
          "Develop skill in at least one enjoyable hobby or activity",
          "Plan occasional adventures or novel experiences"
        ],
        benefits: [
          "Regular experiences of joy",
          "Enhanced creativity",
          "Recovery from work stress"
        ],
        xpRequired: 1000
      },
      {
        level: 3,
        title: "Play Expert",
        description: "Integrating play and joyful living into daily life",
        requirements: [
          "Find elements of play and enjoyment in everyday tasks",
          "Share fun experiences with others regularly",
          "Cultivate multiple sources of recreation and joy"
        ],
        benefits: [
          "Frequent flow state experiences",
          "Resilience through playfulness",
          "Joyful approach to life challenges"
        ],
        xpRequired: 3000
      },
      {
        level: 4,
        title: "Joy Creator",
        description: "Creating memorable experiences and spreading joy",
        requirements: [
          "Create special experiences or adventures for yourself and others",
          "Achieve advanced skill in recreational pursuits",
          "Find joy across diverse life circumstances"
        ],
        benefits: [
          "Ability to create joy in any situation",
          "Rich memory creation",
          "Inspiring others toward more enjoyment"
        ],
        xpRequired: 7000
      },
      {
        level: 5,
        title: "Life Enthusiast",
        description: "Mastering the art of joyful, playful living",
        requirements: [
          "Embody playfulness as a way of being in the world",
          "Create traditions and experiences with lasting impact",
          "Find profound joy in ordinary moments"
        ],
        benefits: [
          "Life characterized by enthusiasm and wonder",
          "Legacy of joyful experiences with others",
          "Profound appreciation for life's journey"
        ],
        xpRequired: 15000
      }
    ]
  },
  {
    id: "focus",
    name: "Focus",
    description: "Your work, professional growth, and contribution through skills",
    icon: "🎯",
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    hoverColor: "hover:bg-orange-100",
    textColor: "text-orange-700",
    levels: [
      {
        level: 1,
        title: "Skill Builder",
        description: "Developing core skills and direction",
        requirements: [
          "Identify key skills for your chosen path",
          "Dedicate 2-3 hours weekly to skill development",
          "Complete projects that demonstrate your abilities"
        ],
        benefits: [
          "Growing competence in chosen field",
          "Clearer professional direction",
          "Portfolio of completed work"
        ],
        xpRequired: 0
      },
      {
        level: 2,
        title: "Professional Performer",
        description: "Consistent professional performance and growth",
        requirements: [
          "Exceed basic expectations in your work",
          "Seek and apply feedback to improve performance",
          "Develop professional network and relationships"
        ],
        benefits: [
          "Recognition for reliable performance",
          "Professional growth opportunities",
          "Expanding professional network"
        ],
        xpRequired: 1000
      },
      {
        level: 3,
        title: "Domain Expert",
        description: "Developing expertise and beginning to lead",
        requirements: [
          "Develop specialized knowledge in your field",
          "Mentor others in your areas of expertise",
          "Take on challenging projects that stretch your abilities"
        ],
        benefits: [
          "Recognition as a subject matter expert",
          "Increased autonomy in work",
          "Ability to solve complex domain problems"
        ],
        xpRequired: 3000
      },
      {
        level: 4,
        title: "Field Leader",
        description: "Leading in your field and creating significant impact",
        requirements: [
          "Lead initiatives with substantial responsibility",
          "Develop innovative approaches in your domain",
          "Build and lead effective teams or collaborations"
        ],
        benefits: [
          "Significant professional influence",
          "Creation of innovative solutions",
          "Legacy of meaningful work products"
        ],
        xpRequired: 7000
      },
      {
        level: 5,
        title: "Visionary Contributor",
        description: "Creating transformative impact through your work",
        requirements: [
          "Pioneer new approaches in your field",
          "Create opportunities and advancement for others",
          "Leave a lasting positive impact through your work"
        ],
        benefits: [
          "Transformative impact on your domain",
          "Professional fulfillment and meaning",
          "Legacy that continues beyond your direct involvement"
        ],
        xpRequired: 15000
      }
    ]
  }
];