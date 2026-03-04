"use client";

import { Pencil } from "lucide-react";

export default function Window7() {
    return (
        <div className="w-full h-full bg-[#fdfaf6] p-4 md:p-12 relative overflow-hidden text-[#1a1a1a]">
            {/* Hand-drawn style borders and backgrounds */}
            <div className="absolute inset-4 border-2 border-[#1a1a1a] rounded-lg" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>

                <div className="h-full flex flex-col md:flex-row items-center justify-center gap-12 p-8">

                    {/* Illustration Mock (using CSS shapes instead of AI images for immediate robust UI) */}
                    <div className="w-48 h-48 md:w-64 md:h-64 relative rotate-3 shrink-0 group">
                        <div className="absolute inset-0 border-4 border-[#1a1a1a] bg-[#ffd700] rounded-full transition-transform group-hover:-translate-y-2 group-hover:translate-x-2" style={{ borderRadius: '50% 40% 60% 40% / 40% 50% 40% 60%' }}></div>
                        <div className="absolute inset-0 border-2 border-[#1a1a1a] border-dashed rounded-full -rotate-12 bg-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Pencil size={64} className="text-[#1a1a1a] -rotate-45 group-hover:rotate-12 transition-transform duration-300" />
                        </div>

                        {/* Hand-drawn squiggles */}
                        <svg className="absolute -top-10 -right-10 w-20 h-20 text-[#ff4b4b] overflow-visible" viewBox="0 0 100 100">
                            <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            <path d="M30,80 Q50,40 70,80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="max-w-md text-center md:text-left z-10">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 relative inline-block">
                            Organic Feel
                            <svg className="absolute -bottom-2 left-0 w-full h-4 text-[#ff4b4b]" preserveAspectRatio="none" viewBox="0 0 100 10">
                                <path d="M0,5 Q40,0 60,8 T100,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </h2>
                        <p className="font-bold text-lg leading-relaxed mb-8 opacity-80">
                            Personalized, hand-drawn illustrations and icons. We bring a memorable, human touch back to the sterile digital landscape.
                        </p>

                        <button className="px-8 py-4 bg-[#1a1a1a] text-[#fdfaf6] font-bold uppercase tracking-widest hover:bg-[#ff4b4b] transition-colors relative group">
                            <span className="relative z-10">Commission Art</span>
                            {/* Hand-drawn shadow */}
                            <div className="absolute inset-0 border-2 border-[#1a1a1a] translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform z-0 pointer-events-none" style={{ borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px' }}></div>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
