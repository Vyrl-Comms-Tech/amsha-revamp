"use client";
import { Suspense, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import "../../styles/Hero.css";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const canvasWrapperRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasWrapperRef.current;

    // Hero(100vh) + Hero2(300vh) + Hero3(400vh) = 800vh = 8 × viewport height
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: `+=${window.innerHeight * 8}`,
      onUpdate: (self) => setProgress(self.progress),
    });

    // Rotation: Facts → Footer (0→1)
    const factsEl = document.querySelector(".facts-section");
    const footerEl = document.querySelector(".footer");
    let trigger2 = null;
    let positionTween = null;

    if (factsEl && footerEl) {
      trigger2 = ScrollTrigger.create({
        trigger: factsEl,
        start: "top bottom",
        endTrigger: footerEl,
        end: "bottom bottom",
        onUpdate: (self) => setProgress2(self.progress),
      });

      // Canvas slides from center (50%) → right column center (75%) as the
      // footer enters the viewport.
      //
      // WHY scrub: 0.3 instead of scrub: true
      //   Lenis uses a lerp-based inertia model.  On any wheel input it briefly
      //   creates a tiny oscillating scroll delta before settling — with zero lag
      //   (scrub: true) the canvas faithfully follows that micro-oscillation,
      //   producing a visible "goes left then right" blip.  A 0.3 s lag is
      //   short enough to feel instant but long enough to absorb the Lenis blip.
      //
      // WHY immediateRender: false
      //   Prevents GSAP from snapshotting the start value at page-load time.
      //   Instead it reads the live CSS value the first time scroll enters the
      //   trigger, so any prior inline style (e.g. from onLeave) doesn't confuse
      //   the start state on a back-and-forth scroll.
      //
      // WHY only left (no width animation)
      //   Width + transform:translateX(-50%) interact and add unnecessary jitter.
      //   Canvas width stays at 55 vw from CSS; only the center anchor moves.
      //
      // onLeave hard-locks the position once the footer is fully scrolled in,
      //   preventing end-of-page Lenis momentum from nudging it back left.
      positionTween = gsap.to(canvasEl, {
        left: "75%",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: footerEl,
          start: "top 70%",
          end: "top 40%",
          scrub: 0.3,
          onLeave: () => {
            gsap.set(canvasEl, { left: "75%" });
          },
        },
      });
    }

    return () => {
      trigger.kill();
      trigger2?.kill();
      positionTween?.scrollTrigger?.kill();
      if (canvasEl) {
        gsap.set(canvasEl, { clearProps: "left" });
      }
    };
  }, []);

  return (
    <main className="main">
      <section className="hero-section">

        {/* left col */}
        <div className="hero-left">
          <span className="hero-badge">&#8226; &nbsp; For those who want more from their business</span>
          <h1 className="hero-heading">Empowering People Elevating Businesses</h1>
        </div>

        {/* center — transparent spacer, fixed canvas sits here */}
        <div className="hero-center" />

        {/* right col */}
        <div className="hero-right">
          <p className="hero-desc">
            People-centred strategies designed to strengthen leadership, elevate workplace performance, and drive sustainable business growth.
          </p>
          <button className="hero-cta">Contact us</button>
        </div>

        {/* fixed canvas — outside grid flow so it doesn't shift columns */}
        <div ref={canvasWrapperRef} className="canvas-wrapper">
          <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
            <Suspense fallback={null}>
              <Scene progress={progress} progress2={progress2} />
            </Suspense>
          </Canvas>
        </div>

      </section>


    </main>
  );
};

export default Hero;
