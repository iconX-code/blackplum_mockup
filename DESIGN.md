---
version: alpha
name: Streamtime theme
description: A warm, hand-cut, halftone-textured interface for Streamtime (project management for creative studios). Anchors on a cream "paper" canvas with ink-black 2px borders and pill-shaped CTAs, oversized geometric-display headlines (Hanken Grotesk Black at 88–144px with -0.035em tracking), and a vocabulary of textured 3D-rendered shapes — yellow spikes, blue balls, pink semicircles, purple spike-suns — scattered as ambient page furniture. The Streamtime wordmark is hand-cut, never typeset; every glyph is its own SVG.

colors:
  ink: "#0F0F0F"
  ink-soft: "#1F1F1F"
  paper: "#F5EFE3"
  paper-warm: "#EFE7D6"
  paper-cool: "#ECE9E2"
  white: "#FFFFFF"
  brand-yellow: "#FFD23F"
  brand-yellow-soft: "#FFE680"
  brand-blue: "#4FC3F7"
  brand-blue-deep: "#2196F3"
  brand-pink: "#FF8FA3"
  brand-pink-soft: "#FFC2CD"
  brand-green: "#7CB342"
  brand-green-soft: "#B8D88A"
  brand-purple: "#8E6FE0"
  brand-coral: "#FF6B4A"
  grey-100: "#E8E4DA"
  grey-200: "#C9C4B8"
  grey-300: "#9D998E"
  grey-400: "#6B6862"
  grey-500: "#3D3B36"
  fg-1: "#0F0F0F"
  fg-2: "#3D3B36"
  fg-3: "#6B6862"
  fg-muted: "#9D998E"
  fg-inverse: "#F5EFE3"
  bg-1: "#F5EFE3"
  bg-2: "#EFE7D6"
  bg-3: "#FFFFFF"
  bg-inverse: "#0F0F0F"
  border: "#0F0F0F"
  border-soft: "#E8E4DA"
  cta-bg: "#0F0F0F"
  cta-fg: "#F5EFE3"
  cta-bg-hover: "#FFD23F"
  cta-fg-hover: "#0F0F0F"


typography:
  display-hero:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 144px
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: -0.04em
  display-xl:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 88px
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: -0.035em
  display-lg:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 64px
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: -0.03em
  display-md:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 44px
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: -0.025em
  display-sm:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.02em
  title-lg:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.02em
  title-md:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.015em
  title-sm:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.01em
  lead:
    fontFamily: "Inter, Hanken Grotesk, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, Hanken Grotesk, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, Hanken Grotesk, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  eyebrow:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.04em
  caption:
    fontFamily: "Inter, Hanken Grotesk, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  button:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.01em
  nav-link:
    fontFamily: "Hanken Grotesk, GT Walsheim, Aeonik, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  mono:
    fontFamily: "ui-monospace, SF Mono, JetBrains Mono, Menlo, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  section: 96px
  hero: 128px

borders:
  width-default: 2px
  width-soft: 1.5px
  color-default: "{colors.ink}"
  color-soft: "{colors.border-soft}"

shadows:
  card: "0 1px 0 0 {colors.ink}"
  press: "4px 4px 0 0 {colors.ink}"
  press-lg: "6px 6px 0 0 {colors.ink}"

motion:
  ease: "cubic-bezier(.2, .8, .2, 1)"
  ease-bounce: "cubic-bezier(.34, 1.56, .64, 1)"
  duration-fast: 150ms
  duration-base: 200ms
  duration-slow: 350ms

