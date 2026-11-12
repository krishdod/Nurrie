# NURRIE — transformation film production brief

Status: awaiting actual application footage. The website player is implemented but stays hidden while `TRANSFORMATION_FILM` is null. No genuine product photography or application video has been supplied; current imagery is labelled as artistic views.

## The film

A 20–35 second study of one white foundation stick, one face and one uninterrupted transformation. Pearl white and rose-gold hardware; cocoa shadows and an ivory backdrop. Keep the formula visibly white in every product shot.

| Shot | Action | What the viewer needs to see |
| --- | --- | --- |
| 01 · 3 seconds | Uncap the formula, close-up | The actual white foundation bullet and NURRIE casing, in neutral light |
| 02 · 3–5 seconds | Apply to a clean area of the cheek | The white formula on real skin, starting before contact |
| 03 · as long as needed | Turn to the integrated brush and blend | A continuous take from white application through blending; preserve the real duration |
| 04 · 4 seconds | Hold on the resulting finish | Same person, camera settings, lighting, angle and exposure as the application |
| 05 · 3 seconds | Product and brush together | Show both ends of the same stick; end title: “White. Until you. NURRIE.” |

Record the entire application in one take first. Decorative close-ups can frame that take, but cannot replace it. If the process takes longer than 35 seconds, keep an uncut version and label any sped-up edit clearly. Do not use generative colour changes, beauty filters, skin smoothing, lighting swaps, undisclosed cuts during the transformation, or a different foundation. Do not imply universal tone compatibility from one model.

## Small practical shoot

- Use the production sample and the built-in brush, not a stand-in. Confirm filming consent and rights to publish.
- A phone on a tripod is enough. Record in neutral daylight or soft continuous light; lock white balance, focus and exposure. Turn off beauty filters and automatic skin retouching.
- Shoot landscape 4K, 24 or 30 fps, with the cheek and product inside the central area. Record a separate portrait take for social use. Keep original files and audio.
- Use a clean ivory background with one cocoa textile or stone surface. Avoid strong warm light that makes the white formula look beige.
- Record a clean beginning, continuous application, and a still finish. Capture 3–5 seconds before and after each action.
- Take genuine still photographs: open white bullet, brush end, closed casing, both ends in one view, and application on skin. Keep colour accurate; no simulated product results.

## Website deliverables

- A landscape 16:9 MP4 (H.264, fast-start, 1080p; target under 8 MB if detail permits).
- Optional WebM alternative, never the only format. No autoplay, no background download: the player uses `preload="none"`, native controls and `playsInline`.
- A real frame as an optimised WebP poster, target under 150 KB. Avoid a generated poster implying a result.
- English WebVTT captions for spoken words and meaningful sound; include descriptive cues if the film is silent.
- A plain-language text description of what actually happens, including any speed changes. Do not prewrite unverified results.
- Separate portrait master and original unedited footage for later crops and verification.

Place approved web assets in `public/films/` and set the typed object in `lib/transformation-film.ts`: `mp4`, optional `webm`, `poster`, `captions`, `transcript`, `durationLabel`. Use paths beginning `/films/`. Use the actual duration and observed actions. The section appears between the product introduction and the illustrative colour study only when the object exists.

## Approval and checks once footage arrives

Check the real product, white formula, truthful chronology, rights, and colour before publishing. Verify playback, seeking, captions, sound, portrait/landscape rotation, iOS inline playback and Android playback. Confirm scrolling away or hiding the tab pauses the film. A blocked/failed video must leave its description and a direct-video link available. Keep the illustration caption distinct from the real-film caption.

The code has been typechecked; actual playback cannot be certified until a real video and captions are supplied.
