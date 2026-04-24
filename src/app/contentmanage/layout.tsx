import { auth }           from "@/lib/auth";
import { redirect }       from "next/navigation";
import { handleSignOut }  from "./_actions";
import CmsNav             from "@/components/cms/CmsNav";

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/contentmanage/login");

  return (
    <div className="min-h-screen bg-[#EDE8DE] flex flex-col">
      <header className="bg-[#F5F0E8] border-b border-[rgba(27,94,53,0.1)] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-serif font-bold text-[18px] text-[#163F25]">H City CMS</div>
          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold tracking-widest uppercase ${
            session.user.role === "ADMIN"
              ? "bg-[rgba(201,168,76,0.2)] text-[#7A5A00]"
              : "bg-[rgba(27,94,53,0.1)] text-[#1B5E35]"
          }`}>
            {session.user.role}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-[#7A9480]">{session.user.name}</span>
          <form
            action={async () => {
              "use server";
              await handleSignOut();
            }}
          >
            <button
              type="submit"
              className="text-[11px] text-[#7A9480] hover:text-[#163F25] transition-colors font-semibold"
            >
              Keluar
            </button>
          </form>
        </div>
      </header>

      <CmsNav role={session.user.role} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}