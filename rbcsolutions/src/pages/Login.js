import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = "http://localhost:5000/api";

export default function Login() {
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setMessage("");
    try {
      const res = await fetch(`${API}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage(`✅ Code sent to ${email}`);
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      loginSuccess(email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Dashboard Access</h2>
        <p style={styles.subtitle}>
          {step === 1 ? "Enter your Gmail to receive a login code" : `Enter the 6-digit code sent to ${email}`}
        </p>

        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <input
              style={styles.input}
              type="email"
              placeholder="you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Login Code →"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <input
              style={{ ...styles.input, letterSpacing: "8px", fontSize: "24px", textAlign: "center" }}
              type="text"
              placeholder="000000"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login ✓"}
            </button>
            <button
              type="button"
              style={styles.linkBtn}
              onClick={() => { setStep(1); setOtp(""); setError(""); setMessage(""); }}
            >
              ← Use different email
            </button>
          </form>
        )}

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>❌ {error}</p>}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"#f0f2f5" },
  card: { background:"#fff", padding:"40px", borderRadius:"16px", boxShadow:"0 8px 30px rgba(0,0,0,0.1)", width:"100%", maxWidth:"400px" },
  title: { textAlign:"center", fontSize:"24px", marginBottom:"8px", color:"#1a1a2e" },
  subtitle: { textAlign:"center", color:"#666", fontSize:"14px", marginBottom:"24px" },
  input: { width:"100%", padding:"13px", marginBottom:"14px", border:"1px solid #ddd", borderRadius:"8px", fontSize:"15px", boxSizing:"border-box" },
  button: { width:"100%", padding:"13px", background:"#4F46E5", color:"#fff", border:"none", borderRadius:"8px", fontSize:"16px", cursor:"pointer", fontWeight:"bold" },
  linkBtn: { width:"100%", marginTop:"10px", background:"none", border:"none", color:"#4F46E5", cursor:"pointer", fontSize:"14px" },
  success: { color:"green", textAlign:"center", marginTop:"12px" },
  error: { color:"red", textAlign:"center", marginTop:"12px" },
};
