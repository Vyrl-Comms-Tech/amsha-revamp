"use client";
import { useState } from "react";
import Image from "next/image";
import "../../styles/training-content.css";

const MAX_VISIBLE = 4;

const COURSES = [
  {
    title: "Leadership & Management Development",
    image: "/img11.jpg",
    bullets: [
      "From Doer to Leader: Making the Shift",
      "Leadership Mindset: From Manager to Leader",
      "Understanding Leadership Styles",
      "Situational Leadership in Modern Workplaces",
      "Building High-Performance Teams",
      "Strategic Leadership & Decision Making",
    ],
  },
  {
    title: "Verbal Communication",
    image: "/img11.jpg",
    bullets: [
      "Clear & Confident Workplace Communication",
      "Structured Thinking & Message Clarity",
      "Active Listening Skills",
      "Persuasive Communication",
      "Storytelling for Business Impact",
      "Asking Powerful Questions",
    ],
  },
  {
    title: "Non-Verbal Communication",
    image: "/img11.jpg",
    bullets: [
      "Body Language in Professional Settings",
      "Voice Modulation & Tone of Authority",
      "Reading Non-Verbal Cues",
      "Presence & Confidence in Meetings",
    ],
  },
  {
    title: "Workplace Communication & Professionalism",
    image: "/img11.jpg",
    bullets: [
      "Communication Mastery",
      "Professional Etiquette & Workplace Behaviour",
      "Workplace Communication Basics",
      "Email & Business Communication",
      "Adaptability in the Modern Workplace",
      "Writing for Impact",
    ],
  },
  {
    title: "Emotional Intelligence at Work",
    image: "/img11.jpg",
    bullets: [
      "Understanding Emotional Intelligence",
      "Self-Awareness & Self-Regulation",
      "Empathy in Leadership",
      "Managing Emotions Under Pressure",
      "Building Resilience",
    ],
  },
  {
    title: "Conflict Resolution & Difficult Conversations",
    image: "/img11.jpg",
    bullets: [
      "Understanding Conflict Dynamics",
      "De-escalation Techniques",
      "Facilitation & Mediation Basics",
      "Difficult Conversations Framework",
    ],
  },
];

export default function TrainingContent() {
  const [expanded, setExpanded] = useState({});
  const [form, setForm] = useState({
    company: "", activity: "", phone: "", email: "", message: "",
  });

  const toggle  = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));
  const onField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="th-layout">

      {/* ── Left sticky form ── */}
      <aside className="th-form-wrap">
        <div className="th-form">
          <h2 className="th-form-heading">Request For Enquiry</h2>

          <div className="th-field">
            <label className="th-label">Name Of Company <span className="th-req">*</span></label>
            <input className="th-input" type="text" placeholder="Enter Your Company Name"
              value={form.company} onChange={onField("company")} />
          </div>

          <div className="th-field">
            <label className="th-label">Field Of Activity <span className="th-req">*</span></label>
            <input className="th-input" type="text" placeholder="Enter The Field Of Activity"
              value={form.activity} onChange={onField("activity")} />
          </div>

          <div className="th-field">
            <label className="th-label">Phone <span className="th-req">*</span></label>
            <input className="th-input" type="tel" placeholder="Enter Your Phone Number"
              value={form.phone} onChange={onField("phone")} />
          </div>

          <div className="th-field">
            <label className="th-label">Email <span className="th-req">*</span></label>
            <input className="th-input" type="email" placeholder="Enter Your Email Address"
              value={form.email} onChange={onField("email")} />
          </div>

          <div className="th-field">
            <label className="th-label">Messages</label>
            <textarea className="th-input th-textarea" placeholder="Your Message" rows={5}
              value={form.message} onChange={onField("message")} />
          </div>

          <button className="th-submit" type="button">Send now</button>
        </div>
      </aside>

      {/* ── Right scrollable course cards ── */}
      <main className="th-courses">
        {COURSES.map((course, i) => {
          const open    = !!expanded[i];
          const hasMore = course.bullets.length > MAX_VISIBLE;
          const visible = open ? course.bullets : course.bullets.slice(0, MAX_VISIBLE);

          return (
            <div key={i} className="th-card">
              <div className="th-card-left">
                <h3 className="th-card-title">{course.title}</h3>
                <ul className="th-card-list">
                  {visible.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                {hasMore && (
                  <button className="th-more" type="button" onClick={() => toggle(i)}>
                    {open ? "Show less" : "…… More"}
                  </button>
                )}
                <div className="th-card-actions">
                  <button className="th-btn-outline" type="button">View more</button>
                  <button className="th-btn-fill"    type="button">Inquiry</button>
                </div>
              </div>
              <div className="th-card-img">
                <Image src={course.image} alt={course.title} fill className="th-img" />
              </div>
            </div>
          );
        })}
      </main>

    </div>
  );
}
