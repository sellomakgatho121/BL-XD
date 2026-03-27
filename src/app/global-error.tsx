"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-onyx p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tighter text-siren-red">
            ERROR
          </h2>
          <p className="text-spectral-dim font-mono text-sm">
            {error.message || "Something went wrong"}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-spectral-muted">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-signal-lime text-onyx hover:bg-signal-lime/90 font-mono uppercase"
          >
            Try Again
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-spectral-white/20 text-spectral-white hover:bg-spectral-white/10 font-mono uppercase"
          >
            Reload
          </Button>
        </div>
      </div>
    </div>
  );
}
