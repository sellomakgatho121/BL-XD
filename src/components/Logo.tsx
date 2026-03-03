"use client";

import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* Outer hexagon */}
        <motion.div
          className="absolute inset-0 bg-signal-lime/5"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          >
            <path
              d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z"
              className="text-signal-lime/30"
            />
          </svg>
        </motion.div>

        {/* Inner circuit pattern */}
        <svg
          viewBox="0 0 100 100"
          className="w-12 h-12 relative z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {/* Central node */}
          <circle cx="50" cy="50" r="8" className="text-signal-lime" fill="currentColor" />
          
          {/* Circuit lines */}
          <motion.path
            d="M50 42 L50 25 M50 58 L50 75 M42 50 L25 50 M58 50 L75 50"
            className="text-signal-lime/60"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Diagonal circuits */}
          <motion.path
            d="M35 35 L65 65 M65 35 L35 65"
            className="text-signal-lime/40"
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Outer nodes */}
          <circle cx="50" cy="25" r="3" className="text-signal-lime/80" />
          <circle cx="50" cy="75" r="3" className="text-signal-lime/80" />
          <circle cx="25" cy="50" r="3" className="text-signal-lime/80" />
          <circle cx="75" cy="50" r="3" className="text-signal-lime/80" />
          
          {/* Corner nodes */}
          <circle cx="35" cy="35" r="2" className="text-signal-lime/60" />
          <circle cx="65" cy="35" r="2" className="text-signal-lime/60" />
          <circle cx="35" cy="65" r="2" className="text-signal-lime/60" />
          <circle cx="65" cy="65" r="2" className="text-signal-lime/60" />
        </svg>

        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 bg-signal-lime/20 blur-lg"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Logo text */}
      <div className="flex flex-col">
        <motion.span
          className="text-xl font-bold tracking-tighter text-spectral-white"
          whileHover={{ letterSpacing: "0.1em" }}
          transition={{ duration: 0.2 }}
        >
          BLACKLIGHT
        </motion.span>
        <motion.span
          className="text-[8px] font-mono tracking-[0.3em] text-signal-lime/60"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          WEB DESIGNS
        </motion.span>
      </div>
    </div>
  );
}