components:
  top-nav:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    borderBottom: "2px solid {colors.ink}"
    height: 64px
    padding: 14px 28px
  nav-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
    padding: 10px 14px
  nav-link-hover:
    backgroundColor: "{colors.brand-yellow-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"

  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    border: "2px solid {colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 14px 22px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.brand-yellow}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.pill}"
    transform: "translate(-2px, -2px)"
    boxShadow: "{shadows.press}"
  button-primary-lg:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    border: "2px solid {colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 18px 30px
    height: 56px
    fontSize: 18px
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 14px 22px
    height: 48px
  button-yellow:
    backgroundColor: "{colors.brand-yellow}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 14px 22px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    border: "2px solid transparent"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 14px 22px

  text-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 0 18px
    height: 48px

  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    border: "1.5px solid {colors.ink}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: 0 14px
    height: 32px
  chip-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    border: "1.5px solid {colors.ink}"
    rounded: "{rounded.pill}"
  chip-yellow:
    backgroundColor: "{colors.brand-yellow}"
    textColor: "{colors.ink}"
    border: "1.5px solid {colors.ink}"
    rounded: "{rounded.pill}"
  shape-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: 6px 14px 6px 6px

  hero-band:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.display-hero}"
    padding: 80px 32px 120px
  hero-wordmark:
    typography: hand-cut SVG glyphs (never typeset)
    glyphHeight: 96px
    gap: 6px
    letterRotationRange: -5deg to +5deg
    letterTranslateY: -4px to +10px
  hero-shapes:
    behavior: ambient floating brand shapes positioned absolutely behind content
    animations: float (5–8s ease-in-out), spin-slow (18s linear)
    z-index: 1

  value-band:
    backgroundColor: "{colors.paper-warm}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    borderTop: "2px solid {colors.ink}"
    borderBottom: "2px solid {colors.ink}"
    padding: 120px 32px
    highlightStyle: yellow rotated -1.5deg padded 0 .15em rounded 12px

  feature-tab:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    border: "2px solid transparent"
    typography: "{typography.title-md}"
    rounded: "{rounded.md}"
    padding: 18px 20px
  feature-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
  feature-panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.lg}"
    padding: 48px
    minHeight: 520px

  usecase-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.lg}"
    overflow: hidden
  usecase-card-hover:
    transform: "translate(-3px, -3px)"
    boxShadow: "{shadows.press-lg}"

  testimonial-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  testimonial-card-pink:
    backgroundColor: "{colors.brand-pink-soft}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.lg}"
    padding: 32px
  testimonial-card-blue:
    backgroundColor: "{colors.brand-blue}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.lg}"
    padding: 32px
  testimonial-card-yellow:
    backgroundColor: "{colors.brand-yellow}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.lg}"
    padding: 32px

  blog-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.lg}"
    overflow: hidden
  blog-card-thumb-cream:
    backgroundColor: "{colors.paper-warm}"
    borderBottom: "2px solid {colors.ink}"
  blog-card-thumb-pink:
    backgroundColor: "{colors.brand-pink-soft}"
    borderBottom: "2px solid {colors.ink}"
  blog-card-thumb-blue:
    backgroundColor: "{colors.brand-blue}"
    borderBottom: "2px solid {colors.ink}"
  blog-card-thumb-yellow:
    backgroundColor: "{colors.brand-yellow}"
    borderBottom: "2px solid {colors.ink}"

  logo-marquee-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.title-lg}"
    padding: 40px 0

  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body-md}"
    borderTop: "2px solid {colors.ink}"
    padding: 80px 32px 40px
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.paper}"
    typography: "{typography.body-md}"
  footer-link-hover:
    textColor: "{colors.brand-yellow}"

  brand-shape:
    behavior: PNG/WEBP halftone-textured asset, never recolored, never SVG-substituted
    placement: absolute, scattered, with rotation
    animation-options: float, float-slow, spin-slow
  wordmark-glyph:
    behavior: individual SVG per letter (s, t, r, e-1, a, m-1, t, i, m-2, e-2)
    height: 36–96px depending on context
    rotation: random ±5deg
---

## Overview

