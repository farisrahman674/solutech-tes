"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  totalPrice: number;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      description?: string;
    };
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    try {
      const response = await fetch("/api/order", {
        credentials: "include",
      });

      const data = await response.json();

      setOrders(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">My Orders</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">My Orders</h1>

        <div className="rounded-xl border p-6 text-center">
          <p className="text-gray-500">You don't have any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold">Order #{order.id.slice(-8)}</h2>

                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Total Price</p>

                <p className="text-lg font-bold">
                  Rp {order.totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.product.name}</h3>

                      <p className="text-sm text-gray-500">
                        {item.product.description}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm">Qty: {item.quantity}</p>

                      <p className="font-medium">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
