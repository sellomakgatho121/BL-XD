"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const mysteryMessages = [
  {
    title: "CONSCIOUSNESS",
    hint: "Digital experiences that think",
    glitch: "01100110 01110101 01110100 01110101 01110010 01100101"
  },
  {
    title: "RESONANCE", 
    hint: "Where technology meets emotion",
    glitch: "01110010 01100101 01110011 01101111 01101110 01100001 01101110 01100011 01100101"
  },
  {
    title: "TRANSCENDENCE",
    hint: "Beyond the digital frontier",
    glitch: "01110100 01110010 01100001 01101110 01110011 01100011 01100101 01101110 01100100 01100101 01101110 01100011 01100101"
  }
];

const generateBinaryRain = (count: number) => {
  return Array.from({ length: count }, () => ({
    char: Math.random() > 0.5 ? "1" : "0",
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
  }));
};

const generateFloatingParticles = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    animateX: Math.random() * 200 - 100,
    animateY: Math.random() * 200 - 100,
    duration: 4 + Math.random() * 2,
    delay: Math.random() * 2,
  }));
};

export default function MysteryReveal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);
  
  const backgroundX = useTransform(mouseXSpring, [-100, 100], [0, 50]);
  const backgroundY = useTransform(mouseYSpring, [-100, 100], [0, 50]);

  // Generate random data once
  const binaryRain = useMemo(() => generateBinaryRain(20), []);
  const floatingParticles = useMemo(() => generateFloatingParticles(8), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRevealing(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mysteryMessages.length);
        setIsRevealing(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 100;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const current = mysteryMessages[currentIndex];

  return (
    <motion.div 
      className="relative mt-16 mb-12 p-8 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${50}% ${50}%, rgba(0, 255, 0, 0.05) 0%, transparent 50%)`,
      }}
    >
      {/* Animated Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(#00FF00 1px, transparent 1px), linear-gradient(90deg, #00FF00 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          x: backgroundX,
          y: backgroundY,
        }}
      />

      {/* Glitch Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Binary Rain Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {binaryRain.map((drop, i) => (
            <motion.div
              key={i}
              className="absolute text-green-500/10 font-mono text-xs"
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: ["0%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: drop.duration,
                repeat: Infinity,
                delay: drop.delay,
                ease: "linear",
              }}
              style={{
                left: `${drop.left}%`,
              }}
            >
              {drop.char}
            </motion.div>
          ))}
        </div>

        {/* Title */}
        <motion.h2
          key={current.title}
          initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
          animate={{ 
            opacity: isRevealing ? 0 : 1, 
            scale: isRevealing ? 0.8 : 1,
            rotateX: isRevealing ? 90 : 0,
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="text-4xl md:text-6xl font-black tracking-tighter font-mono mb-4"
        >
          <span className="inline-block">
            {current.title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="inline-block text-signal-lime"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h2>

        {/* Glitch Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealing ? 0 : 0.3 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-xs text-spectral-white/20 mb-6 tracking-widest"
        >
          {current.glitch}
        </motion.div>

        {/* Hint */}
        <motion.p
          key={current.hint}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isRevealing ? 0 : 0.7, 
            y: isRevealing ? -20 : 0 
          }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2 
          }}
          className="text-lg md:text-xl text-spectral-white/70 font-light tracking-wide mb-8"
        >
          {current.hint}
        </motion.p>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-signal-lime rounded-full"
              initial={{ 
                opacity: 0,
                scale: 0,
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: particle.animateX,
                y: particle.animateY,
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-signal-lime/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 border border-signal-lime/50 bg-onyx/50 backdrop-blur-sm font-mono text-sm text-signal-lime tracking-widest uppercase transition-all hover:bg-signal-lime/10"
          >
            <span className="relative z-10">AWAITING LAUNCH</span>
          </motion.button>
        </motion.div>

        {/* Progress Indicators */}
        <div className="flex gap-2 justify-center mt-8">
          {mysteryMessages.map((_, idx) => (
            <motion.div
              key={idx}
              className="h-0.5 w-8 bg-spectral-white/20 overflow-hidden"
            >
              <motion.div
                className="h-full bg-signal-lime"
                initial={{ x: "-100%" }}
                animate={{ 
                  x: idx === currentIndex ? "0%" : idx < currentIndex ? "100%" : "-100%" 
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
