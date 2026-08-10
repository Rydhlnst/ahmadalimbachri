import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { updateFaq, deleteFaq } from "@/lib/cms-api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { id } = await params;
    const body = await request.json();
    const { question, answer, order, status } = body;

    const faq = await updateFaq(parseInt(id), { question, answer, order, status });
    return NextResponse.json(faq);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update FAQ error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui FAQ" },
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
    await deleteFaq(parseInt(id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete FAQ error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus FAQ" },
      { status: 500 }
    );
  }
}
