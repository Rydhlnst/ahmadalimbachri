import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  updateContactSubmissionStatus,
  deleteContactSubmission,
} from "@/lib/cms-api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieHeader = request.headers.get("cookie");
    await requireAuth(cookieHeader);

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status harus diisi" },
        { status: 400 }
      );
    }

    await updateContactSubmissionStatus(parseInt(id), status);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update contact status error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui status kontak" },
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
    await deleteContactSubmission(parseInt(id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete contact error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus kontak" },
      { status: 500 }
    );
  }
}
