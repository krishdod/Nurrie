CREATE TABLE `waitlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`consented_at` integer NOT NULL,
	`removal_token_hash` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_removal_token_hash_unique` ON `waitlist` (`removal_token_hash`);