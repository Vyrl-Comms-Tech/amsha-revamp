"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "../../styles/Brands-straight.css";
import TextAnimation from "../layout/TextAnimation";

// Unique brand logos
const BASE = [
  "/img33.png",
  "/img20.png",
  "/img32.png",
  "/img40.png",
  "/img5.png",
  "/img35.png",
  "/img37.png",
  "/img31.png",
  "/img39.png",
  "/img36.png",
  "/img42.png",
  "/img38.png",
  "/img29.webp",
  "/img28.jpg",
  "/img27.png",
  "/img26.png",
  "/img25.png",
  "/img24.png",
  "/img23.png",
  "/img22.png",
];

const TOP_ROW = [...BASE, ...BASE];
const BOTTOM_ROW = [...BASE, ...BASE];

const BrandsStraight = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    gsap.set(bottomRef.current, { xPercent: -50 });

    gsap.to(topRef.current, {
      xPercent: -50,
      duration: 50,
      ease: "none",
      repeat: -1,
    });

    gsap.to(bottomRef.current, {
      xPercent: 0,
      duration: 35,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="brands-section-straight">
      <div className="brands-title">
        <TextAnimation animateOnScroll={true} delay={0.1}>
          <h2 className="brands-heading">Brands We&apos;ve</h2>
        </TextAnimation>
        <TextAnimation animateOnScroll={true} delay={0.1}>
          <h2 className="brands-sub">Worked With</h2>
        </TextAnimation>
      </div>

      {/* Mobile straight marquee — two rows, opposite directions */}
      <div className="brands-mobile-marquee">
        <div className="brands-mobile-track">
          {[...BASE, ...BASE].map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              width={140}
              height={80}
              className="brand-img"
            />
          ))}
        </div>
        <div className="brands-mobile-track brands-mobile-track--reverse">
          {[...BASE, ...BASE].map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              width={140}
              height={80}
              className="brand-img"
            />
          ))}
        </div>
      </div>

      {/* Desktop straight rows — two rows, opposite directions */}
      <div className="brands-desktop-rows">
        <div className="brands-row">
          <div className="brands-row-track" ref={topRef}>
            {TOP_ROW.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt=""
                width={140}
                height={140}
                className="brand-img"
              />
            ))}
          </div>
        </div>

        <div className="brands-row">
          <div className="brands-row-track brands-row-track--reverse" ref={bottomRef}>
            {BOTTOM_ROW.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt=""
                width={140}
                height={140}
                className="brand-img"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsStraight;
