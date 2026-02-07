"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GrainOverlayProps {
  opacity?: number;
  blendMode?: "normal" | "multiply" | "overlay" | "soft-light";
}

export default function GrainOverlay({
  opacity = 0.05,
  blendMode = "overlay",
}: GrainOverlayProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{
        opacity,
        mixBlendMode: blendMode,
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        transform: "translateZ(0)",
      }}
    />
  );
}

// Alternative: Animated grain component for more dynamic texture
export function AnimatedGrain({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{
        opacity,
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        transform: "translateZ(0)",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    />
  );
}
