"use client";

import { useState } from 'react';
import { AreaProgress } from '../models/user';
import { FulfillmentArea } from '../models/fulfillment';
import { motion } from 'framer-motion';

interface AreaCardProps {
  area: FulfillmentArea;
  progress: AreaProgress;
  onActivityOpen: (areaId: string) => void;
  onHistoryOpen: (areaId: string) => void;
  onSkillTreeOpen?: (areaId: string) => void;
}

export default function AreaCard({ area, progress, onActivityOpen, onHistoryOpen, onSkillTreeOpen }: AreaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const percentToNextLevel = Math.min(
    100,
    Math.round((progress.experience / progress.experienceToNextLevel) * 100)
  );
  
  const currentLevelInfo = area.levels[progress.currentLevel - 1];
  const nextLevelInfo = area.levels[progress.currentLevel] || null;
  
  return (
    <motion.div 
      layout
      className={`overflow-hidden rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 ${isExpanded ? 'md:col-span-2 row-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-4 ${area.color} text-white`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{area.icon}</span>
            <h3 className="text-lg font-bold">{area.name}</h3>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
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
        
        <div className="mt-2 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <span className="text-sm">Level</span>
            <span className="text-xl font-bold">{progress.currentLevel}</span>
          </span>
          <span className="text-sm font-medium">{currentLevelInfo.title}</span>
        </div>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 mb-2">
          <div 
            className={`h-full ${area.color}`}
            style={{ width: `${percentToNextLevel}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span>{progress.experience} XP</span>
          <span>Level {progress.currentLevel + 1}: {progress.experienceToNextLevel} XP</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{progress.streakDays} day streak</span>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Current: {currentLevelInfo.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{currentLevelInfo.description}</p>
              
              <div className="space-y-2">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-200">Requirements:</h5>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 ml-2">
                    {currentLevelInfo.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-200">Benefits:</h5>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 ml-2">
                    {currentLevelInfo.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {nextLevelInfo && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next: {nextLevelInfo.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{nextLevelInfo.description}</p>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-200">Requirements:</h5>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 ml-2">
                    {nextLevelInfo.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {onSkillTreeOpen && (
              <button
                onClick={() => onSkillTreeOpen(area.id)}
                className="w-full mt-2 px-3 py-2 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 font-medium text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">🌟</span>
                <span>Skill Tree</span>
              </button>
            )}
          </div>
        )}
        
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onActivityOpen(area.id)}
            className={`flex-1 px-3 py-2 rounded-md text-white font-medium text-sm ${area.color} transition-colors hover:opacity-90`}
          >
            Activities
          </button>
          <button
            onClick={() => onHistoryOpen(area.id)}
            className="flex-1 px-3 py-2 rounded-md bg-gray-200 text-gray-800 font-medium text-sm transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            History
          </button>
        </div>
      </div>
    </motion.div>
  );
}