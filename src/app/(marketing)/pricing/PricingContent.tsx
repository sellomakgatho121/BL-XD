"use client";

import { Target, Zap, Clock, ArrowRight, Layers, Move3d, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/marketing/navigation";
import Footer from "@/components/marketing/footer";

const tiers = [
  {
    tier: "spark",
    title: "Spark",
    price: "R3,500",
    pricingModel: "Fixed / One-time",
    description: "The essential AI-ready presence. High-impact landing page with spatial layout.",
    features: [
      "AI-Optimised Landing Page",
      "AgentCard Schema Markup",
      "GEO (Generative Engine Opt)",
      "Mobile PWA Foundation",
      "48-Hour Delivery",
    ],
    cta: "Ignite Spark",
    href: "/services/spark",
    featured: false,
  },
  {
    tier: "growth",
    title: "Growth",
    price: "R8,500",
    pricingModel: "Fixed / One-time",
    description: "Professional multi-page business presence with custom design system and spatial UX.",
    features: [
      "Multi-Page Spatial Website",
      "Custom Design System",
      "SEO Architecture",
      "Blog Content Engine",
      "Performance Audit",
    ],
    cta: "Accelerate Growth",
    href: "/services/growth",
    featured: true,
  },
  {
    tier: "shop",
    title: "Shop",
    price: "R18,500",
    pricingModel: "Fixed / One-time",
    description: "Full e-commerce platform with product management, payments, and inventory.",
    features: [
      "Full E-Commerce Platform",
      "Payment Gateway Integration",
      "Product Catalogue CMS",
      "Order Management System",
      "Analytics Dashboard",
    ],
    cta: "Open Shop",
    href: "/services/shop",
    featured: false,
  },
  {
    tier: "diagnostic",
    title: "Diagnostic",
    price: "R1,500",
    pricingModel: "Fixed / One-time",
    description: "Deep performance audit — Lighthouse analysis, UX review, and actionable roadmap.",
    features: [
      "Full Lighthouse Audit",
      "UX Heuristics Evaluation",
      "SEO Gap Analysis",
      "Competitor Benchmark",
      "Prioritised Roadmap",
    ],
    cta: "Book Audit",
    href: "/contact",
    featured: false,
  },
];

const sprints = [
  {
    name: "Audit & Alignment",
    duration: "2-4 Weeks",
    price: "R8,000",
    description: "Deep-dive analysis of your digital presence and AI-ready roadmap.",
    icon: Target,
  },
  {
    name: "Implementation Sprint",
    duration: "6 Weeks",
    price: "From R35,000",
    description: "Rapid deployment of your chosen solution. Fixed scope, fixed cost.",
    icon: Zap,
  },
  {
    name: "Silicon Retainer",
    duration: "Ongoing",
    price: "From R15,000/mo",
    description: "Continuous optimisation, agent tuning, and new feature rollouts.",
    icon: Clock,
  },
];

export default function PricingContent() {
  return (
    <div className="min-h-screen bg-bl-deep text-bl-text overflow-x-hidden">
      {/* Isometric grid overlay */}
      <div className="fixed inset-0 iso-grid pointer-events-none z-0" />

      {/* Ambient glow */}
      <div className="fixed top-1/4 right-[12%] w-96 h-96 rounded-full bg-bl-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/3 left-[8%] w-72 h-72 rounded-full bg-bl-cyan/4 blur-[80px] pointer-events-none z-0" />

      <Navigation />

      {/* ═══════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative z-10 pt-36 pb-16 px-6 scene-3d">
        <div className="max-w-6xl mx-auto text-center preserve-3d">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-8">
            <Layers size={14} />
            Transparent Pricing
          </div>

          <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6 gold-glow">
            <span className="block">Value</span>
            <span className="gold-gradient">{">"} Hours</span>
          </h1>

          <p className="text-lg md:text-xl text-bl-text-muted max-w-3xl mx-auto leading-relaxed">
            We don&apos;t sell hours. We sell outcomes. Fixed-price sprints, clear deliverables,
            and AI agents that work for you 24/7.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         PRICING TIERS — 4 Columns
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 scene-3d-near">
            {tiers.map((tier) => (
              <div key={tier.tier} className="tilt-card group">
                <div className={`spatial-panel p-6 md:p-8 h-full flex flex-col rim-light relative ${tier.featured ? 'spatial-panel-gold' : ''}`}>
                  {/* Featured badge */}
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-bl-gold text-bl-deep text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-[0_0_20px_rgba(181,154,95,0.3)]">
                      Best Value
                    </div>
                  )}

                  <div className={`${tier.featured ? 'mt-4' : ''}`}>
                    <h3 className="text-xl md:text-2xl font-bold uppercase mb-1 font-display">{tier.title}</h3>

                    <div className="flex flex-col mb-6 p-4 rounded-2xl bg-bl-glass border border-bl-glass-border">
                      <span className="text-3xl md:text-4xl font-black gold-gradient">{tier.price}</span>
                      <span className="text-[10px] text-bl-text-muted font-mono mt-1 uppercase tracking-wider">{tier.pricingModel}</span>
                    </div>

                    <p className="text-sm text-bl-text-muted mb-6 leading-relaxed min-h-[60px]">
                      {tier.description}
                    </p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-bl-text/80">
                          <Check size={14} className="shrink-0 mt-0.5 text-bl-gold" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={tier.href}
                    className="block w-full text-center py-3 rounded-full bg-bl-gold/10 border border-bl-gold/30 text-bl-gold text-xs font-bold uppercase tracking-wider hover:bg-bl-gold hover:text-bl-deep transition-all duration-300"
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         SPRINT MODEL
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-4">
              <Move3d size={14} />
              How We Deliver
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              The <span className="gold-gradient">Sprint Model</span>
            </h2>
            <p className="text-bl-text-muted max-w-xl mx-auto">
              Traditional development drags on for months. We work in intense, focused sprints.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 scene-3d-near">
            {sprints.map((sprint, i) => (
              <div key={sprint.name} className="tilt-card">
                <div className="spatial-panel p-8 h-full flex flex-col rim-light relative">
                  <div className="w-14 h-14 rounded-2xl bg-bl-cyan/10 border border-bl-cyan/20 flex items-center justify-center mb-6">
                    <sprint.icon size={28} className="text-bl-cyan" />
                  </div>

                  <h3 className="text-2xl font-bold uppercase mb-4 font-display">{sprint.name}</h3>

                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-bl-gold/10 border border-bl-gold/20 text-bl-gold text-[10px] font-bold font-mono mb-4 uppercase tracking-wider">
                    {sprint.duration}
                  </div>

                  <p className="text-sm text-bl-text-muted mb-6 flex-1 leading-relaxed">{sprint.description}</p>

                  <div className="border-t border-bl-glass-border pt-4 text-2xl font-black gold-gradient">
                    {sprint.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         CTA
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="spatial-panel p-10 md:p-16 text-center rim-light spatial-panel-gold relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-bl-gold/8 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-bl-cyan/5 blur-[100px] pointer-events-none" />

            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 gold-glow">
                Ready to <span className="gold-gradient">Start</span>?
              </h2>
              <p className="text-bl-text-muted text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Book a free strategy session. We&apos;ll define your first sprint and show you exactly what you get.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-bl-gold text-bl-deep font-bold uppercase tracking-wider rounded-full transition-all hover:bg-bl-amber hover:shadow-[0_0_60px_rgba(181,154,95,0.3)] text-lg"
              >
                Book Strategy Session
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
