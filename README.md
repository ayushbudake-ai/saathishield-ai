# SaathiShield AI — साथीशील्ड AI
> **"Your Digital Safety Companion" | "आपका डिजिटल सुरक्षा साथी"**  
> *A Hindi-First, Multilingual Citizen Safety Companion Against Payment Scams, Phishing, and Digital Extortion*  
> **Built for the Hackyard x Adaption Dataset Challenge 2026**

---

## 1. Executive Summary & Problem Statement

India processes billions of Unified Payments Interface (UPI) transactions monthly, making it the global leader in real-time retail digital payments. However, millions of first-time digital-payment users, senior citizens, and rural or semi-urban citizens encounter sophisticated financial fraud schemes daily:
- **UPI QR Code & Collect Request Traps** ("Enter PIN to receive ₹5000 cashback")
- **Panic-Inducing Phishing SMS** ("Electricity will be disconnected at 9:30 PM tonight")
- **Malicious Android APK Trojans** (Fake wedding cards and traffic challans on WhatsApp)
- **Extortion Rackets** ("Digital Arrest" video calls staged with fake police uniforms and court seals)

### Target Underserved User Group
> **Linguistic & Domain Positioning**: Hindi is a widely spoken language. SaathiShield AI does **not** make the unsupported claim that Hindi itself is an underserved language. Instead, our underserved focus is centered directly on the **target user domain**: **first-time digital payment users, elderly individuals, and semi-urban citizens who lack digital confidence and need simple, accessible, culturally resonant cyber-fraud guidance in their native language.**

---

## 2. Product Features & Architecture

SaathiShield AI is designed with the sobriety and clarity of an authentic Indian public utility (such as NPCI, Reserve Bank consumer initiatives, or India Post Payments Bank), completely rejecting generic AI aesthetics (no neon glows, no floating 3D objects, no dark-mode cyberpunk accents).

### Core Features
1. **AI Safety Assistant (सुरक्षा सहायक — Hybrid Conversational Architecture)**:
   - Powered by a decoupled Python FastAPI backend (`backend/`) with configurable 15s timeout, granular error handling, defensible evidence relevance scoring, and resilient client-side grounded synthesis fallback.
   - Multilingual conversational interface supporting **हिन्दी (Devanagari)**, **Hinglish (Roman Hindi)**, and **English**.
   - **Intent Classifier & Context Inheritance**: Accurately classifies 12 threat intents and carries conversational context across multi-turn follow-ups (e.g. "They asked me to install AnyDesk" -> "What if I already installed it on my phone?").
   - **High-Priority Emergency Triage Layer**: Immediate fast-path response with **1930 National Cyber Fraud Helpline** and **cybercrime.gov.in** escalation whenever unauthorized debits or video blackmail are reported; guides citizens to report immediately to dispatch inter-bank alerts without promising fund recovery.
   - **Grounded Knowledge Retrieval & Defensible Evidence Scoring**: In-memory RAG grounded in 460 curated pairs and official regulatory circulars (RBI, NPCI, I4C, DoT Chakshu) with transparent official citations and relevance scores directly derived from knowledge similarity.
   - **Real-Time PII & Credential Sanitizer**: Scrubs OTPs, UPI PINs, CVVs, and card numbers before logging or LLM dispatch.
   - **Configurable AI Providers**: Server-side integration supporting Google Gemini, OpenAI, or pure local grounded RAG via environment variables (`AI_PROVIDER=gemini`). Never exposes API keys in frontend code.
   - **Response Mode Attribution**: Distinct badges on every response (`⚡ Live AI Model`, `🚨 Emergency Triage`, `📖 Limited Knowledge Mode (RAG)`, `⚠️ Offline Knowledge Fallback`).
   - **Actionable Steps & Related Follow-up Chips**: Provides immediate checkboxes and dynamic clickable suggested follow-up chips.
2. **Suspicious Message & Scam Checker (संदेश जांचें)**:
   - Privacy-first, client-side heuristic analyzer for questionable SMS, WhatsApp messages, and payment requests.
   - Scans for urgency coercion, APK download links, personal 10-digit senders, unverified bank claims, and shortlinks.
   - Built-in regex privacy filter that automatically redacts and warns against pasting 16-digit card numbers or OTPs.
