// src/components/Footer.js
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import cube from "../assets/Logo/Cube.png";
import logoText from "../assets/Logo/RBCSolutions.png";
import footerBg from "../assets/bg1.png";
import { FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
/* ── animation variants ── */
const colVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.055, duration: 0.35, ease: "easeOut" },
  }),
};

/* ── internal vs external link helper ── */
const NavItem = ({ href, children, className }) => {
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto") ||
    href.startsWith("tel") ||
    href === "#";

  return isExternal ? (
    <a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
};

function Footer() {
  const year = new Date().getFullYear();
  const constraintsRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.8 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.4);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const navColumns = [
    {
      title: "Company",
      links: [
        { label: "Home",     href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Careers",  href: "/careers", badge: "Hiring" },
        { label: "Contact",  href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Web Solutions",     href: "/web-solutions" },
        { label: "Software & OTT",    href: "/software-ott" },
        { label: "Digital Marketing", href: "/contact" },
        { label: "CRM System",        href: "/crm" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Get a Quote", href: "/contact" },
        { label: "Support",     href: "/contact" },
        { label: "LinkedIn",    href: "https://www.linkedin.com/in/rbcsolution" },
        { label: "Instagram",   href: "https://www.instagram.com/rbc_solutions_" },
      ],
    },
  ];

const socials = [
  { icon: <FaLinkedinIn />,  label: "LinkedIn",  href: "https://www.linkedin.com/in/rbcsolution" },
  { icon: <FaTwitter />,     label: "Twitter",   href: "https://x.com/RBCSolution" },
  { icon: <FaInstagram />,   label: "Instagram", href: "https://www.instagram.com/rbc_solutions_" },
  { icon: <FaYoutube />,     label: "YouTube",   href: "https://www.facebook.com/share/1Dg45itkFT/" },
];

  return (
    <footer className="rbc-footer">

      {/* ── BACKGROUND IMAGE with dark overlay ── */}
      <div
        className="rbc-footer-bg"
        style={{ backgroundImage: `url(${footerBg})` }}
        aria-hidden="true"
      />
      {/* dark gradient overlay so text stays readable */}
      <div className="rbc-footer-overlay" aria-hidden="true" />

      {/* glow orbs sit on top of the image */}
      <div className="rbc-footer-glow rbc-footer-glow--left"  aria-hidden="true" />
      <div className="rbc-footer-glow rbc-footer-glow--right" aria-hidden="true" />

      {/* ══ MAIN GRID ══ */}
      <div className="rbc-footer-main">

        {/* ── BRAND COLUMN ── */}
        <motion.div
          className="rbc-footer-brand"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="rbc-footer-logo-link"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={constraintsRef}
            aria-label="RBC Solutions – Go to homepage"
          >
            <div className="rbc-footer-logo-row">
              <div className="nav-cube-area rbc-footer-cube-area">
                <motion.img
                  src={cube}
                  alt=""
                  aria-hidden="true"
                  className="nav-cube rbc-footer-cube"
                  style={{ x: springX, y: springY }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  whileTap={{ scale: 0.85, rotate: -10 }}
                />
              </div>
              <motion.img
                src={logoText}
                alt="RBC Solutions"
                className="nav-logo-text rbc-footer-logo-text"
                whileHover={{ opacity: 0.75 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18 }}
              />
            </div>
          </Link>

          <p className="rbc-footer-tagline">
            Crafting premium digital experiences — from custom software and OTT
            platforms to high-converting web solutions.
          </p>

          <div className="rbc-footer-socials" role="list" aria-label="Social media links">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                className="rbc-footer-social-btn"
                aria-label={s.label}
                role="listitem"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.3, ease: "backOut" }}
                whileHover={{ y: -3, boxShadow: "0 8px 22px rgba(34,211,238,0.25)" }}
                whileTap={{ scale: 0.88 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          <div className="rbc-footer-contact-chips">
            <a href="mailto:help.rbcsolutions@gmail.com" className="rbc-footer-chip">
              <span className="rbc-footer-chip-dot" aria-hidden="true" />
              help.rbcsolutions@gmail.com
            </a>
            <a href="tel:9316251193" className="rbc-footer-chip">
              <span className="rbc-footer-chip-dot" aria-hidden="true" />
              919316251193
            </a>
          </div>
        </motion.div>

        {/* ── NAV COLUMNS ── */}
        {navColumns.map((col, colIdx) => (
          <motion.div
            key={col.title}
            custom={colIdx + 1}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="rbc-footer-col-title">{col.title}</h3>
            <ul className="rbc-footer-nav">
              {col.links.map((link, linkIdx) => (
                <motion.li
                  key={link.label}
                  custom={linkIdx}
                  variants={linkVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <NavItem href={link.href} className="rbc-footer-nav-link">
                    <motion.span
                      className="rbc-footer-nav-arrow"
                      aria-hidden="true"
                    />
                    {link.label}
                    {link.badge && (
                      <span className="rbc-nav-badge" aria-label={`(${link.badge})`}>
                        {link.badge}
                      </span>
                    )}
                  </NavItem>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* ══ BOTTOM BAR ══ */}
      <motion.div
        className="rbc-footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="rbc-footer-copy">
          © {year} <strong>RBC Solutions</strong>. All rights reserved.
        </p>

        <nav aria-label="Legal links">
          <div className="rbc-footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
        </nav>

        <p className="rbc-footer-made" aria-hidden="true">
          Crafted with ♥ by <span>RBC</span>
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;