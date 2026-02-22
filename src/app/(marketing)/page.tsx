"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import SpectralReveal from "@/components/blacklight/spectral-reveal";
import SignalPulse from "@/components/blacklight/signal-pulse";
import ProofMatrix from "@/components/blacklight/proof-matrix";
import MagneticButton from "@/components/blacklight/magnetic-button";
import ServiceCard from "@/components/blacklight/service-card";
import MetricCard from "@/components/blacklight/metric-card";
import Navigation from "@/components/marketing/navigation";
import Footer from "@/components/marketing/footer";

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

const processSteps = [
  { number: "01", title: "Constraints Analysis", description: "We define what your project cannot be, revealing what it must become." },
  { number: "02", title: "Soul Identification", description: "Deep discovery to find the core value that makes your brand unmistakable." },
  { number: "03", title: "Technical Architecture", description: "Performance-first engineering. Every millisecond is a design decision." },
  { number: "04", title: "Radical Implementation", description: "Bespoke code, zero templates. Your site is unlike anything else online." },
  { number: "05", title: "Performance Verification", description: "Lighthouse 95+, Core Web Vitals green, accessibility certified." },
];

const testimonials = [
  {
    name: "Thabo M.",
    role: "Founder, TechFlow SA",
    quote: "They didn't just build a website. They engineered a digital asset that converts visitors while I sleep.",
    metric: "340% increase in qualified leads",
  },
  {
    name: "Naledi K.",
    role: "Owner, Kinetic Coffee",
    quote: "Our old site loaded in 6 seconds. Blacklight got it to 0.8s. The difference in sales was immediate.",
    metric: "Lighthouse score: 98",
  },
  {
    name: "James P.",
    role: "Director, Summit Legal",
    quote: "The Socratic discovery process revealed things about our brand we hadn't articulated in 10 years.",
    metric: "5x more consultation bookings",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative overflow-x-hidden selection:bg-[var(--signal-lime)] selection:text-[var(--onyx)]">
      {/* Signature Effects */}
      <GrainOverlay opacity={0.03} />
      <Scanlines />

      {/* Navigation */}
      <Navigation />

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Ambient background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, var(--signal-lime), transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.06, 0.04] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03]"
            style={{ background: "radial-gradient(circle, #FF003C, transparent 70%)" }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.05, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Status Badge -- spectral reveal from left */}
            <SpectralReveal direction="left" delay={0.2}>
              <div className="inline-flex items-center gap-2 border border-[var(--siren-red)]/50 bg-[var(--siren-red)]/10 px-3 py-1 font-mono text-xs text-[var(--siren-red)] shadow-[0_0_15px_rgba(255,0,60,0.3)] mb-8">
                <Terminal size={14} className="animate-pulse" />
                <GlitchText text="SOUTH AFRICA'S ELITE WEB AGENCY" intensity="high" triggerOnHover={true} />
              </div>
            </SpectralReveal>

            {/* Headline -- spectral reveal from bottom */}
            <SpectralReveal direction="bottom" delay={0.5}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter mb-8">
                <span className="block">REVEALING</span>
                <span className="block text-[var(--signal-lime)] relative">
                  BRILLIANCE
                  {/* Underline accent */}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-[3px] bg-[var(--signal-lime)]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </h1>
            </SpectralReveal>

            {/* Subheadline -- spectral reveal diagonal */}
            <SpectralReveal direction="diagonal" delay={0.9}>
              <p className="text-lg md:text-xl text-[var(--spectral-white)]/60 max-w-xl leading-relaxed border-l-2 border-[var(--signal-lime)] pl-4 font-mono mb-10">
                We dismantle the template-first culture. Bespoke, high-performance digital experiences for South African businesses that demand more.
              </p>
            </SpectralReveal>

            {/* CTAs with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <MagneticButton
                  className="bg-[var(--signal-lime)] text-[var(--onyx)] font-mono uppercase tracking-wider text-sm px-8 py-4 font-bold flex items-center gap-2 group"
                  glowColor="var(--signal-lime)"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
              <Link href="/portfolio">
                <MagneticButton
                  className="border border-[var(--spectral-white)]/20 text-[var(--spectral-white)] font-mono uppercase tracking-wider text-sm px-8 py-4 flex items-center gap-2 hover:bg-[var(--spectral-white)]/5 transition-colors"
                  glowColor="var(--spectral-white)"
                  strength={10}
                >
                  View Portfolio
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-[var(--spectral-white)]/20 uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[var(--signal-lime)]/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== SIGNAL PULSE PROCESS BAR ========== */}
      <SignalPulse />

      {/* ========== METRICS SECTION ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpectralReveal direction="bottom" onScroll>
            <div className="text-center mb-12">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--spectral-white)]/40 mb-2">
                Maestro Metrics
              </h2>
              <p className="text-2xl font-bold text-[var(--spectral-white)]">
                Performance is not optional. It&apos;s our baseline.
              </p>
            </div>
          </SpectralReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, i) => (
              <SpectralReveal key={metric.label} direction="bottom" delay={i * 0.12} onScroll>
                <MetricCard {...metric} delay={0} />
              </SpectralReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROOF MATRIX (replaces ShowcaseGallery) ========== */}
      <section className="py-32 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpectralReveal direction="left" onScroll>
            <div className="text-center mb-16">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
                Technical Proof
              </h2>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
                The Evidence
              </p>
              <p className="text-lg text-[var(--spectral-white)]/40 max-w-2xl mx-auto">
                Not promises. Verifiable metrics. Hover each card to scan the full data.
              </p>
            </div>
          </SpectralReveal>

          <ProofMatrix />
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section className="py-32 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpectralReveal direction="diagonal" onScroll>
            <div className="text-center mb-16">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
                The Spectrum
              </h2>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
                Service Tiers
              </p>
              <p className="text-lg text-[var(--spectral-white)]/40 max-w-2xl mx-auto">
                From quick diagnostics to full e-commerce solutions. Every tier delivers uncompromising quality for South African businesses.
              </p>
            </div>
          </SpectralReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <SpectralReveal key={service.tier} direction={i % 2 === 0 ? "left" : "diagonal"} delay={i * 0.1} onScroll>
                <ServiceCard {...service} delay={0} />
              </SpectralReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESS SECTION ========== */}
      <section className="py-32 border-t border-[var(--border)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpectralReveal direction="bottom" onScroll>
            <div className="text-center mb-16">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
                Socratic Discovery
              </h2>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
                Our Process
              </p>
              <p className="text-lg text-[var(--spectral-white)]/40 max-w-2xl mx-auto">
                We never code until the soul of your project is identified. 80% of great design is decided by constraints and deep understanding.
              </p>
            </div>
          </SpectralReveal>

          <div className="relative">
            {/* Vertical signal line */}
            <motion.div
              className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
              style={{
                background: "linear-gradient(to bottom, var(--signal-lime), var(--signal-lime) 50%, transparent)",
              }}
              initial={{ scaleY: 0, transformOrigin: "top" }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="space-y-8">
              {processSteps.map((step, i) => (
                <SpectralReveal key={step.number} direction={i % 2 === 0 ? "left" : "diagonal"} delay={i * 0.15} onScroll>
                  <div className="flex gap-6 md:gap-8 items-start group">
                    <motion.div
                      className="shrink-0 w-16 h-16 border border-[var(--border)] bg-[var(--card)] flex items-center justify-center font-mono text-[var(--signal-lime)] text-lg font-black relative overflow-hidden"
                      whileHover={{
                        borderColor: "var(--signal-lime)",
                        backgroundColor: "rgba(215, 255, 0, 0.05)",
                      }}
                    >
                      {/* Corner tick marks */}
                      <div className="absolute top-0 left-0 w-2 h-px bg-[var(--signal-lime)]/50" />
                      <div className="absolute top-0 left-0 w-px h-2 bg-[var(--signal-lime)]/50" />
                      <div className="absolute bottom-0 right-0 w-2 h-px bg-[var(--signal-lime)]/50" />
                      <div className="absolute bottom-0 right-0 w-px h-2 bg-[var(--signal-lime)]/50" />
                      {step.number}
                    </motion.div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--signal-lime)] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[var(--spectral-white)]/40 leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </SpectralReveal>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/process">
              <MagneticButton
                className="border border-[var(--spectral-white)]/20 text-[var(--spectral-white)] font-mono uppercase tracking-wider text-sm px-8 py-4 flex items-center gap-2 mx-auto hover:bg-[var(--spectral-white)]/5 transition-colors"
                glowColor="var(--spectral-white)"
                strength={10}
              >
                Learn More About Our Process
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SOCIAL PROOF SECTION ========== */}
      <section className="py-32 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpectralReveal direction="bottom" onScroll>
            <div className="text-center mb-16">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
                Client Transmissions
              </h2>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
                What They Say
              </p>
            </div>
          </SpectralReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <SpectralReveal key={testimonial.name} direction="bottom" delay={i * 0.15} onScroll>
                <motion.div
                  className="border border-[var(--border)] bg-[var(--card)] p-8 hover:border-[var(--signal-lime)]/30 transition-all group relative overflow-hidden"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover scan line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--signal-lime)] opacity-0 group-hover:opacity-100"
                    initial={false}
                    style={{ boxShadow: "0 0 8px var(--signal-lime)" }}
                  />

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[var(--signal-lime)] text-[var(--signal-lime)]" />
                    ))}
                  </div>
                  <blockquote className="text-[var(--spectral-white)]/70 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-1 text-xs font-mono text-[var(--signal-lime)] mb-4">
                    <CheckCircle2 className="w-3 h-3" />
                    {testimonial.metric}
                  </div>
                  <div className="border-t border-[var(--border)] pt-4">
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-[var(--spectral-white)]/30 font-mono">{testimonial.role}</p>
                  </div>
                </motion.div>
              </SpectralReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-32 border-t border-[var(--border)] relative">
        {/* Convergent glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--signal-lime)] opacity-[0.02] blur-[128px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <SpectralReveal direction="bottom" onScroll>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
              Ready to reveal your
              <br />
              <span className="text-[var(--signal-lime)]">brilliance?</span>
            </h2>
            <p className="text-lg text-[var(--spectral-white)]/40 mb-4 max-w-xl mx-auto">
              Let&apos;s discuss your project. No templates. No shortcuts. Just exceptional digital craftsmanship built for the South African market.
            </p>
            <p className="text-sm font-mono text-[var(--spectral-white)]/20 mb-10">
              Free 15-minute consultation. No commitment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <MagneticButton
                  className="bg-[var(--signal-lime)] text-[var(--onyx)] font-mono uppercase tracking-wider text-lg px-10 py-5 font-bold flex items-center gap-2 group"
                  glowColor="var(--signal-lime)"
                  strength={20}
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
              <Link href="/pricing">
                <MagneticButton
                  className="border border-[var(--spectral-white)]/20 text-[var(--spectral-white)] font-mono uppercase tracking-wider px-8 py-4 hover:bg-[var(--spectral-white)]/5 transition-colors"
                  glowColor="var(--spectral-white)"
                  strength={10}
                >
                  View Pricing
                </MagneticButton>
              </Link>
            </div>
          </SpectralReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
