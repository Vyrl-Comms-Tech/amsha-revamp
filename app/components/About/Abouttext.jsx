"use client";
import Image from "next/image";
import "../../styles/about-text.css";

const AboutText = () => (
  <section className="about-text">
  
   
    {/* content */}
    <div className="about-text-content">
      <span className="about-text-label">About us</span>

      <p className="about-text-text">
        <span className="about-text-primary">
          Amsha Advisory was created with the vision of helping organisations
          navigate people-related challenges with greater clarity, strategy, and
          purpose. We partner{" "}
        </span>
        <span className="about-text-secondary">
          with businesses to strengthen workplace performance, develop leaders,
          improve team dynamics, and create environments where both people and
          organisations can grow sustainably
        </span>
      </p>
    </div>
  </section>
);

export default AboutText;
