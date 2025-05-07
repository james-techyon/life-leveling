"use client";

import { useState } from 'react';
import { UserState, AreaProgress } from '../types';
import { fulfillmentAreas } from '../fulfillment';
import AreaCard from './AreaCard';
import EnneagramProfile from './EnneagramProfile';
import ActivityModal from './ActivityModal';
import HistoryModal from './HistoryModal';
import StatSummary from './StatSummary';

interface DashboardProps {
  userData: UserState;
  onUpdateUserData: (newData: UserState) => void;
}

export default function Dashboard({ userData, onUpdateUserData }: DashboardProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleEnneagramChange = (typeId: number) => {
    onUpdateUserData({
      ...userData,
      profile: {
        ...userData.profile,
        enneagramType: typeId
      }
    });
  };

  const handleActivitiesOpen = (areaId: string) => {
    setSelectedArea(areaId);
    setIsActivityModalOpen(true);
  };

  const handleHistoryOpen = (areaId: string) => {
    setSelectedArea(areaId);
    setIsHistoryModalOpen(true);
  };

  // Sort areas to put lowest level areas first (areas that need attention)
  const sortedProgress = [...userData.progress].sort((a, b) => {
    // First sort by level (ascending)
    if (a.currentLevel !== b.currentLevel) {
      return a.currentLevel - b.currentLevel;
    }
    // Then by percentage to next level (ascending)
    const aPercentage = a.experience / a.experienceToNextLevel;
    const bPercentage = b.experience / b.experienceToNextLevel;
    return aPercentage - bPercentage;
  });

  const getAreaObject = (areaId: string) => {
    return fulfillmentAreas.find(area => area.id === areaId) || fulfillmentAreas[0];
  };

  const getProgressObject = (areaId: string): AreaProgress => {
    return userData.progress.find(p => p.areaId === areaId) || userData.progress[0];
  };

  const selectedAreaData = selectedArea ? {
    area: getAreaObject(selectedArea),
    progress: getProgressObject(selectedArea)
  } : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.profile.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Continue your personal growth journey and level up your life.
          </p>
          <StatSummary userData={userData} />
        </div>
        <div>
          <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-3">Your Life Level</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">
                {Math.floor(userData.progress.reduce((sum, area) => sum + area.currentLevel, 0) / userData.progress.length)}
              </span>
              <span className="text-indigo-200">Overall</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {userData.progress.map(area => {
                const areaInfo = getAreaObject(area.areaId);
                return (
                  <div key={area.areaId} className="flex items-center gap-1">
                    <span>{areaInfo.icon}</span>
                    <span className="font-medium">{area.currentLevel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {sortedProgress.map(progress => {
          const area = getAreaObject(progress.areaId);
          return (
            <AreaCard
              key={progress.areaId}
              area={area}
              progress={progress}
              onActivitiesOpen={handleActivitiesOpen}
              onHistoryOpen={handleHistoryOpen}
            />
          );
        })}
      </div>

      <div>
        <EnneagramProfile
          selectedTypeId={userData.profile.enneagramType}
          onTypeChange={handleEnneagramChange}
        />
      </div>

      {selectedAreaData && (
        <>
          <ActivityModal
            isOpen={isActivityModalOpen}
            onClose={() => setIsActivityModalOpen(false)}
            area={selectedAreaData.area}
            progress={selectedAreaData.progress}
            userData={userData}
            onUpdateUserData={onUpdateUserData}
          />
          
          <HistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            area={selectedAreaData.area}
            progress={selectedAreaData.progress}
          />
        </>
      )}
    </div>
  );
}