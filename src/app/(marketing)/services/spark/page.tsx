"use client";

import {
  Zap,
  Clock,
  Gauge,
  Smartphone,
  Palette,
  Code,
  Check,
  ArrowRight,
  ArrowLeft,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Clock,
    title: "48-Hour Delivery",
    description: "From brief to live site in just two business days. Perfect for time-sensitive launches.",
  },
  {
    icon: Gauge,
    title: "Lighthouse 95+",
    description: "Performance isn't an afterthought. Every site scores 95+ on Google's Lighthouse audit.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    description: "Designed for the device in your pocket first, then scaled up to desktop elegance.",
  },
  {
    icon: Palette,
    title: "Asymmetric Design",
    description: "We reject templates. Every is custom-crafted for your brand's unique identity.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Hand-coded excellence. No bloated page builders. Fast, maintainable, scalable.",
  },
];

const deliverables = [
  "Custom single-page design",
  "Mobile & desktop responsive",
  "Contact/lead capture form",
  "Social media integration",
  "Basic SEO setup",
  "Performance optimization",
  "48-hour turnaround",
  "30 days support",
];

const process = [
  { step: "01", title: "Brief", desc: "15-minute discovery call to understand your brand" },
  { step: "02", title: "Design", desc: "We craft your unique asymmetric layout" },
  { step: "03", title: "Build", desc: "Hand-coded with obsessive attention to detail" },
  { step: "04", title: "Launch", desc: "Go live with confidence and support" },
];

export default function SparkTierPage() {
  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative">
      <GrainOverlay opacity={0.03} />
      <Scanlines />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--onyx)]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center">
                <span className="text-[var(--onyx)] font-bold text-lg">B</span>
              </div>
              <span className="font-mono text-sm tracking-wider uppercase hidden sm:block">
                Blacklight
              </span>
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Services
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 border border-[var(--signal-lime)]/50 bg-[var(--signal-lime-dim)] px-3 py-1 font-mono text-xs text-[var(--signal-lime)] mb-6"
              >
                <Terminal size={14} />
                SPARK TIER
              </div>

              <h1
                className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
              >
                <GlitchText text="LANDING PAGE" intensity="medium" triggerOnHover />
              </h1>

              <p
                className="text-xl text-[var(--spectral-dim)] mb-8 leading-relaxed"
              >
                High-impact, single-page site for new ventures and personal brands. Perfect for entrepreneurs building their first digital presence.
              </p>

              <div
                className="flex items-baseline gap-4 mb-8"
              >
                <span className="text-5xl font-bold text-[var(--signal-lime)]">R3,500</span>
                <span className="text-[var(--spectral-muted)]">From</span>
              </div>

              <div
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none group"
                >
                  Start Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[var(--spectral-muted)] text-[var(--spectral-white)] hover:bg-[var(--spectral-muted)]/10 rounded-none font-mono uppercase tracking-wider"
                  asChild
                >
                  <Link href="/portfolio">View Examples</Link>
                </Button>
              </div>
            </div>

            {/* Visual */}
            <div
              className="relative"
            >
              <div className="border border-[var(--border)] bg-[var(--card)] p-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--signal-lime)]" />
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--signal-lime)]/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-[var(--signal-lime)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[var(--spectral-muted)]">Turnaround</div>
                      <div className="text-2xl font-bold">48 Hours</div>
                    </div>
                  </div>
                  <div className="h-px bg-[var(--border)]" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--signal-lime)]/10 flex items-center justify-center">
                      <Gauge className="w-6 h-6 text-[var(--signal-lime)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[var(--spectral-muted)]">Performance</div>
                      <div className="text-2xl font-bold text-[var(--signal-lime)]">95+ Score</div>
                    </div>
                  </div>
                  <div className="h-px bg-[var(--border)]" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--signal-lime)]/10 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-[var(--signal-lime)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[var(--spectral-muted)]">Responsive</div>
                      <div className="text-2xl font-bold">100%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
              What You Get
            </h2>
            <p className="text-3xl font-bold">Built for Speed & Impact</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--signal-lime)]/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-[var(--signal-lime)] mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--spectral-dim)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--signal-lime)] mb-4">
                The Process
              </h2>
              <p className="text-3xl font-bold mb-8">Four Steps to Live</p>

              <div className="space-y-6">
                {process.map((step, i) => (
                  <div
                    key={step.step}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 border border-[var(--signal-lime)]/50 flex items-center justify-center font-mono text-[var(--signal-lime)]">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{step.title}</h4>
                      <p className="text-sm text-[var(--spectral-dim)]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="border border-[var(--border)] bg-[var(--card)] p-8"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--signal-lime)]" />
                Deliverables
              </h3>
              <ul className="space-y-3">
                {deliverables.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-[var(--spectral-dim)]"
                  >
                    <div className="w-1.5 h-1.5 bg-[var(--signal-lime)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Spark vs Others</h2>
          <div className="border border-[var(--border)] overflow-hidden">
            <div className="grid grid-cols-3 bg-[var(--card)]">
              <div className="p-4 font-mono text-sm text-[var(--spectral-muted)]">Feature</div>
              <div className="p-4 font-mono text-sm text-[var(--signal-lime)] border-l border-[var(--border)]">
                Spark (R3,500)
              </div>
              <div className="p-4 font-mono text-sm text-[var(--spectral-muted)] border-l border-[var(--border)]">
                Typical Agency (R8,000+)
              </div>
            </div>
            {[
              ["Delivery Time", "48 hours", "2-4 weeks"],
              ["Performance Score", "95+", "60-70"],
              ["Custom Design", "Yes", "Template"],
              ["Code Quality", "Hand-coded", "Page builder"],
              ["Support", "30 days", "7 days"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-t border-[var(--border)]">
                <div className="p-4 text-sm">{row[0]}</div>
                <div className="p-4 text-sm text-[var(--signal-lime)] border-l border-[var(--border)] font-medium">
                  {row[1]}
                </div>
                <div className="p-4 text-sm text-[var(--spectral-dim)] border-l border-[var(--border)]">
                  {row[2]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
          >
            <h2 className="text-4xl font-black tracking-tighter mb-6">
              Ready to launch in <span className="text-[var(--signal-lime)]">48 hours</span>?
            </h2>
            <p className="text-lg text-[var(--spectral-dim)] mb-8 max-w-xl mx-auto">
              Book your brief call now. We&apos;ll have your high-performance landing page live within two business days.
            </p>
            <Button
              size="lg"
              className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group"
            >
              Book Spark Tier
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
