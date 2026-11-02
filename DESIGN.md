---
name: NURRIE
description: Ivory and cocoa editorial beauty with pearl and rose-gold double-ended packaging.
colors:
  cocoa: "#34231c"
  ivory: "#f2eee7"
  paper: "#e8e0d6"
  muted: "#776257"
  sand: "#cec1af"
  signup-sand: "#d9cbb9"
  pearl: "#f1e8db"
  rose-gold: "#c98f79"
  formula-white: "#fffdf7"
  design-surface: "#e9ddd1"
  lettering: "#d9c8b9"
  reveal-surface: "#b89279"
  reveal-highlight: "#d8b79d"
  reveal-white: "#faf7f0"
  reveal-blended: "#bf8f6f"
  button-hover: "#583d31"
  submit-hover: "#553a2c"
  field-placeholder: "#705b4d"
  helper: "#604b3c"
  error: "#852a21"
  inactive-tab: "#8c7668"
  inverse-secondary: "#e6dbcf"
  inverse-caption: "#d4c2b2"
  footer-secondary: "#cbbbaf"
typography:
  display:
    fontFamily: "Gambarino, Georgia, serif"
    fontSize: "clamp(62px, 6.8vw, 108px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Gambarino, Georgia, serif"
    fontSize: "clamp(48px, 5.4vw, 83px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  body:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
rounded:
  sharp: "0px"
  round: "50%"
  indicator: "2px"
spacing:
  gutter: "clamp(24px, 4.8vw, 80px)"
  mobile-gutter: "23px"
  grid-gap: "70px"
  tablet-grid-gap: "40px"
  transformation: "110px"
  section-standard: "120px"
components:
  button-primary:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.sharp}"
    padding: "17px 26px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  submit:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.ivory}"
    padding: "12px 18px"
    rounded: "{rounded.sharp}"
    typography: "{typography.label}"
  email-field:
    backgroundColor: "transparent"
    textColor: "{colors.cocoa}"
    padding: "12px 0"
    rounded: "{rounded.sharp}"
  motion-control:
    backgroundColor: "transparent"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.round}"
    width: "44px"
    height: "44px"
  colour-reveal:
    backgroundColor: "{colors.reveal-surface}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.sharp}"
    height: "315px"
  product-stage:
    backgroundColor: "{colors.design-surface}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.sharp}"
---

## Overview

**Creative North Star: “Starts white. Becomes you.”**

The user-selected ivory-and-cocoa editorial world now follows the supplied product: a pearl ivory, rose-gold double-ended foundation stick with WHITE formula and a built-in blending brush. The user states that the formula changes colour as it is applied and blended, adapting to skin tone. This is the supplied product proposition, not independent clinical evidence or a promise of universal tone suitability.

`public/images/product-duo.png` is retained as the authoritative source image; `source-assets/brand-board.jpeg` is the supplied identity reference. The first viewport serves responsive `product-duo-640.webp`, `product-duo-1024.webp`, and `product-duo-1536.webp` derivatives. The 3D fallback uses `product-duo-1024.webp`. The initial invented cocoa packaging and generated campaign are superseded. Cocoa interface styling must not become brown product casing.

This refresh records current `app/globals.css`, `components/NurrieHome.tsx`, `components/ColourReveal.tsx`, `components/KineticScene.tsx`, and the signup/privacy flow. Product truth belongs to `PRODUCT.md` and page strategy to `SURFACE.md`. This source-derived documentation does not certify browser review or publication status.

The owning task reports a passing scoped review of the saved `tablet-hero.jpg`, `tablet-colour.jpg`, and `mobile-colour.jpg` captures in `.impeccable/review`, successful keyboard slider checks, and no observed console errors. This evidence does not itself establish publication status.

**Key Characteristics:**

- Warm ivory and paper surfaces with deep cocoa text and inverse sections.
- Large serif statements paired with small, direct sans-serif labels.
- Rectangular controls, open compositions, and few borders.
- Studio-lit 3D material depth with pause, reduced-motion, and image fallback behavior.
- Supplied product photography leads; the revised 3D pair sits in a secondary design chapter.
- An explicitly illustrative slider explains white-to-skin-toned colour change.

## Colors

The interface retains warm brown and parchment tones; the supplied packaging adds pearl ivory, rose gold, and formula white. Color values in the frontmatter are normative. The reveal endpoints are demonstration colours, not a shade catalogue or a measured result.

