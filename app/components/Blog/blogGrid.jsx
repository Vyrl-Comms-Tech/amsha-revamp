// 'use client'
// import Image from "next/image";
// import "../../styles/blog-grid.css";
// import TextAnimation from "../layout/TextAnimation";

// const posts = [
//   {
//     img: "/blog1.png",
//     badge: "BLOG",
//     title: "People Strategies for Startup Success",
//     desc: "Starting a blog can be a powerful way to grow your business. It helps you connect with your audience, share valuable insights, ...",
//   },
//   {
//     img: "/blog1.png",
//     badge: "BLOG",
//     title: "People Strategies for Startup Success",
//     desc: "Starting a blog can be a powerful way to grow your business. It helps you connect with your audience, share valuable insights, ...",
//   },
//   {
//     img: "/blog1.png",
//     badge: "BLOG",
//     title: "People Strategies for Startup Success",
//     desc: "Starting a blog can be a powerful way to grow your business. It helps you connect with your audience, share valuable insights, ...",
//   },
// ];

// const BlogGrid = () => {
//   return (
//     <section className="bg-section">
//       <div className="bg-header">
//         <TextAnimation animateOnScroll={true} delay={0.3}>


//           <p className="bg-label">People Strategies for Startup Success</p>
//         </TextAnimation>
//         <TextAnimation animateOnScroll={true} delay={0.3}>


//           <h2 className="bg-title">Blogs &amp; articles</h2>
//         </TextAnimation>
//       </div>

//       <div className="bg-grid">
//         {posts.map((post, i) => (
//           <article className="bg-card" key={i}>
//             <div className="bg-card-image">
//               <Image
//                 src={post.img}
//                 alt={post.title}
//                 fill
//                 className="bg-card-img"
//               />
//             </div>

//             <div className="bg-card-body">
//               <span className="bg-badge">{post.badge}</span>
//               <TextAnimation animateOnScroll={true} delay={0.3}>

//                 <h3 className="bg-card-title">{post.title}</h3>
//               </TextAnimation>
//               <TextAnimation animateOnScroll={true} delay={0.3}>


//                 <p className="bg-card-desc">{post.desc}</p>
//               </TextAnimation>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BlogGrid;





"use client";

import Image from "next/image";
import Link from "next/link";
import TextAnimation from "../layout/TextAnimation";
import "../../styles/blog-grid.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogGrid = ({ data, loading, activeTab }) => {
  return (
    <section className="bg-section">
      <div className="bg-header">
        <TextAnimation animateOnScroll delay={0.3}>
          <p className="bg-label">People Strategies for Startup Success</p>
        </TextAnimation>

        <TextAnimation animateOnScroll delay={0.3}>
          <h2 className="bg-title">Blogs & articles</h2>
        </TextAnimation>
      </div>

      <div className="bg-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div className="bg-card" key={i}>
                <div className="bg-card-image">
                  <Skeleton height="100%" style={{ display: "block" }} />
                </div>

                <div className="bg-card-body">
                  <span className="bg-badge">
                    <Skeleton width={60} height={16} />
                  </span>

                  <h3 className="bg-card-title">
                    <Skeleton width="80%" height={20} />
                  </h3>

                  <p className="bg-card-desc">
                    <Skeleton count={2} />
                  </p>
                </div>
              </div>
            ))
          : data?.map((post, i) => (
              <Link
                key={i}
                href={`/knowledge-hub/${activeTab}/${post?.slug}`}
                className="bg-card"
              >
                <div className="bg-card-image">
                  <Image
                    src={post?.mainImage?.url || "/blog1.png"}
                    alt={post?.mainTitle}
                    fill
                    className="bg-card-img"
                  />
                </div>

                <div className="bg-card-body">
                  <span className="bg-badge">{post?.category}</span>

                  <TextAnimation animateOnScroll={true} delay={0.3}><h3 className="bg-card-title">{post?.mainTitle}</h3></TextAnimation>

                  <TextAnimation animateOnScroll={true} delay={0.3}><p className="bg-card-desc">{post?.shortDescription}</p></TextAnimation>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
};

export default BlogGrid;

