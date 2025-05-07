"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import { UserState } from '../models/user';
import { fulfillmentAreas } from '../models/fulfillment';
import { formatDate } from '../lib/utils';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  duration: number; // in days
  areas: string[]; // area IDs
  requirements: {
    type: 'activities' | 'xp' | 'level';
    count: number;
    areaId?: string;
  }[];
  reward: {
    xp: number;
    badge?: string;
  };
  deadline?: string; // ISO date string
  progress: number; // 0-100
  isComplete: boolean;
}

interface QuestSystemProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserState;
  onUpdateUserData: (userData: UserState) => void;
}

// Quest data
const QUESTS: Quest[] = [
  {
    id: '1',
    title: 'Balanced Beginnings',
    description: 'Complete activities in each of the 7 life areas to create balance',
    difficulty: 'easy',
    duration: 7,
    areas: ['faith', 'family', 'friends', 'fitness', 'finance', 'fun', 'focus'],
    requirements: [
      { type: 'activities', count: 1, areaId: 'faith' },
      { type: 'activities', count: 1, areaId: 'family' },
      { type: 'activities', count: 1, areaId: 'friends' },
      { type: 'activities', count: 1, areaId: 'fitness' },
      { type: 'activities', count: 1, areaId: 'finance' },
      { type: 'activities', count: 1, areaId: 'fun' },
      { type: 'activities', count: 1, areaId: 'focus' }
    ],
    reward: {
      xp: 500,
      badge: '🌈'
    },
    progress: 43,
    isComplete: false
  },
  {
    id: '2',
    title: 'Fitness First',
    description: 'Focus on your physical health with consistent exercise',
    difficulty: 'medium',
    duration: 14,
    areas: ['fitness'],
    requirements: [
      { type: 'activities', count: 10, areaId: 'fitness' },
      { type: 'xp', count: 1000, areaId: 'fitness' }
    ],
    reward: {
      xp: 750,
      badge: '💪'
    },
    progress: 20,
    isComplete: false
  },
  {
    id: '3',
    title: 'Connection Champion',
    description: 'Strengthen your relationships with family and friends',
    difficulty: 'medium',
    duration: 21,
    areas: ['family', 'friends'],
    requirements: [
      { type: 'activities', count: 5, areaId: 'family' },
      { type: 'activities', count: 5, areaId: 'friends' },
      { type: 'level', count: 2, areaId: 'family' }
    ],
    reward: {
      xp: 1000,
      badge: '❤️'
    },
    progress: 0,
    isComplete: false
  },
  {
    id: '4',
    title: 'Financial Freedom',
    description: 'Take control of your finances and build stability',
    difficulty: 'hard',
    duration: 30,
    areas: ['finance'],
    requirements: [
      { type: 'activities', count: 15, areaId: 'finance' },
      { type: 'xp', count: 2000, areaId: 'finance' },
      { type: 'level', count: 3, areaId: 'finance' }
    ],
    reward: {
      xp: 1500,
      badge: '💰'
    },
    progress: 0,
    isComplete: false
  },
  {
    id: '5',
    title: 'Life Master',
    description: 'Achieve mastery across all areas of life',
    difficulty: 'epic',
    duration: 90,
    areas: ['faith', 'family', 'friends', 'fitness', 'finance', 'fun', 'focus'],
    requirements: [
      { type: 'level', count: 3, areaId: 'faith' },
      { type: 'level', count: 3, areaId: 'family' },
      { type: 'level', count: 3, areaId: 'friends' },
      { type: 'level', count: 3, areaId: 'fitness' },
      { type: 'level', count: 3, areaId: 'finance' },
      { type: 'level', count: 3, areaId: 'fun' },
      { type: 'level', count: 3, areaId: 'focus' }
    ],
    reward: {
      xp: 5000,
      badge: '👑'
    },
    progress: 10,
    isComplete: false
  }
];

