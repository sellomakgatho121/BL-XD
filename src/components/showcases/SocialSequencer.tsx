"use client";

import { useState, useEffect } from "react";
import { AudioWaveform, Share2, Mail, Twitter, Linkedin, Instagram } from "lucide-react";

const CHANNELS = [
  { id: "x", icon: Twitter, color: "text-blue-400", bg: "bg-blue-400" },
  { id: "li", icon: Linkedin, color: "text-blue-600", bg: "bg-blue-600" },
  { id: "ig", icon: Instagram, color: "text-pink-500", bg: "bg-pink-500" },
  { id: "em", icon: Mail, color: "text-[var(--signal-lime)]", bg: "bg-[var(--signal-lime)]" },
];

const STEPS = 8;

export default function SocialSequencer() {
  const [sequence, setSequence] = useState<boolean[][]>(
    Array(4).fill(null).map(() => Array(STEPS).fill(false))
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize with a cool pattern
  useEffect(() => {
    const pattern = [
      [true, false, false, true, false, false, true, false],
      [false, true, false, false, false, true, false, false],
      [false, false, true, false, true, false, false, true],
      [true, false, false, false, false, false, false, true],
    ];
    setSequence(pattern);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % STEPS);
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const toggleStep = (row: number, col: number) => {
    const newSeq = [...sequence];
    newSeq[row][col] = !newSeq[row][col];
    setSequence(newSeq);
  };

  return (
    <div className="relative h-96 w-full max-w-sm rounded-xl bg-[var(--onyx)]/40 border border-[var(--neo-white)]/10 overflow-hidden flex flex-col backdrop-blur-sm">
      <div className="p-4 border-b border-[var(--neo-white)]/5 bg-[var(--neo-white)]/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AudioWaveform className="text-[var(--signal-lime)]" size={16} />
          <span className="text-xs font-bold text-[var(--neo-white)] tracking-widest">RHYTHM_SEQUENCER</span>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-3 py-1 text-[10px] font-mono rounded border transition-colors ${isPlaying
              ? "bg-[var(--signal-lime)] text-[var(--neo-black)] border-[var(--signal-lime)]"
              : "bg-transparent text-[var(--neo-white)]/60 border-[var(--neo-white)]/20 hover:border-[var(--neo-white)]/40"
            }`}
        >
          {isPlaying ? "STOP" : "PLAY LOOP"}
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center gap-4">
        {CHANNELS.map((channel, rowIdx) => (
          <div key={channel.id} className="flex items-center gap-3">
            <channel.icon size={14} className={`${channel.color} opacity-80`} />
            <div className="flex-1 grid grid-cols-8 gap-1.5">
              {sequence[rowIdx].map((isActive, colIdx) => (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  onClick={() => toggleStep(rowIdx, colIdx)}
                  className={`h-6 rounded-sm transition-all relative overflow-hidden active:scale-90 ${isActive ? channel.bg : "bg-[var(--neo-white)]/5"
                    } ${colIdx === currentStep && isPlaying ? "brightness-150 ring-1 ring-[var(--neo-white)]/50" : ""}`}
                >
                  {isActive && colIdx === currentStep && isPlaying && (
                    <div
                      key={`flash-${currentStep}`} // Force re-render of animation
                      className="absolute inset-0 bg-[var(--neo-white)]/80 animate-out fade-out duration-300 fill-mode-forwards pointer-events-none"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[var(--neo-white)]/5 bg-[#000000]/20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--neo-white)]/40">
            <Share2 size={10} />
            <span>CROSS_CHANNEL_SYNC</span>
          </div>
          <div className="flex gap-1 items-center h-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-[var(--signal-lime)]/50 ${isPlaying ? 'animate-[bounce_0.8s_infinite]' : 'h-1'}`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  height: isPlaying ? '100%' : '4px'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
