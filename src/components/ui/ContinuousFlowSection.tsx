"use client";

import { motion } from "framer-motion";
import { FluidStreamWrapper } from "@/components/animations/FluidStreamWrapper";

/**
 * ContinuousFlowSection
 * Architecture: Option C (Continuous Fluid Stream)
 * Execution: No standard grids. Elements flow in a staggered, cinematic, continuous vertical storytelling format.
 */
export function ContinuousFlowSection() {
    const content = [
        {
            id: "01",
            title: "Break Safe Harbors",
            body: "We engineer digital anomalies. If it looks like a template, we discard it. Our development process prioritizes extreme visual tension and zero-compromise physics.",
            align: "items-start text-left pl-0 md:pl-12 lg:pl-24",
        },
        {
            id: "02",
            title: "Interactive Tension",
            body: "Z-axis depth mapping combined with spring-physics motion transforms passive scrolling into an active, tactile digital experience.",
            align: "items-end text-right pr-0 md:pr-12 lg:pr-24",
        },
        {
            id: "03",
            title: "Absolute Brutalism",
            body: "High contrast. Zero border radius. Massive typography. We build for brands that demand authority, not compliance.",
            align: "items-start text-left pl-0 md:pl-24 lg:pl-48",
        }
    ];

    return (
        <section id="work" className="relative w-full py-32 md:py-64 bg-background overflow-hidden">

            {/* Background Parallax Typography Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-[0.03] select-none z-0">
                <span className="text-[25vw] font-black tracking-tighter text-foreground whitespace-nowrap">
                    FLOW
                </span>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-32 md:gap-64">
                {content.map((item, index) => (
                    <FluidStreamWrapper key={item.id} delay={0.1} className={`w-full flex flex-col ${item.align}`}>

                        <div className="flex flex-col max-w-2xl">
                            <span className="text-primary font-mono text-sm md:text-base tracking-widest mb-4 block">
                                [ INDEX_{item.id} ]
                            </span>

                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-foreground mb-8 leading-[0.9]">
                                {item.title}
                            </h2>

                            <p className="text-base md:text-xl md:leading-relaxed text-foreground/70 font-medium">
                                {item.body}
                            </p>

                            <motion.div
                                className="mt-12 h-[1px] w-full bg-border origin-left"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            />
                        </div>

                    </FluidStreamWrapper>
                ))}
            </div>
        </section>
    );
}
