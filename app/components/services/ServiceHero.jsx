"use client";
import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../Home/Scene";
import { GlowDot } from "../layout/svg";
import "../../styles/service-hero.css";
import TextAnimation from "../layout/TextAnimation";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Change x / y / z here (degrees) to rotate the model to any pose.
// x = pitch (tilt forward/back)   y = yaw (spin left/right)   z = roll (tilt sideways)
const MODEL_ANGLE = { x: -2.5, y: 301.5, z: 0.5 };

const RIGHT_DOTS = [
  { top: "18%", left: "58%" },
  { top: "30%", left: "70%" },
  { top: "62%", left: "60%" },
  { top: "15%", left: "82%" },
  { top: "50%", left: "88%" },
  { top: "78%", left: "75%" },
  { top: "42%", left: "92%" },
];

const ServiceHero = () => {
  const canvasWrapperRef = useRef(null);
  // Mouse-parallax + idle sway should stop once the model reaches the
  // footer (it should sit still there) and resume if scrolled back up
  // past it. Read fresh every frame by Scene — see enableMouseIdleRef.
  const mouseIdleRef = useRef(true);

  useEffect(() => {
    const canvasEl = canvasWrapperRef.current;
    const footerEl = document.querySelector(".footer");
    // Mobile keeps the CSS-defined centred position (service-hero.css media
    // queries) — only desktop/tablet need footer-tied behaviour.
    if (!canvasEl || !footerEl || window.innerWidth <= 575) return;

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

    let positionTrigger;
    if (window.innerWidth > 1100) {
      // Slide from centre (50%, the CSS default) → right column (75%) once the
      // footer enters view — same convention as Hero/AboutHero/FooterModel so
      // the model lands in the same spot across every page. Threshold matches
      // Footer.css's own @media(max-width:1100px) breakpoint, where
      // .footer-right (the column reserving space for the model) gets
      // display:none and .footer-left's text expands to fill the full width.
      // Unlike Hero/AboutHero/FooterModel's .canvas-wrapper, .sh-canvas-wrapper
      // has no translateX(-50%) — its "left" is the box's left edge, not its
      // centre. At the default left:50%/width:50vw it already spans 50%-100%
      // (visual centre at 75%, same spot every other page's footer model
      // sits at), so no slide is needed on footer entry — sliding "left" to
      // 75% would shove the whole box to 75%-125%, pushing the model off
      // the right edge of the screen.
      positionTrigger = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 65%",
        onEnter: () =>
          gsap.to(canvasEl, {
            left: "40%",
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          }),
        onLeaveBack: () =>
          gsap.to(canvasEl, {
            left: "40%",
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          }),
      });
    } else {
      // Tablet/narrow-desktop: footer-right is hidden at this width (no room
      // for the model), so fade it out instead of sliding it onto the
      // now-full-width footer text.
      positionTrigger = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 55%",
        onEnter: () =>
          gsap.to(canvasEl, { autoAlpha: 0, duration: 0.4, overwrite: true }),
        onLeaveBack: () =>
          gsap.to(canvasEl, { autoAlpha: 1, duration: 0.4, overwrite: true }),
      });
    }

    return () => {
      positionTrigger.kill();
      mouseIdleTrigger.kill();
      gsap.set(canvasEl, { clearProps: "left,opacity,visibility" });
    };
  }, []);

  return (
    <>
      <section className="sh-section">
        <div className="sh-left">
          <TextAnimation animateOnScroll={true} delay={0.3}>
            <h1 className="sh-heading">Our Services</h1>
          </TextAnimation>
          <TextAnimation animateOnScroll={true} delay={0.3}>
            <p className="sh-desc">
            At Amsha Advisory, we believe every organisation and individual has unique goals, challenges, and opportunities for growth. Our services are designed to provide tailored, practical, and people-centered solutions that strengthen performance, develop capability, and create lasting impact. Whether supporting businesses through strategic advisory or individuals through professional development, our focus remains on delivering solutions that drive sustainable success.
            </p>
          </TextAnimation>
          <button className="sh-btn btn-4">
            <Link href="/contact-us">Contact us</Link>
          </button>
        </div>

        {/* ── Right-side glow band ── */}
        <div className="sh-right-glow" />

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

      {/* Fixed canvas on the right half — same model as the rest of the site */}
      <div className="sh-canvas-wrapper" ref={canvasWrapperRef}>
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
    </>
  );
};

export default ServiceHero;
