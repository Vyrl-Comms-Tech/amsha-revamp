"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "../../styles/training-content.css";
import axios from "axios";

const MAX_VISIBLE = 4;

export default function TrainingContent() {
  const [expanded, setExpanded] = useState({});
  const [form, setForm] = useState({
    company: "", activity: "", phone: "", email: "", message: "",
  });

  const toggle = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));
  const onField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/training/get`
        );
        setCourses(response.data?.data?.data);
      } catch (error) {
        console.error("Something went wrong:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);


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
        {courses.map((course, i) => {
          const open = !!expanded[i];
          const hasMore =
            course.descMode === "bullets" &&
            course.bullets.length > MAX_VISIBLE;

          const visible =
            course.descMode === "bullets"
              ? open
                ? course.bullets
                : course.bullets.slice(0, MAX_VISIBLE)
              : [];

          return (
            <div key={course._id} className="th-card">
              <div className="th-card-left">
                <div>
                  <span className="hero-badge-training">
                    {course.category}
                  </span>
                </div>

                <h3 className="th-card-title">{course.title}</h3>

                {course.descMode === "text" ? (
                  <p className="th-card-desc">
                    {course.description}
                  </p>
                ) : (
                  <>
                    <ul className="th-card-list">
                      {visible.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>

                    {hasMore && (
                      <button
                        className="th-more"
                        type="button"
                        onClick={() => toggle(i)}
                      >
                        {open ? "Show less" : "...... More"}
                      </button>
                    )}
                  </>
                )}

                <div className="training-tags-container">
                  {course.deliveryModes?.map((mode, index) => (
                    <div key={index} className="training-tags">
                      <p>{mode}</p>
                    </div>
                  ))}
                </div>

                <div className="th-card-actions">
                  <button className="th-btn-outline" type="button">
                    View more
                  </button>
                  <button className="th-btn-fill" type="button">
                    Inquiry
                  </button>
                </div>
              </div>

              {/* <div className="th-card-img">
                <div className="th-card-img-inner">
                  <Image
                    src={course?.image || "/ab1.png"}
                    alt={course.title}
                    fill
                    className="th-img"
                  />
                </div>
              </div> */}

            </div>
          );
        })}
      </main>

    </div>
  );
}
