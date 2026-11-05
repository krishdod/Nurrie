# NURRIE v7 verification — 5 November 2026

## Scope and decisions

The user approved the neutral-white image correction and requested a more distinctive site. This pass makes the white formula the default hero, adds a manually controlled portrait alternate, and centralizes all active product imagery and white materials in lib/product.ts. Original cocoa/ivory/rose-gold identity and product claims are preserved. Generated asset provenance and exact prompts are in source-assets/v7-white-first.md.

## Verified

- TypeScript: npx tsc --noEmit, exit 0.
- Production: Sites build-site.mjs, exit 0. The existing lazy 3D chunk remains above the bundler's 500 KB advisory; no build errors.
- Rendered browser checks via CUA: 1280×720 desktop, 768×1024 tablet, 390×844 phone and 375×667 small phone. Desktop and phone production-build checks repeated on the network origin.
- Formula / Face scene selection works with click and Enter; the visible heading, selected state and image change. Product scene is the default. There is one H1.
- Fixed two observed defects: pale scene controls over pale packaging now have a cocoa background; portrait-tablet copy now sits in a separate cocoa panel to avoid crossing the product. Small-phone content scrolls naturally within the 760px minimum composition.
- No phone horizontal overflow. Browser console errors were empty in the checked development and production flows.
- The exposed formula is visibly neutral white in the product hero, ritual crop and mobile 3D inspection. Natural brush bristles retain their colour. The reveal's full-reveal button loads the new image, and inspection/You/return-to-story/ritual controls remain functional.
- Privacy header shows the corrected product. OpenGraph image points to product-white-v7.png. The return-home link works and images loaded without broken-image entries.
- Production first-access link reaches the labelled email form. Signup/removal API and form logic were not changed; the prior v6 full signup/removal test remains documented, and no new subscriber records were created in this pass.
- HTTP 200 on /, /privacy, product campaign and every shipping white-product image at http://192.168.1.2:4173. Retired /images/product-duo.png returns 404. The old warm-cast files are archived outside public delivery.
- Reduced-motion hero transitions disabled in CSS; existing GSAP preference handling preserved. Actual OS preference emulation was not performed in this pass.

## Evidence

- v7-desktop-hero.png: production build, 1280×720.
- v7-mobile-hero.png: production build, 390×844.
- v7-tablet-hero.png: development render of the same final CSS, 768×1024.
- v7-mobile-white-inspection.png: white 3D foundation detail, 390×844.

Physical phone access and exhaustive cross-browser or text-zoom certification are not claimed. Current hosted deployment and LAN process are recorded in the parent receipts. The historical v5 missing Impeccable concept-seed finding is not retroactively cleared by this review.
