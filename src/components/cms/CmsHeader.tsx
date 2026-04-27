"use client";

import { useEffect, useState } from "react";
import LogoutButton from "@/components/cms/LogoutButton";

export default function CmsHeader({
  name,
  role,
  onSignOut,
}: {
  name?: string | null;
  role: "USER" | "ADMIN";
  onSignOut: () => Promise<void>;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();

      const date = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const clock = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setTime(`${date} | ${clock} WIB`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#F5F0E8]/80 border-b border-[rgba(27,94,53,0.1)]">
      <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col leading-tight">
            <span className="font-serif font-bold text-[18px] text-[#163F25]">
              H City CMS
            </span>
            <span className="text-[10px] text-[#9AAD9C] tracking-widest uppercase">
              Sawangan Kios-K
            </span>
          </div>

          <span
            className={`text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase ${
              role === "ADMIN"
                ? "bg-[rgba(201,168,76,0.2)] text-[#7A5A00]"
                : "bg-[rgba(27,94,53,0.1)] text-[#1B5E35]"
            }`}
          >
            {role}
          </span>
        </div>

        {/* CENTER (Time) */}
        <div className="hidden md:block">
          <span className="text-[12px] font-medium text-[#8FA396] tracking-wide tabular-nums">
            {time}
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <div className="text-right leading-tight">
            <p className="text-[11px] text-[#9AAD9C]">Logged in as</p>
            <p className="text-[13px] font-semibold text-[#163F25]">
              {name}
            </p>
          </div>

          <LogoutButton onSignOut={onSignOut} />
        </div>
      </div>
    </header>
  );
}