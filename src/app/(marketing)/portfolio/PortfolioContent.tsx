"use client";

import { useState } from "react";
import { ExternalLink, TrendingUp, Gauge, Eye, ArrowRight, Filter, Layers, Move3d, Sparkles } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/marketing/navigation";
import Footer from "@/components/marketing/footer";

const portfolioItems = [
  {
    id: 1,
    title: "Kinetic Coffee Roasters",
    industry: "Retail",
    tier: "Growth",
    image: "/placeholder-coffee.jpg",
    metrics: { lighthouse: 98, tti: "0.6s", accessibility: 100 },
    description: "A dynamic e-commerce experience for Cape Town's premier specialty coffee roaster.",
    tags: ["E-Commerce", "Animation", "Performance"],
  },
  {
    id: 2,
    title: "Summit Legal",
    industry: "Professional Services",
    tier: "Spark",
    image: "/placeholder-legal.jpg",
    metrics: { lighthouse: 97, tti: "0.7s", accessibility: 100 },
    description: "High-converting landing page for a boutique Johannesburg law firm.",
    tags: ["Landing Page", "Lead Gen", "Minimal"],
  },
  {
    id: 3,
    title: "TechFlow SA",
    industry: "Technology",
    tier: "Growth",
    image: "/placeholder-tech.jpg",
    metrics: { lighthouse: 99, tti: "0.5s", accessibility: 100 },
    description: "Bold presence for a Cape Town startup incubator disrupting fintech.",
    tags: ["SaaS", "Dark Mode", "Micro-interactions"],
  },
  {
    id: 4,
    title: "Velvet Boutique",
    industry: "Fashion",
    tier: "Shop",
    image: "/placeholder-fashion.jpg",
    metrics: { lighthouse: 96, tti: "0.8s", accessibility: 98 },
    description: "Immersive shopping experience for a luxury Durban fashion retailer.",
    tags: ["E-Commerce", "3D", "WebGL"],
  },
  {
    id: 5,
    title: "Drift Architecture",
    industry: "Creative",
    tier: "Growth",
    image: "/placeholder-arch.jpg",
    metrics: { lighthouse: 98, tti: "0.6s", accessibility: 100 },
    description: "Portfolio showcase for an award-winning architectural practice.",
    tags: ["Portfolio", "Gallery", "Parallax"],
  },
  {
    id: 6,
    title: "Pulse Fitness",
    industry: "Health",
    tier: "Spark",
    image: "/placeholder-fitness.jpg",
    metrics: { lighthouse: 97, tti: "0.7s", accessibility: 99 },
    description: "High-energy landing page driving membership signups in Pretoria.",
    tags: ["Landing Page", "Video", "Motion"],
  },
];

const filters = ["All", "Retail", "Professional Services", "Technology", "Fashion", "Creative", "Health"];

export default function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All" ? portfolioItems : portfolioItems.filter((item) => item.industry === activeFilter);

  return (
    <div className="min-h-screen bg-bl-deep text-bl-text overflow-x-hidden">
      {/* Isometric grid overlay */}
      <div className="fixed inset-0 iso-grid pointer-events-none z-0" />

      {/* Ambient glow */}
      <div className="fixed top-1/3 right-[8%] w-80 h-80 rounded-full bg-bl-gold/5 blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-[5%] w-56 h-56 rounded-full bg-bl-cyan/5 blur-[80px] pointer-events-none z-0" />

      <Navigation />

      {/* ═══════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative z-10 pt-36 pb-16 px-6 scene-3d">
        <div className="max-w-6xl mx-auto text-center preserve-3d">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-8">
            <Move3d size={14} />
            Case Studies
          </div>

          <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6 gold-glow">
            <span className="block">The</span>
            <span className="gold-gradient">Gallery</span>
          </h1>

          <p className="text-lg md:text-xl text-bl-text-muted max-w-2xl mx-auto leading-relaxed">
            Technical proof of our obsession with performance, design, and conversion.
            Each project is a dimension deeper than the last.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         FILTERS
         ═══════════════════════════════════════ */}
      <section className="relative z-10 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <Filter size={14} className="text-bl-text-muted mr-1 shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-bl-gold text-bl-deep shadow-[0_0_20px_rgba(181,154,95,0.3)]"
                    : "bg-bl-glass border border-bl-glass-border text-bl-text-muted hover:text-bl-gold hover:border-bl-gold/30"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         PORTFOLIO GRID — 3D Tilt Cards
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-12 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 scene-3d-near">
              {filteredItems.map((item) => (
                <div key={item.id} className="tilt-card group">
                  <div className="spatial-panel overflow-hidden h-full flex flex-col rim-light">
                    {/* Image Area */}
                    <div className="relative aspect-video bg-bl-surface/80 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-bl-text-muted/40 text-xs font-mono">{item.title}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-bl-deep/80 via-transparent to-transparent" />

                      {/* Metrics Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-bl-gold text-xs font-mono">
                              <Gauge className="w-3 h-3" />
                              {item.metrics.lighthouse}
                            </div>
                            <span className="text-[10px] text-bl-text-muted uppercase tracking-wider">Lighthouse</span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-bl-cyan text-xs font-mono">
                              <TrendingUp className="w-3 h-3" />
                              {item.metrics.tti}
                            </div>
                            <span className="text-[10px] text-bl-text-muted uppercase tracking-wider">TTI</span>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-bl-gold/15 border border-bl-gold/25 text-bl-gold text-[10px] font-bold uppercase">
                          {item.tier}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] text-bl-text-muted font-mono uppercase tracking-wider">{item.industry}</span>
                      </div>

                      <h3 className="text-lg font-bold mb-2 font-display group-hover:text-bl-gold transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-bl-text-muted mb-4 flex-1 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-text-muted uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-bl-gold text-xs font-bold uppercase tracking-wider group/link hover:gap-3 transition-all">
                        <span>View Case Study</span>
                        <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="spatial-panel p-10 inline-block rim-light">
                <p className="text-bl-text-muted">No projects match this filter.</p>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="mt-4 px-6 py-3 rounded-full bg-bl-gold/10 border border-bl-gold/30 text-bl-gold text-sm font-bold uppercase tracking-wider hover:bg-bl-gold/20 transition-all"
                >
                  View All
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
         MAESTRO METRICS
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles size={14} />
              Maestro Metrics
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Performance Is Our <span className="gold-gradient">Baseline</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 scene-3d-near">
            {[
              { value: "98", label: "Avg Lighthouse", sub: "vs 72 industry average" },
              { value: "0.6s", label: "Avg Time to Interactive", sub: "vs 3.2s industry average" },
              { value: "100", label: "Accessibility Score", sub: "WCAG AAA compliant" },
            ].map((metric, i) => (
              <div key={i} className="tilt-card">
                <div className="spatial-panel p-8 text-center rim-light">
                  <div className="text-5xl md:text-6xl font-black gold-gradient mb-2">{metric.value}</div>
                  <div className="text-xs font-mono text-bl-text-muted uppercase tracking-wider mb-2">{metric.label}</div>
                  <div className="text-[10px] text-bl-text-muted/60">{metric.sub}</div>
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
                Want to be our <span className="gold-gradient">next</span> case study?
              </h2>
              <p className="text-bl-text-muted text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Let&apos;s build something that breaks the surface.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-bl-gold text-bl-deep font-bold uppercase tracking-wider rounded-full transition-all hover:bg-bl-amber hover:shadow-[0_0_60px_rgba(181,154,95,0.3)] text-lg"
              >
                Start Your Project
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
