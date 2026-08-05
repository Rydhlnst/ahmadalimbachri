import type { Metadata } from "next";
import { getDashboardStats, getRecentPosts } from "@/lib/cms-api";

export const dynamic = "force-dynamic";
import {
  FileText,
  Image as ImageIcon,
  Mail,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Dashboard - Admin CMS",
  description: "Dashboard admin CMS Panti Asuhan",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const [stats, recentPosts] = await Promise.all([
    getDashboardStats(),
    getRecentPosts(5),
  ]);

  const statCards = [
    {
      label: "Total Berita",
      value: stats.totalPosts,
      icon: FileText,
      href: "/admin/posts",
    },
    {
      label: "Berita Dipublikasi",
      value: stats.publishedPosts,
      icon: Eye,
      href: "/admin/posts",
    },
    {
      label: "Total Media",
      value: stats.totalMedia,
      icon: ImageIcon,
      href: "/admin/gallery",
    },
    {
      label: "Pesan Baru",
      value: stats.newMessages,
      icon: Mail,
      href: "/admin/dashboard",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang di admin CMS Panti Asuhan
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold mt-1">{card.value}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Berita Terbaru</h2>
          <Link href="/admin/posts">
            <Button variant="outline" size="sm">
              Lihat Semua
            </Button>
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentPosts.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              Belum ada berita
            </div>
          ) : (
            recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-6 hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{post.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    {post.categoryName && (
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                        {post.categoryName}
                      </span>
                    )}
                    <span>
                      {format(new Date(post.createdAt), "dd MMM yyyy", {
                        locale: idLocale,
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {post.status === "published"
                      ? "Dipublikasi"
                      : "Draft"}
                  </span>
                  <Link href={`/admin/posts/${post.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
