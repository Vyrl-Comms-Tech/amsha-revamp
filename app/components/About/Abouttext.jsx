"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "../../styles/about-text.css";
import TextAnimation from "../layout/TextAnimation";

gsap.registerPlugin(ScrollTrigger);

const AboutText = () => {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !textRef.current) return;

    const split = new SplitType(textRef.current, { types: "words,chars" });

    // Grab chars scoped to each span so we can animate to different end colors
    const primaryChars = primaryRef.current?.querySelectorAll(".char") ?? [];
    const secondaryChars = secondaryRef.current?.querySelectorAll(".char") ?? [];

    gsap.set(split.chars, { color: "rgba(0,0,0,0.10)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });

    // Primary (bold) chars light up to near-black first, then secondary to gray
    tl.to(primaryChars, { color: "#1a1a1a", stagger: 1 })
      .to(secondaryChars, { color: "#000", stagger: 1 });

    // Small hold so fully-lit text lingers before section unsticks
    tl.to({}, { duration: tl.duration() * 0.05 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="about-text-wrapper">
      <section className="about-text">
        <div className="about-text-content">
          <TextAnimation animateOnScroll={true} delay={0.7}>
            <span className="about-text-label">

              About us
            </span>
          </TextAnimation>

          <p ref={textRef} className="about-text-text">
            <span ref={primaryRef} className="about-text-primary">
              Amsha Advisory was created with the vision of helping organisations
              navigate people-related challenges with greater clarity, strategy, and
              purpose. We partner
              {/* <span ref={secondaryRef} className="about-text-secondary"> */}
              with businesses to strengthen workplace performance, develop leaders,
              improve team dynamics, and create environments where both people and
              organisations can grow sustainably
            </span>
            {/* </span> */}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutText;
