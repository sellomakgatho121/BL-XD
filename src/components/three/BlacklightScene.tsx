"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

/* ─────────────────────────────────────────────
   CYBERNETIC FLOW-FIELD SWARM
   Highly optimized CPU-driven instanced mesh
   simulating a flow field + mouse repulsion.
   ───────────────────────────────────────────── */

// Simple pseudo-random hash for noise
function hash(n: number) {
  return Math.sin(n) * 43758.5453;
}

// Very cheap 3D noise (Simplex approx) for CPU curl field
function noise3D(x: number, y: number, z: number) {
  const p = Math.floor(x) + Math.floor(y) * 57 + Math.floor(z) * 113;
  let res =
    Math.sin(p) +
    Math.sin(p + 57) +
    Math.sin(p + 113) +
    Math.sin(p + 57 + 113);
  return res * 0.25;
}

function computeCurl(x: number, y: number, z: number, eps = 0.5) {
  const n1 = noise3D(x, y + eps, z);
  const n2 = noise3D(x, y - eps, z);
  const n3 = noise3D(x, y, z + eps);
  const n4 = noise3D(x, y, z - eps);
  const n5 = noise3D(x + eps, y, z);
  const n6 = noise3D(x - eps, y, z);

  const cx = n1 - n2 - (n3 - n4);
  const cy = n3 - n4 - (n5 - n6);
  const cz = n5 - n6 - (n1 - n2);

  return [cx, cy, cz];
}

interface SwarmProps {
  count?: number;
  isMobile?: boolean;
}

