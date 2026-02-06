"use client";

import { motion } from "framer-motion";
import { Terminal, Zap, ShieldAlert, Sparkles, TrendingUp, ShoppingCart, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import NewsletterForm from "@/components/NewsletterForm";
import GlitchText from "@/components/GlitchText";
import CountdownTimer from "@/components/CountdownTimer";
import SystemStatus from "@/components/SystemStatus";
import DistortionTransition from "@/components/DistortionTransition";

// Animated Services Component
function ServicesReveal() {
  const [currentService, setCurrentService] = useState(0);
  const services = [
    {
      name: "SPARK",
      tagline: "Entrepreneur Landing",
      description: "High-impact single-page experiences. GPU-accelerated animations, 100/100 Lighthouse performance.",
      price: "R3,500",
      colorClass: "text-signal-lime",
      borderClass: "border-signal-lime",
      bgClass: "bg-signal-lime/10",
      icon: Sparkles
    },
    {
      name: "GROWTH",
      tagline: "Small Business Site",
      description: "Professional 3-5 page presence. Custom design systems, SEO foundation, Lighthouse 90+.",
      price: "R8,500",
      colorClass: "text-siren-red",
      borderClass: "border-siren-red",
      bgClass: "bg-siren-red/10",
      icon: TrendingUp
    },
    {
      name: "SHOP",
      tagline: "Micro E-Commerce",
      description: "Fast, secure online stores. Seamless checkout, Core Web Vitals optimized (LCP < 1.2s).",
      price: "R18,500",
      colorClass: "text-blue-400",
      borderClass: "border-blue-400",
      bgClass: "bg-blue-600/10",
      icon: ShoppingCart
    },
    {
      name: "PULSE",
      tagline: "Diagnostic Check",
      description: "Expert evaluation + 3 quick-win improvements. Performance report & radical redesign prototype.",
      price: "R1,500",
      colorClass: "text-purple-400",
      borderClass: "border-purple-400",
      bgClass: "bg-purple-600/10",
      icon: Activity
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

  const Icon = services[currentService].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="relative mt-12 mb-8"
    >
      {/* Floating Service Badges */}
      <div className="absolute -top-8 -right-8 hidden lg:block">
        {services.map((service, idx) => {
          const Icon = service.icon;
          const isActive = idx === currentService;
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{
                opacity: isActive ? 1 : 0.3,
                scale: isActive ? 1 : 0.8,
                rotate: isActive ? 0 : -45,
                x: isActive ? 0 : Math.sin(idx) * 20,
                y: isActive ? 0 : Math.cos(idx) * 20,
              }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="absolute"
              style={{
                left: `${idx * 60}px`,
                top: `${idx * 30}px`,
              }}
            >
              <div className={`p-2 border ${service.borderClass}/30 ${service.bgClass} backdrop-blur-sm`}>
                <Icon className={service.colorClass} size={16} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Service Display */}
      <div className="relative overflow-hidden">
        <motion.div
          key={currentService}
          initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className={`border-l-4 ${services[currentService].borderClass} pl-6 py-4 bg-onyx/30 backdrop-blur-sm`}>
            <div className="flex items-start gap-4 mb-2">
              <Icon className={services[currentService].colorClass} size={24} />
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter font-mono">
                    <GlitchText text={services[currentService].name} intensity="medium" triggerOnHover={true} />
                  </h3>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className={`text-sm font-mono ${services[currentService].colorClass} font-bold`}
                  >
                    {services[currentService].price}
                  </motion.span>
                </div>
                <p className="text-xs font-mono text-spectral-white/40 uppercase tracking-widest mb-3">
                  {services[currentService].tagline}
                </p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm md:text-base text-spectral-white/70 leading-relaxed font-mono"
                >
                  {services[currentService].description}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Indicators */}
        <div className="flex gap-2 mt-4 justify-center">
          {services.map((service, idx) => {
            const isActive = idx === currentService;
            const activeColorMap: Record<string, string> = {
              "text-signal-lime": "bg-signal-lime",
              "text-siren-red": "bg-siren-red",
              "text-blue-400": "bg-blue-400",
              "text-purple-400": "bg-purple-400"
            };
            return (
              <motion.button
                key={idx}
                onClick={() => setCurrentService(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  isActive ? `${activeColorMap[service.colorClass]} w-8` : "bg-spectral-white/20 w-1.5"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            );
          })}
        </div>
      </div>

      {/* Maintenance Plan - Subtle Integration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-6 text-center"
      >
        <p className="text-[10px] font-mono text-spectral-white/30 tracking-widest uppercase">
          <Zap className="inline mr-1" size={10} />
          Maintenance: R750/month • Hosting • Security • Support
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-onyx text-spectral-white selection:bg-signal-lime selection:text-onyx">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />

      <nav className="relative z-10 flex w-full items-center justify-between border-b border-spectral-white/10 p-8">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-signal-lime" />
          <span className="text-xl font-bold tracking-tighter">BLACKLIGHT</span>
        </div>
        <div className="hidden items-center gap-8 text-xs font-mono tracking-widest sm:flex">
          <a href="#" className="hover:text-signal-lime transition-colors">STRATEGY</a>
          <a href="#" className="hover:text-signal-lime transition-colors">PORTFOLIO</a>
          <a href="#" className="hover:text-signal-lime transition-colors">INTEL</a>
          <button className="bg-signal-lime px-4 py-2 text-onyx font-bold hover:bg-spectral-white transition-all transform hover:scale-105 active:scale-95">
            INITIATE
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-1 flex-col items-start justify-center px-8 lg:px-24">
        <DistortionTransition>
          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 border border-siren-red/50 bg-siren-red/10 px-3 py-1 font-mono text-xs text-siren-red shadow-[0_0_15px_rgba(255,0,60,0.4)]"
            >
              <Terminal size={14} className="animate-pulse" />
              <GlitchText text="SYSTEM OVERRIDE DETECTED" intensity="high" triggerOnHover={true} />
            </motion.div>

            <div className="relative">
              <motion.h1
                className="text-6xl font-black leading-[0.9] tracking-tighter md:text-8xl lg:text-9xl mix-blend-difference"
              >
                <GlitchText text="SYSTEM" intensity="medium" triggerOnHover={true} /> <br />
                <span className="text-signal-lime italic">
                  <GlitchText text="INITIALIZING..." intensity="low" triggerOnHover={true} />
                </span>
              </motion.h1>
              <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-siren-red to-blue-600 opacity-20 blur-xl animate-pulse" />
            </div>

            <motion.p
              className="max-w-xl text-lg leading-relaxed text-spectral-white/60 md:text-xl font-mono border-l-2 border-signal-lime pl-4"
            >
              <GlitchText text="Blacklight Web Designs is currently in stealth mode." intensity="low" triggerOnHover={true} />
              <br />
              <span className="text-sm opacity-50">Access is restricted to authorized personnel and waitlisted clients.</span>
            </motion.p>

            {/* Animated Services Integration */}
            <ServicesReveal />

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="py-6"
            >
              <CountdownTimer targetDate="2026-04-01T00:00:00" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="pt-8"
            >
              <NewsletterForm />
            </motion.div>
          </div>
        </DistortionTransition>
      </main>

      <footer className="relative z-10 border-t border-spectral-white/10 p-8 text-[10px] font-mono tracking-widest text-spectral-white/30 flex justify-between uppercase">
        <span>© 2026 BLACKLIGHT WEB DESIGNS</span>
        <span>ENCRYPTED_SESSION_STABLE</span>
        <span>SCALES_WITHIN_CHAOS</span>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <SystemStatus />
      </div>
    </div>
  );
}
