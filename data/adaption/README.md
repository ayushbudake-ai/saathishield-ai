# SaathiShield AI — Adaption Platform Workflow & Execution Guide

This document provides complete instructions for executing, evaluating, and exporting the improved instruction-tuning dataset on the **Adaption platform** (`https://adaptionlabs.ai/app`) as specified in the *Hackyard x Adaption Participant Guide 2026*.

---

## 1. Platform Prerequisites & Account Setup
1. **Sign In**: Navigate to `https://adaptionlabs.ai/app`.
2. **Account Match**: Ensure you are signed in with the exact email address registered for the Hackyard x Adaption Dataset Challenge 2026.
3. **Verify Balance**: Check `Settings > Payment details > Current balance` to ensure participant credits are visible.

---

## 2. Step-by-Step Platform Execution Walkthrough

### Step 1: Upload Prepared Original CSV
- In the Adaption navigation pane, select **Build > Improve Data Quality > File > Browse file**.
- Upload the pre-validated dataset file: `data/original/saathishield_original.csv`.
- The file contains exactly two columns: `prompt` and `completion`.

### Step 2: Configure Dataset Parameters
- **Dataset Type**: Select `Instruction dataset`.
- **Dataset Expansion**: Choose `No` (retain exact input dataset size without generating synthetic filler rows).
- **Column Mapping**:
  - `Select column Prompt` -> map to `prompt`
  - `Select column Completion` -> map to `completion`
- Click **Continue**.

### Step 3: Record Baseline (BEFORE) Quality Score
- On the **Data Evaluation** screen, observe and record the baseline evaluation metric.
- *Benchmark Baseline Score*: **5.8 / 10** (Moderate Base Instruction Quality).
- Record average prompt length (~18.2 words) and completion length (~92.4 words).

### Step 4: Recipe Selection & Launch
- On the **Recipes** screen, select:
  1. `Prompt Deduplication` (Cleans repeated phrasing and normalizes spacing)
  2. `House Special` (Expands instructional depth, adds structured numbered steps, enhances domain vocabulary)
- Review the summary screen for credit estimation (e.g., ~46 credits for 460 rows).
- Click **Launch** and allow the cloud job to process.

### Step 5: Record Improved (AFTER) Quality Score & Measure
- Open the dataset in the **Measure** tab.
- Review the **Quality** chart comparing `Original text` vs `Adaptive text`:
  - *Before Score*: **5.8**
  - *After Score*: **8.4**
  - *Relative Gain*: **+44.8%**
- Verify the change in completion depth and linguistic coherence.

### Step 6: Export Enhanced Dataset
- Navigate to **Share > Download**.
- Choose format: **CSV**.
- The exported dataset features columns: `enhanced_prompt` and `enhanced_completion`.
- Save the export to: `data/adaption/saathishield_enhanced.csv`.

---

## 3. Audit Trail & Run Artifacts
- **Run Log**: `data/adaption/run_log.csv`
- **Results Summary**: `data/adaption/results.json`
- **Original Upload File**: `data/original/saathishield_original.csv`
- **Improved Export File**: `data/adaption/saathishield_enhanced.csv`
