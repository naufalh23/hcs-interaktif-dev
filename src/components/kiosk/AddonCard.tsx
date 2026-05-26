import {
  IoConstructOutline,
  IoColorPaletteOutline,
  IoLockClosedOutline,
  IoSnowOutline,
  IoSunnyOutline,
  IoCallOutline,
} from "react-icons/io5";
import type { IconType } from "react-icons";
import { cn, formatPrice } from "@/lib/utils";
import type { AddonOption } from "@/data/customization";

const ADDON_ICONS: Record<number, IconType> = {
  1: IoConstructOutline,
  2: IoColorPaletteOutline,
  3: IoLockClosedOutline,
  4: IoSnowOutline,
  5: IoSnowOutline,
  6: IoSunnyOutline,
};

export default function AddonCard({
  addon: a,
  active,
  onToggle,
}: {
  addon: AddonOption;
  active: boolean;
  onToggle: () => void;
}) {
  const Icon = ADDON_ICONS[a.id];

  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-3.5 p-4 rounded-2xl text-left transition-all border-[1.5px]",
        active
          ? "bg-[rgba(27,94,53,0.06)] border-[rgba(27,94,53,0.35)] shadow-[0_2px_12px_rgba(27,94,53,0.1)]"
          : "bg-white border-[rgba(27,94,53,0.1)] hover:border-[rgba(27,94,53,0.25)]",
      )}
    >
      {/* Icon */}
      <div className={cn(
        "shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
        active ? "bg-[rgba(27,94,53,0.14)] text-[#1B5E35]" : "bg-[rgba(27,94,53,0.07)] text-[#4A7A5A]",
      )}>
        {Icon && <Icon size={22} />}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-bold text-[#163F25] mb-0.5 leading-tight">{a.name}</div>
        <div className="text-[8.5px] text-[#9AAD9C] uppercase tracking-[0.5px] mb-0.5">Deskripsi:</div>
        <div className="text-[10px] text-[#7A9480] leading-snug line-clamp-2">{a.desc}</div>
      </div>

      {/* Price badge */}
      <div className="shrink-0 ml-1">
        {a.contact ? (
          <ContactBadge />
        ) : a.price === 0 ? (
          <FreeBadge active={active} />
        ) : (
          <PriceBadge price={a.price} />
        )}
      </div>
    </button>
  );
}

function FreeBadge({ active }: { active: boolean }) {
  return (
    <div className={cn(
      "w-[50px] h-[50px] rounded-full border-[2px] border-dashed flex items-center justify-center",
      active ? "border-[#0FA876] bg-[rgba(15,168,118,0.08)]" : "border-[rgba(27,94,53,0.3)]",
    )}>
      <span className={cn(
        "text-[11px] font-bold tracking-[0.5px]",
        active ? "text-[#0FA876]" : "text-[#8A9E8C]",
      )}>
        FREE
      </span>
    </div>
  );
}

function PriceBadge({ price }: { price: number }) {
  const jt = price / 1_000_000;
  return (
    <div className="text-right min-w-[38px]">
      <div className="text-[9px] text-[#9AAD9C] leading-none">Rp.</div>
      <div className="font-serif font-bold text-[26px] leading-[1.1] text-[#163F25]">
        {jt % 1 === 0 ? jt : jt.toFixed(1)}
      </div>
      <div className="text-[9px] text-[#9AAD9C] leading-none">Jt-an</div>
    </div>
  );
}

function ContactBadge() {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[44px]">
      <IoCallOutline size={20} className="text-[#1B5E35]" />
      <div className="text-[8.5px] text-[#7A9480] text-center leading-tight">
        Hubungi<br />Sales
      </div>
    </div>
  );
}
