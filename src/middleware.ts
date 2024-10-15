import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    if (token?.error === "RefreshAccessTokenError") {
      return NextResponse.redirect(
        new URL("/api/auth/error?error=RefreshAccessTokenError", req.url)
      );
    }

    const isAuthPage = req.nextUrl.pathname === "/";
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/(protected)");
    const isAuth = !!token;

    // Redirect authenticated users from auth page to dashboard
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/meals", req.url));
    }

    // Add this check for logout
    if (req.nextUrl.pathname === "/api/auth/logout") {
      return NextResponse.next();
    }

    // Allow access to auth page for non-authenticated users
    if (isAuthPage) {
      return NextResponse.next();
    }

    // For protected routes, redirect non-authenticated users to login
    if (isProtectedRoute && !isAuth) {
      const from = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Allow access for all other routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Always run this middleware
    },
  }
);

// Update the matcher configuration
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/(protected)/:path*",
    "/api/auth/logout",
  ],
};
