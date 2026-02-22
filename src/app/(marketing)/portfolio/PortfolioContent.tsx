"use client";

import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Gauge, Eye, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PageEffectsLayer, ScrollReveal3D } from "@/components/3d";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
              <GlitchText text="PORTFOLIO" intensity="medium" triggerOnHover />
            </h1>
            <p className="text-xl text-[var(--spectral-dim)] max-w-2xl mx-auto">
              Technical proof of our obsession with performance, design, and conversion.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-2 mb-12">
            <Filter className="w-5 h-5 text-[var(--spectral-muted)] mr-2" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-mono uppercase tracking-wider transition-colors ${
                  activeFilter === filter
                    ? "bg-[var(--signal-lime)] text-[var(--onyx)]"
                    : "border border-[var(--border)] text-[var(--spectral-dim)] hover:text-[var(--signal-lime)]"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, i) => (
              <ScrollReveal3D key={item.id} axis="both" maxRotation={5} parallaxShift={20}>
              <Tilt3DCard maxTilt={8} glareColor="rgba(215, 255, 0, 0.04)" borderColor="rgba(215, 255, 0, 0.2)">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--signal-lime)]/50 transition-colors"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-[var(--onyx-lighter)] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[var(--spectral-muted)] font-mono text-sm">{item.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] to-transparent" />
                  
                  {/* Metrics Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-[var(--signal-lime)] text-xs font-mono">
                          <Gauge className="w-3 h-3" />
                          {item.metrics.lighthouse}
                        </div>
                        <span className="text-[10px] text-[var(--spectral-muted)] uppercase">Lighthouse</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-[var(--signal-lime)] text-xs font-mono">
                          <TrendingUp className="w-3 h-3" />
                          {item.metrics.tti}
                        </div>
                        <span className="text-[10px] text-[var(--spectral-muted)] uppercase">TTI</span>
                      </div>
                    </div>
                    <Badge className="bg-[var(--signal-lime)]/10 text-[var(--signal-lime)] border-none text-xs">
                      {item.tier}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-[var(--spectral-muted)] font-mono uppercase">{item.industry}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--signal-lime)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--spectral-dim)] mb-4">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-[var(--onyx)] text-[var(--spectral-dim)]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[var(--signal-lime)] text-sm font-mono group-hover:gap-3 transition-all">
                    <span>View Case Study</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
              </Tilt3DCard>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* Maestro Metrics Section */}
      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
              Maestro Metrics
            </h2>
            <p className="text-3xl font-bold">Performance is our baseline</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-[var(--border)] bg-[var(--card)] p-8 text-center"
            >
              <div className="text-6xl font-black text-[var(--signal-lime)] mb-2">98</div>
              <div className="text-sm font-mono text-[var(--spectral-muted)] uppercase tracking-wider">Avg Lighthouse</div>
              <div className="text-xs text-[var(--spectral-dim)] mt-2">vs 72 industry average</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border border-[var(--border)] bg-[var(--card)] p-8 text-center"
            >
              <div className="text-6xl font-black text-[var(--signal-lime)] mb-2">0.6s</div>
              <div className="text-sm font-mono text-[var(--spectral-muted)] uppercase tracking-wider">Avg Time to Interactive</div>
              <div className="text-xs text-[var(--spectral-dim)] mt-2">vs 3.2s industry average</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border border-[var(--border)] bg-[var(--card)] p-8 text-center"
            >
              <div className="text-6xl font-black text-[var(--signal-lime)] mb-2">100</div>
              <div className="text-sm font-mono text-[var(--spectral-muted)] uppercase tracking-wider">Accessibility Score</div>
              <div className="text-xs text-[var(--spectral-dim)] mt-2">WCAG AAA compliant</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black tracking-tighter mb-6">
              Want to be our <span className="text-[var(--signal-lime)]">next</span> case study?
            </h2>
            <Button
              size="lg"
              className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
