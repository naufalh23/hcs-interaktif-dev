"use client";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export type CrudAction = "CREATE" | "UPDATE" | "DELETE" | "READ";

export interface CrudLog {
  id: string;
  datetime: string;        // ISO string
  user: string;
  action: CrudAction;
  item: string;            // e.g. "Landing Page – Promo Lebaran"
  keterangan: string;      // e.g. "Mengubah judul dari 'X' menjadi 'Y'"
}

const ACTION_STYLE: Record<CrudAction, string> = {
  CREATE: "bg-[#EAF3DE] text-[#3B6D11]",
  UPDATE: "bg-[#FAEEDA] text-[#854F0B]",
  DELETE: "bg-[#FCEBEB] text-[#A32D2D]",
  READ:   "bg-[#E6F1FB] text-[#185FA5]",
};

const ALL_ACTIONS: CrudAction[] = ["CREATE", "UPDATE", "DELETE", "READ"];

// ─── Demo data ────────────────────────────────────────────────────────────────
const DEMO_LOGS: CrudLog[] = [
  { id: "1",  datetime: "2025-05-20T08:14:22Z", user: "budi@mail.com",    action: "CREATE", item: "Landing Page – Promo Lebaran",    keterangan: "Menambahkan halaman baru Landing Page berjudul 'Promo Lebaran'" },
  { id: "2",  datetime: "2025-05-20T09:02:11Z", user: "sari@mail.com",    action: "UPDATE", item: "Cluster Page – Properti BSD",      keterangan: "Mengubah deskripsi cluster dari teks lama ke teks baru" },
  { id: "3",  datetime: "2025-05-20T09:45:00Z", user: "admin@mail.com",   action: "DELETE", item: "Form Page – Pendaftaran Webinar",  keterangan: "Menghapus form 'Pendaftaran Webinar' yang sudah tidak aktif" },
  { id: "4",  datetime: "2025-05-20T10:17:33Z", user: "budi@mail.com",    action: "UPDATE", item: "Add On Page – FAQ",               keterangan: "Memperbarui 3 pertanyaan pada bagian FAQ" },
  { id: "5",  datetime: "2025-05-20T11:00:05Z", user: "tono@mail.com",    action: "READ",   item: "Landing Page – Promo Lebaran",    keterangan: "Membuka halaman preview Landing Page" },
  { id: "6",  datetime: "2025-05-20T11:22:44Z", user: "sari@mail.com",    action: "CREATE", item: "Cluster Page – Summarecon",       keterangan: "Menambahkan cluster baru 'Summarecon Serpong'" },
  { id: "7",  datetime: "2025-05-20T12:05:19Z", user: "admin@mail.com",   action: "UPDATE", item: "Kelola Pengguna – tono@mail.com", keterangan: "Mengubah role pengguna dari USER menjadi EDITOR" },
  { id: "8",  datetime: "2025-05-20T13:30:00Z", user: "budi@mail.com",    action: "DELETE", item: "Add On Page – Banner Hari Raya",  keterangan: "Menghapus banner promosi yang sudah kadaluarsa" },
  { id: "9",  datetime: "2025-05-20T14:11:52Z", user: "tono@mail.com",    action: "CREATE", item: "Form Page – Konsultasi Gratis",   keterangan: "Membuat form baru 'Konsultasi Gratis' dengan 5 field" },
  { id: "10", datetime: "2025-05-20T15:00:00Z", user: "sari@mail.com",    action: "UPDATE", item: "Landing Page – Promo Lebaran",    keterangan: "Mengubah gambar hero banner dan warna tombol CTA" },
];

function fmtDatetime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  });
}

const PER_PAGE = 7;

