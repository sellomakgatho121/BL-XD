"use client";

import { MessageCircle, Globe, Video, Bot, Zap, Check, Users, Wallet } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";

const agenticServices = [
  {
    tier: "merchant" as const,
    title: "WhatsApp AI Storefront",
    price: "From R12,000",
    pricingModel: "Setup + per-conversation",
    description: "Your 24/7 AI sales agent on WhatsApp. 96% of SA internet users are already there.",
    features: [
      "WhatsApp Business API integration",
      "Local language support",
      "Payment links",
      "Product catalog",
      "Automated order tracking",
    ],
    valueProps: [
      "Mobile-first commerce",
      "AI handles 80% of queries",
    ],
    savingsNote: "70-80% cost advantage",
    featured: true,
  },
  {
    tier: "discovery" as const,
    title: "AI Landing + GEO",
    price: "R4,500",
    pricingModel: "Fixed quick-start",
    description: "An autonomous web node that ranks in AI search engines like ChatGPT and Claude.",
    features: [
      "GEO-optimized landing page",
      "AgentCard schema markup",
      "AI-readable structured data",
      "48-hour delivery",
    ],
  },
  {
    tier: "orchestrator" as const,
    title: "Silicon Workforce",
    price: "Custom",
    pricingModel: "Hybrid retainer",
    description: "A full AI operations team. Multi-agent systems for content, sales, and support.",
    features: [
      "Custom multi-agent architecture",
      "AI sales qualification",
      "Real-time analytics",
      "Monthly strategy calls",
    ],
  },
  {
    tier: "video" as const,
    title: "Video Content Engine",
    price: "From R6,000/mo",
    pricingModel: "Monthly subscription",
    description: "AI-generated video content optimized for social media algorithms.",
    features: [
      "30-60 videos per month",
      "Trend-aware content",
      "Auto-captioning",
      "Performance analytics",
    ],
  }
];

