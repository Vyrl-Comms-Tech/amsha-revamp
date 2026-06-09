import Image from "next/image";
import "../../styles/blog-inner-hero.css";

const BlogInnerHero = () => {
  return (
    <section className="bih-section">

      {/* ── Top: badge, title, date ── */}
      <div className="bih-top">
        <span className="bih-badge">BLOG</span>
        <h1 className="bih-title">
          Culture Is Built Daily, Not in Policies
        </h1>
        <p className="bih-date">2026-05-15</p>
      </div>

      {/* ── Full-width hero image ── */}
      <div className="bih-image">
        <Image
          src="/blog1.png"
          alt="Culture Is Built Daily"
          fill
          className="bih-img"
          priority
        />
      </div>

    </section>
  );
};

export default BlogInnerHero;
