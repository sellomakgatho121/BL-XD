"use client";

import { useEffect, useRef, useState } from "react";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Page load animation sequence:
    // 1. Logo scales up with clip-path reveal (0s-1.2s)
    // 2. Hold briefly (1.2s-1.6s)
    // 3. Logo fades up and out (1.6s-2.4s)
    // 4. Container slides away (2.4s-3.2s)
    // 5. Remove from DOM

    const container = containerRef.current;
    if (!container) return;

    const logo = container.querySelector(".loader-logo") as HTMLElement;
    const bg = container.querySelector(".loader-bg") as HTMLElement;

    if (!logo || !bg) {
      setDone(true);
      return;
    }

    let cancelled = false;

    const run = async () => {
      // Step 1: Logo reveal — scale up + clip-path
      await new Promise((r) => setTimeout(r, 100));
      if (cancelled) return;
      logo.style.opacity = "1";
      logo.style.transform = "scale(1)";
      logo.style.clipPath = "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)";

      // Step 2: Hold
      await new Promise((r) => setTimeout(r, 800));
      if (cancelled) return;

      // Step 3: Logo moves up and fades
      logo.style.transform = "scale(1) translateY(-20px)";
      logo.style.opacity = "0";

      // Step 4: Background fades out
      await new Promise((r) => setTimeout(r, 400));
      if (cancelled) return;
      bg.style.opacity = "0";

      // Step 5: Done
      await new Promise((r) => setTimeout(r, 600));
      if (cancelled) return;
      setDone(true);
    };

    run();

    // Fallback: force remove after 5s
    const fallback = setTimeout(() => setDone(true), 5000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      {/* Background */}
      <div
        className="loader-bg absolute inset-0 bg-bl-deep transition-opacity duration-700"
        style={{ opacity: 1 }}
      />

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/logo-nav-gold.png"
          alt="Loading..."
          className="loader-logo w-16 h-16"
          style={{
            opacity: 0,
            transform: "scale(0.8)",
            clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)",
            transition: "all 0.8s cubic-bezier(0.65, 0.05, 0, 1)",
          }}
        />
      </div>
    </div>
  );
}
