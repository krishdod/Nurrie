# NURRIE asset provenance

## Current shipping product — v7, 5 November 2026

The user approved a neutral-white correction after finding the warm-lit product too beige. Every active product view now uses product-white-v7 or product-campaign-v7 assets through lib/product.ts. These are generated edits based on the supplied design, not unmodified original photographs. Full exact prompts, original tool outputs, saved masters and conversion settings are recorded in [v7-white-first.md](v7-white-first.md).

The historical product-duo PNG/WebPs below are retained in source-assets/superseded-product-v6, outside public delivery. The untouched original is also retained as source-assets/product-duo-original.png. The v5 cocoa portrait remains the alternate hero and Be ritual view. The v3 teal portrait below is historical and is not mounted.

## Authoritative user-supplied product assets

The user supplied the actual NURRIE double-ended foundation duo and brand board after reviewing the initial concept. These supersede the generated cocoa packaging and campaign imagery below.

- `public/images/product-duo.png`: exact, unmodified copy of `C:/Users/admin/Downloads/Nurrie double-ended foundation duo.png`, 1536 × 1024 pixels, 1,828,347 bytes. Retained as the original shipping product image and fallback.
- `source-assets/product-duo-original.png`: a second exact copy retained with the source assets.
- `source-assets/brand-board.jpeg`: exact, unmodified copy of `C:/Users/admin/Downloads/WhatsApp Image 2026-10-30 at 1.43.06 AM.jpeg`, 178,770 bytes; authoritative brand reference.

No cropping, creative editing, recompression, or metadata changes were performed on the supplied assets. Source and destination SHA-256 hashes were verified to match. The user confirmed that the product has a white bullet and changes color to match skin tone; this provenance record does not add independent performance or clinical claims.

### Responsive product derivatives

Created on 2026-10-31 from the authoritative `public/images/product-duo.png` with sharp 0.35.4 / libvips 8.18.6. The exports preserve the entire composition and its aspect ratio, with no cropping, creative edits, retouching, or color adjustment. Smaller versions use proportional resizing; all use WebP `quality: 90, effort: 6` and `withoutEnlargement: true`. WebP is a lossy delivery format, so the derivatives are visually faithful rather than pixel-identical to the supplied PNG.

| Shipping derivative | Dimensions | Bytes | Reduction from source PNG |
| --- | --- | ---: | ---: |
| `public/images/product-duo-640.webp` | 640 × 427 | 33,724 | 98.2% |
| `public/images/product-duo-1024.webp` | 1024 × 683 | 62,960 | 96.6% |
| `public/images/product-duo-1536.webp` | 1536 × 1024 | 112,562 | 93.8% |

All derivatives were decoded successfully and checked for their expected dimensions. The full-size and smallest exports were visually checked against the supplied original. The original PNG and source copy remain unchanged; the original's SHA-256 after export is `26d0ea505137b761cdf022944b8bcb7a3a2d3b28aa3b4b40f7883e97fd3535fe`.

## Generated editorial portrait — superseded teal direction

Created on 2026-11-03 with the built-in OpenAI `image_gen.imagegen` tool, using no reference images and `transparent_background: false`. This is generated editorial atmosphere for the user's new ivory `#f3eee8`, deep teal `#17645f`, and coral `#ff5845` direction. The adult portrait is not a customer, testimonial, product-use demonstration, or evidence of product performance. The authoritative supplied product image remains the product/hero reference. No packaging, product, lettering, or performance claims are depicted in the portrait.

| Asset | Dimensions | Bytes | Purpose |
| --- | --- | ---: | --- |
| `source-assets/editorial-portrait-original.png` | 1122 × 1402 | 2,224,332 | Exact generated original retained outside public assets |
| `public/images/editorial-portrait.webp` | 1122 × 1402 | 153,642 | Full-size shipping derivative |
| `public/images/editorial-portrait-640.webp` | 640 × 800 | 64,928 | Responsive shipping derivative |

WebP exports use sharp 0.35.4, `keepMetadata()`, and `webp({quality: 88, effort: 6})`. The smaller derivative uses proportional resize with `width: 640, withoutEnlargement: true`. No cropping, retouching, color edits, or creative alterations were applied. WebP exports are visually faithful lossy delivery derivatives, not pixel-identical copies. Generated composition was visually inspected for clean facial anatomy, natural texture, requested palette, and absence of products or text.

