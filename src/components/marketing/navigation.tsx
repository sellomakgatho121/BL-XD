"use client";

import { Menu, X, Zap, TrendingUp, ShoppingBag, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const serviceTiers = [
  { href: "/services/spark", label: "Spark", icon: Zap, color: "#D7FF00", price: "R3,500" },
  { href: "/services/growth", label: "Growth", icon: TrendingUp, color: "#00CCFF", price: "R8,500" },
  { href: "/services/shop", label: "Shop", icon: ShoppingBag, color: "#FF003C", price: "R18,500" },
  { href: "/contact", label: "Diagnostic", icon: Stethoscope, color: "#FF8800", price: "R1,500" },
];

interface NavigationProps {
  transparent?: boolean;
}

export default function Navigation({ transparent = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent
            ? "bg-transparent"
            : "border-b border-[var(--border)] bg-[var(--onyx)]/80 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center hover:scale-105 transition-transform duration-200"
              >
                <span className="text-[var(--onyx)] font-bold text-lg">B</span>
              </div>
              <span className="font-mono text-sm tracking-wider uppercase hidden sm:block group-hover:text-[var(--signal-lime)] transition-colors">
                Blacklight
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}

              <Button
                size="sm"
                className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono text-xs uppercase tracking-wider rounded-none"
                asChild
              >
                <Link href="/contact">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center border border-[var(--border)]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-16 z-40 bg-[var(--onyx)] border-b border-[var(--border)] md:hidden animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 text-lg font-mono uppercase tracking-wider text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] hover:bg-[var(--card)] transition-colors border border-[var(--border)]"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-[var(--border)] pt-4 mt-4">
              <p className="text-xs font-mono text-[var(--spectral-muted)] uppercase tracking-wider mb-3 px-4">
                Service Tiers
              </p>
              {serviceTiers.map((tier) => (
                <Link
                  key={tier.label}
                  href={tier.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-4 hover:bg-[var(--card)] transition-colors border border-[var(--border)] mb-2"
                >
                  <div className="flex items-center gap-3">
                    <tier.icon className="w-4 h-4" style={{ color: tier.color }} />
                    <span className="font-mono text-sm">{tier.label}</span>
                  </div>
                  <span className="font-mono text-xs text-[var(--spectral-muted)]">{tier.price}</span>
                </Link>
              ))}
            </div>

            <Button
              size="lg"
              className="w-full bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none mt-4"
              asChild
            >
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Get Quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
