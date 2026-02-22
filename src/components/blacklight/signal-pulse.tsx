"use client";

import { motion } from "framer-motion";

/**
 * SignalPulse -- A horizontal bar of animated circuit nodes connected by signal lines.
 * Each node pulses in sequence, with data flowing along the connecting lines.
 * Distinct from SystemStatus (text ticker) -- this is a visual-only circuit animation.
 */

const nodes = [
  { label: "DISCOVER", x: 8 },
  { label: "ARCHITECT", x: 28 },
  { label: "BUILD", x: 48 },
  { label: "OPTIMIZE", x: 68 },
  { label: "LAUNCH", x: 88 },
];

export default function SignalPulse() {
  return (
    <div className="relative w-full py-8 overflow-hidden border-y border-[var(--border)]">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 v20 M0 30 h20 M40 30 h20 M30 40 v20" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-[var(--signal-lime)]" />
            <circle cx="30" cy="30" r="2" fill="currentColor" className="text-[var(--signal-lime)]" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Connection line */}
        <svg className="absolute top-1/2 left-[8%] right-[12%] h-[2px] -translate-y-1/2" preserveAspectRatio="none" style={{ width: "80%" }}>
          <line x1="0" y1="1" x2="100%" y2="1" stroke="var(--border)" strokeWidth="2" />
          {/* Animated signal traveling along the line */}
          <motion.line
            x1="0"
            y1="1"
            x2="15%"
            y2="1"
            stroke="var(--signal-lime)"
            strokeWidth="2"
            animate={{
              x1: ["0%", "85%"],
              x2: ["15%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>

        {/* Nodes */}
        <div className="relative flex justify-between items-center">
          {nodes.map((node, i) => (
            <motion.div
              key={node.label}
              className="flex flex-col items-center gap-2 z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {/* Node circle */}
              <motion.div
                className="relative w-4 h-4"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Outer glow */}
                <div className="absolute inset-0 bg-[var(--signal-lime)] rounded-full opacity-20 blur-sm scale-150" />
                {/* Core */}
                <div className="absolute inset-0 bg-[var(--signal-lime)] rounded-full" />
                {/* Inner bright spot */}
                <div className="absolute inset-[3px] bg-[var(--spectral-white)] rounded-full opacity-60" />
              </motion.div>

              {/* Label */}
              <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--spectral-white)]/40 uppercase hidden sm:block">
                {node.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
