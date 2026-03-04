"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      setSuccess(true);
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

      <div
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            <GlitchText text="RESET PASSWORD" intensity="medium" triggerOnHover />
          </h1>
          <p className="text-[var(--spectral-dim)] font-mono text-sm">
            {success
              ? "Check your email for reset instructions"
              : "Enter your email to receive a reset link"}
          </p>
        </div>

        <div className="border border-[var(--border)] bg-[var(--card)] p-8">
          {success ? (
            <div
              className="text-center py-8"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[var(--signal-lime)]/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[var(--signal-lime)]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Reset Link Sent</h3>
              <p className="text-[var(--spectral-dim)] text-sm mb-6">
                We&apos;ve sent a password reset link to{" "}
                <span className="text-[var(--spectral-white)] font-mono">{email}</span>
              </p>
              <p className="text-xs text-[var(--spectral-muted)] mb-6">
                Didn&apos;t receive it? Check your spam folder or try again.
              </p>
              <Button
                onClick={() => setSuccess(false)}
                className="w-full bg-[var(--border)] text-[var(--spectral-white)] hover:bg-[var(--border)]/80 font-mono uppercase rounded-none h-12"
              >
                TRY AGAIN
              </Button>
            </div>
          ) : (
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
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 text-sm text-[var(--siren-red)] border border-[var(--siren-red)]/50 bg-[var(--siren-red)]/10 px-4 py-3"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase rounded-none h-12"
              >
                {isLoading ? (
                  "SENDING..."
                ) : (
                  <>
                    SEND RESET LINK
                    <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-[var(--spectral-dim)] hover:text-[var(--spectral-white)] transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to login
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 text-xs font-mono text-[var(--spectral-muted)] uppercase tracking-widest">
          <Link href="/" className="hover:text-[var(--spectral-white)] transition-colors">
            ← Back to Website
          </Link>
        </p>
      </div>
    </div>
  );
}
