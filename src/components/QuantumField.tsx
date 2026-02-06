"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
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

// Mobile endless runner game component
const MobileRunnerGame = ({ isActive }: { isActive: boolean }) => {
  const [playerY, setPlayerY] = useState(50);
  const [obstacles, setObstacles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    if (!isActive || gameOver) return;

    const gameLoop = setInterval(() => {
      setObstacles(prev => {
        const updated = prev.map(obs => ({ ...obs, x: obs.x - 2 }));
        const filtered = updated.filter(obs => obs.x > -10);
        
        // Add new obstacle
        if (filtered.length < 3 && Math.random() < 0.02) {
          filtered.push({
            id: Date.now(),
            x: 100,
            y: Math.random() < 0.5 ? 70 : 30
          });
        }
        
        return filtered;
      });

      setScore(prev => prev + 1);
    }, 50);

    return () => clearInterval(gameLoop);
  }, [isActive, gameOver]);

  useEffect(() => {
    if (!isActive || gameOver) return;

    const collisionCheck = setInterval(() => {
      obstacles.forEach(obs => {
        if (obs.x > 15 && obs.x < 25 && Math.abs(obs.y - playerY) < 15) {
          setGameOver(true);
        }
      });
    }, 50);

    return () => clearInterval(collisionCheck);
  }, [obstacles, playerY, isActive, gameOver]);

  const handleJump = useCallback(() => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setPlayerY(30);
      setTimeout(() => {
        setPlayerY(70);
        setIsJumping(false);
      }, 500);
    }
  }, [isJumping, gameOver]);

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setPlayerY(70);
    setIsJumping(false);
  };

  // Global touch handler for jumping
  useEffect(() => {
    const handleTouchJump = (e: TouchEvent) => {
      e.preventDefault();
      handleJump();
    };

    if (isActive) {
      window.addEventListener('touchstart', handleTouchJump, { passive: false });
      return () => window.removeEventListener('touchstart', handleTouchJump);
    }
  }, [isActive, handleJump]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full h-full max-w-sm max-h-xs">
        {/* Game Area */}
        <div className="absolute inset-4 bg-onyx/50 border border-signal-lime/30 rounded-lg overflow-hidden">
          {/* Player */}
          <motion.div
            className="absolute w-4 h-4 bg-signal-lime rounded-full"
            style={{ 
              left: '20%', 
              bottom: `${playerY}%`,
              filter: "blur(0.5px)"
            }}
            animate={{ y: isJumping ? -20 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Obstacles */}
          {obstacles.map(obs => (
            <div
              key={obs.id}
              className="absolute w-3 h-6 bg-siren-red/80"
              style={{ 
                left: `${obs.x}%`, 
                bottom: `${obs.y}%`,
                filter: "blur(0.5px)"
              }}
            />
          ))}
          
          {/* Score */}
          <div className="absolute top-2 left-2 text-xs font-mono text-signal-lime">
            {Math.floor(score / 10)}
          </div>
          
          {/* Game Over */}
          {gameOver && (
            <div className="absolute inset-0 bg-onyx/80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-mono text-siren-red mb-2">GAME OVER</div>
                <div className="text-xs font-mono text-spectral-white mb-2">
                  Score: {Math.floor(score / 10)}
                </div>
                <button
                  onClick={handleRestart}
                  className="px-3 py-1 text-xs font-mono bg-signal-lime text-onyx rounded hover:bg-signal-lime/80 transition-colors"
                >
                  RESTART
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <div className="text-xs font-mono text-spectral-white/60">
            Tap to Jump • Avoid Red Obstacles
          </div>
        </div>
      </div>
    </div>
  );
};

export default function QuantumField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  
  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);
  
  const rotateX = useTransform(mouseYSpring, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], [-15, 15]);
  
  // Create transform values for dynamic styles
  const coreScale = useTransform([mouseX, mouseY], ([x, y]: number[]) => 1 + Math.abs((x ?? 0) + (y ?? 0)) / 200);

  // Generate particle data once
  const particleData = useMemo(() => generateParticleData(50), []);
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

  // Enhanced mouse interaction for PC
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 100;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

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
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
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
            style={{
              filter: "blur(0.5px)",
            }}
          />
        ))}
        
        {/* Mouse-following particles for PC */}
        {!isMobile && (
          <AnimatePresence>
            <motion.div
              className="absolute w-2 h-2 bg-signal-lime rounded-full"
              style={{
                left: '50%',
                top: '50%',
                x: mouseX,
                y: mouseY,
                filter: "blur(2px)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </AnimatePresence>
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

      {/* Enhanced Central Core with mouse interaction */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
        }}
        style={{
          scale: isMobile ? 0.8 : coreScale,
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
              filter: "blur(8px)",
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

      {/* Mobile Game */}
      <MobileRunnerGame isActive={isMobile && gameActive} />
      
      {/* Mobile/PC indicator */}
      <div className="absolute top-2 right-2 text-xs font-mono text-spectral-white/40">
        {isMobile ? "📱 TOUCH TO PLAY" : "🖱️ MOVE MOUSE"}
      </div>
    </div>
  );
}
