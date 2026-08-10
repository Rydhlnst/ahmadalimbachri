"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { Trash2, Mail, Eye } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: "new", label: "Baru" },
  { value: "read", label: "Dibaca" },
  { value: "replied", label: "Dibalas" },
  { value: "archived", label: "Diarsipkan" },
];

export default function ContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [previewItem, setPreviewItem] = useState<ContactSubmission | null>(
    null
  );

  const fetchSubmissions = useCallback(async () => {
    try {
      const url =
        filterStatus !== "all"
          ? `/api/admin/contacts?status=${filterStatus}`
          : "/api/admin/contacts";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch {
      toast.error("Gagal memuat kontak");
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  async function handleUpdateStatus(id: number, status: string) {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Gagal memperbarui status");

      toast.success("Status berhasil diperbarui");
      fetchSubmissions();
      if (previewItem?.id === id) {
        setPreviewItem({ ...previewItem, status });
      }
    } catch {
      toast.error("Gagal memperbarui status");
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus kontak");

      toast.success("Kontak berhasil dihapus");
      setPreviewItem(null);
      fetchSubmissions();
    } catch {
      toast.error("Gagal menghapus kontak");
    }
  }

  function getStatusBadge(status: string) {
    const styles: Record<string, string> = {
      new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      read: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      replied: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      archived: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    };
    const labels: Record<string, string> = {
      new: "Baru",
      read: "Dibaca",
      replied: "Dibalas",
      archived: "Diarsipkan",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${styles[status] || styles.new}`}
      >
        {labels[status] || status}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Kontak</h1>
          <p className="text-muted-foreground">
            {submissions.length} pesan terdaftar
          </p>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      ) : submissions.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Belum ada pesan kontak</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Pengirim
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                    Subjek
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
                {submissions.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td className="p-4">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {item.email}
                      </p>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <p className="text-sm truncate max-w-xs">
                        {item.subject || "-"}
                      </p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">
                      {format(new Date(item.createdAt), "dd MMM yyyy", {
                        locale: idLocale,
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewItem(item)}
                        >
                          <Eye className="h-4 w-4" />
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
                              <AlertDialogTitle>Hapus Pesan</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus pesan dari
                                &ldquo;{item.name}&rdquo;? Tindakan ini tidak
                                dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
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

      {/* Preview Modal */}
      <Dialog
        open={!!previewItem}
        onOpenChange={(open) => !open && setPreviewItem(null)}
      >
        <DialogContent className="max-w-lg">
          {previewItem && (
            <>
              <DialogHeader>
                <DialogTitle>Pesan dari {previewItem.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{previewItem.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Telepon</p>
                    <p className="font-medium">{previewItem.phone || "-"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tanggal</p>
                    <p className="font-medium">
                      {format(new Date(previewItem.createdAt), "dd MMMM yyyy", {
                        locale: idLocale,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    {getStatusBadge(previewItem.status)}
                  </div>
                </div>
                {previewItem.subject && (
                  <div>
                    <p className="text-muted-foreground text-sm">Subjek</p>
                    <p className="font-medium">{previewItem.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground text-sm">Pesan</p>
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <p className="whitespace-pre-wrap text-sm">
                      {previewItem.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground mr-2">Ubah status:</p>
                  {STATUS_OPTIONS.map((opt) => (
                    <Button
                      key={opt.value}
                      variant={
                        previewItem.status === opt.value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(previewItem.id, opt.value)
                      }
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-end pt-2 border-t border-border">
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
                        <AlertDialogTitle>Hapus Pesan</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus pesan ini? Tindakan
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
