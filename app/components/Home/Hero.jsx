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
    let mobileHero2Tween = null;
    let mobileFooterTween = null;

    if (factsEl && footerEl) {
      trigger2 = ScrollTrigger.create({
        trigger: factsEl,
        start: "top bottom",
        endTrigger: footerEl,
        end: "bottom bottom",
        onUpdate: (self) => setProgress2(self.progress),
      });

      if (window.innerWidth > 575) {
        // Desktop: canvas slides from center (50%) → right column (75%) on footer entry
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
        // Mobile: canvas starts at top:40% (model at bottom, behind Hero content).
        // Animate top as each section enters so the model repositions:
        //   Hero2 / Hero3  → top: 20%  (model centered: 20% + 30vh = ~50%)
        //   Footer         → top: 45%  (model deep at bottom: 45% + 30vh = ~75%)
        const hero2El = document.querySelector(".hero2-wrapper");

        if (hero2El) {
          // Model moves from bottom (Hero) to center (Hero2/Hero3) as Hero2 scrolls in
          mobileHero2Tween = gsap.to(canvasEl, {
            top: "20%",
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: hero2El,
              start: "top 80%",  // hero2 is 80% into viewport
              end: "top 10%",    // hero2 almost fully entered
              scrub: 0.5,
            },
          });
        }

        // Model moves from center (Hero2/Hero3) to deep bottom (Footer)
        mobileFooterTween = gsap.to(canvasEl, {
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
    }

    return () => {
      trigger.kill();
      trigger2?.kill();
      positionTween?.scrollTrigger?.kill();
      mobileHero2Tween?.scrollTrigger?.kill();
      mobileFooterTween?.scrollTrigger?.kill();
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
