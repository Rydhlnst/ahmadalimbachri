import type { Metadata } from "next";
import { getPosts } from "@/lib/cms-api";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import DeletePostButton from "@/components/admin/DeletePostButton";

export const metadata: Metadata = {
  title: "Kelola Berita - Admin CMS",
  description: "Kelola berita dan artikel Panti Asuhan",
  robots: { index: false, follow: false },
};

export default async function PostsPage() {
  const { posts, total } = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Berita</h1>
          <p className="text-muted-foreground">
            {total} berita terdaftar
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Buat Berita
          </Button>
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Judul
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                  Kategori
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                  Tanggal
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-muted-foreground"
                  >
                    Belum ada berita
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/50">
                    <td className="p-4">
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        /{post.slug}
                      </p>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      {post.categoryName ? (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                          {post.categoryName}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          -
                        </span>
                      )}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {post.status === "published"
                          ? "Dipublikasi"
                          : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">
                      {format(new Date(post.createdAt), "dd MMM yyyy", {
                        locale: idLocale,
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/posts/${post.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <DeletePostButton
                          postId={post.id}
                          postTitle={post.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
