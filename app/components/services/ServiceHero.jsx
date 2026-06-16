"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../Home/Scene";
import "../../styles/service-hero.css";

// Change x / y / z here (degrees) to rotate the model to any pose.
// x = pitch (tilt forward/back)   y = yaw (spin left/right)   z = roll (tilt sideways)
const MODEL_ANGLE = { x: -10, y: 450, z: 18 };

const ServiceHero = () => {
  return (
    <>
      <section className="sh-section">
        <div className="sh-left">
          <h1 className="sh-heading">Our Services</h1>
          <p className="sh-desc">
            At Amsha Advisory, our People Advisory solutions are designed to help
            organisations strengthen their internal foundations through structured,
            practical, and people-centred support. We work closely with businesses
            to identify operational and organisational gaps that may be impacting
            efficiency, communication, leadership alignment, workplace culture, and
            overall performance.
          </p>
          <p className="sh-desc">
            Our approach goes beyond traditional HR support by focusing on how
            organisations function in practice, from structure and communication
            flow to accountability, operational processes, and employee experience.
            We create tailored solutions that support healthier workplace
            environments, stronger organisational performance, and long-term
            business sustainability.
          </p>
          <button className="sh-btn">Contact us</button>
        </div>
      </section>

      {/* Fixed canvas on the right half — same model as the rest of the site */}
      <div className="sh-canvas-wrapper">
        <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
          <Suspense fallback={null}>
            <Scene overrideRotation={MODEL_ANGLE} progress2={0} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default ServiceHero;
