// src/pages/Careers.js
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import car3d from "../assets/car-3d.png";
import heroBg from "../assets/bg1.png";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */

const OPEN_ROLES = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full-Time",
    location: "Remote / Hybrid",
    department: "Engineering",
    tag: "Tech",
    tagColor: "#22d3ee",
    desc: "Build fast, responsive React interfaces for our clients' websites and internal tools. You'll work directly with the design and delivery teams.",
    skills: ["React", "JavaScript", "CSS", "Git"],
  },
  {
    id: 2,
    title: "Digital Marketing Executive",
    type: "Full-Time",
    location: "On-site",
    department: "Marketing",
    tag: "Marketing",
    tagColor: "#a78bfa",
    desc: "Plan and execute performance campaigns, manage social media, and drive lead generation for RBC and our client portfolio.",
    skills: ["SEO", "Google Ads", "Meta Ads", "Analytics"],
  },
  {
    id: 3,
    title: "Sales Executive",
    type: "Full-Time",
    location: "On-site / Remote",
    department: "Sales",
    tag: "Sales",
    tagColor: "#facc15",
    desc: "Identify, pitch, and close new clients for our web, software, and OTT services. Maintain a healthy pipeline using RBC CRM.",
    skills: ["B2B Sales", "Lead Gen", "CRM", "Communication"],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "Remote",
    department: "Design",
    tag: "Design",
    tagColor: "#34d399",
    desc: "Create wireframes, prototypes, and final design assets for client websites and internal dashboards. Figma-first workflow.",
    skills: ["Figma", "Wireframing", "Prototyping", "Branding"],
  },
  {
    id: 5,
    title: "OTT & Software Support Specialist",
    type: "Part-Time",
    location: "Remote",
    department: "Support",
    tag: "Support",
    tagColor: "#fb923c",
    desc: "Assist clients with OTT platform setup, account management, renewals, and software license queries via WhatsApp and email.",
    skills: ["OTT Platforms", "Customer Support", "Documentation", "Troubleshooting"],
  },
  {
    id: 6,
    title: "Business Development Intern",
    type: "Internship",
    location: "Hybrid",
    department: "BD",
    tag: "Internship",
    tagColor: "#38bdf8",
    desc: "Support the BD team in identifying new verticals, preparing proposals, and following up on qualified leads. Ideal for final-year students.",
    skills: ["Research", "Communication", "MS Office", "CRM Basics"],
  },
];

const PERKS = [
  { icon: "🚀", title: "Fast Growth", text: "We're a growing agency — your role expands as the business does. No stagnant job descriptions here." },
  { icon: "🕹️", title: "Remote Friendly", text: "Most roles offer remote or hybrid flexibility. Results matter more than where you sit." },
  { icon: "📊", title: "CRM-Tracked Work", text: "Every task, project, and delivery is tracked in RBC CRM — no confusion about priorities or deadlines." },
  { icon: "💬", title: "WhatsApp-First Culture", text: "Clear, fast communication. No long email chains. Updates and decisions happen quickly." },
  { icon: "🎓", title: "Skill Development", text: "Access to premium tools, licenses, and OTT platforms as part of your role — learn by doing." },
  { icon: "🤝", title: "Close-Knit Team", text: "Small team. Big ownership. Your work directly impacts the business and our clients every day." },
];

const PROCESS_STEPS = [
  { step: "01", title: "Apply Online", text: "Fill out the short application form or send your CV via WhatsApp with the role name." },
  { step: "02", title: "Quick Screening Call", text: "A 15–20 minute call to understand your background, expectations, and availability." },
  { step: "03", title: "Skills Task", text: "A short, practical task relevant to the role — no trick questions, just real work." },
  { step: "04", title: "Final Interview", text: "Meet the team lead and founder. We discuss your task, alignment, and next steps." },
  { step: "05", title: "Offer & Onboarding", text: "Clear offer letter, onboarding docs, and CRM access — you'll be set up and ready within 48 hours." },
];

/* ================= MOTION 3D WRAPPER (same as Home.js) ================= */

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
      const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.20;
      const rawOffsetY = (e.clientY - rect.top - rect.height / 2) * 0.20;
      const offsetY = Math.min(rawOffsetY, rect.height * 0.20);
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
    <div
      ref={slideRef}
      className="hero-tilt-zone"
      style={{ cursor: "none", position: "relative" }}
    >
      {/* Spinning cursor dot */}
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
            borderColor: dragging
              ? "rgba(250, 204, 21, 0.9)"
              : "rgba(34, 211, 238, 0.85)",
            boxShadow: dragging
              ? "0 0 16px rgba(250,204,21,0.55), inset 0 0 8px rgba(250,204,21,0.2)"
              : "0 0 12px rgba(34,211,238,0.45), inset 0 0 6px rgba(34,211,238,0.15)",
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 3, ease: "linear" },
            default: { duration: 0.25 },
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "2px solid rgba(34,211,238,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            display: "block",
            textAlign: "center",
            fontSize: "0.5rem",
            letterSpacing: "0.12em",
            color: "#facc15",
            marginTop: "3px",
            fontWeight: 700,
          }}
        >
          DRAG
        </motion.span>
      </motion.div>

      {/* 3D Model */}
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
        alt="Careers 3D"
      />
    </div>
  );
}

