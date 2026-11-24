# SaathiShield AI — External Blockers & Action Registry

This file tracks tasks that strictly require user external action (such as credentials, payment, or manual account verification). Development and engineering continue autonomously around any blocked item.

| ID | Phase | Blocker Description | Required External Action | Autonomous Workaround / Status |
|---|---|---|---|---|
| BLK-01 | Phase 0 | Hackyard Account Verification Google Form | User must combine screenshot of their Adaption account showing registered email into a PDF (< 10 MB) and submit to the Google Form (`https://docs.google.com/forms/d/e/1FAIpQLSeQeCQYvvjB2QQA8E_vvboWg324g53gXtK6dekXWaM4QbjfnQ/viewform`). | Documented in `docs/COMPETITION_REQUIREMENTS.md`. |
| BLK-02 | Phase 4 | Adaption Platform Cloud Execution | Running recipes on `adaptionlabs.ai/app` requires logging in with registered user credentials. | Completed dataset packaging (`saathishield_original.csv` and `saathishield_enhanced.csv`) and run tracking. |
| BLK-03 | Phase 8 | Create GitHub Repository on `github.com/ayushbudake-ai` | User needs to create an empty public repo named `saathishield-ai` on GitHub so the local commit can be pushed via `git push -u origin main`. | Local git repo initialized, 70 files committed, remote `origin` configured to `https://github.com/ayushbudake-ai/saathishield-ai.git`. |

*Currently, no technical blockers prevent proceeding through Phases 1 through 8.*
