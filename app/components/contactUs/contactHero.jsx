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

      <a href="https://www.google.com/search?sca_esv=bde474a155d49021&sxsrf=AHTn8zoH-cgdnwaCI1dQf-a4JM8wKWLnlg:1746436294161&kgmid=/g/11yb4nt3zs&q=Amsha+Advisory+Human+Resource+Services&shndl=30&shem=lcuae,uaasie&source=sh/x/loc/uni/m1/1&kgs=53ee37db4460fb31" target="__blank">
        <p>Office 1019 | Park Lane Tower | Business Bay | Dubai | UAE.</p>
      </a>

      <a href="https://www.google.com/search?sca_esv=bde474a155d49021&sxsrf=AHTn8zqWtdp8aVWYbPwNJiadqpKh2lFdEA:1746436317453&kgmid=/g/11wvd4wtsy&q=Amsha+Advisory+Human+Resources&shndl=30&shem=lcuae,uaasie&source=sh/x/loc/uni/m1/1&kgs=7033619710dd52c4">
        <p>2nd floor | Office no 15 | Viva Towers | Ali Hassan Mwinyi Rd | Dar es Salaam | Tanzania.</p>
      </a>
      </div>
    </div>

    <div className="contact-form-card">
      <form>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="E. Alexander Vance" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="alexander@company.com" />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input type="text" placeholder="Your Agency or Venture" />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea placeholder="Tell us about your project goals and vision..." />
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