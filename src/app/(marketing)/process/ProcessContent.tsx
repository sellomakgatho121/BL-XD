"use client";

import { Lightbulb, Search, Code, Rocket, CheckCircle, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
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

export default function ProcessContent() {
  return (
    <div className="min-h-screen bg-[var(--neo-yellow)] text-[var(--neo-black)] font-space-grotesk overflow-x-hidden selection:bg-[var(--neo-black)] selection:text-[var(--neo-white)]">

      {/* ━━━ Header Navigation ━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-[var(--neo-black)] bg-[var(--neo-white)] text-[var(--neo-black)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--neo-black)] flex items-center justify-center border-2 border-[var(--neo-black)] group-hover:bg-[var(--neo-pink)] transition-colors">
              <span className="font-black text-xl text-[var(--neo-white)]">B</span>
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Blacklight</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="font-bold uppercase tracking-widest hover:text-[var(--neo-blue)] transition-colors p-2">Services</Link>
            <Link href="/portfolio" className="hidden sm:block font-bold uppercase tracking-widest hover:text-[var(--neo-green)] transition-colors p-2">Portfolio</Link>
          </div>
        </div>
      </nav>

      {/* ━━━ Hero Section ━━━ */}
      <section className="pt-32 pb-16 px-4 md:min-h-[60vh] flex items-center bg-[var(--neo-white)] border-b-8 border-[var(--neo-black)]">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter mb-8 leading-[0.8] text-[var(--neo-black)]">
            <GlitchText text="THE PROCESS" intensity="low" triggerOnHover />
          </h1>
          <p className="text-2xl md:text-3xl font-bold max-w-4xl border-l-8 border-[var(--neo-pink)] pl-6 py-2 bg-[var(--neo-white)]">
            How we reveal the unseen brilliance of your brand. A methodical, brutalist approach to exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* ━━━ Core Values ━━━ */}
      <section className="py-24 px-4 bg-[var(--neo-black)] text-[var(--neo-white)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter bg-[var(--neo-pink)] text-[var(--neo-black)] inline-block px-4 py-2 border-4 border-[var(--neo-black)] shadow-[8px_8px_0px_var(--neo-white)] -rotate-1">
              Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pl-0 md:pl-12">
            {values.map((value, i) => (
              <div
                key={value.number}
                className="border-8 border-[var(--neo-white)] bg-[var(--neo-black)] p-8 relative hover:-translate-y-2 transition-transform group"
              >
                <div className="absolute top-4 right-4 text-6xl font-black text-transparent text-stroke-2 text-stroke-[var(--neo-white)] opacity-30 group-hover:opacity-100 transition-opacity">
                  {value.number}
                </div>
                <h3 className="text-3xl font-black uppercase mb-4 text-[var(--neo-yellow)] group-hover:text-[var(--neo-pink)] transition-colors max-w-[80%]">
                  {value.title}
                </h3>
                <p className="text-xl font-bold opacity-90 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ The Method ━━━ */}
      <section className="py-24 px-4 bg-[var(--neo-white)] border-b-8 border-[var(--neo-black)] relative overflow-hidden">

        <div className="absolute right-[-10vw] top-[20%] text-[30vw] font-black text-[var(--neo-black)] opacity-5 pointer-events-none rotate-90 leading-none">
          SYSTEM
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[var(--neo-black)]">
              The Blacklight Method
            </h2>
          </div>

          <div className="space-y-12">
            {process.map((step, i) => (
              <div
                key={step.step}
                className="flex flex-col md:flex-row gap-6 md:gap-12 items-start border-4 border-[var(--neo-black)] bg-[var(--neo-yellow)] p-6 md:p-8 relative hover:-translate-x-2 transition-transform shadow-[10px_10px_0px_var(--neo-black)] group"
              >
                <div className="flex-shrink-0 bg-[var(--neo-black)] text-[var(--neo-white)] w-24 h-24 flex flex-col items-center justify-center border-4 border-[var(--neo-white)] group-hover:bg-[var(--neo-pink)] group-hover:text-[var(--neo-black)] transition-colors">
                  <div className="text-2xl font-black">{step.step}</div>
                </div>

                <div className="flex-1 w-full relative">
                  <div className="absolute top-0 right-0 bg-[var(--neo-white)] text-[var(--neo-black)] font-bold px-3 py-1 border-2 border-[var(--neo-black)] text-sm uppercase">
                    {step.duration}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 pr-24">{step.title}</h3>
                  <p className="text-xl font-bold opacity-90 max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Testimonials ━━━ */}
      <section className="py-24 px-4 bg-[var(--neo-blue)] text-[var(--neo-white)] border-b-8 border-[var(--neo-black)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-[5px_5px_0px_var(--neo-black)]">
              Client Logs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="border-4 border-[var(--neo-black)] bg-[var(--neo-white)] text-[var(--neo-black)] p-8 md:p-12 relative shadow-[12px_12px_0px_var(--neo-black)] rotate-1 hover:-rotate-1 transition-transform cursor-pointer"
              >
                <div className="absolute -top-6 left-8 bg-[var(--neo-green)] border-4 border-[var(--neo-black)] p-2">
                  <Quote className="w-8 h-8 text-[var(--neo-black)]" />
                </div>
                <p className="text-2xl md:text-3xl font-black mb-8 italic leading-tight mt-6 uppercase">
                  "{t.quote}"
                </p>
                <div className="border-t-4 border-[var(--neo-black)] pt-4">
                  <div className="font-black text-xl uppercase">{t.author}</div>
                  <div className="font-bold text-[var(--neo-blue)] uppercase">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="py-32 px-4 bg-[var(--neo-green)] text-[var(--neo-black)] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-none border-[var(--neo-black)]">
            Engage Protocol?
          </h2>
          <Button size="lg" className="bg-[var(--neo-black)] text-[var(--neo-white)] text-2xl md:text-4xl font-black uppercase px-12 py-8 border-4 border-[var(--neo-white)] shadow-[12px_12px_0px_var(--neo-black)] hover:bg-[var(--neo-pink)] hover:text-[var(--neo-black)] transition-colors active:translate-y-2 active:translate-x-2 active:shadow-none" asChild>
            <Link href="/contact">
              Initiate Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
