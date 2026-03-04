"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

const mysteryMessages = [
  {
    title: "INNOVATION",
    hint: "Intelligent systems that evolve",
    glitch: "01001001 01101110 01101110 01101111 01110110 01100001 01110100 01101001 01101111 01101110"
  },
  {
    title: "PRECISION",
    hint: "Where code meets creativity",
    glitch: "01010000 01110010 01100101 01100011 01101001 01110011 01101001 01101111 01101110"
  },
  {
    title: "EVOLUTION",
    hint: "Next-generation web experiences",
    glitch: "01000101 01110110 01101111 01101100 01110101 01110101 01110101 01101111 01101110 01110011"
  }
];

const quirkyMessages = [
  {
    text: "Can't wait? Me too...",
    joke: "Our devs are writing code so fast, their keyboards are smoking. Fire department is on standby.",
    followUp: "How long would YOU wait for something amazing?"
  },
  {
    text: "What's taking them so long?!",
    joke: "Plot twist: The developer is currently stuck in a Stack Overflow rabbit hole from 2019.",
    followUp: "Ever fallen into a Wikipedia hole at 3am? Same energy."
  },
  {
    text: "Is it ready yet? How about now?",
    joke: "We've got 99 problems and 404 of them are 'page not found' errors.",
    followUp: "Patience is a virtue... that nobody has anymore, right?"
  },
  {
    text: "Refresh again. I dare you.",
    joke: "Fun fact: Every time you refresh, a developer somewhere loses 5 minutes of sleep.",
    followUp: "How many times have you refreshed today? Be honest."
  },
  {
    text: "The anticipation is killing me!",
    joke: "Our lead developer just discovered CSS Grid and hasn't slept in 3 days. Worth it? Absolutely.",
    followUp: "What's the last thing you got really excited about?"
  },
  {
    text: "Soon™ - Every developer ever",
    joke: "We're not late, we're just operating on 'developer time' where deadlines are suggestions.",
    followUp: "Do YOU run early, on time, or fashionably late?"
  },
  {
    text: "Building the future... slowly.",
    joke: "Rome wasn't built in a day, but this website? We're trying. Give us two days.",
    followUp: "What's something great that took longer than expected but was worth it?"
  },
  {
    text: "Good things come to those who wait!",
    joke: "Unless you're waiting for a JavaScript framework to load. Then it's just suffering.",
    followUp: "What's the best thing you've ever waited for?"
  },
  {
    text: "Pssst... want a sneak peek?",
    joke: "Just kidding! Our NDA is tighter than our code reviews. And those are BRUTAL.",
    followUp: "Are you patient or do you peek at birthday presents early?"
  },
  {
    text: "ETA: When it's ready ¯\\_(ツ)_/¯",
    joke: "Funny how 'almost done' in developer-speak means anywhere from 2 hours to 2 weeks.",
    followUp: "Ever given an estimate that was hilariously wrong?"
  }
];

const generateBinaryRain = (count: number) => {
  return Array.from({ length: count }, () => ({
    char: Math.random() > 0.5 ? "1" : "0",
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
  }));
};

const generateFloatingParticles = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    animateX: Math.random() * 200 - 100,
    animateY: Math.random() * 200 - 100,
    duration: 4 + Math.random() * 2,
    delay: Math.random() * 2,
  }));
};

export default function MysteryReveal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [quirkyIndex, setQuirkyIndex] = useState(-1); // -1 means showing default button
  const [showJoke, setShowJoke] = useState(false);
  // Generate random data once - reduced counts for performance
  const binaryRain = useMemo(() => generateBinaryRain(12), []);
  const floatingParticles = useMemo(() => generateFloatingParticles(5), []);

  // Simple mouse position tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRevealing(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mysteryMessages.length);
        setIsRevealing(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const handleButtonClick = () => {
    // Cycle to next quirky message
    const nextIndex = (quirkyIndex + 1) % quirkyMessages.length;
    setQuirkyIndex(nextIndex);
    setShowJoke(false);

    // Show joke after a brief delay for comedic timing
    setTimeout(() => {
      setShowJoke(true);
    }, 800);
  };

  const current = mysteryMessages[currentIndex];
  const currentQuirky = quirkyIndex >= 0 ? quirkyMessages[quirkyIndex] : null;

  return (
    <div
      className="relative mt-16 mb-12 p-8 overflow-hidden transition-all duration-300"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 255, 0, 0.05) 0%, transparent 50%)`,
      }}
    >
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--neo-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neo-cyan) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Glitch Overlay (CSS based) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--neo-cyan)]/10 to-transparent animate-[pan_3s_linear_infinite]" />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Binary Rain Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {binaryRain.map((drop, i) => (
            <div
              key={i}
              className="absolute text-[var(--neo-cyan)]/10 font-mono text-xs animate-[rain_linear_infinite]"
              style={{
                left: `${drop.left}%`,
                animationDuration: `${drop.duration}s`,
                animationDelay: `${drop.delay}s`
              }}
            >
              {drop.char}
            </div>
          ))}
        </div>

        {/* Title */}
        <h2 className={`text-4xl md:text-6xl font-black tracking-tighter font-mono mb-4 transition-all duration-500 ${isRevealing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <span className="inline-block text-[var(--neo-cyan)]">
            {current.title}
          </span>
        </h2>

        {/* Glitch Text */}
        <div className={`font-mono text-xs text-spectral-white/20 mb-6 tracking-widest transition-opacity duration-300 ${isRevealing ? 'opacity-0' : 'opacity-30'}`}>
          {current.glitch}
        </div>

        {/* Hint */}
        <p className={`text-lg md:text-xl text-spectral-white/70 font-light tracking-wide mb-8 transition-all duration-500 delay-100 ${isRevealing ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {current.hint}
        </p>

        {/* Quirky Message Display */}
        {currentQuirky && (
          <div className="mb-4 px-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-lg md:text-xl text-[var(--neo-red)] font-mono tracking-wide">
              {currentQuirky.text}
            </p>

            {showJoke && (
              <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-400">
                <p className="text-sm md:text-base text-[var(--neo-cyan)]/80 italic">
                  {currentQuirky.joke}
                </p>
                <p className="text-xs text-[var(--neo-black)]/50 mt-2 font-mono">
                  {currentQuirky.followUp}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="relative inline-block mt-4">
          {/* Neon Glow effect */}
          <div className="absolute inset-0 bg-[var(--neo-cyan)]/20 blur-xl animate-pulse" />

          <button
            onClick={handleButtonClick}
            className="relative px-8 py-3 bg-[var(--neo-black)] text-[var(--neo-cyan)] font-mono text-sm tracking-widest uppercase transition-transform hover:-translate-y-1 active:translate-y-0 hover:scale-105 active:scale-95 border-2 border-[var(--neo-cyan)] shadow-[4px_4px_0px_var(--neo-cyan)] hover:shadow-none"
          >
            <span className="relative z-10 font-bold">
              {currentQuirky ? "CLICK FOR MORE IMPATIENCE" : "AWAITING LAUNCH"}
            </span>
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex gap-2 justify-center mt-12">
          {mysteryMessages.map((_, idx) => (
            <div key={idx} className="h-1 w-8 bg-[var(--neo-black)]/20 overflow-hidden relative">
              <div
                className={`absolute inset-y-0 left-0 bg-[var(--neo-cyan)] transition-all duration-500 ${idx === currentIndex ? "w-full" : "w-0"
                  }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
