"use client";
import { useState } from "react";
import Image from "next/image";
import "../../styles/blog-parent-hero.css";
import TextAnimation from "../layout/TextAnimation";

const tabs = ["Blog", "Education", "News"];

const BlogParentHero = () => {
  const [activeTab, setActiveTab] = useState("Blog");

  return (
    <div className="bph-wrapper">
      {/* ── Header ── */}
      <div className="bph-header">
        <TextAnimation animateOnScroll={true} delay={0.3}>


          <p className="bph-label">People Strategies for Startup Success</p>
        </TextAnimation>
        <TextAnimation animateOnScroll={true} delay={0.3}>


          <h1 className="bph-title">Blogs &amp; articles</h1>
        </TextAnimation>

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
            <TextAnimation animateOnScroll={true} delay={0.3}>


              <h2 className="bph-card-title">
                 Strategies for Startup Success
              </h2>
            </TextAnimation>


            <TextAnimation animateOnScroll={true} delay={0.3}>
              <p className="bph-card-desc">
                Starting a blog can be a powerful way to grow your business. It
                helps you connect with your audience, share valuable insights, and
                build your brand&apos;s credibility. Consistent, engaging content
                can attract new customers and keep existing ones coming back for
                more.
              </p>
            </TextAnimation>
          </div>

          <button className="bph-btn btn-4">View now</button>
        </div>
      </div>
    </div>
  );
};

export default BlogParentHero;
