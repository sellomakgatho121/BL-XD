"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  CreditCard,
  Shield,
  Truck,
  Bell,
  BarChart3,
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
    icon: CreditCard,
    title: "Secure Checkout",
    description: "Payfast & Yoco integration. PCI-compliant payment processing with SSL encryption.",
  },
  {
    icon: Shield,
    title: "Trust Signals",
    description: "Von Restorff effect optimization. Reviews, guarantees, security badges that convert.",
  },
  {
    icon: Truck,
    title: "Delivery Automation",
    description: "Automated order confirmations, tracking updates, and delivery notifications.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track sales, inventory, and customer behavior. Data-driven insights for growth.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Low stock alerts, abandoned cart recovery, and customer lifecycle emails.",
  },
];

const deliverables = [
  "Custom storefront design",
  "Product catalog (up to 50 items)",
  "Payfast/Yoco integration",
  "Secure checkout flow",
  "Customer account area",
  "Order management system",
  "Inventory tracking",
  "Email notifications",
  "Analytics dashboard",
  "SEO optimization",
  "Mobile shopping optimized",
  "90 days support",
];

export default function ShopTierPage() {
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
            <Link href="/services" className="flex items-center gap-2 text-sm text-[var(--spectral-dim)] hover:text-[var(--siren-red)] transition-colors">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 border border-[var(--siren-red)]/50 bg-[var(--siren-red-dim)] px-3 py-1 font-mono text-xs text-[var(--siren-red)] mb-6"
              >
                <Terminal size={14} />
                SHOP TIER
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
              >
                <GlitchText text="E-COMMERCE" intensity="medium" triggerOnHover />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-[var(--spectral-dim)] mb-8 leading-relaxed"
              >
                Fast, secure online stores for local retailers. Designed for speed, trust, and conversions. South African payment integration included.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-baseline gap-4 mb-8"
              >
                <span className="text-5xl font-bold text-[var(--siren-red)]">R18,500</span>
                <span className="text-[var(--spectral-muted)]">From</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[var(--siren-red)] text-[var(--spectral-white)] hover:bg-[var(--siren-red)]/90 font-mono uppercase tracking-wider rounded-none group"
                >
                  Start Store
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[var(--spectral-muted)] text-[var(--spectral-white)] hover:bg-[var(--spectral-muted)]/10 rounded-none font-mono uppercase tracking-wider"
                  asChild
                >
                  <Link href="/portfolio">View Stores</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="border border-[var(--border)] bg-[var(--card)] p-6 text-center">
                <ShoppingBag className="w-8 h-8 text-[var(--siren-red)] mx-auto mb-3" />
                <div className="text-3xl font-bold">50</div>
                <div className="text-sm text-[var(--spectral-dim)]">Products</div>
              </div>
              <div className="border border-[var(--border)] bg-[var(--card)] p-6 text-center">
                <Shield className="w-8 h-8 text-[var(--siren-red)] mx-auto mb-3" />
                <div className="text-3xl font-bold">SSL</div>
                <div className="text-sm text-[var(--spectral-dim)]">Secure</div>
              </div>
              <div className="border border-[var(--border)] bg-[var(--card)] p-6 text-center">
                <CreditCard className="w-8 h-8 text-[var(--siren-red)] mx-auto mb-3" />
                <div className="text-3xl font-bold">2</div>
                <div className="text-sm text-[var(--spectral-dim)]">Payment Gateways</div>
              </div>
              <div className="border border-[var(--border)] bg-[var(--card)] p-6 text-center">
                <Truck className="w-8 h-8 text-[var(--siren-red)] mx-auto mb-3" />
                <div className="text-3xl font-bold">Auto</div>
                <div className="text-sm text-[var(--spectral-dim)]">Delivery</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--siren-red)] mb-4">What You Get</h2>
            <p className="text-3xl font-bold">Built for Sales</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--siren-red)]/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-[var(--siren-red)] mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--spectral-dim)]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-[var(--border)] bg-[var(--card)] p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Check className="w-5 h-5 text-[var(--siren-red)]" />
              Complete E-Commerce Package
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 text-sm text-[var(--spectral-dim)]"
                >
                  <div className="w-1.5 h-1.5 bg-[var(--siren-red)]" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black tracking-tighter mb-6">
              Ready to <span className="text-[var(--siren-red)]">sell</span>?
            </h2>
            <Button size="lg" className="bg-[var(--siren-red)] text-[var(--spectral-white)] hover:bg-[var(--siren-red)]/90 font-mono uppercase tracking-wider rounded-none text-lg px-8 py-6 group">
              Book Shop Tier
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
