"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";

type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

type Form = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

const EMPTY: Form = { name: "", email: "", password: "", role: "USER" };

export default function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [form, setForm] = useState<Form>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = () =>
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers)
      .catch(() => toast.error("Gagal memuat data akun."));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(EMPTY);
    setSelected(null);
    setModal("create");
    setError("");
  };

  const openEdit = (u: User) => {
    setSelected(u);
    setForm({ name: u.name, email: u.email, password: "", role: u.role });
    setModal("edit");
    setError("");
  };

  const submit = async () => {
    setBusy(true);
    setError("");

    const isCreate = modal === "create";
    const toastId = toast.loading(
      isCreate ? "Membuat akun…" : "Menyimpan perubahan…"
    );

    try {
      const res = await fetch("/api/users", {
        method: isCreate ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isCreate ? form : { ...form, id: selected?.id }
        ),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Gagal");

      toast.success(
        isCreate
          ? `Akun "${form.name}" berhasil dibuat`
          : `Akun "${form.name}" berhasil diperbarui`,
        { id: toastId }
      );

      setModal(null);
      load();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Gagal";
      setError(msg);
      toast.error(
        isCreate ? "Gagal membuat akun" : "Gagal memperbarui akun",
        { id: toastId, description: msg }
      );
    } finally {
      setBusy(false);
    }
  };

  const remove = async (u: User) => {
    if (!confirm(`Hapus akun ${u.name}?`)) return;

    const toastId = toast.loading(`Menghapus akun "${u.name}"…`);

    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: u.id }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Gagal");

      toast.success(`Akun "${u.name}" berhasil dihapus`, { id: toastId });
      load();
    } catch (e) {
      toast.error("Gagal menghapus akun", {
        id: toastId,
        description: e instanceof Error ? e.message : "Gagal",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-[30px] text-[#163F25]">
            Kelola Akun
          </h1>
          <p className="text-[12px] text-[#7A9480]">
            Buat dan kelola akun pengguna CMS.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
                     bg-gradient-to-br from-[#1B5E35] to-[#2E7D52]
                     text-[#F5F0E8] text-[12px] font-bold tracking-[1px] uppercase
                     shadow-[0_6px_20px_rgba(27,94,53,0.25)]
                     hover:scale-[1.03] active:scale-95 transition-all"
        >
          <HiPlus /> Buat Akun
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#F5F0E8] rounded-2xl border border-[rgba(27,94,53,0.1)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(27,94,53,0.1)]">
              {["Nama", "Email", "Role", "Dibuat", "Aksi"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-[10px] tracking-[2px] uppercase text-[#9AAD9C]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-[rgba(27,94,53,0.04)] transition"
              >
                <td className="px-5 py-3 font-semibold text-[#163F25]">
                  {u.name}
                </td>

                <td className="px-5 py-3 text-[#7A9480] text-sm">
                  {u.email}
                </td>

                <td className="px-5 py-3">
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-bold",
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
                      onClick={() => openEdit(u)}
                      className="flex items-center gap-1 px-2 py-1 rounded-md
                                 bg-green-100 text-green-700 text-xs hover:bg-green-200"
                    >
                      <HiPencil /> Edit
                    </button>

                    <button
                      onClick={() => remove(u)}
                      className="flex items-center gap-1 px-2 py-1 rounded-md
                                 bg-red-100 text-red-600 text-xs hover:bg-red-200"
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

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
              {modal === "create" ? "Buat Akun" : "Edit Akun"}
            </h2>

            <div className="flex flex-col gap-3">
              <input
                placeholder="Nama"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="input"
              />

              <select
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as "USER" | "ADMIN",
                  })
                }
                className="input"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setModal(null)}
                  className="flex-1 border rounded-lg py-2 text-sm"
                >
                  Batal
                </button>

                <button
                  onClick={submit}
                  className="flex-1 bg-green-600 text-white rounded-lg py-2 text-sm"
                >
                  {busy ? "..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}