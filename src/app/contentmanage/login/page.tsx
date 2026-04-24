"use client";

import { useState } from "react";
import { signIn }   from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [busy, setBusy]         = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });
    if (res?.error) { setError("Email atau password salah"); setBusy(false); return; }
    router.push("/contentmanage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE8DE]">
      <div className="w-full max-w-sm bg-[#F5F0E8] rounded-2xl p-8 shadow-[0_8px_40px_rgba(27,94,53,0.1)] border border-[rgba(27,94,53,0.1)]">
        <div className="text-center mb-8">
          <div className="font-serif font-bold text-[28px] text-[#163F25]">H City</div>
          <div className="text-[10px] tracking-[3px] uppercase text-[#9AAD9C] font-semibold">Content Manager</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9.5px] font-bold tracking-[1.5px] uppercase text-[#8A9E8C]">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border-[1.5px] border-[rgba(27,94,53,0.15)] bg-white focus:border-[#1B5E35] focus:shadow-[0_0_0_3px_rgba(27,94,53,0.08)] transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9.5px] font-bold tracking-[1.5px] uppercase text-[#8A9E8C]">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border-[1.5px] border-[rgba(27,94,53,0.15)] bg-white focus:border-[#1B5E35] focus:shadow-[0_0_0_3px_rgba(27,94,53,0.08)] transition-all" />
          </div>
          {error && <p className="text-[11px] text-red-500 text-center">{error}</p>}
          <button type="submit" disabled={busy}
            className="w-full py-3 rounded-xl bg-linier-to-br from-[#1B5E35] to-[#2E7D52] text-[#F5F0E8] text-sm font-bold tracking-[2px] uppercase shadow-[0_4px_20px_rgba(27,94,53,0.25)] transition-all hover:scale-[1.01] disabled:opacity-60">
            {busy ? "Masuk…" : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}