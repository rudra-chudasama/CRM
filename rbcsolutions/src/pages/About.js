// src/pages/About.js
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import about3d from "../assets/abt-3d.png";
import heroBg from "../assets/bg1.png";

gsap.registerPlugin(ScrollTrigger);

/* ================= MOTION 3D COMPONENT ================= */
function Motion3DWrapper({ src }) {
  const slideRef = useRef(null);
  const [hovered, setHovered] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);

  // Cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothCursorX = useSpring(cursorX, { stiffness: 200, damping: 22 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 200, damping: 22 });

  // Model follow position (trails behind cursor)
  const modelX = useMotionValue(0);
  const modelY = useMotionValue(0);
  const smoothModelX = useSpring(modelX, { stiffness: 80, damping: 18 });
  const smoothModelY = useSpring(modelY, { stiffness: 80, damping: 18 });

  useEffect(() => {
    function handleMouseMove(e) {
      if (!slideRef.current) return;
      const rect = slideRef.current.getBoundingClientRect();

      // Cursor dot — exact mouse position
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);

      // Model follows cursor — 20% of distance from center
      const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.20;

      // Clamp Y so model never goes below into next section
      const rawOffsetY = (e.clientY - rect.top - rect.height / 2) * 0.20;
      const offsetY = Math.min(rawOffsetY, rect.height * 0.20);

      modelX.set(offsetX);
      modelY.set(offsetY);
    }
    function handleEnter() {
      setHovered(true);
    }
    function handleLeave() {
      cursorX.set(-100);
      cursorY.set(-100);
      modelX.set(0); // model eases back to center
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
      {/* Blue spinning cursor dot */}
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
          FREE
        </motion.span>
      </motion.div>

      {/* 3D Model — follows cursor on hover, free drag on click, snaps back on release */}
      <motion.img
        src={src}
        className="hero-model-img"
        drag
        dragSnapToOrigin
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 120, bounceDamping: 14 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onHoverStart={() => {}}
        onHoverEnd={() => {}}
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
        alt="About RBC Solutions"
      />
    </div>
  );
}

