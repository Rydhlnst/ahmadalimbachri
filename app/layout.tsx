import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prof. Dr. Ahmad, S.E., M.Si. — Rektor Universitas Lambung Mangkurat",
  description:
    "Profil akademik Prof. Dr. Ahmad, S.E., M.Si. — Rektor Universitas Lambung Mangkurat, akademisi senior dengan pengalaman lebih dari 30 tahun di bidang manajemen, kepemimpinan, dan pengembangan pendidikan tinggi.",
  keywords: [
    "Prof Dr Ahmad",
    "Rektor ULM",
    "Universitas Lambung Mangkurat",
    "Akademisi Kalimantan Selatan",
    "Manajemen",
    "Kepemimpinan Transformasional",
  ],
  authors: [{ name: "Prof. Dr. Ahmad, S.E., M.Si." }],
  openGraph: {
    title: "Prof. Dr. Ahmad, S.E., M.Si. — Rektor Universitas Lambung Mangkurat",
    description:
      "Profil akademik Prof. Dr. Ahmad, S.E., M.Si. — Rektor Universitas Lambung Mangkurat.",
    type: "profile",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prof. Dr. Ahmad, S.E., M.Si.",
    description: "Rektor Universitas Lambung Mangkurat",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn(
        "h-full antialiased",
        "font-sans",
        jakartaSans.variable,
        playfairDisplay.variable
      )}
    >
      <body className="min-h-full bg-background text-foreground font-sans grain-overlay">
        {children}
      </body>
    </html>
  );
}
