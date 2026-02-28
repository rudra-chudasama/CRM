// src/pages/SoftwareOTT.js
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import 3D model image
import software3d from "../assets/ott-3d.png";
import heroBg from "../assets/bg1.png";

gsap.registerPlugin(ScrollTrigger);

/* ================= MOTION 3D COMPONENT ================= */
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
      <motion.div
        style={{ position: "absolute", left: smoothCursorX, top: smoothCursorY, translateX: "-50%", translateY: "-50%", pointerEvents: "none", zIndex: 10 }}
        animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: dragging ? 1.35 : 1,
            borderColor: dragging ? "rgba(250, 204, 21, 0.9)" : "rgba(34, 211, 238, 0.85)",
            boxShadow: dragging ? "0 0 16px rgba(250,204,21,0.55), inset 0 0 8px rgba(250,204,21,0.2)" : "0 0 12px rgba(34,211,238,0.45), inset 0 0 6px rgba(34,211,238,0.15)",
          }}
          transition={{ rotate: { repeat: Infinity, duration: 3, ease: "linear" }, default: { duration: 0.25 } }}
          style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(34,211,238,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <motion.div
            animate={{ background: dragging ? "#facc15" : "#22d3ee", boxShadow: dragging ? "0 0 8px #facc15" : "0 0 8px #22d3ee", scale: dragging ? 1.4 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ width: 6, height: 6, borderRadius: "50%" }}
          />
        </motion.div>
        <motion.span
          animate={{ opacity: dragging ? 1 : 0, y: dragging ? 3 : -3 }}
          transition={{ duration: 0.2 }}
          style={{ display: "block", textAlign: "center", fontSize: "0.5rem", letterSpacing: "0.12em", color: "#facc15", marginTop: "3px", fontWeight: 700 }}
        >
          FREE
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
          filter: dragging ? "drop-shadow(0 0 40px rgba(250,204,21,0.5)) drop-shadow(0 20px 60px rgba(0,0,0,0.8))" : "drop-shadow(0 40px 80px rgba(0,0,0,0.9))",
        }}
        animate={{ scale: dragging ? 1.08 : 1 }}
        whileTap={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        draggable={false}
        alt="Premium Software & OTT"
      />
    </div>
  );
}

