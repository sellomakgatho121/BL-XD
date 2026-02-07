"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, User, Building2, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import GlitchText from "@/components/GlitchText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    companyName: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            company_name: formData.companyName,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data.user) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle className="w-16 h-16 text-[var(--signal-lime)] mx-auto mb-4" />
          <h1 className="text-3xl font-black tracking-tighter mb-4">Account Created</h1>
          <p className="text-[var(--spectral-dim)] mb-6">
            Please check your email to verify your account. Redirecting to login...
          </p>
        </motion.div>
      </div>
    );
  }

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
            <GlitchText text="CREATE ACCOUNT" intensity="medium" triggerOnHover />
          </h1>
          <p className="text-[var(--spectral-dim)] font-mono text-sm">
            Register to access your client portal
          </p>
        </div>

        <div className="border border-[var(--border)] bg-[var(--card)] p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-xs font-mono uppercase text-[var(--spectral-muted)]">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--spectral-muted)]" />
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-10 bg-[var(--onyx)] border-[var(--border)] rounded-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-xs font-mono uppercase text-[var(--spectral-muted)]">
                Company Name (Optional)
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--spectral-muted)]" />
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="pl-10 bg-[var(--onyx)] border-[var(--border)] rounded-none"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-mono uppercase text-[var(--spectral-muted)]">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--spectral-muted)]" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 bg-[var(--onyx)] border-[var(--border)] rounded-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs font-mono uppercase text-[var(--spectral-muted)]">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--spectral-muted)]" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
              className="w-full bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase rounded-none h-12 mt-4"
            >
              {isLoading ? (
                "CREATING ACCOUNT..."
              ) : (
                <>
                  CREATE ACCOUNT
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--spectral-dim)]">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--signal-lime)] hover:underline">
                Sign in
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
