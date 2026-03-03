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
    neutral: "text-[var(--spectral-dim)]",
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
      className="relative border border-[var(--border)] bg-[var(--card)] p-6 overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--signal-lime-dim)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          {Icon && (
            <Icon className="w-4 h-4 text-[var(--signal-lime)]" />
          )}
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--spectral-muted)]">
            {label}
          </span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[var(--spectral-white)] tabular-nums">
            {value}
          </span>
          {comparison && (
            <span className={`text-xs font-mono ${trendColors[trend]}`}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"} {comparison}
            </span>
          )}
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--signal-lime)]" />
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
      <span className="text-xs text-[var(--spectral-muted)] uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-mono text-[var(--signal-lime)] tabular-nums">
        {value}
      </span>
    </div>
  );
}
