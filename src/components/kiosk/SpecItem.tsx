import type { IconType } from "react-icons";

export default function SpecItem({
  icon: Icon,
  value,
  label,
}: {
  icon: IconType;
  value: number | string;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon size={14} className="text-[#4A7A5A] shrink-0" />
      <span className="text-[13px] font-semibold text-[#163F25]">{value}</span>
      {label && <span className="text-[11px] text-[#9AAD9C]">{label}</span>}
    </div>
  );
}
