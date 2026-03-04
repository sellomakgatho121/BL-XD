"use client";

import InfiniteCanvas from "@/components/lab/InfiniteCanvas";
import SpatialScene from "@/components/lab/SpatialScene";
import { useState } from "react";

export default function SpatialLab() {
  const [depth, setDepth] = useState(0);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <InfiniteCanvas>
        <SpatialScene />
      </InfiniteCanvas>

      {/* Floating HUD */}
      <div className="absolute top-10 left-10 z-20 pointer-events-none">
        <h1 className="text-blue-500 text-xs font-mono tracking-[0.5em] uppercase">PROJECT / SPATIAL</h1>
      </div>

      <div className="absolute bottom-10 left-10 z-20 flex flex-col gap-2">
        <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Z-Axis Depth</div>
        <div className="w-48 h-[1px] bg-white/10 relative">
           <div
             className="absolute top-0 left-0 h-full bg-blue-500"}
           />
        </div>
      </div>

      {/* Subtle interaction node for functional areas */}
      <div className="absolute top-10 right-10 z-20 flex flex-col items-end gap-4">
        <div}
          className="p-6 bg-blue-500/5 backdrop-blur-3xl border border-blue-500/20 text-blue-500 font-mono text-[9px] cursor-pointer"
        >
          <div className="mb-2 opacity-50 uppercase">Active Sector</div>
          <div className="text-xl font-black text-white">NEXUS_ALPHA</div>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-1 h-1 bg-blue-500 animate-pulse rounded-full" />
            <span className="opacity-40 uppercase">Synchronized</span>
          </div>
        </div>
      </div>
    </div>
  );
}
