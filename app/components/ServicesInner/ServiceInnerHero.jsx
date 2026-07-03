'use client'
import Image from "next/image";
import "../../styles/services-innerhero.css";
import TextAnimation from "../layout/TextAnimation";
import Link from "next/link";

export default function ServiceInnerHero({
  heading = "People Advisory",
  desc = "At Amsha Advisory, our People Advisory solutions are designed to help organisations strengthen their internal foundations through structured, practical, and people-centred support.",
  image = "/ab1.png",
  btnText = "Start work now",
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
              .map((paragraph, i) => (
                <TextAnimation key={i} animateOnScroll={false} delay={0.3}>
                  <p>{paragraph}</p>
                </TextAnimation>
              ))}
          </div>
          <Link href="/contact-us" className="sih-btn btn-4">
            {btnText}
          </Link>
        </div>
      </div>

      {/* ── Image ── */}
      <div className="sih-img-wrap">
        <Image src={image} alt={heading} fill className="sih-img" />
      </div>

    </div>
  );
}
