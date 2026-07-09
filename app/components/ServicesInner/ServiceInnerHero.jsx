"use client";
import Image from "next/image";
import "../../styles/services-innerhero.css";
import TextAnimation from "../layout/TextAnimation";
import { GlowDot } from "../layout/svg";

import Link from "next/link";

export default function ServiceInnerHero({
  heading = "People Advisory",
  desc = "At Amsha Advisory, our People Advisory solutions are designed to help organisations strengthen their internal foundations through structured, practical, and people-centred support.",
  image = "/ab1.png",
  btnText = "Start work now",
  bottomLogos,
}) {
  return (
    <div className="sih-outer">
      {/* ── Gray card ── */}
      <div className="sih-card">
        <div className="sih-content">
          <TextAnimation animateOnScroll={true} delay={0.3}>
            <h1 className="sih-heading">{heading}</h1>
          </TextAnimation>
          <div className="sih-desc" data-lenis-prevent>
            {desc
              .split(/\n{1,}/)
              .map((line) => line.trim())
              .filter(Boolean)
              .map((paragraph, i) => {
                const parts = paragraph.split(/\s*<br\s*\/?>\s*/i);
                return (
                  <TextAnimation key={i} animateOnScroll={false} delay={0.3}>
                    <p>
                      {parts.map((part, j) => (
                        <span key={j}>
                          {j > 0 && <br />}
                          {part}
                        </span>
                      ))}
                    </p>
                  </TextAnimation>
                );
              })}
          </div>
          <Link href="/contact-us" className="sih-btn btn-4">
            {btnText}
          </Link>
          {bottomLogos && bottomLogos.length > 0 && (
            <div className="sih-bottom-logos">
              {bottomLogos.map((logo, i) => (
                <div key={i} className="sih-bottom-logo">
                  <Image src={logo} alt="" width={140} height={60} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="th-right-glow">
        <GlowDot
          style={{ position: "absolute", left: "10%", top: "15%" }}
          delay={0}
        />
        <GlowDot
          style={{ position: "absolute", left: "30%", top: "45%" }}
          delay={0.7}
        />
        <GlowDot
          style={{ position: "absolute", left: "55%", top: "22%" }}
          delay={1.3}
        />
        <GlowDot
          style={{ position: "absolute", left: "72%", top: "60%" }}
          delay={0.4}
        />
        <GlowDot
          style={{ position: "absolute", left: "88%", top: "30%" }}
          delay={1.0}
        />
        <GlowDot
          style={{ position: "absolute", left: "45%", top: "75%" }}
          delay={1.6}
        />
        <GlowDot
          style={{ position: "absolute", left: "20%", top: "80%" }}
          delay={0.2}
        />
      </div>
      {/* ── Image ── */}
      {/* <div className="sih-img-wrap">
        <Image src={image} alt={heading} fill className="sih-img" />
      </div> */}
    </div>
  );
}
