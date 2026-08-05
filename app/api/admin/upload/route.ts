import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { generatePresignedUrl } from "@/lib/r2";

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const body = await request.json();
    const { filename, contentType } = body;

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "filename dan contentType harus diisi" },
        { status: 400 }
      );
    }

    const result = await generatePresignedUrl(filename, contentType);
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Upload URL error:", error);
    return NextResponse.json(
      { error: "Gagal generate URL upload" },
      { status: 500 }
    );
  }
}
