"use client";
import Image from "next/image";
import "../../styles/Hero2.css";

const Corner = ({ pos }) => <span className={`bracket bracket-${pos}`} />;

const StatBox = ({ className }) => (
  <div className={`stat-box ${className}`}>
    <Corner pos="tl" />
    <Corner pos="tr" />
    <Corner pos="bl" />
    <Corner pos="br" />
    <div className="stat-content">
      <span className="stat-number">Sustainability</span>
      <span className="stat-label">We create people solutions designed to support long-term organisational growth, stability, and workplace success</span>
    </div>
  </div>
);

const Hero2 = () => (
  <section className="hero2-section">
    <div className="hero2-image-wrapper">
      <Image
        src="/img1.png"
        alt=""
        fill
        className="hero2-img"
        style={{ objectFit: "contain" }}
      />
    </div>

    <StatBox className="box-1" />
    <StatBox className="box-2" />
    {/* <StatBox className="box-3" />
    <StatBox className="box-4" /> */}
    <StatBox className="box-5" />

    <p className="hero2-desc">
      Amsha Advisory delivers strategic, people-centric solutions that enhance
      business efficiency, drive growth, and foster positive workplace cultures.
      We bridge traditional HR gaps with innovative approaches for long-term
      success.
    </p>
  </section>
);

export default Hero2;
