"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, Html, Float, Sparkles, Stars, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

const auroraVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 st = (uv - 0.5) * vec2(aspect, 1.0);
    
    float t = uTime * 0.15;
    
    vec2 mouseInfluence = (uMouse - 0.5) * 0.4;
    st += mouseInfluence * 0.15 * smoothstep(0.8, 0.0, length(st - mouseInfluence));
    
    float n1 = fbm(vec3(st * 1.5 + t * 0.3, t * 0.2));
    float n2 = fbm(vec3(st * 2.0 - t * 0.2, t * 0.15 + 50.0));
    
    float ribbon1 = snoise(vec3(st.x * 3.0 + t, st.y * 1.5 + n1 * 0.8, t * 0.4));
    float ribbon2 = snoise(vec3(st.x * 2.0 - t * 0.7, st.y * 2.5 + n2 * 0.6, t * 0.3 + 20.0));
    float ribbon3 = snoise(vec3(st.x * 4.0 + t * 0.5, st.y * 1.0 + n1 * 1.2, t * 0.25 + 40.0));
    
    vec3 colLime = vec3(0.84, 1.0, 0.0);
    vec3 colCyan = vec3(0.0, 0.85, 1.0);
    vec3 colViolet = vec3(0.4, 0.0, 0.9);
    vec3 colRed = vec3(1.0, 0.0, 0.24);
    vec3 colWarm = vec3(1.0, 0.5, 0.0);
    
    float blend1 = smoothstep(-0.3, 0.6, ribbon1);
    float blend2 = smoothstep(-0.2, 0.5, ribbon2);
    float blend3 = smoothstep(-0.1, 0.7, ribbon3);
    
    vec3 color = mix(colViolet * 0.3, colCyan, blend1 * 0.7);
    color = mix(color, colLime, blend2 * 0.5);
    color = mix(color, colRed * 0.6, blend3 * 0.3);
    color += colWarm * smoothstep(0.4, 0.8, n1) * 0.15;
    
    float intensity = smoothstep(-0.2, 0.5, ribbon1) * 0.6;
    intensity += smoothstep(-0.1, 0.4, ribbon2) * 0.4;
    intensity += smoothstep(0.0, 0.6, ribbon3) * 0.2;
    
    float mouseDist = length(st - mouseInfluence);
    intensity += smoothstep(0.8, 0.0, mouseDist) * 0.3;
    
    float edgeFade = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x);
    edgeFade *= smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);
    
    vec3 deepSpace = vec3(0.02, 0.02, 0.03);
    vec3 finalColor = deepSpace + color * intensity * edgeFade * 1.5;
    
    float grain = (fract(sin(dot(uv * uTime * 0.1, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
    finalColor += grain;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function AuroraBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const mouseSmooth = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size.width, size.height]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const mx = (state.pointer.x * 0.5) + 0.5;
    const my = (state.pointer.y * 0.5) + 0.5;
    mouseSmooth.current.x += (mx - mouseSmooth.current.x) * 0.05;
    mouseSmooth.current.y += (my - mouseSmooth.current.y) * 0.05;
    materialRef.current.uniforms.uMouse.value.copy(mouseSmooth.current);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[viewport.width * 1.2, viewport.height * 1.2, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={auroraVertexShader}
        fragmentShader={auroraFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

function FloatingCrystal({ position, color, delay }: { position: [number, number, number]; color: string; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + delay;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.3, 0]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.84; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.0;
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 1.0;
      } else {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.0; colors[i * 3 + 2] = 0.24;
      }
      
      sizes[i] = Math.random() * 0.05 + 0.02;
    }
    
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MouseInteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    meshRef.current.position.x += (x * 0.5 - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (-y * 0.5 - meshRef.current.position.y) * 0.05;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <MeshWobbleMaterial
        color="#D7FF00"
        speed={3}
        factor={0.4}
        transparent
        opacity={0.7}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function SpatialWaypoints() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const waypointRefs = useRef<(THREE.Mesh | null)[]>([null, null, null]);
  
  const sections = [
    { label: "Manifesto", position: new THREE.Vector3(5, 2, 8), color: "#D7FF00" },
    { label: "Tiers", position: new THREE.Vector3(5, 0, -2), color: "#00D9FF" },
    { label: "Standard", position: new THREE.Vector3(5, -1, -12), color: "#D7FF00" },
  ];

  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scroll.offset;
    
    sections.forEach((section, i) => {
      const mesh = waypointRefs.current[i];
      if (!mesh) return;
      
      const sectionProgress = i / (sections.length - 1);
      const dist = Math.abs(offset - sectionProgress);
      const isActive = dist < 0.15;
      
      const targetScale = isActive ? 0.12 : 0.06;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = isActive ? 0.9 : 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {sections.map((section, i) => (
        <group key={i} position={section.position.toArray()}>
          <mesh ref={(el) => { waypointRefs.current[i] = el; }}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color={section.color} transparent opacity={0.3} />
          </mesh>
          <Html position={[0.3, 0, 0]} style={{ pointerEvents: "none", whiteSpace: "nowrap" }} distanceFactor={8}>
            <span className="text-[10px] tracking-[0.3em] uppercase font-light opacity-40" style={{ fontFamily: "var(--font-raleway), sans-serif", color: section.color }}>
              {section.label}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

function CameraController() {
  const scroll = useScroll();
  
  useFrame((state) => {
    const progress = scroll.offset;
    const zPos = 15 - progress * 30;
    const xPos = Math.sin(progress * Math.PI) * 2;
    const yPos = Math.cos(progress * Math.PI * 0.5) * 1.5 - 0.5;
    state.camera.position.set(xPos, yPos, zPos);
    state.camera.lookAt(0, 0, zPos - 10); 
  });
  
  return null;
}

function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        offset={[0.001, 0.001]}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0.5}
      />
      <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
    </EffectComposer>
  );
}

const sceneStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); filter: blur(6px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes fadeSlideUpDelay1 {
    0%, 10% { opacity: 0; transform: translateY(30px); filter: blur(6px); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes fadeSlideUpDelay2 {
    0%, 20% { opacity: 0; transform: translateY(25px); filter: blur(4px); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes fadeSlideUpDelay3 {
    0%, 35% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes subtlePulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(215,255,0,0.3); }
    50% { box-shadow: 0 0 40px rgba(215,255,0,0.6); }
  }
  .anim-reveal-1 { animation: fadeSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
  .anim-reveal-2 { animation: fadeSlideUpDelay1 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
  .anim-reveal-3 { animation: fadeSlideUpDelay2 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
  .anim-reveal-4 { animation: fadeSlideUpDelay3 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
  .anim-pulse { animation: subtlePulse 3s ease-in-out infinite; }
  .anim-float { animation: float 6s ease-in-out infinite; }
  .anim-glow { animation: glow 2s ease-in-out infinite; }
  .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
  .magnetic-cursor { cursor: none; }
`;

function SpatialHTMLUI() {
  return (
    <Scroll html style={{ width: "100%", height: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: sceneStyles }} />
      <div className="w-screen h-[300vh] relative pointer-events-none">
        <section className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-end p-8 md:p-16">
          <div className="pointer-events-auto pb-12 w-full max-w-5xl">
            <h2 className="anim-reveal-1 text-[11vw] md:text-[7rem] font-bold italic leading-[0.85] tracking-tight bg-gradient-to-r from-[#D7FF00] via-[#00D9FF] to-[#D7FF00] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-playfair), serif", WebkitBackgroundClip: "text" }}>
              Vision.
            </h2>
            <h2 className="anim-reveal-2 text-[11vw] md:text-[7rem] font-extrabold leading-[0.85] tracking-tight bg-gradient-to-r from-white/90 via-[#00D9FF] to-white/90 bg-clip-text text-transparent -mt-1" style={{ fontFamily: "var(--font-raleway), sans-serif", WebkitBackgroundClip: "text" }}>
              Craft.
            </h2>
            <div className="anim-reveal-3 mt-8 inline-flex items-center gap-3">
              <div className="h-[1px] w-12 bg-gradient-to-r from-[#D7FF00]/60 to-transparent"></div>
              <span className="text-[#D7FF00]/70 tracking-[0.3em] uppercase text-[11px] font-light" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>No Creative Walls</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-[#D7FF00]/60 to-transparent"></div>
            </div>
            <p className="anim-reveal-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mt-6 pl-6 font-light" style={{ fontFamily: "var(--font-raleway), sans-serif", borderLeft: "2px solid", borderImage: "linear-gradient(to bottom, #D7FF00, transparent) 1" }}>
              We translate the unique essence of your business into a bespoke{" "}
              <span className="bg-gradient-to-r from-[#D7FF00] to-[#00D9FF] bg-clip-text text-transparent font-semibold" style={{ WebkitBackgroundClip: "text" }}>
                Digital Experience
              </span>
              . What you want is exactly what we bring to life.
            </p>
          </div>
        </section>

        <section className="absolute top-[100vh] left-0 w-screen h-screen flex items-center justify-center p-4 md:p-12">
          <div className="pointer-events-auto w-full max-w-[90vw]">
            <div className="text-center mb-8">
              <span className="text-[11px] tracking-[0.5em] uppercase text-white/40 font-light anim-pulse" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>Investment Tiers</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div className="relative group p-8 md:p-10 flex flex-col justify-between min-h-[320px] overflow-hidden transition-all duration-500 hover:-translate-y-3 active:-translate-y-3 backdrop-blur-sm hover-lift cursor-pointer" style={{ background: "linear-gradient(135deg, rgba(255,0,60,0.08) 0%, rgba(5,5,5,0.9) 40%, rgba(5,5,5,0.95) 100%)", borderTop: "1px solid rgba(255,0,60,0.3)", WebkitTapHighlightColor: "transparent" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <span className="font-mono text-white/25 text-[10px] tracking-widest">01</span>
                  <h2 className="text-3xl md:text-4xl font-bold italic leading-[0.9] mt-2 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-playfair), serif", WebkitBackgroundClip: "text" }}>Ember</h2>
                  <p className="text-white/50 mt-4 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>Single-viewport digital canvas. Crafted in 24 hours.</p>
                </div>
                <div className="relative z-10 mt-8">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FF003C] to-[#FF8000] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-raleway), sans-serif", WebkitBackgroundClip: "text" }}>R950</span>
                  <span className="block text-white/30 text-[10px] font-mono mt-1 tracking-wider">ONCE-OFF</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF003C]/40 to-transparent"></div>
              </div>
              
              <div className="relative group p-8 md:p-10 flex flex-col justify-between min-h-[320px] md:-translate-y-6 overflow-hidden transition-all duration-500 hover:-translate-y-10 active:-translate-y-8 hover-lift cursor-pointer anim-glow" style={{ background: "linear-gradient(135deg, rgba(215,255,0,0.15) 0%, rgba(0,217,255,0.08) 50%, rgba(215,255,0,0.1) 100%)", borderTop: "2px solid #D7FF00", borderBottom: "2px solid #00D9FF", WebkitTapHighlightColor: "transparent" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#D7FF00]/[0.03] via-transparent to-[#00D9FF]/[0.03] pointer-events-none"></div>
                <div className="relative z-10">
                  <span className="font-mono text-[#D7FF00]/50 text-[10px] tracking-widest">02 — RECOMMENDED</span>
                  <h2 className="text-4xl md:text-5xl font-bold italic leading-[0.85] mt-2 bg-gradient-to-r from-[#D7FF00] to-[#00D9FF] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-playfair), serif", WebkitBackgroundClip: "text" }}>Neon</h2>
                  <p className="text-white/70 mt-4 text-sm md:text-base leading-relaxed font-light" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>High-impact scrolling experience with WhatsApp connection. 48 hours.</p>
                </div>
                <div className="relative z-10 mt-8">
                  <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#D7FF00] via-[#00D9FF] to-[#D7FF00] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-raleway), sans-serif", WebkitBackgroundClip: "text" }}>R1,950</span>
                  <span className="block text-[#D7FF00]/50 text-xs font-light font-mono mt-1 tracking-wider">ONCE-OFF</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D7FF00] via-[#00D9FF] to-[#D7FF00]"></div>
              </div>
              
              <div className="relative group p-8 md:p-10 flex flex-col justify-between min-h-[320px] overflow-hidden transition-all duration-500 hover:-translate-y-3 active:-translate-y-3 backdrop-blur-sm hover-lift cursor-pointer" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(5,5,5,0.9) 40%, rgba(5,5,5,0.95) 100%)", borderTop: "1px solid rgba(255,255,255,0.15)", WebkitTapHighlightColor: "transparent" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <span className="font-mono text-white/25 text-[10px] tracking-widest">03</span>
                  <h2 className="text-3xl md:text-4xl font-bold italic leading-[0.9] mt-2 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-playfair), serif", WebkitBackgroundClip: "text" }}>Flicker</h2>
                  <p className="text-white/50 mt-4 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>Edge-network hosting, domain mapping, zero compromise SSL.</p>
                </div>
                <div className="relative z-10 mt-8">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-raleway), sans-serif", WebkitBackgroundClip: "text" }}>R150</span>
                  <span className="block text-white/30 text-[10px] font-mono mt-1 tracking-wider">/ MONTH</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="absolute top-[200vh] left-0 w-screen h-screen flex items-center justify-center p-8 overflow-hidden">
           <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D7FF00]/40 to-transparent"></div>
           <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00D9FF]/30 to-transparent"></div>
           
           <div className="pointer-events-auto text-center relative z-10 px-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D7FF00]/50"></div>
                <span className="text-[#D7FF00]/50 tracking-[0.4em] uppercase text-[11px] font-light anim-pulse" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>The Standard</span>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D7FF00]/50"></div>
              </div>
              
              <h2 className="text-[14vw] md:text-[10rem] font-bold italic leading-none cursor-pointer tracking-tight transition-all duration-500 hover:tracking-wide anim-float" style={{ fontFamily: "var(--font-playfair), serif", backgroundImage: "linear-gradient(135deg, #D7FF00, #00D9FF, #D7FF00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                100/100
              </h2>
              
              <div className="mt-8 flex flex-col items-center gap-8">
                <p className="text-white/65 text-base md:text-lg font-light tracking-wide max-w-lg" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                  Dominate your market instantly.
                  <br/>
                  <span className="bg-gradient-to-r from-[#D7FF00] to-[#00D9FF] bg-clip-text text-transparent font-semibold" style={{ WebkitBackgroundClip: "text" }}>Engineered for pure conversion.</span>
                </p>
                
                <button className="relative overflow-hidden text-lg md:text-xl px-10 py-4 uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:-translate-y-1 active:scale-95 active:brightness-110 group hover-lift" style={{ fontFamily: "var(--font-raleway), sans-serif", background: "linear-gradient(135deg, #D7FF00, #00D9FF)", color: "#050505", WebkitTapHighlightColor: "transparent" }}>
                  <span className="relative z-10">Start Building</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-active:opacity-20 transition-opacity duration-300"></div>
                </button>
             </div>
          </div>
        </section>
      </div>
    </Scroll>
  );
}

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen bg-[#030305] overflow-hidden" style={{ touchAction: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      <Canvas className="absolute inset-0 z-10 w-full h-full" camera={{ position: [0, 0, 15], fov: 45 }} dpr={isMobile ? [1, 1] : [1, 1.5]} gl={{ antialias: false, alpha: false, powerPreference: isMobile ? "default" : "high-performance", stencil: false }} style={{ touchAction: 'none' }}>
        <AuroraBackground />
        <ParticleField />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={10} size={2} speed={0.4} color="#D7FF00" />
        <FloatingCrystal position={[-3, 2, 0]} color="#D7FF00" delay={0} />
        <FloatingCrystal position={[3, -1, 2]} color="#00D9FF" delay={1} />
        <FloatingCrystal position={[0, 3, -2]} color="#FF003C" delay={2} />
        <MouseInteractiveSphere />
        <ScrollControls pages={3} damping={isMobile ? 0.3 : 0.2}>
          <CameraController />
          <SpatialWaypoints />
          <SpatialHTMLUI />
        </ScrollControls>
        <PostProcessing />
      </Canvas>
    </div>
  );
}
