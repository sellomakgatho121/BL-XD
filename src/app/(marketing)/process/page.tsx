"use client";

import { motion } from "framer-motion";
import { Lightbulb, Search, Code, Rocket, CheckCircle, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";

const values = [
  {
    number: "01",
    title: "Radical Originality",
    description: "We explicitly reject the Modern SaaS Safe Harbor. No Bento grids, no mesh gradients, no Safe Blue. Every project is custom-crafted.",
  },
  {
    number: "02",
    title: "Socratic Discovery",
    description: "80% of design is decided by constraints and deep understanding. We never code until the Soul of the project is identified.",
  },
  {
    number: "03",
    title: "Performance as Feature",
    description: "A beautiful site that is slow is a failure. We adhere to strict 2025 Core Web Vitals standards.",
  },
  {
    number: "04",
    title: "Psychological Precision",
    description: "Every color maps to an emotion. Every layout is informed by cognitive load and UX psychology.",
  },
];

const process = [
  {
    icon: Search,
    step: "01",
    title: "Constraints Analysis",
    description: "Deep discovery into your business, audience, and goals. Understanding the problem before designing solutions.",
    duration: "Week 1",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Soul Identification",
    description: "Defining the core essence of your brand. What makes you unique and how do we amplify it?",
    duration: "Week 1-2",
  },
  {
    icon: Code,
    step: "03",
    title: "Technical Architecture",
    description: "Choosing the right stack, planning the information architecture, and wireframing key interactions.",
    duration: "Week 2",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Radical Implementation",
    description: "Hand-coded excellence. Custom animations, performance optimization, and pixel-perfect execution.",
    duration: "Week 3-4",
  },
  {
    icon: CheckCircle,
    step: "05",
    title: "Performance Verification",
    description: "Lighthouse audits, accessibility testing, cross-browser validation, and launch preparation.",
    duration: "Week 4",
  },
];

const testimonials = [
  {
    quote: "Blacklight didn't just build us a website. They revealed our brand's true potential. The performance scores speak for themselves.",
    author: "Sarah Chen",
    role: "CEO, Kinetic Coffee",
  },
  {
    quote: "48 hours from brief to live. I've never seen anything like it. And the quality? Uncompromising.",
    author: "Michael Torres",
    role: "Founder, TechFlow SA",
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative">
      <GrainOverlay opacity={0.03} />
      <Scanlines />

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
              <Link href="/portfolio" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Portfolio</Link>
              <Link href="/contact" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
              <GlitchText text="THE PROCESS" intensity="medium" triggerOnHover />
            </h1>
            <p className="text-xl text-[var(--spectral-dim)] max-w-2xl mx-auto">
              How we reveal the unseen brilliance of your brand. A methodical approach to exceptional digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">Core Values</h2>
            <p className="text-3xl font-bold">What Drives Us</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-[var(--border)] bg-[var(--card)] p-8"
              >
                <div className="flex items-start gap-6">
                  <span className="text-4xl font-black text-[var(--signal-lime)]/30">{value.number}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-[var(--spectral-dim)]">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">How We Work</h2>
            <p className="text-3xl font-bold">The Blacklight Method</p>
          </motion.div>

          <div className="space-y-8">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 border-l-2 border-[var(--border)] pl-8 hover:border-[var(--signal-lime)] transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 border border-[var(--signal-lime)]/50 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-[var(--signal-lime)]" />
                  </div>
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-mono text-sm text-[var(--signal-lime)]">{step.step}</span>
                    <span className="font-mono text-xs text-[var(--spectral-muted)] px-2 py-1 border border-[var(--border)]">{step.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-[var(--spectral-dim)]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">Testimonials</h2>
            <p className="text-3xl font-bold">What Clients Say</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-[var(--border)] bg-[var(--card)] p-8"
              >
                <Quote className="w-8 h-8 text-[var(--signal-lime)] mb-4" />
                <p className="text-[var(--spectral-dim)] mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-bold">{t.author}</div>
                  <div className="text-sm text-[var(--spectral-muted)]">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black tracking-tighter mb-6">
              Ready to start your <span className="text-[var(--signal-lime)]">journey</span>?
            </h2>
            <Button size="lg" className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group">
              Start Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
