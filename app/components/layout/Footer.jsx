"use client";
import Link from "next/link";
import "../../styles/Footer.css";
import { GlowDot } from "../layout/svg";

const FOOTER_COLUMNS = [
  {
    title: "Quick links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Blogs", href: "/blogs" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Training topics", href: "/training" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "People Advisory", href: "/services/people-advisory" },
      {
        label: "Employee Training & Development",
        href: "/services/employee-training-development",
      },
      { label: "Upskilling & Training", href: "/services/upskilling-training" },
      {
        label: "Entrepreneurial Consulting",
        href: "/services/entrepreneurial-consulting",
      },
      { label: "Career Development", href: "/services/career-development" },
    ],
  },
  {
    title: "Social media",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/amshaadvisory/?hl=en",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/p/Amsha-Advisory-61566437109181/",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/amshaadvisory/",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* ── Left column ── */}
        <div className="footer-left">
          <h2 className="footer-heading">LETS GET IN TOUCH</h2>
          <div className="button-and-para">
            <button className="footer-cta btn-4">
              <Link href="/contact-us">Contact us</Link>
            </button>
            <p className="footer-sub">
              For those who want more from their business, there&apos;s Amsha.
              Get started today and never look back.
            </p>
          </div>

          <div className="footer-links">
            {FOOTER_COLUMNS.map((col) => (
              <div className="footer-col" key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>{link.label}</Link>
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
            <p className="footer-copyright">© 2026 All Rights Reserved</p>
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
        />{" "}
        <GlowDot
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
