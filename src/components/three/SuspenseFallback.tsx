"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SuspenseFallback({ className = "" }: { className?: string }) {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#D7FF00" wireframe />
    </mesh>
  );
}
