"use client";
import { Suspense, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import "../../styles/Hero.css";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const mainRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!mainRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, []);

  return (
    <main ref={mainRef} className="main">
      <section className="hero-section">

        {/* left col */}
        <div className="hero-left">
          <span className="hero-badge">&#8226; For those who want more from their business</span>
          <h1 className="hero-heading">Empowering People Elevating Businesses</h1>
        </div>

        {/* center — transparent spacer, fixed canvas sits here */}
        <div className="hero-center" />

        {/* right col */}
        <div className="hero-right">
          <p className="hero-desc">
            Amsha Advisory delivers strategic, people-centric solutions that
            enhance business efficiency, drive growth, and foster positive
            workplace cultures. We bridge traditional HR gaps with innovative
            approaches for long-term success.
          </p>
          <button className="hero-cta">Contact us</button>
        </div>

        {/* fixed canvas — outside grid flow so it doesn't shift columns */}
        <div className="canvas-wrapper">
          {/* <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
            <Suspense fallback={null}>
              <Scene progress={progress} />
            </Suspense>
          </Canvas> */}
          <img src="/img1.png" alt="Hero placeholder" className="hero-placeholder" />
        </div>

      </section>

      
    </main>
  );
};

export default Hero;
