"use client";

import dynamic from "next/dynamic";

const SmoothScroll = dynamic(
    () => import("@/components/three/SmoothScroll"),
    { ssr: false }
);

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SmoothScroll>{children}</SmoothScroll>;
}
