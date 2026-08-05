import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getPostById, updatePost, deletePost } from "@/lib/cms-api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { id } = await params;
    const post = await getPostById(parseInt(id));

    if (!post) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get post error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { id } = await params;
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

    const post = await updatePost(parseInt(id), {
      title,
      slug,
      excerpt: excerpt || null,
      content: content || null,
      featuredImageUrl: featuredImageUrl || null,
      categoryId: categoryId || null,
      status,
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
    });

    return NextResponse.json(post);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update post error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui berita" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { id } = await params;
    await deletePost(parseInt(id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