Streamtime's marketing system is a **warm, hand-cut, halftone-textured** interface — the visual antithesis of the cool-gray productivity-SaaS template. The base atmosphere is a **cream paper canvas** (`{colors.paper}` — #F5EFE3) holding ink-black headlines and a vocabulary of **textured 3D shapes** (yellow spikes, blue balls, pink semicircles, purple spike-suns, halftone bars and zigzags) that float, scatter, and punctuate every page as ambient brand voltage.

Type voice runs **Hanken Grotesk Black** (substituted for the proprietary Streamtime display face) at very large sizes — 88–144px hero with -0.035em to -0.04em tracking — paired with **Inter** for body. Display weight stays at **900** (Black). The condensed-but-friendly geometric character of the typeface paired with the cream substrate gives Streamtime its distinctive warmth-without-bombast.

The brand's most-recognized element is **the wordmark itself**, which is *not typeset* — every glyph in "STREAMTIME" is its own hand-cut SVG, placed individually with small rotations (±5°) and vertical jitter (-4 to +10px). Treat the wordmark as a sequence of images, never as text.

Component voltage comes from **2px solid ink-black borders** on pill-shaped CTAs and rounded cards, with **hard-edge offset shadows** (no blur) on hover (`{shadows.press}` — `4px 4px 0 ink`). Surfaces lean cream-on-cream-on-white; saturated brand color appears in soft accents (testimonial cards, blog thumbnails, button hovers) rather than dominating the canvas.

