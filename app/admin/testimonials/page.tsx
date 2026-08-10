"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Trash2, Pencil, Quote } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  photoUrl: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState("0");
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setTestimonials(data);
    } catch {
      toast.error("Gagal memuat testimonial");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  function openCreateDialog() {
    setEditingTestimonial(null);
    setName("");
    setRole("");
    setContent("");
    setPhotoUrl("");
    setFeatured(false);
    setOrder("0");
    setShowDialog(true);
  }

  function openEditDialog(testimonial: Testimonial) {
    setEditingTestimonial(testimonial);
    setName(testimonial.name);
    setRole(testimonial.role || "");
    setContent(testimonial.content);
    setPhotoUrl(testimonial.photoUrl || "");
    setFeatured(testimonial.featured || false);
    setOrder(testimonial.order?.toString() || "0");
    setShowDialog(true);
  }

  async function handleSave() {
    if (!name.trim() || !content.trim()) {
      toast.error("Nama dan konten harus diisi");
      return;
    }

    setSaving(true);
    try {
      const url = editingTestimonial
        ? `/api/admin/testimonials/${editingTestimonial.id}`
        : "/api/admin/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          content: content.trim(),
          photoUrl,
          featured,
          order: parseInt(order) || 0,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menyimpan testimonial");
      }

      toast.success(
        editingTestimonial
          ? "Testimonial berhasil diperbarui"
          : "Testimonial berhasil dibuat"
      );
      setShowDialog(false);
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.message || "Gagal menyimpan testimonial");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus testimonial");

      toast.success("Testimonial berhasil dihapus");
      fetchTestimonials();
    } catch {
      toast.error("Gagal menghapus testimonial");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Testimonial</h1>
          <p className="text-muted-foreground">
            {testimonials.length} testimonial terdaftar
          </p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Buat Testimonial
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 bg-muted rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Quote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Belum ada testimonial</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {testimonial.photoUrl ? (
                    <img
                      src={testimonial.photoUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder variant="initial" text={testimonial.name} aspect="square" className="w-12 h-12 rounded-full" />
                  )}
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {testimonial.featured && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-gold/10 text-gold">
                      Unggulan
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(testimonial)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Testimonial</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus testimonial dari
                          &ldquo;{testimonial.name}&rdquo;? Tindakan ini tidak
                          dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(testimonial.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <blockquote className="text-sm text-muted-foreground italic">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? "Edit Testimonial" : "Buat Testimonial Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Foto Profil</Label>
              <ImageUpload
                value={photoUrl}
                onChange={setPhotoUrl}
                onRemove={() => setPhotoUrl("")}
                label="Upload Foto"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role / Jabatan</Label>
                <Input
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Mahasiswa"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Konten Testimonial</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan testimonial..."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order">Urutan</Label>
                <Input
                  id="order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Unggulan</Label>
                <div className="flex items-center h-10">
                  <Switch
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Tampilkan di beranda
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                disabled={saving}
              >
                Batal
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
