"use client";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative transition-transform duration-200 hover:scale-105"
      >
        {/* Outer hexagon */}
        <div
          className="absolute inset-0 bg-[var(--neo-cyan)]/5 animate-[spin_20s_linear_infinite]"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          >
            <path
              d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z"
              className="text-[var(--neo-cyan)]/30"
            />
          </svg>
        </div>

        {/* Inner circuit pattern */}
        <svg
          viewBox="0 0 100 100"
          className="w-12 h-12 relative z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {/* Central node */}
          <circle cx="50" cy="50" r="8" className="text-[var(--neo-cyan)]" fill="currentColor" />

          {/* Circuit lines */}
          <path
            d="M50 42 L50 25 M50 58 L50 75 M42 50 L25 50 M58 50 L75 50"
            className="text-[var(--neo-cyan)]/60 animate-[pulse_2s_ease-in-out_infinite]"
          />

          {/* Diagonal circuits */}
          <path
            d="M35 35 L65 65 M65 35 L35 65"
            className="text-[var(--neo-cyan)]/40 animate-[pulse_2.5s_ease-in-out_infinite]"
          />

          {/* Outer nodes */}
          <circle cx="50" cy="25" r="3" className="text-[var(--neo-cyan)]/80" />
          <circle cx="50" cy="75" r="3" className="text-[var(--neo-cyan)]/80" />
          <circle cx="25" cy="50" r="3" className="text-[var(--neo-cyan)]/80" />
          <circle cx="75" cy="50" r="3" className="text-[var(--neo-cyan)]/80" />

          {/* Corner nodes */}
          <circle cx="35" cy="35" r="2" className="text-[var(--neo-cyan)]/60" />
          <circle cx="65" cy="35" r="2" className="text-[var(--neo-cyan)]/60" />
          <circle cx="35" cy="65" r="2" className="text-[var(--neo-cyan)]/60" />
          <circle cx="65" cy="65" r="2" className="text-[var(--neo-cyan)]/60" />
        </svg>

        {/* Glowing effect */}
        <div
          className="absolute inset-0 bg-[var(--neo-cyan)]/20 blur-lg animate-[pulse_3s_ease-in-out_infinite]"
        />
      </div>

      {/* Logo text */}
      <div className="flex flex-col">
        <span
          className="text-xl font-bold tracking-tighter text-[var(--spectral-white)] transition-all duration-200 hover:tracking-[0.1em]"
        >
          BLACKLIGHT
        </span>
        <span
          className="text-[8px] font-mono tracking-[0.3em] text-[var(--neo-cyan)]/60 animate-[pulse_2s_ease-in-out_infinite]"
        >
          WEB DESIGNS
        </span>
      </div>
    </div>
  );
}
