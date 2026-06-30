"use client";
import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../Home/Scene";
import { GlowDot } from "../layout/svg";
import "../../styles/training-hero.css";
import TextAnimation from "../layout/TextAnimation";

gsap.registerPlugin(ScrollTrigger);

// Change x / y / z here (degrees) to rotate the model to any pose.
const MODEL_ANGLE = { x: -10, y: 450, z: 18 };

const TrainingHero = () => {
  const canvasWrapperRef = useRef(null);
  // Mouse-parallax + idle sway should stop once the model reaches the
  // footer (it should sit still there) and resume if scrolled back up
  // past it. Read fresh every frame by Scene — see enableMouseIdleRef.
  const mouseIdleRef = useRef(true);

  useEffect(() => {
    const canvasEl = canvasWrapperRef.current;
    const footerEl = document.querySelector(".footer");
    if (!canvasEl || !footerEl) return;

    const mouseIdleTrigger = ScrollTrigger.create({
      trigger: footerEl,
      start: "top 75%",
      onEnter: () => {
        mouseIdleRef.current = false;
      },
      onLeaveBack: () => {
        mouseIdleRef.current = true;
      },
    });

    // .th-canvas-wrapper is already statically left:75% (no slide needed —
    // unlike Hero/AboutHero/ServiceHero, it's never centred). But below
    // Footer.css's 1100px breakpoint, .footer-right (the blank-space column
    // the model relies on) gets display:none, so the model would land on
    // the now-full-width footer text instead. Only the >575/<=1100 tablet
    // tier needs handling here — desktop is already correct, and mobile
    // uses its own CSS override position (left:50%) which doesn't reach 75%.
    let fadeTrigger = null;
    if (window.innerWidth > 575 && window.innerWidth <= 1100) {
      fadeTrigger = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 75%",
        onEnter: () => gsap.to(canvasEl, { autoAlpha: 0, duration: 0.4, overwrite: true }),
        onLeaveBack: () => gsap.to(canvasEl, { autoAlpha: 1, duration: 0.4, overwrite: true }),
      });
    }

    return () => {
      mouseIdleTrigger.kill();
      fadeTrigger?.kill();
      gsap.set(canvasEl, { clearProps: "opacity,visibility" });
    };
  }, []);

  return (
    <div className="training-hero-wrapper">

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
      <div className="th-canvas-wrapper" ref={canvasWrapperRef}>
        <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
          <Suspense fallback={null}>
            <Scene
              overrideRotation={MODEL_ANGLE}
              progress2={0}
              enableMouseIdleRef={mouseIdleRef}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
    </div>
  );
};

export default TrainingHero;
