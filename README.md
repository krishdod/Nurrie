# NURRIE

Pre-launch site for the NURRIE colour-changing foundation stick. Ivory, cocoa, and rose editorial page; Cloudflare Worker and D1 waitlist.

## Prerequisites

- Node.js `>=22.13.0`
- From this directory (`nurrie/`)

## Run locally

```powershell
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_glorious_night_thrasher.sql
npm run start -- --port 4173
```

Do not replay a migration that is already applied. For editing:

```powershell
npm run dev -- --port 5173 --hostname 127.0.0.1
```

## Checks

```powershell
node node_modules/typescript/bin/tsc --noEmit
node --test tests/waitlist.test.mjs
$env:NURRIE_TEST_ORIGIN='http://127.0.0.1:4173'
node tests/waitlist.integration.mjs
```

The integration test creates disposable `example.invalid` addresses and removes them. Use a local preview, not the live subscriber database.

## Site shape

- Edit the page under `app/` and `components/`
- Waitlist API: `app/api/waitlist/route.ts` with validation in `lib/waitlist.ts`
- D1 schema: `db/schema.ts`; migration in `drizzle/`
- Public origin for metadata, sitemap, and robots: `lib/site.ts`
- Product and design records: `PRODUCT.md`, `DESIGN.md`, `SURFACE.md`, `LAUNCH.md`

This starter also includes unused shadcn UI, ChatGPT sign-in helpers, and connector-preview scripts from the Vinext Sites template. NURRIE pages do not depend on them.

`dist/`, `.next/`, `.vinext/`, `.wrangler/`, and `.sites-runtime/` are generated. The waitlist table stores email, consent time, and a hashed removal token only; there is no public listing route.
