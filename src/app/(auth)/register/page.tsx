"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, User, Building2, ArrowLeft, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "", fullName: "", companyName: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Demo: registration success
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-bl-deep flex items-center justify-center p-4">
        <div className="spatial-panel max-w-md w-full p-10 rounded-3xl border border-white/10 text-center">
          <div className="w-14 h-14 bg-bl-gold rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-bl-deep" />
          </div>
          <h1 className="text-xl font-bold text-bl-ice mb-2">Registration Submitted</h1>
          <p className="text-sm text-bl-ice/40 mb-6">An admin will review your account request.</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-bl-gold text-bl-deep text-sm font-semibold rounded-xl">
            Sign In <ArrowLeft size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bl-deep flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-bl-gold/5 rounded-full blur-[100px]" />
        <div className="iso-grid absolute inset-0 opacity-[0.02]" />
      </div>

      <div className="spatial-panel relative z-10 w-full max-w-md mx-4 p-8 md:p-10 rounded-3xl border border-white/10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-bl-gold rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-bl-deep" />
          </div>
          <h1 className="text-xl font-bold text-bl-ice">Client Registration</h1>
          <p className="text-sm text-bl-ice/40 mt-1">Request access to your portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: "fullName", label: "Full Name", icon: User, placeholder: "John Doe", type: "text" },
            { id: "companyName", label: "Company", icon: Building2, placeholder: "Your Company", type: "text" },
            { id: "email", label: "Email", icon: Mail, placeholder: "you@company.com", type: "email" },
            { id: "password", label: "Password", icon: Lock, placeholder: "••••••••", type: "password" },
            { id: "confirmPassword", label: "Confirm Password", icon: Lock, placeholder: "••••••••", type: "password" },
          ].map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.id}>
                <label className="block text-[10px] tracking-widest uppercase text-bl-ice/30 mb-1.5">{field.label}</label>
                <div className="relative">
                  <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bl-ice/20" />
                  <input
                    type={field.type}
                    value={(form as any)[field.id]}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/20 focus:outline-none focus:border-bl-gold/50 transition-all"
                    required={field.id !== "companyName"}
                  />
                </div>
              </div>
            );
          })}

          <button type="submit" className="w-full py-3 bg-bl-gold text-bl-deep text-sm font-semibold rounded-xl hover:shadow-[0_0_25px_rgba(181,154,95,0.3)] transition-all duration-300">
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-bl-ice/30">
            Already have an account?{" "}
            <Link href="/login" className="text-bl-gold hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-[10px] text-bl-ice/20 hover:text-bl-gold transition-colors tracking-wider uppercase">
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
