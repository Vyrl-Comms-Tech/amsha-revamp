"use client";
import "../../styles/Footer.css";
import { GlowDot } from "../layout/svg";

const QUICK_LINKS = [
  "HR Overview",
  "Recruitment",
  "Employee Relations",
  "Benefits Administration",
  "HR Settings",
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* ── Left column ── */}
        <div className="footer-left">
          <h2 className="footer-heading">LETS GET IN TOUCH</h2>
          <div className="button-and-para">
            <button className="footer-cta">Contact us</button>
            <p className="footer-sub">
              For those who want more from their business, there&apos;s Amsha.
              Get started today and never look back.
            </p>
          </div>

          <div className="footer-links">
            {[0, 1, 2].map((col) => (
              <div className="footer-col" key={col}>
                <h4>Quick links</h4>
                <ul>
                  {QUICK_LINKS.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column — 3D model + legal ── */}
        <div className="footer-right">
          <div className="footer-canvas" />

          <div className="footer-bottom">
            <p className="footer-copyright">© 2021 All Rights Reserved</p>
            <nav className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Legal</a>
            </nav>
          </div>
        </div>
      </div>
      {/* ── Bottom glow strip ── */}
      <div className="footer-glow">
        <GlowDot
          style={{ position: "absolute", left: "5%", top: "22%" }}
          delay={0}
        />
        <GlowDot
          style={{ position: "absolute", left: "20%", top: "58%" }}
          delay={0.8}
        />
        <GlowDot
          style={{ position: "absolute", left: "35%", top: "28%" }}
          delay={1.4}
        />
        <GlowDot
          style={{ position: "absolute", left: "50%", top: "65%" }}
          delay={0.5}
        />
        <GlowDot
          style={{ position: "absolute", left: "65%", top: "20%" }}
          delay={1.1}
        />
        <GlowDot
          style={{ position: "absolute", left: "80%", top: "50%" }}
          delay={0.3}
        />
        <GlowDot
          style={{ position: "absolute", left: "93%", top: "35%" }}
          delay={1.7}
        /> <GlowDot
          style={{ position: "absolute", left: "40%", top: "65%" }}
          delay={0.5}
        />
        <GlowDot
          style={{ position: "absolute", left: "55%", top: "20%" }}
          delay={1.1}
        />
        <GlowDot
          style={{ position: "absolute", left: "70%", top: "50%" }}
          delay={0.3}
        />
        <GlowDot
          style={{ position: "absolute", left: "43%", top: "35%" }}
          delay={1.7}
        />
      </div>
    </footer>
  );
};

export default Footer;
