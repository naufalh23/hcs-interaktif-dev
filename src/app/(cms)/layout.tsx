import { auth } from "@/lib/auth";
import { handleSignOut } from "./contentmanage/_actions";
import CmsNav from "@/components/cms/CmsNav";
import CmsHeader from "@/components/cms/CmsHeader";

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
      
      <CmsHeader
        name={session.user.name}
        role={role}
        onSignOut={handleSignOut}
      />

      <CmsNav role={role} />

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}