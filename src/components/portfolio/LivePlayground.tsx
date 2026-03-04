"use client";

import { useState } from "react";
import { RefreshCw, Code, Eye, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const presets = {
  neon: `
--primary: #D7FF00;
--text: #000000;
--border-width: 0px;
--radius: 0px;
--shadow: 0 0 20px rgba(215, 255, 0, 0.5);
  `.trim(),
  cyber: `
--primary: #00CCFF;
--text: #000000;
--border-width: 2px;
--radius: 0px;
--shadow: 4px 4px 0px rgba(0,0,0,0.5);
  `.trim(),
  minimal: `
--primary: #FFFFFF;
--text: #000000;
--border-width: 1px;
--radius: 8px;
--shadow: 0 4px 12px rgba(0,0,0,0.1);
  `.trim(),
};

export default function LivePlayground() {
  const [code, setCode] = useState(presets.neon);
  const [activePreset, setActivePreset] = useState("neon");

  const style = code.split('\n').reduce((acc, line) => {
    const [key, val] = line.split(':');
    if (key && val) {
      const cleanKey = key.trim();
      const cleanVal = val.trim().replace(';', '');
      (acc as any)[cleanKey] = cleanVal;
    }
    return acc;
  }, {} as React.CSSProperties);

  return (
    <div className="border border-[var(--border)] bg-[var(--onyx)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-[var(--signal-lime)]" />
          <span className="text-xs font-mono uppercase tracking-wider">Live CSS Editor</span>
        </div>
        <div className="flex gap-2">
          {Object.keys(presets).map(preset => (
            <button
              key={preset}
              onClick={() => {
                setCode(presets[preset as keyof typeof presets]);
                setActivePreset(preset);
              }}
              className={`px-2 py-1 text-[10px] uppercase font-mono border transition-colors ${activePreset === preset
                ? "border-[var(--signal-lime)] text-[var(--signal-lime)]"
                : "border-[var(--border)] text-[var(--spectral-dim)] hover:text-white"
                }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 h-80">
        <div className="relative border-r border-[var(--border)] group">
          <textarea
            value={code}
            onChange={e => {
              setCode(e.target.value);
              setActivePreset("custom");
            }}
            className="w-full h-full bg-[var(--onyx)] p-4 font-mono text-sm text-[var(--spectral-white)] focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-[var(--spectral-dim)] font-mono">Editable</span>
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-[var(--card)] overflow-hidden">
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />

          <button
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--text)',
              border: 'var(--border-width) solid var(--text)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow)',
              ...style
            } as any}
            className="px-8 py-4 font-bold uppercase tracking-wider min-w-[200px] transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Hover Me
          </button>
        </div>
      </div>
    </div>
  );
}
