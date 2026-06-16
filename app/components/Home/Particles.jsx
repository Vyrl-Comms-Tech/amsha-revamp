"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RADIUS = 250;
const PARTICLE_NUM = 12000;
const D = 0.002;

function PinkSphere() {
  const ref = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = [];
    for (let i = 0; i < PARTICLE_NUM; i++) {
      const theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const phi = THREE.MathUtils.randFloatSpread(360);
      verts.push(
        RADIUS * Math.sin(theta) * Math.cos(phi),
        RADIUS * Math.sin(theta) * Math.sin(phi),
        RADIUS * Math.cos(theta)
      );
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += D;
    ref.current.rotation.z += D;
    ref.current.rotation.x -= D;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="white" size={1.1} sizeAttenuation />
    </points>
  );
}

// Embeddable canvas — drop into any sized container
export function PinkSphereCanvas({ style, className }) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", ...style }}
      className={className}
      camera={{ position: [0, 0, 900], fov: 45 }}
    >
      <PinkSphere />
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
