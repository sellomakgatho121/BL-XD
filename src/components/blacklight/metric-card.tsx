"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  comparison?: string;
  delay?: number;
}

export default function MetricCard({
  label,
  value,
  icon: Icon,
  trend = "neutral",
  comparison,
  delay = 0,
}: MetricCardProps) {
  const trendColors = {
    up: "text-[var(--signal-lime)]",
    down: "text-[var(--siren-red)]",
    neutral: "text-[var(--muted-foreground)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden border border-white/10 bg-[var(--card)] backdrop-blur-sm p-6"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
          {Icon && (
              <Icon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          )}
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-white/50">
              {label}
            </span>
          </div>

          {comparison && (
            <span className={`text-[10px] font-mono tracking-[0.1em] ${trendColors[trend]}`}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"} {comparison}
            </span>
          )}
        </div>
        
        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-mono text-6xl leading-none tracking-tighter text-[var(--foreground)] tabular-nums font-light">
            {value}
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute left-0 top-0 h-px w-full bg-white/20" />
        <div className="absolute left-0 top-0 h-full w-px bg-white/20" />
        <div className="absolute right-0 top-0 h-full w-px bg-white/20" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-white/20" />
      </div>
    </motion.div>
  );
}

// Mini metric for inline displays
export function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-white/60 uppercase tracking-[0.22em]">
        {label}
      </span>
      <span className="text-sm font-mono text-white tabular-nums">
        {value}
      </span>
    </div>
  );
}
