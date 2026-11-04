# V6 campaign and interaction finish — 5 November 2026

Scope: preserve the accepted campaign and original palette while strengthening the product interactions and refining the complete path.

## Implemented

- Short-desktop hero sizing keeps the full NURRIE wordmark in the viewport. Image parallax stays inside the photographic field.
- Textured brush reveal now gives fine-pointer guidance and a pressed state. The non-gesture reveal/reset controls and native vertical touch scrolling remain.
- White / Blend / You uses individually animated extruded letters. Direct inspection enlarges the product, pauses automatic motion, hides the displaced cap, supports rotation and direct chapter selection, and restores scroll phase on exit. It is labelled an artistic preview.
- Ritual tabs synchronize the supplied formula/brush close-ups with their explanations; Be returns to the atmospheric portrait. Phone ordering puts the photo beside the step controls in the reading sequence.
- FAQ affordances, footer separation, email input behavior and signup/removal result focus were refined.

## Verification

- TypeScript and production build passed. The large lazy 3D bundle still produces the existing build-size advisory.
- Hero inspected at 1440×900 and 1280×720. Tablet inspected at 768×1024 with one H1 and no horizontal overflow.
- Phone layouts inspected at 390×844 and 375×667. Inspector controls, caption and product stay separated on the small viewport.
- Keyboard ArrowRight on the ritual advances to Blend and changes the image and explanation.
- Inspect mode selects White/Blend directly, rotation works, automatic motion is disabled, and Back to the story restores native scroll control. The final You chapter reaches progress 1.
- Production LAN signup with synthetic nurrie-v6-focus-20261105@example.invalid succeeded. Focus moved to the H3 confirmation. Remove my email succeeded and focused the removal result. The synthetic record was removed; Return to signup restored the form.
- Reduced-motion and graphics-loss fallbacks reviewed in source; no physical-phone or exhaustive cross-browser certification is claimed.

Evidence: v6-desktop-hero.png, v6-mobile-inspection.png and v6-desktop-kinetic.png. This is a root review of the v6 refinements. The earlier independent v5 hero review is not represented as a new v6 independent review.
