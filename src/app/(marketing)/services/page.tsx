"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, ShoppingBag, Stethoscope, Sparkles } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Zap,
    tier: "SPARK",
    title: "Landing Page",
    price: "R3,500",
    color: "#D7FF00",
    href: "/services/spark",
    description: "High-impact single-page site for entrepreneurs. 48-hour delivery.",
    features: ["Asymmetric design", "Mobile-first", "Lighthouse 95+", "48h delivery"],
  },
  {
    icon: TrendingUp,
    tier: "GROWTH",
    title: "Business Site",
    price: "R8,500",
    color: "#00CCFF",
    href: "/services/growth",
    description: "3-5 page professional presence for established SMEs.",
    features: ["Custom design system", "SEO foundation", "Lead capture", "1 week delivery"],
  },
  {
    icon: ShoppingBag,
    tier: "SHOP",
    title: "E-Commerce",
    price: "R18,500",
    color: "#FF003C",
    href: "/services/shop",
    description: "Secure online store with Payfast/Yoco integration.",
    features: ["50 products", "Secure checkout", "Auto delivery", "Analytics"],
  },
  {
    icon: Stethoscope,
    tier: "DIAGNOSTIC",
    title: "Pulse Check",
    price: "R1,500",
    color: "#FF8800",
    href: "/contact",
    description: "Quick audit and 3 'Quick-Win' fixes for existing sites.",
    features: ["Performance audit", "UX evaluation", "3 Quick-Wins", "Technical report"],
  },
];

const maintenance = {
  icon: Sparkles,
  title: "The Steady Glow Plan",
  price: "R750/month",
  description: "Hassle-free management for busy business owners.",
  features: ["Hosting included", "Monthly security updates", "Email support", "Performance monitoring"],
};

export default function ServicesPage() {
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
              <Link href="/portfolio" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Portfolio</Link>
              <Link href="/contact" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-[var(--signal-lime)]/50 px-3 py-1 font-mono text-xs text-[var(--signal-lime)] mb-6"
          >
            THE SPECTRUM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6"
          >
            <GlitchText text="SERVICE TIERS" intensity="medium" triggerOnHover />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[var(--spectral-dim)] max-w-2xl mx-auto mb-16"
          >
            From quick diagnostics to full e-commerce solutions. Every tier delivers uncompromising quality and performance.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={service.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={service.href}>
                  <div
                    className="group border border-[var(--border)] bg-[var(--card)] p-8 hover:border-[var(--signal-lime)]/50 transition-all duration-300 text-left h-full"
                  >
                    <div
                      className="h-1 w-full mb-6"
                      style={{ backgroundColor: service.color }}
                    />
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <service.icon className="w-6 h-6" style={{ color: service.color }} />
                        <span
                          className="font-mono text-xs uppercase tracking-widest"
                          style={{ color: service.color }}
                        >
                          {service.tier}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-[var(--spectral-white)]">
                        {service.price}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-[var(--spectral-dim)] mb-6">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs font-mono px-2 py-1 border border-[var(--border)] text-[var(--spectral-dim)]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-mono" style={{ color: service.color }}>
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-[var(--border)] bg-[var(--card)] p-8 text-center"
          >
            <maintenance.icon className="w-12 h-12 text-[var(--signal-lime)] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">{maintenance.title}</h2>
            <p className="text-[var(--spectral-dim)] mb-4">{maintenance.description}</p>
            <div className="text-3xl font-bold text-[var(--signal-lime)] mb-6">{maintenance.price}</div>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {maintenance.features.map((feature) => (
                <span
                  key={feature}
                  className="text-xs font-mono px-3 py-1 border border-[var(--signal-lime)]/30 text-[var(--signal-lime)]"
                >
                  {feature}
                </span>
              ))}
            </div>
            <Button
              className="bg-[var(--signal-lime)]/10 text-[var(--signal-lime)] hover:bg-[var(--signal-lime)]/20 font-mono uppercase tracking-wider rounded-none"
            >
              Get Maintenance Plan
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black tracking-tighter mb-6">
              Not sure which <span className="text-[var(--signal-lime)]">tier</span>?
            </h2>
            <p className="text-lg text-[var(--spectral-dim)] mb-8 max-w-xl mx-auto">
              Book a free 15-minute consultation. We&apos;ll analyze your needs and recommend the perfect fit.
            </p>
            <Button
              size="lg"
              className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
