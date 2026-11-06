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
  pearl: "#fafafa"
  rose-gold: "#d4a18c"
  formula-white: "#ffffff"
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

Updated 5 November 2026. NURRIE opens with the approved white stick against cocoa light, a monumental ivory wordmark and “White. Until you.” A manual scene switch reveals the human campaign portrait. The neutral-white formula is explicit in every product image, 3D view and share card. The supplied packaging remains authoritative; generated colour-corrected and campaign assets are documented in source-assets/v7-white-first.md. Campaign imagery is atmosphere, never product-result evidence.

**Creative North Star: Starts white. Becomes you.**

- Cocoa, ivory, soft neutral and restrained rose-gold packaging.
- Full-bleed white-product and skin-and-silk photography with a monumental Gambarino wordmark.
- Textured brush-to-reveal interaction uncovers the approved white-corrected product photograph.
- Secondary WHITE / BLEND / YOU 3D story with manual rotation, pause and photo fallback.
- Direct launch-interest registration with explicit consent and private removal.

Product truth is in PRODUCT.md; the composition contract is in SURFACE.md. Source authority is app/globals.css, app/campaign.css, app/immersive.css and their React components. Publication status belongs to LAUNCH.md and the parent receipt.

## Materials and colour

The original ivory #f2eee7, cocoa #34231c, rose #d6b19a and soft #e7ded2 remain. The opening photograph has cocoa negative space, skin and ivory fabric. The primary discovery action is ivory with cocoa type; first access uses a dark legibility background. The revealed photograph uses the approved neutral-white correction while preserving the supplied rose-gold trim and natural brush. Signup sits on the soft ground. Never restore the rejected teal/coral interface or invented brown packaging.

## Type and layout

Gambarino and General Sans are locally hosted. Desktop campaign title uses clamp(70px,7.5vw,116px), while the wordmark uses 24.8vw. The hero is 100svh, minimum 760px (780px at narrower desktop/tablet widths). Tablets retain the portrait-and-copy overlay. Below 700px, the copy moves into a 242px cocoa panel, the photograph occupies the remaining hero height, and the headline is 43px. The hero minimum is 760px on phones; short screens scroll naturally. Secondary navigation hides on phones; first access remains visible.

The sequence is campaign portrait → white-first introduction and tactile supplied-photo reveal → interactive 3D product story → Swipe / Blend / Be ritual → four questions → consent-based signup → cocoa footer. There is one H1. The embedded 3D section uses H2 and hides its duplicate header.

## Motion and interaction

The hero uses restrained GSAP entrance and native-scroll parallax. Reduced motion disables automatic hero movement. The reveal paints a cream photograph on a canvas, then removes it with textured brush stamps while dragging. Vertical touch scrolling remains native. Reveal the stick and Try the reveal again are ordinary keyboard-accessible buttons. The adjacent note reads: A visual story of transformation. Not a shade match or a product-result demonstration. This is not a shade simulator. The old ColourReveal slider component has been removed.

The 3D story loads within 500px of the viewport, in a 230svh section (210svh phone). Scroll drives WHITE / BLEND / YOU and opens the lower brush cap. The white formula remains white. Manual rotation, pause, direct chapter controls, reduced-motion handling, hidden/offscreen suspension and supplied-image fallback remain. Reduced motion removes the tall scroll region. This model is an artistic representation, not engineering data.

## Controls and forms

Controls use rectangular fills, small circles for motion, current-color focus outlines and familiar text labels. Ritual tabs support Left/Right/Home/End with roving focus. Questions use native details. Registration states remain idle, saving, error and success; privacy removal adds removing and removed.

D1 stores normalized unique email, consent timestamp and a SHA-256 removal-token hash. Requests are same-origin JSON, capped at 4KB, with explicit consent and a honeypot. A new signup receives a 256-bit private removal token in a URL fragment; duplicates do not replace it. Deletion is idempotent. No automatic email, payment, reservation, public subscriber listing or marketing analytics is added.

## Evidence and boundaries

The unchanged source-assets/product-duo-original.png and brand-board.jpeg remain authoritative for design. The approved white correction and new product campaign are documented in source-assets/v7-white-first.md; prior portrait provenance is in source-assets/v5-art-direction.md. The v5 independent review found no material aesthetic correction in its hero captures, but recorded a missing Impeccable-specific concept-seed contract. Do not describe that historical review as an unconditional pass. Current root verification is recorded separately under .impeccable/review/v7-*. Physical phone and exhaustive cross-browser certification are not claimed.

Do not invent origin, ingredients, SPF, scientific mechanism, universal tone compatibility, clinical performance, price, date or testimonials. Preserve clear proposition and registration even when graphics fail.


