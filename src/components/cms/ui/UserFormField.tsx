"use client";

export default function UserFormField({
  label,
  children,
  required,
  error,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      
      {/* LABEL */}
      <label className="text-[11px] font-semibold text-[#163F25] flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {/* INPUT */}
      {children}

      {/* HINT / ERROR */}
      {error ? (
        <span className="text-[11px] text-red-500">{error}</span>
      ) : hint ? (
        <span className="text-[11px] text-[#9AAD9C]">{hint}</span>
      ) : null}
    </div>
  );
}