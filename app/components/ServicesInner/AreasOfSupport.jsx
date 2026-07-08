"use client";

import "../../styles/support-areas.css";
import TextAnimation from "../layout/TextAnimation";

const DEFAULT_ITEMS = [
  {
    num: "01",
    title: "Organisational Structure & Workforce Planning",
    text: "Supporting businesses in creating clear structures, reporting lines, and workforce plans that strengthen operational efficiency and organisational growth.",
  },
  {
    num: "02",
    title: "Role Alignment & Job Design",
    text: "Helping organisations define responsibilities, expectations, and role clarity to improve accountability and team effectiveness.",
  },
  {
    num: "03",
    title: "SOP & Process Development",
    text: "Designing practical systems, workflows, and standard operating procedures that improve consistency and operational flow.",
  },
];

const DARK_COL = [0, 1, 2, 1, 0, 1];

const isDark = (i) => DARK_COL[Math.floor(i / 3) % DARK_COL.length] === i % 3;

export default function AreasOfSupport({
  heading = "Areas of Support",
  items = DEFAULT_ITEMS,
  showNewsletter = false,
  compact = false,
}) {
  return (
    <section className={`sa-section${compact ? " sa-section--compact" : ""}`}>
      <TextAnimation animateOnScroll={true} delay={0.3}>
        <h2 className="sa-heading">{heading}</h2>
      </TextAnimation>

      <div className="sa-grid">
        {items.map((item, i) => {
          const dark = isDark(i);
          const hasText = Boolean(item.text);
          const showAccordion = !compact && hasText;

          return (
            <div
              key={`${item.title}-${i}`}
              className={`sa-card${dark ? " sa-card--dark" : ""}${
                compact ? " sa-card--compact" : ""
              }`}
            >
              <div className="sa-card-top">
                <span className="sa-num">
                  {item.num || String(i + 1).padStart(2, "0")}
                </span>

                {showAccordion && <span className="sa-icon">+</span>}
              </div>

              <div className="sa-card-main">
                <h3 className="sa-title">{item.title}</h3>

                {showAccordion && (
                  <div className="sa-body">
                    <div className="sa-body-inner">
                      <p className="sa-text">{item.text}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showNewsletter && (
        <div className="sa-last-row">
          <div className="sa-newsletter">
            <TextAnimation animateOnScroll={true} delay={0.3}>
              <h3 className="sa-nl-heading">Easier HR For Your Inbox</h3>
            </TextAnimation>

            <TextAnimation animateOnScroll={true} delay={0.3}>
              <p className="sa-nl-sub">
                Get Resources, Tips, And Inspiration That Will Help You Save
                Time And Shine At Work.
              </p>
            </TextAnimation>

            <TextAnimation animateOnScroll={true} delay={0.3}>
              <p className="sa-nl-legal">
                By Providing My Email, I Authorize Amsha Advisory To Keep Me
                Informed About Its Products, Services And Events Through Email.
              </p>
            </TextAnimation>

            <div className="sa-nl-form">
              <input
                type="email"
                className="sa-nl-input"
                placeholder="Enter Your Email"
              />
              <button className="sa-nl-btn btn-4" type="button">
                Count Me In
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}