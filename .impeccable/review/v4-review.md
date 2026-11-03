# NURRIE interactive opening — 3 November 2026

Review performed inline by the implementing agent because the independent reviewer was unavailable. This is a scoped review, not an independent certification.

## Implemented

The first viewport is now a live WebGL product story. WHITE / BLEND / YOU typography follows native scroll progress around a single pearl-and-rose-gold stick. Horizontal dragging and a rotate button turn it; the lower cap opens to show the brush. The formula remains white. Chapter buttons navigate the same scroll progress, and the final chapter changes the field to cocoa. The supplied product photograph follows immediately.

The original ivory/cocoa/rose palette, actual product reference, illustrative colour study, ritual, questions, signup and removal flow remain. Existing form-response parsing and keyboard-accessibility improvements in the working tree were preserved.

## Observed and corrected

- Desktop 1280×720, tablet 768×1024, phone 390×844 and small phone 375×667 reviewed through the browser.
- Corrected stale 3D text centring after viewport resize.
- Reduced the product scale on portrait tablets to prevent overlap with supporting copy.
- Added a compact layout so chapter controls fit on short phones.
- Increased rotation/pause controls to 44px.
- Corrected the cap pivot to rotate around its own centre and kept the final phone scene within the viewport.
- Verified dragging, quarter-turn rotation, pause, direct chapter selection and the first-access link. Rotation remains available while idle animation is paused.
- Graphics fallback was observed during development refresh; supplied product photo and HTML story remained readable. Unavailable controls now disable. Reduced-motion paths were reviewed in source, not through an emulated preference.
- Production browser signup reached its success state. Removing the synthetic address reached the removed state.

## Validation

TypeScript passed. All eight existing waitlist validation tests passed. The final production build passed; the bundler still reports the expected large lazy-loaded graphics chunk. Production API integration on the local network preview passed pages/assets, consent, origin rejection, persistence, deduplication, token ownership and removal. Synthetic test registrations were removed.

No console errors were observed in the final inspected session. Current screenshots are prefixed `v4-`; earlier captures represent earlier revisions. This review does not claim physical-phone, exhaustive cross-browser, accessibility or performance certification. The 3D object is an artistic representation, and the colour slider is explicitly illustrative.

## Delivery

Keep the network preview running at http://192.168.1.2:4173 for the user's phone, with the computer on and devices on the same network. Reuse the existing owner-private Site identity for hosting; the parent publication receipt records deployment status. DESIGN.md and its sidecar were refreshed to match the implemented opening.
