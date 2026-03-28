"use client";

import { motion } from "framer-motion";
import { Lightbulb, Code, Zap, Target, Globe, Award, Users, MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Lightbulb,
    title: "Radical Originality",
    description: "We explicitly reject the Modern SaaS Safe Harbor. No Bento grids, no generic templates. Every project is custom-crafted to your unique brand essence."
  },
  {
    icon: Target,
    title: "Performance Obsessed",
    description: "A beautiful site that loads slowly is a failure. We obsess over Lighthouse scores because fast sites rank better and convert higher."
  },
  {
    icon: Globe,
    title: "Local Expertise",
    description: "Built for South African conditions. We understand data costs, local payments, intermittent connectivity, and the SA market."
  },
  {
    icon: Zap,
    title: "Ship Fast",
    description: "Sprint-based delivery. You see results in weeks, not months. No endless revisions or scope creep."
  }
];

const timeline = [
  { year: "2020", title: "The Beginning", description: "Founded in Johannesburg with a vision to disrupt the template-first agency model." },
  { year: "2021", title: "Going National", description: "Expanded to serve clients across all 9 provinces. Built our first AI-powered features." },
  { year: "2022", title: "Agentic AI Launch", description: "Launched our AI services division. Introduced WhatsApp storefronts and automation." },
  { year: "2023", title: "Silicon Workforce", description: "Released multi-agent systems for enterprise clients. 70+ automated workflows deployed." },
  { year: "2024", title: "Recognition", description: "Featured in major SA tech publications. Client roster grew to 50+ active projects." },
  { year: "2025", title: "The Future", description: "Full agentic AI suite. Expanding into video content automation and liquid UI apps." }
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "9", label: "Provinces Served" },
  { value: "98", label: "Lighthouse Score Avg" },
  { value: "70%", label: "Repeat Clients" }
];

export default function AboutContent() {
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
              <GlitchText text="ABOUT US" intensity="medium" triggerOnHover={true} />
            </h1>
            <p className="text-xl text-[var(--spectral-dim)] max-w-2xl mx-auto">
              We're not your typical web agency. We build digital experiences that make people stop and stare.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-[var(--signal-lime)] mb-2">{stat.value}</div>
                <div className="text-sm text-[var(--spectral-muted)] font-mono uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-6">
              Our Story
            </h2>
            <div className="prose prose-invert prose-lg">
              <p className="text-[var(--spectral-dim)] mb-6">
                Blacklight was born from frustration. We watched South African businesses pay premium prices for 
                generic, template-based websites that looked identical to their competitors.
              </p>
              <p className="text-[var(--spectral-dim)] mb-6">
                We believed there had to be a better way. Instead of recycling the same layouts with different colors, 
                we started building from first principles. Every project begins with deep discovery into what makes 
                your business unique.
              </p>
              <p className="text-[var(--spectral-dim)] mb-6">
                Today, we're pushing the boundaries of what's possible on the web. From custom 3D experiences 
                to AI-powered automation, we're helping South African businesses stand out in a crowded digital landscape.
              </p>
              <p className="text-[var(--spectral-white)] font-medium">
                We don't just build websites. We build digital competitive advantages.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--spectral-muted)] mb-4">
              What We Believe
            </h2>
            <p className="text-3xl md:text-4xl font-black tracking-tight text-[var(--spectral-white)]">
              Our Values
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-[var(--border)] bg-[var(--card)]/30"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--signal-lime)]/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[var(--signal-lime)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--spectral-white)] mb-2">{value.title}</h3>
                <p className="text-sm text-[var(--spectral-dim)] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 border-y border-[var(--border)] bg-[var(--card)]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--spectral-muted)] mb-4">
              Our Journey
            </h2>
            <p className="text-3xl md:text-4xl font-black tracking-tight text-[var(--spectral-white)]">
              How We Got Here
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)]" />
            
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="pl-12 md:pl-0">
                    <span className="inline-block px-3 py-1 bg-[var(--signal-lime)]/10 text-[var(--signal-lime)] text-sm font-mono mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--spectral-white)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--spectral-dim)]">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--signal-lime)] rounded-full" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--spectral-white)] mb-6">
              Want to work with us?
            </h2>
            <p className="text-lg text-[var(--spectral-dim)] mb-8 max-w-xl mx-auto">
              We're always looking for interesting projects and ambitious clients. Let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group"
                asChild
              >
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[var(--border)] text-[var(--spectral-white)] hover:bg-[var(--card)] font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6"
                asChild
              >
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
