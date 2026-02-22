"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * MagneticButton -- A CTA button with a magnetic cursor-follow effect.
 * The button subtly moves toward the cursor when hovering nearby,
 * and has a "charge up" glow animation on click.
 */

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  /** Strength of the magnetic pull (px) */
  strength?: number;
  /** Glow color on hover */
  glowColor?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 15,
  glowColor = "var(--signal-lime)",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Glow intensity based on distance
  const glowOpacity = useTransform(
    [springX, springY],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(latestX * latestX + latestY * latestY);
      return Math.min(0.6, distance / (strength * 2));
    }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(circle at 50% 50%, ${glowColor}20, transparent 70%)`,
          boxShadow: `0 0 30px ${glowColor}15`,
        }}
      />

      {/* Shine sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${glowColor}10 45%, ${glowColor}05 55%, transparent 60%)`,
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
