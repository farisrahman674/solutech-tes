"use client";

import { useEffect, useState } from "react";
import EditProductModal from "@/app/component/EditProductModal";
import CreateProductModal from "@/app/component/CreateProductModal";
import DeleteProductModal from "@/app/component/DeleteProductModal";
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  isDeleted: boolean;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function AdminProductsPage() {
  // Fetch All Product
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  // Edit Use State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  // Create Use State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  // Soft Delete Use State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  // GET All Product
  async function fetchProducts(page = 1, searchQuery = "") {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/products?page=${page}&limit=10&search=${searchQuery}`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();

      setProducts(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts(1, search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);
  useEffect(() => {
    fetchProducts();
  }, []);
  // Handle Modal Edit
  function handleEdit(product: Product) {
    setSelectedProduct(product);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });

    setIsEditOpen(true);
  }
  // Handle Update Product
  async function handleUpdateProduct() {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setIsEditOpen(false);

      fetchProducts(pagination.page, search);
    } catch (error) {
      console.error(error);
    }
  }
  // Handle Create Product
  async function handleCreateProduct() {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Product created successfully");

      setIsCreateOpen(false);

      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
      });

      fetchProducts(pagination.page, search);
    } catch (error) {
      console.error(error);
    }
  }
  // Handle Modal Delete Product
  function handleDeleteClick(product: Product) {
    setProductToDelete(product);
    setIsDeleteOpen(true);
  }
  // Handle Delete Product
  async function handleDeleteProduct() {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Product deleted");

      setIsDeleteOpen(false);

      fetchProducts(pagination.page, search);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products Management</h1>

        <button
          onClick={() => {
            setFormData({
              name: "",
              description: "",
              price: 0,
              stock: 0,
            });

            setIsCreateOpen(true);
          }}
          className="rounded bg-black px-4 py-2 text-white"
        >
          + Create Product
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded border p-3"
      />

      {/* Loading */}
      {loading && <p>Loading products...</p>}

      {/* Products */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-bold">{product.name}</h2>

            <p className="mt-2 text-gray-600">{product.description}</p>

            <div className="mt-4 space-y-1">
              <p>
                <strong>Price:</strong> Rp{" "}
                {product.price.toLocaleString("id-ID")}
              </p>

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>
            </div>
            {product.isDeleted && (
              <span className="mt-2 inline-block rounded bg-red-100 px-2 py-1 text-sm text-red-600">
                Product Not Published
              </span>
            )}

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 rounded bg-blue-600 px-3 py-2 text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteClick(product)}
                className="flex-1 rounded bg-red-600 px-3 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          disabled={pagination.page === 1}
          onClick={() => fetchProducts(pagination.page - 1, search)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => fetchProducts(pagination.page + 1, search)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <EditProductModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdateProduct}
      />
      <CreateProductModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateProduct}
      />
      <DeleteProductModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDeleteProduct}
        productName={productToDelete?.name}
      />
    </div>
  );
}
