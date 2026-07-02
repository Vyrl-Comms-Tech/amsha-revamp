"use client";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAnimation from "../layout/TextAnimation";
import Scene from "../Home/Scene";
import "../../styles/AboutHero.css";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const canvasWrapperRef = useRef(null);
  const [progress2, setProgress2] = useState(0);
  // Mouse-parallax + idle sway should stop once the model reaches the
  // footer (it should sit still there) and resume if scrolled back up
  // past it. Read fresh every frame by Scene — see enableMouseIdleRef.
  const mouseIdleRef = useRef(true);

  useEffect(() => {
    const canvasEl = canvasWrapperRef.current;

    const factsEl = document.querySelector(".facts-section");
    const footerEl = document.querySelector(".footer");
    if (!factsEl || !footerEl) return;

    // Fade in when Facts enters view, fade out on scroll back
    const showTrigger = ScrollTrigger.create({
      trigger: factsEl,
      start: "top 80%",
      onEnter: () => gsap.to(canvasEl, { autoAlpha: 1, duration: 0.6 }),
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

    // Desktop: slide canvas center (50%) → right (75%) as footer enters
    // Mobile: canvas already at top:40% via CSS; nudge to top:45% in footer
    // Binary toggle (not scrub) — scrub lags behind scroll position, and that lag
    // compounds with Lenis's own smoothing, so the slide could visually never
    // catch up to the true 75% mark. A fixed-duration tween triggered by crossing
    // the line always lands exactly on 75%, matching FooterModel's static position.
    let positionTween = null;
    if (window.innerWidth > 1100) {
      // Threshold matches Footer.css's own @media(max-width:1100px) breakpoint,
      // where .footer-right (the column reserving space for the model) gets
      // display:none and .footer-left's text expands to fill the full width —
      // sliding to 75% below that width lands the model directly on that text.
      positionTween = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 75%",
        onEnter: () =>
          gsap.to(canvasEl, {
            left: "75%",
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          }),
        onLeaveBack: () =>
          gsap.to(canvasEl, {
            left: "50%",
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          }),
      });
    } else if (window.innerWidth > 575) {
      // Tablet/narrow-desktop: footer-right is hidden at this width (no room for
      // the model), so fade it out instead of sliding it onto the now-full-width
      // footer text. Fades back in if scrolling back up past the footer.
      positionTween = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 75%",
        onEnter: () =>
          gsap.to(canvasEl, { autoAlpha: 0, duration: 0.4, overwrite: true }),
        onLeaveBack: () =>
          gsap.to(canvasEl, { autoAlpha: 1, duration: 0.4, overwrite: true }),
      });
    } else {
      // Mobile: drift from centered (left:50%, the CSS default) toward the
      // right as the footer scrolls in — same convention as Hero.jsx.
      positionTween = gsap.to(canvasEl, {
        top: "45%",
        left: "75%",
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
      showTrigger.kill();
      rotateTrigger.kill();
      mouseIdleTrigger.kill();
      // positionTween is a ScrollTrigger instance on desktop (.kill() directly)
      // or a gsap tween with its own .scrollTrigger on mobile — cover both.
      positionTween?.kill?.();
      positionTween?.scrollTrigger?.kill();
      gsap.set(canvasEl, { clearProps: "left,top,opacity,visibility" });
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
          {/* <button className="btn-4">
            <span>
            <Link href="/contact-us">
              Contact us
            </Link>
              </span>
          </button> */}
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
            <Scene
              progress={1}
              progress2={progress2}
              enableMouseIdleRef={mouseIdleRef}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
