"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { HelpCircle, Sparkles, Mouse, Mail } from "lucide-react";

const quirkyTips = [
  {
    icon: Mouse,
    title: "Control Your Interface",
    description: "Move your mouse around the quantum field above. See how it responds? That&apos;s you controlling the digital energy!",
    position: "top-4 right-4"
  },
  {
    icon: Sparkles,
    title: "Watch the System Messages",
    description: "Those dynamic messages that change? They&apos;re hinting at something amazing coming soon. Hover over them for extra effects!",
    position: "top-4 left-4"
  },
  {
    icon: Mail,
    title: "Get Notified First",
    description: "Down below, there&apos;s a notification portal (newsletter form). Enter your email to get launch updates when we go live!",
    position: "bottom-4 right-4"
  },
  {
    icon: HelpCircle,
    title: "Countdown to Launch",
    description: "The numbers ticking down? That&apos;s when the system goes live. Mark your calendar for the big reveal!",
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);
  
  const rotateX = useTransform(mouseYSpring, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], [-5, 5]);

  // Generate sparkle data once
  const sparkleData = useMemo(() => generateSparkleData(3), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % quirkyTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Hide guide after user has seen all tips
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(false);
    }, 35000); // Show for 35 seconds total
    return () => clearTimeout(timer);
  }, []);

  if (!showGuide) return null;

  const currentTip = quirkyTips[activeTip];
  const Icon = currentTip.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
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
        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-2 bg-signal-lime/20 blur-xl rounded-lg"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Content */}
        <div className="relative bg-onyx/90 backdrop-blur-md border border-signal-lime/30 rounded-lg p-4 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={() => setShowGuide(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-siren-red rounded-full flex items-center justify-center text-white text-xs hover:bg-siren-red/80 transition-colors"
          >
            ×
          </button>

          {/* Icon */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2 mb-2"
          >
            <Icon className="text-signal-lime" size={16} />
            <span className="text-xs font-mono text-signal-lime font-bold">
              PRO-TIP #{activeTip + 1}
            </span>
          </motion.div>

          {/* Title */}
          <h3 className="text-sm font-bold text-spectral-white mb-2 font-mono">
            {currentTip.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-spectral-white/70 leading-relaxed">
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

        {/* Floating Sparkles */}
        {sparkleData.map((sparkle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-signal-lime rounded-full"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, sparkle.animateX],
              y: [0, sparkle.animateY],
            }}
            transition={{
              duration: 2,
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
