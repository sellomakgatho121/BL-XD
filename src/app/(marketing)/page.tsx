"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowRight, Zap, TrendingUp, ShoppingBag, Stethoscope } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import QuantumField from "@/components/blacklight/quantum-field";
import ServiceCard from "@/components/blacklight/service-card";
import MetricCard from "@/components/blacklight/metric-card";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { InteractiveHero3D } from "@/components/3d/InteractiveHero3D";
import { ScrollReveal3D } from "@/components/3d/ScrollReveal3D";
import { MouseGlow } from "@/components/3d/MouseGlow";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";

export const metadata = pageMetadata.home();

const services = [
  {
    tier: "spark" as const,
    title: "Landing Page",
    price: "R3,500",
    description: "High-impact, single-page site for new ventures and personal brands. Perfect for entrepreneurs building their first digital presence.",
    features: [
      "Asymmetric technical layout",
      "Core brand reveal",
      "Mobile-first optimization",
      "48-hour delivery",
      "Lighthouse 95+ score",
    ],
  },
  {
    tier: "growth" as const,
    title: "Business Site",
    price: "R8,500",
    description: "A professional 3-5 page presence for established SMEs. Custom design system with SEO foundation.",
    features: [
      "Custom design system",
      "3-5 professional pages",
      "SEO foundation",
      "Lead capture forms",
      "Performance profiling",
    ],
  },
  {
    tier: "shop" as const,
    title: "E-Commerce",
    price: "R18,500",
    description: "Fast, secure online stores for local retailers. Designed for speed and psychological trust.",
    features: [
      "Product management",
      "Secure checkout",
      "Payfast/Yoco integration",
      "Automated notifications",
      "WCAG AA compliant",
    ],
  },
  {
    tier: "diagnostic" as const,
    title: "Pulse Check",
    price: "R1,500",
    description: "Quick consult and fix for existing sites. Performance report plus 3 'Quick-Win' design improvements.",
    features: [
      "Performance audit",
      "UX evaluation",
      "3 Quick-Win fixes",
      "Technical report",
      "Implementation guide",
    ],
  },
];

