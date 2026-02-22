"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Globe, Network, Video, Smartphone, Bot, Zap, Check, Users, Wallet } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/blacklight/service-card";
import { PageEffectsLayer, ScrollReveal3D } from "@/components/3d";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";

const agenticServices = [
  {
    tier: "merchant" as const,
    title: "WhatsApp AI Storefront",
    price: "From R12,000",
    pricingModel: "Setup + per-conversation",
    description: "Your 24/7 AI sales agent on WhatsApp. 96% of SA internet users are already there—meet them where they live.",
    features: [
      "WhatsApp Business API integration",
      "Local language support (Zulu, Xhosa, Sotho)",
      "Zapper & SnapScan payment links",
      "Product catalog with instant checkout",
      "Automated order tracking & support",
    ],
    valueProps: [
      "Customers chat, browse, and buy without leaving WhatsApp",
      "AI handles 80% of queries—you focus on fulfillment",
      "Mobile-first commerce for township and suburban markets",
    ],
    savingsNote: "70-80% cost advantage vs traditional e-commerce builds",
    featured: true,
    href: "/services/whatsapp-ai",
  },
  {
    tier: "discovery" as const,
    title: "AI Landing + GEO",
    price: "R4,500",
    pricingModel: "Fixed quick-start",
    description: "An autonomous web node that ranks in AI search engines. Your AgentCard makes you discoverable to ChatGPT, Perplexity, and Claude.",
    features: [
      "GEO-optimized landing page",
      "AgentCard schema markup",
      "AI-readable structured data",
      "Mobile-first PWA",
      "48-hour delivery",
    ],
    valueProps: [
      "Appear in AI chat responses, not just Google",
      "Structured for the post-SEO discovery era",
      "Perfect for side hustles and MVPs",
    ],
    href: "/services/geo-landing",
  },
  {
    tier: "orchestrator" as const,
    title: "Silicon Workforce",
    price: "Custom",
    pricingModel: "Hybrid retainer",
    description: "A full AI operations team. Multi-agent systems for content, sales, support, and analytics—running 24/7.",
    features: [
      "Custom multi-agent architecture",
      "Video content engine (60 clips/month)",
      "AI sales qualification & outreach",
      "Real-time analytics dashboard",
      "Monthly strategy calls",
    ],
    valueProps: [
      "Replace 3-5 part-time hires with tireless AI agents",
      "Audit trails for every decision (compliance-ready)",
      "Scale without scaling headcount",
    ],
    savingsNote: "Equivalent to R80k+/month in human labor",
    href: "/services/orchestrator",
  },
  {
    tier: "video" as const,
    title: "Video Content Engine",
    price: "From R6,000/mo",
    pricingModel: "Monthly subscription",
    description: "AI-generated video content optimized for TikTok, Reels, and YouTube Shorts. Feed the algorithm, grow your audience.",
    features: [
      "30-60 videos per month",
      "Trend-aware content calendar",
      "Auto-captioning & localization",
      "Performance analytics",
      "Hashtag optimization",
    ],
    valueProps: [
      "Consistent posting without the content grind",
      "AI learns your brand voice over time",
      "Perfect for coaches, influencers, and D2C brands",
    ],
    href: "/services/video-engine",
  },
  {
    tier: "liquid" as const,
    title: "Liquid UI App",
    price: "From R25,000",
    pricingModel: "Sprint-based",
    description: "Mobile-first web apps that feel native. PWA technology means no app store, instant updates, and one codebase.",
    features: [
      "Progressive Web App (PWA)",
      "Offline-capable",
      "Push notifications",
      "Native-feel animations",
      "Cross-platform (iOS, Android, Web)",
    ],
    valueProps: [
      "Skip the R200k+ native app development cost",
      "Deploy updates instantly—no app store review",
      "Works on any device, any network",
    ],
    savingsNote: "80% savings vs traditional native app development",
    href: "/services/liquid-ui",
  },
];

const sprintPackages = [
  {
    name: "Audit & Alignment",
    duration: "2-4 weeks",
    price: "R8,000",
    description: "Deep-dive analysis of your digital presence and AI-ready roadmap.",
    deliverables: ["Current state audit", "Competitor analysis", "AI opportunity mapping", "12-month roadmap"],
  },
  {
    name: "Implementation Sprint",
    duration: "6 weeks",
    price: "From R35,000",
    description: "Rapid deployment of your chosen agentic solution.",
    deliverables: ["Solution architecture", "Development & testing", "Integration setup", "Training & handoff"],
  },
  {
    name: "Silicon Workforce Retainer",
    duration: "Ongoing",
    price: "From R15,000/mo",
    description: "Continuous optimization and expansion of your AI operations.",
    deliverables: ["Monthly strategy calls", "Agent tuning & updates", "New feature rollouts", "Priority support"],
  },
];

const whyAgentic = [
  { 
    icon: Bot, 
    title: "24/7 Operations", 
    description: "AI agents never sleep. Your business runs while you rest." 
  },
  { 
    icon: Users, 
    title: "Local-First", 
    description: "Built for South African markets. Local languages. Local payments." 
  },
  { 
    icon: Wallet, 
    title: "Cost Advantage", 
    description: "70-80% cheaper than traditional agency builds or hiring." 
  },
  { 
    icon: Zap, 
    title: "Ship Fast", 
    description: "Sprint-based delivery. See results in weeks, not months." 
  },
];

