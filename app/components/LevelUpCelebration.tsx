"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FulfillmentArea } from '../models/fulfillment';

interface LevelUpCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  area: FulfillmentArea;
  newLevel: number;
  xpGained: number;
}

export default function LevelUpCelebration({
  isOpen,
  onClose,
  area,
  newLevel,
  xpGained
}: LevelUpCelebrationProps) {
  const [showBenefits, setShowBenefits] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Reset states when opened
      setShowBenefits(false);
      
      // Trigger confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const colors = ['#FFC107', '#2196F3', '#E91E63', '#4CAF50'];
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };
      
      (function frame() {
        confetti({
          particleCount: 3,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 },
          colors: colors,
          shapes: ['circle', 'square'],
          zIndex: 2000
        });
        
        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      }());
      
      // Show benefits after 1.5 seconds
      const timer = setTimeout(() => {
        setShowBenefits(true);
      }, 1500);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const levelInfo = area.levels[newLevel - 1];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`w-full max-w-md rounded-xl overflow-hidden shadow-2xl relative`}
      >
        <div className={`${area.color} p-8 text-white text-center relative overflow-hidden`}>
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ 
                  x: Math.random() * 100 - 50, 
                  y: Math.random() * 100 - 50,
                  opacity: 0 
                }}
                animate={{ 
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  opacity: [0, 0.7, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5 + Math.random() * 5,
                  delay: Math.random() * 2
                }}
                className="absolute w-8 h-8 rounded-full bg-white/20"
              />
            ))}
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-2"
          >
            LEVEL UP!
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 15,
              delay: 0.4 
            }}
            className="text-7xl font-extrabold mb-2"
          >
            {newLevel}
          </motion.div>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-3 text-2xl font-bold mb-2"
          >
            <span className="text-4xl">{area.icon}</span>
            <span>{area.name}: {levelInfo.title}</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg opacity-90 mb-4"
          >
            {levelInfo.description}
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-white/20 rounded-full px-4 py-2 inline-block"
          >
            +{xpGained} XP
          </motion.div>
        </div>
        
        <AnimatePresence>
          {showBenefits && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-gray-800 p-6 text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                New Benefits Unlocked
              </h3>
              
              <div className="space-y-3 mb-6">
                {levelInfo.benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 text-left"
                  >
                    <div className={`w-8 h-8 rounded-full ${area.bgColor} ${area.textColor} flex items-center justify-center flex-shrink-0`}>
                      ✓
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                  </motion.div>
                ))}
              </div>
              
              <button
                onClick={onClose}
                className={`px-6 py-3 rounded-lg ${area.color} text-white font-bold transition-transform hover:scale-105 active:scale-95`}
              >
                Continue Your Journey
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}