"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Calculator, Clock, Target, Calendar, BarChart, Shield, Globe, MessageCircle, Network, Bot } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";
import ServiceCard, { AgenticTier } from "@/components/blacklight/service-card";
import SprintCalculator from "@/components/blacklight/sprint-calculator";
import { PageEffectsLayer, ScrollReveal3D } from "@/components/3d";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";

const tiers = [
  {
    tier: "discovery" as AgenticTier,
    title: "Discovery Node",
    price: "R4,500",
    pricingModel: "Fixed / One-time",
    description: "The essential AI-ready presence. Be found by agents, not just search engines.",
    features: [
      "AI-Optimized Landing Page",
      "AgentCard Schema Markup",
      "GEO (Generative Engine Opt)",
      "Mobile PWA Foundation",
      "Hosting Setup Included"
    ],
    cta: "Launch Node",
    href: "/contact?package=discovery"
  },
  {
    tier: "merchant" as AgenticTier,
    title: "Chat Merchant",
    price: "R12,000",
    pricingModel: "Setup + R250/mo",
    description: "Turn WhatsApp into your primary sales channel. Automated, instant, and local.",
    features: [
      "WhatsApp Business API",
      "AI Sales Agent (24/7)",
      "Product Catalog Sync",
      "Zapper/SnapScan Payments",
      "Local Language Support"
    ],
    cta: "Start Selling",
    featured: true,
    href: "/contact?package=merchant"
  },
  {
    tier: "orchestrator" as AgenticTier,
    title: "The Orchestrator",
    price: "Custom",
    pricingModel: "Monthly Retainer",
    description: "Full silicon workforce. Multi-agent systems managing sales, content, and support.",
    features: [
      "Multi-Agent Architecture",
      "Video Content Engine",
      "CRM & Analytics Integration",
      "Weekly Strategy Sprints",
      "Auditability-as-a-Service"
    ],
    cta: "Deploy Workforce",
    href: "/contact?package=orchestrator"
  }
];

const sprints = [
  {
    name: "Audit & Alignment",
    duration: "2-4 Weeks",
    price: "R8,000",
    description: "Deep-dive analysis of your digital presence and AI-ready roadmap.",
    icon: Target
  },
  {
    name: "Implementation Sprint",
    duration: "6 Weeks",
    price: "From R35,000",
    description: "Rapid deployment of your chosen agentic solution. Fixed scope, fixed cost.",
    icon: Zap
  },
  {
    name: "Silicon Retainer",
    duration: "Ongoing",
    price: "From R15,000/mo",
    description: "Continuous optimization, agent tuning, and new feature rollouts.",
    icon: Clock
  }
];

export default function PricingContent() {
  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative">
      <GrainOverlay opacity={0.03} />
      <Scanlines />
      <PageEffectsLayer intensity="medium" />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--onyx)]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center">
                <span className="text-[var(--onyx)] font-bold text-lg">B</span>
              </div>
              <span className="font-mono text-sm tracking-wider uppercase hidden sm:block">Blacklight</span>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/services" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Services</Link>
              <Link href="/contact" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-[var(--signal-lime)]/50 px-3 py-1 font-mono text-xs text-[var(--signal-lime)] mb-6"
          >
            <Calculator className="w-3 h-3" />
            TRANSPARENT PRICING
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6"
          >
            <GlitchText text="VALUE > HOURS" intensity="medium" triggerOnHover />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[var(--spectral-dim)] max-w-3xl mx-auto mb-16"
          >
            We don&apos;t sell hours. We sell outcomes. Fixed-price sprints, clear deliverables, and AI agents that work for you 24/7.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <ScrollReveal3D key={tier.tier} axis="both" maxRotation={5} parallaxShift={25}>
                <Tilt3DCard maxTilt={8} glareColor="rgba(215, 255, 0, 0.04)" borderColor="rgba(215, 255, 0, 0.2)">
                  <ServiceCard
                    tier={tier.tier}
                    title={tier.title}
                    price={tier.price}
                    pricingModel={tier.pricingModel}
                    description={tier.description}
                    features={tier.features}
                    featured={tier.featured}
                    delay={i * 0.1}
                    href={tier.href}
                  />
                </Tilt3DCard>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-[var(--border)] bg-[var(--card)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Sprint Model</h2>
            <p className="text-[var(--spectral-dim)] max-w-2xl mx-auto">
              Traditional development drags on for months. We work in intense, focused sprints to ship value fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sprints.map((sprint, i) => (
              <ScrollReveal3D key={sprint.name} axis="x" maxRotation={4} parallaxShift={20}>
              <Tilt3DCard maxTilt={7} glareColor="rgba(215, 255, 0, 0.03)">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative border border-[var(--border)] bg-[var(--card)] p-8"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <sprint.icon className="w-24 h-24 text-[var(--signal-lime)]" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[var(--signal-lime)]/10 flex items-center justify-center mb-6">
                    <sprint.icon className="w-6 h-6 text-[var(--signal-lime)]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{sprint.name}</h3>
                  <div className="text-sm font-mono text-[var(--signal-lime)] mb-4">{sprint.duration}</div>
                  <p className="text-[var(--spectral-dim)] mb-6">{sprint.description}</p>
                  <div className="text-2xl font-bold">{sprint.price}</div>
                </div>
              </motion.div>
              </Tilt3DCard>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SprintCalculator />
         </div>
      </section>

      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black tracking-tighter mb-6">
            Ready to <span className="text-[var(--signal-lime)]">start</span>?
          </h2>
          <p className="text-lg text-[var(--spectral-dim)] mb-8 max-w-xl mx-auto">
            Book a free strategy session. We&apos;ll define your first sprint and show you exactly what you get.
          </p>
          <Button
            size="lg"
            className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group"
            asChild
          >
            <Link href="/contact">
              Book Strategy Session
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
