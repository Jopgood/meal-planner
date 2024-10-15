// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options as authOptions } from "@/lib/auth/options";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (session) {
    // Perform any server-side logout operations (e.g., invalidating tokens)
    // This depends on your specific setup with Directus

    // Clear the session
    const cookies = [
      `__Secure-next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly; secure; samesite=lax`,
      `__Secure-next-auth.csrf-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly; secure; samesite=lax`,
      // Add any other cookies you want to clear
    ];

    return NextResponse.json(
      { message: "Logged out successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookies.join(", "),
        },
      }
    );
  }

  return NextResponse.json({ message: "No active session" }, { status: 400 });
}
