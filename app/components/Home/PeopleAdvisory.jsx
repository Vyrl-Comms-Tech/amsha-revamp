import Image from "next/image";
import "../../styles/people-advisory.css";

export default function PoepleAdvisory() {
    return (
        <section className="hero-section-of-poeple-advisory">
            <div className="hero-heading">
                <h1>People Advisory</h1>
            </div>

            <div className="hero-image">
                <Image
                    src="/img13.gif"
                    alt="Hero Visual"
                    width={780}
                    height={800}
                    priority
                />
            </div>

            <div className="hero-number">
                <span>01</span>
            </div>

            <div className="hero-content">
                <p>
                    We create bold digital experiences that connect design, storytelling,
                    and performance into one seamless visual journey.
                </p>

                <button>Explore More</button>
            </div>
        </section>
    );
}