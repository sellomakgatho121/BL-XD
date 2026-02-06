"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

// Generate random values once during component mount
const generateRandomValues = (count: number, min: number, max: number) => {
  return Array.from({ length: count }, () => Math.random() * (max - min) + min);
};

const generateParticleData = (count: number) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      animateX: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
      animateY: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    });
  }
  return particles;
};

export default function QuantumField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);
  
  const rotateX = useTransform(mouseYSpring, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], [-15, 15]);

  // Generate particle data once
  const particleData = useMemo(() => generateParticleData(50), []);
  const streamDelays = useMemo(() => generateRandomValues(5, 0, 0.8), []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 100;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      {/* Quantum Particles */}
      <div className="absolute inset-0">
        {particleData.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-signal-lime rounded-full"
            initial={{
              x: particle.initialX,
              y: particle.initialY,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: particle.animateX,
              y: particle.animateY,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            style={{
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Energy Grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "50px 50px, 50px 50px, 50px 50px, 50px 50px",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      />

      {/* Central Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative w-full h-full">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-signal-lime/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Middle Ring */}
          <motion.div
            className="absolute inset-4 border border-signal-lime/50 rounded-full"
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          
          {/* Inner Core */}
          <motion.div
            className="absolute inset-8 bg-signal-lime rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              filter: "blur(8px)",
            }}
          />
        </div>
      </motion.div>

      {/* Scanning Lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent"
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Data Streams */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-signal-lime to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: ["0%", "100%", "0%"],
              opacity: [0, 1, 0],
              x: ["0%", "0%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: streamDelays[i],
              ease: "easeInOut",
            }}
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
            }}
          />
        ))}
    </div>
  );
}
