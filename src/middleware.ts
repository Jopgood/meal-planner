import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    if (token?.error === "RefreshAccessTokenError") {
      // Redirect to the new error handling route
      return NextResponse.redirect(
        new URL("/api/auth/error?error=RefreshAccessTokenError", req.url)
      );
    }

    const isAuthPage = req.nextUrl.pathname === "/";
    const isAuth = !!token; // Use token instead of req.nextauth.token for consistency

    // Redirect authenticated users from auth page to dashboard
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/meals", req.url));
    }

    // Allow access to auth page for non-authenticated users
    if (isAuthPage) {
      return NextResponse.next();
    }

    // For non-auth pages, redirect non-authenticated users to login
    if (!isAuth) {
      const from = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Allow access for authenticated users
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Always run this middleware
    },
  }
);

// Matcher configuration remains the same
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
