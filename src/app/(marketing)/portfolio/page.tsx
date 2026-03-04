"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";

// Windows (Trends) imports
import Window1 from "./windows/Window1";
import Window2 from "./windows/Window2";
import Window3 from "./windows/Window3";
import Window4 from "./windows/Window4";
import Window5 from "./windows/Window5";
import Window6 from "./windows/Window6";
import Window7 from "./windows/Window7";
import Window8 from "./windows/Window8";
import Window9 from "./windows/Window9";
import Window10 from "./windows/Window10";
import Window11 from "./windows/Window11";
import Window12 from "./windows/Window12";

// Mock Windows (I will create these next)
export default function PortfolioGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !wrapperRef.current) return;

    // Desktop horizontal scroll mapping
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Calculate total scroll distance based on total width - viewport width
      const totalWidth = wrapperRef.current!.scrollWidth - window.innerWidth;

      const tl = gsap.to(wrapperRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (12), // 13 panels total (0 index + 12 windows), 1 / 12
            duration: { min: 0.2, max: 0.8 },
            ease: "power1.inOut"
          },
          end: () => `+=${totalWidth}`
        }
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <main className="bg-[var(--neo-black)] text-[var(--neo-white)] font-space-grotesk overflow-x-hidden min-h-screen">
      {/* ━━━ Header ━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-[var(--neo-white)] bg-[var(--neo-black)] text-[var(--neo-white)]">
        <div className="mx-auto px-6 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--neo-yellow)] text-[var(--neo-black)] border-4 border-[var(--neo-white)] flex items-center justify-center">
              <span className="font-black text-xl">B</span>
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase hidden sm:block">
              Archive
            </span>
          </Link>

          <Link
            href="/"
            className="px-6 py-2 bg-[var(--neo-white)] text-[var(--neo-black)] font-bold uppercase tracking-wider border-4 border-[var(--neo-black)] hover:bg-[var(--neo-pink)] transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Exit Gallery
          </Link>
        </div>
      </nav>

      <div ref={containerRef} className="h-screen flex items-center relative overflow-hidden will-change-transform bg-[var(--neo-black)]">

        {/* Horizontal Scrolling Wrapper */}
        <div ref={wrapperRef} className="flex h-full w-[1300vw] lg:w-max pt-[70px]">

          {/* Main Title slide */}
          <section
            ref={(el: HTMLElement | null) => { panelsRef.current[0] = el; }}
            className="w-screen h-full flex items-center justify-center p-12 shrink-0 border-r-4 border-[var(--neo-white)] relative bg-gradient-to-br from-[var(--neo-black)] to-[var(--neo-blue)]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black opacity-[0.03] whitespace-nowrap pointer-events-none text-[var(--neo-white)]">
              EXHIBIT_01
            </div>
            <div className="relative z-10 text-center">
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter mb-8 leading-none drop-shadow-[5px_5px_0px_var(--neo-pink)]">
                <GlitchText text="The" intensity="low" />
                <br />
                <span className="text-[var(--neo-yellow)]">Gallery</span>
              </h1>
              <p className="text-2xl font-bold max-w-2xl mx-auto p-4 bg-[var(--neo-white)] text-[var(--neo-black)] border-4 border-[var(--neo-black)] shadow-[8px_8px_0px_var(--neo-blue)] rotate-1">
                A functional exhibition of 12 distinct interactive design anomalies. Scroll right to begin the sequence.
              </p>
            </div>
          </section>

          {/* 12 Interactive Windows Containers */}
          {[
            { id: "Window1", title: "01. Modular Design & CSS Grids", comp: <Window1 /> },
            { id: "Window2", title: "02. Playful Design", comp: <Window2 /> },
            { id: "Window3", title: "03. Gamification", comp: <Window3 /> },
            { id: "Window4", title: "04. Anti-Design", comp: <Window4 /> },
            { id: "Window5", title: "05. 3D & 2D-3D Hybrid", comp: <Window5 /> },
            { id: "Window6", title: "06. Dynamic Gradients", comp: <Window6 /> },
            { id: "Window7", title: "07. Hand-Drawn Illustrations", comp: <Window7 /> },
            { id: "Window8", title: "08. Brutalism", comp: <Window8 /> },
            { id: "Window9", title: "09. Gen Z Design", comp: <Window9 /> },
            { id: "Window10", title: "10. Modern Minimalism", comp: <Window10 /> },
            { id: "Window11", title: "11. Variable Fonts", comp: <Window11 /> },
            { id: "Window12", title: "12. Bento Grids", comp: <Window12 /> },
          ].map((item, index) => (
            <section
              key={index + 1}
              ref={(el: HTMLElement | null) => { panelsRef.current[index + 1] = el; }}
              className="w-screen h-[calc(100vh-70px)] shrink-0 border-r-4 border-[var(--neo-white)] relative overflow-hidden bg-[var(--neo-black)] flex flex-col items-center justify-center p-0"
            >
              {/* Exhibit Number Overlay */}
              <div className="absolute top-12 left-12 z-50 pointer-events-none hidden md:block">
                <div className="bg-[var(--neo-white)] text-[var(--neo-black)] font-black text-2xl md:text-3xl uppercase px-4 py-2 border-4 border-[var(--neo-black)] shadow-[6px_6px_0px_var(--neo-pink)] rotate-[-2deg]">
                  {item.title}
                </div>
              </div>

              {/* The Component container - taking full space needed */}
              <div className={`w-full h-full relative flex items-center justify-center`}>
                {item.comp}
              </div>
            </section>
          ))}

        </div>
      </div>
    </main>
  );
}
