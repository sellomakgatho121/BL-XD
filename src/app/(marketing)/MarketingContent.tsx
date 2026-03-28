"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowRight, Zap, TrendingUp, ShoppingBag, Stethoscope } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import ServiceCard from "@/components/blacklight/service-card";
import MetricCard from "@/components/blacklight/metric-card";
import Navigation from "@/components/marketing/navigation";
import { Button } from "@/components/ui/button";
import HeroCanvas from "@/components/three/HeroCanvas";
import { Tilt3D } from "@/components/motion/Tilt3D";

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

export default function MarketingContent() {
  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative overflow-x-hidden">
      <GrainOverlay opacity={0.03} />
      <Scanlines />

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

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 border border-[var(--siren-red)]/50 bg-[var(--siren-red-dim)] px-3 py-1 font-mono text-xs text-[var(--siren-red)]"
              >
                <Terminal size={14} className="animate-pulse" />
                <GlitchText text="SOUTH AFRICA'S ELITE WEB AGENCY" intensity="low" triggerOnHover={true} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter"
              >
                <GlitchText text="REVEALING" intensity="medium" triggerOnHover={true} />
                <br />
                <span className="text-[var(--signal-lime)]">BRILLIANCE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-[var(--spectral-dim)] max-w-lg leading-relaxed border-l-2 border-[var(--signal-lime)] pl-4"
              >
                We dismantle the template-first culture. Bespoke, high-performance digital experiences that wow at first glance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[var(--spectral-muted)] text-[var(--spectral-white)] hover:bg-[var(--spectral-muted)]/10 rounded-none font-mono uppercase tracking-wider"
                >
                  View Portfolio
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:block"
            >
              <Tilt3D className="relative h-[420px] border border-white/10 overflow-hidden" strength="subtle" z={14}>
                <HeroCanvas className="opacity-90" />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60" />
                  <div className="absolute left-4 top-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/60">
                      Interactive Field
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/35">
                      cursor → depth
                    </span>
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[var(--spectral-muted)] rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-[var(--signal-lime)] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              The Spectrum
            </h2>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--spectral-white)] mb-6">
              Service Tiers
            </p>
            <p className="text-lg text-[var(--spectral-dim)] max-w-2xl mx-auto">
              From quick diagnostics to full e-commerce solutions. Every tier delivers uncompromising quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.tier} {...service} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
              Why Blacklight
            </h2>
            <p className="text-3xl md:text-4xl font-black tracking-tight text-[var(--spectral-white)]">
              We&apos;re not your typical agency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "No Templates", desc: "Every project starts from scratch. Your brand deserves original design, not cookie-cutter layouts." },
              { title: "Performance First", desc: "We obsess over Lighthouse scores. Fast sites rank better, convert higher, and cost less to host." },
              { title: "Local Expertise", desc: "We understand the SA market. Local payments, local hosting, and workarounds for data costs." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-[var(--border)] bg-[var(--card)]/50"
              >
                <h3 className="text-xl font-bold text-[var(--spectral-white)] mb-3">{item.title}</h3>
                <p className="text-[var(--spectral-dim)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--spectral-muted)] mb-4">
              Client Stories
            </h2>
            <p className="text-3xl md:text-4xl font-black tracking-tight text-[var(--spectral-white)]">
              Results that speak.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", company: "Wellness Studio", quote: "Our booking increased 340% after the new site launched. Worth every rand.", role: "Johannesburg" },
              { name: "David K.", company: "Tech Startup", quote: "Fast, professional, and actually understood our vision. The 3D elements wowed investors.", role: "Cape Town" },
              { name: "Priya L.", company: "E-commerce Store", quote: "Sales through mobile jumped 200%. The PWA works perfectly in areas with bad signal.", role: "Durban" },
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-[var(--border)] bg-[var(--card)]/30"
              >
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-[var(--signal-lime)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--spectral-white)] mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-[var(--spectral-white)] text-sm">{testimonial.name}</p>
                  <p className="text-xs text-[var(--spectral-muted)]">{testimonial.company} - {testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-[var(--border)] bg-[var(--card)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[var(--spectral-muted)] font-mono uppercase tracking-widest mb-8">
            Trusted by businesses across South Africa
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {["Lighthouse 98+", "WCAG AAA", "ISO 27001", "GDPR Ready", "ZA Hosting"].map((item) => (
              <span key={item} className="text-sm font-mono uppercase tracking-wider text-[var(--spectral-muted)]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            <Button
              size="lg"
              className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

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
              © 2026 Blacklight Web Designs. All rights reserved.
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
