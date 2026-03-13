"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, Activity } from "lucide-react";

const MetricBar = ({ label, value, color, icon: Icon }: any) => (
  <div className="flex flex-col gap-1 w-full">
    <div className="flex justify-between text-[10px] uppercase font-mono tracking-wider text-spectral-white/60">
      <span className="flex items-center gap-1"><Icon size={10} /> {label}</span>
      <span>{Math.round(value)}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 100 }}
      />
    </div>
  </div>
);

export default function CognitiveAnalyzer() {
  const [text, setText] = useState("");
  const [metrics, setMetrics] = useState({ sentiment: 50, complexity: 0, urgency: 0 });

  useEffect(() => {
    if (!text) {
      setMetrics({ sentiment: 50, complexity: 0, urgency: 0 });
      return;
    }

    const words = text.split(/\s+/).filter(w => w.length > 0);
    const complexWords = words.filter(w => w.length > 8).length;
    const urgencyWords = ["now", "fast", "asap", "urgent", "immediate", "today", "alert", "critical"].some(w => text.toLowerCase().includes(w));
    const positiveWords = ["good", "great", "excellent", "amazing", "love", "best", "perfect"].filter(w => text.toLowerCase().includes(w)).length;
    const negativeWords = ["bad", "terrible", "worst", "hate", "slow", "broken", "error"].filter(w => text.toLowerCase().includes(w)).length;

    setMetrics({
      sentiment: Math.min(100, Math.max(0, 50 + (positiveWords * 10) - (negativeWords * 10))),
      complexity: Math.min(100, (complexWords / (words.length || 1)) * 300),
      urgency: urgencyWords ? 90 : Math.min(100, (text.match(/!/g) || []).length * 20),
    });
  }, [text]);

  return (
    <div className="relative h-96 w-full max-w-sm rounded-xl bg-onyx/40 border border-white/10 overflow-hidden flex flex-col backdrop-blur-sm">
      <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="text-purple-400" size={16} />
          <span className="text-xs font-bold text-white tracking-widest">COGNITIVE_ANALYZER</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Input raw data stream for analysis..."
            className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-sm font-mono text-white/80 focus:outline-none focus:border-purple-500/50 transition-colors resize-none placeholder:text-white/20"
            spellCheck={false}
          />
          <div className="absolute bottom-2 right-2 text-[10px] text-white/30 font-mono">
            {text.length} CHARS
          </div>
        </div>

        <div className="space-y-4">
          <MetricBar label="Sentiment" value={metrics.sentiment} color="bg-blue-500" icon={Activity} />
          <MetricBar label="Complexity" value={metrics.complexity} color="bg-purple-500" icon={Brain} />
          <MetricBar label="Urgency" value={metrics.urgency} color="bg-siren-red" icon={Zap} />
        </div>
      </div>
      
      <AnimatePresence>
        {text.length > 0 && (
          <motion.div
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-purple-500/50 blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
