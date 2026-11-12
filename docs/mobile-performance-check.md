# Mobile performance and publication check — 13 November 2026

## Changes

- Phones, coarse-pointer devices and data-saving visits start with a responsive image of the white foundation and built-in brush. The 3D bundle is fetched only after Explore in 3D. Reduced-motion visits also start with the still view. Desktop visits start the scene after the first paint.
- The phone scene caps DPR at 1, halves the principal radial geometry, uses a 128px environment, and omits the extra contact-shadow rendering passes. Brush lines go from 2,800 × 5 segments (14,000) to 900 × 3 (2,700), an 81% reduction in generated brush line segments. These are geometry counts, not a claimed FPS improvement.
- Dragging updates a rotation ref and invalidates the canvas; it no longer rerenders the React cover on every pointer event.
- Paused cap and macro controls invalidate two frames so the model and its dependent parts update. Off-screen/hidden rendering remains suspended.
- Smaller responsive images and a larger mobile product view preserve the white formula and both ends of the stick.

## Observed browser samples

Production Next.js preview on the same LAN; desktop in-app Chromium browser with a 390 × 844 viewport, DPR 1. No network or CPU throttling. Same browser profile, with assets potentially cached. This is not an Android hardware test or a cold-load benchmark. Measurements include the opt-in diagnostics panel.

| Metric | Before | After, before requesting 3D |
| --- | ---: | ---: |
| Encoded JavaScript bodies loaded | 447 KiB | 191 KiB |
| LCP for the observed load | 440 ms | 284 ms |
| Layout shift sum (not windowed CLS) | 0.002 | 0.002 |
| Long-task excess over 50 ms, observed interval | 57 ms | 27 ms |
| 10-second RAF sample | 60 fps, 0 frames >50 ms | 60 fps, 0 frames >50 ms |

The first-load JavaScript reading fell about 57%. This demonstrates deferring the 3D payload, not removing it: requesting 3D loads approximately the original total. The single timing samples do not establish field Core Web Vitals or speed on ordinary Android phones. The frame sample measures browser callback cadence, not GPU render time or INP. Baseline renderer statistics were excluded because the initial probe read a shadow pass; the corrected probe reads after rendering the main scene.

## Reproduce on an Android phone

1. Open `http://192.168.1.2:4173/?check=performance` on the same Wi-Fi, or add `?check=performance` to the published domain after deployment.
2. Keep the tab in the foreground. Note phone model, browser, Wi-Fi/mobile data, battery saver, device heat and whether the page was reloaded/cached.
3. With the hero visible, note the initial JavaScript and LCP readings. Tap Measure 10 seconds, then use the page normally. Save the FPS/slow-frame result.
4. Collapse the diagnostic panel, select Explore in 3D, then reopen the panel and measure again while turning and uncapping the stick. Collapse it again to check the slider and normal page scrolling.
5. Repeat three times; also check a fresh load on mobile data and a low-end Android device. Report individual results and the median; do not compare unmatched conditions as a speed improvement.

The panel runs locally, sends no measurements, and is loaded only with the query flag. A sample is cancelled when the tab is hidden. Event timing is labelled as an observed event duration, not INP. Physical Android results are pending; no connected Android device was available.

## Validation and remaining publication inputs

- Next.js production build and TypeScript passed.
- All 11 waitlist regression tests passed.
- Targeted lint for the new components and home page has no errors; existing native-image warnings remain (these images use pre-optimised WebP assets).
- Responsive first-view checks at 320 × 568 and 390 × 844: no horizontal overflow; product and introduction visible.
- 3D opt-in, white bullet, brush reveal and paused macro controls checked in-browser. Native product-detail disclosures open and expose the pending supplier information.
- Film markup remains absent while the asset configuration is null. Real playback, captions and actual-device video checks are pending the footage.
- Supplier-confirmed ingredients, tone suitability, final directions, genuine product photographs and application footage remain to be supplied. The film brief is in `docs/transformation-film-brief.md`.
- Existing Vercel waitlist storage is not configured. It must be connected and tested before registrations can be accepted; the API returns an honest unavailable response instead of claiming to save an email.

## Follow-up to the phone report

The user identified a Nothing Phone (2) and reported performance as “low,” without numerical FPS or timing data. In response, phone 3D now renders on demand: gestures and chapter changes schedule frames only until damping settles; the idle float and pointer parallax are omitted on phones. A Return to product image control unmounts the canvas entirely. Rotation, uncapping and return-to-image were checked in the desktop browser at phone dimensions; the final return state contained zero canvas elements and the Explore in 3D button was enabled again. A physical-device retest of this final update is still pending. Do not interpret the earlier desktop 60 fps sample as a result from this phone.

Desktop 1440 × 900: no horizontal overflow; the product-information disclosure was opened with Enter and displayed the pending tone-suitability text. No new browser errors appeared in the check. The previous GSAP missing-target warning was resolved by targeting the existing ritual image.
