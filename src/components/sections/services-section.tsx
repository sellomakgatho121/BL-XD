"use client";

import ServiceCard from "@/components/blacklight/service-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

const features = {
  spark: [
    "Single-page spatial design",
    "GEO-optimised content",
    "AgentCard schema markup",
    "Mobile-first responsive",
    "48-hour delivery",
  ],
  growth: [
    "Multi-page spatial website",
    "Custom design system",
    "SEO architecture",
    "Blog/content engine",
    "Performance audit included",
  ],
  shop: [
    "Full e-commerce platform",
    "Payment gateway integration",
    "Product catalogue CMS",
    "Order management system",
    "Analytics dashboard",
  ],
};

export default function ServicesSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden section-divider">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-bl-gold/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal y={20} threshold={0.2}>
          <div className="text-center mb-20">
            <span className="text-bl-gold text-xs tracking-[0.2em] uppercase mb-4 block">
              Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-bl-text mb-4">
              Precision <span className="text-gradient-gold">Tiers</span>
            </h2>
            <p className="text-bl-text-muted max-w-xl mx-auto">
              From rapid MVPs to fully orchestrated platforms \u2014 each tier
              engineered for speed, scale, and spatial excellence.
            </p>
          </div>
        </ScrollReveal>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {(["spark", "growth", "shop"] as const).map((tier, i) => (
            <ScrollReveal
              key={tier}
              y={30}
              delay={0.2 + i * 0.15}
              threshold={0.15}
            >
              <ServiceCard
                tier={tier}
                title={tier.charAt(0).toUpperCase() + tier.slice(1)}
                price={tier === "spark" ? "R3,500" : tier === "growth" ? "R8,500" : "R18,500"}
                description={
                  tier === "spark"
                    ? "High-impact landing page for new ventures"
                    : tier === "growth"
                    ? "Professional multi-page business presence"
                    : "Full e-commerce experience with integrated systems"
                }
                features={features[tier]}
                href={`/services/${tier}`}
                featured={tier === "growth"}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal y={20} delay={0.6} threshold={0.2}>
          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-bl-gold/20 text-bl-gold text-sm hover:bg-bl-gold/5 transition-all group"
            >
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
