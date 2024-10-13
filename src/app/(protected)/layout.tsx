// app/(protected)/layout.tsx
import AuthProvider from "@/components/auth-provider";
import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth/next";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return <AuthProvider session={session}>{children}</AuthProvider>;
}
