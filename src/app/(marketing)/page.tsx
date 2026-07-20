"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles, Globe, Layers, Move3d, Github, Linkedin, Instagram, Menu, X } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── Gold Particles (ambient floating dots) ───
function GoldParticles({ count = 30 }: { count?: number }) {
  const [dots] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full opacity-0"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: d.size > 2 ? "rgba(181, 154, 95, 0.6)" : "rgba(181, 154, 95, 0.3)",
            animation: `float-y ${d.duration}s ease-in-out ${d.delay}s infinite`,
            filter: d.size > 2 ? "blur(0px)" : "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}

// ─── 3D Tilt Card Wrapper ───
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty("--mouse-x", `${x * 30}`);
    cardRef.current.style.setProperty("--mouse-y", `${y * -30}`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--mouse-x", "0");
    cardRef.current.style.setProperty("--mouse-y", "0");
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// ─── Isometric Floating Shape (decorative) ───
function IsoShape({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 0L74.641 20V60L40 80L5.359 60V20L40 0Z" fill="rgba(181, 154, 95, 0.06)" stroke="rgba(181, 154, 95, 0.15)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // ─── GSAP Scroll Animations ───
  useGSAP(() => {
    if (!containerRef.current) return;

    // Hero entrance
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(".hero-badge", { opacity: 0, y: 30, duration: 0.8 })
      .from(".hero-title", { opacity: 0, y: 40, duration: 1 }, "-=0.4")
      .from(".hero-subtitle", { opacity: 0, y: 30, duration: 0.8 }, "-=0.6")
      .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero-scroll-indicator", { opacity: 0, y: 10, duration: 0.5 }, "-=0.2");

    // Parallax hero shapes
    gsap.to(".hero-shape-1", {
      y: 80,
      rotation: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    gsap.to(".hero-shape-2", {
      y: -60,
      rotation: -10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Section headers fade up
    gsap.utils.toArray<HTMLElement>(".section-header").forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    // Service cards staggered entrance
    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        rotationX: 10,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power3.out",
      });
    });

    // Method steps staggered
    gsap.utils.toArray<HTMLElement>(".method-step").forEach((step, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: "top 88%",
        },
        opacity: 0,
        x: i % 2 === 0 ? -30 : 30,
        duration: 0.6,
        delay: i * 0.12,
        ease: "power2.out",
      });
    });

    // CTA section parallax
    gsap.from(".cta-section", {
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power2.out",
    });

  }, { scope: containerRef });

  return (
    <main
      ref={containerRef}
      className="relative bg-bl-deep text-bl-text overflow-x-hidden font-body"
    >
      {/* ─── Ambient Gold Particles ─── */}
      <GoldParticles count={40} />

      {/* ─── Isometric Grid Overlay ─── */}
      <div className="fixed inset-0 iso-grid pointer-events-none z-[1]" />

      {/* ═══════════════════════════════════════
         FLOATING PILL NAV (floating-ui + spatial)
         ═══════════════════════════════════════ */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 float-pill px-6 py-3 flex items-center gap-6 max-w-[90vw] overflow-x-auto hide-scrollbar">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-bl-gold/20 border border-bl-gold/30 flex items-center justify-center">
            <span className="text-bl-gold font-bold text-sm">B</span>
          </span>
          <span className="font-display font-bold text-sm tracking-wider uppercase hidden sm:block text-bl-text/80">
            Blacklight
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 ml-4">
          {["Services", "Portfolio", "Process", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs font-medium uppercase tracking-widest text-bl-text-muted hover:text-bl-gold transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="ml-auto shrink-0 px-5 py-2 bg-bl-gold/15 border border-bl-gold/30 rounded-full text-xs font-bold uppercase tracking-wider text-bl-gold hover:bg-bl-gold/25 transition-all flex items-center gap-2"
        >
          Get Quote
          <ArrowRight size={14} />
        </Link>

        <button
          className="md:hidden ml-2 text-bl-text-muted"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile nav dropdown */}
      {mobileNavOpen && (
        <div className="fixed top-20 left-4 right-4 z-50 float-pill p-6 md:hidden">
          <div className="flex flex-col gap-4">
            {["Services", "Portfolio", "Process", "Pricing"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest text-bl-text hover:text-bl-gold transition-colors"
                onClick={() => setMobileNavOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
         HERO SECTION — 3D UI + Spatial Design
         ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center scene-3d z-10 pt-24 pb-16">
        {/* Decorative 3D shapes */}
        <IsoShape className="hero-shape-1 top-[15%] left-[8%] w-32 h-32 opacity-0" />
        <IsoShape className="hero-shape-2 bottom-[20%] right-[10%] w-24 h-24 opacity-0" />

        {/* 3D floating glass orbs (CSS) */}
        <div className="absolute top-1/4 right-[15%] w-64 h-64 rounded-full bg-bl-gold/5 blur-[80px] animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full bg-bl-cyan/5 blur-[60px] animate-float-delayed pointer-events-none" />

        <div className="relative text-center max-w-4xl mx-auto px-6 preserve-3d">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-8">
            <Sparkles size={14} />
            Elite Web Engineering
          </div>

          {/* Hero Title — 3D perspective text */}
          <h1 className="hero-title text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6 gold-glow">
            <span className="block">Break The</span>
            <span className="gold-gradient">Surface</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg md:text-xl text-bl-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            We engineer spatial web experiences that exist in three dimensions.
            <br className="hidden md:block" />
            Passive browsing is dead — welcome to the depth.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-bl-gold text-bl-deep font-bold uppercase tracking-wider rounded-full transition-all hover:bg-bl-amber hover:shadow-[0_0_40px_rgba(181,154,95,0.3)]"
            >
              Initiate Sequence
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 border border-bl-glass-border rounded-full text-bl-text/80 font-medium hover:bg-bl-glass transition-all"
            >
              <Move3d size={18} />
              View in 3D
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bl-text-muted/60 font-mono">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-bl-gold/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         SERVICES — Isometric + Layered + Floating
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-header text-center mb-20">
            <span className="inline-block px-3 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-4">
              <Layers size={14} className="inline mr-1" />
              What We Build
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Depth <span className="gold-gradient">Engineered</span>
            </h2>
            <p className="text-bl-text-muted mt-4 max-w-xl mx-auto">
              Three layers of service, each with its own dimension of depth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 scene-3d-near">
            {/* Card 1: Landing Pages — 3D tilt + glass */}
            <TiltCard className="service-card">
              <div className="spatial-panel p-8 md:p-10 h-full flex flex-col rim-light">
                <div className="w-14 h-14 rounded-2xl bg-bl-gold/10 border border-bl-gold/20 flex items-center justify-center mb-6">
                  <Sparkles size={28} className="text-bl-gold" />
                </div>
                <h3 className="text-2xl font-bold uppercase mb-2 font-display">Landing</h3>
                <div className="text-3xl font-black gold-gradient mb-4">R3,500</div>
                <p className="text-bl-text-muted text-sm flex-1 leading-relaxed">
                  High-impact single-page sites for new ventures. Asymmetric spatial layout, 48-hour delivery. You break through, fast.
                </p>
                <div className="mt-6 pt-6 border-t border-bl-glass-border">
                  <Link href="/contact" className="text-bl-gold text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
                    Select Tier <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </TiltCard>

            {/* Card 2: Business Sites — isometric tilt */}
            <TiltCard className="service-card">
              <div className="spatial-panel p-8 md:p-10 h-full flex flex-col rim-light spatial-panel-gold">
                <div className="w-14 h-14 rounded-2xl bg-bl-gold/15 border border-bl-gold/30 flex items-center justify-center mb-6">
                  <Globe size={28} className="text-bl-gold" />
                </div>
                <h3 className="text-2xl font-bold uppercase mb-2 font-display">Business</h3>
                <div className="text-3xl font-black gold-gradient mb-4">R8,500</div>
                <p className="text-bl-text-muted text-sm flex-1 leading-relaxed">
                  Professional 3–5 page presence for established SMEs. Custom design system with SEO foundation and spatial UX principles.
                </p>
                <div className="mt-6 pt-6 border-t border-bl-glass-border">
                  <Link href="/contact" className="text-bl-gold text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
                    Select Tier <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </TiltCard>

            {/* Card 3: Enterprise — layered overlapping */}
            <TiltCard className="service-card">
              <div className="spatial-panel p-8 md:p-10 h-full flex flex-col rim-light">
                <div className="w-14 h-14 rounded-2xl bg-bl-cyan/10 border border-bl-cyan/20 flex items-center justify-center mb-6">
                  <Layers size={28} className="text-bl-cyan" />
                </div>
                <h3 className="text-2xl font-bold uppercase mb-2 font-display">Enterprise</h3>
                <div className="text-3xl font-black text-bl-cyan mb-4">Custom</div>
                <p className="text-bl-text-muted text-sm flex-1 leading-relaxed">
                  Full-stack web applications with real-time data, auth, payment, and deployment. Built on Next.js, Supabase, and Three.js.
                </p>
                <div className="mt-6 pt-6 border-t border-bl-glass-border">
                  <Link href="/contact" className="text-bl-cyan text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
                    Let&apos;s Talk <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         THE METHOD — Layered Design + Isometric
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6">
        {/* Layered decorative element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bl-gold/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="section-header text-center mb-20">
            <span className="inline-block px-3 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-4">
              <Move3d size={14} className="inline mr-1" />
              Our Process
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              The <span className="gold-gradient">Method</span>
            </h2>
            <p className="text-bl-text-muted mt-4 max-w-xl mx-auto">
              Four dimensions of depth we take every project through.
            </p>
          </div>

          {/* Layered stack (overlapping cards) */}
          <div className="layer-stack max-w-3xl mx-auto">
            {[
              { num: "01", title: "Discovery", desc: "We reverse-engineer what your market expects — then design the opposite. Surface assumptions, find the gap.", color: "gold" },
              { num: "02", title: "Architecture", desc: "Every pixel placed with intent. Every interaction mapped to a conversion goal in 3D space.", color: "cyan" },
              { num: "03", title: "Build", desc: "Performance-first engineering with React, Next.js, Three.js, and raw spatial design power.", color: "gold" },
              { num: "04", title: "Launch", desc: "We measure real performance metrics — not vanity. Core Web Vitals, conversion, and depth.", color: "cyan" },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`method-step spatial-panel p-8 md:p-10 mb-4 md:mb-6 ml-0 md:ml-${i * 6} mr-0 md:mr-${(3 - i) * 6} rim-light`}
              >
                <div className="flex items-start gap-6">
                  <div className={`shrink-0 w-16 h-16 rounded-2xl ${step.color === "gold" ? "bg-bl-gold/10 border border-bl-gold/20" : "bg-bl-cyan/10 border border-bl-cyan/20"} flex items-center justify-center`}>
                    <span className={`text-2xl font-black ${step.color === "gold" ? "text-bl-gold" : "text-bl-cyan"}`}>
                      {step.num}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold uppercase mb-3 font-display">{step.title}</h3>
                    <p className="text-bl-text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         CTA SECTION — Spatial Glass + 3D Depth
         ═══════════════════════════════════════ */}
      <section className="cta-section relative z-10 py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bl-gold/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          <div className="spatial-panel p-10 md:p-16 text-center rim-light spatial-panel-gold relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-bl-gold/8 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-bl-cyan/5 blur-[100px] pointer-events-none" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-bl-gold/10 border border-bl-gold/20 text-bl-gold text-xs font-semibold uppercase tracking-widest mb-6">
                <Sparkles size={14} />
                Ready for Depth?
              </span>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 gold-glow">
                Reveal Your<br />
                <span className="gold-gradient">Brilliance</span>
              </h2>

              <p className="text-bl-text-muted text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Stop blending in. Let&apos;s build a spatial web experience that lives in another dimension &mdash; yours.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-bl-gold text-bl-deep font-bold uppercase tracking-wider rounded-full transition-all hover:bg-bl-amber hover:shadow-[0_0_60px_rgba(181,154,95,0.3)] text-lg"
                >
                  Initiate Sequence
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         FOOTER — Layered Design
         ═══════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-bl-glass-border py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-bl-gold/15 border border-bl-gold/25 flex items-center justify-center">
                  <span className="text-bl-gold font-black text-lg">B</span>
                </span>
                <span className="font-display font-bold text-base uppercase tracking-wider">Blacklight</span>
              </div>
              <p className="text-sm text-bl-text-muted max-w-xs leading-relaxed">
                Revealing unseen brilliance through spatial web engineering.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-bl-gold mb-6">Contact</h4>
              <a href="mailto:hello@blacklight.co.za" className="block text-sm text-bl-text-muted hover:text-bl-gold transition-colors mb-4">
                hello@blacklight.co.za
              </a>
              <div className="flex gap-3">
                {[Github, Linkedin, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-bl-glass border border-bl-glass-border flex items-center justify-center text-bl-text-muted hover:text-bl-gold hover:border-bl-gold/30 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-bl-gold mb-6">Services</h4>
              <ul className="space-y-3">
                {["Landing Pages", "Business Sites", "Enterprise Apps", "Consulting"].map((s) => (
                  <li key={s}>
                    <Link href="/services" className="text-sm text-bl-text-muted hover:text-bl-gold transition-colors">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-bl-gold mb-6">Explore</h4>
              <ul className="space-y-3">
                {["Portfolio", "Process", "Pricing", "Contact"].map((s) => (
                  <li key={s}>
                    <Link href={`/${s.toLowerCase()}`} className="text-sm text-bl-text-muted hover:text-bl-gold transition-colors">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-bl-glass-border">
            <p className="text-xs text-bl-text-muted/60 uppercase tracking-wider">
              &copy; 2026 Blacklight Web Designs
            </p>
            <span className="text-xs text-bl-text-muted/40 px-3 py-1 rounded-full border border-bl-glass-border">
              Designed in South Africa
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
