"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    const response = await fetch(`/api/products/${params.id}`, {
      credentials: "include",
    });

    const data = await response.json();

    setProduct(data.data);
  }

  async function handleOrder() {
    if (!product) return;

    try {
      setLoading(true);

      const response = await fetch("/api/order", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              productId: product.id,
              quantity,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Order failed");
        return;
      }

      alert("Order created successfully");

      router.push("/dashboard/user/orders");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

      <p className="mb-6 text-gray-600">{product.description}</p>

      <div className="rounded-xl border p-6 shadow-sm">
        <p className="mb-2">
          <strong>Price:</strong> Rp {product.price.toLocaleString("id-ID")}
        </p>

        <p className="mb-4">
          <strong>Stock:</strong> {product.stock}
        </p>

        <div className="mb-4">
          <label className="mb-2 block font-medium">Quantity</label>

          <input
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-32 rounded border p-2"
          />
        </div>

        <p className="mb-6 text-lg font-semibold">
          Total: Rp {(product.price * quantity).toLocaleString("id-ID")}
        </p>

        <button
          onClick={handleOrder}
          disabled={loading || quantity < 1 || quantity > product.stock}
          className="rounded bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Processing..." : "Order Now"}
        </button>
      </div>
    </div>
  );
}
