"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Content = {
  id:    string;
  key:   string;
  label: string;
  value: string;
  group: string;
};

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [editing, setEditing]   = useState<Record<string, string>>({});
  const [saving, setSaving]     = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then(r => r.json())
      .then(setContents)
      .catch(() => toast.error("Gagal memuat konten."));
  }, []);

  const groups = [...new Set(contents.map(c => c.group))];

  const save = async (c: Content) => {
    const newValue = editing[c.id];
    if (!newValue || newValue === c.value) return;

    setSaving(c.id);
    const toastId = toast.loading(`Menyimpan "${c.label}"…`);

    try {
      const res = await fetch("/api/content", {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: c.id, value: newValue }),
      });
      if (!res.ok) throw new Error();

      setContents(prev =>
        prev.map(x => x.id === c.id ? { ...x, value: newValue } : x)
      );
      setEditing(prev => {
        const next = { ...prev };
        delete next[c.id];
        return next;
      });

      toast.success(`"${c.label}" berhasil disimpan`, { id: toastId });
    } catch {
      toast.error(`Gagal menyimpan "${c.label}"`, { id: toastId });
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-light text-[32px] text-[#163F25]">Kelola Konten</h1>
        <p className="text-[12px] text-[#7A9480]">Edit teks dan informasi yang tampil di kiosk.</p>
      </div>

      {groups.map(group => (
        <div key={group}
          className="bg-[#F5F0E8] rounded-2xl p-5 border border-[rgba(27,94,53,0.1)]">
          <div className="text-[9px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-4 capitalize">
            {group}
          </div>
          <div className="flex flex-col gap-4">
            {contents.filter(c => c.group === group).map(c => {
              const isDirty = c.id in editing && editing[c.id] !== c.value;
              return (
                <div key={c.id}>
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#8A9E8C] block mb-1.5">
                    {c.label}
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      defaultValue={c.value}
                      onChange={e => setEditing(prev => ({ ...prev, [c.id]: e.target.value }))}
                      rows={c.value.length > 80 ? 3 : 1}
                      className="flex-1 rounded-xl px-4 py-2.5 text-[13px] text-[#163F25]
                                 outline-none resize-none border-[1.5px]
                                 border-[rgba(27,94,53,0.15)] bg-white focus:border-[#1B5E35]
                                 focus:shadow-[0_0_0_3px_rgba(27,94,53,0.08)] transition-all"
                    />
                    <button
                      onClick={() => save(c)}
                      disabled={saving === c.id || !isDirty}
                      className={`px-4 py-2 rounded-xl text-[11px] font-bold tracking-[1px]
                                  uppercase transition-all shrink-0 ${
                        saving === c.id
                          ? "bg-[rgba(27,94,53,0.08)] text-[rgba(27,94,53,0.35)] cursor-not-allowed"
                          : !isDirty
                            ? "bg-[rgba(27,94,53,0.06)] text-[rgba(27,94,53,0.25)] cursor-not-allowed"
                            : "bg-gradient-to-br from-[#1B5E35] to-[#2E7D52] text-[#F5F0E8] shadow-[0_4px_12px_rgba(27,94,53,0.2)] hover:scale-[1.02]"
                      }`}
                    >
                      {saving === c.id ? "…" : "Simpan"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}