export default function ServicesContent() {
  return (
    <div className="min-h-screen bg-[var(--neo-white)] text-[var(--neo-black)] font-space-grotesk overflow-x-hidden selection:bg-[var(--neo-pink)] selection:text-[var(--neo-black)]">

      {/* ━━━ Header Navigation ━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-[var(--neo-black)] bg-[var(--neo-white)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--neo-yellow)] flex items-center justify-center border-2 border-[var(--neo-black)] group-hover:bg-[var(--neo-pink)] transition-colors">
              <span className="font-black text-xl">B</span>
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Blacklight</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/portfolio" className="font-bold uppercase tracking-widest hover:text-[var(--neo-blue)] transition-colors p-2 active:translate-y-1">Portfolio</Link>
            <Link href="/contact" className="hidden sm:block font-bold uppercase tracking-widest hover:text-[var(--neo-green)] transition-colors p-2 active:translate-y-1">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ━━━ Hero Section ━━━ */}
      <section className="pt-32 pb-16 px-4 border-b-8 border-[var(--neo-black)] bg-[var(--neo-yellow)] md:min-h-[70vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-[var(--neo-black)] text-[var(--neo-white)] px-4 py-2 font-bold uppercase tracking-widest mb-8 neo-shadow shadow-[6px_6px_0px_var(--neo-blue)] -rotate-2">
            AI Operational Services
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-8 leading-[0.9] text-[var(--neo-black)]">
            <GlitchText text="SILICON" intensity="low" triggerOnHover />
            <br />
            <span className="text-stroke-3 text-[var(--neo-white)]">WORKFORCE</span>
          </h1>

          <p className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto bg-[var(--neo-white)] p-6 border-4 border-[var(--neo-black)] shadow-[8px_8px_0px_var(--neo-pink)] rotate-1">
            Agents that sell, create, and operate 24/7. Hardcore automation built for heavy impact.
          </p>

          <div className="mt-16 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['24/7 Operations', 'Local-First', 'Massive Cost Advantage', 'Ship Fast'].map((feature, idx) => (
              <span key={idx} className="bg-[var(--neo-black)] text-[var(--neo-white)] px-4 py-2 font-bold uppercase border-2 border-[var(--neo-black)] hover:bg-[var(--neo-white)] hover:text-[var(--neo-black)] transition-colors cursor-crosshair">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Services Grid ━━━ */}
      <section className="py-24 px-4 bg-[var(--neo-white)]">
        <div className="max-w-7xl mx-auto">

          <div className="mb-16 border-l-8 border-[var(--neo-black)] pl-6">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              The <span className="bg-[var(--neo-black)] text-[var(--neo-white)] px-4">Arsenal</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {agenticServices.map((service, idx) => (
              <div
                key={service.tier}
                className={`border-4 border-[var(--neo-black)] p-6 md:p-10 flex flex-col justify-between group transition-transform ${idx % 2 === 0 ? 'bg-[var(--neo-blue)] text-[var(--neo-white)] hover:-rotate-1' : 'bg-[var(--neo-pink)] text-[var(--neo-black)] hover:rotate-1'
                  } shadow-[12px_12px_0px_var(--neo-black)]`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl md:text-4xl font-black uppercase">{service.title}</h3>
                    {service.featured && (
                      <span className="bg-[var(--neo-yellow)] text-[var(--neo-black)] px-3 py-1 font-bold uppercase text-xs border-2 border-[var(--neo-black)]">
                        Flagship
                      </span>
                    )}
                  </div>

                  <div className={`inline-block border-2 ${idx % 2 === 0 ? 'border-[var(--neo-white)] bg-[var(--neo-black)]' : 'border-[var(--neo-black)] bg-[var(--neo-white)]'} font-bold px-4 py-2 mb-6 uppercase`}>
                    {service.price} <span className="opacity-70 text-sm">/ {service.pricingModel}</span>
                  </div>

                  <p className="text-lg md:text-xl font-bold mb-8 leading-tight">
                    {service.description}
                  </p>

                  <ul className="mb-8 space-y-3">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-3 font-bold border-b border-current pb-2">
                        <Check size={20} className="shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`block w-full text-center py-4 font-black uppercase tracking-widest border-4 border-[var(--neo-black)] transition-colors ${idx % 2 === 0 ? 'bg-[var(--neo-white)] text-[var(--neo-black)] hover:bg-[var(--neo-yellow)]' : 'bg-[var(--neo-black)] text-[var(--neo-white)] hover:bg-[var(--neo-blue)]'
                    }`}
                >
                  Deploy Sequence
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ Sprint Methodology ━━━ */}
      <section className="py-24 px-4 bg-[var(--neo-black)] text-[var(--neo-white)] border-t-8 border-[var(--neo-white)]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[var(--neo-yellow)]">
              SPRINT <span className="text-[var(--neo-white)]">PROTOCOL</span>
            </h2>
            <p className="text-2xl font-bold mt-6 max-w-2xl mx-auto">No hourly billing. No scope creep. Brutal efficiency.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { no: "01", title: "Audit & Align", time: "2-4 Weeks", price: "R8,000" },
              { no: "02", title: "Implement", time: "6 Weeks", price: "From R35,000" },
              { no: "03", title: "Retainer", time: "Ongoing", price: "From R15,000/mo" },
            ].map((sprint, idx) => (
              <div key={idx} className="border-4 border-[var(--neo-white)] bg-[var(--neo-black)] p-8 relative hover:-translate-y-2 transition-transform cursor-pointer">
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-[var(--neo-pink)] text-[var(--neo-black)] font-black text-3xl flex items-center justify-center border-4 border-[var(--neo-white)] rotate-12">
                  {sprint.no}
                </div>
                <h3 className="text-3xl font-black uppercase mb-4 text-[var(--neo-green)]">{sprint.title}</h3>
                <div className="font-mono text-xl mb-4 opacity-80">{sprint.time}</div>
                <div className="inline-block bg-[var(--neo-white)] text-[var(--neo-black)] px-4 py-2 font-bold uppercase">{sprint.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Footer CTA ━━━ */}
      <section className="py-32 px-4 bg-[var(--neo-pink)] text-[var(--neo-black)] border-t-8 border-[var(--neo-black)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
            Ready To <br /> <span className="bg-[var(--neo-white)] px-4 border-4 border-[var(--neo-black)] inline-block -rotate-2 mt-2">Scale</span>?
          </h2>
          <Link href="/contact" className="inline-block bg-[var(--neo-black)] text-[var(--neo-white)] text-2xl md:text-4xl font-black uppercase px-12 py-6 border-4 border-[var(--neo-white)] shadow-[12px_12px_0px_var(--neo-blue)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[0px_0px_0px_var(--neo-blue)] transition-all active:scale-95">
            Book Strategy Call
          </Link>
        </div>
      </section>
    </div>
  );
}
