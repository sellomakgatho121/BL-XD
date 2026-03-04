"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Terminal, Globe, Zap, Mail, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const zContext = useRef<any>(null);

  useGSAP(() => {
    if (!containerRef.current || !galleryRef.current) return;

    // Create a massive Z-axis pinning animation
    // The gallery container gets pinned, and its children move towards the camera (translateZ)

    // Initial setup: push elements far back in Z space
    gsap.set(".floating-block", {
      z: (i) => i * -2500 - 1000, // Stagger them much deeper into the screen to spread them out
      opacity: 0,
      scale: 0.8,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=10000", // Double the scroll distance for a longer, smoother flight
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // Animate all blocks flying forward
    tl.to(".floating-block", {
      z: 1000, // Fly past the camera
      opacity: 1,
      scale: 1.5,
      ease: "none",
      stagger: 0.75, // Increase stagger so they fly by one by one with more time in between
      duration: 4
    }, 0);

    // Initial hero text fades out as we start scrolling
    tl.to(".hero-text", {
      opacity: 0,
      y: -50,
      duration: 0.5
    }, 0);

  }, { scope: containerRef });

  return (
    <main className="relative bg-[var(--neo-white)] text-[var(--neo-black)] overflow-hidden selection:bg-[var(--neo-yellow)] selection:text-[var(--neo-black)] font-space-grotesk">

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(var(--neo-black) 1px, transparent 1px), linear-gradient(90deg, var(--neo-black) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* ━━━ NAVIGATION ━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-[var(--neo-black)] bg-[var(--neo-white)]">
        <div className="max-w-[1400px] mx-auto px-6 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--neo-yellow)] neo-border flex items-center justify-center neo-shadow">
              <span className="font-black text-xl">B</span>
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase hidden sm:block">
              Blacklight
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-2 bg-[var(--neo-pink)] text-[var(--neo-white)] font-bold uppercase tracking-wider neo-border neo-shadow-interactive flex items-center gap-2"
            >
              Get Quote
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ━━━ Cinematic Zero-Gravity Container ━━━ */}
      <div ref={containerRef} className="h-screen w-full relative perspective-[1000px] transform-view">

        {/* Initial Static Hero */}
        <div className="hero-text absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
          <div className="bg-[var(--neo-yellow)] neo-border neo-shadow p-4 mb-8 rotate-[-2deg] pointer-events-auto">
            <h2 className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <Terminal size={16} /> Elite Web Agency
            </h2>
          </div>

          <h1 className="text-[10vw] font-black leading-[0.85] tracking-tighter text-center uppercase mix-blend-difference text-[var(--neo-white)]" style={{ textShadow: '4px 4px 0 var(--neo-black)' }}>
            Break <br /> The Rules
          </h1>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="font-bold text-xs tracking-widest uppercase bg-[var(--neo-white)] border-2 border-[var(--neo-black)] px-4 py-1">Scroll to fly</span>
            <div className="w-1 h-16 bg-[var(--neo-black)] animate-pulse" />
          </div>
        </div>

        {/* Floating Narrative Elements in 3D Space */}
        <div ref={galleryRef} className="absolute inset-0 preserve-3d">

          {/* Block 1: Intro */}
          <div className="floating-block absolute top-[15%] left-[5%] md:left-[10%] w-[90vw] md:w-[400px] bg-[var(--neo-white)] neo-border neo-shadow p-8 rotate-[5deg]">
            <h3 className="text-4xl font-black uppercase mb-4">We Engineer Anomalies</h3>
            <p className="text-lg font-medium">Passive browsing is dead. We build cinematic, high-performance web experiences that refuse to blend in.</p>
          </div>

          {/* Block 2: Service - Spark */}
          <div className="floating-block absolute top-[5%] right-[5%] md:right-[15%] w-[85vw] md:w-[350px] bg-[var(--neo-yellow)] neo-border neo-shadow p-8 rotate-[-3deg]">
            <Zap size={32} className="mb-4" />
            <h3 className="text-3xl font-black uppercase mb-2">Landing Pages</h3>
            <p className="font-bold border-b-2 border-[var(--neo-black)] pb-4 mb-4">R3,500</p>
            <p className="text-sm font-medium">High-impact single-page sites for new ventures. Asymmetric technical layout, 48-hour delivery.</p>
          </div>

          {/* Block 3: Giant Image / Visual */}
          <div className="floating-block absolute top-[40%] left-[5%] md:left-[35%] w-[90vw] md:w-[500px] h-[300px] bg-[var(--neo-black)] neo-border neo-shadow overflow-hidden group rotate-[2deg]">
            <div className="absolute inset-0 bg-[var(--neo-pink)] opacity-50 mix-blend-multiply transition-opacity group-hover:opacity-0" />
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" alt="Cyberpunk Aesthetic" className="w-full h-full object-cover grayscale" />
            <div className="absolute top-4 left-4 bg-[var(--neo-white)] neo-border px-3 py-1 font-bold text-xs uppercase">Visual 01</div>
          </div>

          {/* Block 4: Brutal Statement */}
          <div className="floating-block absolute top-[65%] left-[5%] md:left-[10%] w-[90vw] md:w-[600px] bg-[var(--neo-blue)] text-[var(--neo-white)] neo-border neo-shadow p-8 md:p-10 rotate-[-1deg]">
            <h2 className="text-6xl md:text-[5rem] leading-[0.9] font-black uppercase tracking-tighter">
              No<br />Templates.
            </h2>
            <div className="mt-6 font-bold text-xl md:ml-20 bg-[var(--neo-white)] text-[var(--neo-black)] inline-block px-4 py-2 neo-border">
              Just Raw Code.
            </div>
          </div>

          {/* Block 5: Service - Growth */}
          <div className="floating-block absolute top-[75%] right-[5%] md:right-[10%] w-[90vw] md:w-[400px] bg-[var(--neo-white)] neo-border neo-shadow p-8 rotate-[4deg]">
            <Globe size={32} className="mb-4 text-[var(--neo-blue)]" />
            <h3 className="text-3xl font-black uppercase mb-2">Business Sites</h3>
            <p className="font-bold border-b-2 border-[var(--neo-black)] pb-4 mb-4">R8,500</p>
            <p className="text-sm font-medium mb-6">Professional 3-5 page presence for established SMEs. Custom design system with SEO foundation.</p>
            <button className="w-full py-3 bg-[var(--neo-black)] text-[var(--neo-white)] font-bold uppercase transition-transform hover:-translate-y-1">Select Tier</button>
          </div>

          {/* Block 6: Contact floating CTA */}
          <div className="floating-block absolute top-[25%] left-[50%] -translate-x-1/2 w-[95vw] md:w-[50vw] bg-[var(--neo-pink)] text-[var(--neo-black)] neo-border neo-shadow p-8 md:p-12 text-center rotate-[-2deg]">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">Ready to Reveal Brilliance?</h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-6 md:px-10 py-5 bg-[var(--neo-white)] text-[var(--neo-black)] font-black text-lg md:text-xl uppercase tracking-wider neo-border neo-shadow-interactive"
            >
              Initiate Sequence
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* ━━━ Normal Flow Content below the flight ━━━ */}
      <section className="py-32 relative z-10 bg-[var(--neo-white)] border-t-4 border-[var(--neo-black)]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter mb-16 border-b-8 border-[var(--neo-black)] pb-4 inline-block">
            The Method
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: "01", title: "Discovery", desc: "We reverse-engineer what your market expects — then design the opposite." },
              { id: "02", title: "Architecture", desc: "Every pixel placement is intentional, every interaction maps to a conversion goal." },
              { id: "03", title: "Build", desc: "Performance-first engineering with React, Next.js, and raw GSAP power." },
              { id: "04", title: "Launch", desc: "We measure real performance metrics, not vanity numbers." }
            ].map((step, i) => (
              <div key={step.id} className="bg-[var(--neo-white)] neo-border neo-shadow p-8 relative">
                <div className="absolute -top-6 -left-6 bg-[var(--neo-yellow)] neo-border w-16 h-16 flex items-center justify-center font-black text-2xl neo-shadow rotate-[-6deg]">
                  {step.id}
                </div>
                <h3 className="text-2xl font-black uppercase mt-8 mb-4">{step.title}</h3>
                <p className="font-medium text-lg border-t-2 border-dashed border-[var(--neo-black)] pt-4">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="border-t-4 border-[var(--neo-black)] bg-[var(--neo-yellow)] pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--neo-white)] neo-border flex items-center justify-center neo-shadow">
                  <span className="font-black text-2xl">B</span>
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase">
                  Blacklight
                </span>
              </div>
              <p className="text-lg font-bold max-w-xs">
                Revealing unseen brilliance.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-black uppercase mb-6 bg-[var(--neo-black)] text-[var(--neo-white)] inline-block px-3 py-1">Contact</h4>
              <a href="mailto:hello@blacklight.co.za" className="text-lg font-bold hover:underline flex items-center gap-2 mb-4">
                <Mail size={20} /> hello@blacklight.co.za
              </a>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-[var(--neo-white)] neo-border neo-shadow-interactive flex items-center justify-center">
                  <Github size={24} />
                </a>
                <a href="#" className="w-12 h-12 bg-[var(--neo-blue)] text-[var(--neo-white)] neo-border neo-shadow-interactive flex items-center justify-center">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="w-12 h-12 bg-[var(--neo-pink)] text-[var(--neo-black)] neo-border neo-shadow-interactive flex items-center justify-center">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t-4 border-[var(--neo-black)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-bold text-sm uppercase">
              © 2026 Blacklight Web Designs
            </p>
            <p className="font-bold text-sm uppercase bg-[var(--neo-white)] px-4 py-2 neo-border">
              Designed in South Africa
            </p>
          </div>
        </div>
      </footer>

      {/* Required CSS for the 3D aspect */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-\\[1000px\\] {
          perspective: 1000px;
        }
        .transform-view {
          transform-style: preserve-3d;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}} />
    </main>
  );
}
