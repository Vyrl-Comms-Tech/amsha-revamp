"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/Hero2.css";

gsap.registerPlugin(ScrollTrigger);

const Corner = ({ pos }) => <span className={`bracket bracket-${pos}`} />;

const StatBox = ({ className }) => (
  <div className={`stat-box ${className}`}>
    <Corner pos="tl" />
    <Corner pos="tr" />
    <Corner pos="bl" />
    <Corner pos="br" />
    <div className="stat-content">
      <span className="stat-number">Sustainability</span>
      <span className="stat-label">We create people solutions designed to support long-term organisational growth, stability, and workplace success</span>
    </div>
  </div>
);

const Hero2 = () => {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !sectionRef.current) return;

    const box1 = sectionRef.current.querySelector(".box-1");
    const box2 = sectionRef.current.querySelector(".box-2");
    const box5 = sectionRef.current.querySelector(".box-5");

    // Start each box deep inside the screen, invisible
    gsap.set([box1, box2, box5], { z: -1500, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    // Brief hold — section sticks, boxes not visible yet
    tl.to({}, { duration: 0.4 });

    // Box 1 erupts forward from screen depth
    tl.to(box1, { z: 0, opacity: 1, duration: 1, ease: "power3.out" });

    // Box 2 follows
    tl.to(box2, { z: 0, opacity: 1, duration: 1, ease: "power3.out" });

    // Box 5 last
    tl.to(box5, { z: 0, opacity: 1, duration: 1, ease: "power3.out" });

    // Hold all visible before unsticking
    tl.to({}, { duration: 0.4 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      gsap.set([box1, box2, box5], { clearProps: "all" });
    };
  }, []);

  return (
    <div ref={wrapperRef} className="hero2-wrapper">
      <section ref={sectionRef} className="hero2-section">
        <div className="hero2-image-wrapper" />

        <StatBox className="box-1" />
        <StatBox className="box-2" />
        <StatBox className="box-5" />

        <p className="hero2-desc">
          Amsha Advisory delivers strategic, people-centric solutions that enhance
          business efficiency, drive growth, and foster positive workplace cultures.
          We bridge traditional HR gaps with innovative approaches for long-term
          success.
        </p>
      </section>
    </div>
  );
};

export default Hero2;
