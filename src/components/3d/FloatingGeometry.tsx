"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: "box" | "octahedron" | "tetrahedron" | "icosahedron";
  scale?: number;
  color?: string;
  wireframe?: boolean;
  rotationSpeed?: number;
  floatAmplitude?: number;
  floatFrequency?: number;
  mouseInfluence?: number;
}

/**
 * FloatingShape
 * A single geometric primitive that floats in space and reacts to pointer movement.
 * Sharp-edged, wireframe aesthetic matching the Blacklight brutalist language.
 */
function FloatingShape({
  position,
  geometry,
  scale = 1,
  color = "#D7FF00",
  wireframe = true,
  rotationSpeed = 0.3,
  floatAmplitude = 0.3,
  floatFrequency = 0.5,
  mouseInfluence = 0.8,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(new THREE.Vector3(...position));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  const { pointer } = useThree();

  const geometryNode = useMemo(() => {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.8, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[0.8, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.7, 0]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [geometry]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Floating animation
    meshRef.current.position.y =
      initialPosition.current.y +
      Math.sin(t * floatFrequency + initialPosition.current.x) * floatAmplitude;
    meshRef.current.position.x =
      initialPosition.current.x +
      Math.sin(t * floatFrequency * 0.7 + initialPosition.current.y) * floatAmplitude * 0.5;

    // Mouse influence - shapes drift toward pointer
    meshRef.current.position.x += pointer.x * mouseInfluence;
    meshRef.current.position.y += pointer.y * mouseInfluence * 0.5;

    // Rotation
    targetRotation.current.x = pointer.y * 0.3;
    targetRotation.current.y = pointer.x * 0.3;

    meshRef.current.rotation.x +=
      (targetRotation.current.x + t * rotationSpeed - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y +=
      (targetRotation.current.y + t * rotationSpeed * 0.7 - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometryNode}
      {wireframe ? (
        <>
          <meshBasicMaterial transparent opacity={0.03} color={color} />
          <Edges threshold={15} color={color} lineWidth={1.5} />
        </>
      ) : (
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      )}
    </mesh>
  );
}

interface FloatingGeometryProps {
  /** Number of shapes to generate */
  count?: number;
  /** Spread range on each axis */
  spread?: number;
  /** Primary accent color */
  primaryColor?: string;
  /** Secondary accent color */
  secondaryColor?: string;
  /** Mouse influence strength */
  mouseInfluence?: number;
}

/**
 * FloatingGeometry
 * A field of sharp-edged geometric primitives floating in 3D space.
 * Each shape reacts to pointer movement with drift and rotation.
 * Brand: Brutalist wireframes in Signal Lime and Siren Red on Onyx void.
 */
export function FloatingGeometry({
  count = 12,
  spread = 6,
  primaryColor = "#D7FF00",
  secondaryColor = "#FF003C",
  mouseInfluence = 0.8,
}: FloatingGeometryProps) {
  const shapes = useMemo(() => {
    const geometries: FloatingShapeProps["geometry"][] = [
      "box",
      "octahedron",
      "tetrahedron",
      "icosahedron",
    ];
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.5 - 1,
      ] as [number, number, number],
      geometry: geometries[i % geometries.length],
      scale: 0.3 + Math.random() * 0.6,
      color: Math.random() > 0.7 ? secondaryColor : primaryColor,
      rotationSpeed: 0.1 + Math.random() * 0.4,
      floatAmplitude: 0.1 + Math.random() * 0.3,
      floatFrequency: 0.3 + Math.random() * 0.5,
      mouseInfluence: mouseInfluence * (0.5 + Math.random() * 0.5),
    }));
  }, [count, spread, primaryColor, secondaryColor, mouseInfluence]);

  return (
    <group>
      {/* Minimal ambient light - we want the wireframe glow aesthetic */}
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color={primaryColor} />
      <pointLight position={[-5, -3, 3]} intensity={0.15} color={secondaryColor} />

      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </group>
  );
}
