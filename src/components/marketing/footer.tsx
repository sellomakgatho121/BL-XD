"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--onyx)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center">
                <span className="text-[var(--onyx)] font-bold text-lg">B</span>
              </div>
              <span className="font-mono text-sm tracking-wider uppercase hidden sm:block">Blacklight</span>
            </Link>
            <p className="text-sm text-[var(--spectral-dim)] leading-relaxed">
              Agentic web systems for the next generation of South African entrepreneurs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors"><Github size={20} /></a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-6 text-[var(--spectral-white)]">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">All Services</Link></li>
              <li><Link href="/pricing" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Pricing</Link></li>
              <li><Link href="/services/whatsapp-ai" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">WhatsApp AI</Link></li>
              <li><Link href="/services/geo-landing" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Discovery Node</Link></li>
              <li><Link href="/services/orchestrator" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">The Orchestrator</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-6 text-[var(--spectral-white)]">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/portfolio" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Contact</Link></li>
              <li><Link href="/portal" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-6 text-[var(--spectral-white)]">Stay Synchronised</h4>
            <p className="text-sm text-[var(--spectral-dim)] mb-6">
              Join our signal network for updates on AI trends and digital strategy.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--spectral-dim)]">
            &copy; {currentYear} Blacklight Web Designs. Built in South Africa.
          </p>
          <div className="flex gap-8 text-xs text-[var(--spectral-dim)]">
            <Link href="/privacy" className="hover:text-[var(--spectral-white)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--spectral-white)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
