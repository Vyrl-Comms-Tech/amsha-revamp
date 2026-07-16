"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "../../styles/why-choose-us.css";
import TextAnimation from "../layout/TextAnimation";

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="15"
    viewBox="0 0 18 17"
    fill="none"
  >
    <path
      d="M0 7.84615L15.572 7.84615L8.8983 0.980769L9.73729 0L18 8.5L9.73729 17L8.8983 16.0192L15.572 9.15385L0 9.15385V7.84615Z"
      fill="white"
    />
  </svg>
);

const ArrowDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="15"
    viewBox="0 0 17 18"
    fill="none"
  >
    <path
      d="M9.0195 -0.000139399L9.23294 15.5704L16.0062 8.80323L16.9984 9.62869L8.61243 18.0071L-2.4146e-05 9.8617L0.969154 9.00936L7.92537 15.5884L7.71193 0.0177847L9.0195 -0.000139399Z"
      fill="#fff"
    />
  </svg>
);

const items = [
  {
    title: "Purpose-Driven Solutions",
    text: "We believe strong organisations are built when people, purpose, and business objectives are aligned. Our role is to help create people strategies that strengthen performance, culture, and long-term growth.",
  },
  {
    title: "Empowered Growth",
    text: "We support organisations and individuals in unlocking their potential through practical development solutions that foster growth, performance, and long-term success.",
  },
  {
    title: "Strategic Partnership",
    text: "We work closely with our clients as long-term partners, creating tailored solutions that support organisational goals, strengthen teams, and drive sustainable business impact.",
  },
];

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const bodyRefs = useRef([]);
  const activeRef = useRef(0);

  useLayoutEffect(() => {
    bodyRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(
        el,
        i === 0
          ? { height: "auto", opacity: 1, marginTop: 22 }
          : { height: 0, opacity: 0, marginTop: 0 },
      );
    });
  }, []);

  const handleClick = (index) => {
    const prev = activeRef.current;
    if (index === prev) return;

    const prevEl = bodyRefs.current[prev];
    if (prevEl) {
      gsap.to(prevEl, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }

    const nextEl = bodyRefs.current[index];
    if (nextEl) {
      gsap.to(nextEl, {
        height: "auto",
        opacity: 1,
        marginTop: 22,
        duration: 0.45,
        ease: "power2.inOut",
      });
    }

    activeRef.current = index;
    setActiveIndex(index);
  };

  return (
    <section className="why-choose-us">
      <div className="why-container">
        <div className="why-heading">
          <TextAnimation animateOnScroll={true} delay={0.1}>
            <h2>
              Why Choose <br />
              <span>Amsha Advisory?</span>
            </h2>
          </TextAnimation>
        </div>

        <div className="why-content">
          <div className="why-left">
            <div className="why-line" />

            <div className="why-list">
              {items.map((item, index) => (
                <div
                  className={`why-item ${activeIndex === index ? "active" : ""}`}
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  <div className="why-item-head">
                    <h3>{item.title}</h3>

                    <button className="why-arrow" aria-label={item.title}>
                      {activeIndex === index ? <ArrowDown /> : <ArrowRight />}
                    </button>
                  </div>

                  <p ref={(el) => (bodyRefs.current[index] = el)}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="why-image">
            <img src="https://www.amazinghomedecorco.com/wp-content/uploads/2024/04/Beautiful-Grey-Home-Offices_-I-8.jpg" alt="Amsha Advisory workplace" />
          </div> */}
           <div
            className="why-image"
            style={{
              background: "linear-gradient(104deg, #6EA1C3 -43.42%, #835EA2 84.02%)",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
