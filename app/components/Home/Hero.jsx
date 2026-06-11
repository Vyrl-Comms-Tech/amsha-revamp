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
      // footer enters the viewport. On mobile there's no right column so instead
      // the canvas slides DOWN so the model appears at the bottom of the screen.
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
            onLeave: () => {
              gsap.set(canvasEl, { left: "75%" });
            },
          },
        });
      } else {
        // Mobile: slide canvas down so the model lands at the bottom of the
        // footer view instead of staying pinned at the top of the screen.
        positionTween = gsap.to(canvasEl, {
          top: "32%",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: footerEl,
            start: "top 80%",
            end: "top 15%",
            scrub: 0.3,
            onLeave: () => {
              gsap.set(canvasEl, { top: "32%" });
            },
          },
        });
      }
    }

    return () => {
      trigger.kill();
      trigger2?.kill();
      positionTween?.scrollTrigger?.kill();
      if (canvasEl) {
        gsap.set(canvasEl, { clearProps: "left,top" });
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
