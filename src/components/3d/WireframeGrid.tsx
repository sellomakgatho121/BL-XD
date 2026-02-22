"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface WireframeGridProps {
  /** Grid size (segments per side) */
  segments?: number;
  /** Physical size of the grid */
  size?: number;
  /** Color of the grid lines */
  color?: string;
  /** How much the grid deforms toward the pointer */
  deformStrength?: number;
  /** Radius of the deformation wave */
  deformRadius?: number;
  /** Wave animation speed */
  waveSpeed?: number;
  /** Wave amplitude for ambient motion */
  waveAmplitude?: number;
}

/**
 * WireframeGrid
 * A flat wireframe grid that deforms toward the user's pointer in 3D space.
 * Creates an organic, reactive surface that feels alive and responsive.
 * Brand: Signal Lime lines on the void, sharp and technical.
 */
export function WireframeGrid({
  segments = 40,
  size = 10,
  color = "#D7FF00",
  deformStrength = 1.5,
  deformRadius = 3,
  waveSpeed = 0.8,
  waveAmplitude = 0.15,
}: WireframeGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();

  // Store original positions for reference
  const originalPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    return Float32Array.from(geo.attributes.position.array);
  }, [size, segments]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position;
    const t = state.clock.elapsedTime;

    // Convert pointer to world space on the grid plane
    const mouseX = (pointer.x * viewport.width) / 2;
    const mouseY = (pointer.y * viewport.height) / 2;

    for (let i = 0; i < positions.count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];

      // Distance from pointer
      const dx = ox - mouseX;
      const dy = oy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Deformation: vertices rise toward the pointer within radius
      const deform =
        dist < deformRadius
          ? Math.cos((dist / deformRadius) * Math.PI * 0.5) * deformStrength
          : 0;

      // Ambient wave animation
      const wave =
        Math.sin(ox * 0.5 + t * waveSpeed) *
        Math.cos(oy * 0.5 + t * waveSpeed * 0.7) *
        waveAmplitude;

      positions.setZ(i, deform + wave);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[size, size, segments, segments]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}
