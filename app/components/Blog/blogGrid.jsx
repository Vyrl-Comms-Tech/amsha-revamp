import Image from "next/image";
import "../../styles/blog-grid.css";

const posts = [
  {
    img: "/blog1.png",
    badge: "BLOG",
    title: "People Strategies for Startup Success",
    desc: "Starting a blog can be a powerful way to grow your business. It helps you connect with your audience, share valuable insights, ...",
  },
  {
    img: "/blog1.png",
    badge: "BLOG",
    title: "People Strategies for Startup Success",
    desc: "Starting a blog can be a powerful way to grow your business. It helps you connect with your audience, share valuable insights, ...",
  },
  {
    img: "/blog1.png",
    badge: "BLOG",
    title: "People Strategies for Startup Success",
    desc: "Starting a blog can be a powerful way to grow your business. It helps you connect with your audience, share valuable insights, ...",
  },
];

const BlogGrid = () => {
  return (
    <section className="bg-section">
      <div className="bg-header">
        <p className="bg-label">People Strategies for Startup Success</p>
        <h2 className="bg-title">Blogs &amp; articles</h2>
      </div>

      <div className="bg-grid">
        {posts.map((post, i) => (
          <article className="bg-card" key={i}>
            <div className="bg-card-image">
              <Image
                src={post.img}
                alt={post.title}
                fill
                className="bg-card-img"
              />
            </div>

            <div className="bg-card-body">
              <span className="bg-badge">{post.badge}</span>
              <h3 className="bg-card-title">{post.title}</h3>
              <p className="bg-card-desc">{post.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogGrid;
