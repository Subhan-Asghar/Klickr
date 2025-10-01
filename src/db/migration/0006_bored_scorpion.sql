ALTER TABLE "click" ALTER COLUMN "time" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "click" ALTER COLUMN "time" SET DEFAULT now();