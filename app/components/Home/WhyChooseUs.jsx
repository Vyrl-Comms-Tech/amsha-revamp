'use client'
import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "../../styles/why-choose-us.css";
import TextAnimation from "../layout/TextAnimation";

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
            gsap.set(el, i === 0
                ? { height: "auto", opacity: 1, marginTop: 22 }
                : { height: 0, opacity: 0, marginTop: 0 }
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
                                            {activeIndex === index ? "↓" : "→"}
                                        </button>
                                    </div>

                                    <p ref={(el) => (bodyRefs.current[index] = el)}>
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="why-image">
                        <img
                            src="/img14.png"
                            alt="Amsha Advisory workplace"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
