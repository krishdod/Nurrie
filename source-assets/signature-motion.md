# NURRIE signature motion — 19 November 2026

## Cream ribbon

Decorative campaign artwork generated with the built-in image generation tool. It is an abstract white cream sculpture, not a photograph of NURRIE's formula or evidence of performance. Product imagery was not modified.

- Preserved source: `source-assets/cream-ribbon-v1.png`
- Transparent delivery assets: `public/images/cream-ribbon-800.webp` (32 KB) and `public/images/cream-ribbon-1600.webp` (95 KB)
- The alpha channel is preserved. Sharp was used only to resize and encode the generated asset.

Final generation prompt:

> Use case: stylized-concept. Asset type: premium cosmetics website decorative cutout, animated later in code. Create one continuous sculptural ribbon of pure WHITE cosmetic cream, floating in a wide elegant S curve, looping once with a loose open fold. It is a thick satin cream extrusion, not cloth, paper, metal or a splash. Fine continuous spatula ridges along its length, soft rounded edges, realistic self-shadowing and restrained glossy highlights. White material must remain clearly neutral white, never beige foundation. Horizontal landscape composition, one continuous ribbon fills most width with clear empty space around every edge, entire shape visible, no cropped ends. View from slightly above in a luxury still-life studio. Soft neutral key light from upper left. Transparent background with genuine alpha; isolated cream ribbon only, no floor shadow, no backdrop, no text, no logo, no product packaging, no beads or droplets. This is an abstract campaign sculpture, not a product performance demonstration.

## Motion contract

The ribbon travels with native scrolling between the product introduction and the colour study. It does not pin the page, obstruct controls, or run an independent loop. Reduced motion presents the complete static composition.

The existing artistic product model performs one sequence: white formula, built-in brush, then the whole stick with both ends visible. The sequence is designed for 4.2 seconds of active playback. Pause, skip, replay and direct inspection remain available. Hidden or offscreen scenes stop rendering; pause and reactivation reset the timing sample so hidden time is not added to playback.

The scene uses demand rendering on every device, including after the intro. Phone visits remain photo-first and load the scene only when requested. Reduced motion skips the reveal and retains manual product controls. The foundation material remains `PRODUCT.formulaWhite` throughout.

## Verification

- Production build and TypeScript passed. Targeted lint has no errors; two native-image warnings remain for pre-encoded responsive WebP assets.
- Checked formula/brush sequence, pause, resume, skip, replay, successful completion, and phone photo-first loading in the browser.
- Inspected 320 × 568, 390 × 844, 768 × 1024 and 1440 × 900 viewport layouts with no horizontal overflow; also checked the shorter desktop chapter layout. Short phones use a two-column control group beside the model.
- Browser console contained no errors during the interaction checks. Reduced-motion behavior was reviewed in code; the preview browser did not expose media-preference emulation.
- This is browser verification, not a physical Android performance certification.
