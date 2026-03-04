"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Window1() {
    const [activeCell, setActiveCell] = useState<number | null>(null);

    const gridItems = [
        { title: "Header", colSpan: "col-span-12", rowSpan: "row-span-1" },
        { title: "Hero Insight", colSpan: "col-span-12 md:col-span-8", rowSpan: "row-span-2" },
        { title: "Stat 1", colSpan: "col-span-6 md:col-span-4", rowSpan: "row-span-1" },
        { title: "Stat 2", colSpan: "col-span-6 md:col-span-4", rowSpan: "row-span-1" },
        { title: "Feature Image", colSpan: "col-span-12 md:col-span-4", rowSpan: "row-span-2" },
        { title: "Article Block", colSpan: "col-span-12 md:col-span-8", rowSpan: "row-span-2" },
        { title: "Sidebar Nav", colSpan: "col-span-12 md:col-span-4", rowSpan: "row-span-3" },
        { title: "CTA Widget", colSpan: "col-span-12 md:col-span-8", rowSpan: "row-span-1" },
    ];

    return (
        <div className="w-full h-full bg-[var(--neo-white)] p-2 md:p-6 overflow-y-auto">
            <div className="mb-4">
                <h3 className="text-2xl font-black uppercase tracking-widest border-b-4 border-[var(--neo-black)] inline-block pr-6">
                    Architectural Layout
                </h3>
                <p className="font-bold text-sm mt-2 max-w-md opacity-80">
                    Advanced CSS Grids. Hover or click to highlight module parameters. This layout dynamically reflows based on viewport space while respecting column hierarchy.
                </p>
            </div>

            <div className="grid grid-cols-12 auto-rows-[100px] md:auto-rows-[120px] gap-4 w-full">
                {gridItems.map((item, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => setActiveCell(i)}
                        onMouseLeave={() => setActiveCell(null)}
                        className={`${item.colSpan} ${item.rowSpan} border-4 border-[var(--neo-black)] bg-[var(--neo-yellow)] p-4 flex flex-col justify-between group transition-all duration-300 hover:bg-[var(--neo-black)] hover:text-[var(--neo-white)] cursor-crosshair neo-shadow-interactive ${activeCell === i ? "translate-x-1 -translate-y-1 shadow-[4px_4px_0px_var(--neo-pink)]" : ""}`}
                        onClick={(e) => {
                            // Prevent default scroll behavior if click triggers anything
                            e.preventDefault();
                        }}
                    >
                        <div className="font-bold uppercase tracking-wider text-sm flex justify-between items-start">
                            <span>{item.title}</span>
                            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                        </div>

                        <div className="font-mono text-[10px] md:text-xs opacity-60 group-hover:opacity-100 group-hover:text-[var(--neo-pink)]">
                            {item.colSpan} <br /> {item.rowSpan}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
