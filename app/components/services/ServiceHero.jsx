"use client";
import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../Home/Scene";
import { GlowDot } from "../layout/svg";
import "../../styles/service-hero.css";
import TextAnimation from "../layout/TextAnimation";

gsap.registerPlugin(ScrollTrigger);

// Change x / y / z here (degrees) to rotate the model to any pose.
// x = pitch (tilt forward/back)   y = yaw (spin left/right)   z = roll (tilt sideways)
const MODEL_ANGLE = { x: -10, y: 450, z: 18 };

const ServiceHero = () => {
  const canvasWrapperRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasWrapperRef.current;
    const footerEl = document.querySelector(".footer");
    // Mobile keeps the CSS-defined centred position (service-hero.css media
    // queries) — only desktop/tablet need footer-tied behaviour.
    if (!canvasEl || !footerEl || window.innerWidth <= 575) return;

    let positionTrigger;
    if (window.innerWidth > 1100) {
      // Slide from centre (50%, the CSS default) → right column (75%) once the
      // footer enters view — same convention as Hero/AboutHero/FooterModel so
      // the model lands in the same spot across every page. Threshold matches
      // Footer.css's own @media(max-width:1100px) breakpoint, where
      // .footer-right (the column reserving space for the model) gets
      // display:none and .footer-left's text expands to fill the full width.
      positionTrigger = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 75%",
        onEnter: () =>
          gsap.to(canvasEl, { left: "75%", duration: 0.6, ease: "power2.out", overwrite: true }),
        onLeaveBack: () =>
          gsap.to(canvasEl, { left: "50%", duration: 0.6, ease: "power2.out", overwrite: true }),
      });
    } else {
      // Tablet/narrow-desktop: footer-right is hidden at this width (no room
      // for the model), so fade it out instead of sliding it onto the
      // now-full-width footer text.
      positionTrigger = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 75%",
        onEnter: () => gsap.to(canvasEl, { autoAlpha: 0, duration: 0.4, overwrite: true }),
        onLeaveBack: () => gsap.to(canvasEl, { autoAlpha: 1, duration: 0.4, overwrite: true }),
      });
    }

    return () => {
      positionTrigger.kill();
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
              At Amsha Advisory, our People Advisory solutions are designed to
              help organisations strengthen their internal foundations through
              structured, practical, and people-centred support. We work closely
              with businesses to identify operational and organisational gaps
              that may be impacting efficiency, communication, leadership
              alignment, workplace culture, and overall performance.
            </p>
          </TextAnimation>
          <TextAnimation animateOnScroll={true} delay={0.3}>
            <p className="sh-desc">
              Our approach goes beyond traditional HR support by focusing on how
              organisations function in practice, from structure and
              communication flow to accountability, operational processes, and
              employee experience. We create tailored solutions that support
              healthier workplace environments, stronger organisational
              performance, and long-term business sustainability.
            </p>
          </TextAnimation>
          <button className="sh-btn btn-4">Contact us</button>
        </div>

        {/* ── Right-side glow with floating dots ── */}
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
      </section>

      {/* Fixed canvas on the right half — same model as the rest of the site */}
      <div className="sh-canvas-wrapper" ref={canvasWrapperRef}>
        <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
          <Suspense fallback={null}>
            <Scene overrideRotation={MODEL_ANGLE} progress2={0} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default ServiceHero;
