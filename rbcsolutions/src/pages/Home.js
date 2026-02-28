// src/pages/Home.js
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import webIcon from "../assets/icon/web.png";
import softIcon from "../assets/icon/soft.png";
import serIcon from "../assets/icon/ser.png";
import anaIcon from "../assets/icon/ana.png";
import supIcon from "../assets/icon/sup.png";
import comIcon from "../assets/icon/com.png";

import heroBg from "../assets/bg1.png";
import web3d from "../assets/web-3d.png";
import ott3d from "../assets/ott-3d.png";
import tech3d from "../assets/tech-3d.png";

gsap.registerPlugin(ScrollTrigger);

/* ================= HERO SLIDES ================= */

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "// Web design & development",
    titleBigTop: "WEB",
    titleBigBottom: "SOLUTIONS",
    highlight: "Websites designed to convert, not just look good.",
    description:
      "Clean, focused layouts for service businesses, agencies, and tech brands – built around enquiries and offers.",
    bullets: [
      "Fast, mobile-first landing pages",
      "WhatsApp & enquiry form integration",
      "Support for campaigns and re-designs",
    ],
    model: web3d,
    primaryLabel: "Explore web services",
    primaryLink: "/web-solutions",
  },
  {
    id: 2,
    eyebrow: "// OTT solutions & streaming",
    titleBigTop: "STREAMING",
    titleBigBottom: "INNOVATION",
    highlight: "Launch and manage OTT platforms with end-to-end support.",
    description:
      "From content access to renewals, we set up OTT accounts and plans that actually match how your team watches and works.",
    bullets: [
      "Business-friendly multi-user setups",
      "Plan selection & renewal reminders",
      "Clear guidance on usage & limitations",
    ],
    model: ott3d,
    primaryLabel: "Software & OTT",
    primaryLink: "/software-ott",
  }, 
  {
    id: 3,
    eyebrow: "// Core systems & software",
    titleBigTop: "INTELLIGENT",
    titleBigBottom: "SYSTEMS",
    highlight: "Software stacks that scale with your business.",
    description:
      "We organise your tools, licenses, and access so teams can work faster – without juggling random accounts.",
    bullets: [
      "Genuine, verified licenses only",
      "Centralised tracking with RBC CRM",
      "Renewal, upgrade & support handling",
    ],
    model: tech3d,
    primaryLabel: "View software options",
    primaryLink: "/contect-us",
  },
];

/* ================= BUSINESS TYPES ================= */

const BUSINESS_TYPES = [
  {
    id: 1,
    label: "Startups Business",
    short:
      "Turn your idea into a working brand presence with a fast website and basic tools.",
    hover:
      "We set up your first website, connect WhatsApp or forms, and guide you on which software and OTT tools you really need so you don't waste your starting budget.",
  },
  {
    id: 2,
    label: "Small Business",
    short:
      "Upgrade from basic online presence to a system that brings regular enquiries.",
    hover:
      "We refine your website copy, add proper CTAs, set up tracking, and manage licenses so your small business looks professional online.",
  },
  {
    id: 3,
    label: "Enterprise Business",
    short:
      "Scale operations with organised data, renewals, and multi-team support.",
    hover:
      "Using RBC CRM plus Google Sheets, we help you centralise leads, projects, and renewals so every team member can see the same updated information.",
  },
  {
    id: 4,
    label: "Agency Business",
    short:
      "Deliver smooth services to your own clients using our white-label support.",
    hover:
      "We manage websites, software, and OTT setups for your clients under your brand, so your agency can focus on sales and strategy.",
  },
];

/* ================= MOTION 3D ================= */

/* ================= MOTION 3D ================= */

function Motion3DWrapper({ src, onHoverStart, onHoverEnd }) {
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

// Clamp Y so model never goes below 20% of container height downward
const rawOffsetY = (e.clientY - rect.top - rect.height / 2) * 0.20;
const offsetY = Math.min(rawOffsetY, rect.height * 0.20);

modelX.set(offsetX);
modelY.set(offsetY);
    }
