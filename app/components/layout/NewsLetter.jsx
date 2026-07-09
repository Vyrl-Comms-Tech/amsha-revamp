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
          For those who want more from their business, there's Amsha. <br /> Get
          started today and never look back.
        </p>

        <button className="newsletter-btn">
          <Link href="/contact-us">Contact us</Link>
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
