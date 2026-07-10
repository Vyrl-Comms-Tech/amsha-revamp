"use client";
import { useState } from "react";
import "../../styles/people-advisory.css";
import Multiple3d from "../layout/Multiple3d";
import TextAnimation from "../layout/TextAnimation";

const SLIDES = [
  {
    heading: "People Advisory",
    number: "01",
    text: "Strategic organisational support designed to strengthen workplace structure, improve role clarity, enhance operational efficiency, and support overall organisational performance.",
    href: "/services/people-advisory",
  },
  {
    heading: "Employee Training & Development",
    number: "02",
    text: "Interactive and practical training programs focused on improving workplace performance, leadership capability, and team effectiveness.",
    href: "/services/employee-training-development",
  },
  {
    heading: "Upskilling & Training",
    number: "03",
    text: "Targeted development programs that help individuals strengthen professional skills and adapt to evolving workplace demands.",
    href: "/services/upskilling-training",
  },
  {
    heading: "Entrepreneurial Consulting",
    number: "04",
    text: "Business support solutions designed to help entrepreneurs build stronger foundations, improve operations, and scale sustainably.",
    href: "/services/entrepreneurial-consulting",
  },
  {
    heading: "Career Development",
    number: "05",
    text: " Personalised guidance that helps individuals identify their strengths, clarify career direction, and support long-term professional growth .",
    href: "/services/career-development",
  },
  {
    heading: "Talent Assessment",
    number: "06",
    text: "Behavioural and assessment-based solutions that support informed hiring, development, and organisational decision-making.",
    href: "/services/talent-assessment",
  },
];

function ArrowIcon({ direction }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction === "prev" ? "M11 3.5L5 9l6 5.5" : "M7 3.5l6 5.5-6 5.5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PeopleAdvisory() {
  const [slide, setSlide] = useState(0);

  const goPrev = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setSlide((s) => (s + 1) % SLIDES.length);

  const { heading, number, text, href } = SLIDES[slide];

  return (
    <div className="pa-scroll-wrapper">
      <section className="hero-section-of-poeple-advisory">
        <div className="hero-heading">
          <TextAnimation animateOnScroll delay={0.15}>
            <h1>Services</h1>
          </TextAnimation>
        </div>

        <div className="hero-heading-right">
          <TextAnimation
            key={`h-${slide}`}
            animateOnScroll={false}
            delay={0.15}
          >
            <h1>{heading}</h1>
          </TextAnimation>
        </div>

        <div className="hero-image">
          <Multiple3d embed targetIndex={slide} />
        </div>

        <div className="hero-number">
          <TextAnimation
            key={`n-${slide}`}
            animateOnScroll={false}
            delay={0.15}
          >
            <span>{number}</span>
          </TextAnimation>
        </div>

        <div className="hero-content">
          <div className="hero-arrows">
            <button
              type="button"
              className="hero-arrow-btn"
              aria-label="Previous service"
              onClick={goPrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="27"
                viewBox="0 0 28 27"
                fill="none"
              >
                <path
                  d="M27 13.5L1 13.5M13.2778 26L1 13.5L13.2778 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="hero-arrow-btn"
              aria-label="Next service"
              onClick={goNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="27"
                viewBox="0 0 28 27"
                fill="none"
              >
                <path
                  d="M1 13.5L27 13.5M14.7222 26L27 13.5L14.7222 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <TextAnimation
            key={`p-${slide}`}
            animateOnScroll={false}
            delay={0.15}
          >
            <p>{text}</p>
          </TextAnimation>
          <button className="btn-4">
            <a href={href}>
              {" "}
              <span>Explore More</span>
            </a>
          </button>
        </div>
      </section>
    </div>
  );
}
