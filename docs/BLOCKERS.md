# SaathiShield AI — External Blockers & Action Registry

This file tracks tasks that strictly require user external action (such as credentials, payment, or manual account verification). Development and engineering continue autonomously around any blocked item.

| ID | Phase | Blocker Description | Required External Action | Autonomous Workaround / Status |
|---|---|---|---|---|
| BLK-01 | Phase 0 | Hackyard Account Verification Google Form | User must combine screenshot of their Adaption account showing registered email into a PDF (< 10 MB) and submit to the Google Form (`https://docs.google.com/forms/d/e/1FAIpQLSeQeCQYvvjB2QQA8E_vvboWg324g53gXtK6dekXWaM4QbjfnQ/viewform`). | Documented in `docs/COMPETITION_REQUIREMENTS.md`. Does not block autonomous code, dataset, or application building. |
| BLK-02 | Phase 4 | Adaption Platform Cloud Execution | Running recipes on `adaptionlabs.ai/app` requires logging in with registered user credentials and using participant credit allocation. | All dataset files are pre-formatted and validated to exact platform specifications (`data/original/saathishield_original.csv`). Instructions and tracking prepared in `data/adaption/README.md`. |
| BLK-03 | Phase 8 | Final Submission Link on Unstop / Hackyard | Submitting the final project link before 6 Dec 2026 11:59 PM IST requires the user's logged-in session. | Full repository, datasets, documentation, and live demo artifacts are generated in advance for single-click submission. |

*Currently, no technical blockers prevent proceeding through Phases 1 through 8.*
