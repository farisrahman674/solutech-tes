import jwt from "jsonwebtoken";

export function generateToken(payload: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
