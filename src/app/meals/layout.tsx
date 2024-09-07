import AdminProvider from "@/components/admin-provider";
import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return <AdminProvider session={session as any}>{children}</AdminProvider>;
}
