"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TiltStrength = "subtle" | "medium" | "strong";

function strengthToDegrees(strength: TiltStrength) {
  switch (strength) {
    case "subtle":
      return 6;
    case "strong":
      return 14;
    default:
      return 10;
  }
}

export function Tilt3D({
  className,
  strength = "medium",
  z = 10,
  children,
}: {
  className?: string;
  strength?: TiltStrength;
  z?: number;
  children: React.ReactNode;
}) {
  const deg = strengthToDegrees(strength);

  return (
    <div
      className={cn("perspective-900 tilt-3d sheen-3d", className)}
      onPointerMove={(e) => {
        const el = e.currentTarget as HTMLElement;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const ry = (px - 0.5) * deg;
        const rx = (0.5 - py) * deg;
        el.style.setProperty("--rx", `${rx}deg`);
        el.style.setProperty("--ry", `${ry}deg`);
        el.style.setProperty("--tz", `${z}px`);
        el.style.setProperty("--sheen-x", `${px * 100}%`);
        el.style.setProperty("--sheen-y", `${py * 100}%`);
        el.dataset.tiltActive = "true";
      }}
      onPointerLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--tz", "0px");
        el.dataset.tiltActive = "false";
      }}
    >
      {children}
    </div>
  );
}

