"use client";

import { useState, useEffect } from "react";
import { Monitor, Rocket } from "lucide-react";

export default function DevModeSwitcher() {
  const [mode, setMode] = useState<"main" | "coming-soon">("main");

  useEffect(() => {
    // Check local storage or cookie for preference
    const storedMode = localStorage.getItem("dev_site_mode") as "main" | "coming-soon";
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === "main" ? "coming-soon" : "main";
    setMode(newMode);
    localStorage.setItem("dev_site_mode", newMode);
    window.location.reload(); // Reload to apply change in page.tsx
  };

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <button
      onClick={toggleMode}
      className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2 px-4 py-2 bg-onyx border border-signal-lime/50 text-signal-lime rounded-full font-mono text-xs shadow-lg hover:bg-signal-lime/10 transition-all hover:scale-105"
    >
      {mode === "main" ? <Monitor size={14} /> : <Rocket size={14} />}
      <span>DEV: {mode === "main" ? "MAIN SITE" : "COMING SOON"}</span>
    </button>
  );
}
