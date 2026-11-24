# SaathiShield AI — Deployment & Hosting Guide

This guide describes how to run, preview, and deploy SaathiShield AI across local environments and cloud static hosting platforms (Vercel, Netlify, Cloudflare Pages, or GitHub Pages).

---

## 1. Local Development & Production Preview

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node `v25.9.0`)
- npm `v9+` or `v11+` (tested on npm `v11.12.1`)
- Python `3.10+` (tested on Python `3.14.7`)

### Local Setup Steps
```bash
# 1. Clone or navigate to the workspace
cd f:\competitions\hackyard

# 2. Navigate to frontend directory
cd frontend

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
# The development server opens at http://localhost:5173/

# 5. Build for production
npm run build

# 6. Preview the production build locally
npm run preview
# Production preview opens at http://localhost:4173/
```

---

## 2. Deploying to Vercel (Recommended)

1. **Push Repository**: Ensure the codebase is pushed to your GitHub or GitLab repository.
2. **Import Project**: Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. **Configure Settings**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy**: Click **Deploy**. Vercel will assign a public production URL (e.g., `https://saathishield-ai.vercel.app`).

---

## 3. Deploying to Netlify

1. **Connect Repo**: In [Netlify](https://www.netlify.com), click **"Add new site" > "Import an existing project"**.
2. **Build Settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
3. **Deploy**: Click **Deploy site**.

---

## 4. Single-Page Application (SPA) Routing Note
Since SaathiShield AI uses client-side state routing without multi-page server requirements, all static hosts serve `dist/index.html` directly with zero server-side latency.
