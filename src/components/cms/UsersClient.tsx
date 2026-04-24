"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type User = { id: string; name: string; email: string; role: "USER" | "ADMIN"; createdAt: string };
type Form = { name: string; email: string; password: string; role: "USER" | "ADMIN" };

const EMPTY: Form = { name: "", email: "", password: "", role: "USER" };

export default function UsersClient() {
  const [users, setUsers]       = useState<User[]>([]);
  const [modal, setModal]       = useState<"create" | "edit" | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [form, setForm]         = useState<Form>(EMPTY);
  const [busy, setBusy]         = useState(false);
  const [error, setError]       = useState("");

  const load = () =>
    fetch("/api/users").then(r => r.json()).then(setUsers);

  useEffect(() => { load(); }, []);

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
    try {
      const res = await fetch("/api/users", {
        method:  modal === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(
          modal === "edit" ? { ...form, id: selected?.id } : form
        ),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Gagal");
      setModal(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (u: User) => {
    if (!confirm(`Hapus akun ${u.name}?`)) return;
    await fetch("/api/users", {
      method:  "DELETE",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id: u.id }),
    });
    load();
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif font-light text-[32px] text-[#163F25]">Kelola Akun</h1>
          <p className="text-[12px] text-[#7A9480]">Buat dan kelola akun pengguna CMS.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 rounded-xl bg-linear-to-br from-[#1B5E35] to-[#2E7D52]
                     text-[#F5F0E8] text-[12px] font-bold tracking-[1px] uppercase
                     shadow-[0_4px_16px_rgba(27,94,53,0.22)] hover:scale-[1.02] transition-all"
        >
          + Buat Akun
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#F5F0E8] rounded-2xl border border-[rgba(27,94,53,0.1)] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[rgba(27,94,53,0.1)]">
              {["Nama", "Email", "Role", "Dibuat", "Aksi"].map(h => (
                <th key={h} className="px-5 py-3 text-[9px] tracking-[2px] uppercase font-bold text-[#9AAD9C]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}
                className="border-b border-[rgba(27,94,53,0.06)] hover:bg-[rgba(27,94,53,0.03)] transition-colors">
                <td className="px-5 py-3.5 text-[13px] font-semibold text-[#163F25]">{u.name}</td>
                <td className="px-5 py-3.5 text-[12px] text-[#7A9480]">{u.email}</td>
                <td className="px-5 py-3.5">
                  <span className={cn(
                    "text-[9px] px-2 py-0.5 rounded-full font-bold tracking-widest uppercase",
                    u.role === "ADMIN"
                      ? "bg-[rgba(201,168,76,0.2)] text-[#7A5A00]"
                      : "bg-[rgba(27,94,53,0.1)] text-[#1B5E35]"
                  )}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-[11px] text-[#9AAD9C]">
                  {new Date(u.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(u)}
                      className="text-[11px] font-semibold text-[#1B5E35] hover:underline">
                      Edit
                    </button>
                    <button onClick={() => remove(u)}
                      className="text-[11px] font-semibold text-red-400 hover:underline">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="py-10 text-center text-[12px] text-[#9AAD9C]">Belum ada akun.</div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center
                        bg-[rgba(0,0,0,0.3)] backdrop-blur-sm">
          <div className="bg-[#F5F0E8] rounded-2xl p-6 w-full max-w-sm shadow-2xl
                          border border-[rgba(27,94,53,0.1)]">
            <h2 className="font-serif font-semibold text-[20px] text-[#163F25] mb-5">
              {modal === "create" ? "Buat Akun Baru" : "Edit Akun"}
            </h2>

            <div className="flex flex-col gap-3.5">
              {[
                { key: "name",     label: "Nama",    type: "text"     },
                { key: "email",    label: "Email",   type: "email"    },
                { key: "password", label: modal === "edit"
                    ? "Password Baru (kosongkan jika tidak diganti)"
                    : "Password",                    type: "password" },
              ].map(f => (
                <div key={f.key} className="flex flex-col gap-1.5">
                  <label className="text-[9.5px] font-bold tracking-[1.5px] uppercase text-[#8A9E8C]">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof Form]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full rounded-xl px-4 py-2.5 text-[13px] outline-none border-[1.5px]
                               border-[rgba(27,94,53,0.15)] bg-white focus:border-[#1B5E35]
                               focus:shadow-[0_0_0_3px_rgba(27,94,53,0.08)] transition-all"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label className="text-[9.5px] font-bold tracking-[1.5px] uppercase text-[#8A9E8C]">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={e => setForm(prev => ({ ...prev, role: e.target.value as "USER" | "ADMIN" }))}
                  className="w-full rounded-xl px-4 py-2.5 text-[13px] outline-none border-[1.5px]
                             border-[rgba(27,94,53,0.15)] bg-white focus:border-[#1B5E35] transition-all"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              {error && <p className="text-[11px] text-red-500">{error}</p>}

              <div className="flex gap-2.5 pt-1">
                <button
                  onClick={() => setModal(null)}
                  className="flex-1 py-2.5 rounded-xl border-[1.5px] border-[rgba(27,94,53,0.16)]
                             text-[12px] font-semibold text-[#7A9480]
                             hover:bg-[rgba(27,94,53,0.06)] transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={submit}
                  disabled={busy}
                  className="flex-1 py-2.5 rounded-xl bg-linier-to-br from-[#1B5E35] to-[#2E7D52]
                             text-[#F5F0E8] text-[12px] font-bold tracking-[1px] uppercase
                             shadow-[0_4px_12px_rgba(27,94,53,0.2)] hover:scale-[1.01]
                             transition-all disabled:opacity-60"
                >
                  {busy ? "…" : modal === "create" ? "Buat" : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}