## V6 interaction finish — 5 November 2026

The accepted photographic campaign and original colours remain. On desktops taller than the minimum 680px but shorter than 800px, the title and spacing adapt so the monumental wordmark fits. Image parallax now moves inside an overflow-clipped image field rather than exposing the ground above it.

The ritual pairs Swipe with a close crop of the supplied white foundation, Blend with the supplied brush, and Be with the atmospheric portrait. Keyboard tab behavior remains. On phones the heading and introduction precede the photograph, followed immediately by the tabs and explanation. No additional product photography or claims were invented.

The secondary 3D words are now individual extruded characters, each turning and moving along the native scroll transition. Inspect the details opens a closer, static view in the same stage. Direct White / Blend / You controls select the inspection angle without scrolling, while rotation remains available. The cap is omitted from inspection to keep the detail visible; the scene is explicitly described as an artistic preview. Returning to the story restores the native-scroll phase. Automatic motion is paused during inspection; the exit remains available if graphics fail.

The cream reveal has a pointer-following Hold & brush affordance on fine pointers, with a pressed state. Touch devices retain native scrolling and the existing reveal/reset button. Reduced motion retains a standard cursor. FAQ controls, form focus, submission state and footer separation are refined. Email requests the email keyboard and disables autocapitalization/spelling; success and removal focus the result heading without scrolling.

## V7 white-first campaign — 5 November 2026

The approved colour correction replaces the warm-cast product in the reveal, ritual, graphics fallbacks, privacy header and social metadata. lib/product.ts is the single delivery authority. The formula material uses neutral #ffffff, neutral lighting and low environmental tint; the casing uses #fafafa. Natural brush bristles and rose-gold hardware keep their own colours. No unused foundation changes colour in the 3D story.

The white-product scene is the default hero. The white formula / The face buttons manually switch the photograph with a restrained wipe, an accessible pressed state and a solid cocoa control background. Reduced motion removes the wipe. Phones and portrait tablets through 1100px use a 242px cocoa copy panel; portrait tablets have a 900px minimum hero, phones 760px. Scene controls sit above that panel, with wordmark clearance. Landscape desktops retain the left copy overlay. The retired warm-cast product files are archived outside public assets, and the unused colour-tint slider component is deleted.


## V8 The Living Cover & Customer Experience — November 2026

V8 unifies the hero and 3D story into a single, high-status Living Cover continuous scroll stage (`LivingCover.tsx`, `CoverScene.tsx`, and `living.css`). As the user scrolls, individual 3D letters for WHITE, BLEND, and YOU part and rotate around an oversized pearl-and-rose-gold double-ended stick. The lower cap slides laterally to expose the natural blending brush, while the warm editorial portrait is revealed at the climax.

Interactive controls include inertial pointer drag rotation, quick 90-degree inspection, and reduced-motion suspension. A studio contact shadow grounds the 3D model. Typography preloads (`Gambarino` and `General Sans`) eliminate layout shift. Customer conversion is elevated through an exclusive Pre-Launch Edition tier highlighting early allocation, formulation insights, and private invitations, while preserving explicit GDPR consent and tokenized self-service removal.

## V8.2 Luxury Refinement & Performance Overhaul - November 2026

1. **3D Scene Purification & Performance**: Removed intrusive 3D extruded lettering that cluttered the viewport and bogged down framerates. Replaced with clean HTML/CSS Gambarino display typography. Corrected the vertical "NURRIE" logo rotation from upside-down to upright (-90deg). Refined rose-gold collar proportions and metalness/emissive shaders to eliminate muddy plastic tones, and tuned formula bullet to a pure, satin-matte white.
2. **Atmospheric Crossfade Transition**: Replaced the harsh vertical clip-path (which split mobile viewports and cut faces in half) with a smooth, cinematic opacity crossfade and radial dark-vignette overlay, preserving natural portrait continuity behind the 3D stick.
3. **Mobile Ergonomics & Collision Resolution**: Separated the header, chapter tabs, 3D object stage, copy, and interaction controls into a dedicated vertical hierarchy. Removed tool buttons from overlapping the portrait, and eliminated horizontal scroll overflow.
4. **FAQ Architectural Redesign**: Replaced the previous single-column layout (with 36% left-margin void) with a balanced, luxury 2-column editorial architecture: sticky header, narrative intro, priority concierge card, and styled accordion cards with smooth rotating circular icon badges and clean typography.
5. **Skill Integration**: Cloned and registered the Magic MCP (21st-dev/magic-mcp) server and 21st-ui skill for advanced component scaffolding.