
import React from "react";
import "../../styles/newsletter.css";
import Link from "next/link";

const Newsletter = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-card">
        <h2>
          Your next step with <br />
          Amsha Advisory
        </h2>

        <p>
          Facet5 is a psychometric assessment tool that provides deeper insight
          into individual behaviour, personality, and workplace preferences,
          helping organisations strengthen hiring decisions, leadership
          development, team effectiveness, and employee growth.
        </p>

        <button className="newsletter-btn">
            <Link href='/contact-us'>
            Contact us
            </Link>
            </button>
      </div>
    </section>
  );
};

export default Newsletter;