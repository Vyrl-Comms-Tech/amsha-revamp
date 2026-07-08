import { notFound } from "next/navigation";
import ServiceInnerHero from "../../components/ServicesInner/ServiceInnerHero";
import FooterModel from "../../components/layout/FooterModel";
import ServiceOtherInner from "../../components/ServicesInner/ServiceOtherInner";
import AreasOfSupport from "../../components/ServicesInner/AreasOfSupport";
import Link from "next/link";
import Newsletter from "../../components/layout/NewsLetter";

const SERVICES = {
  /* ── Step 2 ─────────────────────────────────────────────── */
  "employee-training-development": {
    hero: {
      heading: "Employee Training & Development",
      desc: `At Amsha Advisory, our training programs are designed to create practical workplace impact through behavioural, leadership, and professional development solutions tailored to organisational needs.
We focus on strengthening communication, leadership capability, workplace professionalism, team effectiveness, emotional intelligence, customer experience, and overall employee performance through interactive and scenario-based learning experiences.
Every program is customised around the organisation’s industry, teams, operational challenges, and business objectives to create meaningful and long-term workplace impact.

     `,
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
      desc: `At Amsha Advisory, our Upskilling & Training solutions are designed to provide personalised, practical, and goal-oriented development support tailored to individual professional needs.
Whether an individual is looking to strengthen workplace skills, improve communication and confidence, develop professionally, explore a career path, or build capabilities within a specific area, our approach focuses on creating customised learning experiences aligned with their goals, strengths, and development areas.
Each program is designed based on the individual’s objectives, current skill level, and desired growth outcomes to ensure learning remains practical, relevant, and directly applicable.
Our upskilling sessions are conducted through personalised 1:1 training and development support, allowing for a more focused, flexible, and tailored learning experience.
All upskilling programs begin with a complimentary 15-minute discovery call to better understand the individual’s goals, development areas, and learning needs before designing the appropriate support approach.
`,
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
      {
        // step: "Step One",
        title: "Delivery Approach",
        bullets: [
          "Personalized Learning Plans",
          "Practical & Scenario-Based Learning",
          "Interactive Exercises & Discussions",
          "Goal-Oriented Development Support",
          "Continuous Guidance & Feedback",
          "Flexible Learning Structure",
        ],
      },
    ],
  },

  /* ── Step 4 ─────────────────────────────────────────────── */
  "entrepreneurial-consulting": {
    hero: {
      heading: "Entrepreneurial Consulting",
      desc: `At Amsha Advisory, our Entrepreneurial Consulting solutions are designed to support entrepreneurs, startups, and growing businesses in building stronger operational foundations, people structures, and long-term growth strategies.
      
We understand that growing a business involves more than operations alone; it requires clarity, structure, leadership, people management, and sustainable systems that support long-term success. Our approach focuses on helping entrepreneurs navigate business challenges through practical, people-centred, and growth-oriented support tailored to the stage and needs of the business.
Whether supporting early-stage startups, growing teams, or expanding businesses, we work closely with founders and leadership teams to strengthen workplace structure, operational processes, leadership capability, team alignment, and organisational direction.

Our consulting support is tailored to each business, ensuring solutions remain practical, scalable, and aligned with the entrepreneur’s vision, goals, and long-term business objectives.
`,
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
    areasOfSupport: [
      {
        num: "01",
        title: "Startup & Business Growth Support",
      },
      {
        num: "02",
        title: "Organisational Structure & Team Development",
      },
      {
        num: "03",
        title: "Leadership & Founder Support",
      },
      {
        num: "04",
        title: "Workplace Systems & Process Guidance",
      },
      {
        num: "05",
        title: "Operational & People Strategy Support",
      },
      {
        num: "06",
        title: "Team Alignment & Workplace Culture",
      },
      {
        num: "07",
        title: "Employee Development & Performance Support",
      },
      {
        num: "08",
        title: "Business Professionalism & Organisational Readiness",
      },
      {
        num: "09",
        title: "Growth Planning & Organisational Scaling",
      },
    ],
  },

  /* ── Step 5 ─────────────────────────────────────────────── */
  "career-development": {
    hero: {
      heading: "Career Development",
      desc: `
      At Amsha Advisory, our Career Development solutions are designed to help individuals gain greater clarity, confidence, and direction in their professional journey.
We support students, young professionals, and working individuals in understanding their strengths, behavioural preferences, career interests, and long-term goals through personalized guidance and development support tailored to their individual needs.
To provide deeper self-awareness and career insight, we also offer psychometric assessments including the MBTI® (Myers-Briggs Type Indicator) and Facet5 Personality Assessment. These assessments help individuals better understand their communication styles, workplace preferences, behavioural tendencies, leadership potential, and suitable career pathways.
The MBTI® Career Report is also available for students and young professionals seeking guidance on career direction, learning styles, and work environments aligned with their personality type.
Each assessment includes a personalized report followed by a 1-hour debrief session to help individuals better understand their results, strengths, development areas, and career direction.
Career Development support can also be paired with personalized 1:1 Upskilling & Training sessions focused on communication skills, workplace confidence, leadership development, professionalism, personal growth, and broader soft-skill development.

      `,
      image: "/s9.jpg",
    },
    topCards: [
      // {
      //   title: "Areas of Support",
      //   bullets: [
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //   ],
      // },
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
    ], areasOfSupport: [
      {
        num: "01",
        title: "Career Clarity & Direction",
      },
      {
        num: "02",
        title: "Professional Growth Planning",
      },
      {
        num: "03",
        title: "Workplace Readiness & Corporate Preparation",
      },
      {
        num: "04",
        title: "Career Transition Support",
      },
      {
        num: "05",
        title: "CV & Professional Profile Guidance",
      },
      {
        num: "06",
        title: "Interview Preparation Support",
      },
      {
        num: "07",
        title: "Communication & Professional Confidence Development",
      },
      {
        num: "08",
        title: "Leadership & Personal Development",
      }, {
        num: "09",
        title: "Behavioural & Career Insight Support",
      },
    ],
  },

  /* ── Step 6 ─────────────────────────────────────────────── */
  "talent-assessment": {
    hero: {
      heading: "Talent Assessment & Selection",
      desc: `At Amsha Advisory, our Talent Assessment & Selection solutions are designed to support organisations in making more informed, objective, and strategic hiring decisions.
We work with businesses to assess candidates beyond technical capability by evaluating behavioural fit, communication style, leadership potential, workplace effectiveness, and alignment with organisational culture and role requirements.
Our approach combines structured assessments, behavioural insight, psychometric tools, and practical evaluation methods to help organisations identify individuals who are best suited for both the role and the wider organisational environment.
Through tailored assessment processes, we support organisations in strengthening hiring quality, reducing bias in selection decisions, improving role alignment, and identifying long-term potential within candidates.
`,
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
          paragraph:
            "Supporting insight into communication styles, personality preferences, decision-making approaches, and workplace dynamics.",
        },
        {
          heading: "Facet5 Personality Assessment",
          paragraph:
            "Providing behavioural insight into leadership style, motivation, communication, resilience, and workplace effectiveness.",
        },
      ],
    },
    areasOfSupport: [
      {
        num: "01",
        title: "Candidate Assessment & Selection Support",
      },
      {
        num: "02",
        title: "Behavioural & Personality Assessments",
      },
      {
        num: "03",
        title: "Leadership Potential Identification",
      },
      {
        num: "04",
        title: "Role Alignment & Suitability Analysis",
      },
      {
        num: "05",
        title: "Team & Culture Fit Evaluation",
      },
      {
        num: "06",
        title: "Communication & Workplace Effectiveness Assessment",
      },
      {
        num: "07",
        title: "Talent Development & Succession Planning",
      },
      {
        num: "08",
        title: "Structured Hiring & Evaluation Support",
      },
    ],
  },
};
export default async function ServiceSlugPage({ params }) {
  const { slug } = await params;
  const data = SERVICES[slug];

  if (!data) notFound();

  const useAccordionAreas =
    slug === "entrepreneurial-consulting" || slug === "talent-assessment"|| slug === "career-development";

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
        bottomCard={useAccordionAreas ? null : data.bottomCard}
      />

      {useAccordionAreas && (
        <AreasOfSupport
          heading="Areas of Support"
          items={data.areasOfSupport}
          showNewsletter={false}
          compact={true}
        />
      )}

      {slug === "employee-training-development" && (
        <div className="training-programme-btn-wrap">
          <button className="training-programme-btn">
            <Link href='/training'>
            View Training Programme
            </Link>
          </button>
        </div>
      )}
      <Newsletter/>
    </div>
  );
}
