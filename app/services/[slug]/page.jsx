import { notFound } from "next/navigation";
import ServiceInnerHero from "../../components/ServicesInner/ServiceInnerHero";
import FooterModel from "../../components/layout/FooterModel";
import ServiceOtherInner from "../../components/ServicesInner/ServiceOtherInner";

// ─────────────────────────────────────────────────────────────
// SERVICES DATA — update hero / topCards / bottomCard text here
// for each slug (steps 2 – 6).
// ─────────────────────────────────────────────────────────────
const SERVICES = {

  /* ── Step 2 ─────────────────────────────────────────────── */
  "employee-training-development": {
    hero: {
      heading: "Employee Training & Development",
      desc: `At Amsha Advisory, our training programs are designed to create practical workplace impact through behavioural, leadership, and professional development solutions tailored to organisational needs. 
      
      We focus on strengthening communication, leadership capability, workplace professionalism, team effectiveness, emotional intelligence, customer experience, and overall employee performance through interactive and scenario-based learning experiences.`,
     image: "/s9.jpg",
    },
    topCards: [
      {
        // step: "Step One",
        title: "Training Formats",
        bullets: [
          "Online Training Sessions",
          "In-Person Training Sessions",
          "Hybrid Training Solutions",
        ],
      },
      {
        // step: "Step Two",
        title: "Session Duration Options",
        bullets: [
          "2-Hour Sessions",
          "Half-Day Workshops",
          "Full-Day Workshops",
          "Multi-Day Training Programs",
          "Quarterly & Annual Development Programs",
        ],
      },
    ],
    bottomCard: {
      // step: "Step Three",
      title: "Delivery Approach",
      image: "/s10.jpg",
      bullets: [
        "Interactive & Scenario-Based Learning",
        "Role-Playing & Workplace Simulations",
        "Group Activities & Team Exercises",
        "Case Studies & Practical Discussions",
        "Leadership & Behavioural Development Activities",
        "Reflection & Self-Awareness Exercises",
        "Collaborative Learning Sessions",
        "Customised Organisational Training Solutions",
        "Post-Training Feedback & Development Support",
      ],
    },
  },

  /* ── Step 3 ─────────────────────────────────────────────── */
  "upskilling-training": {
    hero: {
      heading: "Upskilling & Training",
      desc: "At Amsha Advisory, our Upskilling & Training solutions are designed to provide personalised, practical, and goal-oriented development support tailored to individual professional needs. ",
      image: "/s9.jpg",
    },
    topCards: [
      {
        // step: "Step One",
        title: "Available Formats",
        bullets: [
          "Online 1:1 Sessions",
          "In-Person 1:1 Sessions",
          "Customized Development Programs",
          "Short-Term & Long-Term Learning Support",
        ],
      },
    ],
    bottomCard: {
      // step: "Step Three",
      title: "Delivery Approach",
      image: "/s10.jpg",
      bullets: [
        "Personalized Learning Plans",
        "Practical & Scenario-Based Learning",
        "Interactive Exercises & Discussions",
        "Goal-Oriented Development Support",
        "Continuous Guidance & Feedback",
        "Flexible Learning Structure",
      ],
    },
  },

  /* ── Step 4 ─────────────────────────────────────────────── */
  "entrepreneurial-consulting": {
    hero: {
      heading: "Entrepreneurial Consulting",
      desc: "At Amsha Advisory, our Entrepreneurial Consulting solutions are designed to support entrepreneurs, startups, and growing businesses in building stronger operational foundations, people structures, and long-term growth strategies.",
     image: "/s9.jpg",
    },
    topCards: [
      {
        // step: "Step One",
        title: "Consulting Formats",
        bullets: [
          "Online Consulting Sessions",
          "In-Person Consulting Sessions",
          "Ongoing Advisory Support",
          "Customised Business Support Programs",
        ],
      },
      {
        // step: "Step Two",
        title: "Our Approach",
        bullets: [
          "Practical & Growth-Oriented Guidance",
          "Personalised Business Support",
          "Strategic & People-Centred Solutions",
          "Flexible & Collaborative Consulting Approach",
          "Long-Term Development & Sustainability Focus",
        ],
      },
    ],
    bottomCard: {
      // step: "Step Three",
      title: "Areas of Support",
      image: "/s10.jpg",
      bullets: [
        "Startup & Business Growth Support",
        "Organisational Structure & Team Development",
        "Leadership & Founder Support",
        "Workplace Systems & Process Guidance",
        "Operational & People Strategy Support",
        "Team Alignment & Workplace Culture",
        "Employee Development & Performance Support",
        "Business Professionalism & Organisational Readiness",
        "Growth Planning & Organisational Scaling",
      ],
    },
  },

  /* ── Step 5 ─────────────────────────────────────────────── */
  "career-development": {
    hero: {
      heading: "Career Development",
      desc: "At Amsha Advisory, our Career Development solutions are designed to help individuals gain greater clarity, confidence, and direction in their professional journey.",
      image: "/s9.jpg",
    },
    topCards: [
      {
        // step: "Step One",
        title: "Areas of Support",
        bullets: [
          "Career Clarity & Direction",
          "Professional Growth Planning",
          "Workplace Readiness & Corporate Preparation",
          "Career Transition Support",
          "CV & Professional Profile Guidance",
          "Interview Preparation Support",
          "Communication & Professional Confidence Development",
          "Leadership & Personal Development",
          "Behavioural & Career Insight Support",
        ],
      },
      {
        // step: "Step Two",
        title: "Available Formats",
        bullets: [
          "Online 1:1 Sessions",
          "In-Person 1:1 Sessions",
          "Personalized Development Programs",
          "Short-Term & Long-Term Career Support",
        ],
      },
    ]
  },

  /* ── Step 6 ─────────────────────────────────────────────── */
  "talent-assessment": {
    hero: {
      heading: "Talent Assessment & Selection",
      desc: "At Amsha Advisory, our Talent Assessment & Selection solutions are designed to support organisations in making more informed, objective, and strategic hiring decisions.",
      image: "/s10.jpg",
    },
    topCards: [
      {
        // step: "Step One",
        title: "Assessment Methods",
        bullets: [
          "Psychometric Assessments",
          "Behavioural Evaluations",
          "Structured Interviews",
          "Scenario-Based Assessments",
          "Role-Playing Exercises",
          "Case Study Evaluations",
          "Group Activities & Discussions",
          "Communication & Leadership Assessments",
        ],
      },
      {
        // step: "Step Two",
        title: "Available Formats",
        bullets: [
          "Online Assessments & Evaluations",
          "In-Person Assessment Sessions",
          "Individual & Group Assessments",
          "Customized Assessment Solutions",
        ],
      },
    ],

    bottomCard1: {
      // step: "Step Three",
      title: "Psychometric Tools",
      content: [
        {
          heading: "MBTI® (Myers-Briggs Type Indicator)",
          paragraph: "Supporting insight into communication styles, personality preferences, decision-making approaches, and workplace dynamics.",
        },
        {
          heading: "Facet5 Personality Assessment",
          paragraph: "Providing behavioural insight into leadership style, motivation, communication, resilience, and workplace effectiveness.",
        },
      ],
    },
    bottomCard: {
      // step: "Step Four",
      title: "Areas of Support",
      image: "/s10.jpg",
      bullets: [
        "Candidate Assessment & Selection Support",
        "Behavioural & Personality Assessments",
        "Leadership Potential Identification",
        "Role Alignment & Suitability Analysis",
        "Team & Culture Fit Evaluation",
        "Communication & Workplace Effectiveness Assessment",
        "Talent Development & Succession Planning",
        "Structured Hiring & Evaluation Support",
      ]
    },
  },
};

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

// In Next.js 15+ params is a Promise — must be awaited
export default async function ServiceSlugPage({ params }) {
  const { slug } = await params;
  const data = SERVICES[slug];
  if (!data) notFound();

  return (
    <div>
      <FooterModel />
      <ServiceInnerHero
        heading={data.hero.heading}
        desc={data.hero.desc}
        image={data.hero.image}
      />
      <ServiceOtherInner
        topCards={data.topCards}
        bottomCard1={data.bottomCard1}
        bottomCard={data.bottomCard}
      />
    </div>
  );
}
