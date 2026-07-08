import "../../styles/contactHero.css";

export default function ContactHero() {
  return (
  <section className="contact-hero">
  <div className="contact-hero-inner">
    <div className="contact-left">
      <div className="contact-badge">
        <span></span>
        Available for New Projects
      </div>

      <h1>Contact Us</h1>

      <p className="contact-description">
        If your business is facing challenges with HR, employee development,
        or organizational efficiency, or if you’re seeking expert guidance on
        people strategies, we’re here to help. Drop your details below, and
        one of our experts will reach out.
      </p>

      <div className="contact-info-grid">
        <div className="contact-info-item">
          <span>Email</span>
          <a href="mailto:info@amshaadvisory.com">info@amshaadvisory.com</a>
        </div>

        <div className="contact-info-item">
          <span>Phone</span>
          <a href="tel:+971507569611">+971 50 756 9611</a>
          <a href="tel:+25575779111">+255 757 791 11</a>
        </div>
      </div>

      <div className="contact-location">
        <span>Location</span>
        <p>Office 1019 | Park Lane Tower | Business Bay | Dubai | UAE.</p>
      </div>
    </div>

    <div className="contact-form-card">
      <form>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" defaultValue="E. Alexander Vance" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" defaultValue="alexander@company.com" />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input type="text" defaultValue="Your Agency or Venture" />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea defaultValue="Tell us about your project goals and vision..." />
        </div>

        <button type="submit">
          Start Your Project <span>→</span>
        </button>

        <p className="response-note">We usually respond within 24 hours.</p>
      </form>
    </div>
  </div>
</section>
  );
}