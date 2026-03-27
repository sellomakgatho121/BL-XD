"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";
import { HelpCircle, Sparkles, Mouse, Mail } from "lucide-react";

const quirkyTips = [
  {
    icon: Mouse,
    title: "Mess With the Background",
    description: "Move your mouse around the quantum thing above. See how it responds? That's you messing with the pretty lights!",
    position: "top-4 right-4"
  },
  {
    icon: Sparkles,
    title: "Check the Glitchy Text",
    description: "Those weird messages that change? They're hinting at what we're building. Hover over them for extra chaos!",
    position: "top-4 left-4"
  },
  {
    icon: Mail,
    title: "Get Early Access",
    description: "Down below, there's an email form. Drop your address and we'll tell you when we actually launch!",
    position: "bottom-4 right-4"
  },
  {
    icon: HelpCircle,
    title: "Countdown Timer",
    description: "The numbers ticking down? That's when we go live. June 1st, 2026. Set a reminder!",
    position: "bottom-4 left-4"
  }
];

const generateSparkleData = (count: number) => {
  return Array.from({ length: count }, () => ({
    animateX: (Math.random() - 0.5) * 40,
    animateY: (Math.random() - 0.5) * 40,
    top: 20 + Math.random() * 60,
    left: 10 + Math.random() * 80,
    delay: Math.random() * 0.3,
  }));
};

export default function ClientGuide() {
  const [activeTip, setActiveTip] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  // Mouse tracking with lower spring stiffness for performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-100, 100], [3, -3]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], [-3, 3]);

  // Generate sparkle data once - reduced count
  const sparkleData = useMemo(() => generateSparkleData(2), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % quirkyTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Hide guide after user has seen all tips - shorter duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(false);
    }, 20000); // Show for 20 seconds total
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 100;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 100;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  if (!showGuide) return null;

  const currentTip = quirkyTips[activeTip];
  const Icon = currentTip.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 0.8, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseMove={handleMouseMove}
      className={`fixed ${currentTip.position} z-40 max-w-xs`}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Subtle Glow Effect */}
        <motion.div
          className="absolute -inset-1 bg-signal-lime/5 blur-sm rounded-lg"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Content */}
        <div className="relative bg-onyx/80 backdrop-blur-sm border border-signal-lime/20 rounded-lg p-3 shadow-lg">
          {/* Close Button */}
          <button
            onClick={() => setShowGuide(false)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-spectral-white/20 hover:bg-spectral-white/30 rounded-full flex items-center justify-center text-spectral-white/60 text-xs transition-colors"
          >
            ×
          </button>

          {/* Icon */}
          <div className="flex items-center gap-2 mb-2">
            <Icon className="text-signal-lime/60" size={14} />
            <span className="text-xs font-mono text-signal-lime/60 font-bold">
              TIP_0{activeTip + 1}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-spectral-white/90 mb-1 font-mono">
            {currentTip.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-spectral-white/50 leading-relaxed">
            {currentTip.description}
          </p>

          {/* Progress Indicator */}
          <div className="flex gap-1 mt-3 justify-center">
            {quirkyTips.map((_, idx) => (
              <motion.div
                key={idx}
                className="h-1 w-4 bg-spectral-white/20 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-signal-lime"
                  initial={{ x: "-100%" }}
                  animate={{ 
                    x: idx === activeTip ? "0%" : idx < activeTip ? "100%" : "-100%" 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subtle Floating Sparkles */}
        {sparkleData.map((sparkle, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-signal-lime/30 rounded-full"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 0.5, 0],
              x: [0, sparkle.animateX],
              y: [0, sparkle.animateY],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
            style={{
              top: `${sparkle.top}%`,
              left: `${sparkle.left}%`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
