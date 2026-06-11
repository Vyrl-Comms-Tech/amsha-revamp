"use client";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../Home/Scene";

export default function AboutModel() {
  const wrapperRef = useRef();
  const [progress2, setProgress2] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const factsEl  = document.querySelector(".facts-section");
    const footerEl = document.querySelector(".footer");
    if (!factsEl || !footerEl) return;

    const el = wrapperRef.current;

    // Fade in when Facts enters view, fade out on scroll back
    const showTrigger = ScrollTrigger.create({
      trigger: factsEl,
      start: "top 80%",
      onEnter:     () => gsap.to(el, { autoAlpha: 1, duration: 0.6 }),
      onLeaveBack: () => gsap.to(el, { autoAlpha: 0, duration: 0.4 }),
    });

    // Track Facts → Footer rotation progress
    const rotateTrigger = ScrollTrigger.create({
      trigger: factsEl,
      start: "top bottom",
      endTrigger: footerEl,
      end: "bottom bottom",
      onUpdate: (self) => setProgress2(self.progress),
    });

    // Slide canvas center (50%) → right column (75%) as footer enters —
    // identical to Home's Hero.jsx positionTween
    const positionTween = gsap.to(el, {
      left: "75%",
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: footerEl,
        start: "top 70%",
        end: "top 40%",
        scrub: 0.3,
        onLeave: () => gsap.set(el, { left: "75%" }),
      },
    });

    return () => {
      showTrigger.kill();
      rotateTrigger.kill();
      positionTween?.scrollTrigger?.kill();
      gsap.set(el, { clearProps: "left" });
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="canvas-wrapper"
      style={{ pointerEvents: "none", visibility: "hidden", opacity: 0 }}
    >
      <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          <Scene progress={1} progress2={progress2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
