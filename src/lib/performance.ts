"use client";

import { useEffect, useRef, useCallback } from "react";

// Throttle function for mouse events
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Hook for throttled mouse tracking
export function useThrottledMouseMove(
  callback: (x: number, y: number) => void,
  throttleMs: number = 16
) {
  const rafRef = useRef<number | undefined>(undefined);
  const lastCallRef = useRef(0);

  const throttledCallback = useCallback(
    (x: number, y: number) => {
      const now = performance.now();
      if (now - lastCallRef.current >= throttleMs) {
        lastCallRef.current = now;
        callback(x, y);
      } else {
        // Cancel pending RAF and schedule new one
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
          callback(x, y);
        });
      }
    },
    [callback, throttleMs]
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

// Detect reduced motion preference
export function useReducedMotion(): boolean {
  // Initialize with the current match state to avoid setState in effect
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

import { useState } from "react";

// Hook for detecting mobile/touch devices
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// Get optimal particle count based on device
export function getOptimalParticleCount(baseCount: number, isMobile: boolean): number {
  if (isMobile) return Math.floor(baseCount * 0.3);
  // Check for low-end devices
  if (typeof navigator !== "undefined" && navigator.hardwareConcurrency) {
    const cores = navigator.hardwareConcurrency;
    if (cores <= 2) return Math.floor(baseCount * 0.5);
    if (cores <= 4) return Math.floor(baseCount * 0.75);
  }
  return baseCount;
}
