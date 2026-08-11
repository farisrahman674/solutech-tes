"use client";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    description: string;
    price: number;
    stock: number;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      price: number;
      stock: number;
    }>
  >;
  onSubmit: () => void;
};

export default function EditProductModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold">Edit Product</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-full rounded border p-3"
            placeholder="Product Name"
          />

          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full rounded border p-3"
            placeholder="Description"
          />

          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            className="w-full rounded border p-3"
            placeholder="Price"
          />

          <input
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                stock: Number(e.target.value),
              }))
            }
            className="w-full rounded border p-3"
            placeholder="Stock"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
