"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState, useEffect, Suspense, lazy } from "react";
import NewsletterForm from "@/components/NewsletterForm";
import GlitchText from "@/components/GlitchText";
import CountdownTimer from "@/components/CountdownTimer";
import SystemStatus from "@/components/SystemStatus";
import DistortionTransition from "@/components/DistortionTransition";
import Logo from "@/components/Logo";

// Lazy load heavy components for better initial load performance
const MysteryReveal = lazy(() => import("@/components/MysteryReveal"));
const QuantumField = lazy(() => import("@/components/QuantumField"));
const ShowcaseGallery = lazy(() => import("@/components/ShowcaseGallery"));
const ClientGuide = lazy(() => import("@/components/ClientGuide"));

// Loading fallback for lazy components
const ComponentFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-signal-lime/30 border-t-signal-lime rounded-full animate-spin" />
  </div>
);

export default function ComingSoon() {
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
        <Logo />
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
              <GlitchText text="COGS TURNING" intensity="high" triggerOnHover={true} />
            </motion.div>

            <div className="relative">
              <motion.h1
                className="text-6xl font-black leading-[0.9] tracking-tighter md:text-8xl lg:text-9xl mix-blend-difference"
              >
                <GlitchText text="BLACKLIGHT WEB DESIGNS" intensity="medium" triggerOnHover={true} />
              </motion.h1>
              <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-siren-red to-blue-600 opacity-20 blur-xl animate-pulse" />
            </div>

            <motion.p
              className="max-w-xl text-lg leading-relaxed text-spectral-white/60 md:text-xl font-mono border-l-2 border-signal-lime pl-4"
            >
              <GlitchText text="Web development, but someone actually cared." intensity="low" triggerOnHover={true} />
              <br />
              <span className="text-sm opacity-50">Yes, we still use the terminal aesthetic. No, we haven't figured out why. But it looks cool, right? We're basically 1990s hacker movie protagonists who figured out self-care.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="my-12"
            >
              <Suspense fallback={<ComponentFallback />}>
                <QuantumField />
              </Suspense>
            </motion.div>

            <Suspense fallback={<ComponentFallback />}>
              <ShowcaseGallery />
            </Suspense>

            {/* Animated Services Integration - lazy loaded */}
            <Suspense fallback={null}>
              <MysteryReveal />
            </Suspense>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="py-6"
            >
              <CountdownTimer targetDate="2026-06-01T00:00:00" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="pt-8"
            >
              {/* Friendly Explanation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2 }}
                className="mb-6 p-4 border border-signal-lime/20 bg-signal-lime/5 rounded-lg backdrop-blur-sm"
              >
                <p className="text-sm text-spectral-white/80 text-center font-mono">
                  <span className="text-signal-lime font-bold">Fancy being notified when we launch?</span><br/>
                  <span className="text-xs opacity-70">Drop your email below. We'll only spam you with updates if you're lucky.</span>
                </p>
              </motion.div>
              
              <NewsletterForm />
            </motion.div>
          </div>
        </DistortionTransition>
      </main>

      <footer className="relative z-10 border-t border-spectral-white/10 p-8 text-[10px] font-mono tracking-widest text-spectral-white/30 flex justify-between uppercase">
        <span>© 2026 BLACKLIGHT WEB DESIGNS</span>
        <span>WE'RE COMING</span>
        <span>EVENTUALLY</span>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <SystemStatus />
      </div>

      {/* Client Guide Tooltip - lazy loaded */}
      <Suspense fallback={null}>
        <ClientGuide />
      </Suspense>
    </div>
  );
}
