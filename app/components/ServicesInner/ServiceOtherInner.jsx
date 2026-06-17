"use client"

import Image from "next/image";
import "../../styles/other-inner.css";
import TextAnimation from "../layout/TextAnimation";
// Default content — used by the employee-training-development page.
// Pass topCards / bottomCard props to override for any other service page.
const DEFAULT_TOP_CARDS = [
  {
    step: "Step One",
    title: "Training Formats",
    bullets: [
      "Online Training Sessions",
      "In-Person Training Sessions",
      "Hybrid Training Solutions",
    ],
  },
  {
    step: "Step Two",
    title: "Session Duration Options",
    bullets: [
      "2-Hour Sessions",
      "Half-Day Workshops",
      "Full-Day Workshops",
      "Multi-Day Training Programs",
      "Quarterly & Annual Development Programs",
    ],
  },
];

const DEFAULT_BOTTOM_CARD = {
  step: "Step Three",
  title: "Delivery Approach",
  image: "/ab1.png",
  bullets: [
    "Interactive & Scenario-Based Learning",
    "Role-Playing & Workplace Simulations",
    "Group Activities & Team Exercises",
    "Case Studies & Practical Discussions",
    "Leadership & Behavioural Development Activities",
    "Reflection & Self-Awareness Exercises",
    "Collaborative Learning Sessions",
    "Customised Organisational Training Solutions",
    "Post-Training Feedback & Development Support",
  ],
};

export default function ServiceOtherInner({
  topCards = DEFAULT_TOP_CARDS,
  bottomCard = DEFAULT_BOTTOM_CARD,
}) {
  return (
    <section className="oi-section">
      {/* Top row — two equal cards */}
      <div className="oi-top-row">
        {topCards.map((card, i) => (
          <div key={i} className="oi-card">
            <div className="oi-card-header">
              <TextAnimation animateOnScroll={true} delay={0.3}>
                <span className="oi-step">{card.step}</span>
              </TextAnimation>
              <TextAnimation animateOnScroll={true} delay={0.3}>
                <h3 className="oi-title">{card.title}</h3>
              </TextAnimation>
            </div>
            <ul className="oi-list">
              {card.bullets.map((b, j) => (
                <li key={j}>
                  <TextAnimation animateOnScroll={true} delay={0.3}>
                    <span>{b}</span>
                  </TextAnimation>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom row — wide card with image */}
      <div className="oi-card oi-card--wide">
        <div className="oi-wide-left">
          <TextAnimation animateOnScroll={true} delay={0.3}>
            <span className="oi-step">{bottomCard.step}</span>
          </TextAnimation>
          <TextAnimation animateOnScroll={true} delay={0.3}>
            <h3 className="oi-title">{bottomCard.title}</h3>
          </TextAnimation>
          <ul className="oi-list">
            {bottomCard.bullets.map((b, j) => (
              <li key={j}>
                <TextAnimation animateOnScroll={true} delay={0.3}>
                  <span>{b}</span>
                </TextAnimation>
              </li>
            ))}
          </ul>
        </div>
        <div className="oi-wide-img">
          <Image
            src={bottomCard.image}
            alt={bottomCard.title}
            fill
            className="oi-img"
          />
        </div>
      </div>
    </section>
  );
}
