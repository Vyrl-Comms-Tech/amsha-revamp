"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const tabs = [1, 2, 3];

const BlogParentHeroSkeleton = () => {
  return (
    <div className="bph-wrapper">
      {/* Header Skeleton */}
      <div className="bph-header">
        <p>
          <Skeleton width={220} height={18} />
        </p>

        <h1>
          <Skeleton width={320} height={40} />
        </h1>

        <div className="bph-tabs">
          {tabs.map((i) => (
            <button key={i} className="bph-tab">
              <Skeleton width={70} height={30} />
            </button>
          ))}
        </div>
      </div>

      {/* Card Skeleton */}
      <div className="bph-card">
        {/* Image skeleton */}
        <div className="bph-image">
          <Skeleton height={260} />
        </div>

        {/* Content skeleton */}
        <div className="bph-content">
          <div className="bph-content-top">
            <h2>
              <Skeleton width={`80%`} height={28} />
            </h2>

            <p>
              <Skeleton count={4} />
            </p>
          </div>

          <button className="bph-btn">
            <Skeleton width={90} height={35} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogParentHeroSkeleton;