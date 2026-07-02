"use client";
import { useRef } from "react";
import Image from "next/image";
import "../../styles/OverlapingCards.css";
import TextAnimation from "../layout/TextAnimation";

const AVATARS = ["/over1.png", "/over1.png", "/over1.png", "/over1.png"];

const CARDS = [
  {
    logo: "/img4.png",
    company: "The St. Regis",
    subtitle: "Downtown Dubai",
    testimonial:
      '"Thank you for the Training Session. It was very informative. There were some techniques I would take, like Stress Origami. I have been folding away papers all this time. I believe that people need less stress in their lives, so this session is very beneficial. It would have been nicer if it had been a bit longer, but since we have a shorter time, maybe we can do a bit longer for the next session. Thank you."',
  },
  {
    logo: "/img5.png",
    company: "Bafleh",
    subtitle: "Jewellery LLC",
    testimonial:
      '"Amsha was great in facilitating and delivering our communication training. It was interactive and informative. I\'ve learned a lot that I can apply to daily work. Keep up the good work, Amsha. You\'re making our employees boost their confidence, which will reflect more in their productivity."',
  },
  {
    logo: "/img21.png",
    company: "Arakkal Gold and",
    subtitle: "Diamonds LLC",
    testimonial:
      '"Amsha was a fantastic facilitator. They made the workshop flow effortlessly. They exactly know what training we should conduct for my employees, which is the Well-being. I am confident that it will make a difference in helping our employees feel more connected and engaged."',
  },
];

const OverlapingCards = () => {
  const sliderRef = useRef(null);
  const drag = useRef({ active: false, startX: 0 });

  const snapTo = (index) => {
    const el = sliderRef.current;
    const cardWidth = el.offsetWidth;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  const currentIndex = () => {
    const el = sliderRef.current;
    return Math.round(el.scrollLeft / el.offsetWidth);
  };

  const onMouseDown = (e) => {
    drag.current = { active: true, startX: e.pageX };
    sliderRef.current.style.cursor = "grabbing";
  };

  const onMouseUp = (e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    sliderRef.current.style.cursor = "grab";
    const dx = e.pageX - drag.current.startX;
    const idx = currentIndex();
    if (dx < -40) snapTo(Math.min(idx + 1, CARDS.length - 1));
    else if (dx > 40) snapTo(Math.max(idx - 1, 0));
    else snapTo(idx);
  };

  return (
    <div className="p-oc">
      <section className="oc-section">
        <div className="oc-bg-wrap">
          <img src="/bg2.png" alt="" fill className="oc-bg" priority />
        </div>

        <div
          className="oc-cards"
          ref={sliderRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {CARDS.map((card, i) => (
            <div key={i} className="oc-card">
              {/* Desktop: company logo */}
              <Image
                src={card.logo}
                alt={card.company}
                width={160}
                height={70}
                 className={`oc-card-logo ${i > 0 ? "oc-card-logo-large" : ""}`}
              />

              {/* Mobile: overlapping avatars + client count */}
              {/* <div className="oc-avatar-row">
                <div className="oc-avatars">
                  {AVATARS.map((src, j) => (
                    <div key={j} className="oc-avatar">
                      <Image src={src} alt="" fill style={{ objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
                <span className="oc-client-count">27+ clients</span>
              </div> */}

              {/* Content */}
              <div className="oc-card-content">
                {card.company.split("\n").map((line, j) => (
                  <TextAnimation key={j} animateOnScroll={true} delay={0.1}>
                    <h3 className="oc-card-company" style={{ marginBottom: 0 }}>{line}</h3>
                  </TextAnimation>
                ))}
                {card.subtitle && (
                  <TextAnimation animateOnScroll={true} delay={0.1}>
                    <h3 className="oc-card-subtitle">{card.subtitle}</h3>
                  </TextAnimation>
                )}
                <TextAnimation animateOnScroll={true} delay={0.1}>
                  <p className="oc-card-testimonial">{card.testimonial}</p>
                </TextAnimation>
                {/* <button className="oc-contact-btn">Contact us</button> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OverlapingCards;
