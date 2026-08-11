import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

import { createOrderSchema } from "@/validations/order.validation";

export async function POST(req: Request) {
  try {
    const user = await verifyAuth(req);

    const body = await req.json();

    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: "Invalid input",
        },
        { status: 400 },
      );
    }

    const { items } = validation.data;

    const productIds = items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
        isDeleted: false,
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 404,
          message: "One or more products not found",
        },
        { status: 404 },
      );
    }

    let totalPrice = 0;

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        continue;
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            statusCode: 400,
            message: `Insufficient stock for ${product.name}`,
          },
          { status: 400 },
        );
      }

      totalPrice += product.price * item.quantity;
    }

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId: user.id,
          totalPrice,
        },
      });

      for (const item of items) {
        const product = products.find((p) => p.id === item.productId);

        if (!product) {
          continue;
        }

        await tx.orderItem.create({
          data: {
            orderId: createdOrder.id,
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
          },
        });

        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return createdOrder;
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        data: order,
      },
      { status: 201 },
    );
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

export async function GET(req: Request) {
  try {
    const user = await verifyAuth(req);

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: orders,
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
