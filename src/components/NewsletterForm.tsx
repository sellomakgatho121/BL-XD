"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setEmail("");
            } else {
                throw new Error(data.error || "Subscription failed");
            }
        } catch (error) {
            console.error("Newsletter error:", error);
            setStatus("error");
            setErrorMessage("Failed to subscribe. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-md">
            {status === "success" ? (
                <div className="flex items-center gap-3 border border-signal-lime/50 bg-signal-lime/10 p-4 text-signal-lime animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex h-8 w-8 items-center justify-center bg-signal-lime text-onyx">
                        <Check size={18} strokeWidth={3} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold tracking-widest uppercase">
                            You&apos;re Notified! 🎉
                        </span>
                        <span className="text-sm">We&apos;ll send you launch updates when we go live!</span>
                    </div>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="relative flex flex-col gap-4 sm:flex-row animate-in fade-in duration-300"
                >
                    <div className="relative flex-1 group">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-spectral-white/30 group-focus-within:text-[var(--neo-cyan)] transition-colors">
                            <Lock size={16} />
                        </div>
                        <input
                            type="email"
                            placeholder="Your email address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading"}
                            className="w-full border border-[var(--neo-black)] bg-[var(--neo-white)] py-3 pl-10 pr-3 font-mono text-sm text-[var(--neo-black)] placeholder:text-[var(--neo-black)]/50 focus:border-[var(--neo-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--neo-cyan)] disabled:opacity-50 transition-all shadow-[4px_4px_0px_var(--neo-black)]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group relative flex items-center justify-center gap-2 bg-[var(--neo-black)] px-6 py-3 text-sm font-bold text-[var(--neo-white)] hover:bg-[var(--neo-cyan)] disabled:opacity-50 disabled:hover:bg-[var(--neo-black)] transition-all overflow-hidden shadow-[4px_4px_0px_var(--neo-white)] hover:-translate-y-1 hover:translate-x-1 hover:shadow-none active:translate-y-0 active:translate-x-0"
                    >
                        {/* Scanline sweep on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        {status === "loading" ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                PROCESSING
                            </>
                        ) : (
                            <>
                                REQUEST ACCESS
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            )}

            {status === "error" && (
                <p className="mt-2 text-sm text-[var(--neo-red)] font-mono animate-in fade-in slide-in-from-top-2">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