export default function QuestSystem({
  isOpen,
  onClose,
  userData,
  onUpdateUserData
}: QuestSystemProps) {
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch quests from an API
    // For the demo, we'll just simulate some active and completed quests
    setActiveQuests([
      QUESTS[0],
      QUESTS[1]
    ]);
    
    setAvailableQuests([
      QUESTS[2],
      QUESTS[3]
    ]);
    
    setCompletedQuests([
      { ...QUESTS[4], progress: 100, isComplete: true }
    ]);
  }, []);
  
  const handleQuestAccept = (quest: Quest) => {
    // Add quest to active quests
    setActiveQuests([...activeQuests, quest]);
    
    // Remove from available quests
    setAvailableQuests(availableQuests.filter(q => q.id !== quest.id));
    
    // Close detail modal
    setIsDetailOpen(false);
  };
  
  const handleQuestAbandon = (quest: Quest) => {
    // Remove from active quests
    setActiveQuests(activeQuests.filter(q => q.id !== quest.id));
    
    // Add back to available quests
    setAvailableQuests([...availableQuests, quest]);
    
    // Close detail modal
    setIsDetailOpen(false);
  };
  
  const handleQuestClick = (quest: Quest) => {
    setSelectedQuest(quest);
    setIsDetailOpen(true);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'epic':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const getAreaById = (areaId: string) => {
    return fulfillmentAreas.find(area => area.id === areaId) || fulfillmentAreas[0];
  };
  
  return (
    <>
      <Dialog 
        open={isOpen} 
        onClose={onClose}
        className="relative z-40"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl w-full rounded-xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚔️</span>
                  <Dialog.Title className="text-xl font-bold">
                    Quest Journal
                  </Dialog.Title>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <Tab.Group>
              <Tab.List className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 px-4">
                <Tab className={({ selected }) =>
                  `py-3 px-4 text-sm font-medium border-b-2 ${
                    selected
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`
                }>
                  Active Quests ({activeQuests.length})
                </Tab>
                <Tab className={({ selected }) =>
                  `py-3 px-4 text-sm font-medium border-b-2 ${
                    selected
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`
                }>
                  Available Quests ({availableQuests.length})
                </Tab>
                <Tab className={({ selected }) =>
                  `py-3 px-4 text-sm font-medium border-b-2 ${
                    selected
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`
                }>
                  Completed ({completedQuests.length})
                </Tab>
              </Tab.List>
              
              <Tab.Panels className="p-4 max-h-[60vh] overflow-y-auto">
                <Tab.Panel>
                  <div className="space-y-4">
                    {activeQuests.length > 0 ? (
                      activeQuests.map((quest) => (
                        <motion.div
                          key={quest.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleQuestClick(quest)}
                          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                {quest.reward.badge && <span>{quest.reward.badge}</span>}
                                {quest.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {quest.description}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                              {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {quest.areas.map((areaId) => {
                              const area = getAreaById(areaId);
                              return (
                                <span key={areaId} className={`px-2 py-1 rounded-full text-xs ${area.bgColor} ${area.textColor}`}>
                                  {area.icon} {area.name}
                                </span>
                              );
                            })}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>Progress</span>
                              <span>{quest.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                              <div 
                                className="h-full bg-amber-500" 
                                style={{ width: `${quest.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No active quests. Start a new quest from the Available tab!</p>
                      </div>
                    )}
                  </div>
                </Tab.Panel>
                
                <Tab.Panel>
                  <div className="space-y-4">
                    {availableQuests.length > 0 ? (
                      availableQuests.map((quest) => (
                        <motion.div
                          key={quest.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleQuestClick(quest)}
                          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                {quest.reward.badge && <span>{quest.reward.badge}</span>}
                                {quest.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {quest.description}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                              {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {quest.areas.map((areaId) => {
                              const area = getAreaById(areaId);
                              return (
                                <span key={areaId} className={`px-2 py-1 rounded-full text-xs ${area.bgColor} ${area.textColor}`}>
                                  {area.icon} {area.name}
                                </span>
                              );
                            })}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-gray-600 dark:text-gray-400 text-sm">
                              <span className="font-medium text-amber-600 dark:text-amber-400">
                                +{quest.reward.xp} XP
                              </span>
                              <span className="mx-1">•</span>
                              <span>{quest.duration} days</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuestAccept(quest);
                              }}
                              className="px-3 py-1 rounded-md bg-amber-500 text-white text-sm hover:bg-amber-600"
                            >
                              Accept Quest
                            </button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No available quests at the moment. Check back later!</p>
                      </div>
                    )}
                  </div>
                </Tab.Panel>
                
                <Tab.Panel>
                  <div className="space-y-4">
                    {completedQuests.length > 0 ? (
                      completedQuests.map((quest) => (
                        <motion.div
                          key={quest.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleQuestClick(quest)}
                          className="p-4 rounded-lg border border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10 hover:shadow-md cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="text-green-600 dark:text-green-400">✓</span>
                                {quest.reward.badge && <span>{quest.reward.badge}</span>}
                                {quest.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {quest.description}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                              {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {quest.areas.map((areaId) => {
                              const area = getAreaById(areaId);
                              return (
                                <span key={areaId} className={`px-2 py-1 rounded-full text-xs ${area.bgColor} ${area.textColor}`}>
                                  {area.icon} {area.name}
                                </span>
                              );
                            })}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-gray-600 dark:text-gray-400 text-sm">
                              <span className="font-medium text-green-600 dark:text-green-400">
                                +{quest.reward.xp} XP earned
                              </span>
                            </div>
                            <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                              Completed
                            </span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">You haven't completed any quests yet. Get started with an active quest!</p>
                      </div>
                    )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>
      
      {selectedQuest && (
        <Dialog 
          open={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-lg w-full rounded-xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
              <div className={`p-4 ${
                selectedQuest.isComplete 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-600'
              } text-white`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedQuest.reward.badge || '⚔️'}</span>
                    <Dialog.Title className="text-xl font-bold">
                      {selectedQuest.title}
                    </Dialog.Title>
                  </div>
                  <button 
                    onClick={() => setIsDetailOpen(false)}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedQuest.description}
                  </p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(selectedQuest.difficulty)}`}>
                    {selectedQuest.difficulty.charAt(0).toUpperCase() + selectedQuest.difficulty.slice(1)}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedQuest.areas.map((areaId) => {
                    const area = getAreaById(areaId);
                    return (
                      <span key={areaId} className={`px-3 py-1 rounded-full text-sm ${area.bgColor} ${area.textColor}`}>
                        {area.icon} {area.name}
                      </span>
                    );
                  })}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quest Requirements</h3>
                    <ul className="space-y-3">
                      {selectedQuest.requirements.map((req, index) => {
                        const area = req.areaId ? getAreaById(req.areaId) : null;
                        return (
                          <li key={index} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              selectedQuest.isComplete 
                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                            }`}>
                              {selectedQuest.isComplete ? '✓' : (index + 1)}
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              {req.type === 'activities' ? `Complete ${req.count} activities` :
                               req.type === 'xp' ? `Earn ${req.count} XP` :
                               `Reach level ${req.count}`}
                              {area && ` in ${area.name}`}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quest Rewards</h3>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center gap-2">
                        <span className="text-amber-600 dark:text-amber-400">+{selectedQuest.reward.xp} XP</span>
                      </div>
                      {selectedQuest.reward.badge && (
                        <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center gap-2">
                          <span className="text-xl">{selectedQuest.reward.badge}</span>
                          <span className="text-blue-600 dark:text-blue-400">Badge</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!selectedQuest.isComplete && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quest Progress</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Completion</span>
                          <span>{selectedQuest.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                          <div 
                            className="h-full bg-amber-500" 
                            style={{ width: `${selectedQuest.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-900 flex justify-end space-x-3">
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Close
                </button>
                
                {!selectedQuest.isComplete && (
                  activeQuests.some(q => q.id === selectedQuest.id) ? (
                    <button
                      onClick={() => handleQuestAbandon(selectedQuest)}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                      Abandon Quest
                    </button>
                  ) : (
                    <button
                      onClick={() => handleQuestAccept(selectedQuest)}
                      className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600"
                    >
                      Accept Quest
                    </button>
                  )
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
}