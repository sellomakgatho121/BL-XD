"use client";

import { motion } from "framer-motion";

/**
 * AsymmetricNav
 * Architecture: Option A (Extreme Asymmetry + Z-Axis Depth)
 * Execution: Floating, unanchored from traditional top-bars, interacting with the Z-axis.
 */
export function AsymmetricNav() {
    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-50 pointer-events-none p-6 md:p-12 mix-blend-difference"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
        >
            <div className="flex justify-between items-start w-full">
                {/* Brand - Pushed extreme left */}
                <div className="pointer-events-auto">
                    <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-foreground">
                        BL<span className="text-primary">-</span>XD
                    </span>
                </div>

                {/* Links - Extreme Asymmetry. Stacked vertically on the right instead of a horizontal bar. */}
                <nav className="pointer-events-auto flex flex-col items-end gap-1 md:gap-2">
                    {["Work", "Studio", "System", "Contact"].map((item, i) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="group relative text-sm md:text-base font-bold uppercase tracking-widest text-foreground overflow-hidden px-2 py-1"
                            whileHover={{ x: -10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <span className="relative z-10 group-hover:text-primary transition-colors">{item}</span>
                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />
                        </motion.a>
                    ))}
                </nav>
            </div>
        </motion.header>
    );
}
