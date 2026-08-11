import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function verifyAuth(req: Request) {
  const authHeader = req.headers.get("authorization");

  let token: string | undefined;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.replace("Bearer ", "");
  }

  if (!token) {
    const cookieStore = await cookies();

    token = cookieStore.get("token")?.value;
  }

  if (!token) {
    throw new Error("Unauthorized");
  }

  return jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
    email: string;
    role: string;
  };
}
