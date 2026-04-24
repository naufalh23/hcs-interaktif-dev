"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/contentmanage",       label: "Konten",      adminOnly: false },
  { href: "/contentmanage/users", label: "Kelola Akun", adminOnly: true  },
];

export default function CmsNav({ role }: { role: "USER" | "ADMIN" }) {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <nav className="bg-[#F5F0E8] border-b border-[rgba(27,94,53,0.08)] px-6 flex gap-1">
      {TABS.map(({ href, label, adminOnly }) => {
        const isActive = pathname === href;
        const isLocked = adminOnly && role !== "ADMIN";

        return (
          <div key={href} className="relative group">
            <button
              type="button"
              disabled={isLocked}
              onClick={() => !isLocked && router.push(href)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold border-b-2 transition-all",
                isActive && !isLocked
                  ? "text-[#163F25] border-[#1B5E35]"
                  : !isActive && !isLocked
                    ? "text-[#7A9480] border-transparent hover:text-[#163F25] hover:border-[#1B5E35]"
                    : "text-[#C4BEB4] border-transparent cursor-not-allowed",
              )}
            >
              {label}
              {isLocked && (
                <svg
                  width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              )}
            </button>

            {isLocked && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 z-50
                              px-2.5 py-1.5 rounded-lg bg-[#163F25] text-[#F5F0E8]
                              text-[10px] font-medium whitespace-nowrap
                              opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Hanya untuk Admin
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#163F25] rotate-45" />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}