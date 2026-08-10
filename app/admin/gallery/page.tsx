"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, ZoomIn, ImageIcon, Pencil } from "lucide-react";

interface MediaItem {
  id: number;
  alt: string;
  caption: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

const GALLERY_CATEGORIES = [
  "Kegiatan",
  "Fasilitas",
  "Anak Asuh",
  "Donasi",
  "Lainnya",
];

export default function GalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const [imageUrl, setImageUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Lainnya");

  const [editAlt, setEditAlt] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editCategory, setEditCategory] = useState("Lainnya");
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchMedia = useCallback(async () => {
    try {
      const url =
        filterCategory !== "all"
          ? `/api/admin/gallery?category=${filterCategory}`
          : "/api/admin/gallery";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setMedia(data.media || []);
    } catch {
      toast.error("Gagal memuat galeri");
    } finally {
      setLoading(false);
    }
  }, [filterCategory]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  async function handleSaveMedia() {
    if (!imageUrl) {
      toast.error("Upload gambar terlebih dahulu");
      return;
    }

    setUploading(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, alt, caption, category }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan media");

      toast.success("Gambar berhasil ditambahkan");
      setShowUpload(false);
      setImageUrl("");
      setAlt("");
      setCaption("");
      setCategory("Lainnya");
      fetchMedia();
    } catch {
      toast.error("Gagal menyimpan media");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus media");

      toast.success("Gambar berhasil dihapus");
      setPreviewItem(null);
      fetchMedia();
    } catch {
      toast.error("Gagal menghapus media");
    }
  }

  function openEditDialog(item: MediaItem) {
    setEditItem(item);
    setEditAlt(item.alt || "");
    setEditCaption(item.caption || "");
    setEditCategory(item.category || "Lainnya");
    setPreviewItem(null);
  }

  async function handleSaveEdit() {
    if (!editItem) return;

    setSavingEdit(true);
    try {
      const res = await fetch(`/api/admin/gallery?id=${editItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alt: editAlt,
          caption: editCaption,
          category: editCategory,
        }),
      });

      if (!res.ok) throw new Error("Gagal memperbarui media");

      toast.success("Gambar berhasil diperbarui");
      setEditItem(null);
      fetchMedia();
    } catch {
      toast.error("Gagal memperbarui media");
    } finally {
      setSavingEdit(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Galeri</h1>
          <p className="text-muted-foreground">
            {media.length} gambar terdaftar
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {GALLERY_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Tambah Gambar
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-muted rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : media.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Belum ada gambar di galeri
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-card border border-border rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setPreviewItem(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">
                  {item.alt || item.caption || "Gambar"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Tambah Gambar ke Galeri</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
              onRemove={() => setImageUrl("")}
            />

            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Deskripsi singkat gambar (untuk aksesibilitas)"
              />
            </div>

            <div className="space-y-2">
              <Label>Caption</Label>
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Keterangan gambar (opsional)"
              />
            </div>

            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GALLERY_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowUpload(false)}
                disabled={uploading}
              >
                Batal
              </Button>
              <Button onClick={handleSaveMedia} disabled={uploading}>
                {uploading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog
        open={!!previewItem}
        onOpenChange={(open) => !open && setPreviewItem(null)}
      >
        <DialogContent className="max-w-3xl">
          {previewItem && (
            <>
              <DialogHeader>
                <DialogTitle>{previewItem.alt || "Gambar"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={previewItem.imageUrl}
                  alt={previewItem.alt}
                  className="w-full rounded-lg"
                />
                {previewItem.caption && (
                  <p className="text-muted-foreground text-sm">
                    {previewItem.caption}
                  </p>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Kategori: {previewItem.category || "-"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => openEditDialog(previewItem)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Hapus
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Gambar</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus gambar ini? Tindakan
                            ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(previewItem.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Gambar</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {editItem && (
              <img
                src={editItem.imageUrl}
                alt={editAlt}
                className="w-full h-48 object-cover rounded-lg border border-border"
              />
            )}
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={editAlt}
                onChange={(e) => setEditAlt(e.target.value)}
                placeholder="Deskripsi singkat gambar (untuk aksesibilitas)"
              />
            </div>
            <div className="space-y-2">
              <Label>Caption</Label>
              <Input
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                placeholder="Keterangan gambar (opsional)"
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GALLERY_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setEditItem(null)}
                disabled={savingEdit}
              >
                Batal
              </Button>
              <Button onClick={handleSaveEdit} disabled={savingEdit}>
                {savingEdit ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
