import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options as authOptions } from "@/lib/auth/options";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const searchParams = req.nextUrl.searchParams;
  const error = searchParams.get("error");

  if (error === "RefreshAccessTokenError") {
    // Destroy the session if possible
    if (
      session &&
      authOptions.adapter &&
      typeof authOptions.adapter.deleteSession === "function"
    ) {
      try {
        if (session.refresh_token) {
          await authOptions.adapter.deleteSession(session.refresh_token);
        } else if (session.access_token) {
          await authOptions.adapter.deleteSession(session.access_token);
        } else {
          throw new Error("No refresh or access token available.");
        }
      } catch (e) {
        console.error("Failed to delete session:", e);
        // Continue even if session deletion fails
      }
    }

    // Create a response
    const response = NextResponse.redirect(new URL("/", req.url));

    // Clear the session cookie
    response.cookies.set("next-auth.session-token", "", {
      expires: new Date(0),
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  } else {
    return NextResponse.json({ error: "Invalid error type" }, { status: 400 });
  }
}
