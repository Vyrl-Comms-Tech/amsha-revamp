'use client'
import React, { useState } from "react";
import "../../styles/why-choose-us.css";

const items = [
    {
        title: "Purpose-Driven Solutions",
        text: "We believe strong organisations are built when people, purpose, and business objectives are aligned. Our role is to help create people strategies that strengthen performance, culture, and long-term growth.",
    },
    {
        title: "Empowered Growth",
        text: "We help teams and leaders build the skills, confidence, and systems they need to grow with clarity and purpose.",
    },
    {
        title: "Strategic Partnership",
        text: "We work closely with organisations as a trusted advisory partner, supporting people decisions that create lasting business impact.",
    },
];

const WhyChooseUs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="why-choose-us">
            <div className="why-container">
                <div className="why-heading">
                    <h2>
                        Why Choose <br />
                        <span>Amsha Advisory?</span>
                    </h2>
                </div>

                <div className="why-content">
                    <div className="why-left">
                        <div className="why-line" />

                        <div className="why-list">
                            {items.map((item, index) => (
                                <div
                                    className={`why-item ${activeIndex === index ? "active" : ""}`}
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="why-item-head">
                                        <h3>{item.title}</h3>

                                        <button className="why-arrow" aria-label={item.title}>
                                            {activeIndex === index ? "↓" : "→"}
                                        </button>
                                    </div>

                                    {activeIndex === index && <p>{item.text}</p>}
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