export default function ServicesContent() {
  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative">
      <GrainOverlay opacity={0.03} />
      <Scanlines />
      <PageEffectsLayer intensity="medium" showHero />

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
              <Link href="/portfolio" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Portfolio</Link>
              <Link href="/contact" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-[var(--signal-lime)]/50 px-3 py-1 font-mono text-xs text-[var(--signal-lime)] mb-6"
          >
            <Bot className="w-3 h-3" />
            AGENTIC AI SERVICES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6"
          >
            <GlitchText text="SILICON WORKFORCE" intensity="medium" triggerOnHover />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[var(--spectral-dim)] max-w-3xl mx-auto mb-8"
          >
            AI agents that sell, create, and operate 24/7. Built for South African entrepreneurs who want enterprise-grade automation at SME prices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {whyAgentic.map((item, i) => (
              <div key={item.title} className="flex items-center gap-2 text-sm text-[var(--spectral-dim)]">
                <item.icon className="w-4 h-4 text-[var(--signal-lime)]" />
                <span>{item.title}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Flagship Service - WhatsApp AI */}
      <section className="py-16 border-y border-[var(--border)] bg-[var(--card)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#25D366] mb-4">
              <MessageCircle className="w-4 h-4" />
              Flagship Service
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              WhatsApp AI <span className="text-[#25D366]">Storefronts</span>
            </h2>
            <p className="text-lg text-[var(--spectral-dim)] max-w-2xl mx-auto">
              96% of South African internet users are on WhatsApp. Meet your customers where they already live.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--spectral-white)] mb-1">Conversational Commerce</h3>
                    <p className="text-sm text-[var(--spectral-dim)]">Customers chat, browse, and buy without ever leaving WhatsApp.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--spectral-white)] mb-1">Local Languages</h3>
                    <p className="text-sm text-[var(--spectral-dim)]">Zulu, Xhosa, Sotho, Afrikaans—AI that speaks your customer&apos;s language.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--spectral-white)] mb-1">SA Payment Rails</h3>
                    <p className="text-sm text-[var(--spectral-dim)]">Zapper, SnapScan, Mobile Money—instant checkout links in chat.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 border-l-4 border-[#25D366] bg-[#25D366]/5">
                <p className="text-sm font-mono text-[#25D366]">70-80% cost advantage vs traditional e-commerce builds</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <Tilt3DCard maxTilt={10} glareColor="rgba(37, 211, 102, 0.06)" borderColor="rgba(37, 211, 102, 0.3)">
                <ServiceCard
                  tier="merchant"
                  title="WhatsApp AI Storefront"
                  price="From R12,000"
                  pricingModel="Setup + per-conversation"
                  description="Your 24/7 AI sales agent on WhatsApp. Handles 80% of customer queries automatically."
                  features={["WhatsApp Business API", "Local language support", "SA payment integration", "Product catalog", "Order tracking"]}
                  featured={true}
                  href="/contact"
                />
              </Tilt3DCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Agentic Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black tracking-tighter mb-4">
              The Full <span className="text-[var(--signal-lime)]">Arsenal</span>
            </h2>
            <p className="text-lg text-[var(--spectral-dim)] max-w-2xl mx-auto">
              From quick-start AI landing pages to full silicon workforce deployments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agenticServices.filter(s => s.tier !== "merchant").map((service, i) => (
              <ScrollReveal3D key={service.tier} axis="both" maxRotation={5} parallaxShift={25}>
                <Tilt3DCard maxTilt={8} glareColor="rgba(215, 255, 0, 0.04)" borderColor="rgba(215, 255, 0, 0.2)">
                  <ServiceCard
                    tier={service.tier}
                    title={service.title}
                    price={service.price}
                    pricingModel={service.pricingModel}
                    description={service.description}
                    features={service.features}
                    savingsNote={service.savingsNote}
                    delay={i * 0.1}
                    href={service.href}
                  />
                </Tilt3DCard>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* Sprint Packages Section */}
      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--signal-lime)] mb-4">
              <Zap className="w-4 h-4" />
              Sprint-Based Pricing
            </span>
            <h2 className="text-4xl font-black tracking-tighter mb-4">
              How We <span className="text-[var(--signal-lime)]">Work</span>
            </h2>
            <p className="text-lg text-[var(--spectral-dim)] max-w-2xl mx-auto">
              No hourly billing. No scope creep. Clear deliverables, fixed timelines.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {sprintPackages.map((pkg, i) => (
              <ScrollReveal3D key={pkg.name} axis="x" maxRotation={4} parallaxShift={20}>
              <Tilt3DCard maxTilt={7} glareColor="rgba(215, 255, 0, 0.03)">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-[var(--border)] bg-[var(--card)] p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--spectral-muted)]">{pkg.duration}</span>
                  <span className="text-xl font-bold text-[var(--signal-lime)]">{pkg.price}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--spectral-white)] mb-2">{pkg.name}</h3>
                <p className="text-sm text-[var(--spectral-dim)] mb-6">{pkg.description}</p>
                <ul className="space-y-2">
                  {pkg.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--spectral-dim)]">
                      <Check className="w-4 h-4 text-[var(--signal-lime)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              </Tilt3DCard>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black tracking-tighter mb-6">
              Ready to deploy your <span className="text-[var(--signal-lime)]">silicon workforce</span>?
            </h2>
            <p className="text-lg text-[var(--spectral-dim)] mb-8 max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll map your AI opportunity and build a sprint plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group"
                asChild
              >
                <Link href="/contact">
                  Book Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[var(--border)] text-[var(--spectral-white)] hover:bg-[var(--card)] font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6"
                asChild
              >
                <Link href="/pricing">
                  View Full Pricing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
