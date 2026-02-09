"use client";

import { useEffect, useRef } from "react";

interface CalendlyEmbedProps {
  url?: string;
  height?: string;
}

export default function CalendlyEmbed({ 
  url = "https://calendly.com/blacklight-web/strategy-session", 
  height = "700px" 
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      return;
    }

    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute("src", "https://assets.calendly.com/assets/external/widget.js");
    script.async = true;
    head?.appendChild(script);
  }, []);

  return (
    <div 
      className="calendly-inline-widget w-full border border-[var(--border)] bg-[var(--card)]" 
      data-url={url} 
      style={{ minWidth: "320px", height }} 
      ref={containerRef}
    />
  );
}
