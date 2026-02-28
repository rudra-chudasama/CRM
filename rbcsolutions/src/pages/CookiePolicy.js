// src/pages/CookiePolicy.js
import React from "react";

const TOC = [
  { id: "what",       label: "What Are Cookies" },
  { id: "we-use",     label: "Cookies We Use" },
  { id: "table",      label: "Cookie Reference Table" },
  { id: "third",      label: "Third-Party Cookies" },
  { id: "manage",     label: "Managing Cookies" },
  { id: "changes",    label: "Policy Changes" },
  { id: "contact",    label: "Contact Us" },
];

export default function CookiePolicy() {
  return (
    <div className="legal-page">
      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-kicker">Legal</span>
          <h1 className="legal-title">Cookie <span>Policy</span></h1>
          <p className="legal-meta">Last updated: June 2025 &nbsp;·&nbsp; Applies to rbcsolutions.in</p>
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
              This Cookie Policy explains how RBC Solutions uses cookies and similar tracking technologies
              on our website. By continuing to use our site, you consent to our use of cookies as described here.
            </p>
          </div>

          <div className="legal-section" id="what">
            <p className="legal-section-num">01</p>
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the site
              remember your preferences and activity, making your experience faster and more consistent.
            </p>
            <p>
              Cookies can be <strong style={{color:"#e8ecf2"}}>session cookies</strong> (deleted when you close your browser)
              or <strong style={{color:"#e8ecf2"}}>persistent cookies</strong> (stored for a defined period or until manually deleted).
            </p>
          </div>

          <div className="legal-section" id="we-use">
            <p className="legal-section-num">02</p>
            <h2>Cookies We Use</h2>
            <p>We use three categories of cookies on our website:</p>

            <p style={{marginTop:"20px"}}>
              <span className="legal-badge legal-badge--essential">Essential</span>
            </p>
            <p>
              Required for the website to function. These cannot be disabled. They handle navigation, form
              submissions, and security. No personal data is stored beyond session identifiers.
            </p>

            <p style={{marginTop:"20px"}}>
              <span className="legal-badge legal-badge--analytics">Analytics</span>
            </p>
            <p>
              We use Google Analytics to understand how visitors interact with our website — pages visited,
              time spent, and traffic sources. All data is anonymised and aggregated.
            </p>

            <p style={{marginTop:"20px"}}>
              <span className="legal-badge legal-badge--functional">Functional</span>
            </p>
            <p>
              These cookies remember your preferences (e.g. language, region) to provide a more personalised
              experience. Disabling them may affect some features.
            </p>
          </div>

          <div className="legal-section" id="table">
            <p className="legal-section-num">03</p>
            <h2>Cookie Reference Table</h2>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Cookie Name</th>
                    <th>Type</th>
                    <th>Purpose</th>
                    <th>Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>_session_id</td>
                    <td><span className="legal-badge legal-badge--essential">Essential</span></td>
                    <td>Maintains user session state across pages</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>csrf_token</td>
                    <td><span className="legal-badge legal-badge--essential">Essential</span></td>
                    <td>Security token to prevent cross-site request forgery</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>_ga</td>
                    <td><span className="legal-badge legal-badge--analytics">Analytics</span></td>
                    <td>Google Analytics — distinguishes unique users</td>
                    <td>2 years</td>
                  </tr>
                  <tr>
                    <td>_gid</td>
                    <td><span className="legal-badge legal-badge--analytics">Analytics</span></td>
                    <td>Google Analytics — stores and updates a unique value for each page</td>
                    <td>24 hours</td>
                  </tr>
                  <tr>
                    <td>_gat</td>
                    <td><span className="legal-badge legal-badge--analytics">Analytics</span></td>
                    <td>Throttles request rate to Google Analytics</td>
                    <td>1 minute</td>
                  </tr>
                  <tr>
                    <td>rbc_pref</td>
                    <td><span className="legal-badge legal-badge--functional">Functional</span></td>
                    <td>Stores your display or language preferences</td>
                    <td>30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="legal-section" id="third">
            <p className="legal-section-num">04</p>
            <h2>Third-Party Cookies</h2>
            <p>
              Some cookies on our site are set by trusted third-party services we integrate:
            </p>
            <ul>
              <li><strong style={{color:"#e8ecf2"}}>Google Analytics</strong> — visitor behaviour analysis. Governed by Google's Privacy Policy.</li>
              <li><strong style={{color:"#e8ecf2"}}>WhatsApp Widget</strong> — if a WhatsApp chat button is embedded, it may set functional cookies.</li>
              <li><strong style={{color:"#e8ecf2"}}>YouTube / Vimeo</strong> — if embedded videos are present, these platforms may set their own cookies.</li>
            </ul>
            <p>
              We do not control third-party cookies. Please review each provider's privacy and cookie policies directly.
            </p>
          </div>

          <div className="legal-section" id="manage">
            <p className="legal-section-num">05</p>
            <h2>Managing Cookies</h2>
            <p>
              You can control and delete cookies through your browser settings at any time.
              Below are links to cookie management guides for popular browsers:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" style={{color:"#22d3ee"}}>Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noreferrer" style={{color:"#22d3ee"}}>Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" style={{color:"#22d3ee"}}>Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noreferrer" style={{color:"#22d3ee"}}>Microsoft Edge</a></li>
            </ul>
            <div className="legal-highlight" style={{marginTop:"20px"}}>
              <p>
                Note: Disabling essential cookies may prevent some parts of our website from functioning correctly.
              </p>
            </div>
          </div>

          <div className="legal-section" id="changes">
            <p className="legal-section-num">06</p>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy to reflect changes in the cookies we use or legal requirements.
              The "last updated" date at the top will always show the latest revision.
              Continued use of our website after changes means you accept the updated policy.
            </p>
          </div>

          <div className="legal-section" id="contact">
            <p className="legal-section-num">07</p>
            <h2>Contact Us</h2>
            <p>Questions or concerns about our use of cookies?</p>
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