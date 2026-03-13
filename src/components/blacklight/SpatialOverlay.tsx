"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function SpatialOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Since the body has overflow:hidden to prevent native scrolling,
    // we must manually observe wheel/touch events to drive the horizontal timeline
    if (containerRef.current) {
      let ctx = gsap.context(() => {
        let panels = gsap.utils.toArray(".gsap-panel");
        
        // Create the horizontal animation timeline
        let tween = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          paused: true
        });

        // Manually track progress since native scrolling is disabled
        let progress = 0;
        
        const handleWheel = (e: WheelEvent) => {
          // Calculate delta, adjust sensitivity
          const delta = e.deltaY * 0.001; 
          progress += delta;
          
          // Clamp progress between 0 and 1
          progress = Math.max(0, Math.min(progress, 1));
          
          // Smoothly animate the timeline to the new progress point
          gsap.to(tween, {
            progress: progress,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        window.addEventListener("wheel", handleWheel);
        
        return () => {
          window.removeEventListener("wheel", handleWheel);
        };
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-[300vw] h-screen flex" ref={containerRef}>
      
      {/* Panel 1: The Intro Pit Overlay / Manifesto */}
      <section className="gsap-panel w-screen h-screen flex-shrink-0 relative flex flex-col justify-end p-8 md:p-16 pointer-events-none">
         <motion.div 
            className="pointer-events-auto bg-transparent pb-12 w-full max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 1.2 }}
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              {/* Type Collage: Mixing huge impactful sans-serif, standard text, and monospace elements */}
              <h2 className="text-[12vw] md:text-[8rem] font-black font-[family-name:var(--font-playfair)] text-signal-lime uppercase leading-[0.8] tracking-tighter" style={{ textShadow: "4px 4px 0px rgba(0,0,0,1)" }}>
                VISION.<br/><span className="text-spectral-white">CRAFT.</span>
              </h2>
              <div className="flex items-center gap-4 mt-8">
                <span className="bg-spectral-white text-onyx px-4 py-2 font-black font-space-grotesk tracking-widest uppercase text-sm">NO CREATIVE WALLS</span>
              </div>
              <p className="font-space-grotesk text-spectral-white/90 text-xl leading-relaxed max-w-2xl mt-4 border-l-4 border-signal-lime pl-6 bg-onyx/50 backdrop-blur-sm p-4">
                Revealing Your Unseen Brilliance. We don't dictate style. We translate the unique, uncompromising essence of your business into a bespoke <span className="text-signal-lime font-bold">Digital Experience</span>. What you want is exactly what we bring to life. 
              </p>
            </div>
         </motion.div>
      </section>

      {/* Panel 2: The Micro-Luminescence Tiers  */}
      <section className="gsap-panel w-screen h-screen flex-shrink-0 flex items-center justify-center pointer-events-none p-4 md:p-12">
        <div className="pointer-events-auto grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[90vw]">
           
           {/* Tier 1: Ember */}
           <motion.div 
             className="bg-onyx border-2 border-spectral-white p-6 md:p-10 flex flex-col justify-between"
             whileHover={{ y: -10, boxShadow: "-10px 10px 0px 0px rgba(253, 253, 253, 1)" }}
             transition={{ type: "spring", stiffness: 400, damping: 20 }}
           >
             <div className="mb-12">
                <div className="flex justify-between items-start mb-6 border-b-2 border-spectral-white/20 pb-4">
                  <h2 className="text-4xl md:text-5xl font-black font-[family-name:var(--font-playfair)] text-spectral-white uppercase leading-[0.8]">Ember</h2>
                  <span className="font-mono text-spectral-white/50 text-xs">[ TIER : 01 ]</span>
                </div>
                <h4 className="font-space-grotesk font-black text-xl text-siren-red mb-2 uppercase tracking-wide bg-siren-red/10 inline-block px-2">The Essential Presence</h4>
                <p className="font-space-grotesk text-spectral-white/80 mt-4 text-sm md:text-base">A single-viewport bespoke digital canvas. Crafted in 24 hours.</p>
             </div>
             <div>
                <div className="text-3xl md:text-5xl font-black font-space-grotesk text-spectral-white tracking-tighter">R950 <span className="text-base font-normal text-spectral-white/40 tracking-normal block mt-2">ONCE-OFF</span></div>
             </div>
           </motion.div>

           {/* Tier 2: Neon */}
           <motion.div 
             className="bg-signal-lime border-2 border-signal-lime p-6 md:p-10 flex flex-col justify-between transform md:-translate-y-8"
             whileHover={{ y: -18, boxShadow: "-10px 10px 0px 0px rgba(0, 0, 0, 1)" }}
             transition={{ type: "spring", stiffness: 400, damping: 20 }}
           >
              <div className="mb-12">
                <div className="flex justify-between items-start mb-6 border-b-2 border-onyx/20 pb-4">
                  <h2 className="text-5xl md:text-7xl font-black font-[family-name:var(--font-playfair)] text-onyx uppercase leading-[0.8]">Neon</h2>
                  <span className="font-mono text-onyx/50 text-xs">[ TIER : 02 ]</span>
                </div>
                <h4 className="font-space-grotesk font-black text-2xl text-onyx mb-2 uppercase tracking-wide">The Dynamic Portal</h4>
                <p className="font-space-grotesk text-onyx/90 mt-4 text-base md:text-lg font-medium leading-tight">High-impact, mobile-first scrolling experience with direct WhatsApp connection. Crafted in 48 hours.</p>
              </div>
              <div className="border-t-2 border-onyx pt-6">
                <div className="text-4xl md:text-6xl font-black font-space-grotesk text-onyx tracking-tighter">R1,950 <span className="text-lg font-bold text-onyx/60 tracking-normal block mt-2">ONCE-OFF</span></div>
              </div>
           </motion.div>

           {/* Tier 3: Flicker */}
           <motion.div 
             className="bg-onyx border-2 border-spectral-white p-6 md:p-10 flex flex-col justify-between"
             whileHover={{ y: -10, boxShadow: "-10px 10px 0px 0px rgba(253, 253, 253, 1)" }}
             transition={{ type: "spring", stiffness: 400, damping: 20 }}
           >
             <div className="mb-12">
                <div className="flex justify-between items-start mb-6 border-b-2 border-spectral-white/20 pb-4">
                  <h2 className="text-4xl md:text-5xl font-black font-[family-name:var(--font-playfair)] text-spectral-white uppercase leading-[0.8]">Flicker</h2>
                  <span className="font-mono text-spectral-white/50 text-xs">[ TIER : 03 ]</span>
                </div>
                <h4 className="font-space-grotesk font-black text-xl text-spectral-white mb-2 uppercase tracking-wide bg-spectral-white/10 inline-block px-2">Digital Permanence</h4>
                <p className="font-space-grotesk text-spectral-white/80 mt-4 text-sm md:text-base">Global edge-network hosting, bespoke domain mapping, and zero compromise SSL security.</p>
             </div>
             <div>
                <div className="text-3xl md:text-5xl font-black font-space-grotesk text-spectral-white tracking-tighter">R150 <span className="text-base font-normal text-spectral-white/40 tracking-normal block mt-2">/ MONTH</span></div>
             </div>
           </motion.div>

        </div>
      </section>

      {/* Panel 3: The Standard / Action */}
      <section className="gsap-panel w-screen h-screen flex-shrink-0 flex items-center justify-center pointer-events-none relative overflow-hidden">
         {/* Brutalist structural background element */}
         <div className="absolute left-0 top-0 w-32 h-full border-r-4 border-signal-lime bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
         
         <div className="pointer-events-auto text-left md:text-center relative z-10 px-8">
            <h3 className="font-[family-name:var(--font-playfair)] font-bold text-signal-lime text-2xl md:text-4xl tracking-widest uppercase mb-2 border-b-4 border-signal-lime inline-block pb-2">THE STANDARD</h3>
            <h2 className="text-[12vw] md:text-[10rem] font-black font-[family-name:var(--font-playfair)] text-spectral-white uppercase leading-none hover:text-signal-lime transition-all duration-300 cursor-pointer tracking-tighter mix-blend-difference mt-4" style={{ WebkitTextStroke: "2px #FDFDFD", color: "transparent" }}>
              100/100
            </h2>
            <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-center gap-6">
              <p className="font-space-grotesk text-spectral-white/80 text-lg md:text-2xl font-bold uppercase tracking-widest max-w-xl text-left">
                Enterprise infrastructure.<br/>Fluid creative expression.
              </p>
              <button className="bg-signal-lime text-onyx font-[family-name:var(--font-playfair)] font-black text-2xl md:text-3xl px-8 py-4 uppercase hover:bg-spectral-white border-4 border-signal-lime hover:border-spectral-white transition-all transform hover:-translate-y-2 hover:shadow-[-8px_8px_0px_0px_rgba(253,253,253,0.3)]">
                Start Building.
              </button>
            </div>
         </div>
      </section>
    </div>
  );
}
