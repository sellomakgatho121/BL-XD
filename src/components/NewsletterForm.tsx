"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: "service_svwgduq",
  templateId: "template_prrf7h8",
  publicKey: "wpt3N53ze2mSeexh9",
};

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
            // Send email using EmailJS browser SDK
            const templateParams = {
                user_email: email,
                to_email: "sellomakgatho121@gmail.com",
                from_name: "Blacklight Web Designs",
                message: `New newsletter subscription from: ${email}`,
            };

            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams,
                EMAILJS_CONFIG.publicKey
            );

            setStatus("success");
            setEmail("");
        } catch (error) {
            console.error("EmailJS error:", error);
            setStatus("error");
            setErrorMessage("Failed to subscribe. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 border border-signal-lime/50 bg-signal-lime/10 p-4 text-signal-lime"
                    >
                        <div className="flex h-8 w-8 items-center justify-center bg-signal-lime text-onyx">
                            <Check size={18} strokeWidth={3} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase">
                                You&apos;re Notified! 🎉
                            </span>
                            <span className="text-sm">We&apos;ll send you launch updates when we go live!</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="relative flex flex-col gap-4 sm:flex-row"
                    >
                        <div className="relative flex-1 group">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-spectral-white/30 group-focus-within:text-signal-lime transition-colors">
                                <Lock size={16} />
                            </div>
                            <input
                                type="email"
                                placeholder="Your email address..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === "loading"}
                                className="w-full border border-spectral-white/20 bg-onyx py-3 pl-10 pr-3 font-mono text-sm text-spectral-white placeholder:text-spectral-white/30 focus:border-signal-lime focus:outline-none focus:ring-1 focus:ring-signal-lime disabled:opacity-50 transition-all hover:border-spectral-white/40"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={status === "loading"}
                            whileHover={{
                                scale: 1.05,
                                skewX: -10,
                                textShadow: "0px 0px 8px rgb(215 255 0)"
                            }}
                            whileTap={{ scale: 0.95, skewX: 10 }}
                            className="group relative flex items-center justify-center gap-2 bg-spectral-white px-6 py-3 text-sm font-bold text-onyx hover:bg-signal-lime disabled:opacity-50 disabled:hover:bg-spectral-white transition-colors overflow-hidden"
                        >
                            {/* Scanline sweep on hover */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

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
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>
            
            {status === "error" && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-siren-red font-mono"
                >
                    {errorMessage}
                </motion.p>
            )}
        </div>
    );
}
