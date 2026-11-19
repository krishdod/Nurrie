# Mobile campaign refinement — 20 November 2026

The phone layout now opens as a continuous cocoa campaign image, with large ivory typography and an unobstructed view of the white formula. It uses the existing approved product campaign asset through a responsive picture source. Desktop retains its ivory 3D composition.

The 3D entry sits beside the chapter controls on regular phones and on its own line on very narrow screens. Mobile 3D remains opt-in. Opening the scene switches the headline overlap off so the model and text remain separate.

The product introduction now pairs product and portrait photography in an asymmetric two-column spread. The comparison labels are smaller; the native slider's endpoint labels are actionable controls, replacing a duplicate button row. Signup uses a continuous surface with a simple divider and no decorative product photograph on phones. Existing copy, white-formula visuals and the 84% display remain intact.

## Validation

- Next.js production build and TypeScript passed. Targeted component lint reported no errors and four existing native-image warnings.
- Visually reviewed 320 × 568, 390 × 844, 768 × 1024 and 1440 × 900 browser viewports. No horizontal page overflow observed.
- Verified all three chapter headings fit, the white product tip stays unobstructed, and phone 3D opens and returns to the campaign image.
- White formula and Blended view controls synchronised the portrait, native input and percentage output at 100% and 0%.
- Reviewed the product spread, comparison and signup layouts; no browser errors were observed during these checks.

These are resized Chromium checks, not physical-device performance or touch measurements. No registration was submitted and waitlist storage was not changed.
