---
name: NURRIE
description: Ivory, cocoa, and rose editorial beauty with pearl and rose-gold double-ended packaging.
colors:
  ivory: "#f2eee7"
  cocoa: "#34231c"
  rose: "#d6b19a"
  ink: "#2c1c17"
  soft: "#e7ded2"
  muted: "#776257"
  pearl: "#f5eee3"
  rose-gold: "#d4a18c"
  formula-white: "#fffdf7"
  inverse-secondary: "#e6dbcf"
  inverse-caption: "#d9cabd"
  field-placeholder: "#776257"
  error: "#9d2b20"
  track: "#ad9482"
typography:
  display:
    fontFamily: "Gambarino, Georgia, serif"
    fontSize: "clamp(52px, 4.8vw, 80px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Gambarino, Georgia, serif"
    fontSize: "clamp(48px, 5.4vw, 85px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  body:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
rounded:
  sharp: "2px"
  round: "50%"
  indicator: "2px"
spacing:
  gutter: "clamp(24px, 4.2vw, 72px)"
  mobile-gutter: "23px"
components:
  button-primary:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "16px 23px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.ivory}"
  button-dark:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.sharp}"
    padding: "16px 23px"
    typography: "{typography.label}"
  button-dark-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
  submit:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.ivory}"
    padding: "17px 22px"
    rounded: "{rounded.sharp}"
    typography: "{typography.label}"
  email-field:
    backgroundColor: "transparent"
    textColor: "{colors.cocoa}"
    padding: "11px 0 17px"
    rounded: "{rounded.sharp}"
  motion-control:
    backgroundColor: "transparent"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.round}"
    width: "46px"
    height: "46px"
  colour-reveal:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.sharp}"
    height: "410px"
  product-stage:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.sharp}"
---

## Overview

Updated 3 November 2026 following the user’s return to the original ivory, cocoa and rose-gold palette.

**Creative North Star: “Starts white. Becomes you.”**

The current implementation is an ivory, deep cocoa, and rose editorial campaign for the supplied pearl-ivory and rose-gold double-ended foundation stick. The formula starts white and changes colour as it is applied and blended, adapting to skin tone. That is the supplied product proposition, not independent clinical evidence or a promise of universal tone suitability.

`public/images/product-duo.png` is the authoritative product image; `source-assets/brand-board.jpeg` is the supplied identity reference. The first viewport serves `product-duo-640.webp`, `product-duo-1024.webp`, and `product-duo-1536.webp`. The 3D fallback uses `product-duo-1024.webp`. The rejected brown product packaging must not return. The new cocoa-background editorial portrait is atmosphere, not product-result evidence. Cocoa belongs to the interface; the supplied product casing remains pearl ivory.

This file records `app/globals.css`, `components/NurrieHome.tsx`, `components/ColourReveal.tsx`, `components/KineticScene.tsx`, and the signup/privacy flow. Product truth belongs to `PRODUCT.md` and page strategy to `SURFACE.md`.

**Key Characteristics:**

- Ivory ground, cocoa ink, rose as the single action accent.
- Oversized Gambarino name as architecture, with short serif headlines and small sans-serif labels.
- Rectangular controls, circular motion and discover marks, open compositions.
- Studio-lit 3D material depth with pause, reduced-motion, and image fallback.
- Supplied product photography owns the opening; the 3D pair sits in a secondary chapter.
- An explicitly illustrative cream-swipe study explains white-to-skin-toned change.

## Colors

Color values in the frontmatter are normative. Reveal tints are demonstration colours, not a shade catalogue.

### Primary

- **Cocoa:** body ink, colour-change field, footer, dark buttons, and 3D lettering.
- **Rose:** first-access invitation, signup field, slider thumb, and the underline on “you.”
- **Ink:** denser cocoa for body explanation, hover on dark controls, and rose-button type.

### Neutral

- **Ivory:** page ground, signup panel, and inverse text on cocoa.
- **Soft:** ritual editorial ground and the privacy removal panel.
- **Muted:** supporting labels on ivory.
- **Inverse secondary / inverse caption:** quieter text on cocoa.
- **Pearl / rose gold / formula white:** packaging and foundation materials in the 3D scene.
- **Field placeholder:** signup placeholder and helper ink.
- **Error:** inline form failures only.
- **Track:** blend-slider rail.

**The Cocoa Ground Rule.** Stay inside ivory, cocoa, rose, and the packaging metals. Preserve the restored cocoa interface and warm rose accents. Use the error colour only for a real error.

## Typography

**Display Font:** locally hosted Gambarino, with Georgia and serif fallbacks.
**Body Font:** locally hosted General Sans, with Arial and sans-serif fallbacks.

Headings are regular weight, tracking `-0.035em`, short line heights. Body copy is 15–16px with an open line height and a modest measure, generally 260–365px. Navigation, consent, launch notes, and captions are 12–14px.

The hero name is about `26.5vw` and returns at the same scale in the footer. Hero headline is `clamp(52px, 4.8vw, 80px)`, then `6vw` below 1100px, then `clamp(53px, 13.3vw, 78px)` on phones. These are component sizes, not a universal modular scale.

