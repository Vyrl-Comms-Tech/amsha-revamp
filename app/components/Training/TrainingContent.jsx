"use client";
import { useEffect, useState } from "react";
import "../../styles/training-content.css";
import axios from "axios";
import Link from "next/link";
const MAX_VISIBLE = 4;

const INITIAL_FORM = { company: "", activity: "", phone: "", email: "", message: "" };
const INITIAL_ERRORS = { company: "", activity: "", phone: "", email: "" };

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function validateFields(form) {
  const errors = { ...INITIAL_ERRORS };
  if (!form.company.trim()) errors.company = "Company name is required.";
  if (!form.activity.trim()) errors.activity = "Field of activity is required.";
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[0-9]+$/.test(form.phone)) {
    errors.phone = 'Phone number must contain only numbers.';
  }
  if (!form.email.trim()) errors.email = "Email address is required.";
  else if (!validateEmail(form.email)) errors.email = "Please enter a valid email address.";
  return errors;
}

export default function TrainingContent() {
  const [expanded, setExpanded] = useState({});
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const toggle = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  const onField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(false), 5000);
    return () => clearTimeout(t);
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const fieldErrors = validateFields(form);
    if (Object.values(fieldErrors).some(Boolean)) {
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: form.company,
          fieldOfActivity: form.activity,
          phone: form.phone,
          email: form.email,
          message: form.message,
          pageSource: "training-form",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Something went wrong. Please try again.");
      setForm(INITIAL_FORM);
      setErrors(INITIAL_ERRORS);
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

          {success && (
            <div className="th-success-banner">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.707 7.707-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 11.086l4.793-4.793a1 1 0 1 1 1.414 1.414z" fill="currentColor" />
              </svg>
              Message sent! We&apos;ll be in touch shortly.
            </div>
          )}

          {apiError && (
            <div className="th-error-banner">
              {apiError}
              <button className="th-error-close" onClick={() => setApiError("")} aria-label="Dismiss">×</button>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="th-field">
              <label className="th-label">Name Of Company <span className="th-req">*</span></label>
              <input
                className={`th-input${errors.company ? " th-input--error" : ""}`}
                type="text"
                placeholder="Enter Your Company Name"
                value={form.company}
                onChange={onField("company")}
                disabled={submitting}
              />
              {errors.company && <span className="th-field-error">{errors.company}</span>}
            </div>

            <div className="th-field">
              <label className="th-label">Field Of Activity <span className="th-req">*</span></label>
              <input
                className={`th-input${errors.activity ? " th-input--error" : ""}`}
                type="text"
                placeholder="Enter The Field Of Activity"
                value={form.activity}
                onChange={onField("activity")}
                disabled={submitting}
              />
              {errors.activity && <span className="th-field-error">{errors.activity}</span>}
            </div>

            <div className="th-field">
              <label className="th-label">Phone <span className="th-req">*</span></label>
              <input
                className={`th-input${errors.phone ? " th-input--error" : ""}`}
                type="tel"
                placeholder="Enter Your Phone Number"
                value={form.phone}
                onChange={onField("phone")}
                disabled={submitting}
              />
              {errors.phone && <span className="th-field-error">{errors.phone}</span>}
            </div>

            <div className="th-field">
              <label className="th-label">Email <span className="th-req">*</span></label>
              <input
                className={`th-input${errors.email ? " th-input--error" : ""}`}
                type="email"
                placeholder="Enter Your Email Address"
                value={form.email}
                onChange={onField("email")}
                disabled={submitting}
              />
              {errors.email && <span className="th-field-error">{errors.email}</span>}
            </div>

            <div className="th-field">
              <label className="th-label">Messages</label>
              <textarea
                className="th-input th-textarea"
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={onField("message")}
                disabled={submitting}
              />
            </div>

            <button className="th-submit btn-4" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send now"}
            </button>
          </form>
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
                {course.category?.trim() && (
                  <div>
                    <span className="hero-badge-training">
                      {course.category}
                    </span>
                  </div>
                )}

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
                  {/* <button className="th-btn-outline btn-4" type="button">
                    View more
                  </button> */}
                  <Link href="/contact-us">
                    <button className="th-btn-fill btn-4" type="button">
                      Inquiry
                    </button>
                  </Link>
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
