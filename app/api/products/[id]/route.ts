import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { updateProductSchema } from "@/validations/product.validation";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    verifyAuth(req);
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 404,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const user = await verifyAuth(req);
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          statusCode: 403,
          message: "Forbidden Access",
        },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await req.json();
    const validation = updateProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: "Invalid Input",
        },
        { status: 400 },
      );
    }

    const product = await prisma.product.update({
      where: { id },
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
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const user = await verifyAuth(req);

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          statusCode: 403,
          message: "Forbidden Access",
        },
        { status: 403 },
      );
    }

    const { id } = await params;

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
