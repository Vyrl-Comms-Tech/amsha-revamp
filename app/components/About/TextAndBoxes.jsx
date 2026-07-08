"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "../../styles/text-and-boxes.css";
// import "../../styles/about-text.css";
import TextAnimation from "../layout/TextAnimation";

gsap.registerPlugin(ScrollTrigger);

const TextAndBoxes = () => {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !textRef.current) return;

    let tl;
    let split;

    const rafId = requestAnimationFrame(() => {
      split = new SplitType(textRef.current, { types: "words,chars" });

      const primaryChars = primaryRef.current?.querySelectorAll(".char") ?? [];
      const secondaryChars =
        secondaryRef.current?.querySelectorAll(".char") ?? [];

      gsap.set(split.chars, { color: "rgba(0,0,0,0.10)" });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
        },
      });

      tl.to(primaryChars, {
        color: "#1a1a1a",
        stagger: 1,
      }).to(secondaryChars, {
        color: "#000",
        stagger: 1,
      });

      tl.to({}, { duration: tl.duration() * 0.05 });

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      tl?.scrollTrigger?.kill();
      tl?.kill();
      split?.revert();
    };
  }, []);

  return (
    <section ref={wrapperRef} className="about-mission-wrapper">
      <div className="about-mission-sticky">
        <section className="about-text">
          <div className="about-text-content">
            <TextAnimation animateOnScroll={true} delay={0.2}>
              <span className="about-text-label">About us</span>
            </TextAnimation>

            <p ref={textRef} className="about-text-text">
              <span ref={primaryRef} className="about-text-primary">
                Amsha Advisory was created with the vision of helping
                organisations navigate people-related challenges with greater
                clarity, strategy, and purpose. We partner with businesses to
                strengthen workplace performance, develop leaders, improve team
                dynamics, and create environments where both people and
                organisations can grow sustainably
              </span>
            </p>
          </div>
        </section>

        <section className="mission-vision-section">
          <div className="mission-vision-container">
            <div className="mission-card">
              <h2>Our Mission</h2>
              <p>
                To empower businesses with customized people solutions that
                foster growth and drive long-term success.
              </p>
            </div>

            <div className="mission-card">
              <h2>Our Vision</h2>
              <p>
                To be a trusted partner in helping businesses optimize their
                people strategies, highlighting the essential role individuals
                play in achieving success.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default TextAndBoxes;