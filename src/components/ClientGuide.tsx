"use client";

import { useState, useEffect, useCallback } from "react";
import { HelpCircle, Sparkles, Mouse, Mail } from "lucide-react";

const quirkyTips = [
  {
    icon: Mouse,
    title: "Control Your Interface",
    description: "Move your mouse around the quantum field above. See how it responds? That's you controlling the digital energy!",
    position: "top-4 right-4"
  },
  {
    icon: Sparkles,
    title: "Watch the System Messages",
    description: "Those dynamic messages that change? They're hinting at something amazing coming soon. Hover over them for extra effects!",
    position: "top-4 left-4"
  },
  {
    icon: Mail,
    title: "Get Notified First",
    description: "Down below, there's a notification portal (newsletter form). Enter your email to get launch updates when we go live!",
    position: "bottom-4 right-4"
  },
  {
    icon: HelpCircle,
    title: "Countdown to Launch",
    description: "The numbers ticking down? That's when the system goes live. Mark your calendar for the big reveal!",
    position: "bottom-4 left-4"
  }
];

export default function ClientGuide() {
  const [activeTip, setActiveTip] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % quirkyTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowGuide(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 6;
    const y = ((e.clientX - rect.left - rect.width / 2) / rect.width) * -6;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  if (!showGuide) return null;

  const currentTip = quirkyTips[activeTip];
  const Icon = currentTip.icon;

  return (
    <div
      className={`fixed ${currentTip.position} z-40 max-w-xs opacity-80`}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative transition-transform duration-200"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subtle Glow Effect */}
        <div className="absolute -inset-1 bg-signal-lime/5 blur-sm rounded-lg animate-pulse" />

        {/* Main Content */}
        <div className="relative bg-onyx/80 backdrop-blur-sm border border-signal-lime/20 rounded-lg p-3 shadow-lg">
          {/* Close Button */}
          <button
            onClick={() => setShowGuide(false)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-spectral-white/20 hover:bg-spectral-white/30 rounded-full flex items-center justify-center text-spectral-white/60 text-xs transition-colors"
          >
            ×
          </button>

          {/* Icon */}
          <div className="flex items-center gap-2 mb-2">
            <Icon className="text-signal-lime/60" size={14} />
            <span className="text-xs font-mono text-signal-lime/60 font-bold">
              TIP #{activeTip + 1}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-spectral-white/90 mb-1 font-mono">
            {currentTip.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-spectral-white/50 leading-relaxed">
            {currentTip.description}
          </p>

          {/* Progress Indicator */}
          <div className="flex gap-1 mt-3 justify-center">
            {quirkyTips.map((_, idx) => (
              <div key={idx} className="h-1 w-4 bg-spectral-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-signal-lime transition-transform duration-500"
                  style={{
                    transform: idx === activeTip ? "translateX(0%)" : idx < activeTip ? "translateX(100%)" : "translateX(-100%)"
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
