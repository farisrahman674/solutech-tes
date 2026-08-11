"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/app/component/Logout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard/admin/products"
            className="p-3 rounded bg-black text-white text-center"
          >
            Products
          </Link>
          <LogoutButton />
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
