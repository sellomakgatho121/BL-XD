"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Sparkles, ArrowRight, Check, Zap, Target, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface GEOLandingConfig {
  businessName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  ctaText: string;
  ctaLink: string;
  features: Array<{ title: string; description: string; icon: string }>;
  location: {
    city: string;
    province: string;
    serviceArea: string;
  };
  pricing: {
    from: number;
    display: string;
  };
  deliveryTime: string;
  testimonials?: Array<{ name: string; text: string; rating: number }>;
  colors?: {
    primary: string;
    accent: string;
  };
}

const defaultConfig: GEOLandingConfig = {
  businessName: "Your Business",
  tagline: "Professional Services",
  heroHeadline: "The Best {city} Solution for Your Business",
  heroSubheadline: "We deliver exceptional results for businesses in {city} and surrounding areas.",
  ctaText: "Get Your Free Quote",
  ctaLink: "#contact",
  features: [
    { title: "Fast Turnaround", description: "Delivered in 48 hours", icon: "zap" },
    { title: "Local SEO", description: "Rank higher in {city} searches", icon: "target" },
    { title: "AI Optimized", description: "Structured for AI discovery", icon: "sparkles" },
  ],
  location: {
    city: "Johannesburg",
    province: "Gauteng",
    serviceArea: "Johannesburg & Surrounds",
  },
  pricing: {
    from: 4500,
    display: "From R4,500",
  },
  deliveryTime: "48 hours",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  target: Target,
  sparkles: Sparkles,
  clock: Clock,
  check: Check,
};

export default function GEOLandingTemplate({
  config = defaultConfig,
  onCtaClick,
}: {
  config?: Partial<GEOLandingConfig>;
  onCtaClick?: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const mergedConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const headline = mergedConfig.heroHeadline.replace("{city}", mergedConfig.location.city);
  const subheadline = mergedConfig.heroSubline?.replace("{city}", mergedConfig.location.city) 
    || mergedConfig.heroSubheadline.replace("{city}", mergedConfig.location.city);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    onCtaClick?.();
  };

  return (
    <div className="min-h-screen bg-onyx text-spectral-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-signal-lime/5 to-siren-red/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.03) 0%, transparent 50%)`,
        }} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-signal-lime/10 border border-signal-lime/30 text-signal-lime text-sm font-mono mb-6"
          >
            <MapPin size={14} />
            <span>{mergedConfig.location.serviceArea}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-spectral-white/70 max-w-2xl mx-auto mb-8"
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={onCtaClick}
              className="bg-signal-lime text-onyx hover:bg-signal-lime/90 font-bold px-8"
            >
              {mergedConfig.ctaText}
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <div className="flex items-center gap-2 text-sm text-spectral-white/50 font-mono">
              <Clock size={14} />
              <span>Delivery in {mergedConfig.deliveryTime}</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {mergedConfig.features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              const description = feature.description.replace("{city}", mergedConfig.location.city);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 border border-spectral-white/10 bg-spectral-white/5 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-signal-lime/10 flex items-center justify-center mb-4">
                    <Icon className="text-signal-lime" size={20} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-spectral-white/60 text-sm">{description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-spectral-white/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="text-3xl font-black mb-4">Simple, Transparent Pricing</h2>
          <div className="text-5xl font-black text-signal-lime mb-2">
            {mergedConfig.pricing.display}
          </div>
          <p className="text-spectral-white/50 mb-8">One-time payment. No hidden fees.</p>
          
          <ul className="text-left space-y-3 mb-8">
            {[
              "Custom landing page design",
              "Mobile-first responsive layout",
              "SEO optimized structure",
              "AI-readable schema markup",
              "Contact form integration",
              "48-hour delivery",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check className="text-signal-lime" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            onClick={onCtaClick}
            className="w-full bg-signal-lime text-onyx hover:bg-signal-lime/90 font-bold"
          >
            {mergedConfig.ctaText}
          </Button>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <h2 className="text-3xl font-black text-center mb-4">Get Started</h2>
          <p className="text-spectral-white/50 text-center mb-8">
            Tell us about your business. We'll be in touch within 24 hours.
          </p>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 border border-signal-lime/30 bg-signal-lime/10 rounded-lg text-center"
            >
              <Check className="w-12 h-12 text-signal-lime mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Thanks!</h3>
              <p className="text-spectral-white/60">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-spectral-white/5 border-spectral-white/10"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-spectral-white/5 border-spectral-white/10"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-spectral-white/5 border-spectral-white/10"
              />
              <Textarea
                placeholder="Tell us about your business..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="bg-spectral-white/5 border-spectral-white/10"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-signal-lime text-onyx hover:bg-signal-lime/90 font-bold"
              >
                Submit Inquiry
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-spectral-white/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-signal-lime" />
            <span className="font-mono text-sm">{mergedConfig.location.serviceArea}</span>
          </div>
          <p className="text-xs text-spectral-white/30 font-mono">
            Powered by Blacklight Web Designs
          </p>
        </div>
      </footer>
    </div>
  );
}

export type { GEOLandingConfig };
