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
      desc: "Behavioural, leadership, and professional development training designed for practical workplace impact — strengthening communication, leadership capability, professionalism, team effectiveness, emotional intelligence, customer experience, and overall employee performance through interactive, scenario-based learning customised to your organisation's industry, teams, and objectives.",
      image: "/ab1.png",
    },
    topCards: [
      {
        step: "Step One",
        title: "Training Formats",
        bullets: [
          "Online Training Sessions",
          "In-Person Training Sessions",
          "Hybrid Training Solutions",
        ],
      },
      {
        step: "Step Two",
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
      step: "Step Three",
      title: "Delivery Approach",
      image: "/ab1.png",
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
      desc: "Personalised, practical, and goal-oriented 1:1 development support — tailored to each individual's professional goals, current skill level, and desired growth outcomes, starting with a complimentary 15-minute discovery call.",
      image: "/ab1.png",
    },
    topCards: [
      {
        step: "Step One",
        title: "Available Formats",
        bullets: [
          "Online 1:1 Sessions",
          "In-Person 1:1 Sessions",
          "Customized Development Programs",
          "Short-Term & Long-Term Learning Support",
        ],
      },
      {
        step: "Step Two",
        title: "How It Works",
        bullets: [
          "Complimentary 15-Minute Discovery Call",
          "Personalised 1:1 Training & Development Support",
          "Tailored to Individual Goals & Skill Level",
          "Focused, Flexible & Practical Learning Experience",
        ],
      },
    ],
    bottomCard: {
      step: "Step Three",
      title: "Delivery Approach",
      image: "/ab1.png",
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
      desc: "Practical, people-centred consulting that helps entrepreneurs, startups, and growing businesses build stronger operational foundations, leadership capability, and sustainable growth strategies tailored to the stage and needs of the business.",
      image: "/ab1.png",
    },
    topCards: [
      {
        step: "Step One",
        title: "Consulting Formats",
        bullets: [
          "Online Consulting Sessions",
          "In-Person Consulting Sessions",
          "Ongoing Advisory Support",
          "Customised Business Support Programs",
        ],
      },
      {
        step: "Step Two",
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
      step: "Step Three",
      title: "Areas of Support",
      image: "/ab1.png",
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
      desc: "Personalised guidance that helps individuals identify their strengths, clarify career direction, and support long-term professional growth and workplace performance.",
      image: "/ab1.png",
    },
    topCards: [
      {
        step: "Step One",
        title: "Development Focus Areas",
        bullets: [
          "Career Direction & Clarity",
          "Professional Strengths Identification",
          "Goal Setting & Action Planning",
        ],
      },
      {
        step: "Step Two",
        title: "Who We Support",
        bullets: [
          "Early-Career Professionals",
          "Mid-Career Individuals",
          "Career Changers",
          "Leaders & Senior Professionals",
          "Returning Workforce Individuals",
        ],
      },
    ],
    bottomCard: {
      step: "Step Three",
      title: "Our Process",
      image: "/ab1.png",
      bullets: [
        "Individual Assessment & Discovery",
        "Strengths & Values Exploration",
        "Career Vision & Direction Setting",
        "Skills & Capability Gap Review",
        "Personalised Development Planning",
        "Practical Action Steps & Milestones",
        "Accountability & Progress Check-Ins",
        "Workplace Confidence Building",
        "Long-Term Career Growth Support",
      ],
    },
  },

  /* ── Step 6 ─────────────────────────────────────────────── */
  "talent-assessment": {
    hero: {
      heading: "Talent Assessment & Selection",
      desc: "Structured, evidence-based assessments that evaluate behavioural fit, communication style, leadership potential, and cultural alignment — helping organisations make more informed, objective, and strategic hiring decisions.",
      image: "/ab1.png",
    },
    topCards: [
      {
        step: "Step One",
        title: "Assessment Methods & Tools",
        bullets: [
          "Psychometric Assessments",
          "Behavioural Evaluations",
          "Structured Interviews",
          "Scenario-Based Assessments",
          "Role-Playing Exercises",
          "Case Study Evaluations",
          "Group Activities & Discussions",
          "Communication & Leadership Assessments",
          "MBTI® (Myers-Briggs Type Indicator)",
          "Facet5 Personality Assessment",
        ],
      },
      {
        step: "Step Two",
        title: "Available Formats",
        bullets: [
          "Online Assessments & Evaluations",
          "In-Person Assessment Sessions",
          "Individual & Group Assessments",
          "Customized Assessment Solutions",
        ],
      },
    ],
    bottomCard: {
      step: "Step Three",
      title: "Areas of Support",
      image: "/ab1.png",
      bullets: [
        "Candidate Assessment & Selection Support",
        "Behavioural & Personality Assessments",
        "Leadership Potential Identification",
        "Role Alignment & Suitability Analysis",
        "Team & Culture Fit Evaluation",
        "Communication & Workplace Effectiveness Assessment",
        "Talent Development & Succession Insight",
        "Structured Hiring & Evaluation Support",
      ],
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
        bottomCard={data.bottomCard}
      />
    </div>
  );
}
