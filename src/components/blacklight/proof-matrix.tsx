"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Gauge, Clock, Eye, Zap, ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * ProofMatrix -- An interactive grid of proof-of-work items.
 * Unlike ShowcaseGallery (carousel), this is a persistent grid where
 * hovering an item expands it to reveal live metrics with a scanning animation.
 */

const proofItems = [
  {
    id: "performance",
    title: "Sub-Second Loads",
    subtitle: "Every page, every device",
    icon: Clock,
    metric: "0.8s",
    metricLabel: "Average TTI",
    detail: "Our sites load 4x faster than the SA average. Speed isn't a feature -- it's the foundation.",
    color: "var(--signal-lime)",
    stats: [
      { label: "LCP", value: "< 1.2s" },
      { label: "FID", value: "< 50ms" },
      { label: "CLS", value: "< 0.05" },
    ],
  },
  {
    id: "lighthouse",
    title: "Lighthouse 95+",
    subtitle: "Verified performance",
    icon: Gauge,
    metric: "98",
    metricLabel: "Average Score",
    detail: "Not a target -- our baseline. Every deployment is performance-audited before it goes live.",
    color: "var(--signal-lime)",
    stats: [
      { label: "Performance", value: "98" },
      { label: "Accessibility", value: "100" },
      { label: "SEO", value: "100" },
    ],
  },
  {
    id: "conversion",
    title: "Conversion Architecture",
    subtitle: "Psychology-driven design",
    icon: Eye,
    metric: "340%",
    metricLabel: "Avg. Lead Increase",
    detail: "Every layout decision is backed by cognitive psychology. We design for action, not just aesthetics.",
    color: "#FF003C",
    stats: [
      { label: "Bounce Rate", value: "-45%" },
      { label: "Time on Site", value: "+180%" },
      { label: "Form Completes", value: "+220%" },
    ],
  },
  {
    id: "tech",
    title: "Bleeding-Edge Stack",
    subtitle: "React 19, Next.js 15, Edge",
    icon: Zap,
    metric: "2026",
    metricLabel: "Tech Standard",
    detail: "Server Components, edge functions, real-time subscriptions. Your site runs on tomorrow's technology today.",
    color: "#3B82F6",
    stats: [
      { label: "React", value: "v19" },
      { label: "Next.js", value: "v15" },
      { label: "Deploy", value: "Edge" },
    ],
  },
];

export default function ProofMatrix() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {proofItems.map((item, i) => {
        const isActive = activeId === item.id;
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
            className="relative border border-[var(--border)] bg-[var(--card)] overflow-hidden cursor-pointer group"
          >
            {/* Scanning line animation on hover */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px z-20"
                  style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
                  initial={{ top: 0, opacity: 0 }}
                  animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "linear" }}
                />
              )}
            </AnimatePresence>

            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-12 h-12 opacity-10 group-hover:opacity-30 transition-opacity"
              style={{
                background: `linear-gradient(135deg, transparent 50%, ${item.color} 50%)`,
              }}
            />

            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center border"
                    style={{ borderColor: `${item.color}30`, color: item.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-xs font-mono text-[var(--spectral-white)]/40">{item.subtitle}</p>
                  </div>
                </div>

                {/* Big metric */}
                <div className="text-right">
                  <motion.span
                    className="text-3xl font-black tracking-tighter block"
                    style={{ color: item.color }}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {item.metric}
                  </motion.span>
                  <span className="text-[10px] font-mono text-[var(--spectral-white)]/30 uppercase tracking-wider">
                    {item.metricLabel}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--spectral-white)]/50 leading-relaxed mb-6">
                {item.detail}
              </p>

              {/* Stats row */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-4 pt-4 border-t border-[var(--border)]">
                      {item.stats.map((stat) => (
                        <div key={stat.label} className="flex-1 text-center">
                          <div className="text-lg font-mono font-bold" style={{ color: item.color }}>
                            {stat.value}
                          </div>
                          <div className="text-[10px] font-mono text-[var(--spectral-white)]/30 uppercase">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
