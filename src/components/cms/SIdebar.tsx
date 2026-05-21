"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/contentmanage",
    label: "Dashboard",
    adminOnly: false,
    subLabel: "Traffic & leads masuk",
  },
  {
    href: "/contentmanage/konten",
    label: "Kelola Konten",
    adminOnly: false,
    children: [
      { href: "/contentmanage/konten/landing", label: "Landing Page" },
      { href: "/contentmanage/konten/cluster", label: "Cluster Page" },
      { href: "/contentmanage/konten/addon", label: "Add On Page" },
      { href: "/contentmanage/konten/form", label: "Form Page" },
    ],
  },
  {
    href: "/contentmanage/users",
    label: "Kelola Pengguna",
    adminOnly: true,
  },
  {
    href: "/contentmanage/logs",
    label: "LOG",
    adminOnly: true,
  },
];

export default function Sidebar({ role }: { role: "USER" | "ADMIN" }) {
  const pathname = usePathname();
  const router = useRouter();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    "/contentmanage/konten": pathname.startsWith("/contentmanage/konten"),
  });

  const toggleMenu = (href: string) => {
    setOpenMenus((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (href: string) =>
    pathname.startsWith(href) && pathname !== href;

  return (
    <aside className="w-55 min-h-screen bg-[#F5F0E8] border-r border-[rgba(27,94,53,0.12)] flex flex-col py-4 gap-0.5">
      {/* Logo */}
      <div className="px-4.5 pb-4 mb-2 border-b border-[rgba(27,94,53,0.1)]">
        <p className="text-[14px] font-medium text-[#163F25]">CMS Panel</p>
        <p className="text-[11px] text-[#7A9480]">Content Management</p>
      </div>

      {NAV_ITEMS.map(({ href, label, adminOnly, children }) => {
        const isLocked = adminOnly && role !== "ADMIN";
        const active = isActive(href);
        const parentActive = isParentActive(href);
        const isOpen = openMenus[href];

        return (
          <div key={href}>
            <div className="relative group">
              <button
                type="button"
                disabled={isLocked}
                onClick={() => {
                  if (isLocked) return;
                  if (children) toggleMenu(href);
                  else router.push(href);
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-4.5 py-2.25 text-[12.5px] font-semibold",
                  "border-l-[3px] transition-all text-left",
                  active || parentActive
                    ? "text-[#163F25] border-l-[#1B5E35] bg-[rgba(27,94,53,0.08)]"
                    : !isLocked
                      ? "text-[#7A9480] border-l-transparent hover:text-[#163F25] hover:bg-[rgba(27,94,53,0.06)]"
                      : "text-[#C4BEB4] border-l-transparent cursor-not-allowed",
                )}
              >
                <span className="flex-1">{label}</span>

                {children && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className={cn(
                      "transition-transform shrink-0",
                      isOpen && "rotate-180",
                    )}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}

                {isLocked && (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="shrink-0 opacity-60"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
              </button>

              {isLocked && (
                <div
                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50
                                px-2.5 py-1.5 rounded-lg bg-[#163F25] text-[#F5F0E8]
                                text-[10px] font-medium whitespace-nowrap
                                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  Hanya untuk Admin
                  <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-[#163F25] rotate-45" />
                </div>
              )}
            </div>

            {children && isOpen && (
              <div className="flex flex-col">
                {children.map((child) => (
                  <button
                    key={child.href}
                    type="button"
                    onClick={() => router.push(child.href)}
                    className={cn(
                      "flex items-center gap-2 pl-10.5 pr-4.5 py-2",
                      "text-[12px] font-medium border-l-[3px] transition-all text-left",
                      isActive(child.href)
                        ? "text-[#163F25] border-l-[#1B5E35] bg-[rgba(27,94,53,0.06)]"
                        : "text-[#7A9480] border-l-transparent hover:text-[#163F25] hover:bg-[rgba(27,94,53,0.04)]",
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
