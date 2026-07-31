"use client";

import { useEffect, useRef, useCallback } from "react";

type LayoutShift = { value: number };

type PerformanceMark = {
  name: string;
  startTime: number;
  duration: number;
  metadata?: Record<string, unknown>;
};

const marks = new Map<string, PerformanceMark>();

/**
 * Mark the start of a performance measurement.
 */
export function startMark(name: string, metadata?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  marks.set(name, {
    name,
    startTime: performance.now(),
    duration: 0,
    metadata,
  });
}

/**
 * End a performance measurement and log the duration.
 */
export function endMark(
  name: string,
  metadata?: Record<string, unknown>
): number | null {
  if (typeof window === "undefined") return null;
  const mark = marks.get(name);
  if (!mark) return null;

  const duration = performance.now() - mark.startTime;
  marks.delete(name);

  // Log slow operations (> 100ms)
  if (duration > 100) {
    console.warn(
      `[perf] ${name} took ${duration.toFixed(2)}ms`,
      metadata ?? mark.metadata ?? {}
    );
  }

  return duration;
}

/**
 * Measure async function execution time.
 */
export async function measure<T>(
  name: string,
  fn: () => Promise<T> | T,
  metadata?: Record<string, unknown>
): Promise<T> {
  startMark(name, metadata);
  try {
    return await fn();
  } finally {
    endMark(name, metadata);
  }
}

const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

const MAX_LOG_ENTRIES = 100;
const logHistory: LogEntry[] = [];

function log(level: LogLevel, message: string, data?: unknown) {
  const entry: LogEntry = {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  logHistory.push(entry);
  if (logHistory.length > MAX_LOG_ENTRIES) {
    logHistory.shift();
  }

  // In development, forward to console
  if (process.env.NODE_ENV === "development") {
    const fn = console[level] ?? console.log;
    fn(`[BL-XD] ${message}`, data ?? "");
  }
}

export const logger = {
  debug: (message: string, data?: unknown) => log("debug", message, data),
  info: (message: string, data?: unknown) => log("info", message, data),
  warn: (message: string, data?: unknown) => log("warn", message, data),
  error: (message: string, data?: unknown) => log("error", message, data),
  getHistory: () => [...logHistory],
};

/**
 * Hook to report Web Vitals metrics.
 */
export function useWebVitals() {
  const reported = useRef(false);

  const report = useCallback(
    (metric: { name: string; value: number; rating: string }) => {
      logger.info(`Web Vital: ${metric.name}`, {
        value: metric.value,
        rating: metric.rating,
      });
    },
    []
  );

  useEffect(() => {
    if (reported.current || typeof window === "undefined") return;
    reported.current = true;

    // Use PerformanceObserver for Core Web Vitals
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            report({
              name: "LCP",
              value: entry.startTime,
              rating: entry.startTime < 2500 ? "good" : "needs-improvement",
            });
          }
          if (entry.entryType === "first-input") {
            const fiEntry = entry as PerformanceEventTiming;
            report({
              name: "FID",
              value: fiEntry.processingStart - fiEntry.startTime,
              rating: fiEntry.duration < 100 ? "good" : "needs-improvement",
            });
          }
          if (entry.entryType === "layout-shift") {
            const lsEntry = entry as unknown as LayoutShift;
            report({
              name: "CLS",
              value: lsEntry.value,
              rating: lsEntry.value < 0.1 ? "good" : "needs-improvement",
            });
          }
        }
      });

      observer.observe({
        type: "largest-contentful-paint",
        buffered: true,
      });
      observer.observe({ type: "first-input", buffered: true });
      observer.observe({ type: "layout-shift", buffered: true });
    } catch {
      // PerformanceObserver not available
    }
  }, [report]);
}
