"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, RefreshCw, Copy, Check } from "lucide-react";

const INDUSTRIES = ["Tech", "Finance", "Wellness", "Cyber"];
const VIBES = ["Minimal", "Bold", "Trust", "Luxury"];

const PALETTES: Record<string, string[]> = {
  "Tech-Minimal": ["#111111", "#A3E635", "#FFFFFF"],
  "Tech-Bold": ["#000000", "#FF003C", "#3B82F6"],
  "Tech-Trust": ["#0F172A", "#38BDF8", "#94A3B8"],
  "Tech-Luxury": ["#0C0C0C", "#D4AF37", "#262626"],
  "Finance-Minimal": ["#ffffff", "#1e293b", "#64748b"],
  "Finance-Bold": ["#1e1b4b", "#4338ca", "#a5b4fc"],
  "Finance-Trust": ["#022c22", "#0f766e", "#ccfbf1"],
  "Finance-Luxury": ["#18181b", "#78350f", "#fef3c7"],
  "Wellness-Minimal": ["#f8fafc", "#e2e8f0", "#94a3b8"],
  "Wellness-Bold": ["#ecfccb", "#84cc16", "#3f6212"],
  "Wellness-Trust": ["#f0fdf4", "#86efac", "#166534"],
  "Wellness-Luxury": ["#fff1f2", "#fb7185", "#881337"],
  "Cyber-Minimal": ["#09090b", "#27272a", "#52525b"],
  "Cyber-Bold": ["#000000", "#facc15", "#a16207"],
  "Cyber-Trust": ["#020617", "#6366f1", "#1e293b"],
  "Cyber-Luxury": ["#000000", "#c026d3", "#4a044e"],
};

export default function BrandAura() {
  const [industry, setIndustry] = useState("Tech");
  const [vibe, setVibe] = useState("Minimal");
  const [copied, setCopied] = useState<string | null>(null);

  const currentPalette = PALETTES[`${industry}-${vibe}`] || ["#000", "#888", "#FFF"];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="relative h-96 w-full max-w-sm rounded-xl bg-onyx/40 border border-white/10 overflow-hidden flex flex-col backdrop-blur-sm">
      <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Palette className="text-signal-lime" size={16} />
          <span className="text-xs font-bold text-white tracking-widest">BRAND_AURA_GEN</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] text-white/40 uppercase font-mono">Sector</label>
            <div className="grid grid-cols-2 gap-1">
              {INDUSTRIES.map(i => (
                <button
                  key={i}
                  onClick={() => setIndustry(i)}
                  className={`px-2 py-1 text-[10px] rounded border ${
                    industry === i 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
                  } transition-colors`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-[10px] text-white/40 uppercase font-mono">Signal</label>
            <div className="grid grid-cols-2 gap-1">
              {VIBES.map(v => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`px-2 py-1 text-[10px] rounded border ${
                    vibe === v 
                      ? "bg-signal-lime text-black border-signal-lime" 
                      : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
                  } transition-colors`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex gap-2">
          <AnimatePresence mode="wait">
            {currentPalette.map((hex, i) => (
              <motion.div
                key={`${industry}-${vibe}-${i}`}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                className="flex-1 rounded-lg relative group cursor-pointer overflow-hidden shadow-lg border border-white/5"
                style={{ backgroundColor: hex }}
                onClick={() => handleCopy(hex)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                  {copied === hex ? <Check size={16} className="text-white" /> : <Copy size={16} className="text-white" />}
                </div>
                <div className="absolute bottom-2 left-0 w-full text-center">
                  <span className="text-[10px] font-mono bg-black/50 text-white px-1 py-0.5 rounded backdrop-blur-md">
                    {hex}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
