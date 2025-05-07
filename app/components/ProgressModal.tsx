"use client";

import { useState, useEffect } from 'react';
import { Dialog, Tab } from '@headlessui/react';
import { FulfillmentArea } from '../models/fulfillment';
import { AreaProgress, ActivityCompletion, UserState } from '../models/user';
import { formatDate } from '../lib/utils';
import { motion } from 'framer-motion';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  area: FulfillmentArea;
  progress: AreaProgress;
  userData: UserState;
}

export default function ProgressModal({
  isOpen,
  onClose,
  area,
  progress,
  userData
}: ProgressModalProps) {
  const [activityHistory, setActivityHistory] = useState<ActivityCompletion[]>([]);
  
  useEffect(() => {
    if (isOpen) {
      // Filter activity history for this area
      const areaHistory = userData.activityHistory.filter(
        activity => activity.areaId === area.id
      );
      
      // Sort by date (newest first)
      areaHistory.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setActivityHistory(areaHistory);
    }
  }, [isOpen, area.id, userData.activityHistory]);
  
  // Group activities by month
  const groupedByMonth: Record<string, ActivityCompletion[]> = {};
  
  activityHistory.forEach(activity => {
    const date = new Date(activity.date);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    if (!groupedByMonth[monthYear]) {
      groupedByMonth[monthYear] = [];
    }
    
    groupedByMonth[monthYear].push(activity);
  });
  
  // Prepare data for visualization
  const currentLevelInfo = area.levels[progress.currentLevel - 1];
  const nextLevelInfo = area.levels[progress.currentLevel] || null;
  const percentToNextLevel = Math.min(
    100,
    Math.round((progress.experience / progress.experienceToNextLevel) * 100)
  );
  
  // Get dates for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });
  
  // Count activities per day for the last 7 days
  const activityCountByDay = last7Days.map(day => {
    return {
      date: day,
      count: activityHistory.filter(a => a.date.split('T')[0] === day).length,
      xp: activityHistory.filter(a => a.date.split('T')[0] === day)
        .reduce((sum, a) => sum + a.experienceGained, 0)
    };
  }).reverse();
  
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
                  {area.name} Progress
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
                    ? `border-${area.id}-500 text-${area.id}-600 dark:text-${area.id}-400`
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`
              }>
                Overview
              </Tab>
              <Tab className={({ selected }) =>
                `py-3 px-4 text-sm font-medium border-b-2 ${
                  selected
                    ? `border-${area.id}-500 text-${area.id}-600 dark:text-${area.id}-400`
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`
              }>
                History
              </Tab>
              <Tab className={({ selected }) =>
                `py-3 px-4 text-sm font-medium border-b-2 ${
                  selected
                    ? `border-${area.id}-500 text-${area.id}-600 dark:text-${area.id}-400`
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`
              }>
                Levels
              </Tab>
            </Tab.List>
            
            <Tab.Panels className="p-6">
              <Tab.Panel>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Level Progress
                    </h3>
                    
                    <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Level {progress.currentLevel}: {currentLevelInfo.title}</span>
                      {nextLevelInfo && (
                        <span>Level {progress.currentLevel + 1}: {nextLevelInfo.title}</span>
                      )}
                    </div>
                    
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                      <div 
                        className={`h-full ${area.color}`}
                        style={{ width: `${percentToNextLevel}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{progress.experience} XP</span>
                      <span>{progress.experienceToNextLevel} XP needed</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Recent Activity
                    </h3>
                    
                    <div className="grid grid-cols-7 gap-2">
                      {activityCountByDay.map((day, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div 
                            className={`w-full rounded-t h-24 flex items-end ${
                              day.count > 0 ? area.color : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <div 
                              className="w-full bg-opacity-70 text-center text-xs font-medium text-white py-1"
                              style={{ 
                                height: `${Math.min(100, day.count * 25)}%`,
                              }}
                            >
                              {day.count > 0 && day.count}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Statistics
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total XP Earned</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {progress.experience}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Activities Completed</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {activityHistory.length}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Current Streak</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {progress.streakDays} days
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Last Activity</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {formatDate(progress.lastCheckin).split(',')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              
              <Tab.Panel>
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  {Object.entries(groupedByMonth).length > 0 ? (
                    Object.entries(groupedByMonth).map(([month, activities]) => (
                      <div key={month}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          {month}
                        </h3>
                        
                        <div className="space-y-4">
                          {activities.map((activity) => (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  Activity {activity.activityId}
                                </h4>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {formatDate(activity.date)}
                                </span>
                              </div>
                              
                              {activity.reflection && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 italic">
                                  "{activity.reflection}"
                                </p>
                              )}
                              
                              <div className="flex justify-between items-center">
                                <div className="flex flex-wrap gap-2">
                                  {activity.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs dark:bg-gray-700 dark:text-gray-300">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                
                                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                  +{activity.experienceGained} XP
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400">No activity history yet</p>
                    </div>
                  )}
                </div>
              </Tab.Panel>
              
              <Tab.Panel>
                <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
                  {area.levels.map((level, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border ${
                        index + 1 === progress.currentLevel 
                          ? `border-${area.id}-200 bg-${area.id}-50 dark:border-${area.id}-900 dark:bg-${area.id}-900/20` 
                          : index + 1 < progress.currentLevel
                            ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20'
                            : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={`text-lg font-semibold ${
                          index + 1 === progress.currentLevel 
                            ? `text-${area.id}-800 dark:text-${area.id}-300` 
                            : index + 1 < progress.currentLevel
                              ? 'text-green-800 dark:text-green-300'
                              : 'text-gray-900 dark:text-white'
                        }`}>
                          Level {level.level}: {level.title}
                        </h3>
                        
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            index + 1 === progress.currentLevel 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                              : index + 1 < progress.currentLevel
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {index + 1 === progress.currentLevel 
                              ? 'Current' 
                              : index + 1 < progress.currentLevel
                                ? 'Completed'
                                : 'Locked'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {level.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                            Requirements
                          </h4>
                          <ul className="space-y-2">
                            {level.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className={
                                  index + 1 <= progress.currentLevel 
                                    ? "text-green-500" 
                                    : "text-gray-400"
                                }>
                                  {index + 1 <= progress.currentLevel ? "✓" : "○"}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">
                                  {req}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                            Benefits
                          </h4>
                          <ul className="space-y-2">
                            {level.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className={
                                  index + 1 <= progress.currentLevel 
                                    ? "text-indigo-500" 
                                    : "text-gray-400"
                                }>
                                  ★
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">
                                  {benefit}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {index + 1 === progress.currentLevel && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Progress to Level {index + 2}</span>
                            <span>{progress.experience} / {progress.experienceToNextLevel} XP</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                            <div 
                              className={`h-full ${area.color}`} 
                              style={{ width: `${percentToNextLevel}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}