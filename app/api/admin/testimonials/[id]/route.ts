import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { updateTestimonial, deleteTestimonial } from "@/lib/cms-api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { id } = await params;
    const body = await request.json();
    const { name, role, content, photoUrl, featured, order } = body;

    const testimonial = await updateTestimonial(parseInt(id), {
      name,
      role,
      content,
      photoUrl,
      featured,
      order,
    });
    return NextResponse.json(testimonial);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update testimonial error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui testimonial" },
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
    await deleteTestimonial(parseInt(id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete testimonial error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus testimonial" },
      { status: 500 }
    );
  }
}
