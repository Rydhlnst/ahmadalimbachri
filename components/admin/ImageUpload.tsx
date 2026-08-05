"use client";

import { useCallback, useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  label = "Upload Gambar",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("Ukuran gambar maksimal 10MB");
        return;
      }

      setUploading(true);

      try {
        // 1. Get presigned URL
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
          }),
        });

        if (!res.ok) throw new Error("Gagal generate upload URL");

        const { presignedUrl, publicUrl } = await res.json();

        // 2. Upload to R2
        const uploadRes = await fetch(presignedUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!uploadRes.ok) throw new Error("Gagal upload gambar ke server");

        // 3. Set the URL
        setPreview(publicUrl);
        onChange(publicUrl);
        toast.success("Gambar berhasil diupload");
      } catch (error) {
        toast.error("Gagal upload gambar");
        console.error(error);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const handleRemove = useCallback(() => {
    setPreview(null);
    onChange("");
    onRemove?.();
    if (inputRef.current) inputRef.current.value = "";
  }, [onChange, onRemove]);

  if (preview) {
    return (
      <div className="relative group">
        <img
          src={preview}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg border border-border"
        />
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-2">
        {uploading ? (
          <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">
          {uploading
            ? "Mengupload..."
            : "Seret & lepas gambar atau klik untuk memilih"}
        </p>
        <p className="text-xs text-muted-foreground/70">
          PNG, JPG, WebP (maks. 10MB)
        </p>
      </div>
    </div>
  );
}
