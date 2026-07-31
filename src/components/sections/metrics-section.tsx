"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/scroll-reveal";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "48", suffix: "h", label: "Average turnaround" },
  { value: "50+", suffix: "", label: "Projects delivered" },
  { value: "99.9", suffix: "%", label: "Uptime guarantee" },
  { value: "12+", suffix: "", label: "Years combined expertise" },
];

function CountUpMetric({
  value,
  suffix,
  label,
  delay,
}: {
  value: string;
  suffix: string;
  label: string;
  delay: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    const parent = containerRef.current;
    if (!el || !parent) return;

    const numEl: HTMLSpanElement = el;

    // Parse the numeric part from the value string
    const numMatch = value.match(/^([\d.]+)/);
    if (!numMatch) return;
    const target = parseFloat(numMatch[1]);
    const isDecimal = numMatch[1].includes(".");
    const prefix = value.replace(/^[\d.]+/, ""); // trailing "+" or other non-numeric chars

    const trigger = ScrollTrigger.create({
      trigger: parent,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const duration = 2000;

        function animate(startTime: number) {
          return function step(time: number) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic: custom cubic-bezier(0.65, 0.05, 0, 1) style
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            numEl.textContent = isDecimal
              ? current.toFixed(1) + prefix
              : Math.floor(current).toString() + prefix;

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
        }

        setTimeout(
          () => requestAnimationFrame(animate(performance.now())),
          delay * 1000
        );
      },
    });

    return () => trigger.kill();
  }, [value, suffix, delay]);

  return (
    <div ref={containerRef} className="text-center">
      <div className="text-3xl md:text-5xl font-bold text-bl-gold mb-1">
        <span ref={numRef}>{value}</span>
        {suffix && (
          <span className="text-xl md:text-2xl text-bl-gold/60">
            {suffix}
          </span>
        )}
      </div>
      <div className="text-xs md:text-sm text-bl-text-muted tracking-wide">
        {label}
      </div>
    </div>
  );
}

export default function MetricsSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Divider glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-bl-gold/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <ScrollReveal y={20} threshold={0.3} scale={0.98}>
          <div className="glass-panel-gold rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
              {metrics.map((m, i) => (
                <CountUpMetric
                  key={m.label}
                  value={m.value}
                  suffix={m.suffix}
                  label={m.label}
                  delay={0.2 + i * 0.15}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
