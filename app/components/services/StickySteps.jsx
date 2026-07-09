"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/sticky-steps.css";
import { PinkSphereCanvas } from "../Home/Particles";
import TextAnimation from "../layout/TextAnimation";

const STEPS = [
  {
    step: "Step One",
    title: "People Advisory",
    text: " Strategic people solutions that strengthen organizational structure, workplace performance, and long-term business success.",
    href: "/services/people-advisory",
  },
  {
    step: "Step Two",
    title: "Employee Training & Development",
    text: " Interactive, customized training programs that build skills, develop leaders, and enhance workplace performance.",
    href: "/services/employee-training-development",
  },
  {
    step: "Step Three",
    title: "Upskilling & Training",
    text: " Personalized 1:1 development programs designed to strengthen professional skills and support individual growth.",
    href: "/services/upskilling-training",
  },
  {
    step: "Step Five",
    title: "Career Development",
    text: " Tailored career guidance and psychometric insights that help individuals gain clarity, confidence, and direction.",
    href: "/services/career-development",
  },
  {
    step: "Step Six",
    title: "Talent Assessment",
    text: "Behavioural and assessment-based solutions that support smarter hiring and more informed talent decisions.",
    href: "/services/talent-assessment",
  },
  {
    step: "Step Four",
    title: "Entrepreneurial Consulting",
    text: " Strategic consulting that helps entrepreneurs build stronger businesses through people-focused and sustainable growth solutions.",
    href: "/services/entrepreneurial-consulting",
  },
];

const TOPS = [60, 330, 583, 820, 1047, 1274];
const CARD_H = 250;
const colBottom = TOPS[TOPS.length - 1] + CARD_H;

export default function StickySteps() {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches,
  );

  // Keep isMobile in sync when viewport resizes across the breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    if (mobile) {
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
      y: () => -Math.max(0, colBottom - window.innerHeight),
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    const onResize = () => {
      setWrapperH();
      ScrollTrigger.refresh();
    };
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
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="service-card"
            style={
              isMobile
                ? {}
                : {
                    top: TOPS[i],
                    width: 620,
                    ...(i % 2 === 0 ? { left: 100 } : { right: 100 }),
                  }
            }
          >
            {/* <TextAnimation animateOnScroll={true} delay={0.1}>
              <span>{step.step}</span>
            </TextAnimation> */}
            <TextAnimation animateOnScroll={true} delay={0.1}>
              <h3>{step.title}</h3>
            </TextAnimation>
            <TextAnimation animateOnScroll={true} delay={0.1}>
              <p>{step.text}</p>
            </TextAnimation>
            <a href={step.href}>VIEW NOW</a>
          </div>
        ))}
      </section>
    </div>
  );
}
