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
    fontSize: "clamp(70px, 7.5vw, 116px)"
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
    width: "44px"
    height: "44px"
  product-reveal:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.sharp}"
    height: "600px on phones"
  product-stage:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.sharp}"
---

## Overview

Updated 4 November 2026. NURRIE opens with a human campaign photograph, a monumental ivory wordmark and the line "Beauty, becoming." The white-first product proposition is explicit in the first viewport. The supplied pearl-ivory and rose-gold stick remains the product authority. The campaign portrait is atmosphere, never product-result evidence.

**Creative North Star: Starts white. Becomes you.**

- Cocoa, ivory, soft neutral and restrained rose-gold packaging.
- Full-bleed skin-and-silk photography with a monumental Gambarino wordmark.
- Textured brush-to-reveal interaction uncovers the exact supplied product photograph.
- Secondary WHITE / BLEND / YOU 3D story with manual rotation, pause and photo fallback.
- Direct launch-interest registration with explicit consent and private removal.

Product truth is in PRODUCT.md; the composition contract is in SURFACE.md. Source authority is app/globals.css, app/campaign.css, app/immersive.css and their React components. Publication status belongs to LAUNCH.md and the parent receipt.

## Materials and colour

The original ivory #f2eee7, cocoa #34231c, rose #d6b19a and soft #e7ded2 remain. The opening photograph has cocoa negative space, skin and ivory fabric. The primary discovery action is ivory with cocoa type; first access uses a dark legibility background. The revealed photograph keeps the supplied pearl casing, rose-gold trim, white formula and brush. Signup sits on the soft ground. Never restore the rejected teal/coral interface or invented brown packaging.

## Type and layout

Gambarino and General Sans are locally hosted. Desktop campaign title uses clamp(70px,7.5vw,116px), while the wordmark uses 24.8vw. The hero is 100svh, minimum 760px (780px at narrower desktop/tablet widths). Tablets retain the portrait-and-copy overlay. Below 700px, the copy moves into a 242px cocoa panel, the photograph occupies the remaining hero height, and the headline is 43px. The hero minimum is 760px on phones; short screens scroll naturally. Secondary navigation hides on phones; first access remains visible.

The sequence is campaign portrait → white-first introduction and tactile supplied-photo reveal → interactive 3D product story → Swipe / Blend / Be ritual → four questions → consent-based signup → cocoa footer. There is one H1. The embedded 3D section uses H2 and hides its duplicate header.

## Motion and interaction

The hero uses restrained GSAP entrance and native-scroll parallax. Reduced motion disables automatic hero movement. The reveal paints a cream photograph on a canvas, then removes it with textured brush stamps while dragging. Vertical touch scrolling remains native. Reveal the stick and Try the reveal again are ordinary keyboard-accessible buttons. The adjacent note reads: A visual story of transformation. Not a shade match or a product-result demonstration. This is not a shade simulator. The old ColourReveal slider is not mounted.

The 3D story loads within 500px of the viewport, in a 230svh section (210svh phone). Scroll drives WHITE / BLEND / YOU and opens the lower brush cap. The white formula remains white. Manual rotation, pause, direct chapter controls, reduced-motion handling, hidden/offscreen suspension and supplied-image fallback remain. Reduced motion removes the tall scroll region. This model is an artistic representation, not engineering data.

## Controls and forms

Controls use rectangular fills, small circles for motion, current-color focus outlines and familiar text labels. Ritual tabs support Left/Right/Home/End with roving focus. Questions use native details. Registration states remain idle, saving, error and success; privacy removal adds removing and removed.

D1 stores normalized unique email, consent timestamp and a SHA-256 removal-token hash. Requests are same-origin JSON, capped at 4KB, with explicit consent and a honeypot. A new signup receives a 256-bit private removal token in a URL fragment; duplicates do not replace it. Deletion is idempotent. No automatic email, payment, reservation, public subscriber listing or marketing analytics is added.

## Evidence and boundaries

The supplied product-duo.png and brand-board.jpeg remain authoritative. Generated campaign imagery and exact prompt provenance are documented in source-assets/v5-art-direction.md. Independent review found no material aesthetic correction in the desktop/phone hero captures, but recorded a missing Impeccable-specific concept-seed contract. Do not describe that review as an unconditional pass. Root verification additionally covered the tablet, reveal gesture/button/reset, 3D entry and mobile overflow; evidence is under .impeccable/review/v5-*. Physical phone and exhaustive cross-browser certification are not claimed.

Do not invent origin, ingredients, SPF, scientific mechanism, universal tone compatibility, clinical performance, price, date or testimonials. Preserve clear proposition and registration even when graphics fail.
