"use client";

import InfiniteCanvas from "@/components/lab/InfiniteCanvas";
import OrganicScene from "@/components/lab/OrganicScene";
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
        <h1
          className="text-white text-xs font-mono tracking-[0.5em] uppercase"
        >
          Project / Organism
        </h1>
      </div>

      {/* Subtle interaction feedback for functional areas */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4">
        <button
          className="px-6 py-2 border border-signal-lime/30 bg-black/40 backdrop-blur-md text-signal-lime text-[10px] font-mono tracking-widest uppercase"
        >
          Initiate Contact
        </button>
      </div>
    </div>
  );
}
