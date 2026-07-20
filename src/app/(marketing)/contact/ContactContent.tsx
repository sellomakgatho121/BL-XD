"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Mail, MapPin, Phone, Github, Linkedin, Instagram, Send, CheckCircle, Loader2, Layers } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/marketing/navigation";
import Footer from "@/components/marketing/footer";

interface FormData {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  budgetRange: string;
  message: string;
}

export default function ContactContent() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    businessName: "",
    businessType: "",
    budgetRange: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          businessName: "",
          businessType: "",
          budgetRange: "",
          message: "",
        });
      } else {
        throw new Error(data.error || "Failed to send message.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bl-deep text-bl-text overflow-x-hidden">
      {/* Isometric grid overlay */}
      <div className="fixed inset-0 iso-grid pointer-events-none z-0" />

      {/* Ambient glow */}
      <div className="fixed top-1/3 right-[12%] w-80 h-80 rounded-full bg-bl-gold/5 blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-[8%] w-64 h-64 rounded-full bg-bl-cyan/4 blur-[80px] pointer-events-none z-0" />

      <Navigation />

      {/* ═══════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative z-10 pt-36 pb-16 px-6 scene-3d">
        <div className="max-w-6xl mx-auto preserve-3d">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-8">
            <Layers size={14} />
            Connect
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6 gold-glow">
            <span className="block">Initiate</span>
            <span className="gold-gradient">Sequence</span>
          </h1>

          <p className="text-lg md:text-xl text-bl-text-muted max-w-2xl leading-relaxed">
            Skip the small talk. Tell us what you need and we&apos;ll build you a digital anomaly.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         FORM + INFO — 2 Column Layout
         ═══════════════════════════════════════ */}
      <section className="relative z-10 pb-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-start">
          {/* ─── FORM — 3/5 width ─── */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="spatial-panel p-10 md:p-12 text-center rim-light spatial-panel-gold">
                <div className="w-20 h-20 rounded-full bg-bl-gold/10 border border-bl-gold/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-bl-gold" />
                </div>
                <h2 className="text-3xl font-bold uppercase mb-4 font-display gold-gradient">Message Received</h2>
                <p className="text-bl-text-muted max-w-md mx-auto mb-8 leading-relaxed">
                  Your transmission has been received. We&apos;ll review and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-4 rounded-full bg-bl-gold/10 border border-bl-gold/30 text-bl-gold text-sm font-bold uppercase tracking-wider hover:bg-bl-gold hover:text-bl-deep transition-all duration-300"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <div className="spatial-panel p-8 md:p-10 rim-light">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-bl-gold">
                        Name <span className="text-bl-amber">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-bl-glass border border-bl-glass-border rounded-2xl p-4 text-sm text-bl-text placeholder:text-bl-text-muted/40 focus:outline-none focus:border-bl-gold/50 focus:bg-bl-glass-hover transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-bl-gold">
                        Email <span className="text-bl-amber">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-bl-glass border border-bl-glass-border rounded-2xl p-4 text-sm text-bl-text placeholder:text-bl-text-muted/40 focus:outline-none focus:border-bl-gold/50 focus:bg-bl-glass-hover transition-all duration-300"
                        placeholder="john@corp.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Business Name */}
                    <div className="space-y-2">
                      <label htmlFor="businessName" className="text-xs font-semibold uppercase tracking-widest text-bl-gold">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full bg-bl-glass border border-bl-glass-border rounded-2xl p-4 text-sm text-bl-text placeholder:text-bl-text-muted/40 focus:outline-none focus:border-bl-gold/50 focus:bg-bl-glass-hover transition-all duration-300"
                        placeholder="Acme Corp"
                      />
                    </div>

                    {/* Business Type */}
                    <div className="space-y-2">
                      <label htmlFor="businessType" className="text-xs font-semibold uppercase tracking-widest text-bl-gold">
                        Business Type
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full bg-bl-glass border border-bl-glass-border rounded-2xl p-4 text-sm text-bl-text placeholder:text-bl-text-muted/40 focus:outline-none focus:border-bl-gold/50 focus:bg-bl-glass-hover transition-all duration-300 appearance-none cursor-pointer"
                      >
                        <option value="">Select a category...</option>
                        <option value="startup">Startup / New Venture</option>
                        <option value="sme">SME / Established Business</option>
                        <option value="ecommerce">E-Commerce / Retail</option>
                        <option value="agency">Agency / Creative</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-2">
                    <label htmlFor="budgetRange" className="text-xs font-semibold uppercase tracking-widest text-bl-gold">
                      Budget Range
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full bg-bl-glass border border-bl-glass-border rounded-2xl p-4 text-sm text-bl-text focus:outline-none focus:border-bl-gold/50 focus:bg-bl-glass-hover transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="">Select a range...</option>
                      <option value="R1,500 - R3,500">R1,500 - R3,500 (Diagnostic / Spark)</option>
                      <option value="R3,500 - R8,500">R3,500 - R8,500 (Spark / Growth)</option>
                      <option value="R8,500 - R18,500">R8,500 - R18,500 (Growth / Shop)</option>
                      <option value="R18,500+">R18,500+ (Shop / Custom)</option>
                      <option value="unsure">Not Sure Yet</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-bl-gold">
                      Message <span className="text-bl-amber">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full bg-bl-glass border border-bl-glass-border rounded-2xl p-4 text-sm text-bl-text placeholder:text-bl-text-muted/40 focus:outline-none focus:border-bl-gold/50 focus:bg-bl-glass-hover transition-all duration-300 resize-y"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {error && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full py-5 rounded-full bg-bl-gold text-bl-deep font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-bl-amber hover:shadow-[0_0_40px_rgba(181,154,95,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Transmit
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* ─── INFO PANELS — 2/5 width ─── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Email */}
            <div className="spatial-panel p-6 md:p-8 rim-light group hover:spatial-panel-gold transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-bl-gold/10 border border-bl-gold/25 flex items-center justify-center shrink-0">
                  <Mail size={24} className="text-bl-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bl-gold mb-1">Direct Line</h3>
                  <a href="mailto:hello@blacklight.co.za" className="text-sm text-bl-text/80 hover:text-bl-gold transition-colors">
                    hello@blacklight.co.za
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="spatial-panel p-6 md:p-8 rim-light group hover:spatial-panel-gold transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-bl-cyan/10 border border-bl-cyan/25 flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-bl-cyan" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bl-cyan mb-1">Comms</h3>
                  <p className="text-sm text-bl-text/80">+27 (0) 00 000 0000</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="spatial-panel p-6 md:p-8 rim-light group hover:spatial-panel-gold transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-bl-amber/10 border border-bl-amber/25 flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-bl-amber" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bl-amber mb-1">HQ</h3>
                  <p className="text-sm text-bl-text/80">Johannesburg, ZA<br />(Remote Globally)</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="spatial-panel p-6 md:p-8 rim-light spatial-panel-gold">
              <h3 className="text-sm font-bold uppercase tracking-wider text-bl-gold mb-6">Node Access</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="GitHub"
                  className="w-12 h-12 rounded-2xl bg-bl-glass border border-bl-glass-border flex items-center justify-center text-bl-text-muted hover:text-bl-gold hover:border-bl-gold/30 hover:bg-bl-glass-hover transition-all duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-12 h-12 rounded-2xl bg-bl-glass border border-bl-glass-border flex items-center justify-center text-bl-text-muted hover:text-bl-gold hover:border-bl-gold/30 hover:bg-bl-glass-hover transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-2xl bg-bl-glass border border-bl-glass-border flex items-center justify-center text-bl-text-muted hover:text-bl-gold hover:border-bl-gold/30 hover:bg-bl-glass-hover transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
