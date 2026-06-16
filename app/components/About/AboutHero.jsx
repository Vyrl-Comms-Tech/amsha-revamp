"use client";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../Home/Scene";
import "../../styles/AboutHero.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const canvasWrapperRef = useRef(null);
  const [progress2, setProgress2] = useState(0);

  useEffect(() => {
    const canvasEl = canvasWrapperRef.current;

    const factsEl  = document.querySelector(".facts-section");
    const footerEl = document.querySelector(".footer");
    if (!factsEl || !footerEl) return;

    // Fade in when Facts enters view, fade out on scroll back
    const showTrigger = ScrollTrigger.create({
      trigger: factsEl,
      start: "top 80%",
      onEnter:     () => gsap.to(canvasEl, { autoAlpha: 1, duration: 0.6 }),
      onLeaveBack: () => gsap.to(canvasEl, { autoAlpha: 0, duration: 0.4 }),
    });

    // Track Facts → Footer rotation
    const rotateTrigger = ScrollTrigger.create({
      trigger: factsEl,
      start: "top bottom",
      endTrigger: footerEl,
      end: "bottom bottom",
      onUpdate: (self) => setProgress2(self.progress),
    });

    // Desktop: slide canvas center (50%) → right (75%) as footer enters
    // Mobile: canvas already at top:40% via CSS; nudge to top:45% in footer
    let positionTween = null;
    if (window.innerWidth > 575) {
      positionTween = gsap.to(canvasEl, {
        left: "75%",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: footerEl,
          start: "top 70%",
          end: "top 40%",
          scrub: 0.3,
          onLeave: () => gsap.set(canvasEl, { left: "75%" }),
        },
      });
    } else {
      positionTween = gsap.to(canvasEl, {
        top: "45%",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: footerEl,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.5,
          onLeave: () => gsap.set(canvasEl, { top: "45%" }),
        },
      });
    }

    return () => {
      showTrigger.kill();
      rotateTrigger.kill();
      positionTween?.scrollTrigger?.kill();
      gsap.set(canvasEl, { clearProps: "left,top" });
    };
  }, []);

  return (
    <>
      <section className="aboutHero">
        <div className="aboutHeroContent">
          <p>At Amsha Advisory, we believe that behind every strong organisation are people, leadership, and workplace cultures shaping the way businesses grow and perform.</p>
          <button>Contact us</button>
        </div>
      </section>

      {/* Fixed canvas — identical pattern to Hero.jsx in home */}
      <div
        ref={canvasWrapperRef}
        className="canvas-wrapper"
        style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
      >
        <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
          <Suspense fallback={null}>
            <Scene progress={1} progress2={progress2} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