const metrics = [
  { label: "Lighthouse Score", value: "98", trend: "up" as const, comparison: "vs 72 avg" },
  { label: "Time to Interactive", value: "0.8s", trend: "up" as const, comparison: "vs 3.2s avg" },
  { label: "Accessibility", value: "100", trend: "neutral" as const, comparison: "WCAG AAA" },
  { label: "Clients Served", value: "50+", trend: "up" as const, comparison: "SA SMEs" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative overflow-x-hidden">
      {/* Global Effects */}
      <GrainOverlay opacity={0.03} />
      <Scanlines />
      <MouseGlow color="#D7FF00" size={500} opacity={0.05} blur={100} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--onyx)]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center">
                <span className="text-[var(--onyx)] font-bold text-lg">B</span>
              </div>
              <span className="font-mono text-sm tracking-wider uppercase hidden sm:block">
                Blacklight
              </span>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/services" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">
                Services
              </Link>
              <Link href="/portfolio" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">
                Portfolio
              </Link>
              <Button
                size="sm"
                className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono text-xs uppercase tracking-wider rounded-none"
              >
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================================
          HERO SECTION - Interactive 3D Scene + Typographic Brutalism
          ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* 3D Canvas Layer - floating geometry + reactive wireframe grid */}
        <InteractiveHero3D
          showGeometry={true}
          showGrid={true}
          shapeCount={10}
        />

        {/* Typographic Content Layer */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 border border-[var(--siren-red)]/50 bg-[var(--siren-red-dim)] px-3 py-1 font-mono text-xs text-[var(--siren-red)]"
              >
                <Terminal size={14} className="animate-pulse" />
                <GlitchText text="SOUTH AFRICA'S ELITE WEB AGENCY" intensity="low" triggerOnHover={true} />
              </motion.div>

              {/* Headline - massive brutalist type overlapping 3D */}
              <motion.h1
                initial={{ opacity: 0, y: 40, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
                animate={{ opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter mix-blend-exclusion"
              >
                <GlitchText text="REVEALING" intensity="medium" triggerOnHover={true} />
                <br />
                <span className="text-[var(--signal-lime)]">BRILLIANCE</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-[var(--spectral-dim)] max-w-lg leading-relaxed border-l-2 border-[var(--signal-lime)] pl-4"
              >
                We dismantle the template-first culture. Bespoke, high-performance digital experiences that wow at first glance.
              </motion.p>

              {/* CTAs with 3D button physics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95, y: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Button
                    size="lg"
                    className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none group relative overflow-hidden"
                    asChild
                  >
                    <Link href="/contact">
                      <span className="relative z-10">Start Your Project</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95, y: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[var(--spectral-muted)] text-[var(--spectral-white)] hover:bg-[var(--spectral-muted)]/10 rounded-none font-mono uppercase tracking-wider"
                    asChild
                  >
                    <Link href="/portfolio">View Portfolio</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Quantum Field - interactive particle system */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
              style={{ perspective: 1000 }}
            >
              <QuantumField />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator with 3D bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[var(--spectral-muted)] flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-[var(--signal-lime)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================
          METRICS SECTION - 3D scroll reveal + tilt cards
          ============================================================ */}
      <section className="py-20 border-y border-[var(--border)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal3D axis="x" maxRotation={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--spectral-muted)] mb-2">
                Maestro Metrics
              </h2>
              <p className="text-2xl font-bold text-[var(--spectral-white)]">
                Performance is not optional. It&apos;s our baseline.
              </p>
            </motion.div>
          </ScrollReveal3D>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, i) => (
              <ScrollReveal3D key={metric.label} axis="both" maxRotation={8} parallaxShift={30}>
                <Tilt3DCard
                  maxTilt={15}
                  glareColor="rgba(215, 255, 0, 0.06)"
                  borderColor="rgba(215, 255, 0, 0.2)"
                >
                  <MetricCard
                    {...metric}
                    delay={i * 0.1}
                  />
                </Tilt3DCard>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICES SECTION - 3D perspective tilt cards
          ============================================================ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal3D axis="x" maxRotation={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
                The Spectrum
              </h2>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
                Service Tiers
              </p>
              <p className="text-lg text-[var(--spectral-dim)] max-w-2xl mx-auto">
                From quick diagnostics to full e-commerce solutions. Every tier delivers uncompromising quality.
              </p>
            </motion.div>
          </ScrollReveal3D>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <ScrollReveal3D key={service.tier} axis="both" maxRotation={6} parallaxShift={40}>
                <Tilt3DCard
                  maxTilt={10}
                  perspective={1000}
                  glareColor={
                    service.tier === "shop"
                      ? "rgba(255, 0, 60, 0.06)"
                      : "rgba(215, 255, 0, 0.06)"
                  }
                  borderColor={
                    service.tier === "shop"
                      ? "rgba(255, 0, 60, 0.25)"
                      : "rgba(215, 255, 0, 0.25)"
                  }
                >
                  <ServiceCard {...service} delay={i * 0.1} />
                </Tilt3DCard>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA SECTION - 3D reveal with depth
          ============================================================ */}
      <section className="py-32 border-t border-[var(--border)] relative overflow-hidden">
        {/* Ambient 3D glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(215, 255, 0, 0.08), transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255, 0, 60, 0.06), transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, -25, 15, 0],
              y: [0, 25, -15, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal3D axis="both" maxRotation={10} scaleRange={[0.88, 1]}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
                Ready to reveal your
                <br />
                <span className="text-[var(--signal-lime)]">brilliance?</span>
              </h2>
              <p className="text-lg text-[var(--spectral-dim)] mb-8 max-w-xl mx-auto">
                Let&apos;s discuss your project. No templates. No shortcuts. Just exceptional digital craftsmanship.
              </p>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group relative overflow-hidden"
                  asChild
                >
                  <Link href="/contact">
                    <span className="relative z-10">Book Free Consultation</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center">
                  <span className="text-[var(--onyx)] font-bold text-lg">B</span>
                </div>
                <span className="font-mono text-sm tracking-wider uppercase">
                  Blacklight
                </span>
              </div>
              <p className="text-sm text-[var(--spectral-muted)]">
                Revealing the unseen brilliance of South African brands.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-sm uppercase tracking-wider text-[var(--spectral-white)] mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-[var(--spectral-muted)]">
                <li>Landing Pages</li>
                <li>Business Sites</li>
                <li>E-Commerce</li>
                <li>Diagnostics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-sm uppercase tracking-wider text-[var(--spectral-white)] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[var(--spectral-muted)]">
                <li>About</li>
                <li>Portfolio</li>
                <li>Process</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-sm uppercase tracking-wider text-[var(--spectral-white)] mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-[var(--spectral-muted)]">
                <li>LinkedIn</li>
                <li>Instagram</li>
                <li>GitHub</li>
                <li>hello@blacklight.co.za</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-mono text-[var(--spectral-muted)] uppercase tracking-widest">
              &copy; 2026 Blacklight Web Designs. All rights reserved.
            </p>
            <p className="text-xs font-mono text-[var(--spectral-muted)] uppercase tracking-widest">
              Designed in South Africa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
