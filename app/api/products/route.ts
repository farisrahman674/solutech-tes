import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { createProductSchema } from "@/validations/product.validation";

export async function GET(req: Request) {
  try {
    verifyAuth(req);
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const search = searchParams.get("search") ?? "";
    const skip = (page - 1) * limit;

    const where = {
      isDeleted: false,

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: products,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 401,
        message: "Authentication required",
      },
      { status: 401 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = verifyAuth(req);

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          statusCode: 403,
          message: "Forbidden",
        },
        { status: 403 },
      );
    }

    const body = await req.json();

    const validation = createProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: validation.data,
    });

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        error,
      },
      { status: 500 },
    );
  }
}
