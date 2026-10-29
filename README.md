# Sikshya Global AI | Mallik Group 7G Quantum Architecture

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Author](https://img.shields.io/badge/Author-Niraj%20Mallik-cyan.svg)](mailto:nirajmallik143@gmail.com)
[![Platform](https://img.shields.io/badge/Platform-Play%20Store%20%7C%20App%20Store%20%7C%20Web-emerald.svg)]()
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nirajmallik143-hub/EDUCATION-AI-GLOBAL-&env=GEMINI_API_KEY&envDescription=Gemini%20API%20Key%20from%20Google%20AI%20Studio)

> **"Dedicated to helping humanity and making human beings happy."**  
> Copyright © 2026 Niraj Mallik (Mallik Group) • MIT License • Open Source for all students worldwide.

---

## 🌟 Overview

**Sikshya Global AI** is an open-source, universal education platform created by **Niraj Mallik**. Engineered under the **MIT License**, it democratizes high-quality education for students worldwide:

- 🔒 **Zero Student API Configuration**: The API key is securely handled by serverless/server backend routes (`/api/ask-ai`). Students never need to input, purchase, or manage their own API keys.
- ⚡ **Quantum 7G Biometric Verification**: Students verify their ID, Gmail OTP, Phone SMS OTP, and Fingerprint / Face Scan once. Credentials persist in `localStorage` (`sikshya_quantum_biometric_user`), so they never need to log in again.
- 🎙️ **Real-Time Voice & Vision AI Coaching**: Live two-way conversational voice interaction, document analysis, and camera homework scanner.
- 👥 **Global Peer Problem Solving Group**: Collaborative problem-solving room with camera scanning, file uploads, and audio notes.
- 🌐 **18 Global Languages & Native Script Keyboard**: Full coverage for English, Urdu, Nepali, Hindi, Bengali, Mandarin, Japanese, Korean, Arabic, Spanish, French, Vietnamese, Thai, Indonesian, Tagalog, Tamil, Telugu, and Marathi.
- ⏱️ **Study Alarm & Pomodoro System**: Audio alarms and study reminders designed for student focus.
- 🎮 **EMAX Game Arena**: Level-based Quantum Physics & Problem Solving Quiz game with streaks and levels.
- 🌍 **Humanitarian Mission & Free Schools in Nepal**: Official initiative supporting free schools in remote Himalayan regions, youth rehabilitation centers, and student scholarships.

---

## 🚀 1-Click Vercel Deployment

Deploy directly to **Vercel** with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nirajmallik143-hub/EDUCATION-AI-GLOBAL-&env=GEMINI_API_KEY&envDescription=Gemini%20API%20Key%20from%20Google%20AI%20Studio)

### Manual Vercel Deployment:
1. Push this repository to GitHub: `https://github.com/nirajmallik143-hub/EDUCATION-AI-GLOBAL-`
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"**.
3. Import your GitHub repository (`EDUCATION-AI-GLOBAL-`).
4. In **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Gemini API key from Google AI Studio.
5. Click **Deploy**. Vercel will automatically build the Vite frontend and provision the Serverless Function at `/api/ask-ai`!

---

## 💻 GitHub Repository Commands

To push this application to your GitHub repository:

```bash
# 1. Initialize git (if not already initialized)
git init
git branch -M main

# 2. Add remote origin
git remote add origin https://github.com/nirajmallik143-hub/EDUCATION-AI-GLOBAL-.git

# 3. Stage all files
git add .

# 4. Commit with descriptive message
git commit -m "feat: complete Sikshya Global AI with hidden server-side API, biometric gate, and Vercel serverless deployment"

# 5. Push to GitHub
git push -u origin main --force
```

---

## 📱 Google Play Store & Apple App Store Deployment

This repository is ready for store submission as a Progressive Web App (PWA) / Trusted Web Activity (TWA):

1. **Manifest & Service Worker**: `public/manifest.json` and `public/sw.js` are configured with standalone display, dark theme `#0A0F1C`, and maskable icons.
2. **Package for Play Store**:
   - Go to [PWABuilder](https://www.pwabuilder.com/).
   - Enter your deployed Vercel URL (e.g. `https://your-app.vercel.app`).
   - Click **"Package for Stores"** > **Google Play (Android)** to download an `.aab` (Android App Bundle) or `.apk`.
   - Upload the bundle to the **Google Play Console**.
3. **Package for iOS App Store**:
   - In PWABuilder, click **Apple iOS** to generate the Xcode project archive.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server on http://localhost:3000
npm run dev

# Build production bundle
npm run build
```

---

## 📄 License & Copyright

Released under the **MIT License**.  
Copyright © 2026 **Niraj Mallik (Mallik Group)**.  
*Helping Humanity & Making Humans Happy.*
