import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/** Minimal pre-launch registration; never exposed by a public listing route. */
export const waitlist = sqliteTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  consentedAt: integer("consented_at").notNull(),
  removalTokenHash: text("removal_token_hash").notNull().unique(),
});
