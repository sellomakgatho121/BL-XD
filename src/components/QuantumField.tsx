"use client";

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
  const SPEED = 0.5;

  // Render state (for React updates)
  const [, setRenderTrigger] = useState(0);

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    scoreRef.current = 0;
    playerRef.current = { y: 50, velocity: 0, isJumping: false };
    obstaclesRef.current = [];
    lastTimeRef.current = performance.now();
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

    const player = playerRef.current;

    player.velocity += GRAVITY;
    player.y += player.velocity * (deltaTime / 16);

    if (player.y > 85) {
      player.y = 85;
      player.velocity = 0;
      player.isJumping = false;
    } else if (player.y < 5) {
      player.y = 5;
      player.velocity = 0;
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (!isActive) return;

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      jump();
    };

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
              <br />
              Survive the simulation.
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-siren-red/20 backdrop-blur-sm text-center p-6">
            <h3 className="text-3xl font-black text-siren-red mb-2">SYSTEM FAILURE</h3>
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const particleCount = useMemo(() => isMobile ? 15 : 30, [isMobile]);
  const particleData = useMemo(() => generateParticleData(particleCount), [particleCount]);
  const streamDelays = useMemo(() => generateRandomValues(5, 0, 0.8), []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || isMobile || !isHovering) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 200;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 200;
    setMousePos({ x, y });
  }, [isMobile, isHovering]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  }, []);

  const startGameManual = () => {
    setGameActive(true);
  };

  const handleTouchStart = () => {
    if (isMobile) {
      setGameActive(true);
    }
  };

  const rotateX = isHovering ? (mousePos.y / 200) * -15 : 0;
  const rotateY = isHovering ? (mousePos.x / 200) * 15 : 0;
  const cursorX = mousePos.x / 2;
  const cursorY = mousePos.y / 2;

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
      <style>{`
        @keyframes qf-particle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes qf-scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
        @keyframes qf-stream {
          0% { width: 0%; opacity: 0; left: 0%; }
          50% { width: 100%; opacity: 1; }
          100% { width: 0%; opacity: 0; left: 100%; }
        }
        @keyframes qf-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes qf-pulse-outer {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        @keyframes qf-pulse-inner {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(0.8); opacity: 1; }
        }
        @keyframes qf-glow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.5); opacity: 0.2; }
        }
        @keyframes qf-cursor-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
        }
        @keyframes qf-radial-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
      `}</style>

      {/* Particles */}
      <div className="absolute inset-0">
        {particleData.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-signal-lime rounded-full"
            style={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              animation: `qf-particle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
              willChange: "transform, opacity",
            }}
          />
        ))}

        {/* Mouse-following particle for PC */}
        {!isMobile && isHovering && (
          <div
            className="absolute w-2 h-2 bg-signal-lime rounded-full"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: cursorX,
              marginTop: cursorY,
              filter: "blur(2px)",
              animation: "qf-cursor-pulse 1s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {/* Energy Grid with mouse-driven 3D tilt */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
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
        {/* Pulsing radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.15) 0%, transparent 30%)',
            animation: "qf-radial-pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Central Core */}
      <div
        className="absolute top-1/2 left-1/2 w-32 h-32"
        style={{
          animation: "qf-rotate 20s linear infinite",
          willChange: "transform",
        }}
      >
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 border-2 border-signal-lime/30 rounded-full"
            style={{ animation: "qf-pulse-outer 2s ease-in-out infinite" }}
          />
          <div
            className="absolute inset-4 border border-signal-lime/50 rounded-full"
            style={{ animation: "qf-pulse-inner 2.5s ease-in-out 0.5s infinite" }}
          />
          <div
            className="absolute inset-8 bg-signal-lime rounded-full"
            style={{
              filter: "blur(8px)",
              animation: "qf-glow 3s ease-in-out 1s infinite",
              willChange: "transform",
            }}
          />
        </div>
      </div>

      {/* Scanning Lines */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent"
        style={{ animation: "qf-scan 4s linear infinite" }}
      />

      {/* Data Streams */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-signal-lime to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            left: 0,
            animation: `qf-stream 3s ease-in-out ${streamDelays[i]}s infinite`,
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
