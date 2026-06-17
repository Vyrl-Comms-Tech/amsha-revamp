'use client'
import Image from "next/image";
import "../../styles/services-innerhero.css";
import TextAnimation from "../layout/TextAnimation";

export default function ServiceInnerHero({
  heading = "People Advisory",
  desc = "At Amsha Advisory, our People Advisory solutions are designed to help organisations strengthen their internal foundations through structured, practical, and people-centred support.",
  image = "/ab1.png",
  btnText = "Start work now",
  btnHref = "#contact",
}) {
  return (
    <div className="sih-outer">

      {/* ── Gray card ── */}
      <div className="sih-card">
        <div className="sih-content">
          <TextAnimation animateOnScroll={true} delay={0.3}>

            <h1 className="sih-heading">{heading}</h1>
          </TextAnimation>
          <TextAnimation animateOnScroll={true} delay={0.3}>


            <p className="sih-desc">{desc}</p>
          </TextAnimation>
          <a href={btnHref} className="sih-btn btn-4">{btnText}</a>
        </div>
      </div>

      {/* ── Image ── */}
      <div className="sih-img-wrap">
        <Image src={image} alt={heading} fill className="sih-img" />
      </div>

    </div>
  );
}
