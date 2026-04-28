"use client";

import { HiPencil, HiTrash } from "react-icons/hi";
import { cn } from "@/lib/utils";

type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

export default function UsersTable({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
}) {
  return (
    <div className="bg-[#F5F0E8] rounded-2xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            {["Nama", "Email", "Role", "Dibuat", "Aksi"].map((h) => (
              <th key={h} className="px-5 py-3 text-xs text-gray-400 uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3 font-semibold">{u.name}</td>
              <td className="px-5 py-3 text-sm text-gray-500">{u.email}</td>

              <td className="px-5 py-3">
                <span
                  className={cn(
                    "px-2 py-1 text-xs rounded-full font-bold",
                    u.role === "ADMIN"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  )}
                >
                  {u.role}
                </span>
              </td>

              <td className="px-5 py-3 text-xs text-gray-400">
                {new Date(u.createdAt).toLocaleDateString("id-ID")}
              </td>

              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(u)}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 text-xs"
                  >
                    <HiPencil /> Edit
                  </button>

                  <button
                    onClick={() => onDelete(u)}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-600 text-xs"
                  >
                    <HiTrash /> Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="py-10 text-center text-gray-400 text-sm">
          Belum ada akun
        </div>
      )}
    </div>
  );
}