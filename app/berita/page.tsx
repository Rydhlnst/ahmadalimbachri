import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getCategories } from "@/lib/cms-api";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export const metadata: Metadata = {
  title: "Berita & Artikel - Prof. Dr. Ahmad Alim Bachri",
  description:
    "Berita terbaru, artikel, dan publikasi dari Prof. Dr. Ahmad, S.E., M.Si. - Rektor Universitas Lambung Mangkurat",
};

export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  const [{ posts, total }, categories] = await Promise.all([
    getPosts({ status: "published" }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-6"
          >
            ← Kembali ke Profil
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Berita & Artikel
          </h1>
          <p className="text-white/60 max-w-xl">
            Informasi terbaru, artikel, dan publikasi dari Prof. Dr. Ahmad, S.E.,
            M.Si.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        {/* Category filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-navy text-white">
              Semua
            </span>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider bg-neutral-100 text-neutral-500"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">Belum ada berita</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/berita/${post.slug}`}
                className="group"
              >
                <article className="border border-neutral-200 hover:border-navy/20 transition-colors">
                  {/* Featured image */}
                  {post.featuredImageUrl ? (
                    <div className="aspect-[16/10] bg-neutral-100 overflow-hidden">
                      <img
                        src={post.featuredImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder variant="initial" text={post.title} aspect="video" />
                  )}

                  <div className="p-5 md:p-6">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-3">
                      {post.categoryName && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-navy/5 text-navy">
                          {post.categoryName}
                        </span>
                      )}
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {format(new Date(post.createdAt), "dd MMM yyyy", {
                          locale: idLocale,
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-heading text-lg font-bold text-navy leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read more */}
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-navy/60 group-hover:text-gold transition-colors">
                        Baca Selengkapnya →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
