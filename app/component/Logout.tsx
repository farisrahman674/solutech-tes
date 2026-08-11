"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-auto rounded bg-red-500 px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}
