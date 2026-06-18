"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../Home/Scene";
import { GlowDot } from "../layout/svg";
import "../../styles/training-hero.css";
import TextAnimation from "../layout/TextAnimation";

// Change x / y / z here (degrees) to rotate the model to any pose.
const MODEL_ANGLE = { x: -10, y: 450, z: 18 };

const TrainingHero = () => {
  return (
    <div className="training-hero">
      <TextAnimation animateOnScroll={true} delay={0.3}>
        <h1>Training Topics</h1>
      </TextAnimation>
      <button className="btn-4">
        {" "}
        <a href="/contact-us">contact us</a>
      </button>

      {/* ── Right-side glow with floating dots (same treatment as ServiceHero) ── */}
      <div className="th-right-glow">
        <GlowDot
          style={{ position: "absolute", left: "10%", top: "15%" }}
          delay={0}
        />
        <GlowDot
          style={{ position: "absolute", left: "30%", top: "45%" }}
          delay={0.7}
        />
        <GlowDot
          style={{ position: "absolute", left: "55%", top: "22%" }}
          delay={1.3}
        />
        <GlowDot
          style={{ position: "absolute", left: "72%", top: "60%" }}
          delay={0.4}
        />
        <GlowDot
          style={{ position: "absolute", left: "88%", top: "30%" }}
          delay={1.0}
        />
        <GlowDot
          style={{ position: "absolute", left: "45%", top: "75%" }}
          delay={1.6}
        />
        <GlowDot
          style={{ position: "absolute", left: "20%", top: "80%" }}
          delay={0.2}
        />
      </div>

      {/* ── 3D model — fixed, same as ServiceHero's canvas (will persist down
           the page, including over the footer; z-index is handled manually) ── */}
      <div className="th-canvas-wrapper">
        <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
          <Suspense fallback={null}>
            <Scene overrideRotation={MODEL_ANGLE} progress2={0} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default TrainingHero;
