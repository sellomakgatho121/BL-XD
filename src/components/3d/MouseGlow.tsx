"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect } from "react";

interface MouseGlowProps {
  /** Glow color */
  color?: string;
  /** Glow size in pixels */
  size?: number;
  /** Glow opacity */
  opacity?: number;
  /** Blur radius */
  blur?: number;
}

/**
 * MouseGlow
 * A page-level glowing orb that follows the cursor with spring physics.
 * Creates an ambient interactive light effect across the page.
 * Brand: Signal Lime glow on the Onyx void.
 */
export function MouseGlow({
  color = "#D7FF00",
  size = 400,
  opacity = 0.06,
  blur = 80,
}: MouseGlowProps) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { stiffness: 50, damping: 30, mass: 1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
    },
    [mouseX, mouseY, size]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden="true"
    >
      <motion.div
        style={{
          position: "absolute",
          width: size,
          height: size,
          x,
          y,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity,
          filter: `blur(${blur}px)`,
          borderRadius: "50%",
          willChange: "transform",
        }}
      />
    </motion.div>
  );
}
