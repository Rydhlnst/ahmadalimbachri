import { NextRequest, NextResponse } from "next/server";
import { createSession, destroySession, getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password harus diisi" },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin password tidak dikonfigurasi" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Password salah" },
        { status: 401 }
      );
    }

    const setCookies = await createSession();

    const response = NextResponse.json({ success: true });
    for (const cookie of setCookies) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const setCookies = await destroySession(cookieHeader);

    const response = NextResponse.json({ success: true });
    for (const cookie of setCookies) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const { session } = await getSession(cookieHeader);

    return NextResponse.json({ authenticated: !!session.admin });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
