"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  threshold?: number;
  scale?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  duration = 0.8,
  threshold = 0.9,
  scale = 1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state with GSAP
    gsap.set(el, { y, opacity: 0, scale });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: `top ${threshold * 100}%`,
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease: "power4.out",
        });
        trigger.kill();
      },
    });

    return () => trigger.kill();
  }, [delay, y, duration, threshold, scale]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
