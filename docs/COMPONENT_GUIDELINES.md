# SaathiShield AI — Component Guidelines & Accessibility Specs

This document establishes the UI component architecture, interactive behavior, state handling, and accessibility standards for SaathiShield AI.

---

## 1. Interactive Components

### Primary Buttons
- **Shape**: Modest border radius (`rounded-md`, 6px). Never pill-shaped or sharp rectangular.
- **Visuals**: Solid `#173F35` background, `#FFFFFF` text, subtle 1px border `rgba(0,0,0,0.05)`.
- **States**:
  - *Hover*: Background transitions smoothly to `#112E27`.
  - *Focus-Visible*: 2px solid offset ring in `#235E50`.
  - *Disabled*: Background `#E4E8E3`, text `#8A948D`, cursor `not-allowed`.
  - *Loading*: Retains dimensions with subtle spinner icon and accessible `aria-busy="true"`.

### Secondary & Outline Buttons
- **Visuals**: White surface `#FFFFFF`, 1px border `#CBD2C9`, text `#173F35`.
- **Hover**: Background `#F7F8F5`, border `#173F35`.

### Language Switcher
- **Requirement**: Prominently visible in header at all times across all screen sizes.
- **Options**:
  - `हिन्दी` (Hindi in Devanagari) — Selected by default for Indian context
  - `Hinglish` (Roman Hindi)
  - `English`
- **Behavior**: Instantaneous client-side state update; switches UI strings, placeholder prompts, sample queries, and assistant prompt templates seamlessly.

### Emergency Alert Bar (1930 Helpline Banner)
- **Visuals**: Distinct amber/danger top ribbon (`#FDF2F2` background, `#C74742` badge, `#173F35` body text).
- **Direct Action**: One-tap phone dialer link (`tel:1930`) and direct link to official portal (`https://cybercrime.gov.in`).
- **Presence**: Visible on Homepage, Emergency Page, and Scam Checker result screen.

---

## 2. Form & Data Entry Guidelines

### Suspicious Message Input Box
- **Security & Privacy Safeguards**:
  - Explicit prominent guidance: *"कृपया अपना असली बैंक खाता नंबर, पासवर्ड, या OTP यहाँ पेस्ट न करें" (Please do not paste your real bank account number, password, or OTP).*
  - Real-time client-side regex detector that flags and redacts any potential 6-digit OTP or 16-digit card number before submission.
  - Clear Character count and single-click "Clear" button.
- **State Handling**:
  - *Empty State*: Helpful pre-filled sample scam messages (e.g., "Electricity bill cutoff SMS", "UPI 5000 cashback collect request", "Part-time Telegram job", "Digital Arrest CBI notice").
  - *Analyzing State*: Deterministic progress indicator without fake artificial delay.
  - *Result State*: Structured breakdown (Risk level, Suspicious indicators identified, What this means, Immediate steps to take, Official helpline).

---

## 3. Conversational Assistant Guidelines

### Message Stream & Layout
- **User Message**: Aligned right, `#EFF2ED` background, charcoal text, compact rounded corners.
- **Assistant Message**: Aligned left, `#FFFFFF` card, 1px border `#E4E8E3`, deep forest header with avatar icon.
- **Structured Response Elements**:
  - Numbered actionable steps (`1.`, `2.`, `3.`)
  - Red warning callouts for sensitive actions (e.g., "कभी भी UPI PIN दर्ज न करें पैसे प्राप्त करने के लिए")
  - Source attribution chip with official link and verified date
  - Quick action bar: "Copy Text" (कॉपी करें), "Is this an emergency?" (1930 पर जाएँ).
- **Zero Hallucination Protocol**: In offline/demo mode, responses are mapped strictly to verified dataset records with explicit transparency labels.
