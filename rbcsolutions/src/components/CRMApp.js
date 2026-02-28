import React, { useState, useEffect } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzw0qM_qWE8XwaNnGg2si-fxxp87c9Fnz8iQ9iZKj4Z0VC1r37viDJIDZgxxzDpDioi8A/exec";

// ================= MAIN APP =================
export default function CRMApp() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="crm-wrapper">
      <Sidebar current={view} onChange={setView} />
      <main className="crm-main">
        {view === "dashboard"  && <ServiceLeads />}
        {view === "webdev"     && <ServiceLeads service="Web Development" />}
        {view === "ott"        && <ServiceLeads service="OTT" />}
        {view === "software"   && <ServiceLeads service="Software" />}
        {view === "inquiries"  && <Inquiries />}
        {view === "add"        && <AddLeadForm />}
        {view === "addInquiry" && <AddInquiryForm />}
      </main>
    </div>
  );
}

// ================= SIDEBAR =================
function Sidebar({ current, onChange }) {
  const btn = (id, label) => (
    <button
      key={id}
      onClick={() => onChange(id)}
      className={`crm-nav-btn${current === id ? " active" : ""}`}
    >
      {label}
    </button>
  );

  return (
    <aside className="crm-sidebar">
      <div className="crm-sidebar-logo">
        🏢 <span>RBC CRM</span>
      </div>

      <p className="crm-section-label">Leads</p>
      {btn("dashboard", "🏠 All Leads")}
      {btn("webdev",    "💻 Web Development")}
      {btn("ott",       "📺 OTT")}
      {btn("software",  "💾 Software")}
      {btn("add",       "➕ Add Lead")}

      <p className="crm-section-label">Inquiries</p>
      {btn("inquiries",   "📋 All Inquiries")}
      {btn("addInquiry",  "➕ Add Inquiry")}
    </aside>
  );
}

// ================= STATUS BADGE =================
function StatusBadge({ status }) {
  const map = {
    "new":          "crm-badge--new",
    "in progress":  "crm-badge--progress",
    "paid":         "crm-badge--paid",
    "contacted":    "crm-badge--contacted",
    "follow up":    "crm-badge--followup",
    "not interested": "crm-badge--notinterested",
  };
  const cls = map[(status || "").toLowerCase()] || "crm-badge--new";
  return <span className={`crm-badge ${cls}`}>{status}</span>;
}

