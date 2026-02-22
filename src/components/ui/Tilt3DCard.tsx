"use client";

import { useRef, useState, useCallback, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Perspective distance (lower = more dramatic) */
  perspective?: number;
  /** Glare effect color */
  glareColor?: string;
  /** Enable glare overlay */
  glare?: boolean;
  /** Scale on hover */
  hoverScale?: number;
  /** Border highlight color on hover */
  borderColor?: string;
}

/**
 * Tilt3DCard
 * A CSS-only 3D perspective tilt card that responds to mouse position.
 * No WebGL required - pure CSS transforms for performance.
 * Brand: Zero-radius, sharp edges, with Signal Lime glare highlights.
 */
export function Tilt3DCard({
  children,
  className = "",
  maxTilt = 12,
  perspective = 800,
  glareColor = "rgba(215, 255, 0, 0.08)",
  glare = true,
  hoverScale = 1.02,
  borderColor = "rgba(215, 255, 0, 0.3)",
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth, weighted tilt
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  // Glare position
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  // Glare gradient - must be at top level (not conditional) per Rules of Hooks
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${glareColor}, transparent 60%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative gpu-accelerated ${className}`}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovering ? hoverScale : 1,
          borderColor: isHovering ? borderColor : "rgba(253, 253, 253, 0.08)",
        }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 15 } }}
      >
        {/* Card content */}
        <div className="relative z-10 w-full h-full">{children}</div>

        {/* Glare overlay */}
        {glare && isHovering && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ background: glareBackground }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Edge highlight - 3D depth illusion */}
        {isHovering && (
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              transform: "translateZ(-2px)",
              boxShadow: `0 0 30px ${glareColor}, 0 0 60px rgba(215, 255, 0, 0.03)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
