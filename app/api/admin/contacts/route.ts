import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getContactSubmissions } from "@/lib/cms-api";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset")!)
      : undefined;

    const result = await getContactSubmissions({ status, limit, offset });
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get contacts error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kontak" },
      { status: 500 }
    );
  }
}
