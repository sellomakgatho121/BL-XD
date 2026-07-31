"use client";

import { Zap, TrendingUp, ShoppingBag, Sparkles, ArrowRight, Check, Layers, Move3d } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/marketing/navigation";
import Footer from "@/components/marketing/footer";

const tiers = [
  {
    tier: "spark",
    title: "Spark",
    price: "R3,500",
    pricingModel: "Fixed one-time",
    description: "High-impact landing page for new ventures. 48-hour delivery with spatial layout and GEO optimisation.",
    features: [
      "Single-page spatial design",
      "GEO-optimised content",
      "AgentCard schema markup",
      "Mobile-first responsive",
      "48-hour delivery",
    ],
    icon: Zap,
    color: "#D7FF00",
    gradient: "from-lime-400/10 to-transparent",
    cta: "Ignite Spark",
    href: "/services/spark",
    featured: false,
  },
  {
    tier: "growth",
    title: "Growth",
    price: "R8,500",
    pricingModel: "Fixed one-time",
    description: "Professional 3–5 page business presence with custom design system, SEO foundation, and spatial UX.",
    features: [
      "Multi-page spatial website",
      "Custom design system",
      "SEO architecture",
      "Blog/content engine",
      "Performance audit included",
    ],
    icon: TrendingUp,
    color: "#00CCFF",
    gradient: "from-cyan-400/10 to-transparent",
    cta: "Accelerate Growth",
    href: "/services/growth",
    featured: true,
  },
  {
    tier: "shop",
    title: "Shop",
    price: "R18,500",
    pricingModel: "Fixed one-time",
    description: "Full e-commerce experience with product management, payments, and inventory integrated.",
    features: [
      "Full e-commerce platform",
      "Payment gateway integration",
      "Product catalogue CMS",
      "Order management system",
      "Analytics dashboard",
    ],
    icon: ShoppingBag,
    color: "#FF006E",
    gradient: "from-red-500/10 to-transparent",
    cta: "Open Shop",
    href: "/services/shop",
    featured: false,
  },
  {
    tier: "diagnostic",
    title: "Diagnostic",
    price: "R1,500",
    pricingModel: "Fixed one-time",
    description: "Deep performance audit of your existing site. Lighthouse analysis, UX review, and actionable roadmap.",
    features: [
      "Full Lighthouse audit",
      "UX heuristics evaluation",
      "SEO gap analysis",
      "Competitor benchmark",
      "Prioritised roadmap",
    ],
    icon: Sparkles,
    color: "#FF8800",
    gradient: "from-amber-400/10 to-transparent",
    cta: "Book Audit",
    href: "/contact",
    featured: false,
  },
];

