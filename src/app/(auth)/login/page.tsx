"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data.user) {
        router.push("/portal/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            <GlitchText text="PORTAL ACCESS" intensity="medium" triggerOnHover />
          </h1>
          <p className="text-[var(--spectral-dim)] font-mono text-sm">
            Sign in to access your client dashboard
          </p>
        </div>

        <div className="border border-[var(--border)] bg-[var(--card)] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-mono uppercase text-[var(--spectral-muted)]">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--spectral-muted)]" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[var(--onyx)] border-[var(--border)] rounded-none"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-mono uppercase text-[var(--spectral-muted)]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--spectral-muted)]" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-[var(--onyx)] border-[var(--border)] rounded-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-[var(--siren-red)] border border-[var(--siren-red)]/50 bg-[var(--siren-red)]/10 px-4 py-3"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase rounded-none h-12"
            >
              {isLoading ? (
                "AUTHENTICATING..."
              ) : (
                <>
                  SIGN IN
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--spectral-dim)]">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[var(--signal-lime)] hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-xs font-mono text-[var(--spectral-muted)] uppercase tracking-widest">
          <Link href="/" className="hover:text-[var(--spectral-white)] transition-colors">
            ← Back to Website
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
