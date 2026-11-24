# SaathiShield AI — Page Layouts & Information Architecture

This document describes the structure, wireframes, and responsive behavioral layouts for all views across SaathiShield AI.

---

## 1. Information Architecture & Navigation

```
[Global Header: Brand Logo | Language Switcher (हिन्दी / Hinglish / English) | Nav Links | Emergency 1930 Button]
├── 1. Home / Overview (Landing page, quick triage cards, common threat alerts, capability transparency)
├── 2. Assistant (Conversational digital safety guide, quick prompt chips, verified answers)
├── 3. Scam Checker (Paste SMS / WhatsApp message, instant heuristic indicator analysis, safe advice)
├── 4. Emergency Help (Active cyber fraud triage: 1930 helpline, bank escalation, FIR filing guide)
├── 5. Learning Center (8 bite-sized visual modules: UPI PIN, Fake KYC, Digital Arrest, APK trojans, etc.)
├── 6. Dataset & Methodology (Live metrics, category distribution, before-after Adaption benchmarks, validation)
└── [Global Footer: Official Disclaimers, Ministry / RBI Links, Privacy Policy, Competition Attributions]
```

---

## 2. Page Wireframe & Layout Specifications

### Page 1: Home / Overview (`/`)
- **Emergency Priority Strip**: High-visibility ribbon: "पैसे कट गए हैं? तुरंत 1930 पर कॉल करें या साइबर क्राइम पोर्टल पर जाएँ" with direct action links.
- **Hero Section**:
  - Clear, honest headline: "डिजिटल धोखाधड़ी से सुरक्षा, आपकी अपनी भाषा में" (Digital Fraud Safety, in Your Own Language).
  - Sub-headline positioning: A public safety assistant for first-time UPI users, families, and everyday citizens.
  - Three Primary Action Panels:
    1. *सुरक्षा सवाल पूछें (Ask Safety Question)* -> Leads to Assistant.
    2. *संदेश की जाँच करें (Check Suspicious Message)* -> Leads to Scam Checker.
    3. *धोखाधड़ी की रिपोर्ट (Report Active Fraud)* -> Leads to Emergency Triage.
- **Common Scam Threat Badges**: Live cards explaining current scam tactics (Electricity bill SMS, Fake CBI/Police video call, WhatsApp wedding invitation APK, Fake bank KYC update).
- **Transparency & Trust Box**: Bulleted declaration of what SaathiShield CAN and CANNOT do (e.g., educational only, not police or bank).

### Page 2: AI Safety Assistant (`/assistant`)
- **Header**: Mode indicator (`Verified Dataset Grounded Mode` or `Live API Mode`), Active Language badge.
- **Prompt Starter Chips**:
  - "क्या पैसे पाने के लिए UPI PIN डालना पड़ता है?" (Do I need to enter UPI PIN to receive money?)
  - "बिजली बिल कटने का SMS आया है, क्या करूँ?" (Got electricity disconnection SMS, what to do?)
  - "अनजान नंबर से APK फाइल आई है, क्या खोलूँ?" (Unknown number sent APK file, should I open it?)
  - "फर्जी पुलिस कॉल आई है कि पार्सल में ड्रग्स मिले हैं" (Fake police call claiming drugs found in parcel)
- **Chat Window**: Responsive scroll area, accessible input field with send button, copy button, verified source pill.

### Page 3: Suspicious Message / Scam Checker (`/checker`)
- **Warning Notice**: "गोपनीयता सूचना: OTP, CVV, पासवर्ड या खाता नंबर यहाँ दर्ज न करें।"
- **Text Area**: Multi-line input with pre-loaded one-click scam examples for testing.
- **Analysis Engine Output Panel**:
  - **Risk Assessment Level**: `संभावित संदिग्ध (Suspicious)`, `अत्यधिक जोखिम (High Risk)`, or `सामान्य सूचना (Informational)`.
  - **Identified Red Flags**: e.g., Urgent countdown ("2 घंटे में बिजली कटेगी"), Non-bank UPI handle (`@xyzbankpay`), APK download link, Request for remote app (`AnyDesk`, `TeamViewer`).
  - **Action Steps**: What to do immediately (Do not click, Block sender, Call official customer care from verified app).

### Page 4: Emergency Help & 1930 Guide (`/emergency`)
- **Emergency Triage Alert**: Highlighting immediate reporting through 1930 and bank helplines to request rapid inter-bank alerts.
- **3-Step Immediate Action Protocol**:
  1. **Step 1: Bank Freeze**: Call bank helpline immediately to block card/UPI/netbanking.
  2. **Step 2: National Cyber Fraud Helpline (1930)**: Dial 1930 with transaction ID, account number, time, and sender UPI.
  3. **Step 3: Portal Complaint**: File formal grievance at `cybercrime.gov.in` and keep complaint acknowledgment number.
- **Directory of Verified Bank Fraud Numbers**: Official toll-free emergency numbers for SBI, HDFC, ICICI, PNB, BoB, Axis, Paytm Payments Bank.

### Page 5: Learning Center (`/learn`)
- Grid of interactive cards covering 8 essential scam archetypes:
  1. *UPI PIN vs OTP Scam*: Why receiving money never requires a PIN.
  2. *Digital Arrest Scam*: Real police/CBI never arrest citizens over WhatsApp video calls.
  3. *Fake KYC & SIM Deactivation*: Banks never send Bitly/APK links for KYC.
  4. *Part-Time Job & Telegram Tasks*: "Like YouTube videos and earn ₹5000" investment fraud.
  5. *Screen Sharing App Trojans*: Dangers of installing AnyDesk, RustDesk, QuickSupport on caller advice.
  6. *Wrong Transfer Fraud*: "Mistakenly sent money, please return it" chargeback trick.
  7. *Fake Courier & Parcel Customs*: Fake DHL/FedEx customs duty demands.
  8. *Safe UPI Habits*: 5 fundamental rules for daily digital transactions.

### Page 6: Dataset & Methodology Dashboard (`/dashboard`)
- **Metric Cards**:
  - Total Training Instruction Pairs (Original vs Enhanced)
  - Held-out Benchmark Test Cases
  - Supported Languages & Script Breakdown (Hindi Devanagari 70%, Hinglish 20%, English 10%)
  - Official Verified Sources Count
- **Interactive Visualizations**:
  - Category Distribution Bar Chart
  - Language Split Doughnut / Bar
  - Adaption Platform Before vs After Quality Score Comparison
  - Rubric Benchmark Scores (Factual Accuracy, Actionability, Hindi Naturalness, Safety)
- **Validation Audit Log**: Direct view of automated validation checks passed (0 duplicate prompts, 0 broken Devanagari, 100% official grounding).