**Key Characteristics:**
- Cream paper canvas (`{colors.paper}` — #F5EFE3). The warm tint is non-negotiable; cool grays break the system.
- Ink-black 2px borders everywhere — buttons, cards, nav, inputs. Hairlines are 1.5px and reserved for chips and dividers.
- Pill-shaped CTAs (`{rounded.pill}`) — the dominant button shape. Rounded `{rounded.lg}` (24px) for cards.
- Hard-edge offset shadows on hover. No soft drop shadows anywhere in the system.
- Hand-cut SVG wordmark glyphs — never replace with typeset text.
- Halftone-textured PNG/WEBP brand shapes — never recolor, never substitute with flat SVG.
- Hanken Grotesk Black at 900 weight with negative tracking on every display headline.
- Saturated brand colors used as accent surfaces (testimonial cards, blog thumbs, hover states), not as full-page floors.
- Section rhythm `{spacing.section}` (96px) between major bands; `{spacing.hero}` (128px) for hero/value bands.
- Black footer with cream type — the system's only dark band, used to close every page.

## Colors

### Brand & Accent
- **Brand Yellow** (`{colors.brand-yellow}` — #FFD23F): Signature accent. Logo bg, button hover fill, highlight pill in value-band copy. Always paired with ink type.
- **Brand Yellow Soft** (`{colors.brand-yellow-soft}` — #FFE680): Nav-link hover background. Lower-key hover affordance.
- **Brand Blue** (`{colors.brand-blue}` — #4FC3F7): Sky-blue accent. Testimonial card variant, blog thumb variant.
- **Brand Pink** (`{colors.brand-pink}` — #FF8FA3): Warm pink accent shape (semicircles, bars).
- **Brand Pink Soft** (`{colors.brand-pink-soft}` — #FFC2CD): Soft testimonial / blog thumb fill.
- **Brand Green** (`{colors.brand-green}` — #7CB342): Spike-circle accent shape.
- **Brand Purple** (`{colors.brand-purple}` — #8E6FE0): Spike-sun accent shape.
- **Brand Coral** (`{colors.brand-coral}` — #FF6B4A): Deep accent for hover/active states (rare).

### Surface
- **Paper** (`{colors.paper}` — #F5EFE3): The default page floor. Warm cream.
- **Paper Warm** (`{colors.paper-warm}` — #EFE7D6): Value-band background, slightly deeper cream.
- **White** (`{colors.white}` — #FFFFFF): Card interiors (feature panels, usecase cards, blog cards). White is reserved for cards — never the page floor.
- **Paper Cool** (`{colors.paper-cool}` — #ECE9E2): Desaturated alt cream for tertiary bands (rare).
- **Ink** (`{colors.ink}` — #0F0F0F): Inverse surface — footer, logo-marquee band, primary CTAs.

### Text
- **fg-1 / Ink** (`{colors.ink}` — #0F0F0F): Headlines and primary body.
- **fg-2 / Grey-500** (`{colors.grey-500}` — #3D3B36): Lead paragraphs, panel body copy.
- **fg-3 / Grey-400** (`{colors.grey-400}` — #6B6862): Captions, timestamps.
- **fg-muted / Grey-300** (`{colors.grey-300}` — #9D998E): Disabled, fine-print.
- **fg-inverse** (`{colors.paper}` — #F5EFE3): Type on ink surfaces (footer, primary buttons, marquee).

### Borders
- **Border** (`{colors.ink}` — #0F0F0F): The signature 2px black outline. Used on every primary CTA, card, panel, nav, input.
- **Border Soft** (`{colors.grey-100}` — #E8E4DA): 1.5px hairline for dividers and chip outlines (rare).

## Typography

### Font Family
The system runs **Hanken Grotesk** at weights 700–900 for every display headline, eyebrow, button, and nav link, and **Inter** at 400–500 for body and lead paragraphs. The fallback stack walks `Hanken Grotesk, GT Walsheim, Aeonik, system-ui, -apple-system, sans-serif` for display and `Inter, Hanken Grotesk, system-ui, sans-serif` for body.

Hanken Grotesk Black at 900 weight with -0.035em letter-spacing IS the brand voice. The condensed-but-friendly geometric character of the typeface gives Streamtime warmth without sacrificing impact. Body type at Inter 400 / 1.5 line-height keeps running copy quiet so the display headlines and textured shapes carry the page.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-hero}` | 144px | 900 | 0.92 | -0.04em | Homepage h1 ("A way better way of working.") — clamp(56px, 9vw, 144px) responsive |
| `{typography.display-xl}` | 88px | 900 | 0.92 | -0.035em | Section heads, value-band quotes |
| `{typography.display-lg}` | 64px | 900 | 1.0 | -0.03em | Sub-section heads, footer brand line |
| `{typography.display-md}` | 44px | 900 | 1.05 | -0.025em | Feature panel titles, large card titles |
| `{typography.display-sm}` | 32px | 800 | 1.05 | -0.02em | Mid-size titles |
| `{typography.title-lg}` | 28px | 800 | 1.1 | -0.02em | Usecase card titles, marquee items |
| `{typography.title-md}` | 22px | 700 | 1.2 | -0.015em | Feature tab labels, testimonial quotes |
| `{typography.title-sm}` | 18px | 700 | 1.25 | -0.01em | Blog card titles, feature tab labels |
| `{typography.lead}` | 22px | 500 | 1.4 | 0 | Hero sub-headline, intro paragraphs (Inter) |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default running-text (Inter) |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0 | Footer body, secondary copy (Inter) |
| `{typography.eyebrow}` | 13px | 700 | 1.2 | 0.04em | Card eyebrows, blog category labels |
| `{typography.caption}` | 12px | 500 | 1.3 | 0 | Timestamps, fine-print (Inter) |
| `{typography.button}` | 16px | 700 | 1.0 | -0.01em | Standard button labels (Hanken Grotesk) |
| `{typography.nav-link}` | 15px | 600 | 1.3 | 0 | Top-nav menu items |
| `{typography.mono}` | 13px | 400 | 1.4 | 0 | Code, token labels |

### Principles
- Display weight stays at 900 (Black). Going lighter reads as soft and breaks the system's confident punch; going to a custom heavier face would feel bombastic.
- Negative tracking scales with size: -0.04em on the 144px hero, -0.035em on display-xl, easing toward 0 at body sizes.
- The Hanken Grotesk / Inter split is functional: Hanken for **headlines, buttons, eyebrows, nav** (anywhere the brand voice speaks loud); Inter for **body and lead paragraphs** (anywhere comprehension matters more than character).
- Use `text-wrap: balance` on every display headline. The shape of the line break IS part of the design.
- The wordmark "STREAMTIME" is an exception to all of this — it is hand-cut SVG, never typeset. See `{component.hero-wordmark}`.

### Note on Font Substitutes
Streamtime's actual proprietary display face is unavailable as a public webfont. **Hanken Grotesk** (weights 400–900 from Google Fonts) is the working substitute and the recommended default. **GT Walsheim** and **Aeonik** are licensed alternatives with similar geometric-friendly proportions. Avoid Inter or Roboto as the display face — neither carries the rounded geometric warmth.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.xxxl}` 64px · `{spacing.section}` 96px · `{spacing.hero}` 128px.
- **Section padding:** `{spacing.section}` (96px) vertical between major editorial bands. `{spacing.hero}` (128px) for hero and value bands.
- **Card internal padding:** `{spacing.xxxl}` (48px) for feature panels, `{spacing.xl}` (32px) for testimonial cards, `{spacing.lg}` (24px) for tighter cards.

### Grid & Container
- **Max content width:** 1280px centered.
- **Editorial body:** Single 12-column grid; hero is full-width centered; value-band is full-bleed cream-warm with content centered.
- **Feature tabs:** 380px sidebar + 1fr panel (2-column layout).
- **Usecase grid:** 3-up at desktop, 2-up at tablet, 1-up at mobile.
- **Testimonials:** 2-up at desktop, 1-up at mobile.
- **Blog grid:** 4-up at desktop, 2-up at tablet, 1-up at mobile.
- **Footer:** 2fr + 4×1fr columns at desktop.

### Whitespace Philosophy
The system breathes around oversized display headlines and ambient floating shapes. Cream canvas + 2px ink borders + textured shapes scattered with intentional rotation and animation create a hand-crafted "studio scrapbook" feel that competing tools never approach. Resist the urge to fill empty cream space — the negative space IS where the shapes float.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No border, no shadow | Page floor, footer interior |
| Bordered | 2px solid `{colors.ink}` | Buttons, cards, panels, nav, inputs — the system default |
| Hairline | 1.5px solid `{colors.ink}` | Chips, dividers inside testimonial cards |
| Card shadow | `{shadows.card}` — `0 1px 0 0 ink` | Subtle weight on stationary cards (rare) |
| Press shadow | `{shadows.press}` — `4px 4px 0 0 ink` | Hover-elevated state on buttons |
| Press-lg shadow | `{shadows.press-lg}` — `6px 6px 0 0 ink` | Hover-elevated state on cards (usecase, blog) |

The system uses **no soft / blurred shadows anywhere**. Depth is communicated by hard-edge offset shadows that mimic stamped paper-cutout offset prints. On hover, elements translate `-3px, -3px` while the shadow appears, giving the illusion of the element lifting off the page.

### Decorative Depth
- **Halftone-textured brand shapes** — PNG/WEBP assets with built-in halftone print texture. They scatter behind hero content (`{component.hero-shapes}`), inside feature panels, and across feature/testimonial bands. They are NOT tokens — they are illustrated assets with names like `shape-yellow-spike.png`, `shape-blue-ball.png`, `shape-purple-spike-sun.png`.
- **Animated logo-shape GIFs** — Ten `logo-shape-1.gif` through `logo-shape-10.gif` morphing-shape loops. Used as the hero strip directly under the wordmark, and as ambient brand markers.
- **Hand-cut SVG wordmark glyphs** — `letter-s.svg`, `letter-t.svg`, etc. Each "STREAMTIME" letter is its own SVG. Place individually with rotation and y-offset.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Tiny chips, internal dividers |
| `{rounded.sm}` | 8px | Small content blocks |
| `{rounded.md}` | 16px | Feature tabs, blog thumbnails, smaller cards |
| `{rounded.lg}` | 24px | Cards, panels, testimonials, usecase cards, blog cards |
| `{rounded.xl}` | 32px | Oversized hero artifacts |
| `{rounded.pill}` | 9999px | All buttons, all chips, nav links, text inputs |

The pill shape (`{rounded.pill}`) is the dominant CTA shape — never use square or low-radius buttons. Card radius is `{rounded.lg}` (24px), large enough to read as friendly but not so large the corner overwhelms small cards.

## Components

### Top Navigation
**`{component.top-nav}`** — Sticky cream nav, 64px tall, 2px ink-black bottom border. Logo + wordmark cluster at left (32px circular logo + bold display text), pill-shaped `{component.nav-link}` items center, CTA cluster (`{component.button-secondary}` "Sign in" + `{component.button-primary}` "Try free") at right. Padding 14px × 28px.

### Buttons
**`{component.button-primary}`** — Pill-shaped ink-black button. Background `{colors.ink}`, text `{colors.paper}`, 2px ink border, type `{typography.button}` (Hanken Grotesk 16px / 700), padding 14px × 22px, height 48px, rounded `{rounded.pill}`. Hover: background flips to `{colors.brand-yellow}`, text to ink, transform `translate(-2px, -2px)`, shadow `{shadows.press}`.

**`{component.button-primary-lg}`** — Hero-scale CTA. 18px type, padding 18px × 30px, height 56px. Used for hero "Sign up free" / "Book a demo →".

**`{component.button-secondary}`** — Cream button with ink border. Background `{colors.paper}`, ink text. Same shape as primary.

**`{component.button-yellow}`** — Yellow-fill variant. Background `{colors.brand-yellow}`, ink text + border. For high-emphasis non-primary actions.

**`{component.button-ghost}`** — Transparent button, no border, ink text. Used for secondary CTAs paired alongside primary (hero "Book a demo →").

### Inputs
**`{component.text-input}`** — Pill-shaped paper-fill input, 2px ink border, height 48px, padding 0 × 18px, type `{typography.body-md}`.

### Chips & Tags
**`{component.chip}`** — Pill chip, 32px tall, 1.5px ink hairline border, paper background, eyebrow type. Variants: `{component.chip-solid}` (ink fill, paper text), `{component.chip-yellow}` (yellow fill).

**`{component.shape-tag}`** — Brand-voice tag with embedded color dot. Ink background, paper text, 28px circle in brand color (yellow / pink / blue) at left. Padding 6px × 14px × 6px × 6px.

### Hero
**`{component.hero-band}`** — Cream-paper hero, padded 80px top / 120px bottom, overflow hidden. Holds three layers stacked z: (1) ambient `{component.hero-shapes}` floating in absolute-positioned containers; (2) the hand-cut `{component.hero-wordmark}`; (3) display headline + lead + CTA row + animated 10-shape logo strip.

**`{component.hero-wordmark}`** — The "STREAMTIME" wordmark constructed from 10 individual SVG glyphs (`letter-s.svg`, `letter-t.svg`, `letter-r.svg`, `letter-e-1.svg`, `letter-a.svg`, `letter-m-1.svg`, `letter-t.svg`, `letter-i.svg`, `letter-m-2.svg`, `letter-e-2.svg`). Each glyph rotated -5° to +5° and translated -4 to +10px on Y. Glyph height 96px. Gap 6px. NEVER substitute with typeset text.

**`{component.hero-shapes}`** — Absolute-positioned brand-shape PNG/WEBPs scattered around the hero. Mix sizes (50–170px), rotations, and three animation classes: `float` (5s ease-in-out), `float-slow` (8s), `spin-slow` (18s linear).

### Value / Quote Band
**`{component.value-band}`** — Full-bleed paper-warm band with 2px ink top + bottom borders. Padding 120px × 32px. Centers an oversized display-xl quote. Highlight phrases get a yellow fill, rotated -1.5°, padding 0 .15em, rounded 12px — the visual signature of the value band.

### Feature Tabs
**`{component.feature-tab}`** — Vertical tab list (380px sidebar). Each tab: 18px × 20px padding, transparent border-2px until active. Active state: ink fill, paper text. Inactive hover: `{colors.paper-warm}` background. Tab carries a numbered prefix (24px / 900) and title in `{typography.title-md}`.

**`{component.feature-panel}`** — White content panel, 2px ink border, rounded `{rounded.lg}`, padding 48px, min-height 520px. Display-md title + body + decorative brand shape positioned top-right.

### Cards
**`{component.usecase-card}`** — White card, 2px ink border, rounded `{rounded.lg}`, overflow hidden. 4:3 image at top with 2px ink bottom border, then 28px / 800 title + arrow row at bottom. Hover: `{shadows.press-lg}` + translate -3px.

**`{component.testimonial-card}`** — White card by default; saturated variants `{component.testimonial-card-pink}`, `{component.testimonial-card-blue}`, `{component.testimonial-card-yellow}` rotate the fill. 2px ink border, rounded `{rounded.lg}`, padding 32px. Top: `{typography.title-md}` quote. Bottom: avatar + name + role row separated by 1.5px ink hairline.

**`{component.blog-card}`** — White card, 2px ink border, rounded `{rounded.lg}`, overflow hidden. 4:3 thumb (cycling between cream / pink-soft / blue / yellow) with embedded illustration centered, then category eyebrow + 18px title in body. Hover: `{shadows.press-lg}`.

### Logo Marquee
**`{component.logo-marquee-band}`** — Full-bleed ink band, 40px vertical padding. Holds a horizontal infinite-scroll of customer logos in display title-lg type, animated translateX over 35s linear loop.

### Footer
**`{component.footer}`** — Black band, paper text, 80px top / 40px bottom padding. 2fr brand column + 4×1fr link columns. Brand block carries a 56px / 900 closing line + tagline + Try-free CTA. Below the link grid, a row of 6 city clocks (live or styled) showing time zones, then the bottom row with copyright + B Corp logo.

## Do's and Don'ts

### Do
- Anchor every page on the cream paper canvas (`{colors.paper}` — #F5EFE3). The warm tint is the brand's primary differentiator from cool-gray productivity sites.
- Use 2px solid ink borders on every primary surface — buttons, cards, panels, nav, inputs. The thick black outline IS the system.
- Use pill-shaped CTAs (`{rounded.pill}`). Pills + the cream substrate read as friendly-confident.
- Animate hover with hard-edge offset shadows + translate (`-2px, -2px` for buttons, `-3px, -3px` for cards). The "press" lift is the brand's signature interaction.
- Place ambient halftone-textured brand shapes around hero, value, and feature bands. Mix sizes, rotations, and float/spin animations.
- Construct the "STREAMTIME" wordmark from individual SVG glyphs with rotation + Y-jitter. Never typeset.
- Use Hanken Grotesk Black at 900 weight with negative tracking on every display headline.
- Use `text-wrap: balance` on display headlines.
- Cycle testimonial / blog card backgrounds across white → pink-soft → blue → yellow for visual rhythm.
- Use the ink-black footer to close every page. The dark band IS the system's signature endcap.

### Don't
- Don't use cool grays, off-whites, or pure white as the page floor. Cream paper is non-negotiable.
- Don't use soft / blurred drop shadows. Hard-edge offset only.
- Don't use 1px borders. The signature is 2px ink (1.5px is reserved for chips and internal hairlines).
- Don't use square or low-radius (4–8px) buttons. Pills only.
- Don't typeset "STREAMTIME". The hand-cut SVG wordmark is the brand's most-recognized asset; replacing it with text breaks identity.
- Don't recolor or substitute brand shapes with flat SVG — the halftone print texture IS the depth.
- Don't fill empty cream space with copy. Negative space is where shapes float.
- Don't use a cream / paper footer. The black footer is the closing-band signature.
- Don't introduce new saturated brand colors beyond the existing palette.
- Don't go below display weight 900 on headlines. Lighter weights read as soft and break the punch.
- Don't add hover state styling beyond the hard-edge press shadow + translate the system already encodes.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Hamburger nav; hero h1 144→56px (clamp); wordmark glyphs 96→36px; feature tabs collapse to single-column stacked; usecase / testimonial / blog grids 1-up |
| Tablet | 768–1024px | Top nav tightens, may hide some link types; feature tabs remain 2-column but narrower; usecase 2-up; blog 2-up |
| Desktop | 1024–1440px | Full top-nav; 380px sidebar + 1fr panel for features; usecase 3-up; blog 4-up |
| Wide | > 1440px | Same as desktop with max content 1280px and more breathing room |

### Touch Targets
- `{component.button-primary}` height 48px (button-primary-lg 56px).
- `{component.text-input}` height 48px.
- `{component.nav-link}` padding 10×14 — minimum 44px touch surface satisfied via line-height + padding.

### Collapsing Strategy
- Top nav collapses to hamburger at < 768px; CTA cluster moves into the menu drawer.
- Hero wordmark glyph height clamps from 96px → 36px on narrow screens; the 10-letter row stays single-line via tighter gap.
- Hero ambient shapes scale down and reduce in count at mobile; do not stack behind copy.
- Feature panel min-height drops to auto on mobile; the side-by-side tab + panel layout becomes a stacked accordion.
- Usecase / testimonial / blog grids reduce columns rather than scaling cards smaller.
- Logo marquee speed stays the same; track simply loops faster relative to viewport.

## Iteration Guide

1. Focus on ONE component at a time. Reference its YAML key (`{component.button-primary}`, `{component.testimonial-card-pink}`, `{component.feature-panel}`).
2. Variants of an existing component live as separate entries (`-hover`, `-active`, `-pink`, `-blue`).
3. Use `{token.refs}` everywhere — never inline hex codes or pixel values. The token system is the contract.
4. Display headlines stay Hanken Grotesk 900 with negative tracking. Body stays Inter 400/500.
5. Buttons stay pill-shaped. Cards stay rounded `{rounded.lg}`.
6. Hover ALWAYS uses hard-edge offset shadow + translate. Never blur, never opacity-fade.
7. The cream-paper canvas + ink-black borders + halftone shapes + hand-cut wordmark are a system contract — don't substitute any of the four for trend-aligned alternatives.
8. When introducing a new card variant, pick from the existing brand color palette (`{colors.brand-pink-soft}`, `{colors.brand-blue}`, `{colors.brand-yellow}`). Don't invent new ones.

## Known Gaps

- The proprietary Streamtime display face is licensed and not publicly available. Hanken Grotesk at 900 with -0.035em tracking is the closest substitute and the recommended default.
- The hand-cut SVG wordmark glyphs (`letter-s.svg` through `letter-e-2.svg`) are commissioned brand assets, not system tokens — they're shipped as files in `assets/`.
- The halftone-textured brand shapes (yellow spike, blue ball, pink semicircle, purple spike-sun, etc.) are commissioned PNG/WEBP assets. Their texture is non-reproducible without the original render — do not substitute with flat SVG geometry.
- The 10 animated logo-shape GIFs are pre-rendered loops; the timing and morph paths are not parameterized.
- Form validation states (error, success) beyond the default `{component.text-input}` are not extracted in this pass.
- In-app product surface (the actual project-management tool — schedules, time-logging, quoting screens) shares some marketing-site tokens but adds many product-specific components that are out of scope for this DESIGN.md.
- Dark-mode is not in scope. The black footer is the only ink surface; the rest of the system is cream-paper anchored.
- Animation timings beyond hover transitions (e.g. shape entrance animations on scroll, logo-strip orchestration) are not formalized.
