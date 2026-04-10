# Paioneers Brand Guidelines

## Color Palette

### Core Colors

| Role            | Hex       | Usage                              |
| --------------- | --------- | ---------------------------------- |
| Cream           | `#FAFFEF` | Page background, light surfaces    |
| Dark Teal       | `#032C2D` | Text, headings, dark backgrounds   |
| Teal            | `#0F7A99` | Primary accent, links, interactive |
| Periwinkle      | `#A9B8FF` | Gradient midpoints, highlights     |
| Orange          | `#F37C38` | CTA accent, gradient emphasis      |
| Light Blue      | `#5B8DEF` | Supporting accent                  |
| Gray            | `#8FA097` | Muted / secondary text             |

### Semantic Colors

| Role    | Hex       | Usage                                      |
| ------- | --------- | ------------------------------------------ |
| Success | `#22C55E` | "After" metrics, savings, positive signals |
| Danger  | `#EF4444` | "Before" metrics, cost of inaction         |

### Gradient Spectrum (Sunrise / Sunset)

| Name     | Hex       |
| -------- | --------- |
| Salmon 1 | `#D3866C` |
| Salmon 2 | `#CF8B7D` |
| Mauve 1  | `#C89495` |
| Mauve 2  | `#C29BAA` |
| Purple 1 | `#BBA2C0` |
| Purple 2 | `#B5AAD7` |
| Blue 1   | `#AEB2EC` |

## Gradients

- **Sunrise (cover slides):** `linear-gradient(135deg, #D3866C 0%, #CF8B7D 14%, #C89495 28%, #C29BAA 42%, #BBA2C0 56%, #B5AAD7 70%, #AEB2EC 100%)`
- **Primary CTA border:** Orange → Periwinkle → Teal (`linear-gradient(90deg, #F37C38, #A9B8FF, #0F7A99)`)
- **Heading accent:** Orange → Periwinkle _or_ Teal → Periwinkle
- **Vertical divider:** Teal → Periwinkle → Orange
- **Featured card border:** Same as CTA — `linear-gradient(90deg, #F37C38, #A9B8FF, #0F7A99)` via border-box trick

## Typography

| Role              | Font           | Weight        | Notes                          |
| ----------------- | -------------- | ------------- | ------------------------------ |
| Body / Headings   | IBM Plex Sans  | 200–700       | Default body font              |
| Labels / Nav / UI | IBM Plex Mono  | 400–600       | Uppercase, wide letter-spacing |
| Pull-quotes       | IBM Plex Serif | 400 italic    | Used only for testimonials / key quotes |

### Type Scale (Fixed for PDF — no clamp/vw units)

| Element          | Size    | Weight | Letter-spacing | Line-height |
| ---------------- | ------- | ------ | -------------- | ----------- |
| Hero metric      | 72–96px | 200    | -0.03em        | 1.0         |
| Cover headline   | 48–56px | 300    | -0.02em        | 1.1         |
| Section headline | 32–36px | 700    | -0.03em        | 1.15        |
| Slide h2         | 28–32px | 300    | -0.02em        | 1.15        |
| Card h3          | 20–24px | 400    | normal         | 1.3         |
| Body / lead      | 16–18px | 300    | normal         | 1.5         |
| Nav / labels     | 12–13px | 500    | 0.08em         | 1.4         |
| Small tags       | 10–11px | 500    | 0.12em         | 1.4         |

### Typography Rules

- Headlines use ultra-thin weights (200–300) with tight negative tracking for density and premium feel
- Large stat numbers are oversized (72px+), weight 200, IBM Plex Mono for data precision
- IBM Plex Mono is **always uppercase** with wide letter-spacing (0.08–0.15em)
- Mono font size never exceeds 14px
- Maximum 4 typographic levels per slide

## UI Patterns

### Cards

- **Standard card:** Solid background `rgba(250, 255, 239, 0.97)`, 1px border `rgba(3, 44, 45, 0.12)`, layered shadow
- **Primary card:** Standard + gradient border (Orange → Periwinkle → Teal) via border-box
- **Shadow system:** Three-layer depth: `0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 12px 48px rgba(0,0,0,0.04)`
- **No backdrop-filter** — does not render in PDF. Use solid/semi-transparent fills instead.
- Border-radius: `8px` (sm), `14px` (md), `22px` (lg)

