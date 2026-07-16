"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/our-clients.css";
import TextAnimation from "../layout/TextAnimation";

const ITEMS = [
  {
    heading: "Sustainability",
    text: "We create people solutions designed to support long-term organisational growth, stability, and workplace success.",
  },
  {
    heading: "Innovation",
    text: "We combine modern workplace thinking, behavioural insight, and practical strategy to deliver solutions that move organisations forward.",
  },
  {
    heading: "People-Centric",
    text: "We believe strong organisations are built on people, strengthening leadership, and creating sustainable workplace cultures.",
  },
];

export default function OurClientsHorizontal() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const trackOuterRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndex = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const items = gsap.utils.toArray(".och-item");
      if (!items.length) return;
      const itemWidth = () => items[0].offsetWidth;

      gsap.to(track, {
        x: () => -(itemWidth() * (ITEMS.length - 1)),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              ITEMS.length - 1,
              Math.round(self.progress * (ITEMS.length - 1)),
            );
            if (index !== currentIndex.current) {
              currentIndex.current = index;
              setActiveIndex(index);
            }
          },
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const numStr = String(activeIndex + 1).padStart(2, "0");

  return (
    <div ref={wrapperRef} className="och-wrapper">
      <section className="och-section">
        {/* ── Top: heading (left) + number (right) ── */}
        <div className="och-top">
                    <TextAnimation animateOnScroll={true} delay={0.3}>

          <h2 className="och-heading">
            Our 
            <br />
             <span className="och-heading-dim">Clients </span>
          </h2>
                    </TextAnimation>
          <span className="och-number">{numStr}</span>
        </div>

        {/* ── Horizontal sliding items ── */}
        <div ref={trackOuterRef} className="och-track-outer">
          <div ref={trackRef} className="och-track">
            {ITEMS.map((item, i) => {
              const diff = i - activeIndex;
              // Active item is full opacity; items to the right fade progressively
              const opacity = i === activeIndex ? 1 : 0.18;
              return (
                <div
                  key={i}
                  className="och-item"
                  style={{ opacity, transition: "opacity 0.4s ease" }}
                >
                  <div className="och-item-line" />
                  <h3 className="och-item-heading">{item.heading}</h3>
                  <p className="och-item-text">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
