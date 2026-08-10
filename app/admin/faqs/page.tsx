"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Plus, Trash2, Pencil, HelpCircle } from "lucide-react";

interface Faq {
  id: number;
  question: string;
  answer: string;
  order: number;
  status: string;
  createdAt: string;
}

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [order, setOrder] = useState("0");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);

  const fetchFaqs = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/faqs");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setFaqs(data);
    } catch {
      toast.error("Gagal memuat FAQ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  function openCreateDialog() {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setOrder("0");
    setStatus("draft");
    setShowDialog(true);
  }

  function openEditDialog(faq: Faq) {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(faq.order.toString());
    setStatus(faq.status);
    setShowDialog(true);
  }

  async function handleSave() {
    if (!question.trim() || !answer.trim()) {
      toast.error("Pertanyaan dan jawaban harus diisi");
      return;
    }

    setSaving(true);
    try {
      const url = editingFaq
        ? `/api/admin/faqs/${editingFaq.id}`
        : "/api/admin/faqs";
      const method = editingFaq ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          answer: answer.trim(),
          order: parseInt(order) || 0,
          status,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menyimpan FAQ");
      }

      toast.success(
        editingFaq ? "FAQ berhasil diperbarui" : "FAQ berhasil dibuat"
      );
      setShowDialog(false);
      fetchFaqs();
    } catch (error: any) {
      toast.error(error.message || "Gagal menyimpan FAQ");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus FAQ");

      toast.success("FAQ berhasil dihapus");
      fetchFaqs();
    } catch {
      toast.error("Gagal menghapus FAQ");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">FAQ</h1>
          <p className="text-muted-foreground">
            {faqs.length} FAQ terdaftar
          </p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Buat FAQ
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-muted rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : faqs.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Belum ada FAQ</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Pertanyaan
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                    Urutan
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-muted/50">
                    <td className="p-4">
                      <p className="font-medium line-clamp-2">{faq.question}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {faq.answer}
                      </p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          faq.status === "published"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {faq.status === "published" ? "Aktif" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {faq.order}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(faq)}
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
                              <AlertDialogTitle>Hapus FAQ</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus FAQ ini?
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(faq.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingFaq ? "Edit FAQ" : "Buat FAQ Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Pertanyaan</Label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Masukkan pertanyaan..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Jawaban</Label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Masukkan jawaban..."
                rows={5}
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
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Aktif</SelectItem>
                  </SelectContent>
                </Select>
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
