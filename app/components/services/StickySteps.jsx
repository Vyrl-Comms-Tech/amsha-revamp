"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/sticky-steps.css";
import { PinkSphereCanvas } from "../Home/Particles";

const STEPS = [
  {
    step: "Step One",
    title: "People Advisory",
    text: "Strategic organisational support designed to strengthen workplace structure, improve role clarity, enhance operational efficiency, and support overall organisational performance.",
    href: "#",
  },
  {
    step: "Step Two",
    title: "Employee Training & Development",
    text: "Interactive and practical training programs focused on improving workplace performance, leadership capability, and team effectiveness.",
    href: "#",
  },
  {
    step: "Step Three",
    title: "Upskilling & Training",
    text: "Targeted development programs that help individuals strengthen professional skills and adapt to evolving workplace demands.",
    href: "#",
  },
  {
    step: "Step Four",
    title: "Entrepreneurial Consulting",
    text: "Business support solutions designed to help entrepreneurs build stronger foundations, improve operations, and scale sustainably.",
    href: "#",
  },
  {
    step: "Step Five",
    title: "Career Development",
    text: "Personalised guidance that helps individuals identify their strengths, clarify career direction, and support long-term professional growth.",
    href: "#",
  },
  {
    step: "Step Six",
    title: "Talent Assessment",
    text: "Behavioural and assessment-based solutions that support informed hiring, development, and organisational decision-making.",
    href: "#",
  },
];

const TOPS    = [59, 340, 593, 860, 1127, 1394];
const CARD_H  = 250;
const colBottom = TOPS[TOPS.length - 1] + CARD_H;

export default function StickySteps() {
  const wrapperRef = useRef(null);
  const cardRefs   = useRef([]);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  // Keep isMobile in sync when viewport resizes across the breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // GSAP scroll animation — desktop only
  useEffect(() => {
    if (isMobile) {
      if (wrapperRef.current) wrapperRef.current.style.height = "";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const setWrapperH = () => {
      const scrollDist = Math.max(0, colBottom - window.innerHeight);
      wrapperRef.current.style.height = `${window.innerHeight + scrollDist}px`;
    };
    setWrapperH();

    const tween = gsap.to(cardRefs.current, {
      y: () => -(Math.max(0, colBottom - window.innerHeight)),
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    const onResize = () => { setWrapperH(); ScrollTrigger.refresh(); };
    window.addEventListener("resize", onResize);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  return (
    <div ref={wrapperRef} className="ss-wrapper">
      <section className="services-section">

        <div className="orb-wrap">
          <PinkSphereCanvas />
        </div>

        {STEPS.map((step, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el; }}
            className="service-card"
            style={isMobile ? {} : {
              top:   TOPS[i],
              width: 620,
              ...(i % 2 === 0 ? { left: 100 } : { right: 100 }),
            }}
          >
            <span>{step.step}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <a href={step.href}>VIEW NOW</a>
          </div>
        ))}

      </section>
    </div>
  );
}
