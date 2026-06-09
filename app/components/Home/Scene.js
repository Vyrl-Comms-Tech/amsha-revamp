"use client";
import { useState, useEffect } from "react";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Model } from "../../model";

// ── Scroll-driven Y keyframes ────────────────────────────────────
// Each number = Y rotation in degrees at that section boundary.
const Y_KEYFRAMES = [
  0,    // section 1 start
  90,   // section 1 → 2
  270,  // section 2 → 3
  360,  // section 3 → end
];
// ────────────────────────────────────────────────────────────────

const DEG = Math.PI / 180;

function lerpRotation(progress, keyframes) {
  const sections = keyframes.length - 1;
  const scaled = progress * sections;
  const i = Math.min(Math.floor(scaled), sections - 1);
  const t = scaled - i;
  return (keyframes[i] + t * (keyframes[i + 1] - keyframes[i])) * DEG;
}

const Scene = ({ progress = 0 }) => {
  // X and Z are static tilts — tweak with the GUI panel, then hardcode the values
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);

  useEffect(() => {
    let gui;
    import("lil-gui").then(({ default: GUI }) => {
      gui = new GUI({ title: "Model tilt" });
      const params = { rotX: 0, rotY: 0, rotZ: 0 };
      gui.add(params, "rotX", -180, 180, 1).name("X (deg)").onChange((v) => setRotX(v * DEG));
      gui.add(params, "rotY", -180, 180, 1).name("Y offset (deg)").onChange((v) => setRotY(v * DEG));
      gui.add(params, "rotZ", -180, 180, 1).name("Z (deg)").onChange((v) => setRotZ(v * DEG));
    });
    return () => gui?.destroy();
  }, []);

  // rotY from GUI = static starting offset; scroll adds on top of it
  const rotationY = rotY + lerpRotation(progress, Y_KEYFRAMES);

  return (
    <>
      <PerspectiveCamera fov={45} near={0.2} far={10000} makeDefault position={[0, 0, 12]} />
      <Environment preset="city" />
      <Model rotationX={rotX} rotationY={rotationY} rotationZ={rotZ} />
      <axesHelper args={[300]} />
    </>
  );
};

export default Scene;
