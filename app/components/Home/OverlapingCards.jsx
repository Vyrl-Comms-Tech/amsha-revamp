"use client";
import Image from "next/image";
import "../../styles/OverlapingCards.css";

const CARDS = [
  {
    logo: "/img3.png",
    company: "The St. Regis",
    subtitle: "Downtown Dubai",
    testimonial:
      '"Thank you for the Training Session. It was very informative. There were some techniques I would take, like Stress Origami. I have been folding away papers all this time. I believe that people need less stress in their lives, so this session is very beneficial. It would have been nicer if it had been a bit longer, but since we have a shorter time, maybe we can do a bit longer for the next session. Thank you."',
  },
  {
    logo: "/img4.png",
    company: "Bafleh",
    subtitle: "Jewellery LLC",
    testimonial:
      '"Amsha was great in facilitating and delivering our communication training. It was interactive and informative. I\'ve learned a lot that I can apply to daily work. Keep up the good work, Amsha. You\'re making our employees boost their confidence, which will reflect more in their productivity."',
  },
  {
    logo: "/img5.png",
    company: "Arakkal Gold and\nDiamonds LLC",
    subtitle: "",
    testimonial:
      '"Amsha was a fantastic facilitator. They made the workshop flow effortlessly. They exactly know what training we should conduct for my employees, which is the Well-being. I am confident that it will make a difference in helping our employees feel more connected and engaged."',
  },
];

const OverlapingCards = () => {
  return (

    <div className="p-oc">
      <section className="oc-section">
        {/* Background photo */}
        <Image
          src="/img11.jpg"
          alt=""
          fill
          className="oc-bg"
          priority
        />

        {/* Three cards */}
        <div className="oc-cards">
          {CARDS.map((card, i) => (
            <div key={i} className="oc-card">
              {/* Logo — top left */}
              <Image
                src={card.logo}
                alt={card.company}
                width={160}
                height={70}
                className="oc-card-logo"
              />

              {/* Content — bottom */}
              <div className="oc-card-content">
                {card.company.split("\n").map((line, j) => (
                  <h3 key={j} className="oc-card-company" style={{ marginBottom: 0 }}>
                    {line}
                  </h3>
                ))}
                {card.subtitle && (
                  <h3 className="oc-card-subtitle">{card.subtitle}</h3>
                )}
                <p className="oc-card-testimonial">{card.testimonial}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OverlapingCards;
