"use client";

import { useRef, useMemo, useState, useCallback, memo } from "react";

interface QuantumFieldProps {
  className?: string;
}

const generateParticleData = (count: number) => {
  return Array.from({ length: count }, () => ({
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
    endX: Math.random() * 100,
    endY: Math.random() * 100,
  }));
};

const QuantumField = memo(function QuantumField({ className = "" }: QuantumFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const particleData = useMemo(() => generateParticleData(30), []);
  const STREAM_DELAYS = [0.12, 0.45, 0.23, 0.67, 0.34];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !isHovering) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 200;
      const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 200;
      setMousePos({ x, y });
    },
    [isHovering]
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  }, []);

  const rotateX = isHovering ? (mousePos.y / 200) * -15 : 0;
  const rotateY = isHovering ? (mousePos.x / 200) * 15 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-96 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      `}</style>

      {/* Particles */}
      <div className="absolute inset-0">
        {particleData.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[var(--signal-lime)] rounded-full"
            style={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              filter: "blur(0.5px)",
              willChange: "transform, opacity",
              animation: `qf-particle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}

        {/* Mouse cursor glow */}
        {isHovering && (
          <div
            className="absolute w-2 h-2 bg-[var(--signal-lime)] rounded-full"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: mousePos.x / 2,
              marginTop: mousePos.y / 2,
              filter: "blur(2px)",
              willChange: "transform",
              animation: "qf-cursor-pulse 1s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {/* Energy Grid with 3D tilt */}
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
              radial-gradient(circle at 20% 50%, rgba(215, 255, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(215, 255, 0, 0.1) 0%, transparent 50%),
              linear-gradient(0deg, transparent 24%, rgba(215, 255, 0, 0.05) 25%, rgba(215, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(215, 255, 0, 0.05) 75%, rgba(215, 255, 0, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(215, 255, 0, 0.05) 25%, rgba(215, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(215, 255, 0, 0.05) 75%, rgba(215, 255, 0, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px, 50px 50px, 50px 50px, 50px 50px",
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
            className="absolute inset-0 border-2 border-[var(--signal-lime)]/30 rounded-full"
            style={{ animation: "qf-pulse-outer 2s ease-in-out infinite" }}
          />
          <div
            className="absolute inset-4 border border-[var(--signal-lime)]/50 rounded-full"
            style={{ animation: "qf-pulse-inner 2.5s ease-in-out 0.5s infinite" }}
          />
          <div
            className="absolute inset-8 bg-[var(--signal-lime)] rounded-full"
            style={{
              filter: "blur(8px)",
              animation: "qf-glow 3s ease-in-out 1s infinite",
            }}
          />
        </div>
      </div>

      {/* Scanning Line */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--signal-lime)]/10 to-transparent"
        style={{ animation: "qf-scan 4s linear infinite" }}
      />

      {/* Data Streams */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-[var(--signal-lime)] to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            left: 0,
            animation: `qf-stream 3s ease-in-out ${STREAM_DELAYS[i]}s infinite`,
          }}
        />
      ))}

      {/* Hint */}
      <div className="absolute top-2 right-2 text-xs font-mono text-[var(--spectral-muted)]">
        🖱️ MOVE MOUSE
      </div>
    </div>
  );
});

export default QuantumField;
