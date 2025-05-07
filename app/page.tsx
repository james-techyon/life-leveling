"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createMockUser, UserState } from './models/user';
import { fulfillmentAreas, FulfillmentArea } from './models/fulfillment';
import { Activity, getActivitiesByArea } from './models/activities';
import { enneagramTypes } from './models/enneagram';

// Components
import AreaCard from './components/AreaCard';
import EnneagramProfile from './components/EnneagramProfile';
import ActivityModal from './components/ActivityModal';
import ProgressModal from './components/ProgressModal';
import Header from './components/Header';
import DailyQuests from './components/DailyQuests';
import LevelUpCelebration from './components/LevelUpCelebration';
import AvatarCreator, { AvatarSettings } from './components/AvatarCreator';
import QuestSystem from './components/QuestSystem';
import SkillTree from './components/SkillTree';
import AchievementBadge from './components/AchievementBadge';
import { AnimatedBackground } from './components/ui/animated-background';

export default function Home() {
  const [userData, setUserData] = useState<UserState | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isQuestSystemOpen, setIsQuestSystemOpen] = useState(false);
  const [isSkillTreeOpen, setIsSkillTreeOpen] = useState(false);
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);
  const [isAvatarCreatorOpen, setIsAvatarCreatorOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ area: FulfillmentArea; newLevel: number; xpGained: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const loadData = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      const mockData = createMockUser();
      
      // Artificial delay for demo purposes
      setTimeout(() => {
        setUserData(mockData);
        setIsLoading(false);
        
        // Show avatar creator if it's the first login
        const hasAvatarSetting = localStorage.getItem('userAvatar');
        if (!hasAvatarSetting) {
          setTimeout(() => {
            setIsAvatarCreatorOpen(true);
          }, 1000);
        }
      }, 1500);
    };

    loadData();
  }, []);

  if (isLoading || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="text-5xl mb-4"
          >
            🌟
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Loading your life journey...
          </h2>
          <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
            <motion.div 
              className="h-full bg-indigo-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
            Preparing your personalized growth experience
          </p>
        </div>
      </div>
    );
  }

  const handleUpdateUserData = (newData: UserState) => {
    setUserData(newData);
  };

  const handleActivityOpen = (areaId: string) => {
    setSelectedArea(areaId);
    setIsActivityModalOpen(true);
  };

  const handleProgressOpen = (areaId: string) => {
    setSelectedArea(areaId);
    setIsProgressModalOpen(true);
  };

  const handleEnneagramChange = (typeId: number) => {
    setUserData({
      ...userData,
      profile: {
        ...userData.profile,
        enneagramType: typeId
      }
    });
  };
  
  const handleSkillTreeOpen = (areaId: string) => {
    setSelectedArea(areaId);
    setIsSkillTreeOpen(true);
  };
  
  const handleUnlockSkill = (skillId: string, xpCost: number) => {
    if (!selectedArea) return;
    
    // Update user progress
    const updatedProgress = userData.progress.map(area => {
      if (area.areaId === selectedArea) {
        return {
          ...area,
          experience: area.experience - xpCost
        };
      }
      return area;
    });
    
    setUserData({
      ...userData,
      progress: updatedProgress
    });
    
    // Add skill to user's unlocked skills (in a real app)
    console.log(`Unlocked skill: ${skillId} for ${xpCost} XP`);
  };
  
  const handleCompleteActivity = (activity: Activity, reflection?: string) => {
    // Update user data with completed activity
    const now = new Date().toISOString();
    
    // Create new activity completion
    const newCompletion = {
      id: `${Date.now()}`,
      activityId: activity.id,
      date: now,
      areaId: activity.areaId,
      experienceGained: activity.xpReward,
      reflection,
      tags: activity.tags,
    };
    
    // Calculate if a level up occurred
    const areaProgress = userData.progress.find(p => p.areaId === activity.areaId);
    if (!areaProgress) return;
    
    const newXP = areaProgress.experience + activity.xpReward;
    const oldLevel = areaProgress.currentLevel;
    let newLevel = oldLevel;
    
    // Check if leveled up
    const area = fulfillmentAreas.find(a => a.id === activity.areaId)!;
    if (newXP >= areaProgress.experienceToNextLevel && oldLevel < area.levels.length) {
      newLevel = oldLevel + 1;
      
      // Show level up celebration
      setLevelUpData({
        area,
        newLevel,
        xpGained: activity.xpReward
      });
      setIsLevelUpOpen(true);
    }
    
    // Update progress
    const updatedProgress = userData.progress.map(p => {
      if (p.areaId === activity.areaId) {
        return {
          ...p,
          experience: newXP,
          currentLevel: newLevel,
          experienceToNextLevel: newLevel > oldLevel ? 
            area.levels[newLevel].xpRequired || 1000 : 
            p.experienceToNextLevel,
          lastCheckin: now,
          streakDays: p.streakDays + 1,
        };
      }
      return p;
    });
    
    // Update user data
    setUserData({
      ...userData,
      progress: updatedProgress,
      activityHistory: [...userData.activityHistory, newCompletion],
      profile: {
        ...userData.profile,
        streak: userData.profile.streak + 1,
        lastActive: now
      }
    });
  };

  const handleSaveAvatar = (avatarSettings: AvatarSettings) => {
    // Save to local storage (in a real app, this would go to a database)
    localStorage.setItem('userAvatar', JSON.stringify(avatarSettings));
    
    // Close modal
    setIsAvatarCreatorOpen(false);
  };

  // Get area info
  const getAreaInfo = (areaId: string) => {
    return fulfillmentAreas.find(area => area.id === areaId) || fulfillmentAreas[0];
  };
  
  // Get progress info
  const getProgressInfo = (areaId: string) => {
    return userData.progress.find(p => p.areaId === areaId) || userData.progress[0];
  };

  const selectedAreaData = selectedArea ? {
    area: getAreaInfo(selectedArea),
    progress: getProgressInfo(selectedArea)
  } : null;

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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        userData={userData} 
        onQuestsOpen={() => setIsQuestSystemOpen(true)}
        onAvatarClick={() => setIsAvatarCreatorOpen(true)}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero section */}
        <section className="mb-12 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <AnimatedBackground color="bg-indigo-600" particleCount={50} />
          
          <div className="relative p-8 md:p-12">
            <div className="max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Welcome to Your Life Journey, {userData.profile.name}!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-indigo-100 text-lg mb-6"
              >
                Level up your life by developing the 7 key areas of fulfillment while embracing your Enneagram Type {userData.profile.enneagramType}.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <button 
                  onClick={() => setIsQuestSystemOpen(true)}
                  className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2"
                >
                  <span className="text-xl">⚔️</span>
                  View Quests
                </button>
                <button 
                  onClick={() => selectedAreaData ? handleSkillTreeOpen(selectedAreaData.area.id) : null}
                  className="px-6 py-3 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition-colors flex items-center gap-2"
                >
                  <span className="text-xl">🌟</span>
                  Skill Trees
                </button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Daily quests section */}
        <section className="mb-12">
          <DailyQuests 
            userData={userData}
            onComplete={handleCompleteActivity}
          />
        </section>
        
        {/* Life areas section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Life Areas</h2>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Overall Level: {Math.floor(userData.progress.reduce((sum, area) => sum + area.currentLevel, 0) / userData.progress.length)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProgress.map(progress => {
              const area = getAreaInfo(progress.areaId);
              return (
                <AreaCard
                  key={area.id}
                  area={area}
                  progress={progress}
                  onActivityOpen={handleActivityOpen}
                  onHistoryOpen={handleProgressOpen}
                />
              );
            })}
          </div>
        </section>
        
        {/* Achievements section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Achievements</h2>
          
          {userData.achievements.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-wrap gap-6 justify-center">
                {userData.achievements.map(achievement => (
                  <AchievementBadge 
                    key={achievement.id}
                    achievement={achievement}
                    size="lg"
                    showDetails={true}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Achievements Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Complete quests, reach milestones, and level up your life areas to earn achievements and badges.
              </p>
            </div>
          )}
        </section>
        
        {/* Enneagram profile section */}
        <section className="mb-12">
          <EnneagramProfile
            selectedTypeId={userData.profile.enneagramType}
            onTypeChange={handleEnneagramChange}
          />
        </section>
        
        {selectedAreaData && (
          <>
            <ActivityModal 
              isOpen={isActivityModalOpen}
              onClose={() => setIsActivityModalOpen(false)}
              area={selectedAreaData.area}
              progress={selectedAreaData.progress}
              userData={userData}
              onUpdateUserData={handleUpdateUserData}
            />
            
            <ProgressModal 
              isOpen={isProgressModalOpen}
              onClose={() => setIsProgressModalOpen(false)}
              area={selectedAreaData.area}
              progress={selectedAreaData.progress}
              userData={userData}
            />
            
            <SkillTree
              isOpen={isSkillTreeOpen}
              onClose={() => setIsSkillTreeOpen(false)}
              area={selectedAreaData.area}
              progress={selectedAreaData.progress}
              onUnlockSkill={handleUnlockSkill}
            />
          </>
        )}
        
        <QuestSystem
          isOpen={isQuestSystemOpen}
          onClose={() => setIsQuestSystemOpen(false)}
          userData={userData}
          onUpdateUserData={handleUpdateUserData}
        />
        
        <AvatarCreator 
          isOpen={isAvatarCreatorOpen}
          onClose={() => setIsAvatarCreatorOpen(false)}
          onSave={handleSaveAvatar}
        />
        
        {levelUpData && (
          <LevelUpCelebration
            isOpen={isLevelUpOpen}
            onClose={() => setIsLevelUpOpen(false)}
            area={levelUpData.area}
            newLevel={levelUpData.newLevel}
            xpGained={levelUpData.xpGained}
          />
        )}
      </div>
    </main>
  );
}