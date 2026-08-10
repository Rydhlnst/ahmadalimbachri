import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/cms-api";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Berita Tidak Ditemukan" };
  }

  return {
    title: `${post.title} - Prof. Dr. Ahmad Alim Bachri`,
    description: post.excerpt || post.title,
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const { posts: relatedPosts } = await getPosts({
    status: "published",
    categoryId: post.categoryId || undefined,
    limit: 3,
  });
  const filteredRelated = relatedPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-6"
          >
            ← Kembali ke Berita
          </Link>

          {/* Category */}
          {post.categoryName && (
            <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-white/80 mb-4">
              {post.categoryName}
            </span>
          )}

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="font-mono">
              {format(new Date(post.createdAt), "dd MMMM yyyy", {
                locale: idLocale,
              })}
            </span>
            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <span className="font-mono">
                Diperbarui:{" "}
                {format(new Date(post.updatedAt), "dd MMMM yyyy", {
                  locale: idLocale,
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        {/* Featured image */}
        {post.featuredImageUrl && (
          <div className="mb-10 border border-neutral-200">
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <div className="mb-8 pb-8 border-b border-neutral-200">
            <p className="text-lg text-neutral-600 leading-relaxed italic">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Article content */}
        <div
          className="prose prose-neutral max-w-none
            prose-headings:font-heading prose-headings:text-navy
            prose-p:text-neutral-600 prose-p:leading-relaxed
            prose-a:text-navy prose-a:underline prose-a:decoration-gold/50
            prose-strong:text-navy
            prose-img:border prose-img:border-neutral-200"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {/* Related posts */}
        {filteredRelated.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-200">
            <h2 className="font-heading text-xl font-bold text-navy mb-6">
              Berita Terkait
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredRelated.map((related) => (
                <Link
                  key={related.id}
                  href={`/berita/${related.slug}`}
                  className="group"
                >
                  <article className="border border-neutral-200 hover:border-navy/20 transition-colors">
                    {related.featuredImageUrl ? (
                      <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
                        <img
                          src={related.featuredImageUrl}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center">
                        <span className="text-white/20 text-3xl font-heading font-bold">
                          {related.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-heading text-sm font-bold text-navy leading-snug group-hover:text-gold transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <span className="text-[11px] text-neutral-400 font-mono mt-2 block">
                        {format(new Date(related.createdAt), "dd MMM yyyy", {
                          locale: idLocale,
                        })}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
