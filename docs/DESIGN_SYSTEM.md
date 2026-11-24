# SaathiShield AI — Design System & Visual Identity

## 1. Design Philosophy: "Public Utility Trust"
SaathiShield AI is engineered to convey the quiet authority, sobriety, and reliability of an established Indian national public-interest utility (such as UPI/NPCI, Reserve Bank consumer awareness initiatives, or India Post Payments Bank), rather than an experimental AI demo or commercial SaaS.

### Core Principles
1. **Clarity Over Novelty**: Predictable, intuitive navigation patterns that an elderly or first-time digital-payment user in semi-urban India can navigate without intimidation.
2. **Restraint Over Spectacle**: Absolute rejection of neon gradients, glowing borders, floating 3D blobs, dark-mode cyberpunk accents, and glassmorphism.
3. **Information Density with Breathing Room**: Information is presented crisply in structured panels and lists rather than huge empty marketing cards with fluffy copy.
4. **Accessible Bilingual Typography**: Equal visual weight given to Hindi Devanagari and Latin scripts, maintaining vertical rhythm and preventing clipping of conjunct consonants or matras (मात्राएँ).

---

## 2. Brand Identity & Atmosphere

| Attribute | Chosen Direction | Avoided Anti-pattern |
|---|---|---|
| **Tone** | Calm, reassuring, factual, institutional | Alarmist, playful, robotic, tech-bro |
| **Theme** | Light-first, warm neutral canvas | Dark mode by default, neon cyber styling |
| **Primary Hue** | Deep Forest Green (`#173F35`) symbolizing security and civic stability | Generic AI neon blue (`#00FFFF`, `#3B82F6`) |
| **Accent Hue** | Warm Muted Sage (`#DCE9E1`) and Ochre Amber (`#D28A24`) | Magenta / Purple neon glows |
| **Surface** | Crisp white card on warm paper (`#F7F8F5`) with fine borders (`#E4E8E3`) | Translucent blur / frosted glassmorphism |

---

## 3. Typography Architecture

### Typefaces
- **Primary Latin Script**: `Inter`, system font stack fallback (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`).
- **Primary Devanagari Script**: `Noto Sans Devanagari`, system fallback (`'Mangal'`, `'Nirmala UI'`, `'Devanagari Sangam MN'`, sans-serif).

### Typography Scale & Rhythm
Devanagari glyphs with matras (e.g., `ि`, `ी`, `ु`, `ू`, `े`, `ै`, `ं`, `्`) require generous line-heights to prevent vertical collision:
- **Display 1** (Hero Headline): `2.25rem` (36px), Line Height `1.3` (46.8px), Weight `700`
- **Heading 1** (Page Titles): `1.75rem` (28px), Line Height `1.35` (37.8px), Weight `600`
- **Heading 2** (Section Titles): `1.25rem` (20px), Line Height `1.4` (28px), Weight `600`
- **Heading 3** (Card Titles): `1.125rem` (18px), Line Height `1.45` (26px), Weight `600`
- **Body Large**: `1.0rem` (16px), Line Height `1.6` (25.6px), Weight `400` / `500`
- **Body Base**: `0.9375rem` (15px), Line Height `1.6` (24px), Weight `400`
- **Caption / Meta**: `0.8125rem` (13px), Line Height `1.5` (19.5px), Weight `500`

---

## 4. Spacing & Elevation

### Spacing Scale
Based on an 8-point harmonic grid:
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px

### Elevation & Borders
We favor crisp borders with restrained, diffuse shadows over high-blur drop shadows:
- **Border Default**: `1px solid var(--border-subtle)` (`#E4E8E3`)
- **Border Strong**: `1px solid var(--border-strong)` (`#CBD2C9`)
- **Card Shadow**: `0 1px 3px 0 rgba(23, 63, 53, 0.04), 0 1px 2px -1px rgba(23, 63, 53, 0.04)`
- **Dropdown / Flyout Shadow**: `0 4px 6px -1px rgba(23, 63, 53, 0.08), 0 2px 4px -2px rgba(23, 63, 53, 0.06)`

---

## 5. Iconography & Badges
- **Icon Library**: `lucide-react`.
- **Stroke Width**: `1.75px` or `2px` consistently; never filled or cartoonish icons.
- **Status Badges**: Subdued pastel background with bold text and leading icon. Color is **never** used alone to indicate state; text and iconography are always paired (WCAG 2.1 AA compliant).
