"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroScene from "./hero-scene";
import SplitText from "@/components/split-text";
import ScrollReveal from "@/components/scroll-reveal";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      {mounted && <HeroScene />}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-bl-deep/30 via-transparent to-bl-deep pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(181,154,95,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-bl-gold/20 bg-bl-gold/5 text-bl-gold text-xs tracking-widest uppercase mb-8"
          style={{ animation: "reveal-up 0.6s 0.1s both" }}
        >
          <Sparkles className="w-3 h-3" />
          Depth Engineered
        </div>

        {/* Main headline — word-by-word split text reveal */}
        <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-balance mb-4">
          <span className="block">
            <SplitText
              as="span"
              className="text-gradient-gold"
              type="words"
              stagger={0.04}
              threshold={0.5}
            >
              Blacklight
            </SplitText>
          </span>
          <span className="block mt-1">
            <SplitText
              as="span"
              className="text-bl-text"
              type="words"
              stagger={0.04}
              threshold={0.6}
            >
              Web Designs
            </SplitText>
          </span>
        </h1>

        <div className="relative mb-8">
          <p className="text-base md:text-lg text-bl-text-muted/70 font-mono tracking-[0.15em] uppercase">
            <span className="text-bl-gold">//</span> Revealing Unseen Brilliance
          </p>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-bl-gold/30 to-transparent" />
        </div>

        {/* Subtitle */}
        <ScrollReveal delay={0.3} y={30} threshold={0.5}>
          <p className="text-lg md:text-xl text-bl-text-muted max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
            South Africa&apos;s elite spatial web engineering for disruptive tech
            startups and luxury technical brands.
          </p>
        </ScrollReveal>

        {/* CTA Group */}
        <ScrollReveal delay={0.5} y={30} threshold={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bl-gold text-bl-deep font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(181,154,95,0.3)]"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-bl-gold to-bl-amber opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-bl-text text-sm tracking-wide hover:bg-white/5 transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "reveal-up 0.8s 1.2s both" }}
      >
        <span className="text-[10px] text-bl-text-muted tracking-[0.15em] uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-bl-gold/60 to-transparent animate-pulse-glow" />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" />
    </section>
  );
}
