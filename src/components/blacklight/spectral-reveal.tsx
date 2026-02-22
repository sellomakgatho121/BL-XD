"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * SpectralReveal -- A custom page entrance and section reveal animation.
 * Unlike DistortionTransition (blur+hue-rotate), this uses a clip-path wipe
 * combined with a luminous afterglow trail that follows the reveal edge.
 */

interface SpectralRevealProps {
  children: ReactNode;
  /** Direction the reveal wipes from */
  direction?: "left" | "bottom" | "diagonal";
  /** Delay before animation starts */
  delay?: number;
  /** Whether to trigger on scroll into view */
  onScroll?: boolean;
  /** CSS class additions */
  className?: string;
}

const clipPaths = {
  left: {
    hidden: "inset(0 100% 0 0)",
    visible: "inset(0 0% 0 0)",
  },
  bottom: {
    hidden: "inset(100% 0 0 0)",
    visible: "inset(0% 0 0 0)",
  },
  diagonal: {
    hidden: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  },
};

export default function SpectralReveal({
  children,
  direction = "left",
  delay = 0,
  onScroll = false,
  className = "",
}: SpectralRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const shouldAnimate = onScroll ? isInView : true;
  const paths = clipPaths[direction];

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Afterglow trail -- a luminous edge that leads the reveal */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: [0, 0.8, 0] } : {}}
        transition={{
          duration: 1.2,
          delay: delay + 0.1,
          ease: "easeOut",
        }}
      >
        <div
          className={`absolute ${
            direction === "left"
              ? "top-0 bottom-0 w-px right-0"
              : direction === "bottom"
              ? "left-0 right-0 h-px top-0"
              : "top-0 bottom-0 w-px right-0"
          }`}
          style={{
            background:
              direction === "diagonal"
                ? "linear-gradient(180deg, var(--signal-lime), transparent)"
                : "var(--signal-lime)",
            boxShadow: "0 0 20px var(--signal-lime), 0 0 60px var(--signal-lime)",
          }}
        />
      </motion.div>

      {/* Content reveal */}
      <motion.div
        initial={{
          clipPath: paths.hidden,
          opacity: 0,
        }}
        animate={
          shouldAnimate
            ? {
                clipPath: paths.visible,
                opacity: 1,
              }
            : {}
        }
        transition={{
          clipPath: {
            duration: 0.9,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
          opacity: {
            duration: 0.4,
            delay,
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
