"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

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
    float dist = distance(vUv, uMouse);
    float revealRadius = 0.3;
    float reveal = 1.0 - smoothstep(0.0, revealRadius, dist);
    reveal = pow(reveal, 2.0);
    
    float grain = noise(vUv * 50.0 + uTime * 0.5) * 0.1;
    
    vec3 signalLime = vec3(0.843, 1.0, 0.0);
    vec3 baseColor = vec3(0.02, 0.02, 0.025);
    
    vec3 color = baseColor;
    color += signalLime * reveal * uIntensity;
    color += grain * reveal * 0.5;
    
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    color += signalLime * reveal * pulse * 0.1;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function BlacklightRevealShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: 1.2 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
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

function FloatingShards() {
  const shards = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 3,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.08 + Math.random() * 0.25,
      speed: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  return (
    <>
      {shards.map((shard, i) => (
        <Float
          key={i}
          speed={shard.speed}
          rotationIntensity={0.8}
          floatIntensity={0.6}
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
              opacity={0.12 + Math.random() * 0.08}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#D7FF00"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0004, 0.0004)}
        radialModulation={true}
        modulationOffset={0.6}
      />
      <Vignette
        offset={0.35}
        darkness={0.75}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

export function BlacklightScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "#0A0A0A" }}
    >
      <Suspense fallback={null}>
        <BlacklightRevealShader />
        <FloatingShards />
        <ParticleNetwork />
        <PostProcessing />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

export default BlacklightScene;