### Primary

- **Cocoa:** main ink, primary controls, and full inverse surfaces.
- **Button hover / submit hover:** warmer cocoa variants used for interactive feedback.
- **Pearl / rose gold / formula white:** packaging and white foundation materials in the revised 3D scene.

### Neutral

- **Ivory:** page ground and primary inverse text.
- **Paper:** editorial section and privacy removal-panel ground.
- **Sand:** scene loading letter; **signup sand:** registration surface.
- **Muted:** secondary labels on light surfaces.
- **Inverse secondary / inverse caption / footer secondary:** progressively quieter supporting text on cocoa.
- **Field placeholder / helper:** readable field and registration supporting text.
- **Inactive tab:** the unselected ritual labels.
- **Error:** inline form failures.
- **Design surface / lettering:** the warm sculpture stage and extruded brand text.
- **Reveal surface / reveal white / reveal blended:** the illustrative colour-change field and its two endpoints.

**The Warm Ground Rule.** Keep the interface within the implemented cocoa and warm-neutral family; use the error color only for a real error state.

## Typography

**Display Font:** locally hosted Gambarino, with Georgia and serif fallbacks.
**Body Font:** locally hosted General Sans, with Arial and sans-serif fallbacks.

Display headings use normal weight, tight tracking, and short line heights. Body copy uses an open line height and modest measure: the main explanatory blocks generally cap at 290–415px. Body paragraphs use 15–17px in the marketing surface; navigation and control labels use 12–14px, with smaller supporting captions.

Hero type is 6.3vw between 681px and 1000px, then `clamp(52px, 13vw, 84px)` on phones. At widths of at least 1500px, it is 106px. Consent, helper text, launch note, design caption, footer text, and reveal scale/note/reset labels are 13px. Product, transformation, and signup headings have their own responsive sizes. The footer wordmark is oversized at approximately 22vw. These are component-specific values, not a universal modular scale.

The 3D lettering uses the bundled Optimer typeface JSON. It belongs to the sculpture; the HTML headings and navigation retain Gambarino.

## Layout

The primary layout uses a fluid horizontal gutter and open two-column compositions. The hero uses a 0.92:1.08 proportion with 35px gap: heading, explanation, and signup invitation on the left; the supplied product-duo image on the right, reaching the outer page edge. Its desktop height is viewport-sensitive and bounded between 690px and 850px.

The dark cocoa colour-change explanation and slider follow the hero. The product chapter then introduces the two-ended design and its secondary 3D stage. Ritual tabs, signup, questions, and the closing wordmark follow. The older manifesto and campaign-photo sequence is no longer active.

Between 681px and 1000px, the hero uses equal columns with a 25px gap and 510px image minimum height; other column gaps tighten, and the registration input and submit button stack. At 680px, sections become single-column with a 23px gutter. The supplied hero image is 410px tall beneath the copy and CTA; the design caption precedes a 430px scene. The registration input and button share one row again. Main navigation links hide while the signup link remains. The privacy page remains a reading surface with an 820px maximum width and 24px side padding.

## Elevation & Depth

HTML surfaces are flat and separated by colour and spacing. There is no general interface shadow scale. The colour reveal is an authored textured SVG cream smear with directional highlights, grain, fine ridges, and a shallow drop shadow over a warm shaded field. As the slider moves, the smear spreads and its ridges and shadow diminish. It replaces the initial smooth oval. This is material illustration, not performance evidence.

The secondary 3D stage supplies depth through pearl shells, rose-gold hardware, WHITE foundation, shaped brush bristles, extruded lettering, local light planes, and contact shadows. Two upright views represent the ends of the same double-ended product. The canvas limits device pixel ratio to 1–1.5 and uses a low-power context. Motion stops when paused, reduced motion is requested, the page is hidden, or the scene leaves the viewport. WebGL failure or context loss falls back to the supplied product-duo image. The hero and signup do not depend on WebGL.

## Shapes

Buttons, image crops, input rows, and panels have square corners. The motion control and success indicator are circles. The active ritual marker is a short rounded stroke. The illustrative formula uses an authored SVG smear contour with drawn ridges rather than a rounded CSS oval. Cylindrical product geometry follows the supplied pearl-and-rose-gold reference.

Borders are functional: input rules, the motion-control outline, the success ring, and the privacy input. Decorative containers do not receive additional framing.