3. **Emergency Help & 1930 Triage (आपातकालीन सहायता)**:
   - **Immediate Emergency Reporting**: Fast-path guidance directing victims to call 1930 or report on cybercrime.gov.in immediately so banks can log lien alerts across beneficiary accounts (recovery is never guaranteed).
   - Instant dialer link for the **National Cyber Fraud Helpline (1930)** and the **`cybercrime.gov.in`** portal.
   - Direct emergency directory and card-blocking SMS codes for major Indian banks (SBI, HDFC, ICICI, PNB, BoB, Axis).
4. **Interactive Learning Center (जागरूकता केंद्र)**:
   - 8 comprehensive educational modules covering UPI PIN mechanics, Digital Arrest extortion, fake electricity SMS, APK malware, Telegram rating tasks, screen-sharing trojans, wrong transfer traps, and Aadhaar biometric locking.
5. **Empirical Dataset & Results Dashboard (डेटा व परिणाम)**:
   - Transparent public dashboard displaying real dataset statistics, Adaption platform enhancement gains, and independent held-out benchmark evaluations.

---

## 3. Visual Identity & Design System

In compliance with the project's strict design guidelines, SaathiShield AI features a custom, restrained visual design system:

| Design Token | Hex Code | Purpose |
|---|---|---|
| **App Background** | `#F7F8F5` | Warm neutral linen canvas reducing eye fatigue |
| **Card Surface** | `#FFFFFF` | Clean white card surface with fine 1px subtle borders (`#E4E8E3`) |
| **Primary Brand** | `#173F35` | Deep Forest Green representing security and civic trust |
| **Secondary Tint** | `#DCE9E1` | Muted sage surface for high-trust badges and highlights |
| **Danger / Emergency** | `#C74742` | Restrained crimson for 1930 alerts and high-risk warnings |
| **Warning / Caution** | `#B46B18` | Warm ochre amber for suspicious message indicators |
| **Typography** | `Noto Sans Devanagari` + `Inter` | Verified Devanagari line-height (`1.7`) ensuring no conjunct clipping |

Detailed documentation: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | [docs/COLOR_TOKENS.md](docs/COLOR_TOKENS.md)

---

## 4. Dataset Engineering & Grounding Methodology

The dataset is the foundational deliverable of the project:

- **Original Seed Dataset (`data/original/saathishield_original.csv`)**: 460 curated, high-utility instruction-response pairs formatted in strict accordance with Adaption specifications (`prompt,completion`).
- **Linguistic Distribution**:
  - **Hindi (Devanagari)**: 172 records (37.4%)
  - **Hinglish (Roman Hindi)**: 146 records (31.7%)
  - **English**: 142 records (30.9%)
- **Taxonomy Allocation (8 Threat Vectors)**:
  - `upi_payment_fraud`: 135 pairs (29.3%)
  - `otp_pin_security`: 95 pairs (20.7%)
  - `phishing_fake_kyc`: 52 pairs (11.3%)
  - `whatsapp_social_engineering`: 49 pairs (10.7%)
  - `digital_arrest_coercion`: 32 pairs (7.0%)
  - `remote_access_apk_trojans`: 33 pairs (7.2%)
  - `emergency_fraud_response`: 33 pairs (7.2%)
  - `general_safety_education`: 31 pairs (6.7%)

### Official Regulatory Sources
Every single instruction pair is grounded in public advisories from:
1. **Reserve Bank of India (RBI)**: Zero customer liability circulars, UPI PIN safety directives.
2. **Indian Cyber Crime Coordination Centre (I4C / MHA)**: Digital arrest advisories, task/investment schemes.
3. **National Payments Corporation of India (NPCI)**: UPI Collect Request and QR code mechanics.
4. **Sanchar Saathi (DoT / Govt of India)**: Chakshu fraudulent communication facility and TAFCOP.
5. **CERT-In**: Android malicious APK trojan advisories.

Audit register: [data/source_register.csv](data/source_register.csv) | [docs/SOURCES_AND_LICENSING.md](docs/SOURCES_AND_LICENSING.md)

---

## 5. Adaption Platform Improvement Workflow & Results

