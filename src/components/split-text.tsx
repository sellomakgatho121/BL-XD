"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  type?: "chars" | "words" | "lines";
  delay?: number;
  stagger?: number;
  scrollTrigger?: boolean;
  threshold?: number;
}

export default function SplitText({
  children,
  as: Tag = "h2",
  className = "",
  type = "lines",
  delay = 0,
  stagger = 0.04,
  scrollTrigger = true,
  threshold = 0.85,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Split text into words
    const words = children.split(" ");
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="split-word" style="display: inline-block; overflow: hidden; vertical-align: top; padding: 2px 0; margin: -2px 0;">
            <span class="split-word-inner" style="display: inline-block; transform: translateY(100%); opacity: 0; will-change: transform, opacity;">
              ${word}
            </span>
          </span>`
      )
      .join(" ");

    const innerSpans = el.querySelectorAll(".split-word-inner");

    if (scrollTrigger) {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: `top ${threshold * 100}%`,
        once: true,
        onEnter: () => {
          gsap.to(innerSpans, {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger,
            delay,
            ease: "power4.out",
          });
        },
      });

      return () => trigger.kill();
    } else {
      gsap.to(innerSpans, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger,
        delay,
        ease: "power4.out",
      });
    }
  }, [children, type, delay, stagger, scrollTrigger, threshold]);

  return (
    <Tag ref={containerRef as never} className={className}>
      {children}
    </Tag>
  );
}
