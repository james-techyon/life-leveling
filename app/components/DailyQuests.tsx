"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '../models/activities';
import { UserState } from '../models/user';
import { fulfillmentAreas } from '../models/fulfillment';

interface DailyQuestsProps {
  userData: UserState;
  onComplete: (activity: Activity, reflection?: string) => void;
}

export default function DailyQuests({ userData, onComplete }: DailyQuestsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dailyQuests, setDailyQuests] = useState<Activity[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Activity | null>(null);
  const [reflection, setReflection] = useState("");
  
  useEffect(() => {
    // In a real app, this would come from a backend API
    // For demo, generate 3 random daily quests
    const quests: Activity[] = [
      {
        id: 'daily-1',
        areaId: 'fitness',
        name: 'Morning Movement',
        description: 'Get your body moving for at least 10 minutes first thing in the morning',
        xpReward: 50,
        frequency: 'daily',
        duration: 10,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['morning', 'beginner', 'movement']
      },
      {
        id: 'daily-2',
        areaId: 'faith',
        name: 'Mindful Moment',
        description: 'Take 5 minutes to focus on your breath and practice mindfulness',
        xpReward: 40,
        frequency: 'daily',
        duration: 5,
        requiresProof: false,
        requiresReflection: true,
        level: 1,
        tags: ['mindfulness', 'quick', 'mental']
      },
      {
        id: 'daily-3',
        areaId: 'family',
        name: 'Connection Call',
        description: 'Call or text a family member to check in with them',
        xpReward: 60,
        frequency: 'daily',
        duration: 15,
        requiresProof: false,
        requiresReflection: false,
        level: 1,
        tags: ['connection', 'communication', 'relationships']
      }
    ];
    
    setDailyQuests(quests);
  }, []);
  
  const handleQuestClick = (quest: Activity) => {
    setSelectedQuest(quest);
  };
  
  const handleCompleteQuest = () => {
    if (!selectedQuest) return;
    
    if (selectedQuest.requiresReflection && !reflection) {
      alert('Please add a reflection before completing this quest');
      return;
    }
    
    onComplete(selectedQuest, selectedQuest.requiresReflection ? reflection : undefined);
    
    // Remove from daily quests
    setDailyQuests(dailyQuests.filter(q => q.id !== selectedQuest.id));
    
    // Reset
    setSelectedQuest(null);
    setReflection("");
  };
  
  const getAreaInfo = (areaId: string) => {
    return fulfillmentAreas.find(area => area.id === areaId) || fulfillmentAreas[0];
  };
  
  return (
    <motion.div 
      layout
      className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <div 
        className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 text-white cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚔️</span>
            <h3 className="text-lg font-bold">Daily Quests</h3>
            <span className="bg-white/20 text-white text-sm px-2 py-0.5 rounded-full">
              {dailyQuests.length} remaining
            </span>
          </div>
          <button>
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4">
              {selectedQuest ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getAreaInfo(selectedQuest.areaId).icon}</span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {selectedQuest.name}
                        </h3>
                      </div>
                      <button 
                        onClick={() => setSelectedQuest(null)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {selectedQuest.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {selectedQuest.duration} minutes
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +{selectedQuest.xpReward} XP
                      </span>
                    </div>
                    
                    {selectedQuest.requiresReflection && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Reflection (required)
                        </label>
                        <textarea
                          value={reflection}
                          onChange={(e) => setReflection(e.target.value)}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 dark:bg-gray-700 dark:text-white text-sm"
                          rows={3}
                          placeholder="Share your thoughts about this activity..."
                        />
                      </div>
                    )}
                    
                    <button
                      onClick={handleCompleteQuest}
                      className={`w-full py-2 rounded-md bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium ${
                        selectedQuest.requiresReflection && !reflection
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:from-amber-600 hover:to-orange-700'
                      }`}
                      disabled={selectedQuest.requiresReflection && !reflection}
                    >
                      Complete Quest
                    </button>
                  </div>
                </div>
              ) : dailyQuests.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Complete these quests to gain XP and maintain your streak!
                  </div>
                  
                  {dailyQuests.map((quest) => {
                    const area = getAreaInfo(quest.areaId);
                    
                    return (
                      <motion.div
                        key={quest.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:shadow cursor-pointer"
                        onClick={() => handleQuestClick(quest)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full ${area.color} flex items-center justify-center`}>
                              <span className="text-white text-lg">{area.icon}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                {quest.name}
                              </h4>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">
                                {quest.duration} min • +{quest.xpReward} XP
                              </p>
                            </div>
                          </div>
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"></div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    All Quests Complete!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    You've completed all your daily quests. Come back tomorrow for more!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}