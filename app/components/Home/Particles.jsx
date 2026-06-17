"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RADIUS = 250;
const PARTICLE_NUM = 14000;
// Controls how strongly particles cluster at poles vs equator.
// < 1 = poles heavy  |  1.0 = perfectly uniform
// 0.32 was too extreme — equator went empty when sphere rotated sideways.
// 0.62 still shows noticeably denser poles but keeps the center filled.
const POLE_BIAS = 0.62;

// progressRef.current is a 0→1 scroll value from PeopleAdvisory's ScrollTrigger.
// Rotation is driven entirely by scroll — no time-based auto-spin.
function PinkSphere({ progressRef }) {
  const ref = useRef();
  const smooth = useRef({ y: 0, z: 0, x: 0 }); // current lerped rotation

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = [];
    for (let i = 0; i < PARTICLE_NUM; i++) {
      const u = THREE.MathUtils.randFloatSpread(2);
      const uBiased = Math.sign(u) * Math.pow(Math.abs(u), POLE_BIAS);
      const theta = Math.acos(uBiased);
      const phi = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const r = RADIUS * THREE.MathUtils.randFloat(0.82, 1.18);
      verts.push(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta),
      );
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    if (!progressRef) {
      // No scroll driver — gentle continuous round tumble
      const t = state.clock.elapsedTime;
      ref.current.rotation.y = t * 0.14;
      ref.current.rotation.x = Math.sin(t * 0.35) * 0.22;
      ref.current.rotation.z = Math.sin(t * 0.25 + 1.0) * 0.14;
      return;
    }

    const p = progressRef.current ?? 0;

    // Target rotation — Y spins continuously, X/Z oscillate so poles tilt
    // in and out of view between slides (dense top-bottom ↔ dense left-right)
    const tY = p * Math.PI * 4; // 2 full Y-spins across all slides
    const tZ = Math.sin(p * Math.PI * 6) * 0.7; // lean left/right
    const tX = Math.sin(p * Math.PI * 3) * 0.85; // lean forward/back

    // Smooth lerp so the sphere eases into each new orientation (cinematic feel)
    const E = 0.07;
    smooth.current.y += (tY - smooth.current.y) * E;
    smooth.current.z += (tZ - smooth.current.z) * E;
    smooth.current.x += (tX - smooth.current.x) * E;

    ref.current.rotation.y = smooth.current.y;
    ref.current.rotation.z = smooth.current.z;
    ref.current.rotation.x = smooth.current.x;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="white" size={1.1} sizeAttenuation />
    </points>
  );
}

// Embeddable canvas — drop into any sized container
export function PinkSphereCanvas({ style, className, progressRef }) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", ...style }}
      className={className}
      camera={{ position: [0, 0, 900], fov: 45 }}
    >
      <PinkSphere progressRef={progressRef} />
    </Canvas>
  );
}

export default function Particles() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas camera={{ position: [0, 0, 900], fov: 45 }}>
        <PinkSphere />
      </Canvas>
    </div>
  );
}
