"use client";

import { Menu, X, Zap, TrendingUp, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const serviceTiers = [
  { href: "/services/spark", label: "Spark", icon: Zap, color: "#D7FF00", price: "R3,500" },
  { href: "/services/growth", label: "Growth", icon: TrendingUp, color: "#00CCFF", price: "R8,500" },
  { href: "/services/shop", label: "Shop", icon: ShoppingBag, color: "#FF003C", price: "R18,500" },
  { href: "/contact", label: "Diagnostic", icon: Sparkles, color: "#FF8800", price: "R1,500" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="float-pill fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl flex items-center justify-between px-6 py-3 border border-white/10 rounded-full bg-bl-deep/70 backdrop-blur-2xl shadow-soft float-anim">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-bl-gold rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-bl-deep font-bold text-sm">B</span>
        </div>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-bl-ice hidden sm:block">
          Blacklight
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.slice(0, -1).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full transition-all duration-300 ${
              pathname === link.href
                ? "bg-bl-gold/20 text-bl-gold border border-bl-gold/30"
                : "text-bl-ice/60 hover:text-bl-ice hover:bg-white/5"
            }`}
          >
            {link.label}
          </Link>
        ))}

        {/* Services Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button
            className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full transition-all duration-300 ${
              pathname.startsWith("/services")
                ? "bg-bl-gold/20 text-bl-gold border border-bl-gold/30"
                : "text-bl-ice/60 hover:text-bl-ice hover:bg-white/5"
            }`}
          >
            Services
          </button>
          {servicesOpen && (
            <div className="spatial-panel absolute top-full right-0 mt-2 w-64 p-2 rounded-2xl border border-white/10">
              {serviceTiers.map((tier) => (
                <Link
                  key={tier.href}
                  href={tier.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <tier.icon size={16} style={{ color: tier.color }} />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-bl-ice">{tier.label}</div>
                    <div className="text-[10px] text-bl-ice/40">{tier.price}</div>
                  </div>
                  <ArrowRight size={12} className="text-bl-ice/20 group-hover:text-bl-gold transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        className="hidden md:flex items-center gap-2 px-5 py-2 bg-bl-gold text-bl-deep text-xs font-semibold uppercase tracking-wider rounded-full hover:shadow-[0_0_20px_rgba(181,154,95,0.4)] transition-all duration-300 hover:scale-105"
      >
        Start a Project <ArrowRight size={12} />
      </Link>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-2 text-bl-ice hover:text-bl-gold transition-colors"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="spatial-panel fixed top-20 left-4 right-4 p-6 rounded-3xl border border-white/10 md:hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 text-sm tracking-wider uppercase rounded-xl transition-all ${
                  pathname === link.href
                    ? "bg-bl-gold/20 text-bl-gold"
                    : "text-bl-ice/60 hover:text-bl-ice hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-2" />
            {serviceTiers.map((tier) => (
              <Link
                key={tier.href}
                href={tier.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm"
              >
                <tier.icon size={16} style={{ color: tier.color }} />
                <span className="text-bl-ice/80">{tier.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
