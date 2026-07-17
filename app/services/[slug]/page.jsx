import { notFound } from "next/navigation";
import ServiceInnerHero from "../../components/ServicesInner/ServiceInnerHero";
import FooterModel from "../../components/layout/FooterModel";
import ServiceOtherInner from "../../components/ServicesInner/ServiceOtherInner";
import AreasOfSupport from "../../components/ServicesInner/AreasOfSupport";
import Link from "next/link";
import Newsletter from "../../components/layout/NewsLetter";
import Facts from "../../components/Home/Facts";

const SERVICES = {
  /* ── Step 2 ─────────────────────────────────────────────── */
  "employee-training-development": {
    hero: {
      heading: "Employee Training & Development",
      btnText: "Build Your Training Program",
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
      btnText: "Book Your Free Discovery Call",
      desc: `At Amsha Advisory, our Upskilling & Training solutions are designed to provide personalised, practical, and goal-oriented development support tailored to individual professional needs.Whether an individual is looking to strengthen workplace skills, improve communication and confidence, develop professionally, explore a career path, or build capabilities within a specific area, our approach focuses on creating customised learning experiences aligned with their goals, strengths, and development areas.
      <br/>
Each program is designed based on the individual’s objectives, current skill level, and desired growth outcomes to ensure learning remains practical, relevant, and directly applicable. Our upskilling sessions are conducted through personalised 1:1 training and development support, allowing for a more focused, flexible, and tailored learning experience. All upskilling programs begin with a complimentary 15-minute discovery call to better understand the individual’s goals, development areas, and learning needs before designing the appropriate support approach.
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
      btnText: "Grow Your Business",
      desc: `At Amsha Advisory, our Entrepreneurial Consulting solutions are designed to support entrepreneurs, startups, and growing businesses in building stronger operational foundations, people structures, and long-term growth strategies. We understand that growing a business involves more than operations alone; it requires clarity, structure, leadership, people management, and sustainable systems that support long-term success. Our approach focuses on helping entrepreneurs navigate business challenges through practical, people-centred, and growth-oriented support tailored to the stage and needs of the business.
<br/>
Whether supporting early-stage startups, growing teams, or expanding businesses, we work closely with founders and leadership teams to strengthen workplace structure, operational processes, leadership capability, team alignment, and organisational direction. Our consulting support is tailored to each business, ensuring solutions remain practical, scalable, and aligned with the entrepreneur’s vision, goals, and long-term business objectives.
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
      title: "Areas We Support",
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
        text: "Supporting entrepreneurs in building strong foundations and navigating the challenges of starting, growing, and scaling a business.",
      },
      {
        num: "02",
        title: "Organisational Structure & Team Development",
        text: "Helping businesses establish effective organizational structures, define roles, and build high-performing teams.",
      },
      {
        num: "03",
        title: "Leadership & Founder Support",
        text: "Providing guidance to founders and business leaders in strengthening leadership capability, decision-making, and people management.",
      },
      {
        num: "04",
        title: "Workplace Systems & Process Guidance",
        text: "Developing practical systems and operational processes that improve efficiency, consistency, and day-to-day business operations.",
      },
      {
        num: "05",
        title: "Operational & People Strategy Support",
        text: "Aligning business operations and people strategies to support sustainable growth, productivity, and organizational success.",
      },
      {
        num: "06",
        title: "Team Alignment & Workplace Culture",
        text: "Helping businesses foster collaborative teams and build a positive workplace culture aligned with their vision and values.",
      },
      {
        num: "07",
        title: "Employee Development & Performance Support",
        text: "Supporting the development of employees through performance improvement, capability building, and ongoing professional growth.",
      },
      {
        num: "08",
        title: "Business Professionalism & Organisational Readiness",
        text: "Preparing businesses with the structures, processes, and professional standards needed for sustainable operations and future growth.",
      },
      {
        num: "09",
        title: "Growth Planning & Organisational Scaling",
        text: "Helping businesses develop practical growth strategies and scalable structures to support long-term expansion and success.",
      },
    ],
  },

  /* ── Step 5 ─────────────────────────────────────────────── */
  "career-development": {
    hero: {
      heading: "Career Development",
      btnText: "Explore Your Career Path",
      desc: `
      At Amsha Advisory, our Career Development solutions are designed to help individuals gain greater clarity, confidence, and direction in their professional journey.
We support students, young professionals, and working individuals in understanding their strengths, behavioural preferences, career interests, and long-term goals through personalized guidance and development support tailored to their individual needs. To provide deeper self-awareness and career insight, we also offer psychometric assessments including the MBTI® (Myers-Briggs Type Indicator) and Facet5 Personality Assessment. These assessments help individuals better understand their communication styles, workplace preferences, behavioural tendencies, leadership potential, and suitable career pathways.
<br/>
The MBTI® Career Report is also available for students and young professionals seeking guidance on career direction, learning styles, and work environments aligned with their personality type. Each assessment includes a personalized report followed by a 1-hour debrief session to help individuals better understand their results, strengths, development areas, and career direction. Career Development support can also be paired with personalized 1:1 Upskilling & Training sessions focused on communication skills, workplace confidence, leadership development, professionalism, personal growth, and broader soft-skill development.

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
    ],
    areasOfSupport: [
      {
        num: "01",
        title: "Career Clarity & Direction",
        text: "Helping individuals identify their strengths, interests, and career goals to make informed decisions about their professional future.",
      },
      {
        num: "02",
        title: "Professional Growth Planning",
        text: "Supporting the creation of personalized development plans that align with long-term career aspirations and professional objectives.",
      },
      {
        num: "03",
        title: "Workplace Readiness & Corporate Preparation",
        text: "Preparing individuals with the skills, behaviours, and professional mindset needed to succeed in today's workplace.",
      },
      {
        num: "04",
        title: "Career Transition Support",
        text: "Providing guidance and support for individuals navigating career changes, promotions, or new professional opportunities.",
      },
      {
        num: "05",
        title: "CV & Professional Profile Guidance",
        text: "Helping individuals strengthen their CVs, LinkedIn profiles, and personal brands to better showcase their skills and experience.",
      },
      {
        num: "06",
        title: "Interview Preparation Support",
        text: "Building confidence through tailored interview coaching, practical techniques, and constructive feedback.",
      },
      {
        num: "07",
        title: "Communication & Professional Confidence Development",
        text: "Developing effective communication, interpersonal skills, and executive presence to enhance workplace performance and confidence.",
      },
      {
        num: "08",
        title: "Leadership & Personal Development",
        text: "Strengthening leadership capabilities, emotional intelligence, self-awareness, and other soft skills that support long-term career success.",
      },
      {
        num: "09",
        title: "Behavioural & Career Insight Support",
        text: "Using psychometric assessments and behavioural insights to help individuals better understand themselves and make more informed career decisions.",
      },
    ],
  },

  /* ── Step 6 ─────────────────────────────────────────────── */
  "talent-assessment": {
    hero: {
      heading: "Talent Assessment & Selection",
      btnText: "Identify the Right Talent",
      desc: `At Amsha Advisory, our Talent Assessment & Selection solutions are designed to support organisations in making more informed, objective, and strategic hiring decisions We work with businesses to assess candidates beyond technical capability by evaluating behavioural fit, communication style, leadership potential, workplace effectiveness, and alignment with organisational culture and role requirements.
      <br/>
Our approach combines structured assessments, behavioural insight, psychometric tools, and practical evaluation methods to help organisations identify individuals who are best suited for both the role and the wider organisational environment. Through tailored assessment processes, we support organisations in strengthening hiring quality, reducing bias in selection decisions, improving role alignment, and identifying long-term potential within candidates.
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
          logo: "/fact12.png",
        },
        {
          heading: "Facet5 Personality Assessment",
          paragraph:
            "Providing behavioural insight into leadership style, motivation, communication, resilience, and workplace effectiveness.",
          logo: "/fact11.png",
        },
      ],
    },
    areasOfSupport: [
      {
        num: "01",
        title: "Candidate Assessment & Selection Support",
        text: "Supporting organizations in identifying candidates whose skills, behaviours, and potential align with the requirements of the role.",
      },
      {
        num: "02",
        title: "Behavioural & Personality Assessments",
        text: "Using psychometric and behavioural assessments to provide objective insights into personality, working styles, and workplace preferences.",
      },
      {
        num: "03",
        title: "Leadership Potential Identification",
        text: "Evaluating leadership capabilities and future potential to support succession planning and leadership development.",
      },
      {
        num: "04",
        title: "Role Alignment & Suitability Analysis",
        text: "Assessing how well an individual's strengths, competencies, and behaviours align with the demands of a specific role.",
      },
      {
        num: "05",
        title: "Team & Culture Fit Evaluation",
        text: "Helping organizations understand how candidates are likely to integrate with existing teams and organizational culture.",
      },
      {
        num: "06",
        title: "Communication & Workplace Effectiveness Assessment",
        text: "Assessing communication style, interpersonal effectiveness, and workplace behaviours through practical evaluation methods.",
      },
      {
        num: "07",
        title: "Talent Development & Succession Planning",
        text: "Identifying strengths, development opportunities, and high-potential talent to support long-term workforce planning.",
      },
      {
        num: "08",
        title: "Structured Hiring & Evaluation Support",
        text: "Designing and facilitating structured assessment processes, including interviews, assessment centres, case studies, role plays, and evaluation frameworks to enable more informed hiring decisions.",
      },
    ],
  },
};
export default async function ServiceSlugPage({ params }) {
  const { slug } = await params;
  const data = SERVICES[slug];

  if (!data) notFound();

  const useAccordionAreas =
    slug === "entrepreneurial-consulting" ||
    slug === "talent-assessment" ||
    slug === "career-development";

  return (
    <div>
      <FooterModel />

      <ServiceInnerHero
        heading={data.hero.heading}
        desc={data.hero.desc}
        image={data.hero.image}
        btnText={data.hero.btnText}
        // bottomLogos={
        //   slug === "talent-assessment" ? ["/fact11.png", "/fact12.png"] : null
        // }
      />

      <ServiceOtherInner
        topCards={data.topCards}
        bottomCard1={data.bottomCard1}
        bottomCard={useAccordionAreas ? null : data.bottomCard}
      />

      {useAccordionAreas && (
        <AreasOfSupport
          heading="Areas We Support"
          items={data.areasOfSupport}
          showNewsletter={false}
          compact={false}
        />
      )}

      {(slug === "employee-training-development" ||
        slug === "upskilling-training") && (
        <div className="training-programme-btn-wrap">
          <button className="training-programme-btn">
            <Link href="/training">View Training Topics</Link>
          </button>
        </div>
      )}

      {/* {slug === "talent-assessment" && <Facts />} */}

      <Newsletter />
    </div>
  );
}
