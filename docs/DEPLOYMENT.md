# SaathiShield AI — Deployment & Hosting Guide

This guide describes how to run, preview, and deploy SaathiShield AI across local development environments, containerized setups, and cloud hosting platforms.

---

## 1. Local Development & Hybrid Stack Execution

SaathiShield AI features a decoupled hybrid architecture:
1. **Frontend**: React 19 + TypeScript + Vite SPA (`frontend/`)
2. **Backend**: Python 3 FastAPI microservice (`backend/`) with intent classifier, 1930 emergency triage, in-memory RAG retriever, and configurable LLM providers (Gemini / OpenAI / Grounded Fallback).

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node `v25.9.0`)
- npm `v9+` or `v11+` (tested on npm `v11.12.1`)
- Python `3.10+` (tested on Python `3.14.7`)

### Running Backend (FastAPI API)
```bash
# 1. Install backend dependencies
pip install -r backend/requirements.txt

# 2. Configure environment (optional, defaults to high-fidelity grounded RAG)
cp .env.example .env

# 3. Start Uvicorn development server
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
# API Swagger UI available at: http://127.0.0.1:8000/docs
# Health check available at: http://127.0.0.1:8000/api/health
```

### Running Frontend (Vite)
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start local development server (proxies /api to 127.0.0.1:8000)
npm run dev
# The development server opens at http://localhost:5173/

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
# Production preview opens at http://localhost:4173/
```

---

## 2. Testing Chatbot Intelligence & Safety
Run the comprehensive 36-point automated evaluation suite:
```bash
python scripts/test_chatbot_intelligence.py
```
Validates:
- Direct queries (UPI PIN, QR, Fake KYC, Digital Arrest, APK trojans, Unauthorized debit)
- Open-ended citizen questions (elderly assistance, panic verification, scam uncertainty)
- Multi-turn conversational memory & context retention
- Multilingual natural synthesis (Hindi Devanagari, Hinglish Roman, English)
- Safety guardrails (Zero credential harvesting, PII redaction, 1930 emergency fast-path)

---

## 3. Cloud Deployment Options

### A. Full Stack Deployment (Render / Railway / Fly.io / AWS ECS)
Deploy `backend/` as a Docker container or Python service:
- Start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
- Environment variables: `AI_PROVIDER=gemini` (or `openai` or `none`), `GEMINI_API_KEY`, `ALLOWED_ORIGINS`

### B. Static Hosting with Standalone Grounded Fallback (Vercel / Netlify / GitHub Pages)
If hosted on static hosting without a running Python backend, the React application automatically and gracefully falls back to the client-side grounded retrieval engine with zero disruption and clear response mode attribution:
1. **Root Directory**: `frontend`
2. **Framework Preset**: `Vite`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

---

## 4. Single-Page Application (SPA) Routing Note
Since SaathiShield AI uses client-side state routing without multi-page server requirements, all static hosts serve `dist/index.html` directly with zero server-side latency.
