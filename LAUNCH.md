# NURRIE publication handoff

NURRIE is a React/Vinext website with a Cloudflare Worker and D1 database. Its first publication preserves owner-private Sites access. Public visitor access is a separate launch setting.

## Site identity and publication

Reuse project `appgprj_6ae3bda9ec2481918c04e7886c20d597` from `.openai/hosting.json`; never create a duplicate. Owner-only access was verified on 4 November 2026. The Sites deployment record is the authority for the live URL and saved version. The origin in social metadata is the reserved site address, not an assertion of successful deployment.

Publish with the Sites source workflow: refresh the source credential, pass it through hidden stdin, commit and push this checkout, package its build, then save and deploy that exact commit and archive. Keep tokens out of files, shell arguments and logs. Preserve current owner-only access until the brand requests public sharing.

## Included

- Photography-led cocoa/ivory campaign opening with monumental NURRIE lettering and a mobile-specific copy panel.
- White colour-changing formula proposition: “Starts white. Becomes you.”
- Responsive WebP exports of the supplied image, local fonts, social metadata, favicon, sitemap and robots file.
- Textured brush-to-reveal canvas featuring the exact supplied product photograph, with keyboard-accessible reveal/reset buttons and an explicit illustration qualifier.
- Warm cocoa editorial portrait and restrained GSAP scroll motion with reduced-motion support.
- Secondary, near-viewport-loaded R3F/Three.js single stick with extruded chapter typography, horizontal dragging, rotate button, animated brush reveal, studio lighting, native-scroll chapter navigation, pause, reduced-motion handling, offscreen suspension and image fallback.
- Durable interest registration with explicit consent, bounded validated requests, duplicate protection and a honeypot.
- Private 256-bit removal links with only hashes stored in D1, and a privacy page supporting removal.

## Run locally

Use Node 22.13 or newer. Run `npm ci`, then `npm run build`. On a fresh local database apply the migration once:

```powershell
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_glorious_night_thrasher.sql
npm run start -- --port 4173
```

Do not replay already applied migrations. Sites applies hosted migrations during deployment. For editing, use `npm run dev -- --port 5173 --hostname 127.0.0.1`.

Checks:

```powershell
node node_modules/typescript/bin/tsc --noEmit
node --test tests/waitlist.test.mjs
$env:NURRIE_TEST_ORIGIN='http://127.0.0.1:4173'
node tests/waitlist.integration.mjs
```

The integration test creates disposable `example.invalid` addresses and removes its records. Use a local preview, not a live subscriber database.

For the current local-network preview, Wrangler runs on `http://192.168.1.2:4173`, bound to the private Ethernet address. The targeted Windows Firewall rule allows only this application's TCP port on the private local subnet. Keep the computer on and the phone on the same network. This address can change if DHCP assigns a different IP. The parent `nurrie-network-preview.json` records the active process; keep subscriber state in `.wrangler/state` when restarting.

## Verification

TypeScript, the production build and all eight validation tests passed. Production API integration passed on 3 November 2026 at the network preview: pages/assets, consent, origin rejection, signup persistence, duplicate protection, token ownership, removal, repeated removal and re-registration. Browser registration reached “You’re in the first chapter.” and its removal action reached “Your email has been removed from our interest list.” Synthetic records were removed.

The interactive opening was reviewed at 1280px desktop, 768px tablet, 390px phone and 375×667 small-phone sizes. Tablet object scale and mobile word/cap placement were corrected during review. Checks covered native scrolling, chapter selection, direct rotation, pause and the first-access link. Earlier keyboard slider, ritual-tab and privacy-flow checks remain in the v3 record. V4 captures document the preceding 3D-first design. Current v5 captures document the campaign opening at desktop, tablet and phone sizes, textured brush gesture, keyboard complete reveal/reset, and mobile 3D entry. One H1 and no phone horizontal overflow were verified. The v5 independent reviewer found no material hero visual correction, with a procedural finding for the missing Impeccable-specific seed record; root completed the reveal/tablet checks. Reduced-motion logic was reviewed in source; physical-phone and exhaustive cross-browser/text-zoom certification were not performed.

## Before the consumer launch

The actual supplied packaging and white adapting-formula proposition are incorporated. The 3D model is an artistic representation and the blend study is an illustration. Ingredients, tone suitability, price, availability and launch date are not invented.

The form stores consent and email; it does not send automatic or campaign email. Before sending launch campaigns, configure a brand-owned delivery service, sender/contact details and unsubscribe handling. Review business privacy terms and make site access public when ready to invite visitors.

Subscribers are in the D1 `waitlist` table. There is no public listing endpoint or admin dashboard. Use the hosting platform's authorized database tools for owner access, and keep subscriber exports outside public assets.
