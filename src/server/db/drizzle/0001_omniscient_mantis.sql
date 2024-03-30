ALTER TABLE "posts" ALTER COLUMN "lat" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "lon" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "upvotes" integer DEFAULT 0;