// src/pages/TermsOfService.js
import React from "react";

const TOC = [
  { id: "acceptance",   label: "Acceptance of Terms" },
  { id: "services",     label: "Our Services" },
  { id: "obligations",  label: "Client Obligations" },
  { id: "payment",      label: "Payment & Pricing" },
  { id: "ip",           label: "Intellectual Property" },
  { id: "delivery",     label: "Delivery & Timelines" },
  { id: "liability",    label: "Limitation of Liability" },
  { id: "termination",  label: "Termination" },
  { id: "governing",    label: "Governing Law" },
  { id: "contact",      label: "Contact Us" },
];

export default function TermsOfService() {
  return (
    <div className="legal-page">
      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-kicker">Legal</span>
          <h1 className="legal-title">Terms of <span>Service</span></h1>
          <p className="legal-meta">Last updated: June 2025 &nbsp;·&nbsp; Please read carefully before using our services</p>
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
              These Terms of Service govern your use of RBC Solutions' website and services.
              By engaging with us, you confirm that you have read, understood, and agreed to these terms.
            </p>
          </div>

          <div className="legal-section" id="acceptance">
            <p className="legal-section-num">01</p>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing our website, submitting an enquiry, or engaging our services, you agree to be bound
              by these Terms of Service. If you do not agree, please do not use our services.
            </p>
            <p>
              These terms apply to all visitors, clients, and users of RBC Solutions services including
              web development, software licensing, and OTT platform management.
            </p>
          </div>

          <div className="legal-section" id="services">
            <p className="legal-section-num">02</p>
            <h2>Our Services</h2>
            <p>RBC Solutions provides the following categories of services:</p>
            <ul>
              <li><strong style={{color:"#e8ecf2"}}>Web Development</strong> — landing pages, business websites, campaign pages, and ongoing maintenance.</li>
              <li><strong style={{color:"#e8ecf2"}}>Software &amp; Licensing</strong> — genuine verified software licenses, account setup, renewals, and support.</li>
              <li><strong style={{color:"#e8ecf2"}}>OTT Solutions</strong> — streaming platform account setup, plan selection, and renewal management.</li>
              <li><strong style={{color:"#e8ecf2"}}>CRM &amp; Support</strong> — client management via RBC CRM, Google Sheets integration, and project tracking.</li>
            </ul>
            <p>
              Service scope, pricing, and deliverables are agreed upon before any project begins,
              via written confirmation (email or WhatsApp).
            </p>
          </div>

          <div className="legal-section" id="obligations">
            <p className="legal-section-num">03</p>
            <h2>Client Obligations</h2>
            <p>To ensure timely delivery, you agree to:</p>
            <ul>
              <li>Provide accurate and complete project details and content on time.</li>
              <li>Respond to queries and approval requests within a reasonable timeframe.</li>
              <li>Not provide misleading information about your business or intended use.</li>
              <li>Use our services only for lawful purposes in compliance with applicable laws.</li>
              <li>Not attempt to resell, redistribute, or misrepresent services without prior written consent.</li>
            </ul>
          </div>

          <div className="legal-section" id="payment">
            <p className="legal-section-num">04</p>
            <h2>Payment &amp; Pricing</h2>
            <p>
              All pricing is communicated before work begins. Unless otherwise agreed:
            </p>
            <ul>
              <li>A deposit or full payment may be required before project commencement.</li>
              <li>Final delivery is made after full payment is received.</li>
              <li>Refunds are not provided once work has substantially commenced, unless we are at fault.</li>
              <li>Renewal services are billed in advance and non-refundable after renewal is processed.</li>
            </ul>
            <div className="legal-highlight">
              <p>
                Prices are subject to change. Any changes will be communicated at least 7 days before they take effect for active clients.
              </p>
            </div>
          </div>

          <div className="legal-section" id="ip">
            <p className="legal-section-num">05</p>
            <h2>Intellectual Property</h2>
            <p>
              Upon full payment, the client owns the final website design and code deliverables created specifically for their project.
            </p>
            <p>
              RBC Solutions retains rights to:
            </p>
            <ul>
              <li>Internal tools, frameworks, and reusable components used in development.</li>
              <li>The RBC CRM system and proprietary workflows.</li>
              <li>Portfolio usage — we may feature your project in our portfolio unless you opt out in writing.</li>
            </ul>
            <p>
              Third-party software, themes, plugins, or licenses remain subject to their respective vendor terms.
            </p>
          </div>

          <div className="legal-section" id="delivery">
            <p className="legal-section-num">06</p>
            <h2>Delivery &amp; Timelines</h2>
            <p>
              Estimated delivery timelines are provided at project start. Delays caused by:
            </p>
            <ul>
              <li>Late content or approvals from the client.</li>
              <li>Scope changes requested after project commencement.</li>
              <li>Force majeure events.</li>
            </ul>
            <p>
              ...are not the responsibility of RBC Solutions. We will communicate any delays proactively and work to resolve them quickly.
            </p>
          </div>

          <div className="legal-section" id="liability">
            <p className="legal-section-num">07</p>
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, RBC Solutions shall not be liable for:
            </p>
            <ul>
              <li>Indirect, incidental, or consequential damages resulting from use of our services.</li>
              <li>Loss of revenue, data, or business opportunities.</li>
              <li>Third-party service outages (hosting, OTT platforms, software vendors).</li>
            </ul>
            <p>
              Our total liability in any matter shall not exceed the amount paid by the client for the relevant service.
            </p>
          </div>

          <div className="legal-section" id="termination">
            <p className="legal-section-num">08</p>
            <h2>Termination</h2>
            <p>
              Either party may terminate a service agreement with 7 days' written notice.
              Upon termination:
            </p>
            <ul>
              <li>Work completed up to the termination date will be invoiced at the agreed rate.</li>
              <li>Deposits are non-refundable once work has commenced.</li>
              <li>Deliverables will be handed over upon settlement of any outstanding payments.</li>
            </ul>
          </div>

          <div className="legal-section" id="governing">
            <p className="legal-section-num">09</p>
            <h2>Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive
              jurisdiction of the courts located in [Your City], India.
            </p>
          </div>

          <div className="legal-section" id="contact">
            <p className="legal-section-num">10</p>
            <h2>Contact Us</h2>
            <p>Questions about these Terms? Get in touch:</p>
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