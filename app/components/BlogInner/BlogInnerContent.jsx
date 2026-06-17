"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../styles/blog-inner-content.css";

const BlogInnerContent = ({ data, loading }) => {

  if (loading || !data) {
    return (
      <section className="bic-section">
        <article className="bic-article">
          <Skeleton height={28} width="55%" style={{ marginBottom: 16 }} />
          <Skeleton count={5} style={{ marginBottom: 10 }} />
          <Skeleton height={24} width="45%" style={{ marginTop: 36, marginBottom: 14 }} />
          <Skeleton count={6} style={{ marginBottom: 10 }} />
          <Skeleton height={24} width="50%" style={{ marginTop: 36, marginBottom: 14 }} />
          <Skeleton count={4} style={{ marginBottom: 10 }} />
        </article>
        <aside className="bic-sidebar">
          <div className="bic-card">
            <Skeleton height={36} width="80%" />
            <Skeleton count={2} style={{ marginBottom: 6 }} />
            <Skeleton height={48} />
            <Skeleton count={3} style={{ marginBottom: 6 }} />
            <Skeleton height={46} width={140} />
          </div>
        </aside>
      </section>
    );
  }

  return (
    <section className="bic-section">

      {/* ── Left: article body ── */}
      <article
        className="bic-article"
        dangerouslySetInnerHTML={{ __html: data.htmlFormat }}
      />

      {/* ── Right: newsletter sidebar ── */}
      <aside className="bic-sidebar">
        <div className="bic-card">
          <h3 className="bic-card-title">Easier HR For Your Inbox</h3>
          <p className="bic-card-sub">
            Get Resources, Tips, And Inspiration That Will Help You Save Time
            And Shine At Work.
          </p>
          <input
            className="bic-input"
            type="text"
            placeholder="Enter Your Company Name"
          />
          <p className="bic-disclaimer">
            By Providing My Email, I Authorize Amsha Advisory To Keep Me Informed
            About Its Products, Services And Events Through Email. My Data Will Be
            Handled According To The Privacy Notice.
          </p>
          <button className="bic-btn">Count Me In</button>
        </div>
      </aside>

    </section>
  );
};

export default BlogInnerContent;
