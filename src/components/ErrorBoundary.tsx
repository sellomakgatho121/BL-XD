"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-onyx p-8">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-siren-red">
                SYSTEM_ERROR
              </h1>
              <p className="text-spectral-dim font-mono text-sm">
                An unexpected error occurred. Our systems have logged this incident.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="p-4 border border-siren-red/30 bg-siren-red/5 text-left">
                <p className="text-xs font-mono text-siren-red mb-2">
                  Error Details:
                </p>
                <pre className="text-xs font-mono text-spectral-white/60 overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button
                onClick={this.handleReset}
                className="bg-signal-lime text-onyx hover:bg-signal-lime/90 font-mono uppercase"
              >
                Try Again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-spectral-white/20 text-spectral-white hover:bg-spectral-white/10 font-mono uppercase"
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
