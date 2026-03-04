"use client";

import { ArrowRight } from "lucide-react";

export default function Window10() {
    return (
        <div className="w-full h-full bg-white text-black p-6 md:p-16 flex flex-col justify-between overflow-hidden">

            {/* Minimal Header */}
            <header className="flex justify-between items-center pb-8 border-b border-black/10">
                <h3 className="text-sm font-medium tracking-widest uppercase">0.1 — Objective</h3>
                <span className="text-sm font-medium opacity-50">Less, but better.</span>
            </header>

            {/* Main Content Area mapping to stark modernism */}
            <div className="flex-1 flex flex-col justify-center max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-8">
                    The subtraction of the obvious reveals the meaningful.
                </h1>

                <div className="grid md:grid-cols-2 gap-12 mt-8 opacity-0 animate-[fadeIn_1s_ease-out_forwards_0.5s]">
                    <div>
                        <div className="w-8 h-[1px] bg-black mb-6" />
                        <p className="text-lg leading-relaxed opacity-70">
                            Heavy negative space and strict visual symmetry guide the eye without overwhelming the senses.
                        </p>
                    </div>
                    <div>
                        <div className="w-8 h-[1px] bg-black mb-6" />
                        <p className="text-lg leading-relaxed opacity-70">
                            Intentionality in every pixel. Typography serves as both communication and composition.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer / CTA */}
            <footer className="pt-8 border-t border-black/10 flex justify-between items-end">
                <div className="group cursor-pointer flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center transition-transform group-hover:scale-110 bg-black text-white">
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-xl font-medium">Explore Case Study</span>
                </div>

                <div className="text-right">
                    <p className="text-sm opacity-50 uppercase tracking-widest">System Layout</p>
                    <p className="text-sm font-medium">Grid Alignment active</p>
                </div>
            </footer>

        </div>
    );
}
