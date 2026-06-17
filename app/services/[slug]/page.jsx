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
      desc: "Interactive and practical training programs focused on improving workplace performance, leadership capability, and team effectiveness across all levels of your organisation.",
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
      desc: "Targeted development programs that help individuals strengthen professional skills and adapt to evolving workplace demands, building capability across teams and functions.",
      image: "/ab1.png",
    },
    topCards: [
      {
        step: "Step One",
        title: "Program Types",
        bullets: [
          "Professional Skills Development",
          "Technical Capability Building",
          "Leadership & Management Skills",
        ],
      },
      {
        step: "Step Two",
        title: "Target Audience",
        bullets: [
          "Individual Contributors",
          "Team Leaders & Supervisors",
          "Mid-Level Managers",
          "Senior Leadership Teams",
          "Cross-Functional Teams",
        ],
      },
    ],
    bottomCard: {
      step: "Step Three",
      title: "Our Approach",
      image: "/ab1.png",
      bullets: [
        "Needs-Based Program Design",
        "Practical Skills Application",
        "Workplace-Relevant Learning Activities",
        "Peer Learning & Collaboration",
        "Strengths-Based Development",
        "Self-Directed Learning Support",
        "Feedback & Reflection Sessions",
        "Progress Tracking & Accountability",
        "Ongoing Development Planning",
      ],
    },
  },

  /* ── Step 4 ─────────────────────────────────────────────── */
  "entrepreneurial-consulting": {
    hero: {
      heading: "Entrepreneurial Consulting",
      desc: "Business support solutions designed to help entrepreneurs build stronger foundations, improve operations, and scale sustainably with strategic people and organisational guidance.",
      image: "/ab1.png",
    },
    topCards: [
      {
        step: "Step One",
        title: "Business Areas",
        bullets: [
          "Organisational Foundation Building",
          "People & Operations Strategy",
          "Business Process Improvement",
        ],
      },
      {
        step: "Step Two",
        title: "Support Types",
        bullets: [
          "One-to-One Advisory Sessions",
          "Business Diagnostic Reviews",
          "Strategic Planning Support",
          "Team Structure & Role Design",
          "Growth Planning & Scaling Support",
        ],
      },
    ],
    bottomCard: {
      step: "Step Three",
      title: "How We Work",
      image: "/ab1.png",
      bullets: [
        "Discovery & Business Assessment",
        "Goal Alignment & Strategy Development",
        "People & Operational Gap Analysis",
        "Practical Implementation Guidance",
        "Leadership & Team Effectiveness Support",
        "Accountability & Progress Reviews",
        "Customised Business Solutions",
        "Ongoing Advisory Support",
        "Sustainable Growth Planning",
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
      heading: "Talent Assessment",
      desc: "Behavioural and assessment-based solutions that support informed hiring, development decisions, and organisational talent strategies through structured, evidence-based insights.",
      image: "/ab1.png",
    },
    topCards: [
      {
        step: "Step One",
        title: "Assessment Types",
        bullets: [
          "Behavioural Profiling",
          "Psychometric Assessments",
          "Role Suitability Evaluations",
        ],
      },
      {
        step: "Step Two",
        title: "Application Areas",
        bullets: [
          "Recruitment & Selection Support",
          "Leadership Capability Assessment",
          "Team Dynamics & Fit Analysis",
          "Employee Development Planning",
          "Succession & Talent Pipeline Review",
        ],
      },
    ],
    bottomCard: {
      step: "Step Three",
      title: "Assessment Approach",
      image: "/ab1.png",
      bullets: [
        "Role & Competency Framework Alignment",
        "Validated Assessment Tools",
        "Structured Debrief & Interpretation",
        "Individual & Team Reporting",
        "Development Planning Integration",
        "Hiring Decision Support",
        "Leadership Readiness Review",
        "Ongoing Talent Strategy Alignment",
        "Confidential & Professional Process",
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
