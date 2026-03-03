"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";

// Generate random values once during component mount
const generateRandomValues = (count: number, min: number, max: number) => {
  return Array.from({ length: count }, () => Math.random() * (max - min) + min);
};

const generateParticleData = (count: number) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      animateX: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
      animateY: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    });
  }
  return particles;
};

// Optimized RAF game loop using refs
const useGameLoop = (callback: () => void, isActive: boolean, intervalMs: number = 50) => {
  const callbackRef = useRef(callback);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive) return;

    const loop = (timestamp: number) => {
      if (timestamp - lastTimeRef.current >= intervalMs) {
        lastTimeRef.current = timestamp;
        callbackRef.current();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, intervalMs]);
};

// Mobile endless runner game component
const QuantumRunnerGame = ({ isActive }: { isActive: boolean }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Game refs for high-performance updates
  const playerRef = useRef({ y: 50, velocity: 0, isJumping: false });
  const obstaclesRef = useRef<Array<{ id: number; x: number; width: number; height: number; type: 'wall' | 'gap' }>>([]);
  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const gameStateRef = useRef<'start' | 'playing' | 'gameover'>('start');

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Constants
  const GRAVITY = 0.6;
  const JUMP_FORCE = -10;
  const SPEED = 0.5; // Base speed multiplier
  const SPAWN_RATE = 1500; // ms

  // Render state (for React updates)
  const [renderTrigger, setRenderTrigger] = useState(0);

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    scoreRef.current = 0;
    playerRef.current = { y: 50, velocity: 0, isJumping: false };
    obstaclesRef.current = [];
    lastTimeRef.current = performance.now();
    
    // Initial obstacle
    spawnObstacle();
    
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const spawnObstacle = () => {
    const type = Math.random() > 0.5 ? 'wall' : 'gap';
    obstaclesRef.current.push({
      id: Date.now(),
      x: 100,
      width: 10,
      height: type === 'wall' ? 30 : 40,
      type
    });
  };

  const gameLoop = (time: number) => {
    if (gameStateRef.current !== 'playing') return;

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    // Physics Update
    const player = playerRef.current;
    
    // Gravity
    player.velocity += GRAVITY;
    player.y += player.velocity * (deltaTime / 16);

    // Floor/Ceiling collision
    if (player.y > 85) { // Floor
      player.y = 85;
      player.velocity = 0;
      player.isJumping = false;
    } else if (player.y < 5) { // Ceiling
      player.y = 5;
      player.velocity = 0;
    }

    // Move obstacles
    obstaclesRef.current.forEach(obs => {
      obs.x -= SPEED * (deltaTime / 16);
    });

    if (obstaclesRef.current.length > 0 && obstaclesRef.current[0].x < -20) {
      obstaclesRef.current.shift();
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }

    const lastObstacle = obstaclesRef.current[obstaclesRef.current.length - 1];
    if (!lastObstacle || (100 - lastObstacle.x > 40 + Math.random() * 20)) {
       if (Math.random() < 0.05) spawnObstacle();
    }

    // Collision Detection
    const playerRect = { x: 20, y: player.y, w: 5, h: 5 };
    
    for (const obs of obstaclesRef.current) {
      if (obs.x < playerRect.x + playerRect.w && obs.x + obs.width > playerRect.x) {
        const obsTop = 100 - obs.height;
        if (playerRect.y + playerRect.h > obsTop) {
          gameOver();
          return; 
        }
      }
    }

    // Trigger render
    setRenderTrigger(prev => prev + 1);
    
    if (gameStateRef.current === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };

  const gameOver = () => {
    setGameState('gameover');
    gameStateRef.current = 'gameover';
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
    }
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const jump = useCallback(() => {
    if (gameStateRef.current === 'playing' && !playerRef.current.isJumping) {
      playerRef.current.velocity = JUMP_FORCE;
      playerRef.current.isJumping = true;
    } else if (gameStateRef.current !== 'playing') {
      startGame();
    }
  }, []);

  // Keyboard handler for PC
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, jump]);

  // Touch handler attached to window for global tap
  useEffect(() => {
    if (!isActive) return;
    
    const handleTouch = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scroll
      jump();
    };
    
    // Also handle click for PC/Mouse users who want to click to jump
    const handleClick = (e: MouseEvent) => {
        // Prevent clicking buttons from jumping if we had buttons overlaid
        // But here we want click to jump anywhere
        e.preventDefault();
        jump();
    }
    
    window.addEventListener('touchstart', handleTouch, { passive: false });
    window.addEventListener('click', handleClick);
    
    return () => {
        window.removeEventListener('touchstart', handleTouch);
        window.removeEventListener('click', handleClick);
    };
  }, [isActive, jump]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-md overflow-hidden bg-onyx border border-signal-lime/20">
        
        {/* Game World */}
        <div className="absolute inset-0">
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-[15%] bg-white/5 border-t border-signal-lime/50" />
          
          {/* Player */}
          <div 
            className="absolute left-[20%] w-6 h-6 bg-signal-lime rounded shadow-[0_0_15px_rgba(0,255,65,0.6)]"
            style={{ 
              top: `${playerRef.current.y}%`,
              transform: 'translateY(-100%)'
            }}
          />

          {/* Obstacles */}
          {obstaclesRef.current.map(obs => (
            <div
              key={obs.id}
              className="absolute bottom-0 bg-siren-red/80 border border-siren-red shadow-[0_0_10px_rgba(255,0,60,0.4)]"
              style={{
                left: `${obs.x}%`,
                width: `${obs.width}%`,
                height: `${obs.height}%`
              }}
            />
          ))}
        </div>

        {/* UI Overlay */}
        <div className="absolute top-4 left-0 right-0 flex justify-between px-6 font-mono text-sm pointer-events-none">
          <div className="text-signal-lime">SCORE: {score}</div>
          <div className="text-white/60">HI: {highScore}</div>
        </div>

        {/* Game States */}
        {gameState === 'start' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-center p-6 cursor-pointer" onClick={(e) => { e.stopPropagation(); startGame(); }}>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">QUANTUM RUNNER</h3>
            <p className="text-sm text-signal-lime font-mono mb-6 animate-pulse">
                {isMobile ? "TAP TO START" : "PRESS SPACE / CLICK TO START"}
            </p>
            <div className="text-xs text-white/40 max-w-[200px]">
              Avoid the red glitch barriers.
              <br/>
              Survive the simulation.
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-siren-red/20 backdrop-blur-sm text-center p-6">
            <h3 className="text-3xl font-black text-siren-red mb-2 glitch-text">SYSTEM FAILURE</h3>
            <div className="text-4xl font-mono text-white mb-6">{score}</div>
            <button 
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              className="px-6 py-3 bg-signal-lime text-black font-bold font-mono uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Reboot System
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export function useReducedMotion(): boolean {
  // Initialize with the current match state to avoid setState in effect
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMatch = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleMatch);
    return () => mediaQuery.removeEventListener("change", handleMatch);
  }, []);

  return prefersReducedMotion;
};

