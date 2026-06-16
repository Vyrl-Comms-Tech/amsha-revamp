"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/Hero2.css";
import TextAnimation from "../layout/TextAnimation";

gsap.registerPlugin(ScrollTrigger);

const Corner = ({ pos }) => <span className={`bracket bracket-${pos}`} />;

const BOXES = [
  {
    className: "box-1",
    title: "Sustainability",
    text: "We create people solutions designed to support long-term organisational growth, stability, and workplace success.",
  },
  {
    className: "box-2",
    title: "Innovation",
    text: "We combine modern workplace thinking, behavioural insight, and practical strategy to deliver solutions that move organisations forward.",
  },
  {
    className: "box-5",
    title: "People-Centric",
    text: "We believe strong organisations are built by empowering people, strengthening leadership, and creating healthier workplace cultures.",
  },
];

const StatBox = ({ className, title, text }) => (
  <div className={`stat-box ${className}`}>
    <Corner pos="tl" />
    <Corner pos="tr" />
    <Corner pos="bl" />
    <Corner pos="br" />
    <div className="stat-content">
      <span className="stat-number">

        {title}
      </span>
      <span className="stat-label">

        {text}

      </span>
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

        {BOXES.map((box) => (
          <StatBox key={box.className} {...box} />
        ))}
        <TextAnimation animateOnScroll={true} delay={0.5}>
          <p className="hero2-desc">
            Amsha Advisory delivers strategic, people-centric solutions that enhance
            business efficiency, drive growth, and foster positive workplace cultures.
            We bridge traditional HR gaps with innovative approaches for long-term
            success.
          </p>
        </TextAnimation>
      </section>
    </div>
  );
};

export default Hero2;
