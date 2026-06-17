"use client";
import { useEffect, useRef } from "react";
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

// Mobile keyframes — same Y spin progression so the animation feels identical,
// but x (pitch) and z (roll) are halved so the model tilts far less and stays
// within the narrow portrait canvas.
const MOBILE_KEYFRAMES = [
  { p: 0,     x:  6,   y:  75,    z:  -7  },
  { p: 0.125, x:  7,   y: 321,    z:   8  },
  { p: 0.5,   x:  6,   y: 500,    z:  -6  },
  { p: 1.0,   x:  3.5, y: 658.5,  z:  -3  },
];
const MOBILE_EXTRA = { x: -3, y: 200, z: 1 };

// ─────────────────────────────────────────────────────────────────────────────

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(e0, e1, x) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

// Plateau: ramp up entering Hero2, hold 1 throughout Hero2, ramp down entering Hero3.
// Hero2 = p 0.125 → 0.5  (100vh to 400vh of 800vh total)
function computeGlassFactor(p) {
  const START = 0.125;
  const END   = 0.5;
  const BLEND = 0.03; // ~24vh transition width at each boundary
  if (p <= START - BLEND || p >= END + BLEND) return 0;
  if (p >= START + BLEND && p <= END - BLEND) return 1;
  if (p < START + BLEND) return smoothstep(START - BLEND, START + BLEND, p);
  return 1 - smoothstep(END - BLEND, END + BLEND, p);
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

const MAX_YAW   = 0.475; // ~2 deg
const MAX_PITCH = 0.352; // ~1.3 deg
const LERP_EASE = 0.07;

// ── Idle ambient motion (model moves even without mouse) ─────────────────────
// SPEED: oscillation rate in radians/sec  → higher = faster wiggle
//   good range: 0.15 (very slow) … 0.5 (lively)
// AMP: peak rotation in radians  → 0.02 ≈ 1°,  0.09 ≈ 5°
//   good range: 0.02 (subtle) … 0.10 (obvious)
const IDLE_SPEED_Y = 1; // ← increase/decrease to speed up/slow down Y sway
const IDLE_SPEED_X = 0.58; // ← increase/decrease to speed up/slow down X tilt
const IDLE_AMP_Y   = 0.06; // ← increase/decrease Y sway amount
const IDLE_AMP_X   = 0.13; // ← increase/decrease X tilt amount

const Scene = ({ progress = 0, progress2 = 0, overrideRotation = null }) => {
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

  useFrame((state) => {
    mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, LERP_EASE);
    mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, LERP_EASE);
    if (mouseGroupRef.current) {
      const t = state.clock.elapsedTime;
      mouseGroupRef.current.rotation.y = mouseCurrent.current.x * MAX_YAW + Math.sin(t * IDLE_SPEED_Y) * IDLE_AMP_Y;
      mouseGroupRef.current.rotation.x = mouseCurrent.current.y * MAX_PITCH + Math.sin(t * IDLE_SPEED_X) * IDLE_AMP_X;
    }
  });


  // ── Canvas size → mobile flag ───────────────────────────────────
  // useThree().size gives canvas pixel dimensions (updates with CSS breakpoints).
  // < 600 px canvas width = mobile (85 vw canvas on a ≤575 px viewport).
  const { size } = useThree();
  const isMobile = size.width < 600;

  // Pull camera further back on mobile so the model appears smaller and
  // fits inside the narrow portrait canvas without clipping.
  const cameraZ = isMobile ? 10.8 : 8.2;

  // ── Compute final rotation ──────────────────────────────────────
  let rot;
  if (overrideRotation !== null) {
    // Direct angle — skips keyframe lerp; mouse parallax still applies via mouseGroupRef
    rot = {
      x: overrideRotation.x * DEG,
      y: overrideRotation.y * DEG,
      z: overrideRotation.z * DEG,
    };
  } else {
    // On mobile use the reduced-tilt keyframes so pitch/roll don't push
    // the model outside the canvas edges.
    const activeKeyframes = isMobile ? MOBILE_KEYFRAMES : DEFAULT_KEYFRAMES;
    rot = getRotation(progress, activeKeyframes);

    // Add the Facts→Footer extra rotation on top
    const activeExtra = isMobile ? MOBILE_EXTRA : DEFAULT_EXTRA;
    if (progress2 > 0) {
      rot.x += progress2 * activeExtra.x * DEG;
      rot.y += progress2 * activeExtra.y * DEG;
      rot.z += progress2 * activeExtra.z * DEG;
    }
  }

  return (
    <>
      <PerspectiveCamera fov={45} near={0.2} far={10000} makeDefault position={[0, 2.5, cameraZ]} />
      <Environment preset="city" />
      <group ref={mouseGroupRef}>
        <Model rotationX={rot.x} rotationY={rot.y} rotationZ={rot.z} glassFactor={computeGlassFactor(progress)} />
      </group>
    </>
  );
};

export default Scene;
