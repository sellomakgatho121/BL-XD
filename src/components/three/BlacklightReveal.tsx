"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// Custom shader for the Blacklight Reveal effect
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    // Calculate distance from mouse position (in UV space)
    float dist = distance(vUv, uMouse);
    
    // Create the "reveal" effect - illuminates within radius
    float revealRadius = 0.25;
    float reveal = 1.0 - smoothstep(0.0, revealRadius, dist);
    reveal = pow(reveal, 2.0);
    
    // Add noise/grain for texture
    float grain = noise(vUv * 50.0 + uTime * 0.5) * 0.1;
    
    // Signal Lime color (#D7FF00)
    vec3 signalLime = vec3(0.843, 1.0, 0.0);
    
    // Base color - barely visible in void
    vec3 baseColor = vec3(0.02, 0.02, 0.025);
    
    // Calculate final color
    vec3 color = baseColor;
    color += signalLime * reveal * uIntensity;
    color += grain * reveal * 0.5;
    
    // Add subtle pulse
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    color += signalLime * reveal * pulse * 0.1;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface BlacklightRevealProps {
  intensity?: number;
}

export function BlacklightReveal({ intensity = 1.0 }: BlacklightRevealProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: intensity },
    }),
    [intensity]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Convert pointer to UV coordinates
      const mouseX = (pointer.x + 1) / 2;
      const mouseY = (pointer.y + 1) / 2;
      material.uniforms.uMouse.value.set(mouseX, mouseY);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

// Floating sharp geometry shards
export function FloatingShards({ count = 20 }) {
  const shards = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5 - 2,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.1 + Math.random() * 0.3,
      speed: 0.2 + Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <>
      {shards.map((shard, i) => (
        <Float
          key={i}
          speed={shard.speed}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh position={shard.position} rotation={shard.rotation} scale={shard.scale}>
            {i % 3 === 0 ? (
              <octahedronGeometry args={[1, 0]} />
            ) : i % 3 === 1 ? (
              <tetrahedronGeometry args={[1, 0]} />
            ) : (
              <icosahedronGeometry args={[1, 0]} />
            )}
            <meshBasicMaterial 
              color="#D7FF00" 
              wireframe 
              transparent 
              opacity={0.15 + Math.random() * 0.1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// Animated particle network
export function ParticleNetwork({ count = 100 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      scales[i] = Math.random();
    }
    
    return { positions, scales };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#D7FF00"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default BlacklightReveal;