export default function ServicesContent() {
  return (
    <div className="min-h-screen bg-bl-deep text-bl-text overflow-x-hidden">
      {/* Isometric grid overlay */}
      <div className="fixed inset-0 iso-grid pointer-events-none z-0" />

      {/* Ambient glow orbs */}
      <div className="fixed top-1/4 right-[10%] w-96 h-96 rounded-full bg-bl-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/3 left-[5%] w-64 h-64 rounded-full bg-bl-cyan/5 blur-[80px] pointer-events-none z-0" />

      <Navigation />

      {/* ═══════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative z-10 pt-36 pb-20 px-6 scene-3d">
        <div className="max-w-6xl mx-auto text-center preserve-3d">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-8">
            <Layers size={14} />
            AI Operational Services
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6 gold-glow">
            <span className="block">Depth</span>
            <span className="gold-gradient">Engineered</span>
          </h1>

          <p className="text-lg md:text-xl text-bl-text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Four tiers of spatial web presence. Each dimension deeper than the last.
            From ignition to full commerce — pick your depth.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {["24/7 Operations", "Local-First", "Massive Cost Advantage", "Ship Fast"].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 rounded-full bg-bl-glass border border-bl-glass-border text-bl-text-muted text-xs font-medium uppercase tracking-wider"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         SERVICES GRID — 2×2 Tilt Cards
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              The <span className="gold-gradient">Arsenal</span>
            </h2>
            <p className="text-bl-text-muted max-w-xl mx-auto">
              Four tiers, one philosophy: depth over surface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 scene-3d-near">
            {tiers.map((tier) => (
              <div key={tier.tier} className="tilt-card group">
                <div className={`spatial-panel p-8 md:p-10 h-full flex flex-col rim-light relative overflow-hidden ${tier.featured ? 'spatial-panel-gold' : ''}`}>
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} pointer-events-none`} />

                  {/* Featured badge */}
                  {tier.featured && (
                    <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-bl-gold/20 border border-bl-gold/30 text-bl-gold text-[10px] font-bold uppercase tracking-widest">
                      Best Value
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${tier.color}15`, borderColor: `${tier.color}30`, borderWidth: 1 }}
                  >
                    <tier.icon size={28} style={{ color: tier.color }} />
                  </div>

                  {/* Title & Price */}
                  <h3 className="text-2xl md:text-3xl font-bold uppercase mb-1 font-display">{tier.title}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black gold-gradient">{tier.price}</span>
                    <span className="text-xs text-bl-text-muted font-mono">{tier.pricingModel}</span>
                  </div>

                  <p className="text-bl-text-muted text-sm leading-relaxed mb-8 flex-1">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-bl-text/80">
                        <Check size={16} className="shrink-0" style={{ color: tier.color }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={tier.href}
                    className="group/btn inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-bl-gold/10 border border-bl-gold/30 text-bl-gold text-sm font-bold uppercase tracking-wider hover:bg-bl-gold hover:text-bl-deep transition-all duration-300"
                  >
                    {tier.cta}
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         SPRINT METHODOLOGY
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-4">
              <Move3d size={14} />
              Sprint Protocol
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              How We <span className="gold-gradient">Deliver</span>
            </h2>
            <p className="text-bl-text-muted max-w-xl mx-auto">
              No hourly billing. No scope creep. Brutal efficiency in three dimensions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 scene-3d-near">
            {[
              { no: "01", title: "Audit & Align", time: "2-4 Weeks", price: "R8,000", desc: "Deep-dive analysis of your digital presence and AI-ready roadmap." },
              { no: "02", title: "Implement", time: "6 Weeks", price: "From R35,000", desc: "Rapid deployment of your chosen solution. Fixed scope, fixed cost." },
              { no: "03", title: "Retainer", time: "Ongoing", price: "From R15,000/mo", desc: "Continuous optimisation, tuning, and new feature rollouts." },
            ].map((sprint, idx) => (
              <div key={idx} className="tilt-card group">
                <div className="spatial-panel p-8 h-full flex flex-col rim-light relative">
                  <div className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl bg-bl-gold/15 border border-bl-gold/30 flex items-center justify-center text-bl-gold font-black text-xl rotate-12 group-hover:rotate-[24deg] transition-transform duration-500">
                    {sprint.no}
                  </div>

                  <h3 className="text-2xl font-bold uppercase mb-4 font-display text-bl-cyan">{sprint.title}</h3>
                  <div className="font-mono text-sm text-bl-text-muted mb-2">{sprint.time}</div>
                  <p className="text-bl-text-muted text-sm leading-relaxed mb-6 flex-1">{sprint.desc}</p>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-bl-gold/10 border border-bl-gold/20 text-bl-gold text-xs font-bold uppercase">
                    {sprint.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         CTA SECTION
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="spatial-panel p-10 md:p-16 text-center rim-light spatial-panel-gold relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-bl-gold/8 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-bl-cyan/5 blur-[100px] pointer-events-none" />

            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 gold-glow">
                Ready to <br />
                <span className="gold-gradient">Scale</span>?
              </h2>

              <p className="text-bl-text-muted text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Book a free strategy session. We&apos;ll define your first sprint and show you exactly what you get.
              </p>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-bl-gold text-bl-deep font-bold uppercase tracking-wider rounded-full transition-all hover:bg-bl-amber hover:shadow-[0_0_60px_rgba(181,154,95,0.3)] text-lg"
              >
                Book Strategy Call
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
