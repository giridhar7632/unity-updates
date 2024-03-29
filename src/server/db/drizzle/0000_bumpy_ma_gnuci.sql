CREATE TABLE IF NOT EXISTS "unity-updates_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"lat" numeric NOT NULL,
	"lon" numeric NOT NULL,
	"name" varchar(256),
	"number" text NOT NULL,
	"category" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "unity-updates_post" ("name");