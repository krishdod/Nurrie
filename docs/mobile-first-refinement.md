# Mobile-first refinement — 20 November 2026

## Changes

- Mobile opening uses natural page flow, with the proposition above the product image. White / Blend / You are manual chapters. Desktop retains its scroll-linked story.
- Short landscape phones get a two-column opening with natural scrolling.
- 3D remains opt-in on phones. Its controls occupy their own row below the product instead of obscuring it.
- A native range input below the portrait gives one-handed access to the existing colour study. Portrait, native slider, endpoint controls and percentage output share one position; dragging does not render the React tree.
- Tone controls follow the image in DOM and visual order on phones. The desktop layout keeps them beside the image.
- A compact bottom navigation appears after the opening and hides when the colour-study controls or signup are visible. It respects safe-area insets and does not force keyboard focus.
- Signup shows its message and form before the decorative image. Extra launch details are in a disclosure. Email, consent, then submission follow the same DOM and visual order. The email field is 18px on phones and uses the email keyboard hint.
- Added responsive portrait sources, larger touch targets and mobile body text. The existing 84% signup display remains unchanged.

## Verification

Production build and TypeScript passed. Targeted lint on edited components and the slider hook completed with no errors; 11 native-image warnings remain for the existing responsive WebP image approach.

Browser checks covered narrow and regular portrait phones, a larger phone, short landscape, and desktop. No horizontal overflow was observed. Verified mobile photo-first loading, manual chapter selection without page movement, 3D opening and controls, navigation links, hidden navigation during the colour study and signup, native required-email validation, tone keyboard selection, and the linked slider endpoints. A pointer drag on the native slider changed both its value and the portrait to 16%; the blended endpoint updated both to 0%, and keyboard End updated both to 100%.

Evidence is from resized Chromium viewports, keyboard input and a browser-driven pointer drag. Physical iPhone/Android touch gestures, software-keyboard behavior and real-device performance were not measured. The waitlist service and its storage configuration were not changed or exercised by submitting a registration.
