import "../../styles/blog-inner-content.css";

const BlogInnerContent = () => {
  return (
    <section className="bic-section">

      {/* ── Left: article body ── */}
      <article className="bic-article">
        <p>
          Many organisations have culture documented. Far fewer have it lived.
        </p>
        <p>
          The gap between a value statement on a website and the actual experience
          of working somewhere is one of the most common and costly disconnects in
          modern business. Policies can define what an organisation stands for on
          paper. Culture is defined by what happens in meetings, how feedback is
          given, and how leaders behave when things go wrong.
        </p>
        <p>
          In a world where employees have more visibility into organisational
          behaviour than ever before, that gap is increasingly difficult to hide.
          People talk, compare experiences, and make career decisions accordingly.
        </p>
        <p>
          The organisations building genuinely strong cultures are not necessarily
          running bigger engagement programmes. They are being more intentional
          about the small, daily moments that either reinforce or quietly undermine
          what they say they believe.<br />
          A leader who acknowledges a mistake openly does more for culture than a
          policy document ever could.<br />
          A manager who makes time for a struggling team member sends a signal no
          handbook can replicate.
        </p>
        <p>
          Culture is not a project with a deadline. It is the accumulation of every
          interaction, every decision, and every moment where values are either
          honoured or quietly abandoned.
        </p>
        <p>
          At Amsha Advisory, we help organisations close the gap between the culture
          they describe and the one their people actually experience.
        </p>
      </article>

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
