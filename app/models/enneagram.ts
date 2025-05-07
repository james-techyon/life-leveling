export interface EnneagramType {
  id: number;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  growthPath: {
    low: string;
    medium: string;
    high: string;
  };
  lifeAreas: {
    [key: string]: {
      strength: string;
      challenge: string;
      growthTip: string;
    };
  };
}

export const enneagramTypes: EnneagramType[] = [
  {
    id: 1,
    name: "The Reformer",
    description: "Principled, purposeful, self-controlled, and perfectionistic",
    strengths: ["Ethical", "Reliable", "Productive", "Wise", "Idealistic"],
    challenges: ["Perfectionism", "Critical attitude", "Impatience"],
    growthPath: {
      low: "Overly critical and judgmental of self and others",
      medium: "Working on balancing high standards with self-acceptance",
      high: "Accepting imperfection while maintaining integrity"
    },
    lifeAreas: {
      faith: {
        strength: "Strong moral compass and principles",
        challenge: "Rigidity in beliefs and practices",
        growthTip: "Explore contemplative practices that emphasize grace over perfection"
      },
      family: {
        strength: "Responsible and dependable family member",
        challenge: "May be overly critical of family members",
        growthTip: "Practice appreciation and celebrate small wins in family life"
      },
      friends: {
        strength: "Loyal and principled friend",
        challenge: "May hold friends to impossibly high standards",
        growthTip: "Practice accepting friends as they are, not as they 'should be'"
      },
      fitness: {
        strength: "Disciplined approach to health",
        challenge: "Can be too rigid with fitness regimens",
        growthTip: "Incorporate play and joy into physical activities"
      },
      finance: {
        strength: "Excellent at budgeting and financial planning",
        challenge: "May be overly frugal or anxious about spending",
        growthTip: "Set aside a 'fun fund' for spontaneous, guilt-free spending"
      },
      fun: {
        strength: "Can find fulfillment in structured recreational activities",
        challenge: "Difficulty relaxing and enjoying the moment",
        growthTip: "Schedule unstructured time for spontaneity and play"
      },
      focus: {
        strength: "Highly productive and quality-oriented",
        challenge: "Workaholic tendencies and difficulty delegating",
        growthTip: "Practice the 'good enough' principle for appropriate tasks"
      }
    }
  },
  {
    id: 2,
    name: "The Helper",
    description: "Generous, demonstrative, people-pleasing, and possessive",
    strengths: ["Caring", "Interpersonal", "Generous", "Supportive", "Empathetic"],
    challenges: ["Need for appreciation", "Difficulty prioritizing self", "Boundary issues"],
    growthPath: {
      low: "Self-worth dependent on helping others with poor boundaries",
      medium: "Learning to balance helping others with self-care",
      high: "Genuinely altruistic with healthy boundaries"
    },
    lifeAreas: {
      faith: {
        strength: "Deep connection to faith communities and service",
        challenge: "May use spirituality to feel needed or valued",
        growthTip: "Explore spiritual practices that focus on receiving rather than giving"
      },
      family: {
        strength: "Nurturing and attentive to family needs",
        challenge: "May neglect own needs while caring for family",
        growthTip: "Communicate personal needs directly rather than expecting others to notice"
      },
      friends: {
        strength: "Supportive and empathetic friend",
        challenge: "May give too much and feel resentful when not reciprocated",
        growthTip: "Practice stating your own needs in friendships"
      },
      fitness: {
        strength: "Can be motivated by group activities",
        challenge: "May prioritize others' wellness over own health",
        growthTip: "Treat personal fitness as a non-negotiable appointment with yourself"
      },
      finance: {
        strength: "Generous and good at managing household finances",
        challenge: "May overspend on others or have difficulty saying no",
        growthTip: "Create a personal spending category in your budget specifically for yourself"
      },
      fun: {
        strength: "Enjoys creating fun experiences for others",
        challenge: "May not know what activities you personally enjoy",
        growthTip: "Regularly try new activities alone to discover your personal preferences"
      },
      focus: {
        strength: "Excellent team player and collaborator",
        challenge: "May take on others' work or problems",
        growthTip: "Practice saying 'no' to requests that aren't your responsibility"
      }
    }
  },
  {
    id: 3,
    name: "The Achiever",
    description: "Adaptable, excelling, driven, and image-conscious",
    strengths: ["Ambitious", "Competent", "Adaptable", "Energetic", "Self-assured"],
    challenges: ["Image focus", "Workaholism", "Competitive attitude"],
    growthPath: {
      low: "Overidentification with achievements and external validation",
      medium: "Beginning to balance success with authenticity",
      high: "Authentic success aligned with true self and values"
    },
    lifeAreas: {
      faith: {
        strength: "Can excel at spiritual practices and commitments",
        challenge: "May focus on appearance of spirituality rather than depth",
        growthTip: "Practice spiritual disciplines privately without sharing on social media"
      },
      family: {
        strength: "Provides well and creates successful family image",
        challenge: "May prioritize career over family time",
        growthTip: "Schedule non-negotiable family time with phones off"
      },
      friends: {
        strength: "Socially skilled and connects people",
        challenge: "May maintain friendships for status or utility",
        growthTip: "Cultivate friendships with people who know the 'real you'"
      },
      fitness: {
        strength: "Disciplined and goal-oriented in fitness",
        challenge: "May focus on appearance over health",
        growthTip: "Focus on performance goals rather than aesthetic ones"
      },
      finance: {
        strength: "Excellent at earning and building wealth",
        challenge: "May overspend on status symbols",
        growthTip: "Align financial goals with personal values rather than appearances"
      },
      fun: {
        strength: "Enjoys high-energy, exciting activities",
        challenge: "May turn recreation into another competition",
        growthTip: "Try activities where there is no 'winning' or external validation"
      },
      focus: {
        strength: "Highly productive and successful",
        challenge: "Workaholism and difficulty relaxing",
        growthTip: "Define success in terms of work-life balance, not just achievements"
      }
    }
  },
  {
    id: 4,
    name: "The Individualist",
    description: "Expressive, dramatic, self-absorbed, and temperamental",
    strengths: ["Creative", "Intuitive", "Authentic", "Compassionate", "Expressive"],
    challenges: ["Emotional turbulence", "Envy", "Self-absorption"],
    growthPath: {
      low: "Dwelling in emotional depths and feeling misunderstood",
      medium: "Working through emotional patterns with self-awareness",
      high: "Transforming personal pain into universal compassion"
    },
    lifeAreas: {
      faith: {
        strength: "Deep spiritual sensitivity and authenticity",
        challenge: "May feel spiritually inadequate or different",
        growthTip: "Connect with spiritual traditions that honor individual experience"
      },
      family: {
        strength: "Brings emotional depth and authenticity to family",
        challenge: "May create drama or withdraw emotionally",
        growthTip: "Practice maintaining consistent presence even when emotions fluctuate"
      },
      friends: {
        strength: "Deep, meaningful connections with select friends",
        challenge: "May idealize then devalue friendships",
        growthTip: "Recognize that all relationships have ordinary aspects alongside special ones"
      },
      fitness: {
        strength: "Can connect deeply with meaningful physical practices",
        challenge: "Inconsistent motivation based on emotional state",
        growthTip: "Find physical activities that express emotions constructively"
      },
      finance: {
        strength: "May excel in creative financial pursuits",
        challenge: "Emotional spending or financial self-sabotage",
        growthTip: "Create an automated financial plan that doesn't require daily emotional energy"
      },
      fun: {
        strength: "Rich imagination and appreciation for beauty",
        challenge: "May feel others have more fun or better experiences",
        growthTip: "Practice appreciating ordinary moments without comparing to ideals"
      },
      focus: {
        strength: "Creative excellence and unique contributions",
        challenge: "Productivity fluctuates with emotional state",
        growthTip: "Establish routine elements in work that continue regardless of feelings"
      }
    }
  },
  {
    id: 5,
    name: "The Investigator",
    description: "Perceptive, innovative, secretive, and isolated",
    strengths: ["Analytical", "Perceptive", "Independent", "Innovative", "Objective"],
    challenges: ["Detachment", "Isolation", "Knowledge hoarding"],
    growthPath: {
      low: "Withdrawing and hoarding knowledge as security",
      medium: "Starting to engage more with the world while maintaining boundaries",
      high: "Sharing wisdom generously while staying grounded"
    },
    lifeAreas: {
      faith: {
        strength: "Deep intellectual understanding of spiritual concepts",
        challenge: "May intellectualize rather than experience spirituality",
        growthTip: "Engage in embodied spiritual practices like walking meditation"
      },
      family: {
        strength: "Provides thoughtful insights and respects autonomy",
        challenge: "May be emotionally distant or overly private",
        growthTip: "Share one personal thought or feeling daily with family members"
      },
      friends: {
        strength: "Loyal and thought-provoking companion",
        challenge: "May maintain excessive privacy or independence",
        growthTip: "Initiate social contact rather than waiting to be approached"
      },
      fitness: {
        strength: "Methodical, research-based approach to health",
        challenge: "May live too much in the head, neglecting the body",
        growthTip: "Choose physical activities that require full presence (rock climbing, martial arts)"
      },
      finance: {
        strength: "Thoughtful financial planning and minimalism",
        challenge: "May hoard resources or information",
        growthTip: "Practice financial generosity while maintaining security"
      },
      fun: {
        strength: "Rich inner world and specialized interests",
        challenge: "May avoid group activities or new experiences",
        growthTip: "Schedule regular novel experiences outside your comfort zone"
      },
      focus: {
        strength: "Deep expertise and innovative thinking",
        challenge: "May get lost in analysis or work in isolation",
        growthTip: "Regularly share works-in-progress for feedback"
      }
    }
  },
  {
    id: 6,
    name: "The Loyalist",
    description: "Engaging, responsible, anxious, and suspicious",
    strengths: ["Loyal", "Responsible", "Vigilant", "Committed", "Troubleshooting"],
    challenges: ["Anxiety", "Doubt", "Worst-case thinking"],
    growthPath: {
      low: "Overwhelmed by anxiety, doubt, and worst-case scenarios",
      medium: "Developing courage and trust in self and others",
      high: "Courageous, trusting, and secure in uncertainties"
    },
    lifeAreas: {
      faith: {
        strength: "Committed to spiritual communities and traditions",
        challenge: "May struggle with doubt or rigid certainty",
        growthTip: "Practice embracing paradox and mystery in spiritual life"
      },
      family: {
        strength: "Loyal and protective of family members",
        challenge: "May project anxieties onto family situations",
        growthTip: "Notice when you're catastrophizing family issues and practice reality-testing"
      },
      friends: {
        strength: "Reliable, committed friend",
        challenge: "May test loyalty or question others' motives",
        growthTip: "Practice giving others the benefit of the doubt"
      },
      fitness: {
        strength: "Consistency in established health routines",
        challenge: "May worry excessively about health issues",
        growthTip: "Use physical activity as a way to discharge anxiety and build confidence"
      },
      finance: {
        strength: "Prudent financial management and planning",
        challenge: "Financial anxiety despite adequate resources",
        growthTip: "Create worst-case scenario plans to alleviate anxiety, then trust the plan"
      },
      fun: {
        strength: "Enjoys familiar activities with trusted people",
        challenge: "May avoid new experiences due to anxiety",
        growthTip: "Take small, incremental steps outside comfort zone with trusted companions"
      },
      focus: {
        strength: "Excellent at anticipating problems and preparing",
        challenge: "May get stuck in analysis paralysis",
        growthTip: "Set time limits for decision-making processes"
      }
    }
  },
  {
    id: 7,
    name: "The Enthusiast",
    description: "Spontaneous, versatile, acquisitive, and scattered",
    strengths: ["Enthusiastic", "Optimistic", "Versatile", "Adventurous", "Productive"],
    challenges: ["Commitment issues", "Distraction", "Excessive planning"],
    growthPath: {
      low: "Constant distraction and escape from pain through new experiences",
      medium: "Learning to stay present and commit to worthwhile pursuits",
      high: "Finding joy in depth rather than breadth of experience"
    },
    lifeAreas: {
      faith: {
        strength: "Enthusiastic exploration of spiritual ideas",
        challenge: "May jump between spiritual practices without depth",
        growthTip: "Commit to one spiritual tradition or practice for at least a year"
      },
      family: {
        strength: "Brings fun, spontaneity and optimism to family",
        challenge: "May avoid difficult family emotions or commitments",
        growthTip: "Practice staying present during challenging family conversations"
      },
      friends: {
        strength: "Fun, engaging, and connected to diverse groups",
        challenge: "May maintain surface-level connections with many",
        growthTip: "Deepen select friendships through vulnerability and presence"
      },
      fitness: {
        strength: "Enjoys variety in physical activities",
        challenge: "May jump between fitness trends without consistency",
        growthTip: "Commit to a core routine while allowing for variety in additional activities"
      },
      finance: {
        strength: "Creative about generating income",
        challenge: "Impulsive spending or chasing opportunities",
        growthTip: "Implement a 48-hour rule before making non-routine purchases"
      },
      fun: {
        strength: "Natural talent for finding enjoyment and adventure",
        challenge: "May use fun to escape responsibilities or difficult emotions",
        growthTip: "Practice finding joy in necessary, mundane activities"
      },
      focus: {
        strength: "Innovative, quick-thinking, and multi-talented",
        challenge: "Difficulty completing projects and following through",
        growthTip: "Limit yourself to three major projects at once"
      }
    }
  },
  {
    id: 8,
    name: "The Challenger",
    description: "Self-confident, decisive, willful, and confrontational",
    strengths: ["Powerful", "Decisive", "Protective", "Straightforward", "Self-confident"],
    challenges: ["Control issues", "Excessive force", "Intimidation"],
    growthPath: {
      low: "Using force and intimidation to maintain control",
      medium: "Balancing strength with vulnerability and compassion",
      high: "Using power to protect and empower others"
    },
    lifeAreas: {
      faith: {
        strength: "Strong conviction and protection of beliefs",
        challenge: "May resist spiritual surrender or vulnerability",
        growthTip: "Explore contemplative practices that invite divine strength through surrender"
      },
      family: {
        strength: "Protective and provides for family needs",
        challenge: "May be domineering or intimidating to family members",
        growthTip: "Practice listening fully before responding to family concerns"
      },
      friends: {
        strength: "Loyal and protective of friends",
        challenge: "May dominate social situations or challenge others",
        growthTip: "Practice making space for quieter voices in social settings"
      },
      fitness: {
        strength: "Powerful, determined approach to physical goals",
        challenge: "May push body too hard or ignore limitations",
        growthTip: "Incorporate recovery and gentler practices like yoga into fitness routine"
      },
      finance: {
        strength: "Bold financial decisions and resource control",
        challenge: "May take excessive risks or be controlling with shared resources",
        growthTip: "Practice transparent financial decision-making with stakeholders"
      },
      fun: {
        strength: "Enjoys intense, engaging experiences",
        challenge: "May turn recreation into domination or competition",
        growthTip: "Try activities where you must follow others' lead or collaborate equally"
      },
      focus: {
        strength: "Powerful leadership and decisive action",
        challenge: "May intimidate colleagues or take over projects",
        growthTip: "Practice delegating important tasks and trusting others' methods"
      }
    }
  },
  {
    id: 9,
    name: "The Peacemaker",
    description: "Receptive, reassuring, complacent, and resigned",
    strengths: ["Peaceful", "Supportive", "Accepting", "Mediating", "Patient"],
    challenges: ["Conflict avoidance", "Self-forgetting", "Inertia"],
    growthPath: {
      low: "Avoiding conflict and merging with others' agendas",
      medium: "Developing self-awareness and personal priorities",
      high: "Maintaining inner peace while assertively engaging with life"
    },
    lifeAreas: {
      faith: {
        strength: "Natural spiritual receptivity and acceptance",
        challenge: "May go along with group's spiritual practices without personal connection",
        growthTip: "Regularly reflect on and articulate your personal spiritual beliefs"
      },
      family: {
        strength: "Creates harmony and accepts family members",
        challenge: "May avoid necessary family conflicts or boundaries",
        growthTip: "Practice stating personal needs and boundaries clearly to family members"
      },
      friends: {
        strength: "Easy-going and supportive friend",
        challenge: "May merge with friends' agendas, losing own preferences",
        growthTip: "Before social events, decide on your preferences and express them"
      },
      fitness: {
        strength: "Balanced, sustainable approach when engaged",
        challenge: "May neglect physical needs or fall into inertia",
        growthTip: "Use accountability partners or schedules to maintain physical practice"
      },
      finance: {
        strength: "Balanced approach to spending and saving",
        challenge: "May procrastinate on financial decisions or planning",
        growthTip: "Set up automatic systems for financial management and regular review dates"
      },
      fun: {
        strength: "Relaxed enjoyment of simple pleasures",
        challenge: "May default to passive entertainment or others' preferences",
        growthTip: "Regularly initiate activities that you personally find energizing"
      },
      focus: {
        strength: "Harmonious work style and mediation skills",
        challenge: "May avoid difficult tasks or asserting priorities",
        growthTip: "Start each day by identifying and tackling your most important task first"
      }
    }
  }
];

export const getEnneagramTypeById = (id: number) => {
  return enneagramTypes.find(type => type.id === id) || enneagramTypes[0];
};

export const getEnneagramDescription = (id: number) => {
  const type = getEnneagramTypeById(id);
  return `Type ${id}: ${type.name} - ${type.description}`;
};

export const getGrowthSuggestions = (typeId: number, areaId?: string) => {
  const type = getEnneagramTypeById(typeId);
  
  if (areaId && type.lifeAreas[areaId]) {
    return [type.lifeAreas[areaId].growthTip];
  }
  
  // Return all area growth tips if no specific area is specified
  return Object.values(type.lifeAreas).map(area => area.growthTip);
};