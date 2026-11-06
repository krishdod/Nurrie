import * as schema from "./schema";

export function getDb() {
  let env: { DB?: unknown } | undefined;
  try {
    // Dynamic access so Node.js/Vercel build doesn't crash on missing Cloudflare module
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const cf = require("cloudflare:workers");
    env = cf?.env;
  } catch {
    // Running in Node.js, Vercel, or standard build environment
  }

  if (!env || !("DB" in env) || !env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. On Cloudflare Pages/Workers, ensure the D1 binding DB is configured."
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { drizzle } = require("drizzle-orm/d1");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return drizzle(env.DB as any, { schema });
}
