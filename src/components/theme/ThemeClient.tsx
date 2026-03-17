"use client";

import * as React from "react";
import { THEMES, type ThemeName, isThemeName } from "@/lib/theme";

const STORAGE_KEY = "blxd-theme";

export function ThemeClient({ defaultTheme = "mono-lab" }: { defaultTheme?: ThemeName }) {
  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const theme = stored && isThemeName(stored) ? stored : defaultTheme;
    document.documentElement.dataset.theme = theme;
  }, [defaultTheme]);

  return null;
}

export function ThemePicker() {
  const [theme, setTheme] = React.useState<ThemeName>("mono-lab");

  React.useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current && isThemeName(current)) setTheme(current);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => {
            document.documentElement.dataset.theme = t;
            window.localStorage.setItem(STORAGE_KEY, t);
            setTheme(t);
          }}
          className={`px-3 py-2 border text-[11px] font-mono uppercase tracking-[0.18em] transition-colors ${
            theme === t
              ? "border-white text-white bg-white/5"
              : "border-white/10 text-white/65 hover:text-white hover:border-white/25 hover:bg-white/5"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function MotionBadge() {
  const [motion, setMotion] = React.useState<string | null>(null);

  React.useEffect(() => {
    const v = document.documentElement.dataset.motion ?? null;
    setMotion(v);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 border border-white/10 px-3 py-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">motion</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white">
        {motion ?? "default"}
      </span>
    </div>
  );
}

