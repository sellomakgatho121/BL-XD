"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowRight, Zap, TrendingUp, ShoppingBag, Stethoscope, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import { Suspense, lazy } from "react";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import DistortionTransition from "@/components/DistortionTransition";
import ServiceCard from "@/components/blacklight/service-card";
import MetricCard from "@/components/blacklight/metric-card";
import Navigation from "@/components/marketing/navigation";
import Footer from "@/components/marketing/footer";
import SystemStatus from "@/components/SystemStatus";
import { Button } from "@/components/ui/button";

// Lazy load heavy visual components
const QuantumField = lazy(() => import("@/components/blacklight/quantum-field"));
const ShowcaseGallery = lazy(() => import("@/components/ShowcaseGallery"));

const ComponentFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[var(--signal-lime)]/30 border-t-[var(--signal-lime)] rounded-full animate-spin" />
  </div>
);

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

      {/* Grid Pattern Background (inherited from coming soon) */}
      <div
        className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navigation (proper component with mobile menu) */}
      <Navigation />

      {/* Main Content with Distortion Entrance */}
      <DistortionTransition>
        {/* ========== HERO SECTION ========== */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
              <div className="space-y-8">
                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 border border-[var(--siren-red)]/50 bg-[var(--siren-red)]/10 px-3 py-1 font-mono text-xs text-[var(--siren-red)] shadow-[0_0_15px_rgba(255,0,60,0.3)]"
                >
                  <Terminal size={14} className="animate-pulse" />
                  <GlitchText text="SOUTH AFRICA'S ELITE WEB AGENCY" intensity="high" triggerOnHover={true} />
                </motion.div>

                {/* Headline with glow effect */}
                <div className="relative">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mix-blend-difference"
                  >
                    <GlitchText text="REVEALING" intensity="medium" triggerOnHover={true} />
                    <br />
                    <span className="text-[var(--signal-lime)]">BRILLIANCE</span>
                  </motion.h1>
                  {/* Animated gradient glow behind headline */}
                  <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-[var(--siren-red)] to-blue-600 opacity-15 blur-3xl animate-pulse" />
                </div>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg md:text-xl text-[var(--spectral-white)]/60 max-w-lg leading-relaxed border-l-2 border-[var(--signal-lime)] pl-4 font-mono"
                >
                  We dismantle the template-first culture. Bespoke, high-performance digital experiences for South African businesses that demand more.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none group"
                    asChild
                  >
                    <Link href="/contact">
                      Start Your Project
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[var(--spectral-white)]/20 text-[var(--spectral-white)] hover:bg-[var(--spectral-white)]/5 rounded-none font-mono uppercase tracking-wider"
                    asChild
                  >
                    <Link href="/portfolio">View Portfolio</Link>
                  </Button>
                </motion.div>
              </div>

              {/* Quantum Field Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="hidden lg:block"
              >
                <Suspense fallback={<ComponentFallback />}>
                  <QuantumField />
                </Suspense>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-[var(--spectral-white)]/20 rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-[var(--signal-lime)] rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ========== SYSTEM STATUS TICKER ========== */}
        <SystemStatus />

        {/* ========== METRICS SECTION ========== */}
        <section className="py-20 border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--spectral-white)]/50 mb-2">
                Maestro Metrics
              </h2>
              <p className="text-2xl font-bold text-[var(--spectral-white)]">
                Performance is not optional. It&apos;s our baseline.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, i) => (
                <MetricCard
                  key={metric.label}
                  {...metric}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========== SHOWCASE GALLERY (inherited from coming soon) ========== */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
                Technical Proof
              </h2>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
                See What We Build
              </p>
              <p className="text-lg text-[var(--spectral-white)]/50 max-w-2xl mx-auto">
                Interactive demonstrations of our technical capabilities. Not mockups. Real, running code.
              </p>
            </motion.div>

            <Suspense fallback={<ComponentFallback />}>
              <ShowcaseGallery />
            </Suspense>
          </div>
        </section>

        {/* ========== SERVICES SECTION ========== */}
        <section className="py-32 border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <p className="text-lg text-[var(--spectral-white)]/50 max-w-2xl mx-auto">
                From quick diagnostics to full e-commerce solutions. Every tier delivers uncompromising quality for South African businesses.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <ServiceCard key={service.tier} {...service} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ========== PROCESS SECTION ========== */}
        <section className="py-32 border-t border-[var(--border)] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
                Socratic Discovery
              </h2>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
                Our Process
              </p>
              <p className="text-lg text-[var(--spectral-white)]/50 max-w-2xl mx-auto">
                We never code until the soul of your project is identified. 80% of great design is decided by constraints and deep understanding.
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical line connector */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--signal-lime)]/50 via-[var(--signal-lime)]/20 to-transparent hidden md:block" />

              <div className="space-y-8">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-6 md:gap-8 items-start group"
                  >
                    <div className="shrink-0 w-16 h-16 border border-[var(--border)] bg-[var(--card)] flex items-center justify-center font-mono text-[var(--signal-lime)] text-lg font-black group-hover:bg-[var(--signal-lime)]/10 group-hover:border-[var(--signal-lime)]/50 transition-colors">
                      {step.number}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--signal-lime)] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[var(--spectral-white)]/50 leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-[var(--spectral-white)]/20 text-[var(--spectral-white)] hover:bg-[var(--spectral-white)]/5 rounded-none font-mono uppercase tracking-wider"
                asChild
              >
                <Link href="/process">
                  Learn More About Our Process
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ========== SOCIAL PROOF SECTION ========== */}
        <section className="py-32 border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
                Client Transmissions
              </h2>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
                What They Say
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-[var(--border)] bg-[var(--card)] p-8 hover:border-[var(--signal-lime)]/30 transition-colors group"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[var(--signal-lime)] text-[var(--signal-lime)]" />
                    ))}
                  </div>
                  <blockquote className="text-[var(--spectral-white)]/80 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-1 text-xs font-mono text-[var(--signal-lime)] mb-4">
                    <CheckCircle2 className="w-3 h-3" />
                    {testimonial.metric}
                  </div>
                  <div className="border-t border-[var(--border)] pt-4">
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-[var(--spectral-white)]/40 font-mono">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA SECTION ========== */}
        <section className="py-32 border-t border-[var(--border)] relative">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--signal-lime)] opacity-[0.03] blur-[128px] rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
              <p className="text-lg text-[var(--spectral-white)]/50 mb-4 max-w-xl mx-auto">
                Let&apos;s discuss your project. No templates. No shortcuts. Just exceptional digital craftsmanship built for the South African market.
              </p>
              <p className="text-sm font-mono text-[var(--spectral-white)]/30 mb-8">
                Free 15-minute consultation. No commitment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group"
                  asChild
                >
                  <Link href="/contact">
                    Book Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[var(--spectral-white)]/20 text-[var(--spectral-white)] hover:bg-[var(--spectral-white)]/5 rounded-none font-mono uppercase tracking-wider"
                  asChild
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </DistortionTransition>

      {/* Footer (proper component with newsletter, social links) */}
      <Footer />
    </div>
  );
}
