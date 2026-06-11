"use client";
import "../../styles/Footer.css";

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
          <h1 className="footer-heading">LETS GET IN TOUCH</h1>
<div className="button-and-para">

          <button className="footer-cta">Contact us</button>
          <p className="footer-sub">
            For those who want more from their business, there&apos;s
            Amsha. Get started today and never look back.
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
    </footer>
  );
};

export default Footer;
