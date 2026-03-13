"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

// A custom organic shader material that acts as a fluid lens over the scene
const CustomDistortionMaterial = new THREE.ShaderMaterial({
  uniforms: {
    tDiffuse: { value: null },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 },
    uStrength: { value: 0.15 },
    uRadius: { value: 0.3 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uMouse;
    uniform float uTime;
    uniform float uStrength;
    uniform float uRadius;
    
    varying vec2 vUv;

    void main() {
      vec2 st = vUv;
      float dist = distance(st, uMouse);
      
      // Create an organic fluid bubble effect instead of rigid geometry
      float influence = smoothstep(uRadius, 0.0, dist);
      
      // Organic noise simulation for the fluid ripple
      float noise = sin(dist * 20.0 - uTime * 3.0) * 0.02 * influence;
      
      vec2 distortedUv = st + (st - uMouse) * influence * uStrength + vec2(noise);
      
      vec4 texColor = texture2D(tDiffuse, distortedUv);
      
      // Subtle chromatic aberration on the edges of the distortion
      float rDist = texture2D(tDiffuse, distortedUv + vec2(0.005 * influence, 0.0)).r;
      float bDist = texture2D(tDiffuse, distortedUv - vec2(0.005 * influence, 0.0)).b;
      
      gl_FragColor = vec4(rDist, texColor.g, bDist, texColor.a);
    }
  `
});

export default function CustomDistortionMask() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [material] = useState(() => CustomDistortionMaterial.clone());
  const { viewport } = useThree();

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Normalize mouse coordinates [0, 1] for the fragment shader UVs
      material.uniforms.uMouse.value.x = (state.mouse.x * 0.5) + 0.5;
      material.uniforms.uMouse.value.y = (state.mouse.y * 0.5) + 0.5;
    }
  });

  return (
    // Render a screen-space quad close to the camera that acts as a post-processing mask
    <mesh ref={meshRef} position={[0, 0, 14.9]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}
