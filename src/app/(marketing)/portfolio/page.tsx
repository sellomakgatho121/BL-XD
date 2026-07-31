"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Scissors,
  Building2,
  HeartPulse,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";

const projects = [
  {
    slug: "skuif-cut-grootman",
    title: "Skuif-Cut Grootman",
    subtitle: "Barbershop Booking Platform",
    description:
      "A full-service barbershop booking platform with online appointment scheduling and Twilio-powered SMS reminders — reducing no-shows and streamlining the client experience.",
    icon: Scissors,
    color: "#CCFF00",
    tech: ["Next.js", "TypeScript", "LibSQL", "Twilio", "Drizzle"],
  },
  {
    slug: "otto-construction",
    title: "OTTO Construction Works",
    subtitle: "Construction Company Site",
    description:
      "A professional digital presence for a registered SA construction firm — showcasing bricklaying, tiling, electrical, and fire protection services with integrated quote requests.",
    icon: Building2,
    color: "#FF0066",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "jmg-healthcare",
    title: "JMG Healthcare Services",
    subtitle: "Healthcare Staffing Platform",
    description:
      "Connecting registered healthcare professionals with patients nationwide — offering nursing, elderly care, disability support, palliative care, and 24/7 medical transport.",
    icon: HeartPulse,
    color: "#CCFF00",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "ascension-codex",
    title: "Ascension Codex",
    subtitle: "AI Knowledge Platform",
    description:
      "An AI-powered knowledge platform with multi-model LLM orchestration (Anthropic + Gemini), Three.js 3D visualisations, real-time collaboration, and Neon Postgres persistence.",
    icon: BookOpen,
    color: "#00CCFF",
    tech: ["Next.js", "Gemini", "Anthropic", "Three.js", "Drizzle", "Neon"],
  },
  {
    slug: "fx-analyzer",
    title: "FX Analyzer Pro",
    subtitle: "Algo Trading Terminal",
    description:
      "An institutional-grade algorithmic FX trading terminal powered by 4 specialised Gemini AI agents (Technical, Fundamental, Sentiment, Risk) with MT5 execution via ZeroMQ.",
    icon: TrendingUp,
    color: "#FF0066",
    tech: ["Next.js 16", "Python", "Gemini AI", "ZeroMQ", "MT5", "Three.js"],
  },
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !wrapperRef.current) return;

    /* ─── Title slide staggered fade-in on load ─── */
    const tlTitle = gsap.from(".title-animate", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    /* ─── Desktop horizontal scroll ─── */
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const wrapper = wrapperRef.current!;
      const totalSlides = projects.length + 1; // title + all projects

      // Set explicit wrapper width = number-of-slides viewports wide
      wrapper.style.width = `${totalSlides * 100}vw`;

      // Recalculate after style takes effect (next frame)
      requestAnimationFrame(() => {
        const totalWidth = wrapper.scrollWidth - window.innerWidth;

        if (totalWidth <= 0) return; // guard against edge cases

        const tl = gsap.to(wrapper, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / projects.length,
              duration: { min: 0.2, max: 0.8 },
              ease: "power1.inOut",
            },
            end: () => `+=${totalWidth}`,
          },
        });

        return () => {
          tl.kill();
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });
    });

    return () => {
      tlTitle.kill();
      mm.revert();
    };
  }, []);

  return (
    <main className="bg-bl-deep text-bl-text font-space-grotesk overflow-x-hidden min-h-screen">
      {/* ━━━ Header ━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-bl-deep/85 backdrop-blur-2xl">
        <div className="mx-auto px-6 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-bl-gold rounded-sm flex items-center justify-center">
              <span className="text-bl-deep font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase hidden sm:block">
              Portfolio
            </span>
          </Link>

          <Link
            href="/"
            className="px-5 py-2 bg-bl-gold text-bl-deep font-semibold text-sm rounded-full hover:scale-105 transition-all flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Home
          </Link>
        </div>
      </nav>

      {/* ━━━ Horizontal scroll viewport ━━━ */}
      <div
        ref={containerRef}
        className="h-screen flex items-center relative overflow-hidden will-change-transform bg-bl-deep"
      >
        {/* Horizontal Scrolling Wrapper — width is set dynamically by JS */}
        <div ref={wrapperRef} className="flex h-full pt-[70px]">
          {/* ── Main Title Slide ── */}
          <section className="w-screen h-full flex items-center justify-center p-12 shrink-0 border-r border-white/10 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-bl-gold/[0.04] via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black opacity-[0.03] whitespace-nowrap pointer-events-none text-bl-gold select-none">
              PORTFOLIO
            </div>
            <div className="relative z-10 text-center max-w-3xl">
              <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter mb-8 leading-none">
                <span className="title-animate block">
                  <GlitchText text="Client" intensity="low" />
                </span>
                <br />
                <span className="title-animate text-gradient-gold block">
                  Portfolio
                </span>
              </h1>
              <div className="title-animate">
                <p className="text-sm md:text-base text-bl-text-muted max-w-2xl mx-auto p-5 bg-bl-surface/30 border border-white/10 rounded-2xl">
                  Real projects engineered for real businesses — from barbershop
                  booking to algorithmic trading. Swipe right to explore.
                </p>
              </div>
            </div>
          </section>

          {/* ── Project Slides ── */}
          {projects.map((p, i) => (
            <section
              key={p.slug}
              className="w-screen h-[calc(100vh-70px)] shrink-0 border-r border-white/10 relative overflow-hidden bg-bl-deep flex flex-col items-center justify-center"
            >
              {/* Per-project gradient background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${p.color}18 0%, transparent 70%),
                              radial-gradient(ellipse 60% 50% at 80% 50%, ${p.color}0A 0%, transparent 60%)`,
                }}
              />

              {/* Large semi-transparent icon as background artwork */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none">
                <p.icon className="w-[35vw] h-[35vw] md:w-[25vw] md:h-[25vw]" />
              </div>

              {/* Exhibit Number */}
              <div className="absolute top-12 left-12 z-30 pointer-events-none hidden md:block">
                <div
                  className="font-black text-sm uppercase px-3 py-1.5 rounded-full"
                  style={{
                    background: `${p.color}20`,
                    color: p.color,
                    border: `1px solid ${p.color}40`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}. {p.subtitle}
                </div>
              </div>

              {/* Decorative corner lines */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  borderRight: `2px solid ${p.color}20`,
                  borderTop: `2px solid ${p.color}20`,
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
                style={{
                  borderLeft: `2px solid ${p.color}20`,
                  borderBottom: `2px solid ${p.color}20`,
                }}
              />

              {/* Project Card */}
              <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16">
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                  {/* Icon side — rich visual container */}
                  <div className="shrink-0">
                    <div
                      className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center backdrop-blur-sm"
                      style={{
                        background: `linear-gradient(135deg, ${p.color}30 0%, ${p.color}08 100%)`,
                        border: `1px solid ${p.color}30`,
                        boxShadow: `0 0 40px ${p.color}10`,
                      }}
                    >
                      <p.icon
                        className="w-12 h-12 md:w-16 md:h-16"
                        style={{ color: p.color }}
                      />
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
                      {p.title}
                    </h2>
                    <p className="text-sm md:text-base text-bl-text-muted leading-relaxed max-w-xl mb-8">
                      {p.description}
                    </p>

                    {/* Creative tech stack badges */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-transform hover:scale-105"
                          style={{
                            background: `${p.color}18`,
                            color: p.color,
                            border: `1px solid ${p.color}30`,
                            boxShadow: `0 0 24px ${p.color}08`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/portfolio/${p.slug}`}
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-bl-gold text-bl-deep font-semibold text-sm rounded-full hover:scale-105 transition-all"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Large background number */}
              <div
                className="absolute bottom-[-5%] right-[-2%] text-[30vw] md:text-[20vw] font-black pointer-events-none select-none leading-none"
                style={{ color: `${p.color}08` }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ━━━ Mobile fallback (below lg breakpoint) ━━━ */}
      <div className="lg:hidden block pt-[70px]">
        <div className="px-6 py-8">
          <div className="text-center mb-12">
            <span className="text-bl-gold text-xs tracking-[0.2em] uppercase mb-4 block">
              Our Work
            </span>
            <h2 className="text-3xl font-bold text-bl-text mb-4">
              Client <span className="text-gradient-gold">Portfolio</span>
            </h2>
            <p className="text-bl-text-muted text-sm max-w-md mx-auto">
              Real projects engineered for real businesses. Tap any project to
              explore the full case study.
            </p>
          </div>

          <div className="space-y-5 pb-20">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group block rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${p.color}10 0%, transparent 100%)`,
                }}
              >
                {/* Color accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: p.color }}
                />

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${p.color}20`,
                        border: `1px solid ${p.color}30`,
                      }}
                    >
                      <p.icon
                        className="w-6 h-6"
                        style={{ color: p.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-[10px] uppercase tracking-wider font-semibold"
                        style={{ color: `${p.color}CC` }}
                      >
                        {String(i + 1).padStart(2, "0")}. {p.subtitle}
                      </span>
                      <h3 className="text-lg font-bold text-bl-text group-hover:text-bl-gold transition-colors truncate">
                        {p.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-4 h-4 text-bl-text-muted ml-auto group-hover:text-bl-gold transition-colors shrink-0" />
                  </div>
                  <p className="text-xs text-bl-text-muted leading-relaxed mb-4 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-[8px] font-semibold uppercase tracking-wider"
                        style={{
                          background: `${p.color}15`,
                          color: p.color,
                          border: `1px solid ${p.color}25`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
