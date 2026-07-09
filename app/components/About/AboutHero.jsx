"use client";

import { GlowDot } from "../layout/svg";
import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAnimation from "../layout/TextAnimation";
import Scene from "../Home/Scene";
import "../../styles/AboutHero.css";

gsap.registerPlugin(ScrollTrigger);

const RIGHT_DOTS = [
  { top: "18%", left: "58%" },
  { top: "30%", left: "70%" },
  { top: "62%", left: "60%" },
  { top: "15%", left: "82%" },
  { top: "50%", left: "88%" },
  { top: "78%", left: "75%" },
  { top: "42%", left: "92%" },
];

export default function AboutHero() {
  const canvasWrapperRef = useRef(null);

  // true on hero, false when footer comes
  const mouseIdleRef = useRef(true);

  useEffect(() => {
    const canvasEl = canvasWrapperRef.current;
    const footerEl = document.querySelector(".footer");

    if (!canvasEl || !footerEl) return;

    let positionTween = null;

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

    if (window.innerWidth > 1100) {
      positionTween = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 75%",
        onEnter: () =>
          gsap.to(canvasEl, {
            left: "65%",
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          }),
        onLeaveBack: () =>
          gsap.to(canvasEl, {
            left: "65%",
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          }),
      });
    } else if (window.innerWidth > 575) {
      positionTween = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 75%",
        onEnter: () =>
          gsap.to(canvasEl, {
            autoAlpha: 0,
            duration: 0.4,
            overwrite: true,
          }),
        onLeaveBack: () =>
          gsap.to(canvasEl, {
            autoAlpha: 1,
            duration: 0.4,
            overwrite: true,
          }),
      });
    } else {
      positionTween = gsap.to(canvasEl, {
        top: "45%",
        left: "70%",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: footerEl,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.5,
          onLeave: () => gsap.set(canvasEl, { top: "45%", left: "70%" }),
        },
      });
    }

    return () => {
      positionTween?.kill?.();
      positionTween?.scrollTrigger?.kill();
      mouseIdleTrigger.kill();

      gsap.set(canvasEl, {
        clearProps: "left,top,opacity,visibility",
      });
    };
  }, []);

  return (
    <>
      <section className="aboutHero">
        <div className="aboutHeroContent">
          <TextAnimation animateOnScroll={false} delay={0.7}>
            <h1>
              At Amsha Advisory, we believe that behind every strong
              organisation are people, leadership, and workplace cultures
              shaping the way businesses grow and perform.
            </h1>
          </TextAnimation>
        </div>

        {RIGHT_DOTS.map((pos, i) => (
          <GlowDot
            key={i}
            delay={+(i * 0.31).toFixed(2)}
            style={{
              position: "absolute",
              zIndex: 6,
              pointerEvents: "none",
              ...pos,
            }}
          />
        ))}
      </section>

      <div className="sh-right-glow">
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

      <div
        ref={canvasWrapperRef}
        className="canvas-wrapper"
        style={{
          visibility: "visible",
          opacity: 1,
          pointerEvents: "none",
        }}
      >
        <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
          <Suspense fallback={null}>
            <Scene
              overrideRotation={{
                x: -2.5,
                y: 301.5,
                z: 0.5,
              }}
              enableMouseIdleRef={mouseIdleRef}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}