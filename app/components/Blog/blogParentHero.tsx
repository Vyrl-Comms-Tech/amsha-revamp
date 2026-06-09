"use client";
import { useState } from "react";
import Image from "next/image";
import "../../styles/blog-parent-hero.css";

const tabs = ["Blog", "Education", "News"];

const BlogParentHero = () => {
  const [activeTab, setActiveTab] = useState("Blog");

  return (
    <div className="bph-wrapper">
      {/* ── Header ── */}
      <div className="bph-header">
        <p className="bph-label">People Strategies for Startup Success</p>
        <h1 className="bph-title">Blogs &amp; articles</h1>

        <div className="bph-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`bph-tab ${activeTab === tab ? "bph-tab--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured card ── */}
      <div className="bph-card">
        <div className="bph-image">
          <Image
            src="/blog1.png"
            alt="People Strategies for Startup Success"
            fill
            className="bph-img"
          />
        </div>

        <div className="bph-content">
          <div className="bph-content-top">
            <h2 className="bph-card-title">
              People Strategies for Startup Success
            </h2>
            <p className="bph-card-desc">
              Starting a blog can be a powerful way to grow your business. It
              helps you connect with your audience, share valuable insights, and
              build your brand&apos;s credibility. Consistent, engaging content
              can attract new customers and keep existing ones coming back for
              more.
            </p>
          </div>

          <button className="bph-btn">View now</button>
        </div>
      </div>
    </div>
  );
};

export default BlogParentHero;
