# SaathiShield AI — Dataset Card

## 1. Dataset Summary
- **Dataset Name**: SaathiShield Digital Safety Instruction Dataset (`SaathiShield-Original`)
- **Version**: 1.0 (Frozen for Adaption Challenge 2026)
- **Primary Domain**: Citizen Cyber Safety, UPI Fraud Prevention, Financial Scam Awareness
- **Target Demographic**: First-time digital payment users, elderly individuals, semi-urban & rural Indian citizens
- **Languages**: Hindi in Devanagari script (Primary ~37.4%), Hinglish in natural Roman script (31.7%), English (30.9%)
- **Total Record Count**: 460 curated instruction-response pairs
- **Format**: Standard UTF-8 CSV with `prompt` and `completion` headers

---

## 2. Dataset Taxonomy & Categories

| Category Key | Focus Description | Records | Pct |
|---|---|---|---|
| `upi_payment_fraud` | QR code deception, fake cashback, wrong transfer trap, fake payment screenshots | 135 | 29.3% |
| `otp_pin_security` | Fake bank manager calls, credit card reward traps, SIM-swap OTP theft | 95 | 20.7% |
| `phishing_fake_kyc` | Electricity disconnection SMS, SBI YONO suspension, fake PAN update | 52 | 11.3% |
| `whatsapp_social_engineering` | YouTube like/rating task jobs, KBC lottery voice notes, fake parcel customs | 49 | 10.7% |
| `digital_arrest_coercion` | Fake police/CBI/ED WhatsApp video calls, narcotics extortion threats | 32 | 7.0% |
| `remote_access_apk_trojans` | Malicious wedding invitations (.apk), AnyDesk screen-sharing scams | 33 | 7.2% |
| `emergency_fraud_response` | 1930 National Helpline triage, golden hours fund freezing, cybercrime portal | 33 | 7.2% |
| `general_safety_education` | TRAI DLT SMS headers, biometric Aadhaar locking, public Wi-Fi safety | 31 | 6.7% |

---

## 3. Curation & Grounding Methodology

### Authoritative Grounding
Every safety instruction is cross-referenced with public advisories from:
- Reserve Bank of India (`rbi.org.in`)
- National Cyber Crime Reporting Portal (`cybercrime.gov.in`)
- Indian Cyber Crime Coordination Centre (`i4c.mha.gov.in`)
- National Payments Corporation of India (`npci.org.in`)
- Department of Telecommunications Sanchar Saathi (`sancharsaathi.gov.in`)

### Quality Principles
1. **Actionable Priority**: Responses immediately answer the question in the first sentence ("नहीं, बिल्कुल नहीं", "यह 100% फर्जी संदेश है").
2. **Procedural Steps**: Numbered sequential action steps for crisis situations.
3. **No Victim Blaming**: Reassuring, calm tone specifically addressing fear and panic induced by scammers.
4. **Zero Collection of Secrets**: Absolute prohibition on collecting or prompting for real passwords, OTPs, or financial credentials.

---

## 4. Metadata Schema (`data/metadata/saathishield_metadata.csv`)

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique record identifier (e.g. `SS-0001` to `SS-0460`) |
| `category` | string | One of the 8 canonical threat taxonomy keys |
| `language` | string | `hi` (Devanagari), `hi-en` (Hinglish), `en` (English) |
| `difficulty` | string | `beginner`, `intermediate`, `conversational` |
| `scenario_type` | string | Specific scam vector (e.g., `electricity_cut_sms`, `olx_qr_code`) |
| `source_id` | string | Foreign key mapped to `data/source_register.csv` |
| `verification_status` | string | `SOURCE_CHECKED` or `HUMAN_VERIFIED` |
| `safety_critical` | boolean | `True` if improper guidance could result in direct financial loss |
| `review_notes` | string | Contextual or editorial notes |