## Components

### Buttons and text links

Primary controls pair cocoa with ivory, square corners, generous horizontal spacing, and a trailing arrow. Their minimum height is 57px on desktop and 53px on phones. Hover warms the background and raises the control by 2px; active state shifts it down by 1px. Arrows translate slightly up and right on hover. Plain links use underlines or arrow movement rather than filled surfaces.

All focusable controls use a visible 2px current-color outline with a 6px offset. Disabled controls reduce opacity and show a waiting cursor. Reduced-motion CSS removes transitions and keyframe motion while retaining focus and state styling.

### Registration and removal forms

The main email field is transparent and joins its submit control above a cocoa bottom rule. The consent checkbox is explicit and required. The form has idle, saving, error, success, removing, and removed states; inline errors accompany unsuccessful requests. The success panel uses a circle check mark and a serif heading. Privacy removal uses a filled paper panel and a conventional outlined text field.

The backend stores a unique normalized email, consent timestamp, and SHA-256 removal-token hash in D1. It validates same-origin requests, email and consent, bounds the JSON body to 4 KB, and rejects honeypot submissions without inserting them. The bounded body is consumed before origin rejection to avoid an unread stream in the local Worker proxy. New signup returns a random 256-bit removal token; duplicates do not rotate the original credential, though a supplied matching token can be retained.

Private links use `/privacy#token`; optional session storage preserves the token in the current browser session. Deletion is idempotent and token-based. The privacy form accepts a valid same-site link or raw token and deletes only on submission. There is no public registration listing, automatic email, payment, stock reservation, or added marketing analytics.

### Navigation

The serif wordmark anchors a sparse header. Text links lead to the colour change and stick design; the signup invitation remains prominent. Text navigation uses a thin animated underline on hover. The phone header retains the wordmark and signup invitation.

### Colour reveal

The native range input spans 0–100 with visible progress, changing accessible value text, stage labels, and a 44px minimum-height reset control. It starts white and interpolates the textured SVG smear toward a skin-toned colour as it spreads. The slider has a 2px track and 24px thumb. Its explanatory note and scale labels are 13px. Keep the visible note: “An illustration of the colour change, not a shade match or a product result.” The control does not inspect a face, recommend a shade, or measure coverage.

### Ritual selector

Swipe / Blend / Be tabs explain applying the WHITE formula, turning to the built-in brush, and completing the ritual. Selected type is cocoa, slightly raised, and marked by a short stroke; unselected type is muted brown. Preserve tab semantics, roving focus, and Left/Right/Home/End keyboard handling. Description changes use a short entrance animation.

### Questions

Native disclosure elements present question rows with plus/minus indicators. Answers stay within a readable measure. This pattern supplies keyboard behavior without a custom accordion framework.

### Sculptural product scene

The paired foundation-end and brush-end views use pearl ivory, rose gold, and white formula. Product and extruded lettering react subtly to the pointer, with gentle movement and scroll response on the lettering. The circular control exposes playback; “Motion reduced” replaces it when the OS preference is active. The supplied product-duo image is the fallback. Do not restore the initial brown casing, beige bullet, or floating cocoa cap.

## Do's and Don'ts

### Do:

- **Do** retain the warm palette, square controls, and Gambarino/General Sans pairing.
- **Do** lead with the supplied product-duo image and keep its white formula and pearl/rose-gold packaging consistent.
- **Do** retain the illustrative qualifier beside the colour slider.
- **Do** preserve clear headings, direct registration language, visible focus, and readable measures.
- **Do** provide a static path for motion-sensitive visitors and unsupported graphics contexts.
- **Do** verify rendered desktop, phone, keyboard, and text-zoom behavior before calling the design visually approved.

### Don't:

- **Don't** add cosmetic claims, launch details, or certifications that the brand has not supplied.
- **Don't** add origin or Korean-manufacture claims, clinical results, universal tone suitability, scientific mechanisms, ingredients, SPF, or wear duration without support.
- **Don't** turn the slider into a shade chart, personalised recommendation, or measured result.
- **Don't** restore the rejected cocoa product or generated cocoa campaign image.
- **Don't** replace the open editorial composition with generic feature cards.
- **Don't** make the registration action depend on the product animation loading.
- **Don't** treat this source-derived document as screenshot or usability-test evidence.
