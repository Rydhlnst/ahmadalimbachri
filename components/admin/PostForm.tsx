"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";
import { Save, Send } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImageUrl: string;
    categoryId: number | null;
    status: string;
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function PostForm({ mode, initialData }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    initialData?.featuredImageUrl || ""
  );
  const [categoryId, setCategoryId] = useState<string>(
    initialData?.categoryId?.toString() || ""
  );
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    fetch("/api/admin/posts")
      .then((res) => res.json())
      .then((data) => {
        // Extract categories from the response
        if (data.categories) {
          setCategories(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  async function handleSubmit(newStatus: string) {
    if (!title.trim()) {
      toast.error("Judul harus diisi");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        excerpt: excerpt.trim(),
        content,
        featuredImageUrl: featuredImageUrl || null,
        categoryId: categoryId ? parseInt(categoryId) : null,
        status: newStatus,
        publishedAt: newStatus === "published" ? new Date().toISOString() : null,
      };

      const url =
        mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menyimpan berita");
      }

      toast.success(
        newStatus === "published"
          ? "Berita berhasil dipublikasikan"
          : "Berita berhasil disimpan sebagai draft"
      );
      router.push("/admin/posts");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Gagal menyimpan berita");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Judul</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul berita..."
          className="text-lg"
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugManual(true);
          }}
          placeholder="slug-berita"
        />
        <p className="text-xs text-muted-foreground">
          URL: /berita/{slug || "slug-berita"}
        </p>
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Label htmlFor="excerpt">Ringkasan</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Ringkasan singkat berita..."
          rows={3}
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label>Konten</Label>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      {/* Featured Image */}
      <div className="space-y-2">
        <Label>Gambar Utama</Label>
        <ImageUpload
          value={featuredImageUrl || undefined}
          onChange={setFeaturedImageUrl}
          onRemove={() => setFeaturedImageUrl("")}
        />
      </div>

      {/* Category & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Dipublikasikan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSubmit("draft")}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {loading ? "Menyimpan..." : "Simpan Draft"}
        </Button>
        <Button
          type="button"
          onClick={() => handleSubmit("published")}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          {loading ? "Menyimpan..." : "Publikasikan"}
        </Button>
      </div>
    </div>
  );
}
