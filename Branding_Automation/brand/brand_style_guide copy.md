# Paioneers Brand & Design Style Guide

This guide breaks down the specific colors, typography, gradients, and UI elements that give the Paioneers website its stunning, premium aesthetic. Use these guidelines when building presentations, pitch decks, or expanding the web experience.

---

## 🎨 1. Color Palette

The color system relies heavily on stark contrasts between deep, moody teals and bright creams, accented by striking, vibrant secondary hues to draw attention.

### Core Colors
| Color Name | Hex Code | Usage context |
| :--- | :--- | :--- |
| **Cream** | `#FAFFEF` | Primary Light Background, Primary Text on Dark Backgrounds |
| **Dark Teal** | `#032C2D` | Primary Dark Background, Primary Text on Light Backgrounds |

### Accent Colors
Used sparingly for highlights, borders, and gradient stops.
| Color Name | Hex Code | Swatch |
| :--- | :--- | :--- |
| **Teal** | `#0F7A99` | Accent text, hover states, gauge graphics |
| **Orange** | `#F37C38` | Interactive states, glowing dots, highlight text |
| **Periwinkle** | `#A9B8FF` | Secondary text on dark backgrounds, subtle accents |
| **Light Blue** | `#5B8DEF` | Occasional gradient midpoints |
| **Gray (Muted)**| `#8fa097` | Disabled or subtle borders |

### The "Sunset" Gradient Palette
Used exclusively for the immersive, full-screen background gradients (e.g., the *Services* or *Approach* sections).
- **Salmon 1 & 2**: `#d3866c`, `#cf8b7d`
- **Mauve 1 & 2**: `#c89495`, `#c29baa`
- **Purple 1 & 2**: `#bba2c0`, `#b5aad7`
- **Blue**: `#aeb2ec`

---

## 🖋 2. Typography

The website achieves a technical yet highly polished feel by pairing an elegant geometric sans-serif with a structural monospace font.

### Primary Font: **IBM Plex Sans**
Used for all large headlines, body text, and descriptive paragraphs.
- **Font Weights:** `200` (Extra Light), `300` (Light), `400` (Regular), `500` (Medium), `600` (Semi-Bold)
- **Styling Rules:** 
  - Main headlines are incredibly thin (Weight: `200` or `300`), large, with tight letter-spacing (`-0.02em` or `-0.03em`) to look dense and premium.
  - Large stat numbers are immense (`100px+`) and also use the thinnest weight (`200`).

### Secondary/Accent Font: **IBM Plex Mono**
Used exclusively for labels, metadata, navigation, and interactive buttons. 
- **Font Weights:** `400` (Regular), `500` (Medium)
- **Styling Rules:** 
  - **Always UPPERCASE**.
  - **Wide tracking** (letter spacing between `0.08em` and `0.15em`).
  - Small font size (`10px` to `14px`).

---

## ✨ 3. Signature Design Elements & Patterns

To maintain visual consistency in presentations, apply these repeating visual motifs:

### **A. Glassmorphism (Frosted Glass)**
Used to make floating elements (like the navigation header) blend beautifully into scrolling content.
- **Background:** `rgba(250, 255, 239, 0.92)` (Cream at 92% opacity)
- **Blur Effect:** `backdrop-filter: blur(24px);`
- **Border/Shadow:** A razor-thin bottom border or shadow: `box-shadow: 0 1px 0 rgba(3, 44, 45, 0.06);`

### **B. Gradient CTA Buttons**
Primary action buttons don't rely on solid background colors; they use "glowing" gradient borders that fill on hover.
- **Resting state:** Transparent background with a 1px border. The border is painted with a gradient: `linear-gradient(90deg, #F37C38, #A9B8FF, #0F7A99)`
- **Hover state:** The gradient rapidly expands to fill the button, and the text widens its tracking (`letter-spacing: 0.2em`).

### **C. Super-Gradients (Sunset Background)**
The background of transition sections uses a smooth 7-stop gradient spanning from warm salmon to cool blue, angled diagonally:
```css
background: linear-gradient(135deg, 
    #d3866c 0%, 
    #cf8b7d 14%, 
    #c89495 28%, 
    #c29baa 42%, 
    #bba2c0 56%, 
    #b5aad7 70%, 
    #aeb2ec 100%
);
```

### **D. Data Visualization & UI Panels**
When showing UI elements, dashboards, or "Them vs. Us" graphs:
- **"Them" (Old State):** Dim, muted. Background: `rgba(3, 44, 45, 0.95)`. Accent dots: Orange (`#F37C38` at low opacity).
- **"Us" (New State):** Vibrant, "alive". Background features a top gradient border `linear-gradient(90deg, #0F7A99, #A9B8FF, #F37C38)`. Accent dots are bright Teal (`#0F7A99`) with a pulsing drop shadow.

### **E. Sharp, Minimalist Outlines**
Avoid heavy drop shadows or rounded borders in regular content. Most elements are separated by 1px solid lines using low opacity versions of the main text color.
- Example light theme divider: `1px solid rgba(3, 44, 45, 0.12)`
- Example dark theme divider: `1px solid rgba(250, 255, 239, 0.08)`

---

## 📑 4. Presentation Translation Guide

When creating **Google Slides** or **PowerPoint** presentations based on this web design:

1. **Slide Backgrounds:** Alternate between solid Cream (`#FAFFEF`), solid Dark Teal (`#032C2D`), and the Sunset Gradient.
2. **Title Slides:** Dark Teal background. Huge, thin *IBM Plex Sans* title (Light or Extra-Light). Subtitle in upper-case *IBM Plex Mono* with wide character spacing.
3. **Images/Mockups:** Frame images in simple rectangles with no border radius, or very slight rounding (`8px`). Add a realistic dark shadow `rgba(0, 0, 0, 0.3)` only if mimicking a dark UI window floating over the cream background.
4. **Icons or Bullets:** Instead of standard bullet points, use the small geometric accents (e.g., small `6px` solid circles in Teal or Orange, or simple horizontal lines to act as dividers).
5. **Chart Styles:** For graphs, keep grids minimal or invisible. Paint "Current state" data in muted grays/periwinkle, and "Paioneers state" data in neon Teal and Orange.
