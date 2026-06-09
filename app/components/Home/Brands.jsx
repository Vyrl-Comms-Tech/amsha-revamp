"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "../../styles/Brands.css";

const LOGOS = [
  "/img2.png", "/img3.png", "/img4.png", "/img5.png", "/img6.png",
  "/img2.png", "/img8.png", "/img9.png", "/img10.png",
  "/img2.png", "/img3.png", "/img4.png", "/img5.png", "/img6.png",
  "/img2.png", "/img8.png", "/img9.png", "/img10.png",
];

const OUTER_R = 650;
const INNER_R = 470;

// Place logos at equal angles around a circle of radius R
function buildSlots(R, offsetDeg = 0) {
  return LOGOS.map((src, i) => {
    const angle = (i / LOGOS.length) * 360 + offsetDeg;
    const rad = (angle * Math.PI) / 180;
    return {
      src,
      angle,
      x: R + R * Math.sin(rad) - 70,  // centre logo horizontally  (70 = half of 140)
      y: R - R * Math.cos(rad) - 35,  // centre logo vertically     (35 = half of 70)
    };
  });
}

const outerSlots = buildSlots(OUTER_R, 0);
const innerSlots = buildSlots(INNER_R, 20); // offset so rows interleave

const Brands = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    // Rotate around the ring centre (50% 50% of the 2R x 2R div = circle centre)
    gsap.set([outerRef.current, innerRef.current], { transformOrigin: "50% 50%" });

    gsap.to(outerRef.current, {
      duration: 20,
      ease: "none",
      rotation: "+=360",
      repeat: -1,
    });

    gsap.to(innerRef.current, {
      duration: 15,
      ease: "none",
      rotation: "-=360",
      repeat: -1,
    });
  }, []);

  const ringStyle = (R) => ({
    position: "absolute",
    width: R * 2,
    height: R * 2,
    marginLeft: -R,
    marginTop: -R,
  });

  return (
    <section className="brands-section">
      <div className="brands-title">
        <h2 className="brands-heading">Brands We&apos;ve</h2>
        <h2 className="brands-sub">Worked With</h2>
      </div>

      {/* Mobile straight marquee */}
      <div className="brands-mobile-marquee">
        <div className="brands-mobile-track">
          {[...LOGOS, ...LOGOS].map((src, i) => (
            <Image key={i} src={src} alt="" width={120} height={60} className="brand-img" />
          ))}
        </div>
      </div>

      {/* Anchor point = circle centre (left 50%, top 700px from section top) */}
      <div className="brands-center">

        {/* Outer ring */}
        <div ref={outerRef} style={ringStyle(OUTER_R)}>
          {outerSlots.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: s.x,
                top: s.y,
                transform: `rotate(${s.angle}deg)`,
              }}
            >
              <Image src={s.src} alt="" width={140} height={70} className="brand-img" />
            </div>
          ))}
        </div>

        {/* Inner ring */}
        <div id='inner-ring' ref={innerRef} style={ringStyle(INNER_R)}>
          {innerSlots.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: s.x,
                top: s.y,
                transform: `rotate(${s.angle}deg)`,
              }}
            >
              <Image src={s.src} alt="" width={140} height={70} className="brand-img" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Brands;
