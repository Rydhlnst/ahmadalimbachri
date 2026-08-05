import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getSiteSettings, upsertSiteSettings } from "@/lib/cms-api";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const settings = await getSiteSettings();
    return NextResponse.json(settings || {});
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get settings error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil pengaturan" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const body = await request.json();
    const settings = await upsertSiteSettings(body);

    return NextResponse.json(settings);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update settings error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui pengaturan" },
      { status: 500 }
    );
  }
}
