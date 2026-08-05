"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

interface Settings {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  donationInfo: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    siteName: "",
    siteDescription: "",
    phone: "",
    email: "",
    address: "",
    whatsapp: "",
    donationInfo: "",
    bankName: "",
    bankAccountNumber: "",
    bankAccountName: "",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          siteName: data.siteName || "",
          siteDescription: data.siteDescription || "",
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
          whatsapp: data.whatsapp || "",
          donationInfo: data.donationInfo || "",
          bankName: data.bankName || "",
          bankAccountNumber: data.bankAccountNumber || "",
          bankAccountName: data.bankAccountName || "",
        });
      })
      .catch(() => toast.error("Gagal memuat pengaturan"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      toast.success("Pengaturan berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan pengaturan");
    } finally {
      setSaving(false);
    }
  }

  function update(field: keyof Settings, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan Situs</h1>
        <p className="text-muted-foreground">
          Kelola informasi umum situs web panti asuhan
        </p>
      </div>

      <div className="space-y-6">
        {/* Informasi Situs */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b border-border pb-3">
            Informasi Situs
          </h2>

          <div className="space-y-2">
            <Label htmlFor="siteName">Nama Situs</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => update("siteName", e.target.value)}
              placeholder="Nama panti asuhan"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Deskripsi Situs</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => update("siteDescription", e.target.value)}
              placeholder="Deskripsi singkat tentang panti asuhan"
              rows={3}
            />
          </div>
        </div>

        {/* Kontak */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b border-border pb-3">
            Informasi Kontak
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telepon</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="0812-xxxx-xxxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="info@pantiasuhan.org"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={settings.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                placeholder="62812xxxxxxx"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Textarea
              id="address"
              value={settings.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Alamat lengkap panti asuhan"
              rows={2}
            />
          </div>
        </div>

        {/* Donasi & Bank */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b border-border pb-3">
            Informasi Donasi & Bank
          </h2>

          <div className="space-y-2">
            <Label htmlFor="donationInfo">Info Donasi</Label>
            <Textarea
              id="donationInfo"
              value={settings.donationInfo}
              onChange={(e) => update("donationInfo", e.target.value)}
              placeholder="Informasi cara berdonasi"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Nama Bank</Label>
              <Input
                id="bankName"
                value={settings.bankName}
                onChange={(e) => update("bankName", e.target.value)}
                placeholder="Bank Central Asia"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAccountNumber">No. Rekening</Label>
              <Input
                id="bankAccountNumber"
                value={settings.bankAccountNumber}
                onChange={(e) =>
                  update("bankAccountNumber", e.target.value)
                }
                placeholder="1234567890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAccountName">Nama Pemegang Rekening</Label>
              <Input
                id="bankAccountName"
                value={settings.bankAccountName}
                onChange={(e) => update("bankAccountName", e.target.value)}
                placeholder="Yayasan Panti Asuhan"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Menyimpan..." : "Simpan Pengaturan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
