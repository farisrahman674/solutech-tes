import Link from "next/link";
import LogoutButton from "@/app/component/Logout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-100 p-5">
        <h2 className="mb-8 text-2xl font-bold">User Dashboard</h2>

        <nav className="flex flex-col gap-3">
          <Link
            href="/dashboard/user/products"
            className="rounded p-3 hover:bg-gray-200"
          >
            Products
          </Link>

          <Link
            href="/dashboard/user/orders"
            className="rounded p-3 hover:bg-gray-200"
          >
            My Orders
          </Link>
          <LogoutButton />
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
