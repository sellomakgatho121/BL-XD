"use client";

import { ErrorBoundary as ErrorBoundaryComponent } from "@/components/ErrorBoundary";

export function ClientErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundaryComponent>
      {children}
    </ErrorBoundaryComponent>
  );
}
