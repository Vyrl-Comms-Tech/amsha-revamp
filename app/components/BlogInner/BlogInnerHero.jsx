"use client";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../styles/blog-inner-hero.css";
import TextAnimation from "../layout/TextAnimation";
const BlogInnerHero = ({ data, loading }) => {

  if (loading || !data) {
    return (
      <section className="bih-section">
        <div className="bih-top">
          <Skeleton width={120} height={30} borderRadius={5} />
          <Skeleton width={400} height={40} style={{ maxWidth: 950 }} />
          <Skeleton width={160} height={18} />
        </div>
        <div className="bih-image">
          <Skeleton style={{ position: "absolute", inset: 0, height: "90%" }} />
        </div>
      </section>
    );
  }

  return (
    <section className="bih-section">
      {/* ── Top: badge, title, date ── */}
      <div className="bih-top">
        <span className="bih-badge">{data?.category}</span>
        <TextAnimation animateOnScroll delay={0.3}>
        <h1 className="bih-title">
          {data?.mainTitle}
        </h1>
        </TextAnimation>

        <TextAnimation>
        <p className="bih-date">
          {data?.publishDate ? new Date(data.publishDate).toDateString() : ""}
        </p>
        </TextAnimation>
      </div>

      {/* ── Full-width hero image ── */}
      <div className="bih-image">
        <Image
          src={data.mainImage?.url || "/blog1.png"}
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
