"use client";
import Image from "next/image";
import "../../styles/Hero3.css";

const Hero3 = () => (
  <section className="hero3-section">
    {/* dimmed background image */}
    <div className="hero3-bg">
      <Image
        src="/img1.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "contain" }}
      />
    </div>

   
    {/* content */}
    <div className="hero3-content">
      <span className="hero3-label">About us</span>

      <p className="hero3-text">
        <span className="hero3-primary">
          Amsha Advisory was created with the vision of helping organisations
          navigate people-related challenges with greater clarity, strategy, and
          purpose. We partner{" "}
        </span>
        <span className="hero3-secondary">
          with businesses to strengthen workplace performance, develop leaders,
          improve team dynamics, and create environments where both people and
          organisations can grow sustainably
        </span>
      </p>
    </div>
  </section>
);

export default Hero3;