// ================= ADD LEAD FORM =================
function AddLeadForm() {
  const blank = {
    name: "", phone: "", email: "", service: "Web Development",
    product: "", amount: "", serviceStartDate: "", serviceEndDate: "",
    paymentMethod: "UPI", status: "New",
  };
  const [form, setForm]       = useState(blank);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const params = new URLSearchParams({ ...form, source: "Manual", type: "leads" });
      const res  = await fetch(SCRIPT_URL, { method: "POST", body: params });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMessage("✅ Lead saved successfully!");
      setForm(blank);
      window.dispatchEvent(new Event("crm-refresh"));
    } catch (err) {
      setMessage("❌ Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="crm-form-page">
      <p className="crm-page-kicker">New Entry</p>
      <h1 className="crm-page-title">Add New Lead</h1>

      <form className="crm-form" onSubmit={handleSubmit}>
        <CrmField label="Name">
          <input required value={form.name} onChange={set("name")} placeholder="Client full name" />
        </CrmField>
        <CrmField label="Phone">
          <input required value={form.phone} onChange={set("phone")} placeholder="+91 XXXXXXXXXX" />
        </CrmField>
        <CrmField label="Email">
          <input type="email" value={form.email} onChange={set("email")} placeholder="email@example.com" />
        </CrmField>
        <CrmField label="Service">
          <select value={form.service} onChange={set("service")}>
            <option>Web Development</option>
            <option>OTT</option>
            <option>Software</option>
          </select>
        </CrmField>
        <CrmField label="Product">
          <input value={form.product} onChange={set("product")} placeholder="Product / plan name" />
        </CrmField>
        <CrmField label="Amount (₹)">
          <input type="number" value={form.amount} onChange={set("amount")} placeholder="0" />
        </CrmField>
        <CrmField label="Start Date">
          <input type="date" value={form.serviceStartDate} onChange={set("serviceStartDate")} />
        </CrmField>
        <CrmField label="Expiry Date">
          <input type="date" value={form.serviceEndDate} onChange={set("serviceEndDate")} />
        </CrmField>
        <CrmField label="Payment Method">
          <select value={form.paymentMethod} onChange={set("paymentMethod")}>
            <option>UPI</option>
            <option>Bank Transfer</option>
            <option>Card</option>
            <option>Cash</option>
          </select>
        </CrmField>
        <CrmField label="Status">
          <select value={form.status} onChange={set("status")}>
            <option>New</option>
            <option>In Progress</option>
            <option>Paid</option>
          </select>
        </CrmField>

        <button type="submit" className="crm-submit-btn" disabled={loading}>
          {loading ? "Saving…" : "💾  Save Lead"}
        </button>
      </form>

      {message && (
        <div className={`crm-msg ${message.includes("✅") ? "crm-msg--success" : "crm-msg--error"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

// ================= ADD INQUIRY FORM =================
function AddInquiryForm() {
  const blank = {
    name: "", phone: "", email: "", service: "Web Development",
    interest: "", notes: "", status: "New",
  };
  const [form, setForm]       = useState(blank);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const params = new URLSearchParams({ ...form, source: "Manual", type: "inquiries" });
      const res  = await fetch(SCRIPT_URL, { method: "POST", body: params });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMessage("✅ Inquiry saved successfully!");
      setForm(blank);
      window.dispatchEvent(new Event("crm-refresh"));
    } catch (err) {
      setMessage("❌ Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="crm-form-page">
      <p className="crm-page-kicker">New Entry</p>
      <h1 className="crm-page-title">Add New Inquiry</h1>

      <form className="crm-form" onSubmit={handleSubmit}>
        <CrmField label="Name">
          <input required value={form.name} onChange={set("name")} placeholder="Client full name" />
        </CrmField>
        <CrmField label="Phone">
          <input required value={form.phone} onChange={set("phone")} placeholder="+91 XXXXXXXXXX" />
        </CrmField>
        <CrmField label="Email">
          <input type="email" value={form.email} onChange={set("email")} placeholder="email@example.com" />
        </CrmField>
        <CrmField label="Service">
          <select value={form.service} onChange={set("service")}>
            <option>Web Development</option>
            <option>OTT</option>
            <option>Software</option>
          </select>
        </CrmField>
        <CrmField label="Interest / Requirements">
          <input value={form.interest} onChange={set("interest")} placeholder="What are they looking for?" />
        </CrmField>
        <CrmField label="Notes">
          <textarea value={form.notes} onChange={set("notes")} rows="3" placeholder="Any additional notes…" />
        </CrmField>
        <CrmField label="Status">
          <select value={form.status} onChange={set("status")}>
            <option>New</option>
            <option>Contacted</option>
            <option>Follow Up</option>
            <option>Not Interested</option>
          </select>
        </CrmField>

        <button type="submit" className="crm-submit-btn" disabled={loading}>
          {loading ? "Saving…" : "💾  Save Inquiry"}
        </button>
      </form>

      {message && (
        <div className={`crm-msg ${message.includes("✅") ? "crm-msg--success" : "crm-msg--error"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

// ================= LEADS TABLE =================
function ServiceLeads({ service }) {
  const [leads, setLeads]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    const fetchLeads = () => {
      setLoading(true);
      fetch(SCRIPT_URL + "?type=leads&_=" + Date.now())
        .then(r => r.json())
        .then(data => {
          if (!data.success) throw new Error(data.error);
          const rows = data.rows || [];
          setLeads(
            service
              ? rows.filter(r => (r.service || "").toLowerCase().includes(service.toLowerCase().split(" ")[0]))
              : rows
          );
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchLeads();
    window.addEventListener("crm-refresh", fetchLeads);
    return () => window.removeEventListener("crm-refresh", fetchLeads);
  }, [service]);

  const handleDelete = async (lead) => {
    if (!window.confirm(`Delete lead: ${lead.name}?`)) return;
    try {
      const params = new URLSearchParams({ action: "delete", rowIndex: lead.rowIndex, type: "leads" });
      const data   = await (await fetch(SCRIPT_URL, { method: "POST", body: params })).json();
      if (!data.success) throw new Error(data.error);
      window.dispatchEvent(new Event("crm-refresh"));
    } catch (err) { alert("Failed: " + err.message); }
  };

  const handleSaveEdit = async () => {
    try {
      const params = new URLSearchParams({ ...editingLead, action: "update", type: "leads" });
      const data   = await (await fetch(SCRIPT_URL, { method: "POST", body: params })).json();
      if (!data.success) throw new Error(data.error);
      setEditingLead(null);
      window.dispatchEvent(new Event("crm-refresh"));
    } catch (err) { alert("Failed: " + err.message); }
  };

  if (loading) return (
    <div className="crm-loading">
      <div className="crm-spinner" /> Loading leads…
    </div>
  );

  return (
    <div>
      <p className="crm-page-kicker">Leads</p>
      <h1 className="crm-page-title">{service || "All"} Leads</h1>

      <div className="crm-table-wrap" style={{ marginTop: "24px" }}>
        <table className="crm-table">
          <thead>
            <tr>
              <th>Sr</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Start</th>
              <th>Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="10">
                  <div className="crm-empty">No leads found</div>
                </td>
              </tr>
            ) : leads.map(l => (
              <tr key={l.rowIndex}>
                <td>{l.sr}</td>
                <td style={{ color: "#f5f5f5", fontWeight: 500 }}>{l.name}</td>
                <td>{l.phone}</td>
                <td>{l.service}</td>
                <td>{l.product}</td>
                <td style={{ color: "#34d399", fontWeight: 600 }}>{l.amount ? `₹${l.amount}` : "—"}</td>
                <td><StatusBadge status={l.status} /></td>
                <td>{l.serviceStartDate || "—"}</td>
                <td>{l.serviceEndDate || "—"}</td>
                <td>
                  <div className="crm-action-btns">
                    <button className="crm-action-btn crm-action-btn--edit"   onClick={() => setEditingLead({...l})} title="Edit">✏️</button>
                    <button className="crm-action-btn crm-action-btn--delete" onClick={() => handleDelete(l)}         title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingLead && (
        <EditLeadModal
          lead={editingLead}
          onChange={setEditingLead}
          onSave={handleSaveEdit}
          onCancel={() => setEditingLead(null)}
        />
      )}
    </div>
  );
}

// ================= INQUIRIES TABLE =================
function Inquiries() {
  const [inquiries, setInquiries]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [editingInquiry, setEditingInquiry] = useState(null);

  useEffect(() => {
    const fetchInquiries = () => {
      setLoading(true);
      fetch(SCRIPT_URL + "?type=inquiries&_=" + Date.now())
        .then(r => r.json())
        .then(data => {
          if (!data.success) throw new Error(data.error);
          setInquiries(data.rows || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchInquiries();
    window.addEventListener("crm-refresh", fetchInquiries);
    return () => window.removeEventListener("crm-refresh", fetchInquiries);
  }, []);

  const handleDelete = async (inq) => {
    if (!window.confirm(`Delete inquiry: ${inq.name}?`)) return;
    try {
      const params = new URLSearchParams({ action: "delete", rowIndex: inq.rowIndex, type: "inquiries" });
      const data   = await (await fetch(SCRIPT_URL, { method: "POST", body: params })).json();
      if (!data.success) throw new Error(data.error);
      window.dispatchEvent(new Event("crm-refresh"));
    } catch (err) { alert("Failed: " + err.message); }
  };

  const handleConvert = async (inq) => {
    if (!window.confirm(`Convert ${inq.name} to a Lead?`)) return;
    try {
      const params = new URLSearchParams({ action: "convert", rowIndex: inq.rowIndex, type: "inquiries" });
      const data   = await (await fetch(SCRIPT_URL, { method: "POST", body: params })).json();
      if (!data.success) throw new Error(data.error);
      window.dispatchEvent(new Event("crm-refresh"));
      alert("✅ Converted to Lead successfully!");
    } catch (err) { alert("Failed: " + err.message); }
  };

  const handleSaveEdit = async () => {
    try {
      const params = new URLSearchParams({ ...editingInquiry, action: "update", type: "inquiries" });
      const data   = await (await fetch(SCRIPT_URL, { method: "POST", body: params })).json();
      if (!data.success) throw new Error(data.error);
      setEditingInquiry(null);
      window.dispatchEvent(new Event("crm-refresh"));
    } catch (err) { alert("Failed: " + err.message); }
  };

  if (loading) return (
    <div className="crm-loading">
      <div className="crm-spinner" /> Loading inquiries…
    </div>
  );

  return (
    <div>
      <p className="crm-page-kicker">Inquiries</p>
      <h1 className="crm-page-title">All Inquiries</h1>

      <div className="crm-table-wrap" style={{ marginTop: "24px" }}>
        <table className="crm-table">
          <thead>
            <tr>
              <th>Sr</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Service</th>
              <th>Interest</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan="9">
                  <div className="crm-empty">No inquiries found</div>
                </td>
              </tr>
            ) : inquiries.map(inq => (
              <tr key={inq.rowIndex}>
                <td>{inq.sr}</td>
                <td style={{ color: "#f5f5f5", fontWeight: 500 }}>{inq.name}</td>
                <td>{inq.phone}</td>
                <td>{inq.email}</td>
                <td>{inq.service}</td>
                <td>{inq.interest}</td>
                <td>{inq.notes}</td>
                <td><StatusBadge status={inq.status} /></td>
                <td>
                  <div className="crm-action-btns">
                    <button className="crm-action-btn crm-action-btn--edit"    onClick={() => setEditingInquiry({...inq})} title="Edit">✏️</button>
                    <button className="crm-action-btn crm-action-btn--delete"  onClick={() => handleDelete(inq)}            title="Delete">🗑️</button>
                    <button className="crm-action-btn crm-action-btn--convert" onClick={() => handleConvert(inq)}           title="Convert to Lead">➡️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingInquiry && (
        <EditInquiryModal
          inquiry={editingInquiry}
          onChange={setEditingInquiry}
          onSave={handleSaveEdit}
          onCancel={() => setEditingInquiry(null)}
        />
      )}
    </div>
  );
}

// ================= EDIT LEAD MODAL =================
function EditLeadModal({ lead, onChange, onSave, onCancel }) {
  const set = (k) => (e) => onChange({ ...lead, [k]: e.target.value });

  return (
    <div className="crm-modal-overlay" onClick={onCancel}>
      <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="crm-modal-title">Edit Lead</h2>
        <div className="crm-modal-form">
          <CrmField label="Name"><input value={lead.name}            onChange={set("name")} /></CrmField>
          <CrmField label="Phone"><input value={lead.phone}          onChange={set("phone")} /></CrmField>
          <CrmField label="Email"><input value={lead.email}          onChange={set("email")} /></CrmField>
          <CrmField label="Service">
            <select value={lead.service} onChange={set("service")}>
              <option>Web Development</option>
              <option>OTT</option>
              <option>Software</option>
            </select>
          </CrmField>
          <CrmField label="Product"><input value={lead.product}      onChange={set("product")} /></CrmField>
          <CrmField label="Amount">  <input value={lead.amount}      onChange={set("amount")} /></CrmField>
          <CrmField label="Start Date"><input type="date" value={lead.serviceStartDate} onChange={set("serviceStartDate")} /></CrmField>
          <CrmField label="Expiry Date"><input type="date" value={lead.serviceEndDate}  onChange={set("serviceEndDate")} /></CrmField>
          <CrmField label="Payment Method">
            <select value={lead.paymentMethod} onChange={set("paymentMethod")}>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Card</option>
              <option>Cash</option>
            </select>
          </CrmField>
          <CrmField label="Status">
            <select value={lead.status} onChange={set("status")}>
              <option>New</option>
              <option>In Progress</option>
              <option>Paid</option>
            </select>
          </CrmField>
          <div className="crm-modal-actions">
            <button className="crm-modal-save"   onClick={onSave}>💾  Save</button>
            <button className="crm-modal-cancel" onClick={onCancel}>✕  Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= EDIT INQUIRY MODAL =================
function EditInquiryModal({ inquiry, onChange, onSave, onCancel }) {
  const set = (k) => (e) => onChange({ ...inquiry, [k]: e.target.value });

  return (
    <div className="crm-modal-overlay" onClick={onCancel}>
      <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="crm-modal-title">Edit Inquiry</h2>
        <div className="crm-modal-form">
          <CrmField label="Name"><input value={inquiry.name}     onChange={set("name")} /></CrmField>
          <CrmField label="Phone"><input value={inquiry.phone}   onChange={set("phone")} /></CrmField>
          <CrmField label="Email"><input value={inquiry.email}   onChange={set("email")} /></CrmField>
          <CrmField label="Service">
            <select value={inquiry.service} onChange={set("service")}>
              <option>Web Development</option>
              <option>OTT</option>
              <option>Software</option>
            </select>
          </CrmField>
          <CrmField label="Interest"><input value={inquiry.interest} onChange={set("interest")} /></CrmField>
          <CrmField label="Notes">
            <textarea value={inquiry.notes} onChange={set("notes")} rows="3" />
          </CrmField>
          <CrmField label="Status">
            <select value={inquiry.status} onChange={set("status")}>
              <option>New</option>
              <option>Contacted</option>
              <option>Follow Up</option>
              <option>Not Interested</option>
            </select>
          </CrmField>
          <div className="crm-modal-actions">
            <button className="crm-modal-save"   onClick={onSave}>💾  Save</button>
            <button className="crm-modal-cancel" onClick={onCancel}>✕  Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= FIELD HELPER =================
function CrmField({ label, children }) {
  return (
    <div className="crm-field">
      <label>{label}</label>
      {children}
    </div>
  );
}