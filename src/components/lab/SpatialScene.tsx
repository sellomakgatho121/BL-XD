"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars, Text, Float } from "@react-three/drei";

function PortalNode({ position, title }: { position: [number, number, number], title: string }) {
  const mesh = useRef<THREE.Group>(null);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position} ref={mesh}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} wireframe />
        </mesh>
        <Text
          position={[0, 0, 1.5]}
          fontSize={0.3}
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

function DeepField() {
  const count = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.2} />
    </points>
  );
}

export default function SpatialScene() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 0, 40]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#3b82f6" />

      <PortalNode position={[0, 0, 0]} title="NEXUS" />
      <PortalNode position={[10, 5, -20]} title="FRONTIER" />
      <PortalNode position={[-15, -8, -40]} title="VOORHEES" />
      <PortalNode position={[20, -15, -60]} title="INFINITY" />

      <DeepField />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}
