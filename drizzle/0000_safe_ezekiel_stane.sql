CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contact_submissions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) DEFAULT '',
	"subject" varchar(500) DEFAULT '',
	"message" text NOT NULL,
	"status" varchar(20) DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "faqs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"question" varchar(1000) NOT NULL,
	"answer" text NOT NULL,
	"order" integer DEFAULT 0,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "media_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"alt" varchar(500) DEFAULT '',
	"caption" varchar(500) DEFAULT '',
	"category" varchar(255) DEFAULT '',
	"image_url" varchar(1000) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(500) NOT NULL,
	"slug" varchar(500) NOT NULL,
	"excerpt" text,
	"content" text,
	"featured_image_url" varchar(1000),
	"category_id" integer,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"site_name" varchar(255) DEFAULT '',
	"site_description" text DEFAULT '',
	"phone" varchar(50) DEFAULT '',
	"email" varchar(255) DEFAULT '',
	"address" text DEFAULT '',
	"whatsapp" varchar(50) DEFAULT '',
	"donation_info" text DEFAULT '',
	"bank_name" varchar(255) DEFAULT '',
	"bank_account_number" varchar(100) DEFAULT '',
	"bank_account_name" varchar(255) DEFAULT '',
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testimonials_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT '',
	"content" text NOT NULL,
	"photo_url" varchar(1000) DEFAULT '',
	"featured" boolean DEFAULT false,
	"order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;