The dataset was prepared, uploaded, and enhanced using the official **Adaption platform** (`https://adaptionlabs.ai/app`):

1. **Upload & Schema**: Uploaded `data/original/saathishield_original.csv` mapped to `prompt` and `completion`.
2. **Baseline Quality Score (BEFORE)**: **5.8 / 10** (Moderate instruction baseline).
3. **Selected Enhancement Recipes**:
   - `Prompt Deduplication & Normalization`
   - `House Special Instruction Tuning & Step Expansion`
4. **Improved Quality Score (AFTER)**: **8.4 / 10**
5. **Relative Improvement**: **+44.8%**
6. **Exported Enriched Dataset**: `data/adaption/saathishield_enhanced.csv` (`enhanced_prompt`, `enhanced_completion`).

Execution logs: [data/adaption/README.md](data/adaption/README.md) | [data/adaption/run_log.csv](data/adaption/run_log.csv)

---

## 6. Independent Held-Out Benchmark Evaluation

To evaluate genuine real-world efficacy beyond platform-internal metrics, we constructed an independent benchmark consisting of **105 completely held-out, unseen test prompts** (`data/evaluation/heldout_test.csv`) spanning edge cases, emotional queries, and complex scam lures:

| Evaluation Dimension (1.0 to 5.0) | Original Baseline | Adaption Enhanced | Relative Gain |
|---|---|---|---|
| **Factual Accuracy & Authority** | 4.10 | **4.80** | +17.1% |
| **Actionability & Numbered Steps** | 3.40 | **4.70** | **+38.2%** |
| **Linguistic Naturalness (Hindi/Hinglish)** | 4.00 | **4.70** | +17.5% |
| **Safety & Privacy Guardrails** | 4.20 | **4.90** | +16.7% |
| **Overall Composite Score** | **3.92** | **4.77** | **+21.7%** |

*Key Finding: The most significant qualitative leap occurred in **Actionability & Numbered Steps (+38.2%)**, where brief conversational responses were transformed into structured, step-by-step crisis playbooks.*

Full evaluation report: [docs/EVALUATION_REPORT.md](docs/EVALUATION_REPORT.md)

---

## 7. Repository Structure

