import React from "react";
import "../../styles/MissionVision.css";

const MissionVision = () => {
  return (
    <section className="mission-vision-section">
      <div className="mission-vision-container">
        <div className="mission-card">
          <h2>Our Mission</h2>
          <p>
            To empower businesses with customized people solutions that foster
            growth and drive long-term success.
          </p>
        </div>

        <div className="mission-card">
          <h2>Our Vision</h2>
          <p>
            To be a trusted partner in helping businesses optimize their people
            strategies, highlighting the essential role individuals play in
            achieving success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;