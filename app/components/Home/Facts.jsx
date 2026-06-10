"use client";
import Image from "next/image";
import "../../styles/Facts.css";

const Facts = () => {
  return (
    <div className="facts-wrapper">
    <section className="facts-section">

      {/* ── Center crystal/glass background image ── */}
      {/* <div className="facts-center-img-wrap">
        <Image
          src="/img1.png"
          alt=""
          fill
          className="facts-center-img"
        />
      </div> */}

      <div className="facts-boxes">

        {/* Box 1 — Facet5 */}
        <div className="facts-box">
          <div className="facts-box-head">
            <h2 className="facts-box-title">
              Facet5:
            </h2>
            <Image
              src="/img17.png"
              alt="MBTI"
              width={190}
              height={130}
              className="facts-mbti-logo"
            />
          </div>
          <p className="facts-box-text">
            Facet5 is a psychometric assessment tool that provides deeper insight
            into individual behaviour, personality, and workplace preferences,
            helping organisations strengthen hiring decisions, leadership
            development, team effectiveness, and employee growth.
          </p>
        </div>

        {/* Box 2 — MBTI with logo */}
        <div className="facts-box">
          <div className="facts-box-head">
            <h2 className="facts-box-title">
              MBTI® (Myers-Briggs<br />Type Indicator):
            </h2>
            <Image
              src="/img16.png"
              alt="MBTI"
              width={140}
              height={130}
              className="facts-mbti-logo"
            />
          </div>
          <p className="facts-box-text">
            The MBTI® assessment helps individuals and organisations better
            understand communication styles, decision-making approaches,
            leadership preferences, and team dynamics through personality-based
            insight and behavioural understanding.
           <br />
            For students and young professionals, the MBTI® Career Report also
            provides guidance on career preferences, strengths, work styles, and
            potential career paths aligned with their personality type and natural
            tendencies.
          </p>
        </div>

      </div>
    </section>
    </div>
  );
};

export default Facts;
