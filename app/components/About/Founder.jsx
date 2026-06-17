"use client";
import Image from "next/image";
import "../../styles/Founder.css";
import TextAnimation from "../layout/TextAnimation";

export default function Founder() {
    return (
        <section className="founder-section">
            <div className="founder-container">

                <div className="founder-left">
                    <TextAnimation animateOnScroll={true} delay={0.3}>
                        <h2 className="founder-heading">


                            Founder&rsquo;s Note:
                        </h2>
                    </TextAnimation>

                    <div className="founder-body">
                        <TextAnimation animateOnScroll={true} delay={0.3}>


                            <p>
                                As the founder of Amsha Advisory, I built this consultancy on a simple
                                belief: people are at the heart of every successful organisation. Behind
                                every business outcome are individuals, teams, leaders, and workplace
                                cultures shaping the way organisations grow, perform, and evolve.
                            </p>
                        </TextAnimation>
                        <TextAnimation animateOnScroll={true} delay={0.3}>

                        <p>
                            Amsha Advisory was created with the vision of helping organisations
                            navigate people-related challenges with greater clarity, strategy, and
                            purpose. Through people advisory, behavioural development, leadership
                            training, and psychometric insight, our goal is to help businesses build
                            stronger teams, healthier workplace cultures, and more sustainable
                            organisational growth.
                        </p>
                        </TextAnimation>
                        <TextAnimation animateOnScroll={true} delay={0.3}>

                        <p>
                            The name Amsha, meaning &ldquo;to awaken&rdquo; in Swahili, reflects
                            the essence of what this consultancy stands for: awakening potential
                            within individuals, teams, and organisations. With deep roots in
                            Tanzania, choosing this name was deeply personal to me. It represents
                            growth, resilience, empowerment, and the importance of staying connected
                            to purpose while building for the future.
                        </p>
                        </TextAnimation>

                        <TextAnimation animateOnScroll={true} delay={0.3}>

                        <p>
                            What began as a passion for supporting people and organisations has
                            evolved into a consultancy working across industries and regions,
                            partnering with businesses that understand the value of investing in
                            their people.
                        </p>
                        </TextAnimation>
                        <TextAnimation animateOnScroll={true} delay={0.3}>

                        <p>
                            As we continue to grow, our commitment remains the same: to create
                            meaningful impact by helping organisations strengthen the people behind
                            the business.
                        </p>
                        </TextAnimation>
                        <div className="founder-signature">
                        <TextAnimation animateOnScroll={true} delay={0.3}>

                            <p>
                                Thank you for being part of this journey with me.
                                </p>
                        </TextAnimation>
                        <TextAnimation animateOnScroll={true} delay={0.3}>

                            <p>Sincerely,</p>
                        </TextAnimation>
                        <TextAnimation animateOnScroll={true} delay={0.3}>

                            <p className="founder-name">Krittika Manek</p>
                        </TextAnimation>

                        <TextAnimation animateOnScroll={true} delay={0.3}>

                            <p className="founder-title">Founder &amp; CEO, Amsha Advisory</p>
                        </TextAnimation>
                        </div>
                    </div>
                </div>

                {/* <div className="founder-logo-wrap">
                    <Image
                        src="/logo.svg"
                        alt="Amsha Advisory"
                        width={90}
                        height={90}
                        className="founder-logo"
                    />
                </div> */}

                <div className="founder-right">
                    <Image
                        src="/founder2.png"
                        alt="Krittika Manek — Founder & CEO, Amsha Advisory"
                        fill
                        className="founder-photo"
                    />
                </div>

            </div>
        </section>
    );
}