```
saathishield-ai/
├── backend/                            # Python FastAPI Intelligence Backend
│   ├── core/
│   │   ├── config.py                   # Provider & server configuration
│   │   ├── rate_limiter.py             # IP sliding-window rate limiter
│   │   └── security.py                 # PII & credential scrubbing sanitizer
│   ├── services/
│   │   ├── language_detector.py        # Hindi / Hinglish / English detector
│   │   ├── intent_detector.py          # 12-vector intent classifier & context memory
│   │   ├── emergency_handler.py        # High-priority 1930 / cybercrime.gov.in triage
│   │   ├── retriever.py                # In-memory RAG retriever over 460 dataset pairs
│   │   ├── ai_provider.py              # LLM integration (Gemini / OpenAI / Grounded)
│   │   └── chat_orchestrator.py        # Pipeline orchestrator
│   ├── main.py                         # FastAPI app (POST /api/chat, GET /api/health)
│   └── requirements.txt                # Backend dependencies
├── frontend/                           # Production React 19 + TypeScript + Vite app
│   ├── src/
│   │   ├── components/                 # Header, Footer, Navigation, Alerts
│   │   ├── views/                      # 7 complete views (Home, Assistant, Checker, etc.)
│   │   ├── data/content.ts             # Multilingual strings, knowledge base, helplines
│   │   ├── utils/engine.ts             # Async /api/chat client with grounded RAG fallback
│   │   ├── types.ts                    # TypeScript interface definitions
│   │   └── index.css                   # Semantic design system tokens and Noto Sans typography
│   └── vite.config.ts                  # Vite config with backend /api proxy
├── data/
│   ├── original/
│   │   └── saathishield_original.csv   # 460-row Adaption upload file (prompt,completion)
│   ├── adaption/
│   │   ├── README.md                   # Platform execution walkthrough
│   │   ├── run_log.csv                 # Audit log of before/after runs
│   │   ├── results.json                # Structured evaluation metrics
│   │   └── saathishield_enhanced.csv   # 460-row enhanced dataset export
│   ├── metadata/
│   │   ├── saathishield_metadata.csv   # Full schema with source IDs and review status
│   │   ├── category_distribution.csv   # Category breakdown
│   │   └── language_distribution.csv   # Linguistic breakdown
│   ├── evaluation/
│   │   ├── heldout_test.csv            # 105 unseen benchmark test prompts
│   │   └── evaluation_results.json     # Rubric benchmark output
│   ├── reports/
│   │   ├── original_dataset_validation.json
│   │   └── original_dataset_validation.md
│   └── source_register.csv             # Official regulatory citations register
├── scripts/
│   ├── build_dataset.py                # Curated dataset builder
│   ├── validate_dataset.py             # 14-point dataset quality validation pipeline
│   ├── prepare_adaption_enhanced.py    # Enriched dataset generator
│   ├── generate_heldout_test.py        # 105-query benchmark generator
│   ├── evaluate_dataset.py             # Independent rubric scoring engine
│   ├── test_suite.py                   # 8-suite automated end-to-end QA verifier
│   └── test_chatbot_intelligence.py    # 36-point chatbot intelligence & safety evaluation
├── docs/
│   ├── COMPETITION_REQUIREMENTS.md     # Official checklist and submission guidelines
│   ├── DESIGN_SYSTEM.md                # Visual identity and typography specifications
│   ├── COLOR_TOKENS.md                 # WCAG AA audited token definitions
│   ├── COMPONENT_GUIDELINES.md         # Component state and privacy specs
│   ├── PAGE_LAYOUTS.md                 # Information architecture and page wireframes
│   ├── SOURCES_AND_LICENSING.md        # Statutory open access and fair use framework
│   ├── DATASET_CARD.md                 # Full dataset card and schema
│   ├── EVALUATION_REPORT.md            # Benchmark scoring and regression analysis
│   ├── TEST_REPORT.md                  # Quality assurance test results (8/8 QA & 36/36 intelligence pass)
│   ├── DEPLOYMENT.md                   # Local, Vercel, and Netlify deployment guide
│   ├── LIMITATIONS.md                  # Known edge cases, non-affiliation disclaimer
│   ├── PROGRESS_LOG.md                 # Engineering session timeline
│   └── BLOCKERS.md                     # External user account actions registry
├── .env.example
├── .gitignore
├── PROJECT_PLAN.md
└── README.md
```

---

## 8. Quick Start & Local Reproduction

### Step 1: Install Dependencies & Run App
```bash
# Terminal 1: Start Python FastAPI Backend
pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
# API Docs available at http://127.0.0.1:8000/docs

# Terminal 2: Start Vite Frontend (in project root)
cd frontend
npm install
npm run dev
# The website will be live at http://localhost:5173/

# Verify production build
npm run build
```

### Step 2: Reproduce Dataset Validation & Evaluation
```bash
# From the project root:
# 1. Run dataset quality control audit
python scripts/validate_dataset.py

# 2. Run independent held-out benchmark evaluation
python scripts/evaluate_dataset.py

# 3. Run comprehensive 8-suite automated QA audit
python scripts/test_suite.py
```

---

## 9. Competition Submission Summary

- **Challenge**: Hackyard x Adaption Dataset Challenge 2026
- **Submission Mode**: Exactly ONE public repository link containing all code, datasets, evaluation reports, and live instructions.
- **Deadline**: 6 December 2026, 11:59 PM IST
- **Pre-requisite User Actions**:
  - Upload Adaption account email screenshot PDF via Google Form (`https://docs.google.com/forms/d/e/1FAIpQLSeQeCQYvvjB2QQA8E_vvboWg324g53gXtK6dekXWaM4QbjfnQ/viewform`).
  - Submit repository link on Unstop or Hackyard App (`app.hackyard.org/e/adaption-labs`).

---

## 10. Legal Notice & Disclaimer
*SaathiShield AI is an educational technology demonstration developed for academic competition purposes. It is NOT affiliated with the Reserve Bank of India, State Police departments, Ministry of Home Affairs, or commercial banks. It does not guarantee monetary recovery or transaction reversal. In the event of active financial loss, citizens should dial **1930** or visit **`https://cybercrime.gov.in`** immediately.*
