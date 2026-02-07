"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, ShoppingBag, Stethoscope } from "lucide-react";

interface ServiceCardProps {
  tier: "spark" | "growth" | "shop" | "diagnostic";
  title: string;
  price: string;
  description: string;
  features: string[];
  delay?: number;
}

const tierConfig = {
  spark: {
    icon: Zap,
    color: "var(--signal-lime)",
    accent: "var(--signal-lime-dim)",
    glow: "var(--signal-lime-glow)",
  },
  growth: {
    icon: TrendingUp,
    color: "#00CCFF",
    accent: "rgba(0, 204, 255, 0.1)",
    glow: "rgba(0, 204, 255, 0.4)",
  },
  shop: {
    icon: ShoppingBag,
    color: "var(--siren-red)",
    accent: "var(--siren-red-dim)",
    glow: "var(--siren-red-glow)",
  },
  diagnostic: {
    icon: Stethoscope,
    color: "#FF8800",
    accent: "rgba(255, 136, 0, 0.1)",
    glow: "rgba(255, 136, 0, 0.4)",
  },
};

export default function ServiceCard({
  tier,
  title,
  price,
  description,
  features,
  delay = 0,
}: ServiceCardProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative border border-[var(--border)] bg-[var(--card)] overflow-hidden cursor-pointer"
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${config.glow}, transparent 70%)`,
        }}
      />

      {/* Accent bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: config.color }}
      />

      <div className="p-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-5 h-5" style={{ color: config.color }} />
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: config.color }}
              >
                {tier} Tier
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--spectral-white)] mb-1">
              {title}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[var(--spectral-white)]">
              {price}
            </div>
            <div className="text-xs text-[var(--spectral-muted)]">
              {tier === "diagnostic" ? "Fixed" : "From"}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--spectral-dim)] mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.1 + i * 0.05 }}
              className="flex items-center gap-3 text-sm text-[var(--spectral-dim)]"
            >
              <div
                className="w-1.5 h-1.5"
                style={{ backgroundColor: config.color }}
              />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-300 group/btn"
          style={{
            backgroundColor: config.accent,
            color: config.color,
            border: `1px solid ${config.color}`,
          }}
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// Compact version for horizontal scrolling
export function ServiceCardCompact({
  tier,
  title,
  price,
  delay = 0,
}: Omit<ServiceCardProps, "description" | "features">) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex-shrink-0 w-64 border border-[var(--border)] bg-[var(--card)] p-6 cursor-pointer hover:border-[var(--signal-lime)] transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{ backgroundColor: config.accent }}
        >
          <Icon className="w-5 h-5" style={{ color: config.color }} />
        </div>
        <div>
          <h4 className="font-bold text-[var(--spectral-white)]">{title}</h4>
          <span className="text-xs text-[var(--spectral-muted)]">
            {tier} Tier
          </span>
        </div>
      </div>
      <div className="text-2xl font-bold" style={{ color: config.color }}>
        {price}
      </div>
    </motion.div>
  );
}
