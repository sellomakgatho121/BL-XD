"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, MessageCircle, Network, Cpu, Video, Globe, Smartphone, Zap, TrendingUp, ShoppingBag, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// New Agentic Service Tiers
export type AgenticTier = "discovery" | "merchant" | "orchestrator" | "video" | "liquid";

// Legacy tiers (kept for backward compatibility)
export type LegacyTier = "spark" | "growth" | "shop" | "diagnostic";

export type ServiceTier = AgenticTier | LegacyTier;

interface ServiceCardProps {
  tier: ServiceTier;
  title: string;
  price: string;
  pricingModel?: string; // "fixed" | "per-conversation" | "hybrid" | "sprint"
  description: string;
  features: string[];
  valueProps?: string[]; // Key value propositions
  savingsNote?: string; // e.g., "70-80% cost advantage vs traditional agencies"
  delay?: number;
  href?: string;
  featured?: boolean;
}

// New Agentic tier configurations
const agenticConfig: Record<AgenticTier, { icon: LucideIcon; color: string; accent: string; glow: string; label: string }> = {
  discovery: {
    icon: Globe,
    color: "#00FF88",
    accent: "rgba(0, 255, 136, 0.1)",
    glow: "rgba(0, 255, 136, 0.4)",
    label: "Discovery Node",
  },
  merchant: {
    icon: MessageCircle,
    color: "#25D366", // WhatsApp green
    accent: "rgba(37, 211, 102, 0.1)",
    glow: "rgba(37, 211, 102, 0.4)",
    label: "Chat Merchant",
  },
  orchestrator: {
    icon: Network,
    color: "#D7FF00", // Signal lime
    accent: "rgba(215, 255, 0, 0.1)",
    glow: "rgba(215, 255, 0, 0.4)",
    label: "The Orchestrator",
  },
  video: {
    icon: Video,
    color: "#FF003C",
    accent: "rgba(255, 0, 60, 0.1)",
    glow: "rgba(255, 0, 60, 0.4)",
    label: "Silicon Creative",
  },
  liquid: {
    icon: Smartphone,
    color: "#00CCFF",
    accent: "rgba(0, 204, 255, 0.1)",
    glow: "rgba(0, 204, 255, 0.4)",
    label: "Liquid UI",
  },
};

// Legacy tier configurations (kept for backward compatibility)
const legacyConfig: Record<LegacyTier, { icon: LucideIcon; color: string; accent: string; glow: string; label: string }> = {
  spark: {
    icon: Zap,
    color: "var(--signal-lime)",
    accent: "var(--signal-lime-dim)",
    glow: "var(--signal-lime-glow)",
    label: "Spark",
  },
  growth: {
    icon: TrendingUp,
    color: "#00CCFF",
    accent: "rgba(0, 204, 255, 0.1)",
    glow: "rgba(0, 204, 255, 0.4)",
    label: "Growth",
  },
  shop: {
    icon: ShoppingBag,
    color: "var(--siren-red)",
    accent: "var(--siren-red-dim)",
    glow: "var(--siren-red-glow)",
    label: "Shop",
  },
  diagnostic: {
    icon: Stethoscope,
    color: "#FF8800",
    accent: "rgba(255, 136, 0, 0.1)",
    glow: "rgba(255, 136, 0, 0.4)",
    label: "Diagnostic",
  },
};

function getTierConfig(tier: ServiceTier) {
  if (tier in agenticConfig) {
    return agenticConfig[tier as AgenticTier];
  }
  return legacyConfig[tier as LegacyTier];
}

export default function ServiceCard({
  tier,
  title,
  price,
  pricingModel,
  description,
  features,
  valueProps,
  savingsNote,
  delay = 0,
  href,
  featured = false,
}: ServiceCardProps) {
  const config = getTierConfig(tier);
  const Icon = config.icon;

  const CardContent = (
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
      className={`group relative border ${featured ? 'border-[var(--signal-lime)]' : 'border-[var(--border)]'} bg-[var(--card)] overflow-hidden cursor-pointer h-full`}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-[var(--signal-lime)] text-[var(--onyx)]">
            Flagship
          </span>
        </div>
      )}

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
                {config.label}
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
            {pricingModel && (
              <div className="text-xs text-[var(--spectral-muted)]">
                {pricingModel}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--spectral-dim)] mb-6 leading-relaxed">
          {description}
        </p>

        {/* Value Props (new) */}
        {valueProps && valueProps.length > 0 && (
          <div className="mb-6 p-4 border border-[var(--border)] bg-[var(--onyx)]/50">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--spectral-muted)] mb-3">
              Why This Works
            </div>
            <ul className="space-y-2">
              {valueProps.map((prop, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--spectral-white)]">
                  <Cpu className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: config.color }} />
                  {prop}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-3 mb-6">
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

        {/* Savings Note (new) */}
        {savingsNote && (
          <div 
            className="mb-6 px-4 py-3 text-sm font-mono"
            style={{ 
              backgroundColor: config.accent,
              borderLeft: `3px solid ${config.color}`,
              color: config.color
            }}
          >
            {savingsNote}
          </div>
        )}

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-300 group/btn"
          style={{
            backgroundColor: featured ? config.color : config.accent,
            color: featured ? "var(--onyx)" : config.color,
            border: `1px solid ${config.color}`,
          }}
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

// Compact version for horizontal scrolling
export function ServiceCardCompact({
  tier,
  title,
  price,
  delay = 0,
}: Pick<ServiceCardProps, "tier" | "title" | "price" | "delay">) {
  const config = getTierConfig(tier);
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
            {config.label}
          </span>
        </div>
      </div>
      <div className="text-2xl font-bold" style={{ color: config.color }}>
        {price}
      </div>
    </motion.div>
  );
}

// Agentic Highlight Card - for showcasing the AI-powered nature
export function AgenticHighlightCard({
  title,
  stats,
  icon: CustomIcon,
  delay = 0,
}: {
  title: string;
  stats: { value: string; label: string }[];
  icon?: LucideIcon;
  delay?: number;
}) {
  const Icon = CustomIcon || Bot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="border border-[var(--signal-lime)]/30 bg-[var(--card)] p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-[var(--signal-lime)]/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-[var(--signal-lime)]" />
        </div>
        <h3 className="text-lg font-bold text-[var(--spectral-white)]">{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i}>
            <div className="text-2xl font-bold text-[var(--signal-lime)]">{stat.value}</div>
            <div className="text-xs text-[var(--spectral-muted)] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
