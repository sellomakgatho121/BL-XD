"use client";

import { signIn } from "next-auth/react";
import { Suspense, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push(callbackUrl);
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bl-deep flex items-center justify-center relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bl-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bl-slate/10 rounded-full blur-[120px]" />
        {/* Iso Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(60deg, rgba(181,154,95,0.3) 1px, transparent 1px),
              linear-gradient(-60deg, rgba(181,154,95,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Login Card */}
      <div className="spatial-panel relative z-10 w-full max-w-md mx-4 p-8 md:p-10 rounded-3xl border border-white/10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-bl-gold rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-bl-deep" />
          </div>
          <h1 className="text-2xl font-bold text-bl-ice">Admin Login</h1>
          <p className="text-sm text-bl-ice/40 mt-2">Blacklight Web Designs</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs tracking-wider uppercase text-bl-ice/40 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@blacklight.co.za"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/20 focus:outline-none focus:border-bl-gold/50 focus:shadow-[0_0_15px_rgba(181,154,95,0.1)] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider uppercase text-bl-ice/40 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/20 focus:outline-none focus:border-bl-gold/50 focus:shadow-[0_0_15px_rgba(181,154,95,0.1)] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-bl-ice/30 hover:text-bl-gold transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-bl-gold text-bl-deep text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(181,154,95,0.3)] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-bl-deep border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={16} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-[10px] text-center text-bl-ice/20 mt-8 tracking-wider uppercase">
          Depth Engineered Security
        </p>
      </div>
    </div>
  );
}
