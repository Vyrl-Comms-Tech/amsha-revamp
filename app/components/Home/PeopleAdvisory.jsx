"use client";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/people-advisory.css";
import { PinkSphereCanvas } from "./Particles";
import TextAnimation from "../layout/TextAnimation";

const SLIDES = [
  {
    heading: "People Advisory",
    number: "01",
    text: "Strategic organisational support designed to strengthen workplace structure, improve role clarity, enhance operational efficiency, and support overall organisational performance.",
  },
  {
    heading: "Employee Training & Development",
    number: "02",
    text: "Interactive and practical training programs focused on improving workplace performance, leadership capability, and team effectiveness.",
  },
  {
    heading: "Upskilling & Training",
    number: "03",
    text: "Targeted development programs that help individuals strengthen professional skills and adapt to evolving workplace demands.",
  },
  {
    heading: "Entrepreneurial Consulting",
    number: "04",
    text: "Business support solutions designed to help entrepreneurs build stronger foundations, improve operations, and scale sustainably.",
  },
  {
    heading: "Career Development",
    number: "05",
    text: " Personalised guidance that helps individuals identify their strengths, clarify career direction, and support long-term professional growth .",
  },
  {
    heading: "Talent Assessment",
    number: "06",
    text: "Behavioural and assessment-based solutions that support informed hiring, development, and organisational decision-making.",
  },
];

export default function PeopleAdvisory() {
  const wrapperRef        = useRef();
  const numberRef         = useRef();
  const sphereProgressRef = useRef(0); // drives Particles rotation via ref (no re-render)
  const [slide, setSlide] = useState(0);
  const currentSlide      = useRef(0);
  const hasShownAll       = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const getEls = () => [numberRef.current].filter(Boolean);

    const isAnimating = { current: false };
    const pending     = { current: null };
    let sectionEnd = 0;

    const runTransition = (next) => {
      isAnimating.current = true;
      currentSlide.current = next;

      gsap.to(getEls(), {
        autoAlpha: 0,
        yPercent: -100,
        duration: 0.3,
        ease: "power1.inOut",
        stagger: 0.04,
        onComplete: () => {
          flushSync(() => setSlide(currentSlide.current));
          gsap.fromTo(
            getEls(),
            { autoAlpha: 0, yPercent: 100 },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.4,
              ease: "power1.inOut",
              stagger: 0.06,
              onComplete: () => {
                isAnimating.current = false;
                if (next === SLIDES.length - 1) hasShownAll.current = true;
                if (pending.current !== null && pending.current !== currentSlide.current) {
                  const nextPending = pending.current;
                  pending.current = null;
                  runTransition(nextPending);
                }
              },
            }
          );
        },
      });
    };

    const goTo = (next) => {
      if (next === currentSlide.current) return;
      if (isAnimating.current) { pending.current = next; return; }
      runTransition(next);
    };

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      onRefresh: (self) => { sectionEnd = self.end; },
      onUpdate: (self) => {
        sectionEnd = self.end;
        sphereProgressRef.current = self.progress;
        goTo(Math.min(SLIDES.length - 1, Math.floor(self.progress * SLIDES.length)));
      },
    });

    // Wheel guard: intercept downward wheel events when the user is inside the
    // section and hasn't seen all slides yet.  Non-passive so we can preventDefault.
    const onWheel = (e) => {
      if (hasShownAll.current || !sectionEnd) return;
      const atOrPastEnd = window.scrollY >= sectionEnd - 5;
      if (e.deltaY > 0 && atOrPastEnd) {
        e.preventDefault();
      }
    };

    // Touch guard: same idea for swipe-up on mobile.
    let touchStartY = 0;
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      if (hasShownAll.current || !sectionEnd) return;
      const swipingUp   = e.touches[0].clientY < touchStartY;
      const atOrPastEnd = window.scrollY >= sectionEnd - 5;
      if (swipingUp && atOrPastEnd) e.preventDefault();
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true  });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });

    return () => {
      st.kill();
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
    };
  }, []);

  const { heading, number, text } = SLIDES[slide];

  return (
    <div ref={wrapperRef} className="pa-scroll-wrapper">
      <section className="hero-section-of-poeple-advisory">

        <div className="hero-heading">
          <TextAnimation key={`h-${slide}`} animateOnScroll={false} delay={0.15}>
            <h1>{heading}</h1>
          </TextAnimation>
        </div>

        <div className="hero-image">
          <PinkSphereCanvas progressRef={sphereProgressRef} />
        </div>

        <div className="hero-number">
          <span ref={numberRef}>{number}</span>
        </div>

        <div className="hero-content">
          <TextAnimation key={`p-${slide}`} animateOnScroll={false} delay={0.15}>
            <p>{text}</p>
          </TextAnimation>
          <button className="btn-4">
            <span>

            Explore More
            </span>
            </button>
        </div>

      </section>
    </div>
  );
}
