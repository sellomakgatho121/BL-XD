"use client";

import { motion } from "framer-motion";
import { Terminal, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import NewsletterForm from "@/components/NewsletterForm";
import GlitchText from "@/components/GlitchText";
import CountdownTimer from "@/components/CountdownTimer";
import SystemStatus from "@/components/SystemStatus";
import DistortionTransition from "@/components/DistortionTransition";
import MysteryReveal from "@/components/MysteryReveal";
import QuantumField from "@/components/QuantumField";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

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
              <GlitchText text="The digital frontier is evolving." intensity="low" triggerOnHover={true} />
              <br />
              <span className="text-sm opacity-50">Something extraordinary is materializing in the void between code and consciousness.</span>
            </motion.p>

            {/* Quantum Field Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="my-12"
            >
              <QuantumField />
            </motion.div>

            {/* Animated Services Integration */}
            <MysteryReveal />

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
