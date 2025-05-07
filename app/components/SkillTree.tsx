"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { FulfillmentArea } from '../models/fulfillment';
import { AreaProgress } from '../models/user';

interface Skill {
  id: string;
  name: string;
  description: string;
  xpCost: number;
  icon: string;
  position: { x: number; y: number };
  connections: string[];
  isUnlocked: boolean;
  isRoot?: boolean;
  specialEffect?: string;
}

interface SkillTreeProps {
  isOpen: boolean;
  onClose: () => void;
  area: FulfillmentArea;
  progress: AreaProgress;
  onUnlockSkill: (skillId: string, xpCost: number) => void;
}

export default function SkillTree({
  isOpen,
  onClose,
  area,
  progress,
  onUnlockSkill
}: SkillTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [viewBox, setViewBox] = useState("0 0 1000 800");
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Generate skills based on the area
  useEffect(() => {
    if (isOpen) {
      // This would typically come from an API or database
      // For the demo, we'll generate some skills based on the area
      const areaSkills = generateSkillsForArea(area.id);
      setSkills(areaSkills);
    }
  }, [isOpen, area.id]);
  
  const generateSkillsForArea = (areaId: string): Skill[] => {
    // Root skills for each area (these are already unlocked)
    const rootSkill: Skill = {
      id: `${areaId}-root`,
      name: `${area.name} Basics`,
      description: `Fundamental understanding of ${area.name.toLowerCase()}.`,
      xpCost: 0,
      icon: area.icon,
      position: { x: 500, y: 400 },
      connections: [
        `${areaId}-1`, 
        `${areaId}-2`, 
        `${areaId}-3`
      ],
      isUnlocked: true,
      isRoot: true
    };
    
    // Generate area-specific skills
    const areaSpecificSkills = getAreaSpecificSkills(areaId);
    
    return [rootSkill, ...areaSpecificSkills];
  };
  
  const getAreaSpecificSkills = (areaId: string): Skill[] => {
    switch (areaId) {
      case 'faith':
        return [
          {
            id: 'faith-1',
            name: 'Mindfulness',
            description: 'Develop present-moment awareness and mindfulness practices.',
            xpCost: 200,
            icon: '🧘',
            position: { x: 350, y: 300 },
            connections: ['faith-4', 'faith-5'],
            isUnlocked: false
          },
          {
            id: 'faith-2',
            name: 'Values Clarity',
            description: 'Clarify your core values and align your actions with them.',
            xpCost: 200,
            icon: '🌟',
            position: { x: 500, y: 200 },
            connections: ['faith-6'],
            isUnlocked: false
          },
          {
            id: 'faith-3',
            name: 'Gratitude Practice',
            description: 'Cultivate consistent gratitude and appreciation.',
            xpCost: 200,
            icon: '🙏',
            position: { x: 650, y: 300 },
            connections: ['faith-5', 'faith-7'],
            isUnlocked: false
          },
          {
            id: 'faith-4',
            name: 'Meditation Mastery',
            description: 'Deepen your meditation practice for greater insight.',
            xpCost: 500,
            icon: '✨',
            position: { x: 250, y: 200 },
            connections: ['faith-8'],
            isUnlocked: false,
            specialEffect: 'Reduces stress in other areas'
          },
          {
            id: 'faith-5',
            name: 'Emotional Intelligence',
            description: 'Develop awareness and mastery of emotions.',
            xpCost: 500,
            icon: '❤️',
            position: { x: 500, y: 100 },
            connections: ['faith-8'],
            isUnlocked: false
          },
          {
            id: 'faith-6',
            name: 'Purpose Alignment',
            description: 'Connect daily actions with deeper purpose.',
            xpCost: 500,
            icon: '🧭',
            position: { x: 600, y: 100 },
            connections: ['faith-9'],
            isUnlocked: false,
            specialEffect: 'Increases XP gain in Focus area'
          },
          {
            id: 'faith-7',
            name: 'Compassion Practice',
            description: 'Cultivate compassion for self and others.',
            xpCost: 500,
            icon: '🕊️',
            position: { x: 750, y: 200 },
            connections: ['faith-9'],
            isUnlocked: false,
            specialEffect: 'Increases XP gain in Family and Friends areas'
          },
          {
            id: 'faith-8',
            name: 'Inner Peace',
            description: 'Maintain calm and presence amidst life challenges.',
            xpCost: 1000,
            icon: '☯️',
            position: { x: 400, y: 50 },
            connections: ['faith-10'],
            isUnlocked: false
          },
          {
            id: 'faith-9',
            name: 'Wisdom Integration',
            description: 'Apply spiritual wisdom to practical life situations.',
            xpCost: 1000,
            icon: '📚',
            position: { x: 700, y: 50 },
            connections: ['faith-10'],
            isUnlocked: false
          },
          {
            id: 'faith-10',
            name: 'Spiritual Mastery',
            description: 'Complete integration of spiritual principles into all aspects of life.',
            xpCost: 2000,
            icon: '🌌',
            position: { x: 550, y: -50 },
            connections: [],
            isUnlocked: false,
            specialEffect: 'Provides bonuses to all life areas'
          }
        ];
        
      case 'fitness':
        return [
          {
            id: 'fitness-1',
            name: 'Consistent Movement',
            description: 'Establish regular physical activity habits.',
            xpCost: 200,
            icon: '🏃',
            position: { x: 350, y: 300 },
            connections: ['fitness-4', 'fitness-5'],
            isUnlocked: false
          },
          {
            id: 'fitness-2',
            name: 'Nutrition Basics',
            description: 'Learn fundamental principles of healthy eating.',
            xpCost: 200,
            icon: '🥗',
            position: { x: 500, y: 200 },
            connections: ['fitness-6'],
            isUnlocked: false
          },
          {
            id: 'fitness-3',
            name: 'Recovery Skills',
            description: 'Master sleep, rest, and stress management.',
            xpCost: 200,
            icon: '😴',
            position: { x: 650, y: 300 },
            connections: ['fitness-5', 'fitness-7'],
            isUnlocked: false
          },
          {
            id: 'fitness-4',
            name: 'Strength Training',
            description: 'Build muscle and functional strength.',
            xpCost: 500,
            icon: '💪',
            position: { x: 250, y: 200 },
            connections: ['fitness-8'],
            isUnlocked: false,
            specialEffect: 'Increases energy levels daily'
          },
          {
            id: 'fitness-5',
            name: 'Cardio Endurance',
            description: 'Improve heart health and stamina.',
            xpCost: 500,
            icon: '🫀',
            position: { x: 500, y: 100 },
            connections: ['fitness-8'],
            isUnlocked: false
          },
          {
            id: 'fitness-6',
            name: 'Nutrition Mastery',
            description: 'Optimize nutrition for your specific needs.',
            xpCost: 500,
            icon: '🍽️',
            position: { x: 600, y: 100 },
            connections: ['fitness-9'],
            isUnlocked: false,
            specialEffect: 'Reduces recovery time for physical activities'
          },
          {
            id: 'fitness-7',
            name: 'Mobility & Flexibility',
            description: 'Enhance range of motion and prevent injuries.',
            xpCost: 500,
            icon: '🤸',
            position: { x: 750, y: 200 },
            connections: ['fitness-9'],
            isUnlocked: false
          },
          {
            id: 'fitness-8',
            name: 'Physical Performance',
            description: 'Achieve optimal physical capacity and skill.',
            xpCost: 1000,
            icon: '🏆',
            position: { x: 400, y: 50 },
            connections: ['fitness-10'],
            isUnlocked: false
          },
          {
            id: 'fitness-9',
            name: 'Holistic Health',
            description: 'Integrate all aspects of physical wellbeing.',
            xpCost: 1000,
            icon: '⚕️',
            position: { x: 700, y: 50 },
            connections: ['fitness-10'],
            isUnlocked: false
          },
          {
            id: 'fitness-10',
            name: 'Vitality Mastery',
            description: 'Achieve peak physical condition and longevity practices.',
            xpCost: 2000,
            icon: '✨',
            position: { x: 550, y: -50 },
            connections: [],
            isUnlocked: false,
            specialEffect: 'Improves energy gain in all other areas'
          }
        ];
        
      // Add other areas as needed
      default:
        // Generic skills for other areas
        return [
          {
            id: `${areaId}-1`,
            name: 'Foundation',
            description: `Build a strong foundation in ${area.name.toLowerCase()}.`,
            xpCost: 200,
            icon: '🔍',
            position: { x: 350, y: 300 },
            connections: [`${areaId}-4`, `${areaId}-5`],
            isUnlocked: false
          },
          {
            id: `${areaId}-2`,
            name: 'Understanding',
            description: `Develop deeper understanding of ${area.name.toLowerCase()}.`,
            xpCost: 200,
            icon: '📚',
            position: { x: 500, y: 200 },
            connections: [`${areaId}-6`],
            isUnlocked: false
          },
          {
            id: `${areaId}-3`,
            name: 'Practice',
            description: `Regular practice in ${area.name.toLowerCase()}.`,
            xpCost: 200,
            icon: '🔄',
            position: { x: 650, y: 300 },
            connections: [`${areaId}-5`, `${areaId}-7`],
            isUnlocked: false
          },
          {
            id: `${areaId}-4`,
            name: 'Advanced Technique',
            description: `Master advanced techniques in ${area.name.toLowerCase()}.`,
            xpCost: 500,
            icon: '🔧',
            position: { x: 250, y: 200 },
            connections: [`${areaId}-8`],
            isUnlocked: false
          },
          {
            id: `${areaId}-5`,
            name: 'Integration',
            description: `Integrate ${area.name.toLowerCase()} into daily life.`,
            xpCost: 500,
            icon: '🔄',
            position: { x: 500, y: 100 },
            connections: [`${areaId}-8`],
            isUnlocked: false
          },
          {
            id: `${areaId}-6`,
            name: 'Innovation',
            description: `Bring creativity to ${area.name.toLowerCase()}.`,
            xpCost: 500,
            icon: '💡',
            position: { x: 600, y: 100 },
            connections: [`${areaId}-9`],
            isUnlocked: false
          },
          {
            id: `${areaId}-7`,
            name: 'Expertise',
            description: `Develop specialized expertise in ${area.name.toLowerCase()}.`,
            xpCost: 500,
            icon: '🎯',
            position: { x: 750, y: 200 },
            connections: [`${areaId}-9`],
            isUnlocked: false
          },
          {
            id: `${areaId}-8`,
            name: 'Mastery',
            description: `Achieve mastery in ${area.name.toLowerCase()}.`,
            xpCost: 1000,
            icon: '🏆',
            position: { x: 400, y: 50 },
            connections: [`${areaId}-10`],
            isUnlocked: false
          },
          {
            id: `${areaId}-9`,
            name: 'Leadership',
            description: `Lead others in ${area.name.toLowerCase()}.`,
            xpCost: 1000,
            icon: '👑',
            position: { x: 700, y: 50 },
            connections: [`${areaId}-10`],
            isUnlocked: false
          },
          {
            id: `${areaId}-10`,
            name: 'Transcendence',
            description: `Transcend conventional limits in ${area.name.toLowerCase()}.`,
            xpCost: 2000,
            icon: '✨',
            position: { x: 550, y: -50 },
            connections: [],
            isUnlocked: false
          }
        ];
    }
  };
  
  const handleUnlockSkill = (skill: Skill) => {
    if (skill.isUnlocked) return;
    
    // Check if prerequisites are met (connected skills are unlocked)
    const prerequisites = skills.filter(s => 
      s.connections.includes(skill.id) && !s.isUnlocked
    );
    
    if (prerequisites.length > 0) {
      alert('You need to unlock connected skills first!');
      return;
    }
    
    // Check if user has enough XP
    if (progress.experience < skill.xpCost) {
      alert(`Not enough XP! You need ${skill.xpCost} XP to unlock this skill.`);
      return;
    }
    
    // Update skills
    setSkills(skills.map(s => 
      s.id === skill.id ? { ...s, isUnlocked: true } : s
    ));
    
    // Update user data
    onUnlockSkill(skill.id, skill.xpCost);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.max(0.5, Math.min(2, zoom - e.deltaY * 0.001));
    setZoom(newZoom);
  };
  
  // Calculate connections with proper coordinates
  const renderConnections = () => {
    return skills.flatMap(skill => 
      skill.connections.map(targetId => {
        const target = skills.find(s => s.id === targetId);
        if (!target) return null;
        
        const isUnlocked = skill.isUnlocked && target.isUnlocked;
        const isAvailable = skill.isUnlocked && !target.isUnlocked;
        
        return (
          <line
            key={`${skill.id}-${targetId}`}
            x1={skill.position.x}
            y1={skill.position.y}
            x2={target.position.x}
            y2={target.position.y}
            stroke={
              isUnlocked ? '#10B981' : // Green for unlocked
              isAvailable ? '#6366F1' : // Purple for available
              '#94A3B8' // Gray for locked
            }
            strokeWidth={isUnlocked ? 4 : 2}
            strokeDasharray={isAvailable ? "5,5" : undefined}
          />
        );
      })
    );
  };
  
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-5xl w-full h-[80vh] rounded-xl bg-gray-900 shadow-xl overflow-hidden">
          <div className={`p-4 ${area.color} text-white flex justify-between items-center`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{area.icon}</span>
              <Dialog.Title className="text-xl font-bold">
                {area.name} Skill Tree
              </Dialog.Title>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-black/20 px-3 py-1 rounded-full text-sm">
                Available XP: {progress.experience}
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
          
          <div className="h-full relative overflow-hidden bg-gray-900">
            {/* Navigation controls */}
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <button 
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700"
              >
                +
              </button>
              <button 
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700"
              >
                -
              </button>
              <button 
                onClick={() => { setPan({ x: 0, y: 0 }); setZoom(1); }}
                className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Skill tree SVG */}
            <svg 
              ref={svgRef}
              width="100%" 
              height="100%" 
              viewBox={viewBox}
              style={{ 
                background: 'radial-gradient(circle, rgba(17,24,39,1) 0%, rgba(2,6,23,1) 100%)',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                {/* Grid lines for reference */}
                <g opacity="0.05">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={i * 100 - 500}
                      x2="1000"
                      y2={i * 100 - 500}
                      stroke="white"
                      strokeWidth="1"
                    />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={i * 100}
                      y1="-500"
                      x2={i * 100}
                      y2="1000"
                      stroke="white"
                      strokeWidth="1"
                    />
                  ))}
                </g>
                
                {/* Skill connections */}
                <g>
                  {renderConnections()}
                </g>
                
                {/* Skill nodes */}
                <g>
                  {skills.map((skill) => {
                    const isAvailable = !skill.isUnlocked && 
                      skills.some(s => 
                        s.connections.includes(skill.id) && 
                        s.isUnlocked
                      );
                      
                    return (
                      <g
                        key={skill.id}
                        transform={`translate(${skill.position.x}, ${skill.position.y})`}
                        onClick={() => setSelectedSkill(skill)}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Outer circle - changes color based on state */}
                        <circle
                          r="25"
                          fill={
                            skill.isRoot ? area.color.replace('bg-', 'fill-') : 
                            skill.isUnlocked ? 'rgb(16, 185, 129)' : // Green for unlocked
                            isAvailable ? 'rgb(99, 102, 241)' : // Purple for available
                            'rgb(148, 163, 184)' // Gray for locked
                          }
                          opacity={skill.isUnlocked || isAvailable ? 1 : 0.5}
                        />
                        
                        {/* Inner circle - for effect */}
                        <circle
                          r="20"
                          fill={
                            skill.isRoot ? area.color.replace('bg-', 'fill-') : 
                            skill.isUnlocked ? 'rgb(16, 185, 129)' : // Green for unlocked
                            isAvailable ? 'rgb(99, 102, 241)' : // Purple for available
                            'rgb(148, 163, 184)' // Gray for locked
                          }
                          opacity={skill.isUnlocked || isAvailable ? 0.9 : 0.3}
                        />
                        
                        {/* Skill icon */}
                        <text
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          fontSize="16"
                          fontFamily="emoji"
                        >
                          {skill.icon}
                        </text>
                        
                        {/* Skill name - only show for unlocked or available skills */}
                        {(skill.isUnlocked || isAvailable) && (
                          <text
                            y="40"
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {skill.name}
                          </text>
                        )}
                        
                        {/* Special effect indicator */}
                        {skill.specialEffect && skill.isUnlocked && (
                          <circle
                            r="5"
                            cy="-20"
                            fill="rgb(250, 204, 21)" // Yellow for special effect
                          />
                        )}
                      </g>
                    );
                  })}
                </g>
              </g>
            </svg>
            
            {/* Skill detail panel */}
            {selectedSkill && (
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{selectedSkill.icon}</span>
                      <h3 className="text-lg font-bold text-white">{selectedSkill.name}</h3>
                      {selectedSkill.specialEffect && (
                        <span className="px-2 py-0.5 rounded bg-yellow-900/50 text-yellow-300 text-xs">
                          Special Effect
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 mb-2">{selectedSkill.description}</p>
                    {selectedSkill.specialEffect && (
                      <p className="text-yellow-300 text-sm italic">{selectedSkill.specialEffect}</p>
                    )}
                  </div>
                  
                  {!selectedSkill.isUnlocked && !selectedSkill.isRoot && (
                    <button
                      onClick={() => handleUnlockSkill(selectedSkill)}
                      disabled={progress.experience < selectedSkill.xpCost}
                      className={`px-3 py-1 rounded flex items-center gap-1 text-sm ${
                        progress.experience >= selectedSkill.xpCost
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Unlock
                      <span className="flex items-center gap-1 text-xs bg-black/20 px-2 py-0.5 rounded-full">
                        {selectedSkill.xpCost} XP
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}