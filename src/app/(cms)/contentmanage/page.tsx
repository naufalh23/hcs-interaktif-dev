"use client";

import { useEffect, useState } from "react";

type Content = { id: string; key: string; label: string; value: string; group: string };

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [editing, setEditing]   = useState<Record<string, string>>({});
  const [saving, setSaving]     = useState<string | null>(null);
  const [saved, setSaved]       = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(setContents);
  }, []);

  const groups = [...new Set(contents.map(c => c.group))];

  const save = async (c: Content) => {
    setSaving(c.id);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, value: editing[c.id] ?? c.value }),
    });
    setContents(prev => prev.map(x => x.id === c.id ? { ...x, value: editing[c.id] ?? x.value } : x));
    setSaving(null);
    setSaved(c.id);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-light text-[32px] text-[#163F25]">Kelola Konten</h1>
        <p className="text-[12px] text-[#7A9480]">Edit teks dan informasi yang tampil di kiosk.</p>
      </div>

      {groups.map(group => (
        <div key={group} className="bg-[#F5F0E8] rounded-2xl p-5 border border-[rgba(27,94,53,0.1)]">
          <div className="text-[9px] tracking-[3px] capitalize font-bold text-[#9AAD9C] mb-4">{group}</div>
          <div className="flex flex-col gap-4">
            {contents.filter(c => c.group === group).map(c => (
              <div key={c.id}>
                <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#8A9E8C] block mb-1.5">
                  {c.label}
                </label>
                <div className="flex gap-2">
                  <textarea
                    defaultValue={c.value}
                    onChange={e => setEditing(prev => ({ ...prev, [c.id]: e.target.value }))}
                    rows={c.value.length > 80 ? 3 : 1}
                    className="flex-1 rounded-xl px-4 py-2.5 text-[13px] text-[#163F25] outline-none resize-none
                               border-[1.5px] border-[rgba(27,94,53,0.15)] bg-white
                               focus:border-[#1B5E35] focus:shadow-[0_0_0_3px_rgba(27,94,53,0.08)] transition-all"
                  />
                  <button onClick={() => save(c)} disabled={saving === c.id || !(c.id in editing)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-bold tracking-[1px] uppercase transition-all shrink-0
                      ${saved === c.id
                        ? "bg-[rgba(27,94,53,0.15)] text-[#1B5E35]"
                        : saving === c.id || !(c.id in editing)
                          ? "bg-[rgba(27,94,53,0.08)] text-[rgba(27,94,53,0.35)] cursor-not-allowed"
                          : "bg-linier-to-br from-[#1B5E35] to-[#2E7D52] text-[#F5F0E8] shadow-[0_4px_12px_rgba(27,94,53,0.2)] hover:scale-[1.02]"}`}>
                    {saved === c.id ? "✓ Tersimpan" : saving === c.id ? "…" : "Simpan"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}