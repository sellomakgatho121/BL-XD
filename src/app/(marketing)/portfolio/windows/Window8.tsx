"use client";

import { ArrowDownRight } from "lucide-react";

export default function Window8() {
    return (
        <div className="w-full h-full bg-[var(--neo-white)] p-0 flex flex-col justify-between overflow-hidden group">
            <div className="p-4 md:p-8 bg-[var(--neo-pink)] border-b-8 border-[var(--neo-black)] flex justify-between items-center transition-colors group-hover:bg-[var(--neo-yellow)]">
                <h3 className="text-3xl font-black uppercase">Functional</h3>
                <ArrowDownRight size={48} className="text-[var(--neo-black)]" />
            </div>

            <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Massive overlapping typography */}
                <h1 className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-[var(--neo-black)] mix-blend-multiply opacity-90 absolute left-4 -top-8 hover:opacity-100 transition-opacity whitespace-nowrap">
                    RAW<br />HTML
                </h1>
                <h1 className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent bg-clip-text relative z-10 whitespace-nowrap" style={{ WebkitTextStroke: '3px var(--neo-black)' }}>
                    BRUTAL
                </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 border-t-8 border-[var(--neo-black)]">
                {['Unfiltered', 'Harsh Contrast', 'Huge Fonts', 'No Rules'].map((text, i) => (
                    <div key={i} className="p-4 md:p-6 font-bold uppercase text-center border-r-8 border-[var(--neo-black)] last:border-r-0 bg-[var(--neo-black)] text-[var(--neo-white)] hover:bg-[var(--neo-white)] hover:text-[var(--neo-black)] transition-colors cursor-crosshair">
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
}
