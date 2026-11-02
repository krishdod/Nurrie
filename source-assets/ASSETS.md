# NURRIE asset provenance

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
