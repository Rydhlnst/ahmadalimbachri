import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getFaqs, createFaq } from "@/lib/cms-api";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const faqs = await getFaqs();
    return NextResponse.json(faqs);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get FAQs error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data FAQ" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const body = await request.json();
    const { question, answer, order, status } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Pertanyaan dan jawaban harus diisi" },
        { status: 400 }
      );
    }

    const faq = await createFaq({ question, answer, order, status });
    return NextResponse.json(faq, { status: 201 });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create FAQ error:", error);
    return NextResponse.json(
      { error: "Gagal membuat FAQ" },
      { status: 500 }
    );
  }
}
