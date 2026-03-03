"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Terminal,
  ArrowRight,
  ArrowUpRight,
  Check,
  Send,
  Zap,
  Globe,
  ShoppingBag,
  Stethoscope,
  ChevronRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import GlitchText from "@/components/GlitchText";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0A0A0A]" />,
  }
);

/* ──────────────────────────────────────────
   DATA
   ────────────────────────────────────────── */

const services = [
  {
    tier: "spark",
    title: "Landing Page",
    price: "R3,500",
    description:
      "High-impact single-page site for new ventures. Asymmetric technical layout, mobile-first, 48-hour delivery.",
    features: [
      "Asymmetric technical layout",
      "Core brand reveal",
      "Mobile-first optimization",
      "48-hour delivery",
      "Lighthouse 95+",
    ],
    icon: Zap,
    color: "#D7FF00",
  },
  {
    tier: "growth",
    title: "Business Site",
    price: "R8,500",
    description:
      "Professional 3-5 page presence for established SMEs. Custom design system with SEO foundation.",
    features: [
      "Custom design system",
      "3-5 professional pages",
      "SEO foundation",
      "Lead capture forms",
      "Performance profiling",
    ],
    icon: Globe,
    color: "#00CCFF",
  },
  {
    tier: "shop",
    title: "E-Commerce",
    price: "R18,500",
    description:
      "Fast, secure online stores for local retailers. Payfast/Yoco integration, WCAG AA compliant.",
    features: [
      "Product management",
      "Secure checkout",
      "Payfast/Yoco integration",
      "Automated notifications",
      "WCAG AA compliant",
    ],
    icon: ShoppingBag,
    color: "#FF003C",
  },
  {
    tier: "diagnostic",
    title: "Pulse Check",
    price: "R1,500",
    description:
      "Quick consult and fix for existing sites. Performance report plus 3 Quick-Win design improvements.",
    features: [
      "Performance audit",
      "UX evaluation",
      "3 Quick-Win fixes",
      "Technical report",
      "Implementation guide",
    ],
    icon: Stethoscope,
    color: "#FF8800",
  },
];

const metrics = [
  { label: "LIGHTHOUSE", value: "98", suffix: "/100" },
  { label: "TTI", value: "0.8", suffix: "s" },
  { label: "ACCESSIBILITY", value: "100", suffix: "%" },
  { label: "CLIENTS", value: "50", suffix: "+" },
  { label: "UPTIME", value: "99.9", suffix: "%" },
  { label: "LOAD TIME", value: "1.2", suffix: "s" },
  { label: "LIGHTHOUSE", value: "98", suffix: "/100" },
  { label: "TTI", value: "0.8", suffix: "s" },
];

const processSteps = [
  {
    phase: "01",
    title: "Discovery",
    description:
      "Deep-dive into your brand, audience, and competitive landscape. We reverse-engineer what your market expects — then design the opposite.",
  },
  {
    phase: "02",
    title: "Architecture",
    description:
      "Information architecture, wireframes, and technical blueprints. Every pixel placement is intentional, every interaction maps to a conversion goal.",
  },
  {
    phase: "03",
    title: "Build",
    description:
      "Component-driven development with Next.js, React, and Tailwind. Performance-first engineering with real-time collaboration.",
  },
  {
    phase: "04",
    title: "Launch & Iterate",
    description:
      "Deployment, monitoring, and continuous optimization. We measure real performance metrics, not vanity numbers.",
  },
];