### Buttons

- **CTA buttons:** Mono, uppercase, 0.08em tracking, gradient border (Orange → Periwinkle → Teal), 12px 24px padding
- **Hover state:** Gradient fills entire button, text goes cream, tracking widens to 0.2em
- **One CTA per slide maximum**

### Lists

- **Unordered lists:** Orange dot bullets (6px circle `::before`)
- **Ordered lists:** Numbered — must override dot bullets with counter-based `::before` content

### Tables

- **Header:** Dark teal background `rgba(3, 44, 45, 0.95)`, cream text, IBM Plex Mono uppercase
- **Rows:** Alternating subtle tint for readability. 1px border between rows.
- **Status badges:** Color-coded dots — `#22C55E` (done), `#F37C38` (in progress), `#71717A` (open)

### Dark Sections

- Background: Dark Teal `#032C2D`
- Text: Cream `#FAFFEF`
- Borders: `1px solid rgba(250, 255, 239, 0.08)`
- Kickers: Periwinkle `#A9B8FF` or Orange `#F37C38`

## Slide System

### Page Setup (PDF Rendering)

```css
@page { size: 254mm 190.5mm; margin: 0; }
```

- Fixed dimensions per slide: `254mm × 190.5mm` (16:10 landscape)
- Page breaks: `break-after: page` on every `.slide`
- Print background: `-webkit-print-color-adjust: exact` (mandatory)
- Fonts: Embedded as base64 WOFF2 — no external Google Fonts dependency

### Slide Types

| Type             | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| **Cover**        | Sunrise gradient, logo, kicker, headline, subtitle, reading time   |
| **Content**      | Kicker + action title + body card                                  |
| **Grid (2-col)** | Asymmetric golden ratio (1fr / 1.618fr) or equal columns           |
| **Table**        | Kicker + title + styled table                                      |
| **Stat/Anchor**  | Single giant metric (96px) + one line of context                   |
| **Before/After** | Two columns — danger-tinted left vs success-tinted right           |
| **Timeline**     | Horizontal stepped dots connected by line (CSS flexbox)            |
| **Quote**        | IBM Plex Serif italic pull-quote, attribution below                |
| **Social Proof** | Logo bar (grayscale, 40px height) or single testimonial            |
| **CTA**          | Full-height, centered, one button, contact info, nothing else      |

### Slide Footer (Every Slide)

- Logo (16px height) left-aligned
- Slide number right-aligned (via CSS counter)
- 1px orange top border separating footer from content
- IBM Plex Mono, 11px, muted gray `#8FA097`

### Whitespace Rules

- 60% minimum whitespace per slide
- 48px between major sections
- 24px between related elements
- 12px between label and its value
- Maximum 25 words of body text per slide

### Color Ratio

- **70%** background (cream or dark teal)
- **20%** ink (text, headings)
- **10%** accent (orange, teal — CTAs, highlights, bullets)

## Logo Assets

| Context           | File               |
| ----------------- | ------------------ |
| Light backgrounds  | `logo_black1.svg`  |
| Dark backgrounds   | `logo_white.png`   |
| Favicon / small    | `logoblack.png`    |

## Quick Reference for Slides & Proposals

| Surface       | Background | Text      | Accent              |
| ------------- | ---------- | --------- | -------------------- |
| Light slide   | `#FAFFEF`  | `#032C2D` | Teal + Orange        |
| Dark slide    | `#032C2D`  | `#FAFFEF` | Periwinkle + Orange  |
| Cover slide   | Sunrise gradient | `#FAFFEF` | —            |
| Accent line   | —          | —         | Teal → Periwinkle → Orange gradient |

## Anti-Patterns (Do Not)

- Do not use `backdrop-filter` — broken in PDF rendering
- Do not use `clamp()` with `vw` units — unpredictable in headless Chromium
- Do not rely on Google Fonts `@import` — fails offline/headless
- Do not put more than one message per slide
- Do not use more than 3 colors on any single slide
- Do not use pie charts — use horizontal bars or single hero numbers
- Do not center-align slide titles (left-align only)
- Do not put logos on every slide — cover + closing only (footer logo is the exception)
- Do not add "Thank You" closing slides — close with a CTA
- Do not use stock photos — use product screenshots, data, or empty space
