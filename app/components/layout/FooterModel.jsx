"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../Home/Scene";
import "../../styles/AboutHero.css"; // provides .canvas-wrapper

export default function FooterModel() {
  return (
    <div
      className="canvas-wrapper"
      style={{ left: "75%", pointerEvents: "none" }}
    >
      <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          <Scene progress={1} progress2={1} enableMouseIdle={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
