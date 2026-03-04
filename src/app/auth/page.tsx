"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldAlert, ArrowRight } from "lucide-react";
import GlitchText from "@/components/GlitchText";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        // Set cookie and redirect
        document.cookie = `site_access=${password}; path=/; max-age=86400; SameSite=Lax`;
        router.push("/");
        router.refresh();
      } else {
        setError("Access denied. Invalid credentials.");
        setPassword("");
      }
    } catch {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onyx text-spectral-white p-8">
      {/* Grid Pattern Background */}
      <div
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div}}}
        className="relative z-10 w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <ShieldAlert className="text-signal-lime" size={32} />
            <Lock className="text-siren-red" size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter">
            <GlitchText text="RESTRICTED" intensity="high" triggerOnHover={true} />
          </h1>
          <p className="text-spectral-white/60 font-mono text-sm">
            This deployment is password protected.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-mono tracking-widest uppercase text-spectral-white/80 mb-2"
            >
              Access Code
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-onyx border border-spectral-white/20 px-4 py-3 font-mono text-spectral-white placeholder:text-spectral-white/30 focus:outline-none focus:border-signal-lime focus:ring-1 focus:ring-signal-lime transition-all"
              placeholder="Enter access code..."
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <div}}
              className="border border-siren-red/50 bg-siren-red/10 px-4 py-3 text-siren-red text-sm font-mono"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-signal-lime px-6 py-3 text-onyx font-bold hover:bg-spectral-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              "AUTHENTICATING..."
            ) : (
              <>
                INITIATE ACCESS
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[10px] font-mono tracking-widest text-spectral-white/30 uppercase">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
