import { getIronSession } from "iron-session";

export interface SessionData {
  admin?: boolean;
}

function getSessionPassword() {
  const password =
    process.env.IRON_SESSION_PASSWORD || process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("IRON_SESSION_PASSWORD or ADMIN_PASSWORD must be set");
  }
  return password;
}

function createIronConfig() {
  return {
    password: getSessionPassword(),
    cookieName: "panti_admin_session",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    },
  };
}

function extractCookies(res: Response): string[] {
  const cookies: string[] = [];
  // Use getSetCookie if available, otherwise parse Set-Cookie header
  if (typeof res.headers.getSetCookie === "function") {
    cookies.push(...res.headers.getSetCookie());
  } else {
    const setCookie = res.headers.get("Set-Cookie");
    if (setCookie) {
      cookies.push(setCookie);
    }
  }
  return cookies;
}

export async function getSession(cookieHeader: string | null) {
  const config = createIronConfig();

  const headers = new Headers();
  if (cookieHeader) {
    headers.set("cookie", cookieHeader);
  }

  const req = new Request("http://localhost", { headers });
  const res = new Response();

  const session = await getIronSession<SessionData>(req, res, config);

  return {
    session,
    setCookie: extractCookies(res),
  };
}

export async function createSession() {
  const config = createIronConfig();

  const req = new Request("http://localhost");
  const res = new Response();

  const session = await getIronSession<SessionData>(req, res, config);

  session.admin = true;
  await session.save();

  return extractCookies(res);
}

export async function destroySession(cookieHeader: string | null) {
  const config = createIronConfig();

  const headers = new Headers();
  if (cookieHeader) {
    headers.set("cookie", cookieHeader);
  }

  const req = new Request("http://localhost", { headers });
  const res = new Response();

  const session = await getIronSession<SessionData>(req, res, config);
  session.destroy();

  return extractCookies(res);
}
