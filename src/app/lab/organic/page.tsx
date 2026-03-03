"use client";

import InfiniteCanvas from "@/components/lab/InfiniteCanvas";
import OrganicScene from "@/components/lab/OrganicScene";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function OrganicLab() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen">
      <InfiniteCanvas>
        <OrganicScene />
      </InfiniteCanvas>

      {/* Persistent UI Overlay */}
      <div className="absolute top-10 left-10 z-20 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white text-xs font-mono tracking-[0.5em] uppercase"
        >
          Project / Organism
        </motion.h1>
      </div>

      {/* Subtle interaction feedback for functional areas */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(215,255,0,0.3)" }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-2 border border-signal-lime/30 bg-black/40 backdrop-blur-md text-signal-lime text-[10px] font-mono tracking-widest uppercase"
        >
          Initiate Contact
        </motion.button>
      </div>
    </div>
  );
}
