"use client";

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.05,
            duration: 1.5,
            smoothWheel: true
        }}>
            {/* @ts-expect-error mismatched react 19 typings on older package */}
            {children}
        </ReactLenis>
    );
}
