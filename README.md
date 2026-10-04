# Nitish Kumar — Personal Portfolio & Engineering Showcase

A production-ready, quiet luxury personal portfolio website engineered with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, and Lenis smooth scrolling.

Built strictly against verified professional credentials and authentic multimedia assets.

---

## 🏛️ Design System & Aesthetic Principles

- **Palette**: White (`#ffffff`), paper (`#f4f2ee`), black (`#0d0d0d`), and neutral grays only.
- **Brand Accents**: Official brand logos retain authentic colors with soft, low-opacity ambient glows.
- **Quiet Surface**: No splash screens, no loaders, no curtains/transitions, zero WebGL/Three.js.
- **Typography**: Self-hosted variable fonts:
  - **Inter Tight** (Variable Display & Body)
  - **Instrument Serif** (Italic Accent Word per heading)
  - **JetBrains Mono** (Technical labels, indices, metadata)

---

## 📋 Section Architecture

| Order | Section | Component | Description & Key Interaction |
|---|---|---|---|
| **00** | **Navigation** | `Navigation.tsx` | 2px scroll progress bar, initials badge (360° spin), frosted pill nav, active indicator, mobile overlay. |
| **01** | **Hero** | `Hero.tsx` | Centered 3D character video (`mix-blend-mode: multiply`), ghost outlined name, play/pause sound toggle, unmuted on first interaction, auto-pauses when <35% visible. |
| **02** | **About** | `About.tsx` | 3-column layout, swinging lanyard ID card with mouse-reactive pendulum physics and 3D card flip. |
| **03** | **Skills** | `Skills.tsx` | Periodic table grid (8 cols desktop / 4 cols mobile), family filters, sticky inspector panel with 150px SVG pop animation. |
| **04** | **Work** | `Work.tsx` | Expanding accordion gallery (`flex: 8`), tech chips, illustrative mini-UIs (WhatsApp bot waveform, real-time telephony call dashboard, e-commerce catalog). |
| **05** | **Certifications**| `Certifications.tsx` | Ink-flood hover index on crisp white background with animated `scaleX` fill. |
| **06** | **Experience** | `Experience.tsx` | Unified education & experience path with dynamic scroll-drawing spine. |
| **07** | **Achievements** | `Achievements.tsx` | Pinned horizontal scroll track (`100svh`), easeOutQuart number count-up animations, soft brand glow. |
| **08** | **Contact** | `Contact.tsx` | Letter-bounce headline hover, single-click copy-email chip with `aria-live`, spinning "say hello" badge, and footer. |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+ (tested on Node.js 24)
- npm 9+

### Commands
```bash
# 1. Navigate to the project directory
cd portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎬 Rebuilding Hero Assets

The hero video pipeline crops the 1080p source video, scales it to 768px wide, whitens the background with `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98`, crossfades the audio and video seamlessly across a 0.5s loop, and exports MP4, WebM, portrait bust, and OG cards.

To rebuild using Node.js / FFmpeg:
```bash
node scripts/build-hero-assets.js
```

Or using Python:
```bash
python scripts/build-hero-assets.py
```

Generated assets placed in:
- `public/hero/hero.mp4`
- `public/hero/hero.webm`
- `public/portrait-bust.webp`
- `public/og.jpg`
- `public/resume.pdf`

---

## 📜 Brand Logos & Credits

- All brand icons (JavaScript, TypeScript, Python, React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Docker, Git, Gemini, Twilio) are vector SVGs conforming to their respective brand guidelines and MIT/Creative Commons licensing.
- Smooth scrolling powered by [Lenis](https://github.com/darkroomengineering/lenis).