Exact generation prompt:

> Use case: ads-marketing. Asset type: supporting editorial portrait for the NURRIE luxury cosmetics website. Create a photorealistic vertical 4:5 image with the art direction of an independent high-fashion beauty magazine. An adult South Asian woman with medium-brown skin, dark brown eyes, sculptural cheekbones and natural expressive lips, dark hair swept back, in an intimate close-up three-quarter portrait from shoulders up. Her thoughtful, quietly confident gaze is toward the camera, relaxed lips, no smile. Natural dewy skin with fine visible pores and subtle human irregularities; warm sunlit luminosity along cheekbone and jaw, no plastic skin smoothing. Head on the right two-thirds with breathing room above and a sculptural negative-space shape on the left. A single luminous ivory silk drape, approximate color #f3eee8, curves from the lower left across her shoulder, one airy translucent edge catching the light; it must not obscure her eyes, nose or lips. A deep rich teal seamless backdrop, approximate color #17645f, with luxurious softly graduated studio shadows; the teal is clearly visible as a deliberate contrasting field. Tiny restrained coral #ff5845 highlight may appear on the fabric's reflected edge, but no coral makeup or obvious bright prop. Sculptural warm studio sidelight from upper left, delicate rim highlights, analogue medium-format beauty photography, fine subtle film grain, tactile tonal depth, intimate and arresting fashion composition, sophisticated natural makeup. Palette is ivory, deep teal, warm luminous brown skin, and the smallest trace of coral. No product, tube, packaging, logos, lettering, text, watermark, claims, before-and-after comparison or extra people. Hands outside frame. Clean readable face. This is editorial atmosphere, not evidence of product performance.

## Generated cream swipe — transparent material study

Created on 2026-11-03 with the built-in OpenAI `image_gen.imagegen` tool, using no reference images and `transparent_background: true`. This is a generated cosmetic-material illustration for the interactive tint study, not a photograph of the actual NURRIE formula or proof of its performance. The user-supplied product image was not altered.

- `source-assets/cream-swipe-original.png`: original generated RGBA image, 1422 × 1106 pixels, 1,088,196 bytes.
- `source-assets/cream-swipe-cleaned.png`: generated edge-cleanup revision, 1422 × 1106 pixels, 1,069,623 bytes; source of the shipping derivative.
- `public/images/cream-swipe.webp`: transparent shipping derivative, 900 × 700 pixels, 75,768 bytes.
- `source-assets/cream-swipe-alpha-check.png`: QA composite against the brand teal, for inspecting transparency only; not a shipping asset.

The shipping export uses sharp 0.35.4 with proportional resize to width 900, `withoutEnlargement: true`, `keepMetadata()`, and `webp({quality: 94, alphaQuality: 100, effort: 6})`. No background was added to the shipping asset. Alpha validation confirms four channels, transparent pixels, and fully transparent corners; the swatch retains its feathered material edges. A flattened teal QA composite verifies clean actual compositing, since direct transparent-image previews can display meaningless RGB values from zero-alpha pixels. The composition was visually checked for a single textured white diagonal swipe, with no product, skin, text, or backdrop.

Exact generation prompt:

> Use case: product-mockup. Asset type: transparent macro material photograph for a premium cosmetic website interactive color-blending study. A single isolated swatch of pure ivory-white cosmetic foundation cream, thick and velvety, spread in an elongated organic diagonal sweep from lower left toward upper right. Landscape composition approximately 9:7, the swipe fills 80 percent of the frame with generous transparent padding all around. Photorealistic high-end macro studio photography: delicate fine parallel brush ridges along the length, subtle irregular organic edges, a rounded thicker dollop at the lower-left origin tapering elegantly to fine feathered brush strokes at the upper right, rich sculptural relief, a few natural grooves, creamy bright highlights and soft light-gray internal shading, white material clearly modeled by soft directional studio light. The swatch has a tactile opaque core and only delicate semitransparent feathering at the outermost edges. It should remain white/neutral enough to be tinted beige in a live web effect without losing texture. Completely transparent background with genuine alpha, isolated cream only. No floor, no plate, no paper, no backdrop, no skin, no brush or tool, no product, no packaging, no typography or logo, no watermarks, no second swatch, no cast shadow outside the material, no checkerboard baked into the image, no colored light, no yellow color cast. Detailed real cream material, never an illustration or plastic 3D icon.

