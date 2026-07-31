"use client";

import Link from "next/link";
import { ArrowRight, Scissors, Sparkles, Building2, HeartPulse, BookOpen, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";
import { useCallback, useRef } from "react";

const showcases = [
  {
    title: "Siyas Beauty Parlour",
    description: "Boutique beauty parlour with a WhatsApp-powered booking agent and deposit-backed appointment flow",
    icon: Sparkles,
    gradient: "from-bl-amber/20 via-bl-amber/5 to-transparent",
    border: "border-bl-amber/20",
    href: "/portfolio/siyas-beauty-parlour",
  },
  {
    title: "Skuif-Cut Grootman",
    description: "Full-service barbershop booking platform with SMS appointment reminders and online scheduling",
    icon: Scissors,
    gradient: "from-bl-gold/20 via-bl-gold/5 to-transparent",
    border: "border-bl-gold/20",
    href: "/portfolio/skuif-cut-grootman",
  },
  {
    title: "OTTO Construction Works",
    description: "Professional construction company site showcasing bricklaying, tiling, electrical and fire protection services",
    icon: Building2,
    gradient: "from-bl-cyan/20 via-bl-cyan/5 to-transparent",
    border: "border-bl-cyan/20",
    href: "/portfolio/otto-construction",
  },
  {
    title: "JMG Healthcare Services",
    description: "Healthcare staffing platform connecting qualified professionals with patients and facilities nationwide",
    icon: HeartPulse,
    gradient: "from-bl-amber/20 via-bl-amber/5 to-transparent",
    border: "border-bl-amber/20",
    href: "/portfolio/jmg-healthcare",
  },
  {
    title: "Ascension Codex",
    description: "AI-powered knowledge platform with multi-model orchestration and real-time collaboration",
    icon: BookOpen,
    gradient: "from-bl-gold/20 via-bl-gold/5 to-transparent",
    border: "border-bl-gold/20",
    href: "/portfolio/ascension-codex",
  },
  {
    title: "FX Analyzer Pro",
    description: "Institutional-grade algo trading terminal with 4 Gemini AI agents, real-time MT5 execution and risk management",
    icon: TrendingUp,
    gradient: "from-bl-cyan/20 via-bl-cyan/5 to-transparent",
    border: "border-bl-cyan/20",
    href: "/portfolio/fx-analyzer",
  },
];

function ProjectCard({ item, index }: { item: (typeof showcases)[0]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 60%)`;
    glowRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !glowRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    glowRef.current.style.background = "transparent";
    glowRef.current.style.opacity = "0";
  }, []);

  return (
    <ScrollReveal y={30} scale={0.96} delay={0.15 + index * 0.1} threshold={0.15}>
      <div style={{ perspective: "1000px" }}>
        <Link
          ref={cardRef}
          href={item.href}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative block rounded-2xl overflow-hidden border border-white/5 hover:border-white/20"
          style={{ transformStyle: "preserve-3d", transition: "transform 0.3s ease-out, border-color 0.5s" }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none z-10 opacity-0 transition-opacity duration-300 rounded-2xl"
          />
          <div className="relative p-8 md:p-10" style={{ transformStyle: "preserve-3d" }}>
            <div
              className={`w-12 h-12 rounded-xl border ${item.border} flex items-center justify-center mb-5`}
              style={{ transform: "translateZ(30px)" }}
            >
              <item.icon className="w-5 h-5 text-bl-gold" />
            </div>
            <h3
              className="text-xl font-bold text-bl-text mb-2 group-hover:text-bl-gold transition-colors"
              style={{ transform: "translateZ(20px)" }}
            >
              {item.title}
            </h3>
            <p
              className="text-sm text-bl-text-muted leading-relaxed"
              style={{ transform: "translateZ(15px)" }}
            >
              {item.description}
            </p>
            <div
              className="mt-4 flex items-center gap-1.5 text-xs text-bl-gold opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ transform: "translateZ(25px)" }}
            >
              <span>View case study</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </Link>
      </div>
    </ScrollReveal>
  );
}

export default function PortfolioPreview() {
  return (
    <section className="relative py-32 px-6 overflow-hidden section-divider">
      <div className="absolute inset-0 bg-gradient-to-b from-bl-deep via-bl-surface/40 to-bl-deep pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal y={20} threshold={0.2}>
          <div className="text-center mb-16">
            <span className="text-bl-gold text-xs tracking-[0.2em] uppercase mb-4 block">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-bl-text mb-4">
              Showcase of <span className="text-gradient-gold">Excellence</span>
            </h2>
            <p className="text-bl-text-muted max-w-xl mx-auto">
              Each project is a case study in spatial engineering \u2014 blending 3D
              visuals, AI, and performance-first architecture.
            </p>
          </div>
        </ScrollReveal>

        {/* Showcase cards grid — 2x2 inspired by landonorris.com helmet grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {showcases.map((s, i) => (
            <ProjectCard key={s.title} item={s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal y={20} delay={0.6} threshold={0.2}>
          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-bl-gold/20 text-bl-gold text-sm hover:bg-bl-gold/5 transition-all group"
            >
              Explore Full Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
