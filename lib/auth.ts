import jwt from "jsonwebtoken";

export function verifyAuth(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.replace("Bearer ", "");

  return jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
    email: string;
    role: string;
  };
}
