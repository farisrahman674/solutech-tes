"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  productName?: string;
};

export default function DeleteProductModal({
  isOpen,
  onClose,
  onDelete,
  productName,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="text-xl font-bold">Delete Product</h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete
          <span className="font-semibold"> {productName}</span>?
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
