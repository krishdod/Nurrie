# NURRIE publication handoff

NURRIE is a React/Vinext website with a Cloudflare Worker and D1 database. Its first publication preserves owner-private Sites access. Public visitor access is a separate launch setting.

## Site identity and publication

Reuse project `appgprj_6ae3bda9ec2481918c04e7886c20d597` from `.openai/hosting.json`; never create a duplicate. Project access was verified on 2 November 2026. The Sites deployment record is the authority for the live URL and saved version. The origin in social metadata is the reserved site address, not an assertion of successful deployment.

Publish with the Sites source workflow: refresh the source credential, pass it through hidden stdin, commit and push this checkout, package its build, then save and deploy that exact commit and archive. Keep tokens out of files, shell arguments and logs. Preserve current owner-only access until the brand requests public sharing.

## Included

- Monumental editorial homepage in the restored ivory, cocoa and rose-gold palette, centred on the supplied double-ended product.
- White colour-changing formula proposition: “Starts white. Becomes you.”
- Responsive WebP exports of the supplied image, local fonts, social metadata, favicon, sitemap and robots file.
- Accessible blend slider using a transparent photographic cream study and SVG colour matrix, clearly identified as illustrative rather than a shade match or product result.
- Warm cocoa editorial portrait, letter-by-letter masthead entrance, and restrained GSAP scroll motion with reduced-motion support.
- Lazy-loaded R3F/Three.js product views and extruded typography, procedural studio lighting, pointer and section-relative scroll response, pause, reduced-motion handling, offscreen suspension and image fallback.
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

## Verification

TypeScript, the production build and all eight validation tests passed. Production API integration passed on 3 November 2026: pages/assets, consent, origin rejection, signup persistence, duplicate protection, token ownership, removal, repeated removal and re-registration. Synthetic records were removed.

The restored palette was reviewed at 1440px desktop, 768px tablet and 390px phone widths. The tablet hero was corrected to separate text and product photography. Browser checks covered the keyboard blend slider and reset, keyboard ritual tabs, signup success and removal. Scene pause was checked during the preceding layout review; its behavior is unchanged by the palette update. No console errors were observed. Current evidence is prefixed `v3-` in `.impeccable/review/`; older captures document superseded designs. The finishing review was performed inline because the independent agent was unavailable. This is not exhaustive cross-browser, physical-device or text-zoom certification.

## Before the consumer launch

The actual supplied packaging and white adapting-formula proposition are incorporated. The 3D model is an artistic representation and the blend study is an illustration. Ingredients, tone suitability, price, availability and launch date are not invented.

The form stores consent and email; it does not send automatic or campaign email. Before sending launch campaigns, configure a brand-owned delivery service, sender/contact details and unsubscribe handling. Review business privacy terms and make site access public when ready to invite visitors.

Subscribers are in the D1 `waitlist` table. There is no public listing endpoint or admin dashboard. Use the hosting platform's authorized database tools for owner access, and keep subscriber exports outside public assets.
