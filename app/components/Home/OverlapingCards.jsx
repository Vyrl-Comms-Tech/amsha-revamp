"use client";
import { useRef } from "react";
import Image from "next/image";
import "../../styles/OverlapingCards.css";
import TextAnimation from "../layout/TextAnimation";

const AVATARS = ["/over1.png", "/over1.png", "/over1.png", "/over1.png"];

const CARDS = [
  {
    logo: "/img40.png",
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
  {
    logo: "/img25.png",
    company: "Visiontech Systems",
    subtitle: "International LLC",
    testimonial:
      '"Amsha Team was great, excellent delivery and 100% expected output, post session we can feel the energy in team, with open discussion and findings of whats stopping them to connect and make workspace more friendly, healthy and stress free."',
  },
  {
    logo: "/img36.png",
    company: "Integrity Accounting",
    subtitle: "Services (IAS)",
    testimonial:
      '"Hi, The training was great! My employees enjoyed it very much. The trainer was professional, and you are too. We would like to have more in negotiation and closing deals. Overall, it was fun and interactive! Please send me pictures. Thank you."',
  },
  {
    logo: "/img33.png",
    company: "Kaykroo",
    subtitle: "",
    testimonial:
      '"The session was great. I felt like this is type of sessions that we should have in organizations, especially ours, quite often, because it reminds us that it\'s not just daily work that we need to keep going through every day. There\'s actual teamwork and synergy that needs to go into it as well, and it was very interactive. We have departments that usually don\'t interact face to face, so it was really beneficial for topics to discuss in the future."',
  },
  {
    logo: "/img39.png",
    company: "Bulldozer Group",
    subtitle: "",
    testimonial:
      '"The session was amazing. It was very insightful and helpful. I especially found the tips on managing emotions under stress and pressure to be practical. The trainer was very knowledgeable, and the interactive activities kept things engaging throughout. Great job to everyone involved!"',
  },
  {
    logo: "/img22.png",
    company: "Lala Darbar",
    subtitle: "",
    testimonial:
      '"We enjoyed the session very much. I can see that my staff had fun and learned a lot from the workshop. I know that this will result in more collaborative employees. Thank you."',
  },
  {
    logo: "/img38.png",
    company: "Syscom",
    subtitle: "Distributions",
    testimonial:
      '"I would like to extend our sincere appreciation to the Amsha Advisory team for delivering an outstanding session on \'Thriving in IT: Managing Stress & Preventing Burnout.\' The session was not only timely and relevant but also deeply engaging and thoughtfully delivered. Your ability to connect with our team, share real-world insights, and provide practical, easy-to-implement strategies left a lasting impact. This session went beyond typical corporate training — a heartfelt thank you to the Amsha Advisory team for your empathy, professionalism, and impactful delivery."',
  },
  {
    logo: "/img31.png",
    company: "Saturn Corporation",
    subtitle: "Ltd",
    testimonial:
      '"Thank you and the team for a job well done. We have had positive reviews on the training program from our staff. Everyone found the content both engaging and highly relevant to their roles, and they left feeling motivated and equipped with valuable skills. Kindly say a big \'Thank You\' to your team from us. We look forward to collaborating again in the future!"',
  },
  {
    logo: "/img20.png",
    company: "Vinmart",
    subtitle: "",
    testimonial:
      '"Thank you to the Amsha team for hosting the leadership training session for us. Like their name suggests, \'Amsha,\' they really awakened us with their activities. The session was engaging and insightful, and it gave us a fresh perspective on leadership and teamwork."',
  },
  {
    logo: "/img37.png",
    company: "Ultimate Finance",
    subtitle: "",
    testimonial:
      '"I\'ve been struggling so much to find a company that\'s affordable, that can give us practical knowledge and not theoretical. So I\'m very happy, because even before everyone else\'s feedback, I was already happy and excited for this. You gave us something so nice. I love the fact that you definitely did your homework, because you related your training to what we do. I\'m happy with the service you\'ve provided, and definitely you are forever a part of Ultimate Finance."',
  },
  {
    logo: "/img35.png",
    company: "I&M Bank",
    subtitle: "Tanzania Limited",
    testimonial:
      '"I\'ve had a good session that was hosted by Amsha Advisory, the training was on personal financial management and I found it very helpful and it taught me how to allocate and spend my money. I would recommend Amsha Advisory incase you need to learn about your finances or have any soft-skill development, from financial management to soft-skills, Amsha Advisory is a good consultant."',
  },
  {
    logo: "/img23.png",
    company: "Hive Pro",
    subtitle: "",
    testimonial:
      '"It was great! The workshop covered all the essential topics for effective communication, and I found it highly valuable for my professional development. All points were explained very clearly, and I appreciated the comprehensive coverage of the subject. I loved the way the trainer made everyone comfortable to share their thoughts and ensured that each participant had a chance to speak. Overall, the workshop was excellent and an experience I truly appreciated for both its clarity and impact."',
  },
];

const OverlapingCards = () => {
  const sliderRef = useRef(null);
  const drag = useRef({ active: false, startX: 0 });

  const getCardStep = () => {
    const el = sliderRef.current;
    const card = el.querySelector(".oc-card");
    if (!card) return el.offsetWidth;
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap) || 0;
    return card.offsetWidth + gap;
  };

  const snapTo = (index) => {
    const el = sliderRef.current;
    const step = getCardStep();
    el.scrollTo({ left: index * step, behavior: "smooth" });
  };

  const currentIndex = () => {
    const el = sliderRef.current;
    const step = getCardStep();
    return Math.round(el.scrollLeft / step);
  };

  const onMouseDown = (e) => {
    drag.current = { active: true, startX: e.pageX };
    sliderRef.current.style.cursor = "grabbing";
  };

  const getMaxIndex = () => {
    const el = sliderRef.current;
    const visibleCount = Math.round(el.offsetWidth / getCardStep()) || 1;
    return Math.max(CARDS.length - visibleCount, 0);
  };

  const onMouseUp = (e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    sliderRef.current.style.cursor = "grab";
    const dx = e.pageX - drag.current.startX;
    const idx = currentIndex();
    const maxIndex = getMaxIndex();
    if (dx < -40) snapTo(Math.min(idx + 1, maxIndex));
    else if (dx > 40) snapTo(Math.max(idx - 1, 0));
    else snapTo(idx);
  };

  const goPrev = () => snapTo(Math.max(currentIndex() - 1, 0));
  const goNext = () => snapTo(Math.min(currentIndex() + 1, getMaxIndex()));

  return (
    <div className="p-oc">
      <section className="oc-section">
        <div className="oc-bg-wrap">
          <img src="/bg2.png" alt=""  className="oc-bg"  />
        </div>

        <button
          type="button"
          className="oc-arrow oc-arrow-left"
          aria-label="Previous testimonials"
          onClick={goPrev}
        >
          &#8592;
        </button>
        <button
          type="button"
          className="oc-arrow oc-arrow-right"
          aria-label="Next testimonials"
          onClick={goNext}
        >
          &#8594;
        </button>

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
