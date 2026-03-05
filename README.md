# RBC Solutions — Digital Agency Website + CRM

> **Web Development · Software & OTT Solutions · Built-in CRM Dashboard**

A full-stack business website for **RBC Solutions** — a digital agency serving startups, small businesses, enterprises, and agencies across India. Built with React, featuring interactive 3D hero models, scroll animations, a contact form connected to Google Sheets, and a protected internal CRM dashboard.

🌐 **Live Site:** [rbcsolutions.netlify.app](https://rbcsolutions.netlify.app)
📦 **Repo:** [github.com/rudra-chudasama/CRM](https://github.com/rudra-chudasama/CRM)

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — Hero slider, services, industries, testimonials, FAQ |
| `/about` | About — Story, values, process, who we serve |
| `/web-solutions` | Web Solutions — Types, process, tech stack, portfolio, pricing |
| `/software-ott` | Software & OTT — Licenses, platforms, process, pricing |
| `/careers` | Careers — Open roles, perks, hiring process |
| `/contact` | Contact Us — Form → Google Sheets CRM, WhatsApp, FAQ |
| `/login` | Dashboard Login — OTP via email |
| `/dashboard` | 🔒 Protected CRM — Leads & Inquiries management |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |
| `/cookie-policy` | Cookie Policy |

---

## Tech Stack

**Frontend**
- React 18 + React Router DOM
- Framer Motion — 3D interactive draggable models
- GSAP + ScrollTrigger — scroll animations
- Swiper.js — hero carousel
- CSS custom design system (dark navy theme)

**Backend / Integrations**
- Node.js + Express — OTP login API
- Nodemailer — email OTP delivery
- Google Apps Script — form submissions → Google Sheets CRM
- Google Sheets — live CRM data storage

**Deployment**
- Frontend → Netlify (auto-deploy from GitHub `main`)
- Backend → separate Node.js server

---

## Features

- **Interactive 3D Models** — drag, throw, and hover-follow animations on every hero section
- **Hero Carousel** — 3-slide Swiper with autoplay that pauses on model interaction
- **RBC CRM Dashboard** — protected route with leads & inquiries tables, edit modals, convert inquiry → lead, delete
- **Contact Form → Google Sheets** — submissions go directly to the internal CRM dashboard
- **OTP Login** — email-based 6-digit code authentication for dashboard access
- **GSAP Scroll Animations** — staggered card reveals, parallax effects, section headers
- **Fully Responsive** — mobile-first layout, hamburger nav, touch-friendly
- **Careers Page** — filterable job listings with expandable cards, apply via WhatsApp

---

## Project Structure

```
CRM/
├── rbcsolutions/          # React frontend
│   ├── public/
│   │   └── _redirects     # Netlify SPA routing fix
│   └── src/
│       ├── pages/
│       │   ├── Home.js
│       │   ├── About.js
│       │   ├── WebSolutions.js
│       │   ├── SoftwareOTT.js
│       │   ├── Careers.js
│       │   ├── contect-us.js
│       │   ├── Login.js
│       │   ├── PrivacyPolicy.js
│       │   ├── TermsOfService.js
│       │   └── CookiePolicy.js
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Footer.js
│       │   ├── CRMApp.js
│       │   ├── ScrollToTop.js
│       │   └── ProtectedRoute.js
│       ├── context/
│       │   └── AuthContext.js
│       ├── assets/
│       │   ├── icon/       # Service icons
│       │   └── *.png       # 3D model images & backgrounds
│       ├── App.js
│       ├── index.css       # Full design system
│       └── index.js
└── backend/               # Node.js OTP server
    ├── server.js
    └── package.json
```

---

## Getting Started

### Frontend

```bash
cd rbcsolutions
npm install
npm start
```

Runs on `http://localhost:3000`

### Backend (OTP Server)

```bash
cd backend
npm install
node server.js
```

Runs on `http://localhost:5000`

> **Note:** Create a `.env` file in `/backend` with your email credentials for Nodemailer.

```env
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
```

### Build for Production

```bash
cd rbcsolutions
npm run build
```

---

## Netlify Configuration

| Setting | Value |
|---|---|
| Base directory | `rbcsolutions` |
| Build command | `npm run build` |
| Publish directory | `rbcsolutions/build` |
| Branch | `main` |

Add `rbcsolutions/public/_redirects` with:
```
/*    /index.html   200
```

---

## CRM Dashboard

The internal dashboard at `/dashboard` is protected by OTP login. It connects to a **Google Apps Script** endpoint that reads/writes data in Google Sheets.

**Features:**
- View all leads, filtered by service (Web Dev / OTT / Software)
- View all inquiries from the contact form
- Add, edit, delete leads and inquiries
- Convert an inquiry directly into a lead
- Status badges: New · In Progress · Paid · Contacted · Follow Up · Not Interested

---

## Contact

**RBC Solutions**
- 💬 WhatsApp: [+91 93162 51193](https://wa.me/919316251193)
- 📧 Email: hello@rbcsolutions.in
- 🌐 Website: [rbcsolutions.netlify.app](https://rbcsolutions.netlify.app)

---

## License

This project is proprietary. All rights reserved © RBC Solutions.
