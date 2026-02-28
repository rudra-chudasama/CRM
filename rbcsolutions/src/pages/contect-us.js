// src/pages/contect-us.js
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBg from "../assets/bg1.png";
import cont3d from "../assets/cont-3d.png";

gsap.registerPlugin(ScrollTrigger);

/* ── Same Google Apps Script URL as your CRM dashboard ── */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzw0qM_qWE8XwaNnGg2si-fxxp87c9Fnz8iQ9iZKj4Z0VC1r37viDJIDZgxxzDpDioi8A/exec";

/* ================= MOTION 3D WRAPPER (identical to Home.js) ================= */
function Motion3DWrapper({ src }) {
  const slideRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothCursorX = useSpring(cursorX, { stiffness: 200, damping: 22 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 200, damping: 22 });

  const modelX = useMotionValue(0);
  const modelY = useMotionValue(0);
  const smoothModelX = useSpring(modelX, { stiffness: 80, damping: 18 });
  const smoothModelY = useSpring(modelY, { stiffness: 80, damping: 18 });

  useEffect(() => {
    function handleMouseMove(e) {
      if (!slideRef.current) return;
      const rect = slideRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
      const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const rawOffsetY = (e.clientY - rect.top - rect.height / 2) * 0.2;
      const offsetY = Math.min(rawOffsetY, rect.height * 0.2);
      modelX.set(offsetX);
      modelY.set(offsetY);
    }
    function handleEnter() { setHovered(true); }
    function handleLeave() {
      cursorX.set(-100);
      cursorY.set(-100);
      modelX.set(0);
      modelY.set(0);
      setHovered(false);
    }
    const el = slideRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, [cursorX, cursorY, modelX, modelY]);

  return (
    <div ref={slideRef} className="hero-tilt-zone" style={{ cursor: "none", position: "relative" }}>
      <motion.div
        style={{
          position: "absolute",
          left: smoothCursorX,
          top: smoothCursorY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 10,
        }}
        animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: dragging ? 1.35 : 1,
            borderColor: dragging ? "rgba(250, 204, 21, 0.9)" : "rgba(34, 211, 238, 0.85)",
            boxShadow: dragging
              ? "0 0 16px rgba(250,204,21,0.55), inset 0 0 8px rgba(250,204,21,0.2)"
              : "0 0 12px rgba(34,211,238,0.45), inset 0 0 6px rgba(34,211,238,0.15)",
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 3, ease: "linear" },
            default: { duration: 0.25 },
          }}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "2px solid rgba(34,211,238,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <motion.div
            animate={{
              background: dragging ? "#facc15" : "#22d3ee",
              boxShadow: dragging ? "0 0 8px #facc15" : "0 0 8px #22d3ee",
              scale: dragging ? 1.4 : 1,
            }}
            transition={{ duration: 0.2 }}
            style={{ width: 6, height: 6, borderRadius: "50%" }}
          />
        </motion.div>
        <motion.span
          animate={{ opacity: dragging ? 1 : 0, y: dragging ? 3 : -3 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "block", textAlign: "center", fontSize: "0.5rem",
            letterSpacing: "0.12em", color: "#facc15", marginTop: "3px", fontWeight: 700,
          }}
        >
          DRAG
        </motion.span>
      </motion.div>

      <motion.img
        src={src}
        className="hero-model-img"
        drag
        dragSnapToOrigin
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 120, bounceDamping: 14 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        style={{
          x: dragging ? undefined : smoothModelX,
          y: dragging ? undefined : smoothModelY,
          transformPerspective: 1200,
          cursor: "none",
          position: "relative",
          zIndex: dragging ? 9999 : 1,
          filter: dragging
            ? "drop-shadow(0 0 40px rgba(250,204,21,0.5)) drop-shadow(0 20px 60px rgba(0,0,0,0.8))"
            : "drop-shadow(0 40px 80px rgba(0,0,0,0.9))",
        }}
        animate={{ scale: dragging ? 1.08 : 1 }}
        whileTap={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        draggable={false}
        alt="Contact 3D"
      />
    </div>
  );
}

