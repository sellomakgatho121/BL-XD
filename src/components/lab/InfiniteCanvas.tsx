"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion-3d";

interface NodeProps {
  position: [number, number, number];
  title: string;
  color: string;
  onClick: (pos: THREE.Vector3) => void;
}

function Node({ position, title, color, onClick }: NodeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  useCursor(hovered);

  const vec = useMemo(() => new THREE.Vector3(...position), [position]);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(vec)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#fff" : color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        {/* Placeholder for text - in a real app we'd use <Text /> from drei */}
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshBasicMaterial color="white" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

export default function InfiniteCanvas({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />

        {children}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
