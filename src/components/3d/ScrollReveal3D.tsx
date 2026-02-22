"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollReveal3DProps {
  children: ReactNode;
  className?: string;
  /** Rotation axis: which 3D axis to rotate on reveal */
  axis?: "x" | "y" | "both";
  /** Maximum rotation angle */
  maxRotation?: number;
  /** Parallax shift amount */
  parallaxShift?: number;
  /** Scale range on scroll */
  scaleRange?: [number, number];
}

/**
 * ScrollReveal3D
 * Wraps content in a scroll-driven 3D transformation.
 * Elements rotate, scale, and shift in perspective as they enter the viewport.
 * Brand: High-tension cinematic reveals with depth.
 */
export function ScrollReveal3D({
  children,
  className = "",
  axis = "x",
  maxRotation = 8,
  parallaxShift = 50,
  scaleRange = [0.92, 1],
}: ScrollReveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 80, damping: 25, mass: 0.8 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const rotateX = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    axis === "x" || axis === "both" ? [maxRotation, 0, 0, -maxRotation * 0.5] : [0, 0, 0, 0]
  );
  const rotateY = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    axis === "y" || axis === "both" ? [-maxRotation, 0, 0, maxRotation * 0.5] : [0, 0, 0, 0]
  );
  const y = useTransform(smoothProgress, [0, 0.5, 1], [parallaxShift, 0, -parallaxShift * 0.3]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [scaleRange[0], scaleRange[1], scaleRange[1], scaleRange[0]]);
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={`gpu-accelerated ${className}`}
      style={{
        perspective: 1000,
        perspectiveOrigin: "center",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          y,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
