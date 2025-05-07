"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

interface AnimatedBackgroundProps {
  color: string;
  particleCount?: number;
  className?: string;
}

export function AnimatedBackground({ 
  color, 
  particleCount = 30,
  className = ""
}: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Generate particles based on the area color
    const baseColor = getBaseColor(color);
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        color: baseColor,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    
    setParticles(newParticles);
  }, [color, particleCount]);
  
  // Extract color from Tailwind class
  const getBaseColor = (colorClass: string): string => {
    const colorMap: {[key: string]: string} = {
      'bg-purple-600': 'rgba(147, 51, 234, 0.3)',
      'bg-red-500': 'rgba(239, 68, 68, 0.3)',
      'bg-blue-500': 'rgba(59, 130, 246, 0.3)',
      'bg-green-500': 'rgba(34, 197, 94, 0.3)',
      'bg-yellow-500': 'rgba(234, 179, 8, 0.3)',
      'bg-pink-500': 'rgba(236, 72, 153, 0.3)',
      'bg-orange-500': 'rgba(249, 115, 22, 0.3)',
      'bg-indigo-600': 'rgba(79, 70, 229, 0.3)',
      'bg-amber-500': 'rgba(245, 158, 11, 0.3)',
      // Add more colors as needed
    };
    
    return colorMap[colorClass] || 'rgba(107, 114, 128, 0.3)';
  };
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50, 
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50
            ],
            y: [
              Math.random() * 100 - 50, 
              Math.random() * 100 - 50,
              Math.random() * 100 - 50, 
              Math.random() * 100 - 50
            ],
            opacity: [0.1, 0.5, 0.2, 0],
            scale: [1, 1.5, 2, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}