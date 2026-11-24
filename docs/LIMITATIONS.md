# SaathiShield AI — Limitations, Ethical Boundaries & Safety Disclaimers

In accordance with competition rules and responsible AI engineering principles, this document provides a transparent accounting of the operational boundaries, known failure modes, and ethical guardrails of SaathiShield AI.

---

## 1. Domain & Scope Boundaries

### Not a Legal, Financial, or Law Enforcement Body
- SaathiShield AI is an **educational public assistance companion**, not an authorized police portal, judicial authority, Reserve Bank entity, or commercial fraud investigator.
- In active financial emergencies, the only legally sanctioned first responders in India are:
  1. The **National Cyber Fraud Reporting Helpline (1930)**
  2. The **National Cyber Crime Reporting Portal (`https://cybercrime.gov.in`)**
  3. The citizen's respective **account-holding commercial bank**

### Zero False Recovery Guarantees
- SaathiShield AI **never guarantees that stolen money can be recovered**.
- Stolen fund recovery depends entirely on the speed of reporting to 1930 within the "Golden Hours" (initial 2–3 hours), whether the recipient mule account still holds liquidity, and court lien clearance processes.

---

## 2. Technical & Heuristic Limitations

### Client-Side Heuristic Text Analysis
- The **Scam Message Checker** evaluates structural red flags (urgency tokens, shortlinks, non-bank headers, APK extensions, and keyword coercion).
- **Text-only analysis cannot prove a message is genuine.** A sophisticated spear-phishing attacker could compose a polite, grammatically perfect message without overt scam keywords. Users are explicitly warned that a "Low Risk" verdict does not constitute an institutional endorsement of authenticity.

### Limited Knowledge Mode (Offline Retrieval) vs. Live AI Generation
- When no external AI provider credentials are configured, the application functions in **Limited Knowledge Mode (Offline Retrieval)**.
- In this mode, responses are strictly synthesized from the 460 verified dataset instruction pairs. Open-ended questions outside the verified knowledge base will honestly state that a verified match is unavailable in offline mode rather than hallucinating speculative answers.
- When an AI provider (Google Gemini or OpenAI) is configured server-side via `.env`, the assistant operates in **Live AI Model Mode**, grounding open-ended reasoning in verified safety principles while utilizing conversational history for multi-turn contextual awareness.
- At no point are API keys exposed to the client browser.

---

## 3. Linguistic & Script Boundaries

### Devanagari Hindi Orthography
- While Hindi is widely spoken, dialects across Uttar Pradesh, Bihar, Madhya Pradesh, Rajasthan, and Haryana feature diverse colloquial idioms.
- The dataset prioritizes standardized, accessible Hindi Devanagari (*सरल मानक हिन्दी*). Highly localized slang may occasionally be parsed by falling back to the primary threat intent.

### Hinglish Transliteration Ambiguity
- Hinglish (Roman Hindi) lacks standardized spelling (e.g., *"paisa kat gaya"* vs *"paise debit ho gye"* vs *"balance cut"*). The heuristic engine incorporates regex fuzzy matching, but extreme phonetic variations may require rephrasing into standard Hindi or English.

---

## 4. Privacy & Data Handling Guarantee
- SaathiShield AI is **privacy-by-default**.
- No pasted SMS or WhatsApp message is logged, persisted to a remote database, or transferred to third-party ad networks.
- Input fields automatically detect and warn against the accidental pasting of 16-digit payment card numbers or OTP codes.
