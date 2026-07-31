"use client";

import { Menu, X, Zap, TrendingUp, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
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
  { href: "/services/shop", label: "Shop", icon: ShoppingBag, color: "#FF006E", price: "R18,500" },
  { href: "/contact", label: "Diagnostic", icon: Sparkles, color: "#FF8800", price: "R1,500" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Scroll-aware nav
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const docEl = document.documentElement;
      const total = docEl.scrollHeight - docEl.clientHeight;
      setScrollProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl flex items-center justify-between px-5 md:px-6 py-3 border border-white/10 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-bl-deep/85 backdrop-blur-2xl shadow-soft"
            : "bg-bl-deep/60 backdrop-blur-xl"
        }`}
      >
        {/* Scroll progress bar */}
        <div className="absolute -bottom-px left-0 right-0 h-[2px] overflow-hidden rounded-full opacity-50">
          <div
            className="h-full bg-gradient-to-r from-bl-gold to-bl-gold/40 transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
            <img
              src="/logo-nav-gold.png"
              alt="Blacklight Web Designs"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bl-ice hidden sm:block">
            Blacklight
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3.5 py-1.5 text-xs tracking-wide rounded-full transition-all duration-300 ${
                isActive(link.href)
                  ? "text-bl-gold bg-bl-gold/10"
                  : "text-bl-text-muted hover:text-bl-text hover:bg-white/5"
              }`}
            >
              {link.label === "Services" ? (
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setServicesOpen(!servicesOpen);
                  }}
                  onMouseEnter={() => setServicesOpen(true)}
                >
                  {link.label}
                </span>
              ) : (
                link.label
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-bl-gold text-bl-deep text-xs font-semibold tracking-wide hover:bg-bl-gold/90 transition-all duration-300 hover:scale-105 shrink-0"
        >
          Get Started
          <ArrowRight className="w-3 h-3" />
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-bl-text hover:text-bl-gold transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Services dropdown (desktop) */}
      {servicesOpen && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 hidden md:block"
          onMouseLeave={() => setServicesOpen(false)}
        >
          <div className="glass-panel-strong rounded-2xl p-4 min-w-[320px] shadow-2xl">
            <div className="text-[10px] tracking-[0.2em] uppercase text-bl-text-muted mb-3 px-3">
              Service Tiers
            </div>
            {serviceTiers.map((tier) => (
              <Link
                key={tier.label}
                href={tier.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${tier.color}15` }}
                >
                  <tier.icon className="w-4 h-4" style={{ color: tier.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-bl-text group-hover:text-bl-gold transition-colors">
                    {tier.label}
                  </div>
                  <div className="text-[10px] text-bl-text-muted">
                    From {tier.price}
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-bl-text-muted group-hover:text-bl-gold transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-bl-deep/95 backdrop-blur-2xl"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          <nav className="flex flex-col items-center gap-6 mb-12">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-semibold transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-bl-gold"
                    : "text-bl-text/70 hover:text-bl-text"
                }`}
                style={{
                  transitionDelay: `${i * 50}ms`,
                  transform: mobileOpen
                    ? "translateY(0) scale(1)"
                    : "translateY(20px) scale(0.9)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `all 0.4s ${i * 0.06}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile services list */}
          <div
            className="w-full max-w-xs space-y-2"
            style={{
              transitionDelay: "300ms",
              transform: mobileOpen
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: mobileOpen ? 1 : 0,
              transition: "all 0.4s 0.3s",
            }}
          >
            <div className="text-[10px] tracking-[0.2em] uppercase text-bl-text-muted text-center mb-4">
              Services
            </div>
            {serviceTiers.map((tier) => (
              <Link
                key={tier.label}
                href={tier.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl glass-panel hover:bg-white/5 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${tier.color}15` }}
                >
                  <tier.icon className="w-4 h-4" style={{ color: tier.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-bl-text">{tier.label}</div>
                  <div className="text-[10px] text-bl-text-muted">
                    From {tier.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
