// src/pages/PrivacyPolicy.js
import React from "react";

const TOC = [
  { id: "info-collect",   label: "Information We Collect" },
  { id: "how-use",        label: "How We Use It" },
  { id: "sharing",        label: "Sharing of Data" },
  { id: "cookies",        label: "Cookies" },
  { id: "security",       label: "Data Security" },
  { id: "rights",         label: "Your Rights" },
  { id: "retention",      label: "Data Retention" },
  { id: "changes",        label: "Policy Changes" },
  { id: "contact",        label: "Contact Us" },
];

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-kicker">Legal</span>
          <h1 className="legal-title">Privacy <span>Policy</span></h1>
          <p className="legal-meta">Last updated: June 2025 &nbsp;·&nbsp; Effective immediately</p>
        </div>
      </div>

      {/* Content */}
      <div className="legal-content">
        {/* Sidebar TOC */}
        <aside className="legal-toc">
          <p className="legal-toc-title">On this page</p>
          <ul>
            {TOC.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Body */}
        <article className="legal-body">

          <div className="legal-highlight">
            <p>
              RBC Solutions ("we", "our", "us") is committed to protecting your
              personal data. This policy explains what we collect, why, and how
              we keep it safe when you use our website or services.
            </p>
          </div>

          <div className="legal-section" id="info-collect">
            <p className="legal-section-num">01</p>
            <h2>Information We Collect</h2>
            <p>We collect information you give us directly and information generated automatically when you visit our site.</p>
            <ul>
              <li><strong style={{color:"#e8ecf2"}}>Contact details</strong> — name, email address, phone number submitted via forms or WhatsApp.</li>
              <li><strong style={{color:"#e8ecf2"}}>Business information</strong> — company name, project requirements, service interest.</li>
              <li><strong style={{color:"#e8ecf2"}}>Usage data</strong> — pages visited, time on site, browser type, device, IP address.</li>
              <li><strong style={{color:"#e8ecf2"}}>Communication records</strong> — emails, WhatsApp messages, or enquiry form submissions.</li>
            </ul>
          </div>

          <div className="legal-section" id="how-use">
            <p className="legal-section-num">02</p>
            <h2>How We Use Your Information</h2>
            <p>We use the data we collect for the following purposes:</p>
            <ul>
              <li>To respond to your enquiries and deliver requested services.</li>
              <li>To manage your account and project in our RBC CRM system.</li>
              <li>To send updates, renewal reminders, and support messages.</li>
              <li>To improve our website, services, and user experience.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </div>

          <div className="legal-section" id="sharing">
            <p className="legal-section-num">03</p>
            <h2>Sharing of Data</h2>
            <p>
              We do <strong style={{color:"#e8ecf2"}}>not sell</strong> your personal data to any third party.
              We may share data with trusted service providers who help us deliver our services, including:
            </p>
            <ul>
              <li>Google Workspace (email &amp; document management)</li>
              <li>WhatsApp Business (client communication)</li>
              <li>Hosting and cloud infrastructure providers</li>
              <li>Payment processors where applicable</li>
            </ul>
            <p>
              All third-party providers are contractually required to keep your data secure and use it only as directed.
            </p>
          </div>

          <div className="legal-section" id="cookies">
            <p className="legal-section-num">04</p>
            <h2>Cookies</h2>
            <p>
              We use essential and analytics cookies to make our site function correctly and to understand visitor behaviour.
              You can manage cookie preferences at any time. See our full{" "}
              <a href="/cookie-policy" style={{color:"#22d3ee"}}>Cookie Policy</a> for details.
            </p>
          </div>

          <div className="legal-section" id="security">
            <p className="legal-section-num">05</p>
            <h2>Data Security</h2>
            <p>
              We take reasonable technical and organisational steps to protect your information from unauthorised access,
              loss, or disclosure. Data stored in RBC CRM is access-controlled and regularly backed up.
            </p>
            <p>
              While no system is 100% secure, we continually update our security practices to reduce risks.
            </p>
          </div>

          <div className="legal-section" id="rights">
            <p className="legal-section-num">06</p>
            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data ("right to be forgotten").</li>
              <li>Withdraw consent for marketing communications at any time.</li>
              <li>Lodge a complaint with a data protection authority.</li>
            </ul>
            <p>To exercise any of these rights, contact us at the details below.</p>
          </div>

          <div className="legal-section" id="retention">
            <p className="legal-section-num">07</p>
            <h2>Data Retention</h2>
            <p>
              We retain client and enquiry data for as long as necessary to provide services and comply with legal obligations.
              Project data is kept for a minimum of 2 years after project completion.
              You may request early deletion at any time.
            </p>
          </div>

          <div className="legal-section" id="changes">
            <p className="legal-section-num">08</p>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The "last updated" date at the top of this page
              will always reflect the most recent revision. Continued use of our website after changes constitutes acceptance.
            </p>
          </div>

          <div className="legal-section" id="contact">
            <p className="legal-section-num">09</p>
            <h2>Contact Us</h2>
            <p>If you have any questions about this policy or your data, reach us here:</p>
            <div className="legal-contact-box">
              <p><strong style={{color:"#e8ecf2"}}>RBC Solutions</strong></p>
              <p>📧 <a href="mailto:info@rbcsolutions.in">info@rbcsolutions.in</a></p>
              <p>📱 <a href="https://wa.me/919876543210">WhatsApp Us</a></p>
              <p style={{marginTop:"12px", fontSize:"0.82rem", color:"#556070"}}>We aim to respond within 24–48 business hours.</p>
            </div>
          </div>

        </article>
      </div>
    </div>
  );
}