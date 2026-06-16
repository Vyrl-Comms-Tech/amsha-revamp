import Image from "next/image";
import "../../styles/services-innerhero.css";

export default function ServiceInnerHero() {
  return (
    <div className="sih-outer">

      {/* ── Gray card ── */}
      <div className="sih-card">
        <div className="sih-content">
          <h1 className="sih-heading">People Advisory</h1>
          <p className="sih-desc">
            At Amsha Advisory, our People Advisory solutions are designed to help
            organisations strengthen their internal foundations through structured,
            practical, and people-centred support. We work closely with businesses
            to identify operational and organisational gaps that may be impacting
            efficiency, communication, leadership alignment, workplace culture, and
            overall performance.
          </p>
          <a href="#contact" className="sih-btn">Start work now</a>
        </div>
      </div>

      {/* ── Image — position: absolute relative to sih-outer,
           top: 0 / bottom: 0 → 100vh tall while card is 80vh
           → image overflows ~10vh above and below the card      ── */}
      <div className="sih-img-wrap">
        <Image
          src="/ab1.png"
          alt="People Advisory"
          fill
          className="sih-img"
        />
      </div>

    </div>
  );
}
