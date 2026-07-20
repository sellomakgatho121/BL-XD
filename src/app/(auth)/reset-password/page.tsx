"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Sparkles } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-bl-deep flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-bl-slate/10 rounded-full blur-[100px]" />
        <div className="iso-grid absolute inset-0 opacity-[0.02]" />
      </div>

      <div className="spatial-panel relative z-10 w-full max-w-md mx-4 p-8 md:p-10 rounded-3xl border border-white/10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-bl-gold rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-bl-deep" />
          </div>
          <h1 className="text-xl font-bold text-bl-ice">Reset Password</h1>
          <p className="text-sm text-bl-ice/40 mt-1">
            {sent ? "Check your email for reset instructions" : "Enter your email to receive reset instructions"}
          </p>
        </div>

        {!sent ? (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-5"
          >
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-bl-ice/30 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bl-ice/20" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/20 focus:outline-none focus:border-bl-gold/50 transition-all"
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-bl-gold text-bl-deep text-sm font-semibold rounded-xl hover:shadow-[0_0_25px_rgba(181,154,95,0.3)] transition-all duration-300">
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-bl-ice/60">If an account exists with that email, you will receive reset instructions shortly.</p>
          </div>
        )}

        <div className="mt-6 text-center space-y-2">
          <Link href="/login" className="block text-xs text-bl-gold hover:underline">Back to Sign In</Link>
          <Link href="/" className="block text-[10px] text-bl-ice/20 hover:text-bl-gold transition-colors tracking-wider uppercase">
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
