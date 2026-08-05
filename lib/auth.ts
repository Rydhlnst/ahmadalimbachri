import { redirect } from "next/navigation";
import { getSession } from "./session";
import { cookies } from "next/headers";

export async function adminGuard() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const { session } = await getSession(cookieHeader);

  if (!session.admin) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireAuth(cookieHeader: string | null) {
  const { session } = await getSession(cookieHeader);

  if (!session.admin) {
    throw new Error("Unauthorized");
  }

  return session;
}
