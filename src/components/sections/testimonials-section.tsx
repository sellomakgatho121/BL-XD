"use client";

import { Star } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

const testimonials = [
  {
    quote:
      "Our site went from concept to launch in under 48 hours. The spatial design completely changed how our clients perceive us.",
    author: "Thabo M.",
    role: "Founder, TechVentures SA",
    rating: 5,
  },
  {
    quote:
      "The AI-powered content studio alone saved us dozens of hours per month. Blacklight doesn't just build websites \u2014 they build engines.",
    author: "Sarah K.",
    role: "CEO, Luminate Media",
    rating: 5,
  },
  {
    quote:
      "From GEO optimisation to 3D product showcases, every detail was engineered for performance. Our conversion rate doubled.",
    author: "James R.",
    role: "Director, Origin Commerce",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bl-deep via-bl-surface/30 to-bl-deep pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal y={20} threshold={0.2}>
          <div className="text-center mb-16">
            <span className="text-bl-gold text-xs tracking-[0.2em] uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-bl-text mb-4">
              Trusted by <span className="text-gradient-gold">Innovators</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal
              key={i}
              y={30}
              scale={0.95}
              delay={0.2 + i * 0.15}
              threshold={0.15}
            >
              <div className="glass-panel rounded-2xl p-8 flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-bl-gold text-bl-gold"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-bl-text/80 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="border-t border-white/5 pt-4">
                  <div className="font-semibold text-bl-text text-sm">
                    {t.author}
                  </div>
                  <div className="text-bl-text-muted text-xs">{t.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
