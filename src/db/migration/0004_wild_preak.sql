CREATE TABLE "click" (
	"id" serial PRIMARY KEY NOT NULL,
	"link_id" text NOT NULL,
	"ip" text NOT NULL,
	"country" text NOT NULL,
	"lat" text NOT NULL,
	"lon" text NOT NULL,
	"time" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "click" ADD CONSTRAINT "click_link_id_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE no action ON UPDATE no action;