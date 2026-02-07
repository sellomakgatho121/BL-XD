"use client";

import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const budgetOptions = [
  { value: "", label: "Select budget range" },
  { value: "1500", label: "R1,500 - Pulse Check" },
  { value: "3500", label: "R3,500 - Spark Tier" },
  { value: "8500", label: "R8,500 - Growth Tier" },
  { value: "18500", label: "R18,500+ - Shop Tier" },
  { value: "custom", label: "Custom Project" },
];

const businessTypes = [
  { value: "", label: "Select business type" },
  { value: "startup", label: "Startup / New Venture" },
  { value: "sme", label: "Small Business (SME)" },
  { value: "retail", label: "Retail / E-commerce" },
  { value: "professional", label: "Professional Services" },
  { value: "creative", label: "Creative / Agency" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    type: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          business_name: formData.business,
          business_type: formData.type,
          budget_range: formData.budget,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit form");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
              <Link href="/services" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Services</Link>
              <Link href="/portfolio" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider">Portfolio</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                  <GlitchText text="LET&apos;S TALK" intensity="medium" triggerOnHover />
                </h1>
                <p className="text-xl text-[var(--spectral-dim)] mb-8 leading-relaxed">
                  Ready to reveal your brilliance? Tell us about your project and we&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[var(--border)] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--signal-lime)]" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--spectral-muted)] font-mono uppercase">Email</div>
                    <a href="mailto:hello@blacklight.co.za" className="text-[var(--spectral-white)] hover:text-[var(--signal-lime)] transition-colors">
                      hello@blacklight.co.za
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[var(--border)] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--signal-lime)]" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--spectral-muted)] font-mono uppercase">Phone</div>
                    <a href="tel:+27000000000" className="text-[var(--spectral-white)] hover:text-[var(--signal-lime)] transition-colors">
                      +27 (0) 00 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[var(--border)] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--signal-lime)]" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--spectral-muted)] font-mono uppercase">Location</div>
                    <span className="text-[var(--spectral-white)]">South Africa (Remote)</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[var(--border)] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[var(--signal-lime)]" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--spectral-muted)] font-mono uppercase">Response Time</div>
                    <span className="text-[var(--signal-lime)] font-bold">Within 24 hours</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border border-[var(--border)] bg-[var(--card)] p-8"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[var(--signal-lime)] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-[var(--spectral-dim)] mb-6">
                    Thanks for reaching out. We&apos;ll review your project and get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-[var(--signal-lime)] text-[var(--signal-lime)] hover:bg-[var(--signal-lime)]/10 rounded-none"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-[var(--spectral-muted)]">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[var(--onyx)] border-[var(--border)] rounded-none focus:border-[var(--signal-lime)] focus:ring-[var(--signal-lime)]"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[var(--spectral-muted)]">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[var(--onyx)] border-[var(--border)] rounded-none focus:border-[var(--signal-lime)] focus:ring-[var(--signal-lime)]"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business" className="text-xs font-mono uppercase tracking-wider text-[var(--spectral-muted)]">
                      Business Name
                    </Label>
                    <Input
                      id="business"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      className="bg-[var(--onyx)] border-[var(--border)] rounded-none focus:border-[var(--signal-lime)] focus:ring-[var(--signal-lime)]"
                      placeholder="Your company"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono uppercase tracking-wider text-[var(--spectral-muted)]">
                        Business Type
                      </Label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full h-10 px-3 bg-[var(--onyx)] border border-[var(--border)] rounded-none text-sm focus:border-[var(--signal-lime)] focus:outline-none"
                      >
                        {businessTypes.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono uppercase tracking-wider text-[var(--spectral-muted)]">
                        Budget Range
                      </Label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full h-10 px-3 bg-[var(--onyx)] border border-[var(--border)] rounded-none text-sm focus:border-[var(--signal-lime)] focus:outline-none"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-[var(--spectral-muted)]">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-[var(--onyx)] border-[var(--border)] rounded-none focus:border-[var(--signal-lime)] focus:ring-[var(--signal-lime)] resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-sm text-[var(--siren-red)] border border-[var(--siren-red)]/50 bg-[var(--siren-red)]/10 px-4 py-3"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none group disabled:opacity-50"
                  >
                    {isLoading ? (
                      "SENDING..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Inquiry
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-[var(--spectral-muted)] text-center">
                    We respect your privacy. Your information will never be shared.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
