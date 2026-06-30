"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createNoise3D, createNoise4D } from "simplex-noise";
import gsap from "gsap";
import "../../styles/Multiple3d.css";

const COLOR_OPTIONS = [
  {
    scheme: "fire",
    gradient: "linear-gradient(to bottom right, #ff4500, #ffcc00)",
  },
  {
    scheme: "neon",
    gradient: "linear-gradient(to bottom right, #ff00ff, #00ffff)",
  },
  {
    scheme: "nature",
    gradient: "linear-gradient(to bottom right, #00ff00, #66ffcc)",
  },
  {
    scheme: "rainbow",
    gradient:
      "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
  },
];

export default function Multiple3d({ embed = false, targetIndex = 0 }) {
  const canvasRef = useRef(null);
  const triggerMorphRef = useRef(null);
  const changeSchemeRef = useRef(null);
  const goToShapeRef = useRef(null); // exposed by init(); called when targetIndex prop changes
  const prevIndexRef = useRef(undefined);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingFading, setLoadingFading] = useState(false);
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [infoText, setInfoText] = useState("Model 1 (Click to morph)");
  const [infoGlow, setInfoGlow] = useState("0 0 5px rgba(0, 128, 255, 0.8)");
  const [activeScheme, setActiveScheme] = useState("mono");

  // Drive shape from parent scroll — skip the very first render (index 0 is default)
  useEffect(() => {
    if (prevIndexRef.current === undefined) {
      prevIndexRef.current = targetIndex;
      return;
    }
    if (targetIndex !== prevIndexRef.current) {
      prevIndexRef.current = targetIndex;
      goToShapeRef.current?.(targetIndex);
    }
  }, [targetIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrameId;
    let isAlive = true;

    // Three.js instances
    let scene, camera, renderer, controls, clock, composer;
    let particlesGeometry, particlesMaterial, pointsGroup;
    let currentPositions, sourcePositions, targetPositions, swarmPositions;
    let particleEffectStrengths;
    let particleVelocities;
    let noise3D, noise4D;
    const mouseNDC = { x: 0, y: 0, active: false };
    const mouseWorldPos = new THREE.Vector3();
    let onMouseMoveGlobal = null;
    let resizeObserver = null;
    let morphTimeline = null;
    let isMorphing = false;
    let currentShapeIndex = 0;
    const morphState = { progress: 0 };

    const CONFIG = {
      particleCount: 15000,
      shapeSize: 14,
      swarmDistanceFactor: 1.5,
      swirlFactor: 4.0,
      noiseFrequency: 0.1,
      noiseTimeScale: 0.04,
      noiseMaxStrength: 2.8,
      colorScheme: "mono",
      morphDuration: 4,
      particleSizeRange: [0.08, 0.25],
      starCount: 18000,
      bloomStrength: 1.3,
      bloomRadius: 0.5,
      bloomThreshold: 0.05,
      idleFlowStrength: 0.25,
      idleFlowSpeed: 0.08,
      morphSizeFactor: 0.5,
      morphBrightnessFactor: 0.6,
      // Gentle left-right sway instead of a full 360° auto-rotate — radians
      // either side of centre, and how fast it sweeps back and forth.
      idleSwayAmp: 0.18,
      idleSwaySpeed: 0.3,
    };

    const COLOR_SCHEMES = {
      mono: { startHue: 0, endHue: 0, saturation: 0, lightness: 0.22 },
      fire: { startHue: 0, endHue: 45, saturation: 0.95, lightness: 0.6 },
      neon: { startHue: 300, endHue: 180, saturation: 1.0, lightness: 0.65 },
      nature: { startHue: 90, endHue: 160, saturation: 0.85, lightness: 0.55 },
      rainbow: { startHue: 0, endHue: 360, saturation: 0.9, lightness: 0.6 },
    };

    const SHAPES = [
      { name: "Model 1", url: "/models/new5.glb" },
      { name: "Model 2", url: "/models/second1.glb" },
      { name: "Model 3", url: "/models/third11.glb" },
      { name: "Model 4", url: "/models/fifth.glb" },
      { name: "Model 5", url: "/models/new6.glb" },
      { name: "Model 6", url: "/models/third.glb" },
    ];

    // Pre-allocated vectors — avoids GC pressure in the hot animation loop
    const tV = new THREE.Vector3();
    const srcV = new THREE.Vector3();
    const tgtV = new THREE.Vector3();
    const swV = new THREE.Vector3();
    const noiseV = new THREE.Vector3();
    const flowV = new THREE.Vector3();
    const bezV = new THREE.Vector3();
    const axisV = new THREE.Vector3();

    // ── Load a GLB and resolve it into `count` particle positions ──────────
    // The morph pipeline below just lerps between Float32Array position sets
    // index-by-index, so it doesn't care where a shape's points came from —
    // every loaded model just has to come back as the same particleCount-
    // sized point cloud, centred and scaled to a consistent footprint.
    //
    // The actual .glb files turned out to be two different things: most are
    // pre-baked point clouds (exported from a THREE.Points object — glTF
    // primitive mode 0, ~150k verts each), one is an ordinary triangle mesh.
    // Points objects come in as child.isPoints (not isMesh!) once loaded —
    // an earlier version of this only checked isMesh, found nothing in the
    // point-cloud files, threw, and that's what caused the black screen.
    async function loadModelAsPoints(url, count, size) {
      const { GLTFLoader } =
        await import("three/examples/jsm/loaders/GLTFLoader.js");
      const gltf = await new GLTFLoader().loadAsync(url);
      gltf.scene.updateMatrixWorld(true);

      const pointObjects = [];
      const meshObjects = [];
      gltf.scene.traverse((child) => {
        if (child.isPoints && child.geometry) pointObjects.push(child);
        else if (child.isMesh && child.geometry) meshObjects.push(child);
      });

      let pts;
      if (pointObjects.length > 0) {
        // Pool every point from every Points node (world space), then pick
        // `count` of them via partial Fisher-Yates so the subsample is
        // unbiased — a plain stride pick risks visible gaps/clustering if
        // the source array has any spatial ordering to it.
        const pool = [];
        const v = new THREE.Vector3();
        for (const obj of pointObjects) {
          const pos = obj.geometry.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            v.fromBufferAttribute(pos, i).applyMatrix4(obj.matrixWorld);
            pool.push(v.x, v.y, v.z);
          }
        }
        const poolCount = pool.length / 3;
        pts = new Float32Array(count * 3);
        if (poolCount >= count) {
          const indices = new Uint32Array(poolCount);
          for (let i = 0; i < poolCount; i++) indices[i] = i;
          for (let i = 0; i < count; i++) {
            const j = i + Math.floor(Math.random() * (poolCount - i));
            const tmp = indices[i];
            indices[i] = indices[j];
            indices[j] = tmp;
            const srcI = indices[i];
            pts[i * 3] = pool[srcI * 3];
            pts[i * 3 + 1] = pool[srcI * 3 + 1];
            pts[i * 3 + 2] = pool[srcI * 3 + 2];
          }
        } else {
          // Smaller pool than needed — sample with replacement.
          for (let i = 0; i < count; i++) {
            const srcI = Math.floor(Math.random() * poolCount);
            pts[i * 3] = pool[srcI * 3];
            pts[i * 3 + 1] = pool[srcI * 3 + 1];
            pts[i * 3 + 2] = pool[srcI * 3 + 2];
          }
        }
      } else if (meshObjects.length > 0) {
        const [{ MeshSurfaceSampler }, { mergeGeometries }] = await Promise.all(
          [
            import("three/examples/jsm/math/MeshSurfaceSampler.js"),
            import("three/examples/jsm/utils/BufferGeometryUtils.js"),
          ],
        );

        // Bake each mesh's world transform into its geometry and strip every
        // attribute but position so multi-mesh GLBs merge into one geometry.
        const geometries = meshObjects.map((child) => {
          let geo = child.geometry.clone();
          geo.applyMatrix4(child.matrixWorld);
          if (geo.index) geo = geo.toNonIndexed();
          for (const attr of Object.keys(geo.attributes)) {
            if (attr !== "position") geo.deleteAttribute(attr);
          }
          return geo;
        });
        const merged =
          geometries.length === 1
            ? geometries[0]
            : mergeGeometries(geometries, false);

        const sampler = new MeshSurfaceSampler(new THREE.Mesh(merged)).build();
        pts = new Float32Array(count * 3);
        const sampleV = new THREE.Vector3();
        for (let i = 0; i < count; i++) {
          sampler.sample(sampleV);
          pts[i * 3] = sampleV.x;
          pts[i * 3 + 1] = sampleV.y;
          pts[i * 3 + 2] = sampleV.z;
        }

        geometries.forEach((g) => g !== merged && g.dispose());
        merged.dispose();
      } else {
        throw new Error(`No points or mesh geometry found in ${url}`);
      }

      // Centre at origin and scale to fit the same footprint the old
      // procedural shapes used (shapeSize), so morph distances/feel stay
      // roughly consistent between models.
      const tmpGeo = new THREE.BufferGeometry();
      tmpGeo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
      tmpGeo.computeBoundingSphere();
      const { center, radius } = tmpGeo.boundingSphere;
      const scale = radius > 0 ? size / radius : 1;
      for (let i = 0; i < count; i++) {
        pts[i * 3] = (pts[i * 3] - center.x) * scale;
        pts[i * 3 + 1] = (pts[i * 3 + 1] - center.y) * scale;
        pts[i * 3 + 2] = (pts[i * 3 + 2] - center.z) * scale;
      }
      tmpGeo.dispose();

      return pts;
    }

    // ── Helpers ────────────────────────────────────────────────────
    function makeCircleTex() {
      const sz = 64;
      const c = document.createElement("canvas");
      c.width = sz;
      c.height = sz;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.2, "rgba(255,255,255,0.8)");
      g.addColorStop(0.5, "rgba(255,255,255,0.3)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, sz, sz);
      return new THREE.CanvasTexture(c);
    }

    function fillColors(colors, posArr) {
      const scheme = COLOR_SCHEMES[CONFIG.colorScheme];
      const maxR = CONFIG.shapeSize * 1.1;
      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        tV.fromArray(posArr, i3);
        const dist = tV.length();
        let hue;
        if (CONFIG.colorScheme === "rainbow") {
          const nx = (tV.x / maxR + 1) / 2;
          const ny = (tV.y / maxR + 1) / 2;
          const nz = (tV.z / maxR + 1) / 2;
          hue = (nx * 120 + ny * 120 + nz * 120) % 360;
        } else {
          hue = THREE.MathUtils.mapLinear(
            dist,
            0,
            maxR,
            scheme.startHue,
            scheme.endHue,
          );
        }
        const nv = (noise3D(tV.x * 0.2, tV.y * 0.2, tV.z * 0.2) + 1) * 0.5;
        const sat = THREE.MathUtils.clamp(
          scheme.saturation * (0.9 + nv * 0.2),
          0,
          1,
        );
        const lit = THREE.MathUtils.clamp(
          scheme.lightness * (0.85 + nv * 0.3),
          0.1,
          0.9,
        );
        new THREE.Color().setHSL(hue / 360, sat, lit).toArray(colors, i3);
      }
    }

    function refreshColors() {
      const ca = particlesGeometry.attributes.color.array;
      fillColors(ca, particlesGeometry.attributes.position.array);
      particlesGeometry.attributes.color.needsUpdate = true;
    }

    // ── Setup ──────────────────────────────────────────────────────
    async function setupPostFx() {
      const { EffectComposer } =
        await import("three/examples/jsm/postprocessing/EffectComposer.js");
      const { RenderPass } =
        await import("three/examples/jsm/postprocessing/RenderPass.js");
      const { UnrealBloomPass } =
        await import("three/examples/jsm/postprocessing/UnrealBloomPass.js");
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(
        new UnrealBloomPass(
          new THREE.Vector2(w, h),
          CONFIG.bloomStrength,
          CONFIG.bloomRadius,
          CONFIG.bloomThreshold,
        ),
      );
    }

    function setupParticles(positionsPerShape) {
      targetPositions = positionsPerShape;
      currentPositions = new Float32Array(targetPositions[0]);
      sourcePositions = new Float32Array(targetPositions[0]);
      swarmPositions = new Float32Array(CONFIG.particleCount * 3);

      particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(currentPositions, 3),
      );

      const sizes = new Float32Array(CONFIG.particleCount);
      const opacities = new Float32Array(CONFIG.particleCount);
      particleEffectStrengths = new Float32Array(CONFIG.particleCount);
      particleVelocities = new Float32Array(CONFIG.particleCount * 3);
      for (let i = 0; i < CONFIG.particleCount; i++) {
        sizes[i] = THREE.MathUtils.randFloat(...CONFIG.particleSizeRange);
        opacities[i] = 1.0;
      }
      particlesGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(sizes, 1),
      );
      particlesGeometry.setAttribute(
        "opacity",
        new THREE.BufferAttribute(opacities, 1),
      );
      particlesGeometry.setAttribute(
        "aEffectStrength",
        new THREE.BufferAttribute(particleEffectStrengths, 1),
      );

      const colors = new Float32Array(CONFIG.particleCount * 3);
      fillColors(colors, currentPositions);
      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3),
      );

      const msf = CONFIG.morphSizeFactor.toFixed(2);
      const mbf = CONFIG.morphBrightnessFactor.toFixed(2);

      particlesMaterial = new THREE.ShaderMaterial({
        uniforms: { pointTexture: { value: makeCircleTex() } },
        vertexShader: `
          attribute float size; attribute float opacity; attribute float aEffectStrength;
          varying vec3 vColor; varying float vOpacity; varying float vEffectStrength;
          void main() {
            vColor = color; vOpacity = opacity; vEffectStrength = aEffectStrength;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            float ss = 1.0 - vEffectStrength * ${msf};
            gl_PointSize = size * ss * (400.0 / -mv.z);
            gl_Position  = projectionMatrix * mv;
          }`,
        fragmentShader: `
          uniform sampler2D pointTexture;
          varying vec3 vColor; varying float vOpacity; varying float vEffectStrength;
          void main() {
            float a = texture2D(pointTexture, gl_PointCoord).a;
            if (a < 0.05) discard;
            vec3 fc = vColor * (1.0 + vEffectStrength * ${mbf});
            gl_FragColor = vec4(fc, a * vOpacity);
          }`,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        vertexColors: true,
      });
      pointsGroup = new THREE.Group();
      pointsGroup.add(new THREE.Points(particlesGeometry, particlesMaterial));
      scene.add(pointsGroup);
    }

    // ── Morph ──────────────────────────────────────────────────────
    function triggerMorph() {
      if (isMorphing) return;
      isMorphing = true;
      setInfoText("Morphing...");
      setInfoGlow("0 0 8px rgba(255, 150, 50, 0.9)");

      sourcePositions.set(currentPositions);
      const nextIdx = (currentShapeIndex + 1) % SHAPES.length;
      const nextPos = targetPositions[nextIdx];
      const offset = CONFIG.shapeSize * CONFIG.swarmDistanceFactor;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        srcV.fromArray(sourcePositions, i3);
        tgtV.fromArray(nextPos, i3);
        swV.lerpVectors(srcV, tgtV, 0.5);
        tV.set(
          noise3D(i * 0.05, 10, 10),
          noise3D(20, i * 0.05, 20),
          noise3D(30, 30, i * 0.05),
        ).normalize();
        const df = srcV.distanceTo(tgtV) * 0.1 + offset;
        swV.addScaledVector(tV, df * (0.5 + Math.random() * 0.8));
        swarmPositions[i3] = swV.x;
        swarmPositions[i3 + 1] = swV.y;
        swarmPositions[i3 + 2] = swV.z;
      }

      currentShapeIndex = nextIdx;
      morphState.progress = 0;
      if (morphTimeline) morphTimeline.kill();

      morphTimeline = gsap.to(morphState, {
        progress: 1,
        duration: CONFIG.morphDuration,
        ease: "power2.inOut",
        onComplete: () => {
          if (!isAlive) return;
          setInfoText(`${SHAPES[currentShapeIndex].name} (Click to morph)`);
          setInfoGlow("0 0 5px rgba(0, 128, 255, 0.8)");
          currentPositions.set(targetPositions[currentShapeIndex]);
          particlesGeometry.attributes.position.needsUpdate = true;
          particleEffectStrengths.fill(0);
          particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
          sourcePositions.set(targetPositions[currentShapeIndex]);
          refreshColors();
          isMorphing = false;
        },
      });
    }

    // ── Jump to a specific shape index (scroll-driven) ────────────
    function morphToIndex(targetIdx) {
      if (targetIdx === currentShapeIndex) return;
      // Kill any running morph so we don't fight with it
      if (morphTimeline) morphTimeline.kill();
      isMorphing = true;

      sourcePositions.set(currentPositions);
      const nextPos = targetPositions[targetIdx];
      const offset = CONFIG.shapeSize * CONFIG.swarmDistanceFactor;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        srcV.fromArray(sourcePositions, i3);
        tgtV.fromArray(nextPos, i3);
        swV.lerpVectors(srcV, tgtV, 0.5);
        tV.set(
          noise3D(i * 0.05, 10, 10),
          noise3D(20, i * 0.05, 20),
          noise3D(30, 30, i * 0.05),
        ).normalize();
        const df = srcV.distanceTo(tgtV) * 0.1 + offset;
        swV.addScaledVector(tV, df * (0.5 + Math.random() * 0.8));
        swarmPositions[i3] = swV.x;
        swarmPositions[i3 + 1] = swV.y;
        swarmPositions[i3 + 2] = swV.z;
      }

      currentShapeIndex = targetIdx;
      morphState.progress = 0;
      // Embed mode: 2 s morph (feels snappy on scroll); standalone: 4 s
      morphTimeline = gsap.to(morphState, {
        progress: 1,
        duration: embed ? 2 : CONFIG.morphDuration,
        ease: "power2.inOut",
        onComplete: () => {
          if (!isAlive) return;
          currentPositions.set(targetPositions[currentShapeIndex]);
          particlesGeometry.attributes.position.needsUpdate = true;
          particleEffectStrengths.fill(0);
          particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
          sourcePositions.set(targetPositions[currentShapeIndex]);
          refreshColors();
          isMorphing = false;
        },
      });
    }

    // ── Frame updates ──────────────────────────────────────────────
    function morphFrame(positions, effectStrengths, elapsed, dt) {
      const t = morphState.progress;
      const tgt = targetPositions[currentShapeIndex];
      const es = Math.sin(t * Math.PI);
      const swirl = es * CONFIG.swirlFactor * dt * 50;
      const noiseStr = es * CONFIG.noiseMaxStrength;
      const ti = 1 - t,
        ti2 = ti * ti,
        t2 = t * t;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        srcV.fromArray(sourcePositions, i3);
        swV.fromArray(swarmPositions, i3);
        tgtV.fromArray(tgt, i3);

        bezV.copy(srcV).multiplyScalar(ti2);
        bezV.addScaledVector(swV, 2 * ti * t);
        bezV.addScaledVector(tgtV, t2);

        if (swirl > 0.01) {
          tV.subVectors(bezV, srcV);
          axisV
            .set(
              noise3D(i * 0.02, elapsed * 0.1, 0),
              noise3D(0, i * 0.02, elapsed * 0.1 + 5),
              noise3D(elapsed * 0.1 + 10, 0, i * 0.02),
            )
            .normalize();
          tV.applyAxisAngle(axisV, swirl * (0.5 + Math.random() * 0.5));
          bezV.copy(srcV).add(tV);
        }

        if (noiseStr > 0.01) {
          const nt = elapsed * CONFIG.noiseTimeScale;
          const nf = CONFIG.noiseFrequency;
          noiseV.set(
            noise4D(bezV.x * nf, bezV.y * nf, bezV.z * nf, nt),
            noise4D(
              bezV.x * nf + 100,
              bezV.y * nf + 100,
              bezV.z * nf + 100,
              nt,
            ),
            noise4D(
              bezV.x * nf + 200,
              bezV.y * nf + 200,
              bezV.z * nf + 200,
              nt,
            ),
          );
          bezV.addScaledVector(noiseV, noiseStr);
        }

        positions[i3] = bezV.x;
        positions[i3 + 1] = bezV.y;
        positions[i3 + 2] = bezV.z;
        effectStrengths[i] = es;
      }
      particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
    }

    function idleFrame(positions, effectStrengths, elapsed) {
      const breath = 1 + Math.sin(elapsed * 0.5) * 0.015;
      const ts = elapsed * CONFIG.idleFlowSpeed;
      const freq = 0.1;
      let resetEff = false;

      // Project mouse NDC → world z=0 plane once per frame
      let mwx = -99999,
        mwy = -99999;
      if (mouseNDC.active) {
        tV.set(mouseNDC.x, mouseNDC.y, 0.5).unproject(camera);
        tV.sub(camera.position).normalize();
        if (Math.abs(tV.z) > 0.001) {
          const mt = -camera.position.z / tV.z;
          mwx = camera.position.x + tV.x * mt;
          mwy = camera.position.y + tV.y * mt;
        }
      }

      const MOUSE_RADIUS = 7;
      const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
      const FORCE_MULT = 0.22;
      const VEL_CAP = 0.8;
      const FRICTION = 0.85;
      const EASE = 0.1;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;

        // Target = source + breath + noise flow
        srcV.fromArray(sourcePositions, i3);
        tV.copy(srcV).multiplyScalar(breath);
        flowV.set(
          noise4D(tV.x * freq, tV.y * freq, tV.z * freq, ts),
          noise4D(tV.x * freq + 10, tV.y * freq + 10, tV.z * freq + 10, ts),
          noise4D(tV.x * freq + 20, tV.y * freq + 20, tV.z * freq + 20, ts),
        );
        tV.addScaledVector(flowV, CONFIG.idleFlowStrength);

        const cx = positions[i3];
        const cy = positions[i3 + 1];
        const cz = positions[i3 + 2];

        // 2D proximity (XY plane) — creates a clean circular hole facing camera
        let inRadius = false;
        if (mouseNDC.active && mwx > -9999) {
          const dx = mwx - cx;
          const dy = mwy - cy;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < MOUSE_RADIUS_SQ && dist2 > 0.0001) {
            inRadius = true;
            const dist = Math.sqrt(dist2);
            // Pure radial repulsion: -radius²/dist² keeps hole empty
            const force = (-MOUSE_RADIUS_SQ / dist2) * FORCE_MULT;
            particleVelocities[i3] += (force * dx) / dist;
            particleVelocities[i3 + 1] += (force * dy) / dist;
            particleVelocities[i3 + 2] += force * 0.25; // slight Z scatter for depth
          }
        }

        // Velocity cap — particles never fly beyond VEL_CAP units/frame
        const vx = particleVelocities[i3];
        const vy = particleVelocities[i3 + 1];
        const vz = particleVelocities[i3 + 2];
        const vspd = Math.sqrt(vx * vx + vy * vy + vz * vz);
        if (vspd > VEL_CAP) {
          const s = VEL_CAP / vspd;
          particleVelocities[i3] = vx * s;
          particleVelocities[i3 + 1] = vy * s;
          particleVelocities[i3 + 2] = vz * s;
        }

        particleVelocities[i3] *= FRICTION;
        particleVelocities[i3 + 1] *= FRICTION;
        particleVelocities[i3 + 2] *= FRICTION;

        // Inside radius → no ease-back so the hole stays clear
        // Outside radius → ease back toward shape origin
        const tx = inRadius ? cx : tV.x;
        const ty = inRadius ? cy : tV.y;
        const tz = inRadius ? cz : tV.z;

        positions[i3] = cx + particleVelocities[i3] + (tx - cx) * EASE;
        positions[i3 + 1] = cy + particleVelocities[i3 + 1] + (ty - cy) * EASE;
        positions[i3 + 2] = cz + particleVelocities[i3 + 2] + (tz - cz) * EASE;

        if (effectStrengths[i] !== 0) {
          effectStrengths[i] = 0;
          resetEff = true;
        }
      }
      if (resetEff)
        particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
    }

    // ── Resize ─────────────────────────────────────────────────────
    function onResize() {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      camera.aspect = w / h;
      // FOV (not camera distance) controls mobile scale-down — OrbitControls
      // owns camera.position every frame (recomputed from its own cached
      // spherical radius/angles), so mutating position.z gets fought/undone
      // unpredictably once the render loop starts. FOV is untouched by
      // OrbitControls and is perfectly symmetric, so it can't shift the
      // model off-centre either.
      camera.fov = w < 600 ? 120 : 70;
      camera.updateProjectionMatrix();
      // `false` = don't let Three.js write inline canvas.style.width/height
      // (pixel values). Those would override the CSS class's width:100% with
      // a fixed px value — if `w` is ever measured wrong even once (likely
      // on mobile while the sticky/pinned layout is still settling), the
      // canvas gets permanently pinned too wide and overflows past its
      // container, which reads as the model sitting off-screen to the right.
      renderer.setSize(w, h, false);
      composer?.setSize(w, h);
    }

    // ── Loading progress ───────────────────────────────────────────
    let loadingTotal = 0;
    function bump(n) {
      loadingTotal = Math.min(100, loadingTotal + n);
      setLoadingProgress(loadingTotal);
      if (loadingTotal >= 100) {
        setTimeout(() => {
          setLoadingFading(true);
          setTimeout(() => {
            if (isAlive) setLoadingHidden(true);
          }, 600);
        }, 200);
      }
    }

    // ── Main init (async for dynamic postFx imports) ───────────────
    async function init() {
      const { OrbitControls } =
        await import("three/examples/jsm/controls/OrbitControls.js");

      noise3D = createNoise3D(() => Math.random());
      noise4D = createNoise4D(() => Math.random());
      clock = new THREE.Clock();
      scene = new THREE.Scene();
      bump(5);

      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      // FOV widened on narrow viewports in onResize() (fired immediately by
      // the ResizeObserver below) — keep distance fixed here, position never
      // needs to differ between mobile/desktop.
      camera = new THREE.PerspectiveCamera(
        w < 600 ? 120 : 70,
        w / h,
        0.1,
        1000,
      );
      camera.position.set(0, 8, 28);
      camera.lookAt(scene.position);
      bump(5);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      bump(10);

      controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 5;
      controls.maxDistance = 80;
      // No autoRotate — the model instead gets a gentle left-right sway
      // applied to pointsGroup directly in the render loop (see animate()).
      bump(5);

      scene.add(new THREE.AmbientLight(0x404060));
      const d1 = new THREE.DirectionalLight(0xffffff, 1.5);
      d1.position.set(15, 20, 10);
      scene.add(d1);
      const d2 = new THREE.DirectionalLight(0x88aaff, 0.9);
      d2.position.set(-15, -10, -15);
      scene.add(d2);
      bump(10);

      await setupPostFx();
      bump(10);
      const positionsPerShape = await Promise.all(
        SHAPES.map(async (s) => {
          const pts = await loadModelAsPoints(
            s.url,
            CONFIG.particleCount,
            CONFIG.shapeSize,
          );
          bump(4);
          return pts;
        }),
      );
      if (!isAlive) return;
      setupParticles(positionsPerShape);
      bump(1);

      // Expose to React handlers via refs
      triggerMorphRef.current = triggerMorph;
      goToShapeRef.current = morphToIndex;
      changeSchemeRef.current = (scheme) => {
        CONFIG.colorScheme = scheme;
        refreshColors();
      };

      window.addEventListener("resize", onResize);
      // The canvas's real box size on mount can be stale on mobile — the
      // sticky/pinned ScrollTrigger layout (PeopleAdvisory) and GSAP refresh
      // can settle after init() already measured clientWidth/clientHeight,
      // leaving the camera's aspect baked in wrong (model appears off-centre
      // or cropped). ResizeObserver fires immediately with the true size and
      // again on any later layout change, not just window resizes.
      resizeObserver = new ResizeObserver(() => onResize());
      resizeObserver.observe(canvas);
      onMouseMoveGlobal = (e) => {
        const rect = canvas.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          mouseNDC.active = true;
        } else {
          mouseNDC.active = false;
        }
      };
      window.addEventListener("mousemove", onMouseMoveGlobal);
      bump(15);

      // Render loop
      function animate() {
        if (!isAlive) return;
        animFrameId = requestAnimationFrame(animate);
        const dt = clock.getDelta();
        const elapsed = clock.elapsedTime;
        controls.update();
        if (pointsGroup) {
          pointsGroup.rotation.y =
            Math.sin(elapsed * CONFIG.idleSwaySpeed) * CONFIG.idleSwayAmp;
        }
        const pos = particlesGeometry.attributes.position.array;
        const eff = particlesGeometry.attributes.aEffectStrength.array;
        if (isMorphing) morphFrame(pos, eff, elapsed, dt);
        else idleFrame(pos, eff, elapsed);
        particlesGeometry.attributes.position.needsUpdate = true;
        composer.render(dt);
      }
      animate();
    }

    init();

    return () => {
      isAlive = false;
      cancelAnimationFrame(animFrameId);
      morphTimeline?.kill();
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      if (onMouseMoveGlobal)
        window.removeEventListener("mousemove", onMouseMoveGlobal);
      controls?.dispose();
      particlesGeometry?.dispose();
      particlesMaterial?.dispose();
      renderer?.dispose();
    };
  }, []);

  // In embed mode the component fills its parent container (hero-image div).
  // The parent already has pointer-events:none so OrbitControls drag is moot;
  // the idle sway still works since it runs in the animation loop, not off events.
  if (embed) {
    return (
      <div className="m3d-wrap" style={{ height: "100%", cursor: "default" }}>
        <canvas ref={canvasRef} className="m3d-canvas" />
      </div>
    );
  }

  return (
    <div className="m3d-wrap" onClick={() => triggerMorphRef.current?.()}>
      {/* Loading overlay */}
      {!loadingHidden && (
        <div
          className={`m3d-loading${loadingFading ? " m3d-loading--fade" : ""}`}
        >
          <span>Initializing Particles...</span>
          <div className="m3d-bar-track">
            <div
              className="m3d-bar-fill"
              style={{ width: `${Math.min(100, loadingProgress)}%` }}
            />
          </div>
        </div>
      )}

      {/* Shape label */}
      <div className="m3d-ui">
        <div className="m3d-info" style={{ textShadow: infoGlow }}>
          {infoText}
        </div>
      </div>

      {/* Controls panel */}
      <div className="m3d-controls" onClick={(e) => e.stopPropagation()}>
        <button className="m3d-btn" onClick={() => triggerMorphRef.current?.()}>
          Change Shape
        </button>
        <div className="m3d-picker">
          {COLOR_OPTIONS.map(({ scheme, gradient }) => (
            <div
              key={scheme}
              className={`m3d-swatch${activeScheme === scheme ? " active" : ""}`}
              style={{ background: gradient }}
              onClick={() => {
                setActiveScheme(scheme);
                changeSchemeRef.current?.(scheme);
              }}
            />
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} className="m3d-canvas" />
    </div>
  );
}
