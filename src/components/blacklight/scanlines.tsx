"use client";



interface ScanlinesProps {
  className?: string;
}

export default function Scanlines({ className = "" }: ScanlinesProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9997] opacity-10 ${className}`}
      style={{
        background: `
          linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
          linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))
        `,
        backgroundSize: "100% 2px, 3px 100%",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}

// Flicker overlay for CRT effect
export function FlickerOverlay() {
  return (
    <>
      <style>{`@keyframes flicker { 0%,100% { opacity: 0.02; } 50% { opacity: 0.04; } }`}</style>
      <div
        className="pointer-events-none fixed inset-0 z-[9996]"
        style={{
          willChange: "opacity",
          transform: "translateZ(0)",
          animation: "flicker 0.15s linear infinite",
        }}
      />
    </>
  );
}

// Vignette effect
export function Vignette({ intensity = 0.6 }: { intensity?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9995]"
      style={{
        background: `radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,${intensity}) 100%)`,
        transform: "translateZ(0)",
      }}
    />
  );
}

// Combined CRT effect
export function CRTEffect({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Scanlines />
      <FlickerOverlay />
      <Vignette intensity={0.4} />
      {children}
    </>
  );
}
