"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const PUBLIC_ADMIN_ROUTES = ["/admin/login"];

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const isPublicRoute = PUBLIC_ADMIN_ROUTES.includes(pathname);

  useEffect(() => {
    if (isPublicRoute) {
      setChecking(false);
      return;
    }

    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [pathname, isPublicRoute, router]);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
}
