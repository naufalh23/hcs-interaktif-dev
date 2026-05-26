"use client";

import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";

export default function Lightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                   flex items-center justify-center text-white transition-colors"
      >
        <IoCloseOutline size={22} />
      </button>

      <div
        className="relative w-[70vw] h-[70vh] rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt="" fill className="object-cover" sizes="70vw" />
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-white/40 tracking-[1px]">
        Klik di luar untuk menutup
      </p>
    </div>
  );
}
