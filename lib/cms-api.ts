import { db } from "@/db";
import {
  categories,
  posts,
  media,
  siteSettings,
  faqs,
  testimonials,
  contactSubmissions,
  type Category,
  type Post,
  type Media,
  type SiteSettings,
  type Faq,
  type Testimonial,
  type ContactSubmission,
} from "@/db/schema";
import { eq, desc, count, ilike, sql, and, asc } from "drizzle-orm";

// ─── Categories ──────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return db.select().from(categories).orderBy(asc(categories.name));
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  return result[0];
}

export async function createCategory(data: {
  name: string;
  slug: string;
}): Promise<Category> {
  const result = await db.insert(categories).values(data).returning();
  return result[0];
}

export async function deleteCategory(id: number) {
  await db.delete(categories).where(eq(categories.id, id));
}

// ─── Posts ───────────────────────────────────────────────

export async function getPosts(options?: {
  status?: string;
  categoryId?: number;
  limit?: number;
  offset?: number;
}): Promise<{ posts: (Post & { categoryName: string | null })[]; total: number }> {
  const conditions = [];
  if (options?.status) conditions.push(eq(posts.status, options.status));
  if (options?.categoryId)
    conditions.push(eq(posts.categoryId, options.categoryId));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ total }] = await db
    .select({ total: count() })
    .from(posts)
    .where(where);

  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      featuredImageUrl: posts.featuredImageUrl,
      categoryId: posts.categoryId,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(where)
    .orderBy(desc(posts.createdAt))
    .limit(options?.limit || 50)
    .offset(options?.offset || 0);

  return { posts: result, total };
}

export async function getPostBySlug(
  slug: string
): Promise<(Post & { categoryName: string | null }) | undefined> {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      featuredImageUrl: posts.featuredImageUrl,
      categoryId: posts.categoryId,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.slug, slug))
    .limit(1);
  return result[0];
}

export async function getPostById(
  id: number
): Promise<(Post & { categoryName: string | null }) | undefined> {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      featuredImageUrl: posts.featuredImageUrl,
      categoryId: posts.categoryId,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.id, id))
    .limit(1);
  return result[0];
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  featuredImageUrl?: string | null;
  categoryId?: number | null;
  status: string;
  publishedAt?: Date | null;
}): Promise<Post> {
  const result = await db.insert(posts).values(data).returning();
  return result[0];
}

export async function updatePost(
  id: number,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    featuredImageUrl?: string;
    categoryId?: number;
    status?: string;
    publishedAt?: Date;
    updatedAt?: Date;
  }
): Promise<Post> {
  const result = await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return result[0];
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
}

// ─── Media ───────────────────────────────────────────────

export async function getMedia(options?: {
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<{ media: Media[]; total: number }> {
  const conditions = [];
  if (options?.category)
    conditions.push(eq(media.category, options.category));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ total }] = await db
    .select({ total: count() })
    .from(media)
    .where(where);

  const result = await db
    .select()
    .from(media)
    .where(where)
    .orderBy(desc(media.createdAt))
    .limit(options?.limit || 50)
    .offset(options?.offset || 0);

  return { media: result, total };
}

export async function createMedia(data: {
  alt?: string;
  caption?: string;
  category?: string;
  imageUrl: string;
}): Promise<Media> {
  const result = await db.insert(media).values(data).returning();
  return result[0];
}

export async function deleteMedia(id: number) {
  await db.delete(media).where(eq(media.id, id));
}

// ─── Site Settings ───────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | undefined> {
  const result = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, 1))
    .limit(1);
  return result[0];
}

export async function upsertSiteSettings(data: {
  siteName?: string;
  siteDescription?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  donationInfo?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
}): Promise<SiteSettings> {
  const existing = await getSiteSettings();

  if (existing) {
    const result = await db
      .update(siteSettings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(siteSettings.id, 1))
      .returning();
    return result[0];
  }

  const result = await db
    .insert(siteSettings)
    .values({ id: 1, ...data })
    .returning();
  return result[0];
}

// ─── FAQs ────────────────────────────────────────────────

export async function getFaqs(): Promise<Faq[]> {
  return db.select().from(faqs).orderBy(asc(faqs.order));
}

export async function createFaq(data: {
  question: string;
  answer: string;
  order?: number;
  status?: string;
}): Promise<Faq> {
  const result = await db.insert(faqs).values(data).returning();
  return result[0];
}

export async function deleteFaq(id: number) {
  await db.delete(faqs).where(eq(faqs.id, id));
}

// ─── Testimonials ────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return db.select().from(testimonials).orderBy(asc(testimonials.order));
}

export async function createTestimonial(data: {
  name: string;
  role?: string;
  content: string;
  photoUrl?: string;
  featured?: boolean;
  order?: number;
}): Promise<Testimonial> {
  const result = await db.insert(testimonials).values(data).returning();
  return result[0];
}

export async function deleteTestimonial(id: number) {
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ─── Contact Submissions ─────────────────────────────────

export async function getContactSubmissions(options?: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<{ submissions: ContactSubmission[]; total: number }> {
  const conditions = [];
  if (options?.status)
    conditions.push(eq(contactSubmissions.status, options.status));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ total }] = await db
    .select({ total: count() })
    .from(contactSubmissions)
    .where(where);

  const result = await db
    .select()
    .from(contactSubmissions)
    .where(where)
    .orderBy(desc(contactSubmissions.createdAt))
    .limit(options?.limit || 50)
    .offset(options?.offset || 0);

  return { submissions: result, total };
}

export async function updateContactSubmissionStatus(
  id: number,
  status: string
) {
  await db
    .update(contactSubmissions)
    .set({ status })
    .where(eq(contactSubmissions.id, id));
}

// ─── Stats ───────────────────────────────────────────────

export async function getDashboardStats() {
  const [postCount] = await db.select({ total: count() }).from(posts);
  const [mediaCount] = await db.select({ total: count() }).from(media);
  const [newMessageCount] = await db
    .select({ total: count() })
    .from(contactSubmissions)
    .where(eq(contactSubmissions.status, "new"));
  const [publishedPostCount] = await db
    .select({ total: count() })
    .from(posts)
    .where(eq(posts.status, "published"));

  return {
    totalPosts: postCount.total,
    totalMedia: mediaCount.total,
    newMessages: newMessageCount.total,
    publishedPosts: publishedPostCount.total,
  };
}

export async function getRecentPosts(limit = 5) {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.status,
      createdAt: posts.createdAt,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .orderBy(desc(posts.createdAt))
    .limit(limit);
}
