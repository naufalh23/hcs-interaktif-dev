"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HiPlus } from "react-icons/hi";
import UserFormModal from "./ui/UserFormModal";
import ConfirmDeleteModal from "./ui/ConfirmDeleteModal";
import UsersTable from "./ui/UsersTable";

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

const EMPTY: Form = {
  name: "",
  email: "",
  password: "",
  role: "USER",
};

export default function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);

  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<User | null>(null);

  const [form, setForm] = useState<Form>(EMPTY);

  const [busy, setBusy] = useState(false);

  // ================= LOAD DATA =================
  const load = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch {
      toast.error("Gagal memuat data akun");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ================= CREATE =================
  const openCreate = () => {
    setForm(EMPTY);
    setSelected(null);
    setModal("create");
  };

  // ================= EDIT =================
  const openEdit = (u: User) => {
    setSelected(u);
    setForm({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role,
    });
    setModal("edit");
  };

  // ================= SUBMIT =================
  const submit = async () => {
    setBusy(true);

    const isCreate = modal === "create";
    const toastId = toast.loading(
      isCreate ? "Membuat akun…" : "Menyimpan perubahan…",
    );

    try {
      const res = await fetch("/api/users", {
        method: isCreate ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isCreate ? form : { ...form, id: selected?.id }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal");

      toast.success(
        isCreate
          ? `Akun "${form.name}" berhasil dibuat`
          : `Akun "${form.name}" berhasil diperbarui`,
        { id: toastId },
      );

      setModal(null);
      load();
    } catch (e) {
      toast.error("Terjadi kesalahan", {
        id: toastId,
        description: e instanceof Error ? e.message : "Gagal",
      });
    } finally {
      setBusy(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    if (!confirmDelete) return;

    const toastId = toast.loading(`Menghapus "${confirmDelete.name}"…`);

    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: confirmDelete.id }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal");

      toast.success(`"${confirmDelete.name}" berhasil dihapus`, {
        id: toastId,
      });

      setConfirmDelete(null);
      load();
    } catch (e) {
      toast.error("Gagal menghapus", {
        id: toastId,
        description: e instanceof Error ? e.message : "Gagal",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-[30px] text-[#163F25]">Kelola Akun</h1>
          <p className="text-sm text-[#7A9480]">
            Buat dan kelola akun pengguna CMS.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
                     bg-linear-to-br from-[#1B5E35] to-[#2E7D52]
                     text-white text-sm font-semibold
                     shadow-md hover:scale-[1.03] transition"
        >
          <HiPlus />
          Buat Akun
        </button>
      </div>

      {/* TABLE */}
      <UsersTable
        users={users}
        onEdit={openEdit}
        onDelete={(u) => setConfirmDelete(u)}
      />

      {/* FORM MODAL */}
      <UserFormModal
        open={!!modal}
        form={form}
        setForm={setForm}
        onClose={() => setModal(null)}
        onSubmit={submit}
        busy={busy}
        mode={modal}
      />

      {/* DELETE MODAL */}
      <ConfirmDeleteModal
        user={confirmDelete}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
