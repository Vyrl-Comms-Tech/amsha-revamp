"use client";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import TextAnimation from "../layout/TextAnimation";
import "../../styles/blog-parent-hero.css";
import Link from "next/link";
const tabs = ["blog", "education", "news"];

const BlogParentHero = ({ data, loading, activeTab, setActiveTab }) => {
  const featured = data?.[0];
  
  return (
    <div className="bph-wrapper">
      <div className="bph-header">
        <TextAnimation animateOnScroll delay={0.3}>
          <p className="bph-label">People Strategies for Startup Success</p>
        </TextAnimation>

        <TextAnimation animateOnScroll delay={0.3}>
          <h1 className="bph-title">Blogs & articles</h1>
        </TextAnimation>

        <div className="bph-tabs ">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`bph-tab btn-4 ${activeTab === tab ? "bph-tab--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bph-card">
          <div className="bph-image">
            <Skeleton height={550} />
          </div>
          <div className="bph-content">
            <div className="bph-content-top">
            <Skeleton width="80%" height={30} />
            <Skeleton count={5} />
            </div>
            <Skeleton width={160} height={50} />
          </div>
        </div>
      ) : (
        featured && (
          <div className="bph-card">
            <div className="bph-image">
              <Image
                src={featured?.mainImage?.url || "/blog1.png"}
                alt={featured?.mainTitle || "blog"}
                fill
                className="bph-img"
              />
            </div>
            <div className="bph-content">
              <div className="bph-content-top">
                <h2 className="bph-card-title">{featured?.mainTitle}</h2>
                <p className="bph-card-desc">{featured?.shortDescription}</p>
              </div>
                
              <Link href={`/blogs/${featured.category}/${featured?.slug}`}  className="bph-btn btn-4">View now</Link>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default BlogParentHero;