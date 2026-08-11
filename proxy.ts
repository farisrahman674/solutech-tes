import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      role: string;
    };

    const path = req.nextUrl.pathname;

    if (path.startsWith("/dashboard/admin") && payload.role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/dashboard/user/products", req.url),
      );
    }

    if (path.startsWith("/dashboard/user") && payload.role !== "USER") {
      return NextResponse.redirect(
        new URL("/dashboard/admin/products", req.url),
      );
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
