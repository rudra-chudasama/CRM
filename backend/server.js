const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

// Store OTPs in memory
const otpStore = {};

// Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ─── API 1: Send OTP ───
app.post("/api/send-otp", async(req, res) => {
    const { email } = req.body;

    // Check company domain
    const domain = email.split("@")[1];
    if (domain !== process.env.ALLOWED_DOMAIN) {
        return res.status(403).json({ message: "Access denied. Use your company email." });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    otpStore[email] = { otp, expiresAt };

    try {
        await transporter.sendMail({
            from: `"Dashboard Access" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your Dashboard Login Code",
            html: `
        <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:30px;border:1px solid #eee;border-radius:10px">
          <h2 style="color:#4F46E5">Dashboard Login Code</h2>
          <p>Use the code below to login. It expires in <b>10 minutes</b>.</p>
          <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#333;text-align:center;padding:20px;background:#f4f6f9;border-radius:8px">
            ${otp}
          </div>
          <p style="color:#999;font-size:12px;margin-top:20px">If you didn't request this, ignore this email.</p>
        </div>
      `,
        });
        res.json({ message: "OTP sent successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to send email." });
    }
});

// ─── API 2: Verify OTP ───
app.post("/api/verify-otp", (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (!record) {
        return res.status(400).json({ message: "No OTP found. Please request again." });
    }

    if (Date.now() > record.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    if (record.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    delete otpStore[email];
    res.json({ message: "Login successful!", email });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});