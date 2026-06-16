"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "../../styles/Hero3.css";
import TextAnimation from "../layout/TextAnimation";

gsap.registerPlugin(ScrollTrigger);

const Hero3 = () => {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !textRef.current) return;

    const split = new SplitType(textRef.current, { types: "words, chars" });
    gsap.set(split.chars, { color: "rgba(255,255,255,0.12)" });

    // Trigger fires on the tall wrapper — Brands can't scroll into view
    // until the wrapper's scroll space is fully consumed (animation done).
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });

    tl.to(split.chars, { color: "#dadada", stagger: 1 });

    // Small hold after last char so the fully-lit text lingers before
    // the section unsticks. Adjust the multiplier to taste.
    tl.to({}, { duration: tl.duration() * 0.05 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    // Tall wrapper — its height determines how long the section stays on screen.
    // wrapper height = 100vh (section) + stick duration.
    // Change hero3-wrapper height in Hero3.css to give more/less scroll time.
    <div ref={wrapperRef} className="hero3-wrapper">
      <section ref={sectionRef} className="hero3-section">
        <div className="hero3-bg" />

        <div className="hero3-content">
        <TextAnimation animateOnScroll={true} delay={0.2}>
          <span className="hero3-label">
            
            About us
            </span>
            </TextAnimation>

          <p ref={textRef} className="hero3-text">
            <span className="hero3-primary">
              Amsha Advisory was created with the vision of helping organisations
              navigate people-related challenges with greater clarity, strategy, and
              purpose. We partner      with businesses to strengthen workplace performance, develop leaders,
              improve team dynamics, and create environments where both people and
              organisations can grow sustainably
            </span>
            {/* <span className="hero3-secondary">
         
            </span> */}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero3;