/* ──────────────────────────────────────────
   STAGGER ANIMATION VARIANTS
   ────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ──────────────────────────────────────────
   LANDING PAGE
   ────────────────────────────────────────── */

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative overflow-x-hidden selection:bg-[var(--signal-lime)] selection:text-[var(--onyx)]"
    >
      {/* ━━━ NAVIGATION ━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--spectral-white)]/[0.06] bg-[var(--onyx)]/90 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-[var(--onyx)] font-black text-sm">B</span>
              </div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--spectral-white)] hidden sm:block">
                Blacklight
              </span>
            </Link>

            <div className="flex items-center gap-6">
              {["Services", "Portfolio", "Process", "Blog"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="hidden md:block text-xs tracking-[0.15em] uppercase text-[var(--spectral-white)]/50 hover:text-[var(--signal-lime)] transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/contact"
                className="px-4 py-2 bg-[var(--signal-lime)] text-[var(--onyx)] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[var(--signal-lime)]/90 transition-all flex items-center gap-2 group"
              >
                Get Quote
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex items-center" id="hero">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas />
        </div>

        {/* HTML Overlay — renders SSR-first */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 pt-32 pb-24">
          {/* 90/10 asymmetric layout — content pushed left */}
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-[var(--siren-red)]/40 bg-[var(--siren-red)]/[0.06] px-3 py-1.5 mb-8"
            >
              <Terminal size={13} className="text-[var(--siren-red)] animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--siren-red)] uppercase">
                <GlitchText text="SOUTH AFRICA'S ELITE WEB AGENCY" intensity="low" triggerOnHover />
              </span>
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.04em] mb-8"
            >
              {["REVEALING"].map((word, i) => (
                <motion.span
                  key={word}
                  variants={fadeUp}
                  custom={i}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                variants={fadeUp}
                custom={1}
                className="inline-block text-[var(--signal-lime)]"
                style={{
                  textShadow: "0 0 60px rgba(215,255,0,0.3), 0 0 120px rgba(215,255,0,0.1)",
                }}
              >
                BRILLIANCE
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-[var(--spectral-white)]/55 max-w-lg leading-relaxed border-l-2 border-[var(--signal-lime)] pl-5 mb-10"
            >
              We dismantle the template-first culture. Bespoke, high-performance digital experiences
              that won&apos;t be mistaken for anyone else.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--signal-lime)] text-[var(--onyx)] font-bold text-sm tracking-[0.1em] uppercase hover:bg-[var(--signal-lime)]/90 transition-all group"
              >
                Start Your Project
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--spectral-white)]/15 text-[var(--spectral-white)] text-sm tracking-[0.1em] uppercase hover:border-[var(--signal-lime)]/40 hover:text-[var(--signal-lime)] transition-all"
              >
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--spectral-white)]/30">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[var(--signal-lime)] to-transparent"
          />
        </motion.div>
      </section>

      {/* ━━━ METRICS TICKER ━━━ */}
      <section className="py-5 border-y border-[var(--spectral-white)]/[0.06] overflow-hidden">
        <div className="relative">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...metrics, ...metrics].map((m, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--spectral-white)]/30 uppercase">
                  {m.label}
                </span>
                <span className="text-lg font-bold font-mono text-[var(--signal-lime)] tabular-nums">
                  {m.value}
                </span>
                <span className="text-xs font-mono text-[var(--spectral-white)]/40">
                  {m.suffix}
                </span>
                <span className="w-1 h-1 bg-[var(--spectral-white)]/10" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━ SERVICES ━━━ */}
      <section className="py-32" id="services">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-[var(--signal-lime)] uppercase block mb-4">
              The Spectrum
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] max-w-xl">
              Service
              <br />
              <span className="text-[var(--spectral-white)]/40">Tiers</span>
            </h2>
          </motion.div>

          {/* Staggered asymmetric cards */}
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.tier}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={`group relative border border-[var(--spectral-white)]/[0.06] bg-[var(--onyx)] overflow-hidden cursor-pointer ${i % 2 === 1 ? "md:mt-12" : ""
                    }`}
                  style={{ perspective: "1000px" }}
                >
                  {/* Top accent line */}
                  <div
                    className="h-[2px] w-full"
                    style={{ background: service.color }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${service.color}15, transparent 70%)`,
                    }}
                  />

                  <div className="p-8 md:p-10 relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 flex items-center justify-center"
                          style={{ backgroundColor: `${service.color}12` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: service.color }} />
                        </div>
                        <div>
                          <span
                            className="text-[10px] font-mono tracking-[0.2em] uppercase block"
                            style={{ color: service.color }}
                          >
                            {service.tier}
                          </span>
                          <h3 className="text-xl font-bold">{service.title}</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold">{service.price}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--spectral-white)]/50 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-[var(--spectral-white)]/60">
                          <div className="w-1 h-1" style={{ backgroundColor: service.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase group/cta"
                      style={{ color: service.color }}
                    >
                      Get Started
                      <ArrowUpRight
                        size={14}
                        className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ PROCESS TIMELINE ━━━ */}
      <section className="py-32 border-t border-[var(--spectral-white)]/[0.06]" id="process">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-[var(--signal-lime)] uppercase block mb-4">
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] max-w-xl">
              The
              <br />
              <span className="text-[var(--spectral-white)]/40">Process</span>
            </h2>
          </motion.div>

          <div className="grid gap-0 relative">
            {/* Vertical pulse line */}
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--signal-lime)]/30 via-[var(--signal-lime)]/10 to-transparent" />

            {processSteps.map((step, i) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex gap-8 md:gap-12 py-10 group"
              >
                {/* Timeline node */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 border border-[var(--signal-lime)]/30 bg-[var(--onyx)] flex items-center justify-center group-hover:border-[var(--signal-lime)] group-hover:bg-[var(--signal-lime)]/[0.08] transition-all duration-500">
                    <span className="text-xs font-mono text-[var(--signal-lime)]">{step.phase}</span>
                  </div>
                  {/* Pulse dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--signal-lime)] opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-[var(--signal-lime)] animate-ping" />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[var(--signal-lime)] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--spectral-white)]/45 leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA / LEAD CAPTURE ━━━ */}
      <section className="py-32 border-t border-[var(--spectral-white)]/[0.06] relative" id="contact">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--signal-lime)]/[0.02] blur-[150px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24">
            {/* Left — CTA text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] font-mono tracking-[0.3em] text-[var(--signal-lime)] uppercase block mb-4">
                Let&apos;s Talk
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] mb-6">
                Ready to reveal
                <br />
                your{" "}
                <span
                  className="text-[var(--signal-lime)]"
                  style={{
                    textShadow: "0 0 40px rgba(215,255,0,0.2)",
                  }}
                >
                  brilliance?
                </span>
              </h2>
              <p className="text-base text-[var(--spectral-white)]/45 leading-relaxed max-w-md mb-8">
                No templates. No shortcuts. Just exceptional digital craftsmanship
                built for South African brands that refuse to blend in.
              </p>

              {/* Quick stats */}
              <div className="flex gap-8">
                {[
                  { val: "48h", label: "Response" },
                  { val: "100%", label: "Bespoke" },
                  { val: "95+", label: "Lighthouse" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-bold text-[var(--signal-lime)] font-mono">
                      {s.val}
                    </div>
                    <div className="text-[10px] font-mono tracking-[0.15em] text-[var(--spectral-white)]/30 uppercase">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-[10px] font-mono tracking-[0.2em] text-[var(--spectral-white)]/40 uppercase block mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                    className="w-full bg-transparent border border-[var(--spectral-white)]/[0.08] px-4 py-3 text-sm text-[var(--spectral-white)] placeholder:text-[var(--spectral-white)]/20 focus:border-[var(--signal-lime)]/40 focus:outline-none transition-colors font-mono"
                  />
                </div>
              ))}

              <div>
                <label className="text-[10px] font-mono tracking-[0.2em] text-[var(--spectral-white)]/40 uppercase block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent border border-[var(--spectral-white)]/[0.08] px-4 py-3 text-sm text-[var(--spectral-white)] placeholder:text-[var(--spectral-white)]/20 focus:border-[var(--signal-lime)]/40 focus:outline-none transition-colors font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--signal-lime)] text-[var(--onyx)] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[var(--signal-lime)]/90 transition-all group"
              >
                Send Message
                <Send
                  size={14}
                  className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="border-t border-[var(--spectral-white)]/[0.06] pt-16 pb-10 relative">
        {/* Circuit line decorations */}
        <div className="absolute top-0 left-8 w-[1px] h-16 bg-gradient-to-b from-[var(--signal-lime)]/20 to-transparent" />
        <div className="absolute top-0 right-8 w-[1px] h-16 bg-gradient-to-b from-[var(--signal-lime)]/20 to-transparent" />
        <div className="absolute top-0 left-8 w-24 h-[1px] bg-gradient-to-r from-[var(--signal-lime)]/20 to-transparent" />
        <div className="absolute top-0 right-8 w-24 h-[1px] bg-gradient-to-l from-[var(--signal-lime)]/20 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-16">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center">
                  <span className="text-[var(--onyx)] font-black text-sm">B</span>
                </div>
                <span className="font-mono text-xs tracking-[0.2em] uppercase">
                  Blacklight
                </span>
              </div>
              <p className="text-xs text-[var(--spectral-white)]/30 leading-relaxed max-w-[200px]">
                Revealing the unseen brilliance of South African brands through
                technical precision.
              </p>
            </div>

            {/* Links */}
            {[
              {
                title: "Services",
                links: [
                  { label: "Landing Pages", href: "/services/spark" },
                  { label: "Business Sites", href: "/services/growth" },
                  { label: "E-Commerce", href: "/services/shop" },
                  { label: "Pulse Check", href: "/services" },
                ],
              },
              {
                title: "Company",
                links: [
                  { label: "Portfolio", href: "/portfolio" },
                  { label: "Process", href: "/process" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact", href: "/contact" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--spectral-white)]/60 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-[var(--spectral-white)]/35 hover:text-[var(--signal-lime)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Connect */}
            <div>
              <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--spectral-white)]/60 mb-4">
                Connect
              </h4>
              <div className="flex gap-3 mb-4">
                {[
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Instagram, href: "#" },
                ].map(({ icon: SocialIcon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-8 h-8 border border-[var(--spectral-white)]/[0.08] flex items-center justify-center hover:border-[var(--signal-lime)]/40 hover:text-[var(--signal-lime)] text-[var(--spectral-white)]/40 transition-all"
                  >
                    <SocialIcon size={14} />
                  </a>
                ))}
              </div>
              <a
                href="mailto:hello@blacklight.co.za"
                className="text-xs text-[var(--spectral-white)]/35 hover:text-[var(--signal-lime)] transition-colors flex items-center gap-2"
              >
                <Mail size={12} />
                hello@blacklight.co.za
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[var(--spectral-white)]/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[10px] font-mono text-[var(--spectral-white)]/20 tracking-[0.15em] uppercase">
              © 2026 Blacklight Web Designs. All rights reserved.
            </p>
            <p className="text-[10px] font-mono text-[var(--spectral-white)]/20 tracking-[0.15em] uppercase">
              Designed in South Africa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
