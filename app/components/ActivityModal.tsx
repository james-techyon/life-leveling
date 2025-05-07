"use client";

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { FulfillmentArea } from '../models/fulfillment';
import { AreaProgress, UserState } from '../models/user';
import { Activity, getActivitiesByArea } from '../models/activities';
import { formatDate } from '../lib/utils';
import { motion } from 'framer-motion';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  area: FulfillmentArea;
  progress: AreaProgress;
  userData: UserState;
  onUpdateUserData: (userData: UserState) => void;
}

export default function ActivityModal({
  isOpen,
  onClose,
  area,
  progress,
  userData,
  onUpdateUserData
}: ActivityModalProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [reflection, setReflection] = useState<string>('');
  const [proof, setProof] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const areaActivities = getActivitiesByArea(area.id);
      setActivities(areaActivities);
    }
  }, [isOpen, area.id]);

  const handleCompleteActivity = (activity: Activity) => {
    if (activity.requiresReflection || activity.requiresProof) {
      setSelectedActivity(activity);
    } else {
      completeActivity(activity);
    }
  };

  const completeActivity = (activity: Activity, reflection = '', proof = '') => {
    // Create a new activity completion
    const now = new Date().toISOString();
    const newCompletion = {
      id: `${Date.now()}`,
      activityId: activity.id,
      date: now,
      areaId: activity.areaId,
      experienceGained: activity.xpReward,
      reflection,
      proof,
      tags: activity.tags,
    };

    // Update area progress
    const updatedProgress = userData.progress.map(p => {
      if (p.areaId === area.id) {
        const newXP = p.experience + activity.xpReward;
        return {
          ...p,
          experience: newXP,
          lastCheckin: now,
          streakDays: p.streakDays + 1,
        };
      }
      return p;
    });

    // Update user data
    const updatedUserData = {
      ...userData,
      progress: updatedProgress,
      activityHistory: [...userData.activityHistory, newCompletion],
      profile: {
        ...userData.profile,
        streak: userData.profile.streak + 1,
        lastActive: now,
      },
    };

    onUpdateUserData(updatedUserData);
    setSelectedActivity(null);
    setReflection('');
    setProof('');
  };

  const handleSubmitCompletion = () => {
    if (!selectedActivity) return;

    if (selectedActivity.requiresReflection && !reflection) {
      alert('Please add a reflection before completing this activity');
      return;
    }

    if (selectedActivity.requiresProof && !proof) {
      alert('Please provide proof before completing this activity');
      return;
    }

    completeActivity(selectedActivity, reflection, proof);
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'available') return activity.level <= progress.currentLevel;
    if (filter === 'next-level') return activity.level === progress.currentLevel + 1;
    if (filter === 'daily') return activity.frequency === 'daily';
    if (filter === 'weekly') return activity.frequency === 'weekly';
    if (filter === 'monthly') return activity.frequency === 'monthly';
    return true;
  });

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-lg bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
          <div className={`p-4 ${area.color} text-white`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{area.icon}</span>
                <Dialog.Title className="text-lg font-bold">
                  {area.name} Activities
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
          
          {selectedActivity ? (
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Complete Activity: {selectedActivity.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {selectedActivity.description}
              </p>
              
              {selectedActivity.requiresReflection && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reflection (required)
                  </label>
                  <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="Share your thoughts about this activity..."
                  />
                </div>
              )}
              
              {selectedActivity.requiresProof && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Proof (required)
                  </label>
                  <input
                    type="text"
                    value={proof}
                    onChange={(e) => setProof(e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 dark:bg-gray-700 dark:text-white"
                    placeholder="Link to image or brief description of your completion"
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitCompletion}
                  className={`px-4 py-2 rounded-md text-white ${area.color} hover:opacity-90`}
                >
                  Complete (+{selectedActivity.xpReward} XP)
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === 'all'
                      ? `${area.color} text-white`
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('available')}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === 'available'
                      ? `${area.color} text-white`
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Available Now
                </button>
                <button
                  onClick={() => setFilter('next-level')}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === 'next-level'
                      ? `${area.color} text-white`
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Next Level
                </button>
                <button
                  onClick={() => setFilter('daily')}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === 'daily'
                      ? `${area.color} text-white`
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setFilter('weekly')}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === 'weekly'
                      ? `${area.color} text-white`
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setFilter('monthly')}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === 'monthly'
                      ? `${area.color} text-white`
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Monthly
                </button>
              </div>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 rounded-lg border ${
                        activity.level <= progress.currentLevel
                          ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {activity.name}
                        </h3>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.level <= progress.currentLevel
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            Level {activity.level}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {activity.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs dark:bg-blue-900/30 dark:text-blue-300">
                          {activity.duration} min
                        </span>
                        <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs dark:bg-purple-900/30 dark:text-purple-300">
                          {activity.frequency}
                        </span>
                        {activity.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs dark:bg-gray-800 dark:text-gray-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          +{activity.xpReward} XP
                        </span>
                        
                        <button
                          onClick={() => handleCompleteActivity(activity)}
                          disabled={activity.level > progress.currentLevel}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                            activity.level <= progress.currentLevel
                              ? `${area.color} text-white hover:opacity-90`
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                          }`}
                        >
                          {activity.level <= progress.currentLevel ? 'Complete' : 'Locked'}
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400">No activities match your filter</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}