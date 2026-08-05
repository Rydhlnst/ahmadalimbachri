import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const posts = pgTable("posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const media = pgTable("media", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  alt: varchar("alt", { length: 500 }).default(""),
  caption: varchar("caption", { length: 500 }).default(""),
  category: varchar("category", { length: 255 }).default(""),
  imageUrl: varchar("image_url", { length: 1000 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  siteName: varchar("site_name", { length: 255 }).default(""),
  siteDescription: text("site_description").default(""),
  phone: varchar("phone", { length: 50 }).default(""),
  email: varchar("email", { length: 255 }).default(""),
  address: text("address").default(""),
  whatsapp: varchar("whatsapp", { length: 50 }).default(""),
  donationInfo: text("donation_info").default(""),
  bankName: varchar("bank_name", { length: 255 }).default(""),
  bankAccountNumber: varchar("bank_account_number", { length: 100 }).default(""),
  bankAccountName: varchar("bank_account_name", { length: 255 }).default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const faqs = pgTable("faqs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  question: varchar("question", { length: 1000 }).notNull(),
  answer: text("answer").notNull(),
  order: integer("order").default(0),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).default(""),
  content: text("content").notNull(),
  photoUrl: varchar("photo_url", { length: 1000 }).default(""),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).default(""),
  subject: varchar("subject", { length: 500 }).default(""),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Category = typeof categories.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Media = typeof media.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
