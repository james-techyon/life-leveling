"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserState } from '../models/user';

interface HeaderProps {
  userData: UserState;
  onQuestsOpen?: () => void;
  onAvatarClick?: () => void;
}

export default function Header({ userData, onQuestsOpen, onAvatarClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate overall level
  const overallLevel = Math.floor(
    userData.progress.reduce((sum, area) => sum + area.currentLevel, 0) / userData.progress.length
  );

  // Calculate total XP across all areas
  const totalXP = userData.progress.reduce((sum, area) => sum + area.experience, 0);

  return (
    <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: 0 }}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center mr-2"
              >
                <span className="text-white text-xs font-bold">7F</span>
              </motion.div>
              <span className="text-gray-900 dark:text-white font-bold text-lg">LifeLevel</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-semibold">{userData.profile.streak} Day Streak</span>
              </div>

              {onQuestsOpen && (
                <div 
                  className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 flex items-center cursor-pointer hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                  onClick={onQuestsOpen}
                >
                  <span className="text-base mr-1">⚔️</span>
                  <span className="text-sm font-semibold">Quests</span>
                </div>
              )}

              <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-semibold">Level {overallLevel}</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold">{totalXP.toLocaleString()} XP</span>
              </div>
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAvatarClick}
                className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="text-sm font-medium mr-2 hidden sm:block">{userData.profile.name}</span>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md ring-2 ring-white dark:ring-gray-800">
                  <span className="font-semibold">
                    {userData.profile.name.charAt(0)}
                  </span>
                </div>
              </motion.button>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-2 pb-3 space-y-2 border-t border-gray-200 dark:border-gray-700 px-4">
            {onQuestsOpen && (
              <div 
                className="flex justify-between py-2 px-3 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 cursor-pointer"
                onClick={() => {
                  onQuestsOpen();
                  setIsMenuOpen(false);
                }}
              >
                <span className="flex items-center text-sm font-medium">
                  <span className="text-base mr-2">⚔️</span>
                  Quests
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Streak</span>
              <span className="font-semibold text-gray-900 dark:text-white">{userData.profile.streak} Days</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Level</span>
              <span className="font-semibold text-gray-900 dark:text-white">{overallLevel}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Total XP</span>
              <span className="font-semibold text-gray-900 dark:text-white">{totalXP.toLocaleString()}</span>
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div 
              className="flex items-center px-4 py-3"
              onClick={() => {
                if (onAvatarClick) {
                  onAvatarClick();
                  setIsMenuOpen(false);
                }
              }}
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
                  <span className="font-semibold">
                    {userData.profile.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">
                  {userData.profile.name}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {userData.profile.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Sign out
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}