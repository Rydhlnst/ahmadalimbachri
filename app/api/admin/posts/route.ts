import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  getPosts,
  createPost,
  getCategories,
} from "@/lib/cms-api";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const categoryId = searchParams.get("categoryId")
      ? parseInt(searchParams.get("categoryId")!)
      : undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset")!)
      : undefined;

    const [postsResult, categories] = await Promise.all([
      getPosts({ status, categoryId, limit, offset }),
      getCategories(),
    ]);

    return NextResponse.json({
      ...postsResult,
      categories,
    });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get posts error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImageUrl,
      categoryId,
      status,
      publishedAt,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Judul dan slug harus diisi" },
        { status: 400 }
      );
    }

    const post = await createPost({
      title,
      slug,
      excerpt: excerpt || null,
      content: content || null,
      featuredImageUrl: featuredImageUrl || null,
      categoryId: categoryId || null,
      status: status || "draft",
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Gagal membuat berita" },
      { status: 500 }
    );
  }
}
