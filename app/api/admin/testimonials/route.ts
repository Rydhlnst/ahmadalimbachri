import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getTestimonials, createTestimonial } from "@/lib/cms-api";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get testimonials error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data testimonial" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const body = await request.json();
    const { name, role, content, photoUrl, featured, order } = body;

    if (!name || !content) {
      return NextResponse.json(
        { error: "Nama dan konten harus diisi" },
        { status: 400 }
      );
    }

    const testimonial = await createTestimonial({
      name,
      role,
      content,
      photoUrl,
      featured,
      order,
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create testimonial error:", error);
    return NextResponse.json(
      { error: "Gagal membuat testimonial" },
      { status: 500 }
    );
  }
}