/* ================= DATA ================= */
const CONTACT_METHODS = [
  {
    icon: "💬", label: "WhatsApp", title: "Chat With Us",
    value: "+91 XXXXXXXXXX",
    desc: "Fastest response — we reply within minutes during business hours.",
    href: "https://wa.me/919316251193?text=Hi, I'd like to get in touch with RBC Solutions",
    color: "#22d3ee", cta: "Open WhatsApp",
  },
  {
    icon: "📧", label: "Email", title: "Send an Email",
    value: "hello@rbcsolutions.in",
    desc: "For detailed briefs, proposals, or partnership enquiries.",
    href: "mailto:hello@rbcsolutions.in",
    color: "#818cf8", cta: "Send Email",
  },
  {
    icon: "📍", label: "Location", title: "Our Office",
    value: "India",
    desc: "Remote-first team. We work with clients across India and globally.",
    href: null, color: "#34d399", cta: null,
  },
  {
    icon: "🕐", label: "Hours", title: "Working Hours",
    value: "Mon – Sat, 9am – 7pm IST",
    desc: "We're available on weekends for urgent client requests.",
    href: null, color: "#facc15", cta: null,
  },
];

const SERVICES = [
  "Web Design & Development",
  "Software & OTT Solutions",
  "Digital Marketing",
  "UI/UX Design",
  "CRM & Business Tools",
  "Other / Not Sure Yet",
];

const FAQS = [
  { q: "How quickly do you respond?", a: "WhatsApp messages are answered within minutes during business hours. Emails within 4–6 hours on working days." },
  { q: "Do you work with international clients?", a: "Yes — we work with clients globally. Payments, timelines, and communications are fully remote-friendly." },
  { q: "What's the best way to start a project?", a: "Send us a WhatsApp message with a brief about your project. We'll set up a free 20-minute discovery call from there." },
  { q: "Do you offer free consultations?", a: "Yes. Every new project starts with a free discovery call where we understand your goals and recommend the right solution." },
];