export default function LogCrudPage() {
  const [filterAction, setFilterAction] = useState<CrudAction | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return DEMO_LOGS.filter((log) => {
      const matchAction = filterAction === "ALL" || log.action === filterAction;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        log.user.toLowerCase().includes(q) ||
        log.item.toLowerCase().includes(q) ||
        log.keterangan.toLowerCase().includes(q);
      return matchAction && matchSearch;
    });
  }, [filterAction, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilterChange = (v: CrudAction | "ALL") => {
    setFilterAction(v);
    setPage(1);
  };

  return (
    <div className="p-6 w-full min-w-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[20px] font-medium text-[#163F25]">Log CRUD</h1>
        <p className="text-[13px] text-[#7A9480] mt-0.5">Riwayat seluruh aktivitas perubahan data oleh pengguna</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari user, item, atau keterangan…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border border-[rgba(27,94,53,0.2)] rounded-lg px-3 py-2 text-[12.5px] w-64
                     bg-white focus:outline-none focus:ring-2 focus:ring-[rgba(27,94,53,0.3)]
                     placeholder:text-[#C4BEB4]"
        />

        {/* Action filter pills */}
        <div className="flex items-center gap-1.5">
          {(["ALL", ...ALL_ACTIONS] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => handleFilterChange(a)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all",
                filterAction === a
                  ? "bg-[#163F25] text-[#F5F0E8] border-[#163F25]"
                  : "bg-white text-[#7A9480] border-[rgba(27,94,53,0.2)] hover:border-[#1B5E35] hover:text-[#163F25]",
              )}
            >
              {a === "ALL" ? "Semua" : a}
            </button>
          ))}
        </div>

        <span className="ml-auto text-[11px] text-[#7A9480]">{filtered.length} entri</span>
      </div>

      {/* Table — table-fixed + w-full mengisi sisa layar tanpa ruang kosong */}
      <div className="w-full border border-[rgba(27,94,53,0.1)] rounded-xl overflow-hidden">
        <table className="w-full table-fixed text-[12.5px] border-collapse">
          <colgroup>
            {/* Kolom dengan lebar tetap (px), kolom Keterangan ambil sisa ruang */}
            <col className="w-[170px]" />   {/* Date & Time */}
            <col className="w-[170px]" />   {/* User */}
            <col className="w-[90px]" />    {/* Aksi */}
            <col className="w-[200px]" />   {/* Item */}
            <col />                          {/* Keterangan — mengisi sisa */}
          </colgroup>
          <thead>
            <tr className="bg-[#F5F0E8] text-[#7A9480]">
              <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Date & Time</th>
              <th className="text-left px-4 py-3 font-semibold">User</th>
              <th className="text-left px-4 py-3 font-semibold">Aksi</th>
              <th className="text-left px-4 py-3 font-semibold">Item</th>
              <th className="text-left px-4 py-3 font-semibold">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-[#C4BEB4]">Tidak ada data ditemukan</td>
              </tr>
            ) : (
              paginated.map((log, i) => (
                <tr
                  key={log.id}
                  className={cn(
                    "border-t border-[rgba(27,94,53,0.06)] transition-colors",
                    i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]",
                    "hover:bg-[rgba(27,94,53,0.03)]",
                  )}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-[#7A9480] font-mono text-[11.5px]">
                    {fmtDatetime(log.datetime)}
                  </td>
                  <td className="px-4 py-3 text-[#163F25] font-medium truncate" title={log.user}>
                    {log.user}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[10.5px] font-semibold",
                      ACTION_STYLE[log.action],
                    )}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#163F25] truncate" title={log.item}>
                    {log.item}
                  </td>
                  {/* Keterangan: wrap normal, mengisi sisa lebar */}
                  <td className="px-4 py-3 text-[#7A9480] break-words">
                    {log.keterangan}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 rounded-lg border border-[rgba(27,94,53,0.2)] text-[12px]
                       text-[#7A9480] hover:text-[#163F25] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ← Prev
          </button>
          <span className="text-[12px] text-[#7A9480]">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-lg border border-[rgba(27,94,53,0.2)] text-[12px]
                       text-[#7A9480] hover:text-[#163F25] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}