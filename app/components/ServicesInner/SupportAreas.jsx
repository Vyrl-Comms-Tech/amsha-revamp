"use client";
import { useState } from "react";
import "../../styles/support-areas.css";

const ITEMS = [
  // Row 1 — dark at col 0
  {
    num: "01",
    title: "Organisational Structure & Workforce Planning",
    text: "Supporting businesses in creating clear structures, reporting lines, and workforce plans that strengthen operational efficiency and organisational growth.",
  },
  {
    num: "02",
    title: "Role Alignment & Job Design",
    text: "Helping organisations define responsibilities, expectations, and role clarity to improve accountability and team effectiveness.",
  },
  {
    num: "02",
    title: "SOP & Process Development",
    text: "Designing practical systems, workflows, and standard operating procedures that improve consistency and operational flow.",
  },
  // Row 2 — dark at col 1
  {
    num: "02",
    title: "Policy Review & Workplace Governance",
    text: "Reviewing and strengthening workplace policies and internal guidelines to support professionalism, clarity, and organisational alignment.",
  },
  {
    num: "01",
    title: "Training Needs & Skill Gap Analysis",
    text: "Identifying capability gaps and development areas across teams to support targeted employee growth and performance improvement.",
  },
  {
    num: "02",
    title: "Organisational Performance & Improvement",
    text: "Assessing workplace and operational challenges that may be impacting productivity, communication, and overall organisational performance.",
  },
  // Row 3 — dark at col 2
  {
    num: "02",
    title: "Leadership Alignment & Team Effectiveness",
    text: "Supporting leadership teams and departments in improving communication, collaboration, accountability, and alignment.",
  },
  {
    num: "02",
    title: "Leadership Development Support",
    text: "Helping organisations identify and strengthen leadership capability across different levels of the business.",
  },
  {
    num: "01",
    title: "Employee Performance Management",
    text: "Helping organisations strengthen performance management processes that encourage accountability, development, and workplace effectiveness.",
  },
  // Row 4 — dark at col 1
  {
    num: "02",
    title: "Performance Evaluation & KPI Support",
    text: "Supporting businesses in developing clearer performance evaluation processes, KPIs, and accountability structures.",
  },
  {
    num: "01",
    title: "Organisational Development & Change Support",
    text: "Supporting businesses through organisational growth, transitions, restructuring, and workplace change initiatives.",
  },
  {
    num: "02",
    title: "Workplace Communication & Culture Support",
    text: "Helping organisations strengthen communication practices and create healthier, more people-centred workplace cultures.",
  },
  // Row 5 — dark at col 0
  {
    num: "01",
    title: "Culture & Values Alignment",
    text: "Helping organisations align workplace behaviours, leadership practices, and internal culture with their organisational values and vision.",
  },
  {
    num: "02",
    title: "Employee Engagement & Workplace Experience",
    text: "Supporting organisations in strengthening employee engagement, workplace satisfaction, and overall employee experience.",
  },
  {
    num: "02",
    title: "Competency Framework Development",
    text: "Designing competency frameworks that define the behaviours, skills, and expectations required across different roles and functions.",
  },
  // Row 6 — dark at col 1
  {
    num: "02",
    title: "Employee Development Planning",
    text: "Creating structured development approaches that support employee growth, progression, and long-term capability building.",
  },
  {
    num: "01",
    title: "Workplace Behaviour & Professionalism Support",
    text: "Supporting organisations in strengthening workplace conduct, professionalism, accountability, and employee behaviour standards.",
  },
  {
    num: "02",
    title: "Operational & Departmental Support",
    text: "Providing people-focused operational support to improve departmental efficiency, coordination, and workplace effectiveness.",
  },
];

// Row 7 — newsletter (cols 0-1) + dark card (col 2)
const LAST_CARD = {
  num: "01",
  title: "People Strategy & Organisational Planning",
  text: "Helping organisations align their people strategies with wider business objectives, growth plans, and long-term organisational goals.",
};

// Which column (0-indexed) is dark in each of the 6 rows
const DARK_COL = [0, 1, 2, 1, 0, 1];

const isDark = (i) => DARK_COL[Math.floor(i / 3)] === i % 3;

export default function SupportAreas() {
  const [openIdx, setOpenIdx] = useState(null);
  const [lastOpen, setLastOpen] = useState(false);
  const [email, setEmail] = useState("");

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <section className="sa-section">
      <h2 className="sa-heading">Areas We Support</h2>

      <div className="sa-grid">
        {ITEMS.map((item, i) => {
          const dark = isDark(i);
          const open = openIdx === i;
          return (
            <div
              key={i}
              className={`sa-card${dark ? " sa-card--dark" : ""}${open ? " sa-card--open" : ""}`}
              onClick={() => toggle(i)}
            >
              <div className="sa-card-top">
                <span className="sa-num">{item.num}</span>
                <span className="sa-icon">{open ? "×" : "+"}</span>
              </div>
              <div className="sa-card-main">
                <h3 className="sa-title">{item.title}</h3>
                <div className="sa-body">
                  <div className="sa-body-inner">
                    <p className="sa-text">{item.text}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 7 — newsletter + single dark card */}
      <div className="sa-last-row">
        <div className="sa-newsletter">
          <h3 className="sa-nl-heading">Easier HR For Your Inbox</h3>
          <p className="sa-nl-sub">
            Get Resources, Tips, And Inspiration That Will Help You Save Time
            And Shine At Work.
          </p>
          <p className="sa-nl-legal">
            By Providing My Email, I Authorize Amsha Advisory To Keep Me
            Informed About Its Products, Services And Events Through Email. My
            Data Will Be Handled According To The Privacy Notice.
          </p>
          <div className="sa-nl-form">
            <input
              type="email"
              className="sa-nl-input"
              placeholder="Enter Your Company Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="sa-nl-btn" type="button">
              Count Me In
            </button>
          </div>
        </div>

        <div
          className={`sa-card sa-card--dark${lastOpen ? " sa-card--open" : ""}`}
          onClick={() => setLastOpen((p) => !p)}
        >
          <div className="sa-card-top">
            <span className="sa-num">{LAST_CARD.num}</span>
            <span className="sa-icon">{lastOpen ? "×" : "+"}</span>
          </div>
          <div className="sa-card-main">
            <h3 className="sa-title">{LAST_CARD.title}</h3>
            <div className="sa-body">
              <div className="sa-body-inner">
                <p className="sa-text">{LAST_CARD.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
