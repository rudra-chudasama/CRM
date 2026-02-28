// src/components/Navbar.js
import React, { useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import cube from "../assets/Logo/Cube.png";
import logoText from "../assets/Logo/RBCSolutions.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const constraintsRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.8 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <header className={`nav-bar ${open ? "open" : ""}`}>

      {/* ── LOGO → clicks to Home ── */}
      <Link
        to="/"
        className="nav-left nav-logo-link"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={constraintsRef}
        aria-label="RBC Solutions – Go to homepage"
        onClick={() => setOpen(false)}
      >
        <div className="nav-cube-area">
          <motion.img
            src={cube}
            alt=""
            aria-hidden="true"
            className="nav-cube"
            style={{ x: springX, y: springY }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
            whileTap={{ scale: 0.88, rotate: -8 }}
          />
        </div>
        <motion.img
          src={logoText}
          alt="RBC Solutions"
          className="nav-logo-text"
          whileHover={{ opacity: 0.85 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.18 }}
        />
      </Link>

      {/* ── HAMBURGER ── */}
      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* ── NAV LINKS ── */}
      <nav className="nav-links" onClick={() => setOpen(false)}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/software-ott">Software & OTT</NavLink>
        <NavLink to="/web-solutions">Web Solutions</NavLink>
        <NavLink to="/careers">Careers</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

    </header>
  );
}

export default Navbar;