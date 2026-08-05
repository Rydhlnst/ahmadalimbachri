import type { Metadata } from "next";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Buat Berita Baru - Admin CMS",
  description: "Buat berita dan artikel baru",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Buat Berita Baru</h1>
        <p className="text-muted-foreground">
          Tulis dan publikasikan berita baru
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <PostForm mode="create" />
      </div>
    </div>
  );
}
