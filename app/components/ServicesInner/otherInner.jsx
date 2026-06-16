import Image from "next/image";
import "../../styles/other-inner.css";

const TOP_CARDS = [
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
    step: "Step One",
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

const BOTTOM_CARD = {
  step: "Step One",
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

export default function OtherInner() {
  return (
    <section className="oi-section">

      {/* Top row — two equal cards */}
      <div className="oi-top-row">
        {TOP_CARDS.map((card, i) => (
          <div key={i} className="oi-card">
            <div className="oi-card-header">
              <span className="oi-step">{card.step}</span>
              <h3 className="oi-title">{card.title}</h3>
            </div>
            <ul className="oi-list">
              {card.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom row — wide card with image */}
      <div className="oi-card oi-card--wide">
        <div className="oi-wide-left">
          <span className="oi-step">{BOTTOM_CARD.step}</span>
          <h3 className="oi-title">{BOTTOM_CARD.title}</h3>
          <ul className="oi-list">
            {BOTTOM_CARD.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="oi-wide-img">
          <Image
            src={BOTTOM_CARD.image}
            alt="Delivery Approach"
            fill
            className="oi-img"
          />
        </div>
      </div>

    </section>
  );
}
