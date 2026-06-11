"use client";
import { useState, useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Model } from "../../model";

const DEG = Math.PI / 180;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ROTATION KEYFRAMES  (Hero → Hero2 → Hero3)
//
// How "p" (progress 0 → 1) maps to sections:
//   Section   Height    Scroll start    p value
//   ──────── ────────  ─────────────  ────────
//   Hero      100 vh        0 vh         0
//   Hero2     300 vh      100 vh         0.125   ← 100 / 800
//   Hero3     400 vh      400 vh         0.5     ← 400 / 800
//   Hero3 end            800 vh         1.0
//
// x = pitch  → tilts model forward / backward
// y = yaw    → spins model left / right  ← must always INCREASE for forward spin!
// z = roll   → tilts model sideways
//
//   IMPORTANT — "y" MUST INCREASE across keyframes.
//     If the next y value is smaller than the previous, the model rotates
//     backwards.  To land at the same visual angle but spin forward, add 360.
//     Example: end looked good at y=298.5 but 298.5 < 500 (Hero3 start) = reverse.
//     Fix:  298.5 + 360 = 658.5  → same visual, forward spin.
//
// To update: drag the sliders in the lil-gui panel, then click
//   "Log values → console"  and paste the printed numbers here.
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_KEYFRAMES = [
  // p     x       y       z
  { p: 0,     x: 13.6, y:  75,    z: -17.5 }, // Hero  start
  { p: 0.125, x: 15,   y: 321,    z:  20.5 }, // Hero2 start
  { p: 0.5,   x: 13,   y: 500,    z: -15   }, // Hero3 start  (Y higher than Hero2 ✓)
  { p: 1.0,   x:  7.5, y: 658.5,  z:  -6.5 }, // Hero3 end    (Y higher than Hero3 start ✓)
  //                   ↑ was 298.5 — fixed to 658.5 (= 298.5 + 360) so model
  //                     lands at the same visual angle but keeps spinning forward
];

const LABELS = ["Hero (start)", "Hero2 start", "Hero3 start", "Hero3 end"];

// ─────────────────────────────────────────────────────────────────────────────
// FACTS → FOOTER  EXTRA ROTATION
//
// A second scroll tracker (progress2) fires from the Facts section to the
// Footer bottom.  These degrees are ADDED on top of whatever rotation the
// model has at the end of Hero3.
//
//   progress2 = 0  → Facts section enters viewport  (rotation = Hero3-end values)
//   progress2 = 1  → Footer bottom exits viewport   (rotation = Hero3-end + extra)
//
// y: 180  → ~half a turn extra during the entire Facts → Footer scroll.
//           Increase for more spin, decrease for less.
// x / z   → small tilt tweaks during the same scroll.
//
// Tune live in the "Facts → Footer  (+extra °)" folder in the lil-gui panel.
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_EXTRA = { x: -8, y: 495, z: 3 };

// ─────────────────────────────────────────────────────────────────────────────

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getRotation(progress, keyframes) {
  // Find the two bracketing keyframes for the current progress value
  let i = keyframes.length - 2;
  for (let k = 0; k < keyframes.length - 1; k++) {
    if (progress < keyframes[k + 1].p) { i = k; break; }
  }
  const a = keyframes[i];
  const b = keyframes[i + 1];
  const range = b.p - a.p;
  const t = range === 0 ? 1 : Math.max(0, Math.min(1, (progress - a.p) / range));
  return {
    x: lerp(a.x, b.x, t) * DEG,
    y: lerp(a.y, b.y, t) * DEG,
    z: lerp(a.z, b.z, t) * DEG,
  };
}

const MAX_YAW   = 0.175; // ~2 deg
const MAX_PITCH = 0.152; // ~1.3 deg
const LERP_EASE = 0.04;

