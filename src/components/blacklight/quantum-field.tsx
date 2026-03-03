"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useMemo, useState, useCallback, memo } from "react";

interface QuantumFieldProps {
  className?: string;
}

const generateParticleData = (count: number) => {
  return Array.from({ length: count }, () => ({
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    animateX: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
    animateY: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
  }));
};

const QuantumField = memo(function QuantumField({ className = "" }: QuantumFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], [-15, 15]);

  const particleData = useMemo(() => generateParticleData(30), []);
  const STREAM_DELAYS = [0.12, 0.45, 0.23, 0.67, 0.34]; // Pre-calculated pseudo-random values

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !isHovering) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 100;
      const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 100;
      mouseX.set(x);
      mouseY.set(y);
    },
    [isHovering, mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-96 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Particles */}
      <div className="absolute inset-0">
        {particleData.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--signal-lime)] rounded-full"
            initial={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              left: particle.animateX.map((x) => `${x}%`),
              top: particle.animateY.map((y) => `${y}%`),
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            style={{ filter: "blur(0.5px)", willChange: "transform" }}
          />
        ))}

        {isHovering && (
          <motion.div
            className="absolute w-2 h-2 bg-[var(--signal-lime)] rounded-full"
            style={{
              left: "50%",
              top: "50%",
              x: mouseX,
              y: mouseY,
              filter: "blur(2px)",
              willChange: "transform",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Energy Grid */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(215, 255, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(215, 255, 0, 0.1) 0%, transparent 50%),
              linear-gradient(0deg, transparent 24%, rgba(215, 255, 0, 0.05) 25%, rgba(215, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(215, 255, 0, 0.05) 75%, rgba(215, 255, 0, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(215, 255, 0, 0.05) 25%, rgba(215, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(215, 255, 0, 0.05) 75%, rgba(215, 255, 0, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px, 50px 50px, 50px 50px, 50px 50px",
          }}
        />
      </motion.div>

      {/* Central Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 border-2 border-[var(--signal-lime)]/30 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-4 border border-[var(--signal-lime)]/50 rounded-full"
            animate={{ scale: [1, 0.8, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-8 bg-[var(--signal-lime)] rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ filter: "blur(8px)" }}
          />
        </div>
      </motion.div>

      {/* Scanning Lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--signal-lime)]/10 to-transparent"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Data Streams */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-[var(--signal-lime)] to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: ["0%", "100%", "0%"],
            opacity: [0, 1, 0],
            x: ["0%", "0%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: STREAM_DELAYS[i],
            ease: "easeInOut",
          }}
          style={{ top: `${20 + i * 15}%`, left: 0 }}
        />
      ))}

      {/* Hint */}
      <div className="absolute top-2 right-2 text-xs font-mono text-[var(--spectral-muted)]">
        🖱️ MOVE MOUSE
      </div>
    </div>
  );
});

export default QuantumField;
