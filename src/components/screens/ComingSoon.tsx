"use client";

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
            <div className="mb-6 inline-flex items-center gap-2 border border-siren-red/50 bg-siren-red/10 px-3 py-1 font-mono text-xs text-siren-red shadow-[0_0_15px_rgba(255,0,60,0.4)] animate-in fade-in zoom-in-95 duration-500">
              <Terminal size={14} className="animate-pulse" />
              <GlitchText text="PREPARING AGENTIC SYSTEMS" intensity="high" triggerOnHover={true} />
            </div>

            <div className="relative">
              <h1 className="text-6xl font-black leading-[0.9] tracking-tighter md:text-8xl lg:text-9xl mix-blend-difference">
                <GlitchText text="BLACKLIGHT WEB DESIGNS" intensity="medium" triggerOnHover={true} />
              </h1>
              <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-siren-red to-blue-600 opacity-20 blur-xl animate-pulse" />
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-spectral-white/60 md:text-xl font-mono border-l-2 border-signal-lime pl-4">
              <GlitchText text="The future of web development is evolving." intensity="low" triggerOnHover={true} />
              <br />
              <span className="text-sm opacity-50">Something extraordinary is building at the intersection of code and intelligence.</span>
            </p>

            <div className="my-12 animate-in fade-in zoom-in-95 duration-1000 fill-mode-both" style={{ animationDelay: '500ms' }}>
              <Suspense fallback={<ComponentFallback />}>
                <QuantumField />
              </Suspense>
            </div>

            <Suspense fallback={<ComponentFallback />}>
              <ShowcaseGallery />
            </Suspense>

            {/* Animated Services Integration - lazy loaded */}
            <Suspense fallback={null}>
              <MysteryReveal />
            </Suspense>

            {/* Countdown Timer */}
            <div className="py-6 animate-in fade-in duration-500 fill-mode-both" style={{ animationDelay: '1400ms' }}>
              <CountdownTimer targetDate="2026-04-01T00:00:00" />
            </div>

            <div className="pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: '2000ms' }}>
              {/* Friendly Explanation */}
              <div className="mb-6 p-4 border border-signal-lime/20 bg-signal-lime/5 rounded-lg backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500 fill-mode-both" style={{ animationDelay: '2200ms' }}>
                <p className="text-sm text-spectral-white/80 text-center font-mono">
                  <span className="text-signal-lime font-bold">✨ Interested in next-gen web development for your business, startup, or organization?</span><br />
                  <span className="text-xs opacity-70">Drop your email below and we&apos;ll notify you when we launch. No spam, just cutting-edge tech! 🚀</span>
                </p>
              </div>

              <NewsletterForm />
            </div>
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

      {/* Client Guide Tooltip - lazy loaded */}
      <Suspense fallback={null}>
        <ClientGuide />
      </Suspense>
    </div>
  );
}
