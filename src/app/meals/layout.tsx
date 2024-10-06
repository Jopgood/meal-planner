import AuthProvider from "@/components/auth-provider";
import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth";

export default async function MealsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return <AuthProvider session={session as any}>{children}</AuthProvider>;
}
