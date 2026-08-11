"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products", {
        credentials: "include",
      });

      const data = await response.json();

      setProducts(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">All Products</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl border p-5 shadow-sm">
            <h2 className="text-xl font-semibold">{product.name}</h2>

            <p className="mt-2 text-gray-600">
              {product.description || "No description"}
            </p>

            <p className="mt-4">
              <span className="font-semibold">Price:</span> Rp{" "}
              {product.price.toLocaleString("id-ID")}
            </p>

            <p>
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>

            <Link
              href={`/dashboard/user/products/${product.id}`}
              className="mt-4 inline-block rounded bg-black px-4 py-2 text-white"
            >
              View Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