/* ================= JOB CARD ================= */

function JobCard({ role, index }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className="career-job-card"
      style={{ "--accent": role.tagColor, animationDelay: `${index * 0.1}s` }}
    >
      <div className="career-job-header" onClick={() => setOpen((v) => !v)}>
        <div className="career-job-left">
          <span
            className="career-job-tag"
            style={{ background: `${role.tagColor}18`, color: role.tagColor, border: `1px solid ${role.tagColor}44` }}
          >
            {role.tag}
          </span>
          <h3 className="career-job-title">{role.title}</h3>
          <div className="career-job-meta">
            <span>📍 {role.location}</span>
            <span>⏱ {role.type}</span>
            <span>🗂 {role.department}</span>
          </div>
        </div>
        <button
          className="career-expand-btn"
          aria-label={open ? "Collapse" : "Expand"}
          style={{ borderColor: open ? role.tagColor : undefined, color: open ? role.tagColor : undefined }}
        >
          {open ? "−" : "+"}
        </button>
      </div>

      <div className={`career-job-body ${open ? "career-job-body--open" : ""}`}>
        <p className="career-job-desc">{role.desc}</p>
        <div className="career-skills-row">
          {role.skills.map((s) => (
            <span
              className="career-skill-badge"
              key={s}
              style={{ borderColor: `${role.tagColor}55`, color: role.tagColor }}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="career-job-actions">
          <a
            href={`https://wa.me/919316251193?text=Hi, I'd like to apply for ${encodeURIComponent(role.title)}`}
            className="btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Apply via WhatsApp
          </a>
          <a href="mailto:careers@rbcsolutions.in" className="btn-ghost">
            Send CV by Email
          </a>
        </div>
      </div>
    </article>
  );
}

/* ================= CAREERS COMPONENT ================= */

export default function Careers() {
  const heroRef    = useRef(null);
  const perksRef   = useRef(null);
  const rolesRef   = useRef(null);
  const processRef = useRef(null);
  const ctaRef     = useRef(null);

  const [filter, setFilter] = useState("All");
  const departments = ["All", ...Array.from(new Set(OPEN_ROLES.map((r) => r.tag)))];
  const filtered    = filter === "All" ? OPEN_ROLES : OPEN_ROLES.filter((r) => r.tag === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".careers-hero-content > *", {
        opacity: 0, y: 30, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.1,
      });
      gsap.from(".careers-mini-chip", {
        opacity: 0, y: 10, duration: 0.6, ease: "power3.out", stagger: 0.08, delay: 0.5,
      });
      gsap.from(".careers-stat", {
        scrollTrigger: { trigger: ".careers-stats-row", start: "top 85%", once: true },
        opacity: 0, y: 24, duration: 0.7, ease: "power3.out", stagger: 0.15,
      });
      gsap.from(".perk-card", {
        scrollTrigger: { trigger: ".careers-perks-grid", start: "top 75%", once: true },
        opacity: 0, y: 50, duration: 0.9, ease: "power3.out", stagger: 0.14,
      });
      gsap.from(".career-process-step", {
        scrollTrigger: { trigger: ".career-process-list", start: "top 75%", once: true },
        opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.16,
      });
      gsap.utils.toArray(".section-header").forEach((header) => {
        gsap.fromTo(header,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: header, start: "top 85%", once: true } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── HERO — same structure as Home.js ── */}
      <section ref={heroRef} className="hero-section">

        {/* ← same bg1.png background as every other hero */}
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        <div className="hero-layout careers-hero-content" style={{ minHeight: "73vh" }}>

          {/* LEFT */}
          <div className="hero-left">
            <p className="hero-eyebrow">Join Our Team</p>

            <div className="hero-title-block">
              <span className="hero-title-top">BUILD YOUR</span>
              <span className="hero-title-main">CAREER WITH RBC</span>
            </div>

            <p className="hero-highlight">Real work. Real ownership. Real growth.</p>
            <p className="hero-description">
              We're a tight-knit team building digital products, software stacks,
              and OTT setups for businesses across India. If you love fast delivery
              and direct impact — you'll fit right in.
            </p>

            <ul className="hero-bullets">
              <li>Remote &amp; hybrid roles available</li>
              <li>CRM-tracked work — no confusion</li>
              <li>Grow with the business, not just within a title</li>
            </ul>

            <div className="hero-cta-row">
              <a href="#open-roles" className="btn-primary">View Open Roles</a>
              <a
                href="https://wa.me/919316251193?text=Hi, I'm interested in joining the RBC Solutions team"
                className="btn-ghost"
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Small culture chips */}
            <div className="careers-hero-chips-row">
              {[
                { icon: "🏗️", label: "Real Ownership" },
                { icon: "📱", label: "Remote Friendly" },
                { icon: "📈", label: "Fast Growth" },
                { icon: "🛠️", label: "Modern Stack" },
              ].map((chip, i) => (
                <span className="careers-mini-chip" key={i}>
                  {chip.icon} {chip.label}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — car-3d.png with full 3D interaction */}
          <div className="hero-right">
            <Motion3DWrapper src={car3d} />
          </div>

        </div>
      </section>

      {/* ── STATS ── */}
      <section className="careers-stats-section">
        <div className="careers-stats-row">
          {[
            { number: "12+",  label: "Team Members" },
            { number: "6",    label: "Open Roles" },
            { number: "3+",   label: "Years Building" },
            { number: "250+", label: "Projects Delivered" },
          ].map((s, i) => (
            <div className="careers-stat" key={i}>
              <h3>{s.number}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PERKS & CULTURE ── */}
      <section ref={perksRef} className="careers-perks-section">
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div className="section-header">
            <p className="section-kicker">Life at RBC</p>
            <h2 className="section-title">Why Work With Us?</h2>
            <p className="section-subtitle">
              Good work, clear communication, fast decisions — and a team that's
              genuinely invested in what they build.
            </p>
          </div>
          <div className="careers-perks-grid">
            {PERKS.map((perk, i) => (
              <div className="perk-card" key={i}>
                <span className="perk-icon">{perk.icon}</span>
                <div className="perk-content">
                  <h3>{perk.title}</h3>
                  <p>{perk.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section ref={rolesRef} id="open-roles" className="careers-roles-section">
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div className="section-header">
            <p className="section-kicker">Current Openings</p>
            <h2 className="section-title">Open Roles at RBC Solutions</h2>
            <p className="section-subtitle">
              Click a role to see full details and apply directly via WhatsApp or
              email — no portals, no delay.
            </p>
          </div>

          <div className="careers-filter-bar">
            {departments.map((dept) => (
              <button
                key={dept}
                className={`careers-filter-btn${filter === dept ? " active" : ""}`}
                onClick={() => setFilter(dept)}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="careers-roles-list">
            {filtered.map((role, i) => (
              <JobCard key={role.id} role={role} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION PROCESS ── */}
      <section ref={processRef} className="careers-process-section">
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div className="section-header">
            <p className="section-kicker">How It Works</p>
            <h2 className="section-title">Our Hiring Process</h2>
            <p className="section-subtitle">
              Five straightforward steps — no ghosting, no confusion. From first
              message to first day, we keep you informed the whole way.
            </p>
          </div>

          <div className="career-process-list">
            {PROCESS_STEPS.map((step, i) => (
              <div className="career-process-step" key={i}>
                <span className="career-step-num">{step.step}</span>
                <div className="career-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN APPLICATION CALLOUT ── */}
      <section className="careers-open-callout">
        <div className="careers-callout-inner">
          <div>
            <p className="careers-callout-label">Don't see your role?</p>
            <h3 className="careers-callout-title">Send Us an Open Application</h3>
            <p className="careers-callout-text">
              We're always on the lookout for talented people in design, tech,
              content, and ops. Tell us what you're good at and we'll be in touch.
            </p>
          </div>
          <div className="cta-actions">
            <a
              href="https://wa.me/919316251193?text=Hi, I'd like to send an open application to RBC Solutions"
              className="btn-primary"
              target="_blank"
              rel="noreferrer"
            >WhatsApp Us</a>
        <a href="mailto:careers@rbcsolutions.in" className="btn-ghost">Email Your CV</a>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section ref={ctaRef} className="careers-cta-section">
        <div className="section-cta-inner" style={{ maxWidth: "var(--page-inner-max)", margin: "0 auto" }}>
          <div>
            <p className="cta-label">Ready to apply?</p>
            <h2 className="cta-title">Let's build something great — together.</h2>
            <p className="cta-subtitle">
              Browse open roles or drop us a message on WhatsApp. We respond fast.
            </p>
          </div>
          <div className="cta-actions">
            <a href="#open-roles" className="btn-primary">See Open Roles</a>
            <Link to="/contact" className="btn-ghost">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}