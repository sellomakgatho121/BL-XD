"use client";

import { Target, Zap, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";

const tiers = [
  {
    tier: "discovery",
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
    href: "/contact?package=discovery",
    featured: false
  },
  {
    tier: "merchant",
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
    href: "/contact?package=merchant",
    featured: true
  },
  {
    tier: "orchestrator",
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
    href: "/contact?package=orchestrator",
    featured: false
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
    <div className="min-h-screen bg-[var(--neo-white)] text-[var(--neo-black)] font-space-grotesk overflow-x-hidden selection:bg-[var(--neo-yellow)] selection:text-[var(--neo-black)]">

      {/* ━━━ Header Navigation ━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-[var(--neo-black)] bg-[var(--neo-white)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--neo-pink)] flex items-center justify-center border-2 border-[var(--neo-black)] group-hover:bg-[var(--neo-blue)] transition-colors">
              <span className="font-black text-xl text-[var(--neo-black)]">B</span>
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Blacklight</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="font-bold uppercase tracking-widest hover:bg-[var(--neo-black)] hover:text-[var(--neo-white)] px-3 py-1 border-2 border-transparent hover:border-[var(--neo-black)] transition-colors active:scale-95">Services</Link>
            <Link href="/contact" className="font-bold uppercase tracking-widest hover:bg-[var(--neo-black)] hover:text-[var(--neo-white)] px-3 py-1 border-2 border-transparent hover:border-[var(--neo-black)] transition-colors active:scale-95">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ━━━ Hero Section ━━━ */}
      <section className="pt-32 pb-16 px-4 md:min-h-[50vh] flex flex-col justify-center bg-[var(--neo-blue)] text-[var(--neo-white)] border-b-8 border-[var(--neo-black)]">
        <div className="max-w-7xl mx-auto w-full text-center">

          <div className="inline-block bg-[var(--neo-yellow)] text-[var(--neo-black)] px-6 py-2 font-black uppercase text-xl md:text-2xl border-4 border-[var(--neo-black)] shadow-[8px_8px_0px_var(--neo-pink)] rotate-2 mb-12">
            Transparent Pricing
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter mb-8 leading-[0.8] drop-shadow-[6px_6px_0px_var(--neo-black)]">
            <GlitchText text="VALUE" intensity="low" /> <br />
            <span className="text-[var(--neo-yellow)]">{'>'}</span> HOURS
          </h1>

          <p className="text-xl md:text-3xl font-bold max-w-3xl mx-auto p-6 bg-[var(--neo-white)] text-[var(--neo-black)] border-4 border-[var(--neo-black)] -rotate-1 shadow-[8px_8px_0px_var(--neo-green)] leading-tight">
            We don't sell hours. We sell outcomes. Fixed-price sprints, clear deliverables, and AI agents that work for you 24/7.
          </p>
        </div>
      </section>

      {/* ━━━ Pricing Tiers ━━━ */}
      <section className="py-24 px-4 bg-[var(--neo-white)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 gap-y-12">
            {tiers.map((tier, i) => (
              <div
                key={tier.tier}
                className={`relative border-8 border-[var(--neo-black)] flex flex-col justify-between group
                  ${tier.featured ? 'bg-[var(--neo-yellow)] shadow-[15px_15px_0px_var(--neo-black)] -translate-y-4' : 'bg-[var(--neo-white)] shadow-[10px_10px_0px_var(--neo-black)] hover:-translate-y-2'} transition-transform p-6 md:p-8
                `}
              >
                {tier.featured && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[var(--neo-black)] text-[var(--neo-white)] font-black uppercase px-6 py-2 border-4 border-[var(--neo-black)]">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 mt-4">{tier.title}</h3>
                  <div className="flex flex-col mb-8 p-4 bg-[var(--neo-black)] text-[var(--neo-white)] border-2 border-[var(--neo-black)]">
                    <span className="text-4xl font-black text-[var(--neo-green)]">{tier.price}</span>
                    <span className="text-sm font-mono mt-1 opacity-80 uppercase">{tier.pricingModel}</span>
                  </div>

                  <p className="text-xl font-bold mb-8 opacity-90 leading-tight min-h-[80px]">
                    {tier.description}
                  </p>

                  <ul className="mb-8 space-y-4 font-bold border-l-4 border-[var(--neo-black)] pl-4">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-[var(--neo-pink)] text-xl leading-none">{'>>'}</span>
                        <span className="leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={tier.href}
                  className="block w-full text-center bg-[var(--neo-black)] text-[var(--neo-white)] font-black text-xl uppercase py-4 border-4 border-transparent hover:bg-transparent hover:text-[var(--neo-black)] hover:border-[var(--neo-black)] transition-colors active:scale-95 touch-manipulation"
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Sprint Model ━━━ */}
      <section className="py-24 px-4 bg-[var(--neo-black)] text-[var(--neo-white)] border-y-8 border-[var(--neo-black)] relative overflow-hidden">

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 border-l-8 border-[var(--neo-yellow)] pl-6 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[var(--neo-yellow)] mb-6">The Sprint Model</h2>
            <p className="text-2xl font-bold opacity-90">Traditional development drags on for months. We work in intense, focused sprints to ship value fast.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sprints.map((sprint, i) => (
              <div
                key={sprint.name}
                className="bg-[var(--neo-white)] text-[var(--neo-black)] p-8 border-4 border-[var(--neo-white)] relative hover:bg-[var(--neo-pink)] transition-colors group cursor-crosshair"
              >
                <div className="w-16 h-16 bg-[var(--neo-black)] text-[var(--neo-white)] flex items-center justify-center mb-8 rotate-3 group-hover:rotate-12 transition-transform shadow-[4px_4px_0px_var(--neo-yellow)]">
                  <sprint.icon size={32} />
                </div>

                <h3 className="text-3xl font-black uppercase mb-4 pr-12">{sprint.name}</h3>

                <div className="inline-block bg-[var(--neo-black)] text-[var(--neo-yellow)] font-mono font-bold px-3 py-1 mb-6 border-2 border-[var(--neo-black)]">
                  {sprint.duration}
                </div>

                <p className="text-lg font-bold mb-8 min-h-[80px]">{sprint.description}</p>

                <div className="border-t-4 border-[var(--neo-black)] pt-4 text-3xl font-black text-[var(--neo-blue)]">
                  {sprint.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="py-32 px-4 bg-[var(--neo-green)] text-[var(--neo-black)] text-center border-t-8 border-[var(--neo-black)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
            Ready to <span className="bg-[var(--neo-black)] text-[var(--neo-white)] px-4">Start</span>?
          </h2>
          <p className="text-2xl font-bold mb-12 max-w-2xl mx-auto bg-[var(--neo-white)] p-4 border-4 border-[var(--neo-black)] shadow-[6px_6px_0px_var(--neo-pink)] -rotate-1">
            Book a free strategy session. We'll define your first sprint and show you exactly what you get.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 bg-[var(--neo-black)] text-[var(--neo-white)] text-2xl md:text-4xl font-black uppercase px-8 py-6 border-4 border-[var(--neo-black)] hover:bg-[var(--neo-yellow)] hover:text-[var(--neo-black)] transition-colors group shadow-[10px_10px_0px_var(--neo-blue)] active:translate-y-2 active:translate-x-2 active:shadow-none touch-manipulation"
          >
            <span>Book Strategy Session</span>
            <ArrowRight size={40} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
