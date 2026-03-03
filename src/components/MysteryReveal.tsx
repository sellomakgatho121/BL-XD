"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";

const mysteryMessages = [
  {
    title: "INNOVATION",
    hint: "Intelligent systems that evolve",
    glitch: "01001001 01101110 01101110 01101111 01110110 01100001 01110100 01101001 01101111 01101110"
  },
  {
    title: "PRECISION", 
    hint: "Where code meets creativity",
    glitch: "01010000 01110010 01100101 01100011 01101001 01110011 01101001 01101111 01101110"
  },
  {
    title: "EVOLUTION",
    hint: "Next-generation web experiences",
    glitch: "01000101 01110110 01101111 01101100 01110101 01110101 01110101 01101111 01101110 01110011"
  }
];

const quirkyMessages = [
  {
    text: "Can't wait? Me too...",
    joke: "Our devs are writing code so fast, their keyboards are smoking. Fire department is on standby.",
    followUp: "How long would YOU wait for something amazing?"
  },
  {
    text: "What's taking them so long?!",
    joke: "Plot twist: The developer is currently stuck in a Stack Overflow rabbit hole from 2019.",
    followUp: "Ever fallen into a Wikipedia hole at 3am? Same energy."
  },
  {
    text: "Is it ready yet? How about now?",
    joke: "We've got 99 problems and 404 of them are 'page not found' errors.",
    followUp: "Patience is a virtue... that nobody has anymore, right?"
  },
  {
    text: "Refresh again. I dare you.",
    joke: "Fun fact: Every time you refresh, a developer somewhere loses 5 minutes of sleep.",
    followUp: "How many times have you refreshed today? Be honest."
  },
  {
    text: "The anticipation is killing me!",
    joke: "Our lead developer just discovered CSS Grid and hasn't slept in 3 days. Worth it? Absolutely.",
    followUp: "What's the last thing you got really excited about?"
  },
  {
    text: "Soon™ - Every developer ever",
    joke: "We're not late, we're just operating on 'developer time' where deadlines are suggestions.",
    followUp: "Do YOU run early, on time, or fashionably late?"
  },
  {
    text: "Building the future... slowly.",
    joke: "Rome wasn't built in a day, but this website? We're trying. Give us two days.",
    followUp: "What's something great that took longer than expected but was worth it?"
  },
  {
    text: "Good things come to those who wait!",
    joke: "Unless you're waiting for a JavaScript framework to load. Then it's just suffering.",
    followUp: "What's the best thing you've ever waited for?"
  },
  {
    text: "Pssst... want a sneak peek?",
    joke: "Just kidding! Our NDA is tighter than our code reviews. And those are BRUTAL.",
    followUp: "Are you patient or do you peek at birthday presents early?"
  },
  {
    text: "ETA: When it's ready ¯\\_(ツ)_/¯",
    joke: "Funny how 'almost done' in developer-speak means anywhere from 2 hours to 2 weeks.",
    followUp: "Ever given an estimate that was hilariously wrong?"
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
  const [quirkyIndex, setQuirkyIndex] = useState(-1); // -1 means showing default button
  const [showJoke, setShowJoke] = useState(false);
  // Generate random data once - reduced counts for performance
  const binaryRain = useMemo(() => generateBinaryRain(12), []);
  const floatingParticles = useMemo(() => generateFloatingParticles(5), []);

  // Mouse tracking with lower spring stiffness for performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const backgroundX = useTransform(mouseXSpring, [-100, 100], [0, 30]);
  const backgroundY = useTransform(mouseYSpring, [-100, 100], [0, 30]);

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 100;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 100;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleButtonClick = () => {
    // Cycle to next quirky message
    const nextIndex = (quirkyIndex + 1) % quirkyMessages.length;
    setQuirkyIndex(nextIndex);
    setShowJoke(false);
    
    // Show joke after a brief delay for comedic timing
    setTimeout(() => {
      setShowJoke(true);
    }, 800);
  };

  const current = mysteryMessages[currentIndex];
  const currentQuirky = quirkyIndex >= 0 ? quirkyMessages[quirkyIndex] : null;

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

        {/* Title - simplified animation without character-by-character reveals */}
        <motion.h2
          key={current.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isRevealing ? 0 : 1, 
            scale: isRevealing ? 0.9 : 1,
          }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut"
          }}
          className="text-4xl md:text-6xl font-black tracking-tighter font-mono mb-4"
        >
          <span className="inline-block text-signal-lime">
            {current.title}
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

        {/* Quirky Message Display */}
        <AnimatePresence mode="wait">
          {currentQuirky && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-4 px-4"
            >
              <motion.p
                className="text-lg md:text-xl text-siren-red font-mono tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentQuirky.text}
              </motion.p>
              
              {showJoke && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                  className="mt-2"
                >
                  <p className="text-sm md:text-base text-signal-lime/80 italic">
                    {currentQuirky.joke}
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-spectral-white/50 mt-2 font-mono"
                  >
                    {currentQuirky.followUp}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
            onClick={handleButtonClick}
            className="relative px-8 py-3 border border-signal-lime/50 bg-onyx/50 backdrop-blur-sm font-mono text-sm text-signal-lime tracking-widest uppercase transition-all hover:bg-signal-lime/10"
          >
            <span className="relative z-10">
              {currentQuirky ? "CLICK FOR MORE IMPATIENCE" : "AWAITING LAUNCH"}
            </span>
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
