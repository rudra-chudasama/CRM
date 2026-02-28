// src/pages/WebSolutions.js
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import web3d from "../assets/web-3d.png";
import heroBg from "../assets/bg1.png";

gsap.registerPlugin(ScrollTrigger);

/* ================= MOTION 3D COMPONENT (identical to Home) ================= */
function Motion3DWrapper({ src }) {
  const slideRef = useRef(null);
  const [hovered, setHovered] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);

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
    <div ref={slideRef} className="hero-tilt-zone" style={{ cursor: "none", position: "relative" }}>
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
          FREE
        </motion.span>
      </motion.div>

      {/* 3D draggable model */}
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
        alt="Web Solutions"
      />
    </div>
  );
}

/* ================= WEB SOLUTIONS PAGE ================= */
export default function WebSolutions() {

  useEffect(() => {
    const ctx = gsap.context(() => {

      // NOTE: No GSAP on hero — hero-left CSS class has heroTextUp keyframe built-in

      gsap.from(".ws-type-card", {
        scrollTrigger: { trigger: ".ws-types-section", start: "top 75%", once: true },
        opacity: 0, y: 50, duration: 0.8, ease: "power3.out", stagger: 0.15,
      });

      gsap.from(".ws-process-step", {
        scrollTrigger: { trigger: ".ws-process-section", start: "top 75%", once: true },
        opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.2,
      });

      gsap.from(".ws-why-card", {
        scrollTrigger: { trigger: ".ws-why-section", start: "top 75%", once: true },
        opacity: 0, scale: 0.9, duration: 0.7, ease: "power2.out", stagger: 0.12,
      });

      gsap.from(".ws-tech-badge", {
        scrollTrigger: { trigger: ".ws-tech-section", start: "top 80%", once: true },
        opacity: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.06,
      });

      gsap.from(".ws-portfolio-card", {
        scrollTrigger: { trigger: ".ws-portfolio-section", start: "top 75%", once: true },
        opacity: 0, y: 50, duration: 0.8, ease: "power3.out", stagger: 0.15,
      });

      gsap.from(".ws-benefit-card", {
        scrollTrigger: { trigger: ".ws-benefits-section", start: "top 75%", once: true },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out", stagger: 0.15,
      });

      gsap.from(".ws-pricing-card", {
        scrollTrigger: { trigger: ".ws-pricing-section", start: "top 75%", once: true },
        opacity: 0, y: 50, duration: 0.8, ease: "power3.out", stagger: 0.2,
      });

      gsap.from(".ws-highlight-box", {
        scrollTrigger: { trigger: ".ws-highlight-box", start: "top 80%", once: true },
        opacity: 0, y: 40, duration: 0.9, ease: "power3.out",
      });

      gsap.from(".ws-faq-item", {
        scrollTrigger: { trigger: ".ws-faq-section", start: "top 80%", once: true },
        opacity: 0, y: 30, duration: 0.6, ease: "power2.out", stagger: 0.12,
      });

      gsap.fromTo(
        ".ws-cta-inner",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".ws-cta", start: "top 80%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── HERO ─── */}
      {/*
        Uses: hero-section + about-hero-section (gives min-height: 72vh)
        hero-left already has "animation: heroTextUp" via global CSS — no GSAP needed here
        hero-right already has flex centering via global CSS
      */}
      <section className="hero-section about-hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />

        <div className="hero-layout">
          <div className="hero-left">
            <p className="hero-eyebrow">{"//"} Web Design & Development</p>

            <div className="hero-title-block">
              <span className="hero-title-top">WEB</span>
              <span className="hero-title-main">SOLUTIONS</span>
            </div>

            <p className="hero-highlight">
              Websites Built to Convert, Not Just Look Good
            </p>

            <p className="hero-description">
              We design and build fast, responsive websites for businesses that
              want real results. From landing pages to full business sites—every
              project is mobile-first, conversion-focused, and tracked in RBC CRM
              for transparent delivery.
            </p>

            <ul className="hero-bullets">
              <li>Mobile-first, fast-loading websites</li>
              <li>WhatsApp & enquiry form integration</li>
              <li>Full project tracking via RBC CRM</li>
            </ul>

            <div className="hero-cta-row">
              <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
              <Link to="/about" className="btn-ghost">Learn More</Link>
            </div>
          </div>

          <div className="hero-right">
            <Motion3DWrapper src={web3d} />
          </div>
        </div>
      </section>

      {/* ─── WEBSITE TYPES ─── */}
      <section className="page section ws-types-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">What We Build</p>
            <h2 className="section-title">Website Types We Deliver</h2>
            <p className="section-subtitle">
              From single-page landing pages to complex multi-section business sites—we
              match the right solution to your goals and budget.
            </p>
          </div>

          <div className="page-card-grid">
            <div className="page-card ws-type-card">
              <h3 className="page-card-title">🚀 Landing Pages</h3>
              <p className="page-text">
                High-converting single-page sites built for campaigns, product
                launches, and ad traffic. Fast to deploy, sharp on mobile.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Lead capture forms & WhatsApp CTA</li>
                <li>Campaign-ready in days</li>
                <li>A/B-friendly structure</li>
              </ul>
            </div>

            <div className="page-card ws-type-card">
              <h3 className="page-card-title">🏢 Business Websites</h3>
              <p className="page-text">
                Multi-section websites for service businesses and agencies that need
                a professional online presence with clear navigation and CTAs.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Services, About & Contact pages</li>
                <li>Google Maps & location integration</li>
                <li>SEO-ready structure</li>
              </ul>
            </div>

            <div className="page-card ws-type-card">
              <h3 className="page-card-title">🛒 E-Commerce Stores</h3>
              <p className="page-text">
                Product catalogues, online shops, and order management with payment
                gateway integration and mobile-optimized checkout flows.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Product listings & cart system</li>
                <li>Razorpay / UPI integration</li>
                <li>Order tracking & admin panel</li>
              </ul>
            </div>

            <div className="page-card ws-type-card">
              <h3 className="page-card-title">🎨 Portfolio & Creative</h3>
              <p className="page-text">
                Visual-first websites for designers, photographers, and creative
                professionals who need their work to speak louder than words.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Gallery & project showcases</li>
                <li>Smooth animations & transitions</li>
                <li>Social & Behance integration</li>
              </ul>
            </div>

            <div className="page-card ws-type-card">
              <h3 className="page-card-title">📋 Web Applications</h3>
              <p className="page-text">
                Custom web apps with user authentication, dashboards, data
                management, and API integrations for businesses that need more
                than a brochure site.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Login systems & user roles</li>
                <li>Admin dashboards & CRM panels</li>
                <li>REST API & third-party integrations</li>
              </ul>
            </div>

            <div className="page-card ws-type-card">
              <h3 className="page-card-title">📰 Blogs & Content Sites</h3>
              <p className="page-text">
                SEO-optimised content platforms and news portals with easy-to-manage
                CMS backends for non-technical teams.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>WordPress & headless CMS</li>
                <li>Category & tag management</li>
                <li>Newsletter & subscription forms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="page section ws-process-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">How It Works</p>
            <h2 className="section-title">Our Web Development Process</h2>
            <p className="section-subtitle">
              A clear, structured process from first conversation to final launch—with
              every milestone tracked in RBC CRM.
            </p>
          </div>

          <div className="page-body page-body--split">
            <div className="page-column">
              <div className="ws-process-step" style={{ marginBottom: "30px" }}>
                <h3 className="page-subtitle">1. Discovery & Requirements</h3>
                <p className="page-text">
                  We start with a conversation about your business, target audience,
                  and goals. No templates, no guesswork—we define exactly what your
                  website needs to achieve before writing a single line of code.
                </p>
              </div>
              <div className="ws-process-step" style={{ marginBottom: "30px" }}>
                <h3 className="page-subtitle">2. Wireframe & Design</h3>
                <p className="page-text">
                  We create wireframes and design mockups for your approval. Layout,
                  colors, typography, and content structure finalized before
                  development begins—zero surprises later.
                </p>
              </div>
              <div className="ws-process-step">
                <h3 className="page-subtitle">3. Development & Build</h3>
                <p className="page-text">
                  Your site is built with clean, optimized code using React, PHP,
                  WordPress, or the right stack—always mobile-first with
                  performance as a priority.
                </p>
              </div>
            </div>

            <div className="page-column">
              <div className="ws-process-step" style={{ marginBottom: "30px" }}>
                <h3 className="page-subtitle">4. Review & Revisions</h3>
                <p className="page-text">
                  You get a live preview link to review the website. We collect your
                  feedback and apply revisions until everything looks and works
                  exactly the way you want.
                </p>
              </div>
              <div className="ws-process-step" style={{ marginBottom: "30px" }}>
                <h3 className="page-subtitle">5. Launch & Go Live</h3>
                <p className="page-text">
                  We handle domain setup, hosting deployment, SSL certificates,
                  and final testing across all devices before going live.
                </p>
              </div>
              <div className="ws-process-step">
                <h3 className="page-subtitle">6. Maintenance & Support</h3>
                <p className="page-text">
                  Post-launch we monitor performance, apply security updates, and
                  handle any changes you need. Everything logged in RBC CRM for
                  full transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="page section ws-why-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Why Choose Us</p>
            <h2 className="section-title">Why Businesses Choose RBC for Web</h2>
          </div>

          <div className="why-grid">
            <div className="why-card ws-why-card">
              <div className="why-content">
                <h3>Conversion-Focused Design</h3>
                <p>
                  Every layout element—buttons, forms, and CTAs—is placed to drive
                  action. We build sites that bring in real enquiries and leads,
                  not just pretty pages.
                </p>
              </div>
            </div>
            <div className="why-card ws-why-card">
              <div className="why-content">
                <h3>Fast Delivery</h3>
                <p>
                  Most landing pages ship within 5–7 days. Full business websites
                  in 2–3 weeks. We move fast without cutting corners, thanks to
                  a well-practiced process and clear communication.
                </p>
              </div>
            </div>
            <div className="why-card ws-why-card">
              <div className="why-content">
                <h3>RBC CRM Tracked</h3>
                <p>
                  Every project is logged with milestones, deadlines, and revision
                  notes. You'll always know exactly where your project stands—no
                  chasing, no confusion.
                </p>
              </div>
            </div>
            <div className="why-card ws-why-card">
              <div className="why-content">
                <h3>Mobile-First Always</h3>
                <p>
                  Over 70% of web traffic is mobile. Every site we build is designed
                  mobile-first and tested across all screen sizes and devices before
                  going live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="page section ws-tech-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Technology</p>
            <h2 className="section-title">Tools & Technologies We Use</h2>
            <p className="section-subtitle">
              We use the right tool for the right job—no bloated frameworks,
              no unnecessary complexity.
            </p>
          </div>

          <div className="ws-tech-categories">
            <div className="ws-tech-group">
              <p className="ws-tech-group-label">Frontend</p>
              <div className="ws-tech-row">
                {["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Framer Motion"].map((t, i) => (
                  <span key={i} className="ws-tech-badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="ws-tech-group">
              <p className="ws-tech-group-label">Backend</p>
              <div className="ws-tech-row">
                {["Node.js", "PHP", "MySQL", "Firebase", "REST APIs", "MongoDB"].map((t, i) => (
                  <span key={i} className="ws-tech-badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="ws-tech-group">
              <p className="ws-tech-group-label">CMS & Platforms</p>
              <div className="ws-tech-row">
                {["WordPress", "Webflow", "WooCommerce", "Shopify", "Ghost CMS"].map((t, i) => (
                  <span key={i} className="ws-tech-badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="ws-tech-group">
              <p className="ws-tech-group-label">Tools & Design</p>
              <div className="ws-tech-row">
                {["Figma", "Adobe XD", "Lighthouse", "Google Analytics", "Hotjar", "cPanel"].map((t, i) => (
                  <span key={i} className="ws-tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO SHOWCASE ─── */}
      <section className="page section ws-portfolio-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Our Work</p>
            <h2 className="section-title">Projects We've Delivered</h2>
            <p className="section-subtitle">
              A snapshot of website types we've built for clients across different
              industries and business sizes.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card ws-portfolio-card">
              <div className="service-tag">Landing Page</div>
              <h3>Real Estate Agency — Lead Gen</h3>
              <p>
                A high-converting single-page site for a real estate agency with
                WhatsApp lead capture and property enquiry forms synced with Google
                Sheets CRM.
              </p>
              <ul className="service-points">
                <li>240% increase in enquiry volume</li>
                <li>5-day delivery from brief to live</li>
                <li>WhatsApp & CRM integration</li>
              </ul>
            </div>

            <div className="service-card ws-portfolio-card">
              <div className="service-tag">Business Website</div>
              <h3>Chartered Accountancy Firm</h3>
              <p>
                A professional multi-page site with services listings, team profiles,
                client testimonials, and a secure document upload system for clients.
              </p>
              <ul className="service-points">
                <li>Services, team & contact pages</li>
                <li>Secure client document portal</li>
                <li>SEO-optimised structure</li>
              </ul>
            </div>

            <div className="service-card ws-portfolio-card">
              <div className="service-tag">E-Commerce</div>
              <h3>Apparel Brand — Online Store</h3>
              <p>
                A full WooCommerce store with product variants, Razorpay payment
                gateway, size charts, and a custom order tracking page.
              </p>
              <ul className="service-points">
                <li>Product catalogue with variants</li>
                <li>Razorpay & UPI payment integration</li>
                <li>Order tracking & email alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section className="page section ws-benefits-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Included With Every Project</p>
            <h2 className="section-title">What's Always Included</h2>
          </div>

          <div className="business-grid">
            <div className="business-card ws-benefit-card">
              <div className="business-number">01</div>
              <div className="business-main">
                <h3 className="business-title">Responsive Design</h3>
                <p className="business-text">
                  Fully tested across mobile, tablet, and desktop. No broken layouts,
                  no pinch-to-zoom. Clean, responsive design on every screen size.
                </p>
              </div>
            </div>
            <div className="business-card ws-benefit-card">
              <div className="business-number">02</div>
              <div className="business-main">
                <h3 className="business-title">Performance Optimization</h3>
                <p className="business-text">
                  Compressed images, clean code, and CDN delivery. Your site loads
                  fast—because every second of delay costs you visitors and rankings.
                </p>
              </div>
            </div>
            <div className="business-card ws-benefit-card">
              <div className="business-number">03</div>
              <div className="business-main">
                <h3 className="business-title">SSL & Security Setup</h3>
                <p className="business-text">
                  HTTPS certificates, secure forms, basic firewall rules, and spam
                  protection—all configured before your site goes live.
                </p>
              </div>
            </div>
            <div className="business-card ws-benefit-card">
              <div className="business-number">04</div>
              <div className="business-main">
                <h3 className="business-title">Basic SEO Setup</h3>
                <p className="business-text">
                  Meta titles, descriptions, sitemap, robots.txt, and Google Search
                  Console submission included with every website we build.
                </p>
              </div>
            </div>
            <div className="business-card ws-benefit-card">
              <div className="business-number">05</div>
              <div className="business-main">
                <h3 className="business-title">WhatsApp & Form Integration</h3>
                <p className="business-text">
                  Click-to-WhatsApp buttons, enquiry forms, and email notifications
                  so every visitor has a fast way to reach you.
                </p>
              </div>
            </div>
            <div className="business-card ws-benefit-card">
              <div className="business-number">06</div>
              <div className="business-main">
                <h3 className="business-title">30-Day Post-Launch Support</h3>
                <p className="business-text">
                  Bug fixes, minor content updates, and technical support for 30 days
                  after launch—at no extra charge. Your site works, or we fix it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="page section ws-pricing-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Pricing</p>
            <h2 className="section-title">Clear, Fixed Pricing. No Surprises.</h2>
            <p className="section-subtitle">
              Every quote is project-specific and fully transparent. You'll know
              exactly what you're paying before we start.
            </p>
          </div>

          <div className="page-card-grid">
            <div className="page-card ws-pricing-card">
              <h3 className="page-card-title">⚡ Starter</h3>
              <p className="page-text">
                Best for freelancers and small businesses that need a clean, fast
                landing page to capture leads and build an online presence.
              </p>
              <ul className="page-list" style={{ marginTop: "0.7rem" }}>
                <li>1–3 page website or landing page</li>
                <li>Mobile responsive design</li>
                <li>WhatsApp / contact form</li>
                <li>Basic SEO setup</li>
                <li>30-day support</li>
              </ul>
              <p className="page-text" style={{ marginTop: "0.8rem", fontWeight: "600", color: "var(--gold)" }}>
                Contact for pricing
              </p>
            </div>

            <div className="page-card ws-pricing-card" style={{ border: "1px solid rgba(56,189,248,0.5)" }}>
              <h3 className="page-card-title">🚀 Business</h3>
              <p className="page-text">
                For growing businesses that need a full multi-page site with service
                pages, team info, testimonials, and CRM-ready lead capture.
              </p>
              <ul className="page-list" style={{ marginTop: "0.7rem" }}>
                <li>5–10 page business website</li>
                <li>Custom design & animations</li>
                <li>CRM-integrated enquiry forms</li>
                <li>Google Analytics setup</li>
                <li>Blog or news section</li>
                <li>60-day support</li>
              </ul>
              <p className="page-text" style={{ marginTop: "0.8rem", fontWeight: "600", color: "var(--gold)" }}>
                Most Popular — Contact for pricing
              </p>
            </div>

            <div className="page-card ws-pricing-card">
              <h3 className="page-card-title">🏗️ Enterprise</h3>
              <p className="page-text">
                Custom web applications, large-scale e-commerce, or complex platforms
                with admin panels, APIs, and advanced feature sets.
              </p>
              <ul className="page-list" style={{ marginTop: "0.7rem" }}>
                <li>Custom web application</li>
                <li>User auth & admin dashboards</li>
                <li>Payment gateway integration</li>
                <li>Third-party API integrations</li>
                <li>Dedicated project manager</li>
                <li>90-day support</li>
              </ul>
              <p className="page-text" style={{ marginTop: "0.8rem", fontWeight: "600", color: "var(--gold)" }}>
                Custom enterprise pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="page section ws-industries-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Industries</p>
            <h2 className="section-title">Industries We've Built For</h2>
          </div>

          <div className="industries-grid" style={{ marginTop: "1.5rem" }}>
            {[
              { icon: "🏠", label: "Real Estate" },
              { icon: "⚖️", label: "Legal & CA Firms" },
              { icon: "🩺", label: "Healthcare" },
              { icon: "🎓", label: "Education" },
              { icon: "🛍️", label: "Retail & E-Commerce" },
              { icon: "🎬", label: "Media & Entertainment" },
              { icon: "🚚", label: "Logistics" },
              { icon: "💼", label: "Agencies" },
              { icon: "🔋", label: "Energy & Utilities" },
              { icon: "🍽️", label: "Food & Hospitality" },
              { icon: "💻", label: "IT & Software" },
            ].map((item, index) => (
              <div className="industry-card" key={index}>
                <div className="industry-icon">{item.icon}</div>
                <h3 className="industry-label">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HIGHLIGHT BOX ─── */}
      <section className="page section">
        <div className="page-inner">
          <div className="page-highlight-box ws-highlight-box">
            <h3 className="page-highlight-title">Every Website Is a Long-Term Investment</h3>
            <p className="page-text">
              <strong style={{ color: "var(--gold)" }}>We don't just hand over files and disappear.</strong>{" "}
              Every web project we deliver is logged in RBC CRM with hosting details,
              domain renewal dates, and maintenance schedules—so your site never goes
              down due to an expired certificate or forgotten renewal.
            </p>
            <p className="page-text" style={{ marginTop: "0.7rem" }}>
              From first wireframe to post-launch support, you have one team that
              knows your project inside-out. No handoffs, no miscommunication,
              no starting over from scratch every time you need a change.
            </p>
            <p className="page-text" style={{ marginTop: "0.7rem" }}>
              <strong style={{ color: "var(--gold)" }}>Technologies we specialize in:</strong>{" "}
              React, Next.js, WordPress, PHP, WooCommerce, MySQL, Firebase, GSAP,
              Tailwind CSS, Framer Motion, Razorpay, Stripe, and more.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="page section ws-faq-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">FAQ</p>
            <h2 className="section-title">Common Questions</h2>
          </div>

          <div className="faq-list" style={{ marginTop: "1.5rem" }}>
            {[
              {
                q: "How long does a website take to build?",
                a: "Landing pages typically take 4–7 days. Standard business websites take 2–3 weeks. Web applications and e-commerce stores are quoted per project depending on complexity.",
              },
              {
                q: "Do you provide domain and hosting?",
                a: "Yes. We can register your domain, set up hosting, configure cPanel, install SSL certificates, and manage renewals through RBC CRM so nothing expires accidentally.",
              },
              {
                q: "Can I update the website myself after it's built?",
                a: "Absolutely. For WordPress and CMS-based sites, we provide a simple admin panel and basic training. For custom-coded sites, we handle updates as part of our maintenance plan.",
              },
              {
                q: "Will my website rank on Google?",
                a: "We include on-page SEO basics with every project—meta tags, sitemap, schema markup, and Search Console setup. For ongoing SEO campaigns, we offer separate packages.",
              },
              {
                q: "What if I need changes after the website is live?",
                a: "All projects include 30–90 days of post-launch support depending on the plan. After that, we offer affordable monthly maintenance packages to keep your site updated and secure.",
              },
            ].map((faq, i) => (
              <div className="faq-item ws-faq-item" key={i}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section section-cta ws-cta">
        <div className="page-inner page-inner--no-border">
          <div className="section-cta-inner ws-cta-inner">
            <div>
              <p className="cta-label">Ready to Build Your Website?</p>
              <h2 className="cta-title">Let's Create Something That Works</h2>
              <p className="cta-subtitle">
                Share your requirements and we'll respond with a clear plan,
                timeline, and fixed pricing. No pressure, just honest conversation.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
              <Link to="/about" className="btn-ghost">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}