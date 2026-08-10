import type { Metadata } from "next";
import Link from "next/link";
import { getMedia } from "@/lib/cms-api";

export const metadata: Metadata = {
  title: "Galeri - Prof. Dr. Ahmad Alim Bachri",
  description:
    "Galeri foto kegiatan, fasilitas, dan aktivitas Prof. Dr. Ahmad, S.E., M.Si. - Rektor Universitas Lambung Mangkurat",
};

export const dynamic = "force-dynamic";

const GALLERY_CATEGORIES = [
  "Kegiatan",
  "Fasilitas",
  "Anak Asuh",
  "Donasi",
  "Lainnya",
];

export default async function GaleriPage() {
  const { media } = await getMedia({ limit: 100 });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-6"
          >
            ← Kembali ke Profil
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Galeri
          </h1>
          <p className="text-white/60 max-w-xl">
            Kumpulan foto kegiatan, fasilitas, dan aktivitas terkait Prof. Dr.
            Ahmad Alim Bachri.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        {media.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">Belum ada foto di galeri</p>
            <Link
              href="/"
              className="inline-block mt-4 text-sm text-navy underline decoration-gold/50 hover:text-gold transition-colors"
            >
              Kembali ke Profil
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square bg-neutral-100 border border-neutral-200 overflow-hidden"
              >
                <img
                  src={item.imageUrl}
                  alt={item.alt || item.caption || "Galeri"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-colors duration-300" />

                {/* Info on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  {(item.alt || item.caption) && (
                    <p className="text-white text-sm font-medium text-center line-clamp-2">
                      {item.alt || item.caption}
                    </p>
                  )}
                  {item.category && (
                    <span className="mt-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-white/20 text-white">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
