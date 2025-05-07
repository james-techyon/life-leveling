"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';

// Avatar customization options
const SKIN_COLORS = [
  'bg-amber-300',
  'bg-amber-500',
  'bg-amber-700',
  'bg-yellow-600',
  'bg-orange-300',
  'bg-rose-300',
  'bg-stone-400'
];

const HAIR_STYLES = [
  'short',
  'medium',
  'long',
  'curly',
  'afro',
  'bald'
];

const HAIR_COLORS = [
  'bg-black',
  'bg-stone-700',
  'bg-yellow-400',
  'bg-amber-600',
  'bg-rose-400',
  'bg-gray-400',
  'bg-red-600'
];

const EYE_COLORS = [
  'bg-blue-500',
  'bg-gray-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-violet-600'
];

const ACCESSORIES = [
  'none',
  'glasses',
  'sunglasses',
  'earrings'
];

interface AvatarCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (avatarSettings: AvatarSettings) => void;
  initialSettings?: AvatarSettings;
}

export interface AvatarSettings {
  skinColor: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  accessory: string;
  hat: boolean;
  faceHair: boolean;
}

export default function AvatarCreator({
  isOpen,
  onClose,
  onSave,
  initialSettings
}: AvatarCreatorProps) {
  const [settings, setSettings] = useState<AvatarSettings>(
    initialSettings || {
      skinColor: SKIN_COLORS[0],
      hairStyle: HAIR_STYLES[0],
      hairColor: HAIR_COLORS[0],
      eyeColor: EYE_COLORS[0],
      accessory: ACCESSORIES[0],
      hat: false,
      faceHair: false
    }
  );
  
  const [activeTab, setActiveTab] = useState('skin');
  
  const handleSave = () => {
    onSave(settings);
    onClose();
  };
  
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full rounded-xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-xl font-bold">
                Customize Your Avatar
              </Dialog.Title>
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
          
          <div className="flex flex-col md:flex-row">
            {/* Avatar Preview */}
            <div className="md:w-1/2 p-6 flex flex-col items-center justify-center">
              <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative mb-4">
                {/* Avatar face */}
                <div className={`absolute inset-0 ${settings.skinColor} rounded-full`}></div>
                
                {/* Hair */}
                {settings.hairStyle !== 'bald' && (
                  <div className={`absolute ${settings.hairColor}`} style={{
                    top: settings.hairStyle === 'short' ? '-10%' : '-20%',
                    left: settings.hairStyle === 'afro' ? '-15%' : '0',
                    right: settings.hairStyle === 'afro' ? '-15%' : '0',
                    height: settings.hairStyle === 'short' ? '40%' : 
                            settings.hairStyle === 'medium' ? '45%' :
                            settings.hairStyle === 'long' ? '60%' :
                            settings.hairStyle === 'curly' ? '45%' : '55%',
                    borderRadius: settings.hairStyle === 'afro' ? '60%' : 
                                 settings.hairStyle === 'curly' ? '40% 40% 25% 25%' : '40% 40% 0 0'
                  }}></div>
                )}
                
                {/* Eyes */}
                <div className="absolute" style={{ top: '40%', left: '25%', width: '15%', height: '15%' }}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <div className={`w-1/2 h-1/2 ${settings.eyeColor} rounded-full`}></div>
                  </div>
                </div>
                <div className="absolute" style={{ top: '40%', right: '25%', width: '15%', height: '15%' }}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <div className={`w-1/2 h-1/2 ${settings.eyeColor} rounded-full`}></div>
                  </div>
                </div>
                
                {/* Accessory */}
                {settings.accessory === 'glasses' && (
                  <div className="absolute" style={{ top: '40%', left: '20%', right: '20%', height: '15%' }}>
                    <div className="w-full h-full border-2 border-gray-600 dark:border-gray-300 rounded-full flex items-center justify-center"></div>
                  </div>
                )}
                {settings.accessory === 'sunglasses' && (
                  <div className="absolute" style={{ top: '40%', left: '20%', right: '20%', height: '15%' }}>
                    <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center"></div>
                  </div>
                )}
                {settings.accessory === 'earrings' && (
                  <>
                    <div className="absolute rounded-full bg-yellow-400 w-2 h-2" style={{ top: '45%', left: '15%' }}></div>
                    <div className="absolute rounded-full bg-yellow-400 w-2 h-2" style={{ top: '45%', right: '15%' }}></div>
                  </>
                )}
                
                {/* Mouth */}
                <div className="absolute bg-rose-400 rounded-full h-1.5 w-8" style={{ top: '65%', left: '50%', transform: 'translateX(-50%)' }}></div>
                
                {/* Face hair */}
                {settings.faceHair && (
                  <div className={`absolute ${settings.hairColor} rounded-t-full h-10 w-16 -mb-2`} style={{ bottom: '20%', left: '50%', transform: 'translateX(-50%)' }}></div>
                )}
                
                {/* Hat */}
                {settings.hat && (
                  <div className="absolute bg-blue-500 top-0 left-0 right-0 h-[25%] rounded-t-full" style={{ borderBottom: '4px solid #2563EB' }}></div>
                )}
              </div>
              
              <motion.div 
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 1, 0, -1, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5, 
                  ease: "easeInOut" 
                }}
                className="text-center text-gray-500 dark:text-gray-400 text-sm"
              >
                This is how you'll appear in your journey!
              </motion.div>
            </div>
            
            {/* Customization Options */}
            <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1 mb-4 overflow-x-auto pb-2">
                {['skin', 'hair', 'eyes', 'extras'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              {activeTab === 'skin' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Skin Tone</h3>
                  <div className="flex flex-wrap gap-3">
                    {SKIN_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSettings({ ...settings, skinColor: color })}
                        className={`w-10 h-10 rounded-full ${color} transition-transform ${
                          settings.skinColor === color ? 'ring-2 ring-offset-2 ring-purple-600 scale-110' : ''
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'hair' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Hair Style</h3>
                  <div className="flex flex-wrap gap-3">
                    {HAIR_STYLES.map((style) => (
                      <button
                        key={style}
                        onClick={() => setSettings({ ...settings, hairStyle: style })}
                        className={`px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm ${
                          settings.hairStyle === style ? 'ring-2 ring-purple-600 bg-purple-100 dark:bg-purple-900' : ''
                        }`}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">Hair Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {HAIR_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSettings({ ...settings, hairColor: color })}
                        className={`w-10 h-10 rounded-full ${color} transition-transform ${
                          settings.hairColor === color ? 'ring-2 ring-offset-2 ring-purple-600 scale-110' : ''
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'eyes' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Eye Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {EYE_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSettings({ ...settings, eyeColor: color })}
                        className={`w-10 h-10 rounded-full ${color} transition-transform ${
                          settings.eyeColor === color ? 'ring-2 ring-offset-2 ring-purple-600 scale-110' : ''
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'extras' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Accessories</h3>
                  <div className="flex flex-wrap gap-3">
                    {ACCESSORIES.map((accessory) => (
                      <button
                        key={accessory}
                        onClick={() => setSettings({ ...settings, accessory })}
                        className={`px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm ${
                          settings.accessory === accessory ? 'ring-2 ring-purple-600 bg-purple-100 dark:bg-purple-900' : ''
                        }`}
                      >
                        {accessory === 'none' ? 'None' : accessory.charAt(0).toUpperCase() + accessory.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.hat}
                        onChange={() => setSettings({ ...settings, hat: !settings.hat })}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Hat</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.faceHair}
                        onChange={() => setSettings({ ...settings, faceHair: !settings.faceHair })}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Facial Hair</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-gray-100 dark:bg-gray-900 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
            >
              Save Avatar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}