function handleEnter() {
  setHovered(true);
  // swiper pause removed from here
}
function handleLeave() {
  cursorX.set(-100);
  cursorY.set(-100);
  modelX.set(0);
  modelY.set(0);
  setHovered(false);
  // swiper resume removed from here
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
  }, [cursorX, cursorY, modelX, modelY, onHoverStart, onHoverEnd]);

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

      {/* 3D Model — follows cursor on hover, free drag on click */}
      <motion.img
        src={src}
        className="hero-model-img"
        drag
        dragSnapToOrigin
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 120, bounceDamping: 14 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
         onHoverStart={() => onHoverStart && onHoverStart()}
        onHoverEnd={() => onHoverEnd && onHoverEnd()} 
        style={{
          x: dragging ? undefined : smoothModelX,  // follow cursor when hovering
          y: dragging ? undefined : smoothModelY,  // free when dragging
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
        alt="3D Model"
      />
    </div>
  );
}

/* ================= HOME COMPONENT ================= */

export default function Home() {
  // Swiper instance ref — used to pause/resume autoplay on model hover
  const swiperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".section-services",
          start: "top 70%",
          once: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        stagger: { each: 0.15, from: "start" },
      });

      gsap.from(".business-card", {
        scrollTrigger: { trigger: ".section-business-startup", start: "top 75%" },
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.18,
      });

      gsap.from(".why-card", {
        scrollTrigger: { trigger: ".section-why", start: "top 75%" },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
      });

      gsap.from(".industry-card", {
        scrollTrigger: { trigger: ".section-industries", start: "top 75%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.from(".client-card", {
        scrollTrigger: { trigger: ".section-clients", start: "top 75%" },
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
      });

      gsap.from(".testimonial-card", {
        scrollTrigger: { trigger: ".section-testimonials", start: "top 75%" },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.18,
      });

      gsap.from(".tech-card", {
        scrollTrigger: { trigger: ".section-tech", start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });

      gsap.from(".faq-item", {
        scrollTrigger: { trigger: ".section-faq", start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
      });
    });

    return () => ctx.revert();
  }, []);

  const servicesRef = useRef(null);
  const businessRef = useRef(null);
  const whyRef = useRef(null);
  const industriesRef = useRef(null);
  const clientsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const metricsRef = useRef(null);
  const techRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".page-inner").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 30 },
          {
            y: -30,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      gsap.utils.toArray(".section-header").forEach((header) => {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: { trigger: header, start: "top 85%" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop
          speed={700}
          pagination={{ clickable: true }}
          navigation
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
        >
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="hero-bg"
                style={{ backgroundImage: `url(${heroBg})` }}
              />
              <div className="hero-layout">
                <div className="hero-left">
                  <p className="hero-eyebrow">{slide.eyebrow}</p>

                  <div className="hero-title-block">
                    <span className="hero-title-top">{slide.titleBigTop}</span>
                    <span className="hero-title-main">{slide.titleBigBottom}</span>
                  </div>

                  <p className="hero-highlight">{slide.highlight}</p>
                  <p className="hero-description">{slide.description}</p>

                  <ul className="hero-bullets">
                    {slide.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  <div className="hero-cta-row">
                    <Link to={slide.primaryLink} className="btn-primary">
                      {slide.primaryLabel}
                    </Link>
                    <a
                      href="https://wa.me/919316251193?text=Hi, I'd like to get in touch with RBC Solutions"
                      className="btn-ghost"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="hero-right">
                  <Motion3DWrapper
                    src={slide.model}
                    onHoverStart={() => swiperRef.current?.autoplay?.stop()}
                    onHoverEnd={() => swiperRef.current?.autoplay?.start()}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* CORE SERVICES */}
      <section ref={servicesRef} className="page section section-services">
        <div className="page-inner">
          <div className="section-header">
            <p className="section-kicker">Services</p>
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              One team to handle your website, software licenses, and OTT
              streaming setups – all under a single roof.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon service-icon--web">
                <img src={webIcon} alt="Web Development" />
              </div>
              <span className="service-tag">Web</span>
              <h3>Web Development &amp; Landing Pages</h3>
              <p>
                Fast, responsive websites built to capture leads, showcase your
                brand, and connect with your audience.
              </p>
              <ul className="service-points">
                <li>Business &amp; portfolio sites</li>
                <li>Landing pages for campaigns</li>
                <li>Lead-focused forms &amp; funnels</li>
              </ul>
              <Link to="/web-solutions" className="service-link">
                Explore Web Solutions →
              </Link>
            </div>

            <div className="service-card">
              <div className="service-icon service-icon--software">
                <img src={softIcon} alt="Software & OTT" />
              </div>
              <span className="service-tag">Software &amp; OTT</span>
              <h3>Premium Software &amp; OTT Solutions</h3>
              <p>
                Genuine software tools, licenses, and OTT platform setup — all
                handled professionally to support your business operations and
                streaming needs.
              </p>
              <ul className="service-points">
                <li>Verified &amp; secure licenses</li>
                <li>Account setup &amp; onboarding</li>
                <li>Renewal &amp; usage guidance</li>
              </ul>
              <Link to="/software-ott" className="service-link">
                View Software Options →
              </Link>
            </div>

            <div className="service-card">
              <div className="service-icon service-icon--ott">
                <img src={serIcon} alt="OTT Setup" />
              </div>
              <span className="service-tag">Maintenance</span>
              <h3>Website Maintenance &amp; Support</h3>
              <p>
                Ongoing updates, security monitoring, bug fixes, backups, and
                performance optimization — keeping your website running smoothly
                24/7.
              </p>
              <ul className="service-points">
                <li>Regular updates &amp; patches</li>
                <li>Performance &amp; uptime checks</li>
                <li>RBC CRM task tracking</li>
              </ul>
              <Link to="/software-ott" className="service-link">
                Learn about OTT Setup →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STARTUP YOUR BUSINESS – BUSINESS TYPES */}
      <section ref={businessRef} className="page section section-business-startup">
        <div className="page-inner page-inner--no-border">
          <div className="section-header section-header--center">
            <p className="section-kicker">Who We Work With</p>
            <h2 className="section-title">
              Startup your business with RBC Solutions
            </h2>
            <p className="section-subtitle">
              From first-time founders to growing agencies, we align your
              website, software, and OTT setup with the stage of your business.
            </p>
          </div>

          <div className="business-grid">
            {BUSINESS_TYPES.map((item) => (
              <article key={item.id} className="business-card">
                <div className="business-number">{item.id}.</div>
                <div className="business-main">
                  <h3 className="business-title">{item.label}</h3>
                  <p className="business-text">{item.short}</p>
                  <div className="business-hover">
                    <p className="business-hover-text">{item.hover}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY RBC */}
      <section ref={whyRef} className="page section section-why">
        <div className="page-inner">
          <div className="section-header">
            <p className="section-kicker">Why Choose Us</p>
            <h2 className="section-title">Why RBC Solutions?</h2>
            <p className="section-subtitle">
              You're not just buying a service – you're getting a long-term tech
              partner with an internal CRM tracking every client.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <img src={anaIcon} alt="Analytics Icon" />
              </div>
              <div className="why-content">
                <h3>RBC CRM Powered</h3>
                <p>
                  Our custom RBC CRM securely stores every lead, client detail,
                  project stage, and renewal date. Integrated with Google
                  Sheets, it ensures nothing is forgotten and gives you
                  organized, reliable, and always-accessible business tracking
                  in one system.
                </p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <img src={comIcon} alt="Communication Icon" />
              </div>
              <div className="why-content">
                <h3>Clear Communication</h3>
                <p>
                  We maintain transparent communication through clear timelines,
                  fixed pricing, and WhatsApp updates. From the first enquiry to
                  final delivery, you always know the project status and receive
                  consistent support without confusion or delays.
                </p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <img src={supIcon} alt="Support Icon" />
              </div>
              <div className="why-content">
                <h3>Fast Delivery &amp; Support</h3>
                <p>
                  Our team delivers websites, software, and OTT setups quickly
                  while maintaining quality. After completion, we continue
                  providing dedicated support, updates, troubleshooting,
                  renewals, and improvements, ensuring your digital platform
                  always stays active and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section ref={industriesRef} className="page section section-industries">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Industries We Serve</p>
            <h2 className="section-title">We Work With Every Industry</h2>
            <p className="section-subtitle">
              Whether you're a startup, enterprise, or service agency, we've
              delivered solutions across multiple industries — from healthcare
              to media and IT.
            </p>
          </div>

          <div className="industries-grid">
            {[
              { label: "Enterprise Business", icon: "💼" },
              { label: "Accounting", icon: "📊" },
              { label: "Legal Services", icon: "⚖️" },
              { label: "Banking & Finance", icon: "🏦" },
              { label: "Healthcare", icon: "🩺" },
              { label: "Logistics", icon: "🚚" },
              { label: "Travel & Utility", icon: "✈️" },
              { label: "Energy", icon: "🔋" },
              { label: "Media & Entertainment", icon: "🎬" },
              { label: "Education", icon: "🎓" },
              { label: "IT & Software", icon: "💻" },
            ].map((item, index) => (
              <div className="industry-card" key={index}>
                <div className="industry-icon">{item.icon}</div>
                <h3 className="industry-label">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section ref={clientsRef} className="page section section-clients">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Our Clients</p>
            <h2 className="section-title">Trusted by Businesses of All Sizes</h2>
            <p className="section-subtitle">
              From startups to established enterprises — brands rely on RBC
              Solutions for their websites, software, and OTT setups.
            </p>
          </div>

          <div className="clients-grid">
            {["client1.png","client2.png","client3.png","client4.png","client5.png","client6.png"].map((src, index) => (
              <div className="client-card" key={index}>
                <div className="client-placeholder">Client {index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialsRef} className="page section section-testimonials">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Feedback</p>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>

          <div className="testimonials-grid">
            {[
              {
                name: "Amit Sharma",
                company: "BluePeak Enterprises",
                text: "RBC Solutions transformed our online presence in just 2 weeks. Their CRM integration keeps us organized every single day.",
              },
              {
                name: "Priya Nair",
                company: "The Design Studio",
                text: "The website design and support were flawless. WhatsApp updates made the process totally stress-free.",
              },
              {
                name: "Rohan Patel",
                company: "MediaFuel Agency",
                text: "We use RBC's white-label services for our own clients — their delivery speed and support are unmatched.",
              },
            ].map((t, i) => (
              <div className="testimonial-card" key={i}>
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-company">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section ref={metricsRef} className="page section section-metrics">
        <div className="page-inner metrics-grid">
          {[
            { number: "250+", label: "Projects Delivered" },
            { number: "50+", label: "Active Clients" },
            { number: "3+", label: "Years Experience" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, i) => (
            <div className="metric-card" key={i}>
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section ref={techRef} className="page section section-tech">
        <div className="page-inner section-header--center">
          <p className="section-kicker">Tools &amp; Platforms</p>
          <h2 className="section-title">Technology We Work With</h2>
          <div className="tech-grid">
            {["React","Node.js","PHP","MySQL","Firebase","WordPress","Figma","Google Cloud"].map((tool, i) => (
              <div className="tech-card" key={i}>{tool}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="page section section-faq">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Have Questions?</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {[
              {
                q: "How long does a project usually take?",
                a: "Most websites are delivered within 1–3 weeks depending on content and complexity.",
              },
              {
                q: "Do you provide hosting or domain services?",
                a: "Yes, we can manage your domain and hosting setup, renewals, and backups through our CRM.",
              },
              {
                q: "What if I need help after project delivery?",
                a: "We offer maintenance and support packages to ensure your website or software keeps running smoothly.",
              },
            ].map((faq, i) => (
              <div className="faq-item" key={i}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section ref={ctaRef} className="section section-cta">
        <div className="page-inner page-inner--no-border">
          <div className="section-cta-inner">
            <div>
              <p className="cta-label">Ready to start?</p>
              <h2 className="cta-title">Let's build something for you this week.</h2>
              <p className="cta-subtitle">
                Share your requirements and we'll respond with a clear plan,
                timeline, and pricing.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">Contact Now</Link>
              <Link to="/web-solutions" className="btn-ghost">Request Web Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}