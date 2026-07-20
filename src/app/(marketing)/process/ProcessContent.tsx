"use client";

import { Lightbulb, Search, Code, Rocket, CheckCircle, ArrowRight, Quote, Layers, Move3d, Sparkles } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/marketing/navigation";
import Footer from "@/components/marketing/footer";

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
    description: "A beautiful site that is slow is a failure. We adhere to strict Core Web Vitals standards across every dimension.",
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

export default function ProcessContent() {
  return (
    <div className="min-h-screen bg-bl-deep text-bl-text overflow-x-hidden">
      {/* Isometric grid overlay */}
      <div className="fixed inset-0 iso-grid pointer-events-none z-0" />

      {/* Ambient glow */}
      <div className="fixed top-1/4 right-[10%] w-96 h-96 rounded-full bg-bl-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-[8%] w-64 h-64 rounded-full bg-bl-cyan/4 blur-[80px] pointer-events-none z-0" />

      <Navigation />

      {/* ═══════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative z-10 pt-36 pb-20 px-6 scene-3d">
        <div className="max-w-6xl mx-auto preserve-3d">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-8">
            <Move3d size={14} />
            Our Methodology
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6 gold-glow">
            <span className="block">The</span>
            <span className="gold-gradient">Process</span>
          </h1>

          <p className="text-lg md:text-xl text-bl-text-muted max-w-3xl leading-relaxed">
            How we reveal the unseen brilliance of your brand. A methodical, depth-engineered
            approach to exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         CORE VALUES — 2×2 Grid
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles size={14} />
              Foundation
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Core <span className="gold-gradient">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 scene-3d-near">
            {values.map((value, i) => (
              <div key={value.number} className="tilt-card">
                <div className="spatial-panel p-8 md:p-10 h-full flex flex-col rim-light relative group">
                  <div className="absolute top-4 right-4 text-6xl font-black text-bl-text-muted/10 group-hover:text-bl-gold/20 transition-colors pointer-events-none">
                    {value.number}
                  </div>

                  <h3 className="text-2xl font-bold uppercase mb-4 font-display text-bl-gold">{value.title}</h3>
                  <p className="text-bl-text-muted leading-relaxed flex-1">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         THE METHOD — Step Timeline
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-4">
              <Layers size={14} />
              5 Dimensions
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              The Blacklight <span className="gold-gradient">Method</span>
            </h2>
          </div>

          <div className="space-y-6 scene-3d-near">
            {process.map((step, i) => (
              <div key={step.step} className="tilt-card">
                <div className="spatial-panel p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start rim-light">
                  {/* Step Number */}
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-bl-gold/10 border border-bl-gold/25 flex items-center justify-center">
                    <span className="text-xl font-black text-bl-gold">{step.step}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full relative">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-text-muted text-[10px] font-mono uppercase tracking-wider mb-3">
                      {step.duration}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase mb-3 font-display">{step.title}</h3>
                    <p className="text-bl-text-muted leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         TESTIMONIALS
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-4">
              <Quote size={14} />
              Client Logs
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              What They <span className="gold-gradient">Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 scene-3d-near">
            {testimonials.map((t, i) => (
              <div key={i} className="tilt-card">
                <div className="spatial-panel p-8 md:p-10 rim-light relative">
                  <div className="absolute -top-3 -left-3 w-12 h-12 rounded-2xl bg-bl-gold/15 border border-bl-gold/30 flex items-center justify-center">
                    <Quote size={20} className="text-bl-gold" />
                  </div>

                  <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 mt-4 text-bl-text/90 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="border-t border-bl-glass-border pt-4">
                    <div className="font-bold uppercase tracking-wider text-bl-gold">{t.author}</div>
                    <div className="text-sm text-bl-text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         CTA
         ═══════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="spatial-panel p-10 md:p-16 text-center rim-light spatial-panel-gold relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-bl-gold/8 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-bl-cyan/5 blur-[100px] pointer-events-none" />

            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 gold-glow">
                Engage <span className="gold-gradient">Protocol</span>?
              </h2>
              <p className="text-bl-text-muted text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Ready to initiate your project? Let&apos;s build something that breaks the surface.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-bl-gold text-bl-deep font-bold uppercase tracking-wider rounded-full transition-all hover:bg-bl-amber hover:shadow-[0_0_60px_rgba(181,154,95,0.3)] text-lg"
              >
                Initiate Project
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
