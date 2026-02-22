/**
 * Error monitoring and reporting utilities.
 *
 * Sentry integration: Install @sentry/nextjs and configure via sentry.client.config.ts
 * and sentry.server.config.ts when ready for production.
 *
 * For now, this provides a consistent API that can be swapped to Sentry later.
 */

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Capture and report an error. In development, logs to console.
 * In production, would forward to Sentry or similar service.
 */
export function captureError(error: Error | unknown, context?: ErrorContext): void {
  const errorObj = error instanceof Error ? error : new Error(String(error));

  if (process.env.NODE_ENV === 'development') {
    console.error('[Blacklight Error]', {
      message: errorObj.message,
      stack: errorObj.stack,
      ...context,
    });
    return;
  }

  // Production: Send to Sentry when configured
  // Sentry.captureException(errorObj, { extra: context });

  // Fallback: structured logging for server-side
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'error',
    message: errorObj.message,
    stack: errorObj.stack,
    ...context,
  }));
}

/**
 * Track a custom event for analytics purposes.
 */
export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  // Plausible custom events
  if (typeof window !== 'undefined' && (window as Record<string, unknown>).plausible) {
    (window as Record<string, (name: string, opts?: { props: Record<string, unknown> }) => void>).plausible(name, {
      props: properties || {},
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Blacklight Event]', name, properties);
  }
}

/**
 * Report Web Vitals metrics.
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: 'web-vital' | 'custom';
}): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vital]', metric.name, metric.value);
  }

  // Send to analytics endpoint
  if (typeof window !== 'undefined') {
    const body = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      label: metric.label,
      page: window.location.pathname,
    });

    // Use sendBeacon for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/vitals', body);
    }
  }
}
