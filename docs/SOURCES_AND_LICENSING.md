# SaathiShield AI — Official Sources & Licensing Framework

## 1. Authoritative Information Sources

All safety guidance, technical indicators, scam analyses, and emergency escalation workflows in SaathiShield AI are strictly grounded in public awareness advisories, statutory directions, and incident response circulars published by official Indian authorities:

| Organization | Key Authority | Primary Verification Topic |
|---|---|---|
| **Reserve Bank of India (RBI)** | Central Bank & Payment Regulator | Zero customer liability circular, UPI PIN rules, unauthorized electronic transactions, Integrated Ombudsman. |
| **National Cyber Crime Reporting Portal (NCRP / MHA)** | Ministry of Home Affairs | 1930 Financial Cyber Fraud Helpline, Citizen Financial Cyber Fraud Reporting & Management System (CFCFRMS). |
| **Indian Cyber Crime Coordination Centre (I4C / CyberDost)** | National Cyber Agency | Advisories on Digital Arrest, fake law enforcement video calls, task/investment schemes, WhatsApp scams. |
| **National Payments Corporation of India (NPCI)** | Retail Payments & UPI Infrastructure | UPI PIN requirement rules, QR code mechanics (scan-to-pay vs receive), UPI Collect Request abuse. |
| **Sanchar Saathi (Department of Telecommunications)** | Telecom Regulator | Chakshu reporting facility, TAFCOP mobile connection verification, lost/stolen device blocking (CEIR). |
| **CERT-In (Ministry of Electronics & IT)** | Computer Emergency Response Team | Malware analysis of fake Android APKs, remote-access screen sharing trojans (AnyDesk, QuickSupport). |
| **TRAI (Telecom Regulatory Authority of India)** | Telecom Regulations | Alphanumeric SMS sender headers (DLT compliance) vs fraudulent 10-digit personal mobile sender IDs. |

The verified register is maintained at `data/source_register.csv`.

---

## 2. Licensing, Copyright & Intellectual Property Compliance

### Data Attribution & Public Domain Information
- The educational content, guidelines, and telephone numbers referenced in this project originate from publicly distributed public-service notices, government safety circulars, and consumer education programs (e.g., *RBI Kehta Hai*, *CyberDost*).
- Under the Indian Copyright Act, 1957 (Section 52 - Fair Dealing for reporting, education, and public guidance), public-interest summaries and instructional guidelines derived from official circulars are freely communicable for public benefit.
- SaathiShield AI creates **original, synthesized instructional pairs** in Hindi, Hinglish, and English. We do not mass-scrape proprietary copyrighted databases or copy large verbatim textual passages.

### Non-Affiliation Disclaimer
> **IMPORTANT PUBLIC NOTICE**:
> SaathiShield AI is an independent, non-profit academic and competition project developed for the Hackyard x Adaption Dataset Challenge 2026.
> It is **NOT** an official government agency, police department, Reserve Bank entity, or registered banking institution.
> SaathiShield AI does not handle, store, or process funds, nor does it guarantee the recovery of stolen money. It acts solely as an educational safety and advisory companion.
> In active fraud events, citizens must immediately contact the National Cyber Helpline (**1930**) or report on **`https://cybercrime.gov.in`**.

---

## 3. Human Verification & Continuous Review Policy

Each dataset record is tagged with a verification status in `data/metadata/saathishield_metadata.csv`:
1. `DRAFT`: Automated/synthetic seed under internal review.
2. `SOURCE_CHECKED`: Factual claims cross-verified against official portal documents in `source_register.csv`.
3. `HUMAN_VERIFIED`: Directly reviewed by a native Hindi-speaking researcher to certify linguistic naturalness, Devanagari orthography, and procedural accuracy.

*Automated algorithms never assign `HUMAN_VERIFIED` status.*
