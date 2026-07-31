"use client";

import { useRef } from "react";

interface MarqueeScrollProps {
  text: string;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  color?: string;
}

export default function MarqueeScroll({
  text,
  direction = "left",
  speed = 30,
  className = "",
  color = "text-bl-gold/10",
}: MarqueeScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  const content = (
    <div className="flex items-center gap-6 whitespace-nowrap">
      {words.map((word, i) => (
        <span key={i} className="text-5xl md:text-7xl font-bold uppercase tracking-tight">
          {word}
          <span className="inline-block w-6 h-6 rounded-full border border-current mx-6 align-middle" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className={`flex ${color}`}
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {content}
        {content}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