export default function QuantumField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Lower stiffness for better performance
  const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], [-15, 15]);
  
  // Create transform values for dynamic styles
  const coreScale = useTransform([mouseX, mouseY], ([x, y]: number[]) => 1 + Math.abs((x ?? 0) + (y ?? 0)) / 200);
  
  // Mouse-following particle transforms - MUST be at top level (hooks rule)
  const particleX = useTransform(mouseX, (v) => v * 3);
  const particleY = useTransform(mouseY, (v) => v * 3);

  const startGameManual = () => {
    // For PC: Toggle game active if it's not active
    // For Mobile: Same
    setGameActive(true);
  };

  // Generate particle data once - reduce count on mobile
  const particleCount = useMemo(() => isMobile ? 15 : 30, [isMobile]);
  const particleData = useMemo(() => generateParticleData(particleCount), [particleCount]);
  const streamDelays = useMemo(() => generateRandomValues(5, 0, 0.8), []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced mouse interaction for PC - throttled
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || isMobile || !isHovering) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 100;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 100;
    mouseX.set(x);
    mouseY.set(y);
  }, [isMobile, isHovering, mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Mobile touch handling
  const handleTouchStart = () => {
    if (isMobile) {
      setGameActive(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 overflow-hidden cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={startGameManual}
    >
      {/* Enhanced Quantum Particles with mouse interaction */}
      <div className="absolute inset-0">
        {particleData.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-signal-lime rounded-full"
            initial={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              left: particle.animateX.map((x) => `${x}%`),
              top: particle.animateY.map((y) => `${y}%`),
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Mouse-following particles for PC */}
        {!isMobile && (
          <motion.div
            className="absolute w-2 h-2 bg-signal-lime rounded-full"
            style={{
              left: '50%',
              top: '50%',
              x: particleX,
              y: particleY,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        )}
      </div>
        
        {/* Enhanced Energy Grid with mouse interaction */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
              linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px, 50px 50px, 50px 50px, 50px 50px",
          }}
        />
        {/* Dynamic mouse-following gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 30%)',
              'radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.2) 0%, transparent 30%)',
              'radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 30%)',
            ]
          }}
          style={{
            opacity: 0.5,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Enhanced Central Core with mouse interaction - simplified animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
        }}
        style={{
          scale: isMobile ? 0.8 : coreScale,
          willChange: "transform",
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative w-full h-full">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-signal-lime/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Middle Ring */}
          <motion.div
            className="absolute inset-4 border border-signal-lime/50 rounded-full"
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          
          {/* Inner Core */}
          <motion.div
            className="absolute inset-8 bg-signal-lime rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              willChange: "transform",
            }}
          />
        </div>
      </motion.div>

      {/* Enhanced Scanning Lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent"
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Enhanced Data Streams */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-signal-lime to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: ["0%", "100%", "0%"],
            opacity: [0, 1, 0],
            x: ["0%", "0%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: streamDelays[i],
            ease: "easeInOut",
          }}
          style={{
            top: `${20 + i * 15}%`,
            left: 0,
          }}
        />
      ))}

      {/* Game */}
      <QuantumRunnerGame isActive={gameActive} />
      
      {/* Mobile/PC indicator */}
      <div className="absolute top-2 right-2 text-xs font-mono text-spectral-white/40 pointer-events-none">
        {gameActive ? (isMobile ? "TAP TO JUMP" : "SPACE TO JUMP") : (isMobile ? "TOUCH TO PLAY" : "CLICK TO PLAY")}
      </div>
    </div>
  );
}
