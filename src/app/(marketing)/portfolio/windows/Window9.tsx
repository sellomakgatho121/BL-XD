"use client";

import { Star, Zap } from "lucide-react";

export default function Window9() {
    return (
        <div className="w-full h-full bg-[#f0f0f0] text-black overflow-hidden relative cursor-crosshair">
            {/* 90s grid background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMGg0MHY0MEgwem0zOSAzOUgxdjFIMHoiIGZpbGw9IiM2NjYiIGZpbGwtb3BhY2l0eT0iMC4xIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] pointer-events-none" />

            {/* Marquee Top */}
            <div className="bg-[#ff00ff] text-white font-black uppercase text-xl py-2 whitespace-nowrap overflow-hidden border-b-4 border-black rotate-[-2deg] mt-4 scale-110 shadow-[4px_4px_0px_#00ffff]">
                <div className="animate-marquee inline-block">
                    NOSTALGIA IS DEAD * LONG LIVE NOSTALGIA * NOSTALGIA IS DEAD * LONG LIVE NOSTALGIA *
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-12 px-4 relative z-10">

                {/* Floating stickers */}
                <div className="absolute top-0 left-10 animate-bounce delay-100">
                    <div className="bg-[#00ffff] border-4 border-black p-4 rotate-12 shadow-[4px_4px_0px_black]">
                        <Star className="text-black" size={32} />
                    </div>
                </div>

                <div className="absolute bottom-10 right-10 animate-bounce delay-300">
                    <div className="bg-[#ffff00] border-4 border-black p-4 -rotate-12 rounded-full shadow-[4px_4px_0px_black]">
                        <Zap className="text-black" size={48} />
                    </div>
                </div>

                <h2 className="text-6xl md:text-8xl font-black uppercase text-center mix-blend-difference text-white">
                    <span className="hover:text-[#ff00ff] transition-colors inline-block hover:-translate-y-2">G</span>
                    <span className="hover:text-[#00ffff] transition-colors inline-block hover:translate-y-2">E</span>
                    <span className="hover:text-[#ffff00] transition-colors inline-block hover:-translate-y-2">N</span>
                    <br />
                    <span className="hover:text-[#0000ff] transition-colors inline-block hover:translate-y-2 text-8xl md:text-[10rem] tracking-[-0.1em]">Z</span>
                </h2>

                <div className="mt-8 bg-black text-[#00ffff] font-mono p-4 border-4 border-[#ff00ff] animate-pulse max-w-sm text-center shadow-[10px_10px_0px_#ffff00]">
                    <p className="font-bold">CAUTION: HIGH FREQUENCY VIBES DETECTED.</p>
                </div>

                <button className="mt-12 bg-[#0000ff] text-white font-black text-2xl uppercase px-8 py-4 border-4 border-black hover:bg-[#ff0000] hover:-rotate-3 hover:scale-110 transition-all duration-200 shadow-[8px_8px_0px_black]">
                    Click Me
                </button>
            </div>
        </div>
    );
}
