"use client";

import { toast } from "sonner";
import { HiOutlineLogout } from "react-icons/hi";

export default function LogoutButton({
  onSignOut,
}: {
  onSignOut: () => Promise<void>;
}) {
  const handleClick = async () => {
    const toastId = toast.loading("Keluar…");
    try {
      toast.success("Berhasil keluar. Sampai jumpa!", { id: toastId });
      // Dismiss dulu sebelum signOut karena signOut akan redirect
      setTimeout(async () => {
        await onSignOut();
      }, 800);
    } catch {
      toast.error("Gagal keluar, coba lagi.", { id: toastId });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 rounded-xl 
                 bg-red-50 text-red-600 
                 hover:bg-red-100 hover:text-red-700
                 active:scale-95
                 transition-all duration-200 
                 shadow-sm hover:shadow-md"
    >
      <HiOutlineLogout className="text-xl" />
      <span className="text-sm font-semibold tracking-wide">Logout</span>
    </button>
  );
}
