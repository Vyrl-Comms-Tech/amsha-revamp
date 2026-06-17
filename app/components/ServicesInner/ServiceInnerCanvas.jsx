"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../Home/Scene";

export default function ServiceInnerCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "50vw",
        height: "100vh",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          {/* progress=1 keeps the model in its final steel pose;
              progress2=0 holds the footer rotation at start */}
          <Scene progress={1} progress2={0} />
        </Suspense>
      </Canvas>
    </div>
  );
}
