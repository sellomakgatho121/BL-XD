"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

export default function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Glow dividers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-bl-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-bl-gold/20 to-transparent" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal y={0} scale={0.95} threshold={0.2}>
          <div className="glass-panel-strong rounded-3xl p-12 md:p-20">
            <span className="text-bl-gold text-xs tracking-[0.2em] uppercase mb-4 block">
              Ready to Launch
            </span>
            <h2 className="text-3xl md:text-6xl font-bold text-bl-text mb-6 leading-tight">
              Let&apos;s Engineer Your
              <br />
              <span className="text-gradient-gold">Digital Presence</span>
            </h2>
            <p className="text-bl-text-muted max-w-lg mx-auto mb-10 text-sm md:text-base">
              Book a free diagnostic session. We&apos;ll audit your current
              presence and map out a spatial strategy tailored to your brand.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bl-gold text-bl-deep font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(181,154,95,0.3)]"
              >
                Book Free Diagnostic
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-bl-text text-sm hover:bg-white/5 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
