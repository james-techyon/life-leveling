// Enneagram Types and their descriptions
export const enneagramTypes = [
  {
    id: 1,
    name: "The Reformer",
    description: "Principled, purposeful, self-controlled, and perfectionistic",
    strengths: ["Ethical", "Reliable", "Productive", "Wise", "Idealistic"],
    growthAreas: ["Perfectionism", "Critical attitude", "Impatience"],
    leveling: {
      low: "Overly critical and judgmental of self and others",
      medium: "Working on balancing high standards with self-acceptance",
      high: "Accepting imperfection while maintaining integrity"
    }
  },
  {
    id: 2,
    name: "The Helper",
    description: "Generous, demonstrative, people-pleasing, and possessive",
    strengths: ["Caring", "Interpersonal", "Generous", "Supportive", "Empathetic"],
    growthAreas: ["Need for appreciation", "Difficulty prioritizing self", "Boundary issues"],
    leveling: {
      low: "Self-worth dependent on helping others with poor boundaries",
      medium: "Learning to balance helping others with self-care",
      high: "Genuinely altruistic with healthy boundaries"
    }
  },
  {
    id: 3,
    name: "The Achiever",
    description: "Adaptable, excelling, driven, and image-conscious",
    strengths: ["Ambitious", "Competent", "Adaptable", "Energetic", "Self-assured"],
    growthAreas: ["Image focus", "Workaholism", "Competitive attitude"],
    leveling: {
      low: "Overidentification with achievements and external validation",
      medium: "Beginning to balance success with authenticity",
      high: "Authentic success aligned with true self and values"
    }
  },
  {
    id: 4,
    name: "The Individualist",
    description: "Expressive, dramatic, self-absorbed, and temperamental",
    strengths: ["Creative", "Intuitive", "Authentic", "Compassionate", "Expressive"],
    growthAreas: ["Emotional turbulence", "Envy", "Self-absorption"],
    leveling: {
      low: "Dwelling in emotional depths and feeling misunderstood",
      medium: "Working through emotional patterns with self-awareness",
      high: "Transforming personal pain into universal compassion"
    }
  },
  {
    id: 5,
    name: "The Investigator",
    description: "Perceptive, innovative, secretive, and isolated",
    strengths: ["Analytical", "Perceptive", "Independent", "Innovative", "Objective"],
    growthAreas: ["Detachment", "Isolation", "Knowledge hoarding"],
    leveling: {
      low: "Withdrawing and hoarding knowledge as security",
      medium: "Starting to engage more with the world while maintaining boundaries",
      high: "Sharing wisdom generously while staying grounded"
    }
  },
  {
    id: 6,
    name: "The Loyalist",
    description: "Engaging, responsible, anxious, and suspicious",
    strengths: ["Loyal", "Responsible", "Vigilant", "Committed", "Troubleshooting"],
    growthAreas: ["Anxiety", "Doubt", "Worst-case thinking"],
    leveling: {
      low: "Overwhelmed by anxiety, doubt, and worst-case scenarios",
      medium: "Developing courage and trust in self and others",
      high: "Courageous, trusting, and secure in uncertainties"
    }
  },
  {
    id: 7,
    name: "The Enthusiast",
    description: "Spontaneous, versatile, acquisitive, and scattered",
    strengths: ["Enthusiastic", "Optimistic", "Versatile", "Adventurous", "Productive"],
    growthAreas: ["Commitment issues", "Distraction", "Excessive planning"],
    leveling: {
      low: "Constant distraction and escape from pain through new experiences",
      medium: "Learning to stay present and commit to worthwhile pursuits",
      high: "Finding joy in depth rather than breadth of experience"
    }
  },
  {
    id: 8,
    name: "The Challenger",
    description: "Self-confident, decisive, willful, and confrontational",
    strengths: ["Powerful", "Decisive", "Protective", "Straightforward", "Self-confident"],
    growthAreas: ["Control issues", "Excessive force", "Intimidation"],
    leveling: {
      low: "Using force and intimidation to maintain control",
      medium: "Balancing strength with vulnerability and compassion",
      high: "Using power to protect and empower others"
    }
  },
  {
    id: 9,
    name: "The Peacemaker",
    description: "Receptive, reassuring, complacent, and resigned",
    strengths: ["Peaceful", "Supportive", "Accepting", "Mediating", "Patient"],
    growthAreas: ["Conflict avoidance", "Self-forgetting", "Inertia"],
    leveling: {
      low: "Avoiding conflict and merging with others' agendas",
      medium: "Developing self-awareness and personal priorities",
      high: "Maintaining inner peace while assertively engaging with life"
    }
  }
];

// Function to get enneagram type by ID
export const getEnneagramTypeById = (id: number) => {
  return enneagramTypes.find(type => type.id === id);
};

// Function to get growth suggestions based on enneagram type
export const getGrowthSuggestions = (typeId: number) => {
  const type = getEnneagramTypeById(typeId);
  if (!type) return [];
  
  const suggestions = {
    1: [
      "Practice self-compassion when mistakes occur",
      "Set aside time for relaxation without feeling guilty",
      "Celebrate small wins rather than focusing on what's still imperfect",
      "Use mindfulness to notice when perfectionism arises",
      "Practice saying 'good enough' when appropriate"
    ],
    2: [
      "Set boundaries on your time and emotional energy",
      "Practice asking for help when you need it",
      "Schedule regular self-care activities",
      "Reflect on your own needs before responding to others",
      "Practice saying no without explanation"
    ],
    3: [
      "Take time to explore who you are beyond achievements",
      "Practice being vulnerable with trusted friends",
      "Schedule regular reflection on personal values vs goals",
      "Take breaks from social media and external validation",
      "Celebrate efforts, not just results"
    ],
    4: [
      "Practice gratitude for what's present rather than what's missing",
      "Engage in regular reality-checking of emotional responses",
      "Commit to projects even when initial excitement fades",
      "Connect with others through shared experiences, not just differences",
      "Balance introspection with action"
    ],
    5: [
      "Practice sharing knowledge and insights with others",
      "Schedule regular social activities even when you don't feel like it",
      "Engage physically with the world through exercise or nature",
      "Practice being present in the moment rather than observing",
      "Express feelings directly instead of analyzing them"
    ],
    6: [
      "Practice mindfulness to stay present rather than worrying about the future",
      "List evidence against your worst-case scenarios",
      "Take small risks regularly to build confidence",
      "Develop self-trust through keeping promises to yourself",
      "Question authority in healthy ways"
    ],
    7: [
      "Practice staying with uncomfortable emotions rather than distracting yourself",
      "Commit to finishing projects before starting new ones",
      "Keep a journal of deeper insights from experiences",
      "Practice mindfulness to enjoy the present moment fully",
      "Develop routine and structure in at least one area of life"
    ],
    8: [
      "Practice expressing vulnerability with trusted individuals",
      "Notice impact of your energy on others",
      "Allow others to help and support you",
      "Practice active listening without interrupting",
      "Explore gentler ways to express power and influence"
    ],
    9: [
      "Practice stating your opinions and preferences clearly",
      "Set and work toward personal goals unrelated to others",
      "Notice when you're disengaging and choose to stay present",
      "Schedule regular check-ins with yourself about your priorities",
      "Practice making decisions without excessive deliberation"
    ]
  };
  
  return suggestions[typeId as keyof typeof suggestions] || [];
};