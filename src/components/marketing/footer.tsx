"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, Send, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Services: [
    { href: "/services/spark", label: "Spark" },
    { href: "/services/growth", label: "Growth" },
    { href: "/services/shop", label: "Shop" },
    { href: "/contact", label: "Diagnostic" },
  ],
  Company: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/process", label: "Process" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookies", label: "Cookies" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-gradient-to-b from-bl-deep to-black pt-20 pb-8">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-bl-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-bl-gold rounded-sm flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <span className="text-bl-deep font-bold text-lg">B</span>
              </div>
              <div>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-bl-ice block">Blacklight</span>
                <span className="text-[10px] text-bl-ice/30 tracking-wider">Web Designs</span>
              </div>
            </Link>
            <p className="text-sm text-bl-ice/50 leading-relaxed max-w-xs">
              Depth-engineered web systems for the next generation of South African entrepreneurs and global disruptors.
            </p>
            <div className="flex gap-3">
              {[Github, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-bl-ice/40 hover:text-bl-gold hover:border-bl-gold/30 hover:shadow-[0_0_15px_rgba(181,154,95,0.2)] transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-bl-gold mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-bl-ice/40 hover:text-bl-ice transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-widest text-bl-ice/20 uppercase">
            &copy; {currentYear} Blacklight Web Designs. All rights reserved.
          </p>
          <p className="text-[10px] tracking-widest text-bl-ice/20 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-bl-gold animate-pulse" />
            Depth Engineered
            <span className="w-1.5 h-1.5 rounded-full bg-bl-gold animate-pulse" />
          </p>
          <div className="flex items-center gap-4 text-[10px] text-bl-ice/20">
            <span>ENC SESSION</span>
            <span className="w-px h-3 bg-white/10" />
            <span>SCALES WITHIN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
