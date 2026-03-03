"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Timer, TrendingDown, DollarSign, AlertTriangle } from "lucide-react";

export default function LatencySimulator() {
  const [loadTime, setLoadTime] = useState(2.5);
  const [visitors, setVisitors] = useState(10000);
  
  const BASE_CONVERSION_RATE = 0.03;
  const AOV = 50;

  const metrics = useMemo(() => {
    // We'll use a conservative model: Conversion Rate drops by 5% for every second over 0.5s.
    // - Amazon found every 100ms of latency cost them 1% in sales.
    // - Akamai found 100ms delay = 7% drop in conversion rates.
    const penaltyThreshold = 0.5;
    const penaltyPerSecond = 0.2; // 20% drop per second (harsh but realistic for bounce rates)
    
    const delay = Math.max(0, loadTime - penaltyThreshold);
    const degradation = Math.min(0.9, delay * penaltyPerSecond);
    
    const effectiveConversionRate = BASE_CONVERSION_RATE * (1 - degradation);
    
    const optimalRevenue = visitors * BASE_CONVERSION_RATE * AOV;
    const actualRevenue = visitors * effectiveConversionRate * AOV;
    const lostRevenue = optimalRevenue - actualRevenue;

    return {
      actualRevenue,
      lostRevenue,
      conversionRate: effectiveConversionRate * 100
    };
  }, [loadTime, visitors]);

  return (
    <div className="relative h-96 w-full max-w-sm rounded-xl bg-onyx/40 border border-white/10 overflow-hidden flex flex-col backdrop-blur-sm">
      <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TrendingDown className="text-siren-red" size={16} />
          <span className="text-xs font-bold text-white tracking-widest">ROI_SIMULATOR</span>
        </div>
        <div className="text-[10px] text-white/40 font-mono">LATENCY_COST_ANALYSIS</div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-mono text-white/60">
              <span>Page Load Time</span>
              <span className={loadTime > 2 ? "text-siren-red" : "text-signal-lime"}>{loadTime}s</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={loadTime}
              onChange={(e) => setLoadTime(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-mono text-white/60">
              <span>Monthly Visitors</span>
              <span>{visitors.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={visitors}
              onChange={(e) => setVisitors(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end gap-4 relative">
            <div className="flex items-end gap-2 h-24 border-b border-white/10 pb-1">
                <div className="flex-1 flex flex-col justify-end items-center gap-1 group">
                    <div className="text-[10px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4">Potential</div>
                    <motion.div 
                        className="w-full bg-white/5 rounded-t"
                        animate={{ height: "100%" }}
                    />
                </div>
                <div className="flex-1 flex flex-col justify-end items-center gap-1 group relative">
                    <div className="text-[10px] text-siren-red/60 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4">Lost</div>
                    <motion.div 
                        className="w-full bg-siren-red/20 border-t border-siren-red/50 rounded-t"
                        animate={{ height: `${(metrics.lostRevenue / (metrics.actualRevenue + metrics.lostRevenue)) * 100}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="text-[10px] text-white/40 mb-1">PROJECTED REV</div>
                    <div className="text-lg font-mono text-white font-bold">${Math.round(metrics.actualRevenue).toLocaleString()}</div>
                </div>
                <div className="bg-siren-red/10 p-3 rounded-lg border border-siren-red/20">
                    <div className="text-[10px] text-siren-red/60 mb-1">LOST REVENUE</div>
                    <div className="text-lg font-mono text-siren-red font-bold">-${Math.round(metrics.lostRevenue).toLocaleString()}</div>
                </div>
            </div>
        </div>
      </div>
      
      {loadTime > 3 && (
        <div className="absolute inset-0 border-2 border-siren-red/50 animate-pulse pointer-events-none rounded-xl" />
      )}
    </div>
  );
}