The masthead enters once with a GSAP letter sequence; product photography and the editorial portrait receive restrained scroll movement. Reduced motion disables these effects. The portrait uses `editorial-portrait-cocoa.webp` and its 640px derivative.

3D lettering uses bundled Optimer JSON. HTML headings and navigation stay on Gambarino.

## Layout

A fluid gutter (`clamp(24px, 4.2vw, 72px)`, 23px on phones) holds open two-column chapters. The first viewport is a full-height poster: NURRIE split across the top edge, product photography occupying the right two-thirds, and the headline, invitation, and circular discover control sitting on the ivory field. Desktop hero height is `100svh`, bounded between 910px and 1100px (1280px above 1700px).

Story order: supplied-product hero → cocoa colour-change study → “Two ends. One ritual.” with the 3D pair → Swipe / Blend / Be ritual with editorial portrait → four questions → rose signup → inverted cocoa wordmark.

Below 1100px, type and gaps tighten. Below 900px the colour chapter stops being sticky. From 701–899px, the hero sets the headline beside its supporting copy and places a full-width product image underneath. Below 700px, navigation hides, the monument stacks above copy, the product image is 420px under the CTA, ritual becomes a column, and signup stacks.

The privacy page is a reading column: 820px maximum width, 24px side padding.

## Elevation & Depth

HTML surfaces are flat and separated by colour. There is no general shadow scale. The colour study tints a transparent cream-swipe photograph with an SVG colour matrix as the slider moves, and slightly scales and rotates the swipe. This is illustration, not a measured result.

The 3D stage supplies depth through pearl shells, rose-gold hardware, white foundation, bristles, extruded lettering, light planes, and contact shadows. Device pixel ratio is capped at 1–1.5 with a low-power context. Motion stops when paused, reduced motion is requested, the page is hidden, or the scene leaves the viewport. WebGL failure falls back to the product-duo image. Hero and signup never depend on WebGL.

## Shapes

Filled buttons are 2px-radius rectangles. Image crops and panels are square. Discover, motion, reset, and success marks are circles. The active ritual marker is a 3px underline. Product geometry follows the pearl-and-rose-gold reference.

Borders are functional: input rules, motion-control outlines, the success ring, and the privacy field.

## Components

### Buttons and text links

The rose invitation uses ink type, 56px minimum height, and a trailing arrow. Hover turns it cocoa on ivory and lifts it 3px. Dark privacy actions use cocoa on ivory and hover to ink. Arrows translate up and right on hover. Text links use arrow movement rather than fills.

Focusable controls use a 2px current-color outline with a 6px offset. Disabled controls reduce opacity and show a waiting cursor. Reduced-motion CSS removes transitions while retaining focus and state.

### Registration and removal forms

The email field is transparent with a cocoa rule; submit is a full-width cocoa bar beneath it. Consent is explicit and required. States: idle, saving, error, success, removing, removed. Privacy removal uses the soft panel and an outlined field. Dark buttons on that page use `.button-dark`.

D1 stores a unique normalized email, consent timestamp, and SHA-256 removal-token hash. Requests are same-origin, JSON, and capped at 4 KB. Honeypot submissions are acknowledged without insert. New signup returns a 256-bit token; duplicates do not rotate it.

Private links use `/privacy#token`. Deletion is idempotent. There is no public listing, automatic email, payment, or added analytics.

### Navigation

The header is “Beauty, becoming.” with links to The change, The stick, and The ritual, plus “Join the first drop.” Underlines grow from the left on hover. Phones keep the brand line and signup invitation. Header and footer home links point at `/` and `/#top`.

### Colour reveal

A native 0–100 range, stage labels, and a 44px reset control. The visible note is “Illustration only. This is not a shade match or a product result.” The percentage is interaction progress, not performance.

### Ritual selector

Swipe / Blend / Be keep tab semantics, roving focus, and Left/Right/Home/End. The selected tab keeps a full underline; hover must not shrink it.

### Questions

Four native `details` rows with plus/minus indicators.

### Sculptural product scene

Paired foundation and brush views. Pause is exposed unless reduced motion is on, in which case the label is “Motion reduced.” Fallback is the supplied product image. Do not restore brown casing or a beige bullet.

## Do's and Don'ts

### Do:

- **Do** keep ivory, cocoa, and rose, with square controls and Gambarino/General Sans.
- **Do** lead with the supplied product-duo image and white formula in pearl/rose-gold packaging.
- **Do** keep the illustrative qualifier beside the colour slider.
- **Do** preserve clear headings, direct registration language, visible focus, and readable measures.
- **Do** provide a static path for motion-sensitive visitors and unsupported graphics.

### Don't:

- **Don't** add cosmetic claims, launch details, or certifications the brand has not supplied.
- **Don't** restore the rejected teal/coral interface or invented brown product casing.
- **Don't** turn the slider into a shade chart or a measured result.
- **Don't** replace the monument composition with generic feature cards.
- **Don't** make registration depend on the product animation loading.
- **Don't** treat this source-derived document as screenshot evidence.
