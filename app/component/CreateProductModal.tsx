"use client";

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

export default function CreateProductModal({
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
        <h2 className="mb-4 text-2xl font-bold">Create Product</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-full rounded border p-3"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full rounded border p-3"
          />

          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            className="w-full rounded border p-3"
          />

          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                stock: Number(e.target.value),
              }))
            }
            className="w-full rounded border p-3"
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
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}
