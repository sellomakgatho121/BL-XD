"use client";

import InfiniteCanvas from "@/components/lab/InfiniteCanvas";
import BrutalistScene from "@/components/lab/BrutalistScene";
import { motion } from "framer-motion";

export default function BrutalistLab() {
  return (
    <div className="relative w-full h-screen bg-[#111] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#fff_1px,#fff_2px)] bg-[size:100%_4px]" />
      </div>

      <InfiniteCanvas>
        <BrutalistScene />
      </InfiniteCanvas>

      {/* Top Banner */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20 border-b border-white/10 bg-black">
        <h1 className="text-white text-xs font-mono tracking-tighter">PROJECT / ARCHAEOLOGY</h1>
        <div className="text-white text-[8px] font-mono opacity-50 uppercase">STATUS: UNSTABLE</div>
      </div>

      {/* Sidebar functional area */}
      <div className="absolute top-20 right-0 w-64 p-6 z-20 bg-black border-l border-white/10 hidden md:block h-[calc(100vh-80px)]">
        <div className="space-y-8">
          <div>
            <h3 className="text-white text-[10px] font-mono tracking-widest uppercase mb-4 text-siren-red">Active Nodes</h3>
            <ul className="text-white/40 text-[9px] font-mono space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer">[ 01 ] CORE_MODULE</li>
              <li className="hover:text-white transition-colors cursor-pointer">[ 02 ] ARCHIVE_STREAM</li>
              <li className="hover:text-white transition-colors cursor-pointer">[ 03 ] PROTOCOL_LAYER</li>
            </ul>
          </div>
          <div className="pt-8 border-t border-white/5">
             <button className="w-full py-4 bg-white text-black text-[10px] font-mono font-black uppercase hover:invert transition-all">
                Access Archives
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