export default function SoftwareOTT() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(
        ".software-hero-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".software-hero-model",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      // Software categories animation
      gsap.from(".sw-category-card", {
        scrollTrigger: {
          trigger: ".software-categories-section",
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      // OTT cards animation
      gsap.from(".sw-ott-card", {
        scrollTrigger: {
          trigger: ".ott-platforms-section",
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Why choose us cards animation
      gsap.from(".sw-why-card", {
        scrollTrigger: {
          trigger: ".software-why-section",
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
      });

      // Process steps animation
      gsap.from(".sw-process-step", {
        scrollTrigger: {
          trigger: ".software-process-section",
          start: "top 95%",
          once: true,
        },
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
      });

      // Benefits animation
      gsap.from(".sw-benefit-card", {
        scrollTrigger: {
          trigger: ".software-benefits-section",
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Pricing cards animation
      gsap.from(".sw-pricing-card", {
        scrollTrigger: {
          trigger: ".software-pricing-section",
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });

      // Highlight box animation
      gsap.from(".sw-highlight-box", {
        scrollTrigger: {
          trigger: ".sw-highlight-box",
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
      });

      // CTA section animation
      gsap.fromTo(
        ".software-cta-inner",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".software-cta",
            start: "top 80%",
            once: true,
          },
        }
      );
    });
    // At the END of your useEffect, just before `return () => ctx.revert();`
    setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* PAGE HEADER WITH 3D MODEL */}
      <section className="hero-section about-hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
        
        <div className="hero-layout">
          <div className="hero-left software-hero-content">
            <p className="hero-eyebrow">{"//"} Premium Subscriptions</p>
            
            <div className="hero-title-block">
              <span className="hero-title-top">SOFTWARE</span>
              <span className="hero-title-main">& OTT</span>
            </div>

            <p className="hero-highlight">
              Your Trusted Source for Premium Software & OTT Subscriptions
            </p>

            <p className="hero-description">
              We sell genuine premium software licenses and OTT platform subscriptions.
              Get Adobe, Microsoft, Spotify, Netflix, and more—with verified accounts,
              renewal management, and everything tracked in RBC CRM for complete transparency.
            </p>

            <ul className="hero-bullets">
              <li>100% Genuine software licenses</li>
              <li>Premium OTT subscriptions (Netflix, Spotify, etc.)</li>
              <li>Full renewal tracking & support</li>
            </ul>

            <div className="hero-cta-row">
              <Link to="/contact" className="btn-primary">
                Get Premium Access
              </Link>
              <Link to="/about" className="btn-ghost">
                Learn More
              </Link>
            </div>
          </div>

          <div className="hero-right software-hero-model">
            <Motion3DWrapper src={software3d} />
          </div>
        </div>
      </section>

      {/* PREMIUM SOFTWARE WE SELL */}
      <section className="page section software-categories-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Premium Software</p>
            <h2 className="section-title">Software Licenses We Sell</h2>
            <p className="section-subtitle">
              Get genuine premium software at competitive prices. No pirated copies,
              no legal risks—just verified licenses with full vendor support.
            </p>
          </div>

          <div className="page-card-grid">
            <div className="page-card sw-category-card">
              <h3 className="page-card-title">🎨 Adobe Creative Suite</h3>
              <p className="page-text">
                Adobe Creative Cloud, Photoshop, Illustrator, Premiere Pro, After
                Effects, and the complete Adobe suite for creative professionals.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Individual & team plans</li>
                <li>All Adobe apps included</li>
                <li>Cloud storage & sync</li>
              </ul>
            </div>

            <div className="page-card sw-category-card">
              <h3 className="page-card-title">💼 Microsoft 365</h3>
              <p className="page-text">
                Microsoft 365 Business, Office suite, OneDrive storage, Teams, and
                enterprise productivity tools for businesses of all sizes.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Word, Excel, PowerPoint</li>
                <li>1TB OneDrive storage</li>
                <li>Microsoft Teams access</li>
              </ul>
            </div>

            <div className="page-card sw-category-card">
              <h3 className="page-card-title">🎵 Music Streaming</h3>
              <p className="page-text">
                Spotify Premium, Apple Music, YouTube Music Premium, and Amazon Music
                Unlimited—ad-free listening with offline downloads.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>No ads, unlimited skips</li>
                <li>High-quality audio</li>
                <li>Offline listening mode</li>
              </ul>
            </div>

            <div className="page-card sw-category-card">
              <h3 className="page-card-title">🔒 Security Software</h3>
              <p className="page-text">
                Norton, McAfee, Kaspersky, Bitdefender antivirus licenses, VPN
                services, and password managers for complete protection.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Antivirus protection</li>
                <li>VPN & privacy tools</li>
                <li>Multi-device coverage</li>
              </ul>
            </div>

            <div className="page-card sw-category-card">
              <h3 className="page-card-title">💻 Developer Tools</h3>
              <p className="page-text">
                JetBrains IDEs, GitHub Pro, Sublime Text, and other premium developer
                tools with full license access and updates.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Full IDE access</li>
                <li>Code collaboration tools</li>
                <li>Premium plugins included</li>
              </ul>
            </div>

            <div className="page-card sw-category-card">
              <h3 className="page-card-title">📊 Design & Productivity</h3>
              <p className="page-text">
                Canva Pro, Notion, Grammarly Premium, and other productivity tools
                that help teams work smarter and faster.
              </p>
              <ul className="page-list" style={{ marginTop: "0.6rem" }}>
                <li>Premium templates</li>
                <li>Team collaboration</li>
                <li>Advanced features unlocked</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OTT PLATFORMS WE SELL */}
      <section className="page section ott-platforms-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">OTT Subscriptions</p>
            <h2 className="section-title">Premium OTT Platforms</h2>
            <p className="section-subtitle">
              Get premium streaming subscriptions for Netflix, Disney+, Prime Video,
              and more—with account setup and renewal management included.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card sw-ott-card">
              <div className="service-tag">Video Streaming</div>
              <h3>Netflix, Disney+, Prime Video</h3>
              <p>
                Premium video streaming subscriptions with HD/4K quality, multiple
                profiles, and unlimited viewing across all your devices.
              </p>
              <ul className="service-points">
                <li>HD & 4K streaming quality</li>
                <li>Multi-profile support</li>
                <li>Unlimited device access</li>
              </ul>
            </div>

            <div className="service-card sw-ott-card">
              <div className="service-tag">Music</div>
              <h3>Spotify, Apple Music, YouTube Music</h3>
              <p>
                Premium music streaming with ad-free listening, offline downloads,
                and high-quality audio for personal and business use.
              </p>
              <ul className="service-points">
                <li>Zero ads, unlimited skips</li>
                <li>Download for offline play</li>
                <li>High-fidelity audio</li>
              </ul>
            </div>

            <div className="service-card sw-ott-card">
              <div className="service-tag">Sports & Live TV</div>
              <h3>ESPN+, Hotstar, Live Sports</h3>
              <p>
                Sports streaming packages with live coverage, replays, and premium
                content for sports fans and entertainment seekers.
              </p>
              <ul className="service-points">
                <li>Live sports events</li>
                <li>Multi-device streaming</li>
                <li>DVR & replay options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BUY FROM US */}
      <section className="page section software-why-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Why Choose Us</p>
            <h2 className="section-title">Why Buy From RBC Solutions</h2>
          </div>

          <div className="why-grid">
            <div className="why-card sw-why-card">
              <div className="why-content">
                <h3>100% Genuine & Verified</h3>
                <p>
                  Every software license and OTT subscription we sell is genuine and
                  verified. No pirated software, no fake accounts—just authentic
                  premium access with full vendor support.
                </p>
              </div>
            </div>

            <div className="why-card sw-why-card">
              <div className="why-content">
                <h3>Tracked in RBC CRM</h3>
                <p>
                  All purchases are logged in our CRM with purchase dates, renewal
                  schedules, and account details. You'll never lose track of what's
                  active or expiring.
                </p>
              </div>
            </div>

            <div className="why-card sw-why-card">
              <div className="why-content">
                <h3>Renewal Management</h3>
                <p>
                  We send reminders before your subscriptions expire and handle
                  renewals on your behalf, ensuring uninterrupted access to all
                  your premium tools.
                </p>
              </div>
            </div>

            <div className="why-card sw-why-card">
              <div className="why-content">
                <h3>Competitive Pricing</h3>
                <p>
                  Get premium software and OTT subscriptions at competitive prices.
                  We work directly with vendors to offer you the best rates available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="page section software-process-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">How It Works</p>
            <h2 className="section-title">Simple Purchase Process</h2>
          </div>

          <div className="page-body page-body--split">
            <div className="page-column">
              <div className="sw-process-step" style={{ marginBottom: "0" }}>
                <h3 className="page-subtitle">1. Tell Us What You Need</h3>
                <p className="page-text">
                  Contact us with your software or OTT requirements. Whether it's
                  Adobe for your design team or Netflix for entertainment—we'll
                  provide options.
                </p>
              </div>

              <div className="sw-process-step" style={{ marginBottom: "0" }}>
                <h3 className="page-subtitle">2. Get Clear Pricing</h3>
                <p className="page-text">
                  We'll share transparent pricing with no hidden costs. You'll know
                  exactly what you're paying before making any commitment.
                </p>
              </div>

              <div className="sw-process-step">
                <h3 className="page-subtitle">3. Make Secure Payment</h3>
                <p className="page-text">
                  Pay securely through our verified payment channels. We accept
                  bank transfers, UPI, and other trusted payment methods.
                </p>
              </div>
            </div>

            <div className="page-column">
              <div className="sw-process-step" style={{ marginBottom: "0" }}>
                <h3 className="page-subtitle">4. Receive Your Access</h3>
                <p className="page-text">
                  Get your license keys, login credentials, or account details
                  immediately after payment conform. Fast delivery, verified
                  access.
                </p>
              </div>

              <div className="sw-process-step" style={{ marginBottom: "0" }}>
                <h3 className="page-subtitle">5. Logged in RBC CRM</h3>
                <p className="page-text">
                  Your purchase is tracked in our CRM with all account details,
                  renewal dates, and vendor information for easy reference.
                </p>
              </div>

              <div className="sw-process-step">
                <h3 className="page-subtitle">6. Renewal Support</h3>
                <p className="page-text">
                  We'll remind you before renewals and handle the process if needed.
                  No service interruptions, no expired subscriptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="page section software-benefits-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Our Offerings</p>
            <h2 className="section-title">What You Get</h2>
          </div>

          <div className="business-grid">
            <div className="business-card sw-benefit-card">
              <div className="business-number">01</div>
              <div className="business-main">
                <h3 className="business-title">Genuine Licenses Only</h3>
                <p className="business-text">
                  We only sell verified, genuine licenses from official vendors.
                  No pirated software, no cracked versions—legal and safe.
                </p>
              </div>
            </div>

            <div className="business-card sw-benefit-card">
              <div className="business-number">02</div>
              <div className="business-main">
                <h3 className="business-title">Instant Delivery</h3>
                <p className="business-text">
                  Get your access immediately after payment. License keys, login
                  details, or activation codes delivered within minutes.
                </p>
              </div>
            </div>

            <div className="business-card sw-benefit-card">
              <div className="business-number">03</div>
              <div className="business-main">
                <h3 className="business-title">CRM Tracking</h3>
                <p className="business-text">
                  Every purchase is logged with renewal dates, vendor info, and
                  account details. Stay organized without manual tracking.
                </p>
              </div>
            </div>

            <div className="business-card sw-benefit-card">
              <div className="business-number">04</div>
              <div className="business-main">
                <h3 className="business-title">Renewal Alerts</h3>
                <p className="business-text">
                  Automatic reminders before subscriptions expire. We handle
                  renewals to prevent service interruptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="page section software-pricing-section">
        <div className="page-inner">
          <div className="section-header section-header--center">
            <p className="section-kicker">Pricing</p>
            <h2 className="section-title">Transparent, Competitive Rates</h2>
            <p className="section-subtitle">
              Get premium software and OTT access at competitive prices. No hidden
              fees, just honest pricing for genuine products.
            </p>
          </div>

          <div className="page-card-grid">
            <div className="page-card sw-pricing-card">
              <h3 className="page-card-title">Individual Plans</h3>
              <p className="page-text">
                Single-user software licenses and personal OTT subscriptions at
                standard vendor rates plus a small service fee for tracking and
                support.
              </p>
              <p className="page-text" style={{ marginTop: "0.6rem", fontWeight: "600", color: "var(--gold)" }}>
                Contact for pricing
              </p>
            </div>

            <div className="page-card sw-pricing-card">
              <h3 className="page-card-title">Team & Business</h3>
              <p className="page-text">
                Multi-user licenses and business subscriptions with centralized
                management and renewal tracking for teams of 5-50 people.
              </p>
              <p className="page-text" style={{ marginTop: "0.6rem", fontWeight: "600", color: "var(--gold)" }}>
                Volume discounts available
              </p>
            </div>

            <div className="page-card sw-pricing-card">
              <h3 className="page-card-title">Enterprise Solutions</h3>
              <p className="page-text">
                Large-scale licensing for organizations with dedicated account
                management, bulk purchasing, and comprehensive CRM tracking.
              </p>
              <p className="page-text" style={{ marginTop: "0.6rem", fontWeight: "600", color: "var(--gold)" }}>
                Custom enterprise pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="page section">
        <div className="page-inner">
          <div className="page-highlight-box sw-highlight-box">
            <h3 className="page-highlight-title">
              Most Popular Products We Sell
            </h3>
            <p className="page-text">
              <strong style={{ color: "var(--gold)" }}>Software:</strong> Adobe Creative Cloud,
              Microsoft 365, Canva Pro, Norton Antivirus, Grammarly Premium, Spotify
              Premium, JetBrains IDEs, GitHub Pro
            </p>
            <p className="page-text">
              <strong style={{ color: "var(--gold)" }}>OTT Platforms:</strong> Netflix Premium,
              Disney+ Hotstar, Amazon Prime Video, Spotify Premium, Apple Music, YouTube Premium,
              ESPN+, and more streaming services
            </p>
            <p className="page-text" style={{ marginTop: "0.8rem" }}>
              Every purchase is verified, tracked in RBC CRM, and comes with renewal
              management. You're not just buying access—you're getting organized,
              professional service with long-term support.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-cta software-cta">
        <div className="page-inner page-inner--no-border">
          <div className="section-cta-inner software-cta-inner">
            <div>
              <p className="cta-label">Ready to Get Premium Access?</p>
              <h2 className="cta-title">Buy Genuine Software & OTT Subscriptions</h2>
              <p className="cta-subtitle">
                Tell us what you need and we'll provide verified access with
                competitive pricing and complete CRM tracking.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">
                Get Started
              </Link>
              <Link to="/about" className="btn-ghost">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}