An imagegen editing pass used the original generated PNG as its edit target with `transparent_background: true`. Exact cleanup prompt:

> Use case: precise-object-edit. Edit only the transparency boundary of the supplied isolated white cosmetic cream swipe. Preserve the single diagonal white cream shape, all internal fine brush ridges, its rounded thick lower-left origin and feathered upper-right tip, its neutral white color, studio highlights, composition, and dimensions. Clean all stray colored specks, yellow or red pixels, white square or checker-shaped artifacts, and ragged blocky cutout artifacts around the outer edge. The silhouette must be a clean naturally irregular cream edge with delicate realistic brush feathering at the top-right tip and a smooth rounded lower-left edge. Everything outside the cream must be fully transparent genuine alpha; no background, no cast shadow, no new content. The cream center stays opaque. Do not change the subject into a flat graphic. Keep all photoreal macro material texture intact.

## Superseded concept imagery — not shipping

The following cocoa-packaging assets were rejected in favor of the user's supplied actual product. They are retained only as source history and must not be used in the published site.

## Files

- `source-assets/campaign.png`: original generated image, 1536 × 1024 pixels; retained outside the public asset directory.
- `source-assets/rejected-campaign.webp`: superseded derivative, 1536 × 1024 pixels, moved out of public assets.

## Creation

Generated with the built-in OpenAI `image_gen.imagegen` tool on 2026-10-30, using no reference images and `transparent_background: false`. This is an AI-generated NURRIE concept campaign image, not a photograph of a manufactured product or a customer endorsement.

Exact original generation prompt:

> Use case: ads-marketing. Asset type: luxury cosmetics website editorial campaign photograph. Create an exceptional landscape 3:2 image, photorealistic analog beauty editorial. Warm eggshell studio backdrop. A sculptural close-up of an adult brown-skinned female model's face and neck filling the right two-thirds, eyes closed, profile turned slightly toward camera, bare shoulder edge visible, natural pores and tiny skin texture, serene expression. In the left foreground, held near her cheek by a natural hand with anatomically correct fingers entering from below, a short chunky chocolate-brown cylindrical foundation-stick tube with warm medium-beige rounded bullet extended. The tube has only the small ivory uppercase word 'NURRIE' in clean elegant lettering, no other text. The object feels like weighty polished brown lacquer. Cinematic warm studio side light from upper left and rich terracotta shadow, modern editorial framing cropped closely, very slight 35mm film grain, premium art-directed imperfect beauty. Palette ivory, warm caramel skin, espresso brown, deep soft shadow. Make the model's face and the cosmetic product both recognizable and elegantly composed with the product separated from the face by a small gap. No graphics, no text overlays, no watermark, no extra cosmetic objects, no artificial plastic skin.

## Web preparation

Python 3.12 with Pillow exported the original PNG to WebP using `format='WEBP', quality=88, method=6`. No cropping, resizing, retouching, or creative modification was performed. The original PNG was 2,346,053 bytes; the WebP before metadata was 171,004 bytes.

The rejected WebP includes an XMP packet with the exact prompt, creation date, OpenAI image generation attribution, AI-generated source classification, and compression settings. XMP was added by RIFF container muxing, preserving the compressed VP8 image payload byte-for-byte. Pillow verified matching dimensions and decoded pixels before and after metadata insertion; no second image recompression was performed.

## Editorial portrait — cocoa revision, 3 November 2026
User rejected the teal/coral palette and requested original ivory/cocoa/rose-gold. Built-in imagegen edited the existing generated portrait, preserving adult subject, pose, natural skin, ivory silk, and framing; background changed to warm cocoa #34231c with subtle rose-gold bounce, removing teal/green. Original: editorial-portrait-cocoa-original.png. Production: public/images/editorial-portrait-cocoa.webp and -640.webp, quality88 effort6, widths1122 and640. Generated editorial imagery; not a customer, testimonial, clinical or product-result photograph. Prior teal derivatives are superseded.