/* ================= CONTACT PAGE ================= */
export default function ContactUs() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ── REAL SUBMIT → posts to Google Apps Script as an inquiry ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      // Map contact form fields → CRM inquiry fields
      const params = new URLSearchParams({
        type: "inquiries",           // goes to Inquiries sheet
        source: "Website",           // so you know it came from the site
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        interest: formData.budget
          ? `${formData.service} | Budget: ${formData.budget}`
          : formData.service,
        notes: formData.message,
        status: "New",               // appears as "New" in your CRM
      });

      const res = await fetch(SCRIPT_URL, { method: "POST", body: params });
      const data = await res.json();

      if (!data.success) throw new Error(data.error || "Unknown error");

      setSubmitted(true);
    } catch (err) {
      setError("❌ Something went wrong: " + err.message + ". Please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-hero-content > *", {
        opacity: 0, y: 30, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.1,
      });
      gsap.from(".contact-method-card", {
        scrollTrigger: { trigger: ".contact-methods-grid", start: "top 80%", once: true },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out", stagger: 0.12,
      });
      gsap.from(".contact-form-wrap", {
        scrollTrigger: { trigger: ".contact-form-wrap", start: "top 80%", once: true },
        opacity: 0, x: -40, duration: 0.9, ease: "power3.out",
      });
      gsap.from(".contact-sidebar", {
        scrollTrigger: { trigger: ".contact-sidebar", start: "top 80%", once: true },
        opacity: 0, x: 40, duration: 0.9, ease: "power3.out",
      });
      gsap.from(".faq-item-contact", {
        scrollTrigger: { trigger: ".contact-faq-list", start: "top 80%", once: true },
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out", stagger: 0.12,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="hero-layout contact-hero-content" style={{ minHeight: "73vh" }}>
          <div className="hero-left">
            <p className="hero-eyebrow">Get In Touch</p>
            <div className="hero-title-block">
              <span className="hero-title-top">LET'S BUILD</span>
              <span className="hero-title-main">SOMETHING GREAT</span>
            </div>
            <p className="hero-highlight">We're a message away — always.</p>
            <p className="hero-description">
              Whether you have a project in mind, a question about our services,
              or just want to explore what's possible — we'd love to hear from you.
              Fast replies, no spam, no pressure.
            </p>
            <ul className="hero-bullets">
              <li>Response within 10 minutes on WhatsApp</li>
              <li>Free 20-minute discovery call for every new project</li>
              <li>Serving clients across India and globally</li>
            </ul>
            <div className="hero-cta-row">
              <a href="https://wa.me/919316251193?text=Hi, I'd like to discuss a project"
                className="btn-primary" target="_blank" rel="noreferrer">
                💬 WhatsApp Us Now
              </a>
              <a href="mailto:hello@rbcsolutions.in" className="btn-ghost">
                📧 Send an Email
              </a>
            </div>
          </div>
          <div className="hero-right">
            <Motion3DWrapper src={cont3d} />
          </div>
        </div>
      </section>

      {/* ── CONTACT METHODS ── */}
      <section className="contact-methods-section">
        <div className="contact-section-inner">
          <div className="section-header">
            <p className="section-kicker">Reach Us</p>
            <h2 className="section-title">Ways to Connect</h2>
            <p className="section-subtitle">
              Pick whatever works best for you — WhatsApp is fastest, email works great for detailed briefs.
            </p>
          </div>
          <div className="contact-methods-grid">
            {CONTACT_METHODS.map((method, i) => (
              <div className="contact-method-card" key={i} style={{ "--card-color": method.color }}>
                <div className="contact-method-icon-wrap">
                  <span className="contact-method-icon">{method.icon}</span>
                </div>
                <div className="contact-method-body">
                  <span className="contact-method-label" style={{ color: method.color }}>{method.label}</span>
                  <h3 className="contact-method-title">{method.title}</h3>
                  <p className="contact-method-value" style={{ color: method.color }}>{method.value}</p>
                  <p className="contact-method-desc">{method.desc}</p>
                </div>
                {method.href && (
                  <a href={method.href} className="contact-method-btn" target="_blank" rel="noreferrer"
                    style={{ borderColor: `${method.color}44`, color: method.color }}>
                    {method.cta} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section className="contact-form-section" ref={formRef}>
        <div className="contact-section-inner">
          <div className="contact-form-layout">

            {/* FORM */}
            <div className="contact-form-wrap">
              <div className="section-header" style={{ marginBottom: "1.6rem" }}>
                <p className="section-kicker">Project Brief</p>
                <h2 className="section-title">Tell Us About Your Project</h2>
                <p className="section-subtitle">
                  Fill in the details below — your message goes directly to our inquiry dashboard.
                </p>
              </div>

              {submitted ? (
                <div className="contact-success-box">
                  <div className="contact-success-icon">✅</div>
                  <h3>Message Received!</h3>
                  <p>
                    Your inquiry has been saved to our dashboard. We'll be in touch
                    very soon — usually within a few hours on business days.
                  </p>
                  <a href="https://wa.me/919316251193" className="btn-primary"
                    target="_blank" rel="noreferrer"
                    style={{ marginTop: "1rem", display: "inline-flex" }}>
                    Or ping us on WhatsApp for a faster reply
                  </a>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label className="contact-label">Your Name *</label>
                      <input className="contact-input" name="name" type="text"
                        placeholder="John Doe" value={formData.name}
                        onChange={handleChange} required />
                    </div>
                    <div className="contact-field">
                      <label className="contact-label">Email Address *</label>
                      <input className="contact-input" name="email" type="email"
                        placeholder="john@company.com" value={formData.email}
                        onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label className="contact-label">Phone / WhatsApp</label>
                      <input className="contact-input" name="phone" type="tel"
                        placeholder="+91 XXXXXXXXXX" value={formData.phone}
                        onChange={handleChange} />
                    </div>
                    <div className="contact-field">
                      <label className="contact-label">Service Needed *</label>
                      <select className="contact-input contact-select" name="service"
                        value={formData.service} onChange={handleChange} required>
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="contact-field">
                    <label className="contact-label">Budget Range</label>
                    <div className="contact-budget-row">
                      {["< ₹25K", "₹25K–₹75K", "₹75K–₹2L", "₹2L+", "Let's discuss"].map(b => (
                        <button type="button" key={b}
                          className={`contact-budget-btn${formData.budget === b ? " active" : ""}`}
                          onClick={() => setFormData({ ...formData, budget: b })}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="contact-field">
                    <label className="contact-label">Project Details *</label>
                    <textarea className="contact-input contact-textarea" name="message"
                      placeholder="Tell us about your project — what you need, timeline, and any specific requirements..."
                      value={formData.message} onChange={handleChange} required rows={5} />
                  </div>

                  {error && (
                    <p style={{ color: "#f87171", fontSize: "0.88rem", margin: "0" }}>{error}</p>
                  )}

                  <button type="submit" className="btn-primary contact-submit-btn" disabled={sending}>
                    {sending ? (
                      <span className="contact-sending">
                        <span className="contact-spinner" />
                        Sending to dashboard...
                      </span>
                    ) : "Send Message →"}
                  </button>

                  <p className="contact-form-note">
                    🔒 Your message goes directly to our private CRM. We never share your data.
                  </p>
                </form>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="contact-sidebar">
              <div className="contact-sidebar-card">
                <p className="contact-sidebar-kicker">Prefer instant chat?</p>
                <h3 className="contact-sidebar-title">WhatsApp Us Directly</h3>
                <p className="contact-sidebar-text">
                  Skip the form. Send us a message on WhatsApp with your project idea
                  and we'll respond in minutes.
                </p>
                <a href="https://wa.me/919316251193?text=Hi RBC, I'd like to discuss a project"
                  className="btn-primary" target="_blank" rel="noreferrer"
                  style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}>
                  💬 Open WhatsApp
                </a>
              </div>

              <div className="contact-sidebar-card">
                <p className="contact-sidebar-kicker">What we do</p>
                <h3 className="contact-sidebar-title">Our Services</h3>
                <ul className="contact-services-list">
                  {SERVICES.filter(s => s !== "Other / Not Sure Yet").map((s, i) => (
                    <li key={i}><span className="contact-services-dot" />{s}</li>
                  ))}
                </ul>
              </div>

              <div className="contact-sidebar-card contact-trust-card">
                <div className="contact-trust-row">
                  {[{ num: "250+", label: "Projects" }, { num: "3+", label: "Years" }, { num: "100%", label: "Confidential" }].map((t, i) => (
                    <div className="contact-trust-item" key={i}>
                      <span className="contact-trust-num">{t.num}</span>
                      <span className="contact-trust-label">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="contact-faq-section">
        <div className="contact-section-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">FAQ</p>
            <h2 className="section-title">Common Questions</h2>
            <p className="section-subtitle">Quick answers before you reach out.</p>
          </div>
          <div className="contact-faq-list">
            {FAQS.map((faq, i) => (
              <div className={`faq-item-contact${openFaq === i ? " open" : ""}`} key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-contact-header">
                  <span className="faq-contact-q">{faq.q}</span>
                  <span className="faq-contact-icon">{openFaq === i ? "−" : "+"}</span>
                </div>
                <div className="faq-contact-body"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="contact-cta-section">
        <div className="section-cta-inner">
          <div>
            <p className="cta-label">Ready to start?</p>
            <h2 className="cta-title">Let's turn your idea into reality.</h2>
            <p className="cta-subtitle">No long commitments. Start with a free 20-minute call.</p>
          </div>
          <div className="cta-actions">
            <a href="https://wa.me/919316251193" className="btn-primary" target="_blank" rel="noreferrer">WhatsApp Now</a>
            <a href="mailto:hello@rbcsolutions.in" className="btn-ghost">Email Us</a>
          </div>
        </div>
      </section>
    </>
  );
}