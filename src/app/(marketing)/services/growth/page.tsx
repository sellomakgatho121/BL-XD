"use client";

import {
  TrendingUp,
  Layout,
  Search,
  MousePointer,
  BarChart,
  ArrowRight,
  Check,
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
    icon: Layout,
    title: "Custom Design System",
    description: "Bespoke UI components tailored to your brand. No templates, no shortcuts.",
  },
  {
    icon: Search,
    title: "SEO Foundation",
    description: "Technical SEO setup from day one. Structured data, meta tags, sitemap optimization.",
  },
  {
    icon: MousePointer,
    title: "Lead Capture",
    description: "Optimized forms and CTAs designed to convert visitors into qualified leads.",
  },
  {
    icon: BarChart,
    title: "Performance Profiling",
    description: "Lighthouse 90+ guaranteed. We profile and optimize every interaction.",
  },
  {
    icon: TrendingUp,
    title: "Growth Ready",
    description: "Scalable architecture that grows with your business. Add pages, features, integrations.",
  },
];

const deliverables = [
  "3-5 custom designed pages",
  "Responsive all devices",
  "Contact & quote forms",
  "SEO foundation setup",
  "Google Analytics integration",
  "Performance optimization",
  "1 week delivery",
  "60 days support",
  "Content management guide",
];

const pages = [
  { name: "Home", desc: "Hero, services, testimonials, CTA" },
  { name: "About", desc: "Story, team, values, process" },
  { name: "Services", desc: "Detailed service offerings" },
  { name: "Contact", desc: "Form, map, social links" },
  { name: "Blog", desc: "Content marketing ready" },
];

export default function GrowthTierPage() {
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
            <Link href="/services" className="flex items-center gap-2 text-sm text-[var(--spectral-dim)] hover:text-[#00CCFF] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All Services
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div}}}
                className="inline-flex items-center gap-2 border border-[#00CCFF]/50 bg-[#00CCFF]/10 px-3 py-1 font-mono text-xs text-[#00CCFF] mb-6"
              >
                <Terminal size={14} />
                GROWTH TIER
              </div>

              <h1}}}
                className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
              >
                <GlitchText text="BUSINESS SITE" intensity="medium" triggerOnHover />
              </h1>

              <p}}}
                className="text-xl text-[var(--spectral-dim)] mb-8 leading-relaxed"
              >
                A professional 3-5 page presence for established SMEs. Custom design system with SEO foundation and lead capture.
              </p>

              <div}}}
                className="flex items-baseline gap-4 mb-8"
              >
                <span className="text-5xl font-bold text-[#00CCFF]">R8,500</span>
                <span className="text-[var(--spectral-muted)]">From</span>
              </div>

              <div}}}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[#00CCFF] text-[var(--onyx)] hover:bg-[#00CCFF]/90 font-mono uppercase tracking-wider rounded-none group"
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

            <div}}}
              className="border border-[var(--border)] bg-[var(--card)] p-8 relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00CCFF]" />
              <h3 className="font-mono text-sm uppercase tracking-wider text-[var(--spectral-muted)] mb-4">Included Pages</h3>
              <div className="space-y-4">
                {pages.map((page) => (
                  <div key={page.name} className="flex items-center justify-between">
                    <span className="font-bold">{page.name}</span>
                    <span className="text-sm text-[var(--spectral-dim)]">{page.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div}}} className="text-center mb-16">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00CCFF] mb-4">What You Get</h2>
            <p className="text-3xl font-bold">Built for Growth</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}}}}}
                className="group border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[#00CCFF]/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-[#00CCFF] mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--spectral-dim)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div}}}
            className="border border-[var(--border)] bg-[var(--card)] p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Check className="w-5 h-5 text-[#00CCFF]" />
              Complete Deliverables
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item, i) => (
                <div
                  key={item}}}}}
                  className="flex items-center gap-3 text-sm text-[var(--spectral-dim)]"
                >
                  <div className="w-1.5 h-1.5 bg-[#00CCFF]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div}}}>
            <h2 className="text-4xl font-black tracking-tighter mb-6">
              Ready to <span className="text-[#00CCFF]">grow</span>?
            </h2>
            <Button size="lg" className="bg-[#00CCFF] text-[var(--onyx)] hover:bg-[#00CCFF]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group">
              Book Growth Tier
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