const Scene = ({ progress = 0, progress2 = 0 }) => {
  const [keyframes, setKeyframes] = useState(DEFAULT_KEYFRAMES);
  const kfRef = useRef(DEFAULT_KEYFRAMES.map((kf) => ({ ...kf })));

  const [extra, setExtra] = useState({ ...DEFAULT_EXTRA });
  const extraRef = useRef({ ...DEFAULT_EXTRA });

  const mouseGroupRef = useRef();
  const mouseTarget  = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame(() => {
    mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, LERP_EASE);
    mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, LERP_EASE);
    if (mouseGroupRef.current) {
      mouseGroupRef.current.rotation.y =  mouseCurrent.current.x * MAX_YAW;
      mouseGroupRef.current.rotation.x =  mouseCurrent.current.y * MAX_PITCH;
    }
  });

  useEffect(() => {
    let gui;
    import("lil-gui").then(({ default: GUI }) => {
      gui = new GUI({ title: "Rotation Keyframes", width: 128 });

      // ── Hero → Hero3 keyframe folders ────────────────────────────
      LABELS.forEach((label, idx) => {
        const folder = gui.addFolder(label);
        const params = { ...DEFAULT_KEYFRAMES[idx] };

        const update = (key, v) => {
          kfRef.current[idx] = { ...kfRef.current[idx], [key]: v };
          setKeyframes(kfRef.current.map((kf) => ({ ...kf })));
        };

        folder.add(params, "x", -180,  180, 0.5).name("X  pitch").onChange((v) => update("x", v));
        folder.add(params, "y", -1080, 1080, 0.5).name("Y  yaw  (spin)").onChange((v) => update("y", v));
        folder.add(params, "z", -180,  180, 0.5).name("Z  roll").onChange((v) => update("z", v));
        folder.close();
      });

      // ── Facts → Footer extra rotation folder ─────────────────────
      const exFolder = gui.addFolder("Facts → Footer  (+extra °)");
      const exParams = { ...DEFAULT_EXTRA };
      const updateEx = (key, v) => {
        extraRef.current[key] = v;
        setExtra({ ...extraRef.current });
      };
      exFolder.add(exParams, "x", -360, 360,  0.5).name("X extra °").onChange((v) => updateEx("x", v));
      exFolder.add(exParams, "y", -1080, 1080, 0.5).name("Y extra °").onChange((v) => updateEx("y", v));
      exFolder.add(exParams, "z", -360, 360,  0.5).name("Z extra °").onChange((v) => updateEx("z", v));
      exFolder.close();

      // ── Log current values to console so you can paste them in ───
      gui.add({
        log: () => {
          console.log("DEFAULT_KEYFRAMES:\n", JSON.stringify(kfRef.current, null, 2));
          console.log("DEFAULT_EXTRA:\n", JSON.stringify(extraRef.current, null, 2));
        },
      }, "log").name("Log values → console");
    });

    return () => gui?.destroy();
  }, []);

  // ── Camera Z — pull back on mobile so the model isn't too close ─
  // useThree().size gives the canvas pixel dimensions, which change as the
  // canvas-wrapper CSS breakpoints kick in.  < 600 px canvas width = mobile.
  // Desktop: z = 8.2   Mobile (≤575 px viewport / 85 vw canvas): z = 10.2
  const { size } = useThree();
  const cameraZ = size.width < 600 ? 10.2 : 8.2;

  // ── Compute final rotation ──────────────────────────────────────
  // Step 1: interpolate across the main Hero→Hero3 keyframes
  const rot = getRotation(progress, keyframes);

  // Step 2: add the Facts→Footer extra rotation on top
  if (progress2 > 0) {
    rot.x += progress2 * extra.x * DEG;
    rot.y += progress2 * extra.y * DEG;
    rot.z += progress2 * extra.z * DEG;
  }

  return (
    <>
      <PerspectiveCamera fov={45} near={0.2} far={10000} makeDefault position={[0, 2.5, cameraZ]} />
      <Environment preset="city" />
      <group ref={mouseGroupRef}>
        <Model rotationX={rot.x} rotationY={rot.y} rotationZ={rot.z} />
      </group>
    </>
  );
};

export default Scene;