function FlowFieldSwarm({ count = 1200, isMobile = false }: SwarmProps) {
  const actualCount = isMobile ? Math.floor(count * 0.3) : count;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const mousePlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 0));
  const mouseSmooth = useRef(new THREE.Vector3(0, 0, 0));
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  // Use flat arrays for maximum CPU cache performance (Data-oriented design)
  const particles = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const vel = new Float32Array(actualCount * 3);
    const origins = new Float32Array(actualCount * 3);
    const scales = new Float32Array(actualCount);
    const colors = new Float32Array(actualCount * 3);

    const colorLime = new THREE.Color("#D7FF00"); // Signal Lime
    const colorRed = new THREE.Color("#FF003C");  // Siren Red (Accent)
    const colorWhite = new THREE.Color("#FDFDFD"); // Spectral White
    const tempColor = new THREE.Color();

    for (let i = 0; i < actualCount; i++) {
      // distribute them in a vast volume
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20 - 5;

      pos[i * 3 + 0] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origins[i * 3 + 0] = x;
      origins[i * 3 + 1] = y;
      origins[i * 3 + 2] = z;

      vel[i * 3 + 0] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;

      scales[i] = Math.random() * 0.08 + 0.02;

      // 80% Lime, 15% White, 5% Red
      const r = Math.random();
      if (r > 0.95) tempColor.copy(colorRed);
      else if (r > 0.8) tempColor.copy(colorWhite);
      else tempColor.copy(colorLime);

      colors[i * 3 + 0] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }

    return { pos, vel, origins, scales, colors };
  }, [actualCount]);

  const { pointer, camera } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.3;

    // Raycast mouse to world plane
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(mousePlane, mouseWorld.current);

    // Smooth mouse position for fluid repulsion
    mouseSmooth.current.lerp(mouseWorld.current, 0.1);

    const dt = 0.016; // fixed dt for stable physics
    const pos = particles.pos;
    const vel = particles.vel;
    const origins = particles.origins;

    // Mouse repulsion variables
    const mx = mouseSmooth.current.x;
    const my = mouseSmooth.current.y;
    // Push particles away faster when mouse is moving fast, or just a static radius
    const repulsionRadius = 6.0;
    const repulsionForce = 0.8;

    for (let i = 0; i < actualCount; i++) {
      const idx = i * 3;
      let px = pos[idx + 0];
      let py = pos[idx + 1];
      let pz = pos[idx + 2];

      // 1. Calculate Curl Noise Flow Force
      // Scale coordinates down to make the noise field wider
      const scale = 0.15;
      const [cx, cy, cz] = computeCurl(px * scale + t, py * scale, pz * scale + t);

      // 2. Return to origin force (keeps the swarm bounded)
      const ox = origins[idx + 0];
      const oy = origins[idx + 1];
      const oz = origins[idx + 2];

      const dx = ox - px;
      const dy = oy - py;
      const dz = oz - pz;

      // 3. Mouse Repulsion Force
      let repelX = 0, repelY = 0, repelZ = 0;
      const distX = px - mx;
      const distY = py - my;
      const sqDist = distX * distX + distY * distY + pz * pz; // treating Z distance from plane 0

      if (sqDist < repulsionRadius * repulsionRadius) {
        const dist = Math.sqrt(sqDist) + 0.001;
        const normalX = distX / dist;
        const normalY = distY / dist;
        const normalZ = pz / dist;
        const force = (repulsionRadius - dist) / repulsionRadius;

        repelX = normalX * force * repulsionForce;
        repelY = normalY * force * repulsionForce;
        repelZ = normalZ * force * repulsionForce * 0.5; // less Z push
      }

      // Apply forces to velocity (Curl + Origin pull + Repulse)
      vel[idx + 0] += (cx * 2.0 + dx * 0.05 + repelX) * dt;
      vel[idx + 1] += (cy * 2.0 + dy * 0.05 + repelY) * dt;
      vel[idx + 2] += (cz * 2.0 + dz * 0.05 + repelZ) * dt;

      // Dampening (friction)
      vel[idx + 0] *= 0.92;
      vel[idx + 1] *= 0.92;
      vel[idx + 2] *= 0.92;

      // Update positions
      px += vel[idx + 0];
      py += vel[idx + 1];
      pz += vel[idx + 2];

      pos[idx + 0] = px;
      pos[idx + 1] = py;
      pos[idx + 2] = pz;

      // Update Dummy Matrix
      dummy.position.set(px, py, pz);

      // Orient tetrahedrons towards their velocity vector for swarm feeling
      const speedSq = vel[idx + 0] ** 2 + vel[idx + 1] ** 2 + vel[idx + 2] ** 2;
      if (speedSq > 0.001) {
        const target = dummy.position.clone().add(new THREE.Vector3(vel[idx + 0], vel[idx + 1], vel[idx + 2]));
        dummy.lookAt(target);
      } else {
        dummy.rotation.set(0, 0, 0);
      }

      // Add persistent rotation spin based on particle ID
      dummy.rotateZ(t * 2.0 * ((i % 5) - 2));

      dummy.scale.setScalar(particles.scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Inject colors
      meshRef.current.setColorAt(
        i,
        new THREE.Color(particles.colors[idx], particles.colors[idx + 1], particles.colors[idx + 2])
      );
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, actualCount]} renderOrder={1}>
      <tetrahedronGeometry args={[1, 0]} />
      {/* MeshBasicMaterial is unlit, perfect for glowing bloom objects */}
      <meshBasicMaterial
        wireframe
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/* ─────────────────────────────────────────────
   BACKGROUND ACCENT (Ambient glow)
   ───────────────────────────────────────────── */

function AccentGlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    meshRef.current.position.x += (pointer.x * 5 - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (pointer.y * 3 - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[20, 20, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#D7FF00" transparent opacity={0.015} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   POST-PROCESSING STACK
   Bloom + ChromaticAberration + Vignette
   ───────────────────────────────────────────── */

function PostProcessing({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette
          offset={0.4}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0015, 0.0015)}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Vignette
        offset={0.4}
        darkness={0.9}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

/* ─────────────────────────────────────────────
   MAIN SCENE EXPORT
   ───────────────────────────────────────────── */

interface BlacklightSceneProps {
  isMobile?: boolean;
  reducedMotion?: boolean;
}

export function BlacklightScene({ isMobile = false, reducedMotion = false }: BlacklightSceneProps) {
  if (reducedMotion) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(215,255,0,0.06) 0%, #0A0A0A 70%)`,
        }}
      />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={isMobile ? [1, 1] : [1, 2]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ background: "#0A0A0A", pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <FlowFieldSwarm count={isMobile ? 300 : 1500} isMobile={isMobile} />
        <AccentGlow />
        <PostProcessing isMobile={isMobile} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

export default BlacklightScene;
