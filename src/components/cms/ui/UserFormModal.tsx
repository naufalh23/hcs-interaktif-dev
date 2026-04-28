"use client";

import { useState } from "react";
import UserFormField from "./UserFormField";
import { HiX, HiEye, HiEyeOff } from "react-icons/hi";

type Form = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export default function UserFormModal({
  open,
  form,
  setForm,
  onClose,
  onSubmit,
  busy,
  mode,
}: any) {
  if (!open) return null;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/30 backdrop-blur-sm"
    >
      {/* CARD */}
      <div
        className="w-full max-w-md bg-[#FDFBF7] rounded-2xl 
                      shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                      border border-[#E5E7EB]
                      animate-in fade-in zoom-in-95 duration-200"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-[16px] font-semibold text-[#163F25]">
            {mode === "create" ? "Buat Akun Baru" : "Edit Akun"}
          </h2>

          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            <HiX />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-5 flex flex-col gap-4">
          <UserFormField label="Nama" required>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Masukkan nama"
              className="input-modern"
            />
          </UserFormField>

          <UserFormField label="Email" required>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@example.com"
              className="input-modern"
            />
          </UserFormField>

          <UserFormField
            label="Password"
            hint={
              mode === "edit"
                ? "Kosongkan jika tidak ingin mengganti"
                : undefined
            }
          >
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="input-modern pr-10"
              />

              {/* TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? "Sembunyikan" : "Tampilkan"}
                className="absolute right-3 top-1/2 -translate-y-1/2 
             text-[#7A9480] hover:text-[#163F25] 
             transition-all duration-200 hover:scale-110 active:scale-95"
              >
                {showPassword ? (
                  <HiEyeOff className="text-lg" />
                ) : (
                  <HiEye className="text-lg" />
                )}
              </button>
            </div>
          </UserFormField>

          {/* DROPDOWN IMPROVED */}
          <UserFormField label="Role">
            <div className="relative">
              <select
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as "USER" | "ADMIN",
                  })
                }
                className="input-modern appearance-none"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>

              {/* custom arrow */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AAD9C] text-xs pointer-events-none">
                ▼
              </span>
            </div>
          </UserFormField>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-300
                       text-sm text-gray-600 font-medium
                       hover:bg-gray-100 transition"
          >
            Batal
          </button>

          <button
            onClick={onSubmit}
            disabled={busy}
            className="flex-1 py-2.5 rounded-xl 
                       bg-linear-to-br from-[#1B5E35] to-[#2E7D52]
                       text-white text-sm font-semibold
                       shadow-md hover:scale-[1.02]
                       active:scale-95 transition disabled:opacity-60"
          >
            {busy ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
