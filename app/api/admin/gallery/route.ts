import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getMedia, createMedia, deleteMedia } from "@/lib/cms-api";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset")!)
      : undefined;

    const result = await getMedia({ category, limit, offset });
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get media error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data galeri" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const body = await request.json();
    const { alt, caption, category, imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "URL gambar harus diisi" },
        { status: 400 }
      );
    }

    const media = await createMedia({
      alt: alt || "",
      caption: caption || "",
      category: category || "",
      imageUrl,
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create media error:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan media" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID media harus diisi" },
        { status: 400 }
      );
    }

    await deleteMedia(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete media error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus media" },
      { status: 500 }
    );
  }
}
