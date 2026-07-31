"use client";

import { ArrowRight, Lightbulb, Palette, Code2, Rocket } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/scroll-reveal";

const steps = [
  {
    icon: Lightbulb,
    title: "Discovery",
    subtitle: "Vision \u2192 Blueprint",
    description:
      "We map your brand, audience, and goals \u2014 then architect a spatial strategy that sets you apart.",
    color: "#CCFF00",
  },
  {
    icon: Palette,
    title: "Design",
    subtitle: "Blueprint \u2192 Canvas",
    description:
      "Custom design system with spatial UX, 3D visuals, and motion that tells your story.",
    color: "#00F0FF",
  },
  {
    icon: Code2,
    title: "Engineer",
    subtitle: "Canvas \u2192 Engine",
    description:
      "Performance-optimized Next.js build with AI integration, GEO markup, and rigorous testing.",
    color: "#FF006E",
  },
  {
    icon: Rocket,
    title: "Launch",
    subtitle: "Engine \u2192 Orbit",
    description:
      "Deploy with CI/CD, monitor with real-time observability, and iterate with data-driven insights.",
    color: "#D7FF00",
  },
];

export default function MethodSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bl-deep via-bl-surface/50 to-bl-deep pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal y={20} threshold={0.2}>
          <div className="text-center mb-20">
            <span className="text-bl-gold text-xs tracking-[0.2em] uppercase mb-4 block">
              Methodology
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-bl-text mb-4">
              From Concept to <span className="text-gradient-gold">Orbit</span>
            </h2>
            <p className="text-bl-text-muted max-w-xl mx-auto">
              A proven four-phase process that transforms your vision into a
              spatial digital experience.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-bl-gold/30 via-bl-gold/10 to-transparent -translate-x-1/2" />

          <div className="space-y-24 md:space-y-32">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <ScrollReveal
                  key={step.title}
                  y={40}
                  delay={0.2 + i * 0.2}
                  threshold={0.2}
                >
                  <div
                    className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Number */}
                    <div className="hidden md:flex w-12 h-12 rounded-full items-center justify-center border border-bl-gold/20 bg-bl-deep shrink-0 relative z-10">
                      <span
                        className="text-lg font-bold"
                        style={{ color: step.color }}
                      >
                        0{i + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 ${
                        isLeft ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div className="glass-panel rounded-2xl p-8 md:p-10 max-w-lg">
                        <step.icon
                          className="w-6 h-6 mb-4"
                          style={{ color: step.color }}
                        />
                        <span
                          className="text-xs tracking-[0.15em] uppercase mb-1 block"
                          style={{ color: step.color }}
                        >
                          {step.subtitle}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-bl-text mb-3">
                          {step.title}
                        </h3>
                        <p className="text-bl-text-muted text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal y={20} delay={1.0} threshold={0.2}>
          <div className="text-center mt-20">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-bl-gold/20 text-bl-gold text-sm hover:bg-bl-gold/5 transition-all group"
            >
              Explore Our Process
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
