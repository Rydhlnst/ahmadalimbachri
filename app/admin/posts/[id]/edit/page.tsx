import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/cms-api";

export const dynamic = "force-dynamic";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Edit Berita - Admin CMS",
  description: "Edit berita dan artikel",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Berita</h1>
        <p className="text-muted-foreground">
          Mengedit: {post.title}
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <PostForm
          mode="edit"
          initialData={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            content: post.content || "",
            featuredImageUrl: post.featuredImageUrl || "",
            categoryId: post.categoryId,
            status: post.status,
          }}
        />
      </div>
    </div>
  );
}
