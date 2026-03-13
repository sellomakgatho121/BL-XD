"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: Fluid, 1: Brutalist Grid, 2: Kinetic Typography, 3: Extrude

  useEffect(() => {
    // Simulate loading progress since Spline manages its own remote assets independently
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setPhase(1), 500);
      setTimeout(() => setPhase(2), 2000);
      setTimeout(() => setPhase(3), 3500);
      setTimeout(() => onComplete(), 5000);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-onyx overflow-hidden pointer-events-none"
        >
          {/* Phase 0: Fluid Gradients */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 0 ? 1 : 0 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-signal-lime)_0%,_transparent_50%)] blur-[100px] opacity-20"
          />

          {/* Phase 1: Harsh Brutalist Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.2 : 0 }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#151515_1px,transparent_1px),linear-gradient(to_bottom,#151515_1px,transparent_1px)] bg-[size:4rem_4rem]"
          />

          {/* Phase 2: Kinetic typography morphing block blending into 3D */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center transform-gpu"
            animate={{
              scale: phase === 3 ? 15 : phase === 2 ? 1.2 : 1,
              opacity: phase === 3 ? 0 : 1,
              rotateX: phase >= 2 ? 15 : 0,
              rotateY: phase >= 2 ? -10 : 0,
            }}
            transition={{ type: "spring", damping: phase === 3 ? 40 : 12, stiffness: phase === 3 ? 50 : 100 }}
            style={{ perspective: "1000px" }}
          >
            <motion.h1
              className="text-6xl md:text-[10rem] font-black font-[family-name:var(--font-playfair)] tracking-tighter text-spectral-white"
              style={{
                textShadow: "0px 10px 30px rgba(0,0,0,0.8), -2px -2px 0 #D7FF00, 4px 4px 0 #FF003C",
                transformStyle: "preserve-3d"
              }}
              initial={{ z: -500, opacity: 0 }}
              animate={{ z: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 1.5 }}
            >
              <span className="text-signal-lime block mb-[-2rem]">BLACK</span>
              <span>LIGHT</span>
            </motion.h1>
            <motion.div
              className="h-1 bg-siren-red mt-4"
              animate={{ width: progress + "%" }}
              transition={{ duration: 0.1 }}
            />
            <p className="mt-8 font-space-grotesk font-bold text-spectral-white/50 tracking-widest uppercase text-sm border border-spectral-white/20 px-4 py-2 bg-onyx/50 backdrop-blur-md">
              Weaving Digital Space {Math.round(progress)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
