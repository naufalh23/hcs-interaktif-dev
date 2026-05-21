import { auth } from "@/lib/auth";
import { handleSignOut } from "./contentmanage/_actions";
import CmsHeader from "@/components/cms/CmsHeader";
import Sidebar from "@/components/cms/SIdebar";

export default async function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return <>{children}</>;
  }

  const role = (session.user as any).role as "USER" | "ADMIN";

  return (
    <div className="min-h-screen bg-[#EDE8DE] flex flex-col">

      {/* Header tetap di atas full width */}
      <CmsHeader
        name={session.user.name}
        role={role}
        onSignOut={handleSignOut}
      />

      {/* Sidebar + konten berdampingan secara horizontal */}
      <div className="flex flex-1 min-h-0">

        {/* Sidebar: lebar tetap, tidak menyusut, scroll sendiri jika kontennya panjang */}
        <Sidebar role={role} />

        {/* Main: ambil sisa ruang, min-w-0 cegah overflow, scroll di sini */}
        <main className="flex-1 min-w-0 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}