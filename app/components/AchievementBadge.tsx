"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../models/user';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  onClick?: () => void;
}

const badgeColors: Record<string, string> = {
  faith: 'from-purple-500 to-indigo-600',
  family: 'from-red-500 to-rose-600',
  friends: 'from-blue-500 to-indigo-600',
  fitness: 'from-green-500 to-emerald-600',
  finance: 'from-yellow-500 to-amber-600',
  fun: 'from-pink-500 to-rose-600',
  focus: 'from-orange-500 to-amber-600',
};

export default function AchievementBadge({ 
  achievement,
  size = 'md',
  showDetails = false,
  onClick
}: AchievementBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };
  
  const detailsVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        delay: 0.1
      }
    }
  };
  
  const badgeVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, -5, 0],
      transition: { 
        duration: 0.5,
        rotate: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 1
        }
      }
    },
    tap: { scale: 0.95 }
  };
  
  const colorGradient = badgeColors[achievement.areaId] || 'from-gray-500 to-gray-700';
  
  return (
    <div className="relative" onClick={onClick}>
      <motion.div
        className={`relative rounded-full flex items-center justify-center cursor-pointer ${sizeClasses[size]} bg-gradient-to-br ${colorGradient} shadow-lg`}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={badgeVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <span className="text-white drop-shadow-md">
          {achievement.icon}
        </span>
        
        {/* Glow effect */}
        <motion.div 
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${colorGradient} blur-md -z-10`}
          animate={{ 
            opacity: isHovered ? 0.8 : 0.4,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Particles effect on hover */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1.5 h-1.5 rounded-full bg-white`}
                initial={{ 
                  x: 0, 
                  y: 0,
                  opacity: 1
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 60, 
                  y: (Math.random() - 0.5) * 60, 
                  opacity: 0,
                  scale: 0
                }}
                transition={{ 
                  duration: 0.8 + Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 0.2
                }}
              />
            ))}
          </>
        )}
      </motion.div>
      
      {/* Achievement name tooltip */}
      {(isHovered || showDetails) && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-10 w-max"
          variants={detailsVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 text-center mt-2 min-w-[120px] border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {achievement.name}
            </div>
            {showDetails && (
              <>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {achievement.description}
                </p>
                <div className="mt-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                  +{achievement.experienceGained} XP
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Earned {new Date(achievement.dateEarned).toLocaleDateString()}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}