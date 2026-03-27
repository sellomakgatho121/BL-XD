"use client";

import { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GlitchText from "@/components/GlitchText";

const CognitiveAnalyzer = lazy(() => import("@/components/showcases/CognitiveAnalyzer"));
const BrandAura = lazy(() => import("@/components/showcases/BrandAura"));
const LatencySimulator = lazy(() => import("@/components/showcases/LatencySimulator"));
const MemeticSimulator = lazy(() => import("@/components/showcases/MemeticSimulator"));
const SocialSequencer = lazy(() => import("@/components/showcases/SocialSequencer"));

const ShowcaseFallback = () => (
  <div className="h-96 w-full max-w-md rounded-xl bg-onyx/40 border border-white/10 animate-pulse flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-signal-lime/30 border-t-signal-lime rounded-full animate-spin" />
  </div>
);

const showcaseItems = [
  { 
    id: "cognitive", 
    Component: CognitiveAnalyzer, 
    title: "AI That Gets You", 
    description: "It reads text better than your ex reads signals."
  },
  { 
    id: "brand", 
    Component: BrandAura, 
    title: "Logo Generator", 
    description: "Makes logos so you don't have to use WordArt."
  },
  { 
    id: "latency", 
    Component: LatencySimulator, 
    title: "Speed Matters", 
    description: "Your site loads slow? Your users leave. Simple."
  },
  { 
    id: "memetic", 
    Component: MemeticSimulator, 
    title: "Viral Stuff", 
    description: "Things that spread online. For better or worse."
  },
  { 
    id: "social", 
    Component: SocialSequencer, 
    title: "Post Scheduler", 
    description: "Auto-post so you don't have to wake up at 3am."
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

export default function ShowcaseGallery() {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setActiveIndex(([prev]) => {
      let next = prev + newDirection;
      if (next < 0) next = showcaseItems.length - 1;
      if (next >= showcaseItems.length) next = 0;
      return [next, newDirection];
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, paginate]);

  const goToSlide = (index: number) => {
    const newDirection = index > activeIndex ? 1 : -1;
    setActiveIndex([index, newDirection]);
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
          <GlitchText text="THINGS THAT WORK" intensity="medium" triggerOnHover={true} />
        </h2>
        <div className="h-1 w-24 bg-signal-lime" />
        <p className="text-sm text-white/40 mt-2 font-mono">Yes, actually. We checked.</p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 p-3 rounded-full bg-onyx/80 border border-white/10 hover:border-signal-lime/50 hover:bg-onyx transition-all group"
          aria-label="Previous showcase"
        >
          <ChevronLeft className="w-6 h-6 text-white/60 group-hover:text-signal-lime transition-colors" />
        </button>
        
        <button
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 p-3 rounded-full bg-onyx/80 border border-white/10 hover:border-signal-lime/50 hover:bg-onyx transition-all group"
          aria-label="Next showcase"
        >
          <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-signal-lime transition-colors" />
        </button>

        <div className="relative h-[500px] overflow-hidden rounded-xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <Suspense fallback={<ShowcaseFallback />}>
                <currentItem.Component />
              </Suspense>
              
              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold tracking-tight">{currentItem.title}</h3>
                <p className="text-sm text-white/60 mt-2">{currentItem.description}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {showcaseItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-signal-lime scale-125"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to ${item.title}`}
            >
              {index === activeIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-signal-lime/50"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-signal-lime"
            initial={{ width: "0%" }}
            animate={{ width: isAutoPlaying && !isHovered ? "100%" : "0%" }}
            transition={{ duration: 6, ease: "linear" }}
            key={`progress-${activeIndex}-${isHovered}`}
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
              isAutoPlaying
                ? "border-signal-lime/30 text-signal-lime bg-signal-lime/10"
                : "border-white/20 text-white/40 hover:border-white/40"
            }`}
          >
            {isAutoPlaying ? "◉ Auto-playing" : "○ Paused"}
          </button>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-4 overflow-x-auto pb-4 px-4">
        {showcaseItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all duration-300 ${
              index === activeIndex
                ? "border-signal-lime bg-signal-lime/10 text-white"
                : "border-white/10 bg-onyx/40 text-white/60 hover:border-white/30 hover:text-white"
            }`}
          >
            <span className="text-xs font-mono uppercase tracking-wider">{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