export default function About() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".about-hero-model",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );

      gsap.from(".story-card", {
        scrollTrigger: { trigger: ".about-story", start: "top 75%", once: true },
        opacity: 0, y: 50, duration: 0.8, ease: "power3.out", stagger: 0.2,
      });

      gsap.from(".page-card", {
        scrollTrigger: { trigger: ".page-card-grid", start: "top 75%", once: true },
        opacity: 0, y: 50, duration: 0.8, ease: "power3.out", stagger: 0.15,
      });

      gsap.from(".value-card", {
        scrollTrigger: { trigger: ".about-values", start: "top 75%", once: true },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out", stagger: 0.15,
      });

      gsap.from(".page-column", {
        scrollTrigger: { trigger: ".page-body--split", start: "top 75%", once: true },
        opacity: 0,
        x: (index) => (index === 0 ? -40 : 40),
        duration: 0.9, ease: "power3.out", stagger: 0.2,
      });

      gsap.from(".team-card", {
        scrollTrigger: { trigger: ".about-team", start: "top 75%", once: true },
        opacity: 0, scale: 0.9, duration: 0.7, ease: "power2.out", stagger: 0.12,
      });

      gsap.from(".page-highlight-box", {
        scrollTrigger: { trigger: ".page-highlight-box", start: "top 80%", once: true },
        opacity: 0, y: 40, duration: 0.9, ease: "power3.out",
      });

      gsap.fromTo(
        ".about-cta-inner",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".about-cta", start: "top 80%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* PAGE HEADER WITH 3D MODEL */}
      <section className="hero-section about-hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />

        <div className="hero-layout">
          <div className="hero-left about-hero-content">
            <p className="hero-eyebrow">{"//"} About RBC Solutions</p>

            <div className="hero-title-block">
              <span className="hero-title-top">ABOUT</span>
              <span className="hero-title-main">US</span>
            </div>

            <p className="hero-highlight">
              Building Digital Solutions That Actually Work
            </p>

            <p className="hero-description">
              RBC Solutions is a full-service digital agency specializing in web
              development, software licensing, and OTT platform management. We
              help businesses scale with reliable tech infrastructure and
              organized systems powered by our custom RBC CRM.
            </p>

            <ul className="hero-bullets">
              <li>Custom CRM integrated with Google Sheets</li>
              <li>End-to-end web development services</li>
              <li>Genuine software licenses & OTT solutions</li>
            </ul>

            <div className="hero-cta-row">
              <Link to="/contact" className="btn-primary">Get Started</Link>
              <Link to="/software-ott" className="btn-ghost">View Services</Link>
            </div>
          </div>

          <div className="hero-right about-hero-model">
            <Motion3DWrapper src={about3d} />
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="page section about-story">
        <div className="page-inner">
          <div className="section-header">
            <p className="section-kicker">Our Story</p>
            <h2 className="section-title">How RBC Solutions Started</h2>
            <p className="section-subtitle">
              We began with a simple observation: businesses lose time, money,
              and leads because their digital systems are scattered, outdated,
              or non-existent.
            </p>
          </div>

          <div className="page-two-col" style={{ marginTop: "40px" }}>
            <div className="story-card">
              <h3 className="page-subtitle">The Problem We Saw</h3>
              <p className="page-text">
                Small and medium businesses were juggling random software
                subscriptions, outdated websites, and no clear system to track
                clients or renewals. Every inquiry was lost in email threads or
                WhatsApp chats. No organization, no tracking, no visibility into
                what was working or what needed attention.
              </p>
            </div>

            <div className="story-card">
              <h3 className="page-subtitle">Our Solution</h3>
              <p className="page-text">
                We built RBC CRM—a lightweight, practical system integrated with
                Google Sheets that tracks every lead, project, renewal, and
                client detail. Combined with fast websites and verified software
                licenses, we created a complete digital foundation for
                businesses that actually want to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="page section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">What We Do</p>
            <h2 className="section-title">Our Core Services</h2>
          </div>

          <div className="page-card-grid">
            <div className="page-card">
              <h3 className="page-card-title">🌐 Web Development</h3>
              <p className="page-text">
                We build websites that convert visitors into clients. Clean
                layouts, fast loading speeds, mobile-first design, and clear
                calls-to-action—focused on results, not just aesthetics.
              </p>
            </div>

            <div className="page-card">
              <h3 className="page-card-title">💾 Software & OTT Solutions</h3>
              <p className="page-text">
                Genuine software licenses for design, development, productivity,
                and security tools. We also manage OTT platform setups,
                renewals, and multi-user configurations for businesses.
              </p>
            </div>

            <div className="page-card">
              <h3 className="page-card-title">📊 RBC CRM System</h3>
              <p className="page-text">
                Our custom CRM tracks every lead, client, project stage, and
                renewal date. Integrated with Google Sheets, it gives you
                organized, accessible, and reliable business tracking in one
                system.
              </p>
            </div>

            <div className="page-card">
              <h3 className="page-card-title">🛠️ Maintenance & Support</h3>
              <p className="page-text">
                Ongoing website updates, security monitoring, performance
                optimization, and troubleshooting. We keep your digital
                infrastructure running smoothly 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="page section about-values">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Our Values</p>
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle">
              These principles guide every project, client relationship, and
              decision we make.
            </p>
          </div>

          <div className="why-grid">
            <div className="value-card why-card">
              <div className="why-content">
                <h3>Transparency First</h3>
                <p>
                  No hidden costs, no confusing jargon. We give you clear
                  timelines, fixed pricing, and honest communication from the
                  first message to final delivery.
                </p>
              </div>
            </div>

            <div className="value-card why-card">
              <div className="why-content">
                <h3>Results Over Flash</h3>
                <p>
                  We focus on what actually works—conversion-focused websites,
                  organized systems, and genuine software licenses. Your
                  business needs tools that perform, not just look good.
                </p>
              </div>
            </div>

            <div className="value-card why-card">
              <div className="why-content">
                <h3>Long-Term Partnership</h3>
                <p>
                  We're not a one-time vendor. Our goal is to become your
                  long-term tech partner, handling renewals, updates, support,
                  and growth as your business scales.
                </p>
              </div>
            </div>

            <div className="value-card why-card">
              <div className="why-content">
                <h3>Organized Systems</h3>
                <p>
                  Every client is tracked in RBC CRM. Every renewal is logged.
                  Every project stage is recorded. We build organized systems
                  because that's how reliable businesses operate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="page section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Our Process</p>
            <h2 className="section-title">How We Work With You</h2>
          </div>

          <div className="page-body page-body--split">
            <div className="page-column">
              <div style={{ marginBottom: "30px" }}>
                <h3 className="page-subtitle">1. Discovery Call</h3>
                <p className="page-text">
                  We start with a conversation—understanding your business, your
                  challenges, and what you need. No sales pitch, just honest
                  discussion about what works.
                </p>
              </div>

              <div style={{ marginBottom: "30px" }}>
                <h3 className="page-subtitle">2. Clear Proposal</h3>
                <p className="page-text">
                  You'll receive a detailed proposal with scope, timeline, and
                  fixed pricing. Everything is written down—no surprises later.
                </p>
              </div>

              <div>
                <h3 className="page-subtitle">3. Organized Execution</h3>
                <p className="page-text">
                  Your project is logged in RBC CRM. You'll get regular
                  WhatsApp or email updates as we hit milestones. Fast,
                  focused, and professional.
                </p>
              </div>
            </div>

            <div className="page-column">
              <div style={{ marginBottom: "30px" }}>
                <h3 className="page-subtitle">4. Quality Delivery</h3>
                <p className="page-text">
                  We deliver websites, software setups, or OTT configurations
                  that actually work. Clean, tested, and ready to use from day
                  one.
                </p>
              </div>

              <div style={{ marginBottom: "30px" }}>
                <h3 className="page-subtitle">5. Ongoing Support</h3>
                <p className="page-text">
                  After delivery, we continue providing maintenance, updates,
                  renewals, and troubleshooting. You're not left on your own.
                </p>
              </div>

              <div>
                <h3 className="page-subtitle">6. Long-Term Growth</h3>
                <p className="page-text">
                  As your business scales, we're here to handle upgrades,
                  expansions, and new requirements. Your tech partner for the
                  long run.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="page section about-team">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Who We Serve</p>
            <h2 className="section-title">Businesses We Work With</h2>
            <p className="section-subtitle">
              From first-time founders to established enterprises, we support
              businesses at every stage.
            </p>
          </div>

          <div className="industries-grid">
            <div className="team-card industry-card">
              <div className="industry-icon">🚀</div>
              <h3 className="industry-label">Startups</h3>
              <p className="page-text" style={{ fontSize: "14px", marginTop: "10px" }}>
                Fast websites, basic tools, and guidance on which software you
                actually need to get started without wasting your budget.
              </p>
            </div>

            <div className="team-card industry-card">
              <div className="industry-icon">🏢</div>
              <h3 className="industry-label">Small Businesses</h3>
              <p className="page-text" style={{ fontSize: "14px", marginTop: "10px" }}>
                Upgraded websites, organized systems, and managed licenses to
                scale operations professionally.
              </p>
            </div>

            <div className="team-card industry-card">
              <div className="industry-icon">🏗️</div>
              <h3 className="industry-label">Enterprises</h3>
              <p className="page-text" style={{ fontSize: "14px", marginTop: "10px" }}>
                Multi-team support, centralized tracking, and reliable renewals
                managed through RBC CRM.
              </p>
            </div>

            <div className="team-card industry-card">
              <div className="industry-icon">🎯</div>
              <h3 className="industry-label">Agencies</h3>
              <p className="page-text" style={{ fontSize: "14px", marginTop: "10px" }}>
                White-label services—we handle websites, software, and OTT
                setups for your clients under your brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE RBC */}
      <section className="page section">
        <div className="page-inner">
          <div className="page-highlight-box">
            <h3 className="page-highlight-title">
              Why Businesses Choose RBC Solutions
            </h3>
            <p className="page-text">
              You're not just buying a website or software license—you're
              getting a long-term tech partner with an internal CRM tracking
              every client, project, and renewal. We focus on building organized
              systems that support your business growth, not just delivering
              one-time projects.
            </p>
            <p className="page-text">
              Every lead is logged. Every renewal is tracked. Every support
              request is handled. That's how professional businesses operate, and
              that's what we deliver.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-cta about-cta">
        <div className="page-inner page-inner--no-border">
          <div className="section-cta-inner about-cta-inner">
            <div>
              <p className="cta-label">Ready to Get Started?</p>
              <h2 className="cta-title">Let's Build Your Digital Foundation</h2>
              <p className="cta-subtitle">
                Share your requirements and we'll respond with a clear plan,
                timeline, and pricing. No pressure, just honest conversation.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">Contact Us</Link>
              <Link to="/software-ott" className="btn-ghost">View Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}