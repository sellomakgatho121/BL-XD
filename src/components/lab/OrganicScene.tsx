"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial, Text } from "@react-three/drei";

function Blob({ position, color, size, title }: { position: [number, number, number], color: string, size: number, title: string }) {
  const mesh = useRef<THREE.Mesh>(null);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh ref={mesh}>
          <sphereGeometry args={[size, 64, 64]} />
          <MeshDistortMaterial
            color={color}
            speed={3}
            distort={0.4}
            radius={1}
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
        <Text
          position={[0, 0, size + 0.5]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </group>
    </Float>
  );
}

function Particles() {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const points = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#D7FF00" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export default function OrganicScene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 0, 15]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#D7FF00" />

      <Blob position={[0, 0, 0]} color="#D7FF00" size={1.5} title="CELL_01" />
      <Blob position={[5, 2, -5]} color="#D7FF00" size={1} title="CELL_02" />
      <Blob position={[-4, -3, -3]} color="#D7FF00" size={0.8} title="CELL_03" />

      <Particles />
    </>
  );
}
