"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global Animation Provider
 * Sets up the default physical spring behavior for all Framer Motion interactions.
 * This ensures that every animation organically follows the "High-Tension Cinematic" engine.
 */
export function AnimationProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      transition={{
        type: "spring",
        // These settings create a snappy, high-tension, premium feel, avoiding slow/linear animations
        stiffness: 150,
        damping: 18,
        mass: 1,
      }}
    >
      {children}
    </MotionConfig>
  );
}
