"use client";

import { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GlitchText from "@/components/GlitchText";

const CognitiveAnalyzer = lazy(() => import("@/components/showcases/CognitiveAnalyzer"));
const BrandAura = lazy(() => import("@/components/showcases/BrandAura"));
const LatencySimulator = lazy(() => import("@/components/showcases/LatencySimulator"));
const MemeticSimulator = lazy(() => import("@/components/showcases/MemeticSimulator"));
const SocialSequencer = lazy(() => import("@/components/showcases/SocialSequencer"));

const ShowcaseFallback = () => (
  <div className="h-96 w-full max-w-md rounded-xl bg-[var(--onyx)]/40 border border-[var(--neo-white)]/10 animate-pulse flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[var(--signal-lime)]/30 border-t-[var(--signal-lime)] rounded-full animate-spin" />
  </div>
);

const showcaseItems = [
  {
    id: "cognitive",
    Component: CognitiveAnalyzer,
    title: "AI Sentiment Analysis",
    description: "Real-time linguistic pattern recognition."
  },
  {
    id: "brand",
    Component: BrandAura,
    title: "Generative Identity",
    description: "Algorithmic design system creation."
  },
  {
    id: "latency",
    Component: LatencySimulator,
    title: "Performance ROI",
    description: "Financial impact of technical latency."
  },
  {
    id: "memetic",
    Component: MemeticSimulator,
    title: "Viral Propagation",
    description: "Agent-based memetic simulation."
  },
  {
    id: "social",
    Component: SocialSequencer,
    title: "Content Rhythm",
    description: "Cross-channel frequency orchestration."
  }
];

export default function ShowcaseGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  // Used to remount component to re-trigger CSS animations
  const [animationKey, setAnimationKey] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setActiveIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = showcaseItems.length - 1;
      if (next >= showcaseItems.length) next = 0;
      return next;
    });
    setAnimationKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, paginate]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setAnimationKey(prev => prev + 1);
  };

  const currentItem = showcaseItems[activeIndex];

  return (
    <section
      className="w-full py-24 relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
          <GlitchText text="LIVE DEMONSTRATIONS" intensity="medium" triggerOnHover={true} />
        </h2>
        <div className="h-1 w-24 bg-[var(--signal-lime)]" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 p-3 rounded-full bg-[var(--onyx)]/80 border border-[var(--neo-white)]/10 hover:border-[var(--signal-lime)]/50 hover:bg-[var(--onyx)] transition-all group"
          aria-label="Previous showcase"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--neo-white)]/60 group-hover:text-[var(--signal-lime)] transition-colors" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 p-3 rounded-full bg-[var(--onyx)]/80 border border-[var(--neo-white)]/10 hover:border-[var(--signal-lime)]/50 hover:bg-[var(--onyx)] transition-all group"
          aria-label="Next showcase"
        >
          <ChevronRight className="w-6 h-6 text-[var(--neo-white)]/60 group-hover:text-[var(--signal-lime)] transition-colors" />
        </button>

        <div className="relative h-[500px] overflow-hidden rounded-xl">
          <div
            key={`${activeIndex}-${animationKey}`}
            className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 fill-mode-forwards"
          >
            <Suspense fallback={<ShowcaseFallback />}>
              <currentItem.Component />
            </Suspense>

            <div
              className="mt-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both"
            >
              <h3 className="text-2xl font-bold tracking-tight">{currentItem.title}</h3>
              <p className="text-sm text-[var(--neo-white)]/60 mt-2">{currentItem.description}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {showcaseItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                  ? "bg-[var(--signal-lime)] scale-125"
                  : "bg-[var(--neo-white)]/20 hover:bg-[var(--neo-white)]/40"
                }`}
              aria-label={`Go to ${item.title}`}
            >
              {index === activeIndex && (
                <div
                  className="absolute inset-0 rounded-full bg-[var(--signal-lime)]/50 animate-ping"
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 h-0.5 bg-[var(--neo-white)]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--signal-lime)] ease-linear"
            key={`progress-${activeIndex}-${isHovered}`}
            style={{
              width: isAutoPlaying && !isHovered ? "100%" : "0%",
              transitionProperty: "width",
              transitionDuration: isAutoPlaying && !isHovered ? "6000ms" : "0ms"
            }}
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${isAutoPlaying
                ? "border-[var(--signal-lime)]/30 text-[var(--signal-lime)] bg-[var(--signal-lime)]/10"
                : "border-[var(--neo-white)]/20 text-[var(--neo-white)]/40 hover:border-[var(--neo-white)]/40"
              }`}
          >
            {isAutoPlaying ? "◉ Auto-playing" : "○ Paused"}
          </button>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
        {showcaseItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all duration-300 ${index === activeIndex
                ? "border-[var(--signal-lime)] bg-[var(--signal-lime)]/10 text-[var(--neo-white)]"
                : "border-[var(--neo-white)]/10 bg-[var(--onyx)]/40 text-[var(--neo-white)]/60 hover:border-[var(--neo-white)]/30 hover:text-[var(--neo-white)]"
              }`}
          >
            <span className="text-xs font-mono uppercase tracking-wider">{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
