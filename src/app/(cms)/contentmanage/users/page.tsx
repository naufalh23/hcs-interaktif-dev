import UsersClient from "@/components/cms/UsersClient";
import { auth }    from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function UsersPage() {
  const session = await auth();

  // Double-check di server, kalau user coba akses langsung via URL
  if (session?.user.role !== "ADMIN") {
    redirect("/contentmanage");
  }

  return <UsersClient />;
}