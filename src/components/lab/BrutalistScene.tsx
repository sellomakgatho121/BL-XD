"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Box, Sphere, MeshDistortMaterial } from "@react-three/drei";

function GlitchBox({ position, title, color }: { position: [number, number, number], title: string, color: string }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;

      // Random glitch
      if (Math.random() > 0.98) {
        mesh.current.scale.set(1.1, 0.9, 1.1);
        setTimeout(() => mesh.current?.scale.set(1, 1, 1), 50);
      }
    }
  });

  return (
    <group position={position}>
      <Box ref={mesh} args={[2, 2, 0.5]}>
        <meshBasicMaterial color={color} wireframe />
      </Box>
      <Text
        position={[0, 0, 0.3]}
        fontSize={0.4}
        color="white"

        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  );
}

function ScanLines() {
  const lineCount = 50;
  const lines = useMemo(() => {
    const l = [];
    for (let i = 0; i < lineCount; i++) {
      l.push((i - lineCount / 2) * 1);
    }
    return l;
  }, []);

  return (
    <group>
      {lines.map((y, i) => (
        <Box key={i} args={[50, 0.01, 0.01]} position={[0, y, -5]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
        </Box>
      ))}
    </group>
  );
}

export default function BrutalistScene() {
  return (
    <>
      <color attach="background" args={["#111111"]} />
      <ambientLight intensity={0.5} />

      <GlitchBox position={[0, 0, 0]} title="CORE" color="#ffffff" />
      <GlitchBox position={[4, 2, -1]} title="ARCHIVE" color="#siren-red" />
      <GlitchBox position={[-4, -2, -1]} title="PROTOCOL" color="#signal-lime" />

      <ScanLines />
    </>
  );
}
