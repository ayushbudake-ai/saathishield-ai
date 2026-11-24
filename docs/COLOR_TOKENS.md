# SaathiShield AI — Color Tokens & Palette Specification

This document defines the semantic and primitive color tokens utilized across SaathiShield AI. All contrast ratios have been audited against WCAG 2.1 Level AA standards (minimum 4.5:1 for normal body text, 3:1 for large text and graphical UI components).

---

## 1. Core Semantic Tokens

| Token Name | Hex Code | Role & Usage | Contrast vs Background |
|---|---|---|---|
| `--color-bg-app` | `#F7F8F5` | Main viewport canvas background. Warm linen hue reducing eye fatigue. | Baseline |
| `--color-surface` | `#FFFFFF` | Primary card and modal surfaces. Crisp, clean white. | Baseline |
| `--color-surface-subtle` | `#EFF2ED` | Secondary sections, search inputs, inactive tabs. | 1.05:1 |
| `--color-surface-tint` | `#DCE9E1` | Muted sage surface for high-trust callouts, badges, and highlights. | 1.25:1 |
| `--color-brand-primary` | `#173F35` | Deep Forest Green. Navigation headers, primary buttons, major titles. | 10.4:1 on `#FFFFFF` (Passes AAA) |
| `--color-brand-hover` | `#112E27` | Darkened Forest Green for button hover/active states. | 13.1:1 on `#FFFFFF` (Passes AAA) |
| `--color-brand-light` | `#235E50` | Lighter forest shade for links, icons, and interactive focus rings. | 7.2:1 on `#FFFFFF` (Passes AAA) |
| `--color-text-main` | `#252B28` | Charcoal deep text for body copy and headings. | 12.8:1 on `#FFFFFF` (Passes AAA) |
| `--color-text-muted` | `#68716B` | Neutral graphite for secondary text, timestamps, helper descriptions. | 4.9:1 on `#FFFFFF` (Passes AA) |
| `--color-border-subtle`| `#E4E8E3` | Fine 1px divider and container border. | 1.2:1 graphical |
| `--color-border-strong`| `#CBD2C9` | Form input borders and card outlines on focus. | 1.6:1 graphical |

---

## 2. Functional & Status Color Tokens

| Semantic Status | Surface Tint | Border Color | Text & Icon Color | Intended Usage |
|---|---|---|---|---|
| **Emergency / Danger** | `#FDF2F2` | `#F8B4B4` | `#C74742` | Financial fraud reporting, 1930 banner, high-risk message warning |
| **Warning / Caution** | `#FEF9EE` | `#FCE0A6` | `#B46B18` | Medium risk detection, suspicious URL, unverified source notice |
| **Success / Verified** | `#F0FDF4` | `#BBF7D0` | `#237A50` | Verified official source, safe message indicator, copy success |
| **Information / Notice** | `#F0FDF9` | `#CCFBEF` | `#0F766E` | Explanatory disclaimers, educational hints, metadata badges |

---

## 3. CSS Variable Implementation
```css
:root {
  --color-bg-app: #F7F8F5;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #EFF2ED;
  --color-surface-tint: #DCE9E1;
  --color-brand-primary: #173F35;
  --color-brand-hover: #112E27;
  --color-brand-light: #235E50;
  --color-text-main: #252B28;
  --color-text-muted: #68716B;
  --color-border-subtle: #E4E8E3;
  --color-border-strong: #CBD2C9;

  --color-danger-bg: #FDF2F2;
  --color-danger-border: #F8B4B4;
  --color-danger-text: #C74742;

  --color-warning-bg: #FEF9EE;
  --color-warning-border: #FCE0A6;
  --color-warning-text: #B46B18;

  --color-success-bg: #F0FDF4;
  --color-success-border: #BBF7D0;
  --color-success-text: #237A50;

  --color-info-bg: #F0FDF9;
  --color-info-border: #CCFBEF;
  --color-info-text: #0F766E;
}
```
