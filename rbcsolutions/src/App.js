// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import SoftwareOtt from "./pages/SoftwareOtt";
import Careers from "./pages/Careers";
import Contact from "./pages/contect-us";
import WebSolutions from "./pages/web-solutions";
import Login from "./pages/Login";

// Legal Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

// Components
import CRMApp from "./components/CRMApp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import { AuthProvider } from "./context/AuthContext";

import "./index.css";

/* ================= APP SHELL ================= */
function AppShell() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isLogin = location.pathname === "/login";

  return (
    <div className="site-layout">
      <ScrollToTop />
      {!isDashboard && !isLogin && <Navbar />}
      <main className="site-main">
        <Routes>
          {/* Public Routes */}
          <Route path="/"               element={<Home />} />
          <Route path="/about"          element={<About />} />
          <Route path="/software-ott"   element={<SoftwareOtt />} />
          <Route path="/web-solutions"  element={<WebSolutions />} />
          <Route path="/careers"        element={<Careers />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/login"          element={<Login />} />

          {/* Legal Routes */}
          <Route path="/privacy-policy"   element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy"    element={<CookiePolicy />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <CRMApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isDashboard && !isLogin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppShell />
      </Router>
    </AuthProvider>
  );
}