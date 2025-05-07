"use client";

import { useState } from 'react';
import { enneagramTypes, getGrowthSuggestions } from '../enneagram';

interface EnneagramProfileProps {
  selectedTypeId: number;
  onTypeChange: (typeId: number) => void;
}

export default function EnneagramProfile({ selectedTypeId, onTypeChange }: EnneagramProfileProps) {
  const [showAll, setShowAll] = useState(false);
  
  const selectedType = enneagramTypes.find(type => type.id === selectedTypeId);
  const growthSuggestions = getGrowthSuggestions(selectedTypeId);
  
  if (!selectedType) return null;
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Your Enneagram Type</h2>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {enneagramTypes.map(type => (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTypeId === type.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Type {type.id}: {type.name}
            </button>
          ))}
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">
              Type {selectedType.id}: {selectedType.name}
            </h3>
            <span className="text-sm bg-indigo-200 dark:bg-indigo-800 px-2 py-1 rounded text-indigo-800 dark:text-indigo-200">
              {selectedType.description}
            </span>
          </div>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-medium text-indigo-600 dark:text-indigo-400 mb-2">Core Strengths</h4>
              <div className="flex flex-wrap gap-2">
                {selectedType.strengths.map((strength, i) => (
                  <span key={i} className="bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full text-sm">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-indigo-600 dark:text-indigo-400 mb-2">Growth Areas</h4>
              <div className="flex flex-wrap gap-2">
                {selectedType.growthAreas.map((area, i) => (
                  <span key={i} className="bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full text-sm text-amber-800 dark:text-amber-200">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-indigo-600 dark:text-indigo-400 mb-2">Your Growth Path</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <p className="text-sm">{selectedType.leveling.low}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <p className="text-sm">{selectedType.leveling.medium}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="text-sm">{selectedType.leveling.high}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-3">Personalized Growth Suggestions</h3>
        <div className="space-y-2">
          {growthSuggestions.slice(0, showAll ? undefined : 3).map((suggestion, i) => (
            <div key={i} className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg flex gap-3">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <p className="text-gray-700 dark:text-gray-300">{suggestion}</p>
            </div>
          ))}
        </div>
        
        {growthSuggestions.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-3 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
          >
            {showAll ? "Show less" : "Show all suggestions"}
          </button>
        )}
      </div>
    </div>
  );
}